import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CourseDTO, { COURSE } from '@/app/types/CourseDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCourseStatus, arrDurationUnit } from '@/app/common/Configuration';
import { ADD_COURSE, UPDATE_COURSE, GET_COURSE, UPLOAD_COURSE_IMAGE } from '@/app/graphql/Course';
import { COURSE_TYPE_LOOKUP } from '@/app/graphql/CourseType';
// import * as constants from '../../constants/constants';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { useSelector } from '../../../store';

type ErrorMessageType = {
  course_name: string | null;
  course_code: string | null;
  price: string | null;
  reg_fee: string | null;
  duration: string | null;
  duration_unit: string | null;
  course_type_name: string | null;
  logo_url: string | null;
  documents_path: string | null;
  documents: string | null;
  thumbnail: string | null;
  status: string | null;
  is10threq: boolean;
  is12threq: boolean;
  isgradreq: boolean;
  ispgreq: boolean;
  isphotoidreq: boolean;
  is_paid: boolean;
  isAadharReq: boolean;
  isTcReq: boolean;
  isMigration: boolean;
};

type StateType = {
  dtoCourse: CourseDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrQuizLookup: LookupDTO[];
  arrCourseStausLookup: LookupDTO[];
  arrDurationUnitLookup: LookupDTO[];
  arrCourseTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCourse: CourseDTO;
};

const useCourseEntry = ({ dtoCourse }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_name: null,
    course_code: null,
    price: null,
    reg_fee: null,
    duration: null,
    duration_unit: null,
    course_type_id: 0,
    course_type_name: null,
    logo_url: null,
    documents_path: null,
    documents: null,
    thumbnail: null,
    status: null,
    is10threq: false,
    is12threq: false,
    isgradreq: false,
    ispgreq: false,
    isphotoidreq: false,
    is_paid: false,
    isAadharReq: false,
    isTcReq: false,
    isMigration: false
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCourse: dtoCourse,
    open1: false,
    open2: false,
    open3: false,
    arrCourseStausLookup: arrCourseStatus,
    arrDurationUnitLookup: arrDurationUnit,
    arrCourseTypeLookup: [] as LookupDTO[],
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addCourse] = useMutation(ADD_COURSE, {});
  const { companyInfo } = useSelector((state) => state.globalState);
  const [getCourseTypeLookup] = useLazyQuery(COURSE_TYPE_LOOKUP, { fetchPolicy: 'network-only' });
  const [updateCourse] = useMutation(UPDATE_COURSE, {});
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [singleUpload] = useMutation(UPLOAD_COURSE_IMAGE, {});

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoCourse: CourseDTO = COURSE;
      const { error, data } = await getCourse({
        variables: {
          id: state.dtoCourse.id
        }
      });
      if (!error && data) {
        dtoCourse = data.getCourse;
      }
      setState({ dtoCourse: dtoCourse } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourse, state.dtoCourse.id]);

  const getCourseTypeList = useCallback(async (): Promise<void> => {
    try {
      let arrCourseTypeLookup: LookupDTO[] = [];
      const { error, data } = await getCourseTypeLookup({
        variables: {
          group_name: companyInfo.company_type
        }
      });
      if (!error && data) {
        arrCourseTypeLookup = data.getCourseTypeLookup;
      }
      setState({ arrCourseTypeLookup: arrCourseTypeLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseTypeLookup, companyInfo.company_type]);

  useEffect(() => {
    getCourseTypeList();
  }, [getCourseTypeList]);

  useEffect(() => {
    if (state.dtoCourse.id > 0) {
      getData();
    }
  }, [state.dtoCourse.id, getData]);

  useEffect(() => {
    if (state.arrCourseStausLookup.length > 0 && !state.dtoCourse.status) {
      const firstItem = state.arrCourseStausLookup[0];
      setState({
        ...state,
        dtoCourse: {
          ...state.dtoCourse,
          status: firstItem.text // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCourseStausLookup]);

  const onRegAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const parsed = Number(value);

      setState({
        ...state,
        dtoCourse: {
          ...state.dtoCourse,
          reg_fee: !isNaN(parsed) ? parsed : 0
        }
      });
    },
    [state]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoCourse]
  );

  const validatePrice = useCallback(async () => {
    const isPaid = state.dtoCourse.is_paid;
    const price = Number(state.dtoCourse.price);

    if (isPaid && (isNaN(price) || price <= 0)) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.is_paid, state.dtoCourse.price]);

  const onPriceBlur = useCallback(async () => {
    const price = await validatePrice();
    setState({ errorMessages: { ...state.errorMessages, price: price } } as StateType);
  }, [validatePrice, state.errorMessages]);

  const validateRegFee = useCallback(async () => {
    if (state.dtoCourse.reg_fee == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.reg_fee]);

  const onRegFeeBlur = useCallback(async () => {
    const reg_fee = await validateRegFee();
    setState({ errorMessages: { ...state.errorMessages, reg_fee: reg_fee } } as StateType);
  }, [validateRegFee, state.errorMessages]);

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, '');
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          course_code: value
        }
      } as StateType);
    },
    [state.dtoCourse]
  );

  const onCourseTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          course_type_id: (value as LookupDTO).id,
          course_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourse]
  );

  const validateCourseName = useCallback(async () => {
    if (state.dtoCourse.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.course_name]);

  const validateCourseCode = useCallback(async () => {
    if (state.dtoCourse.course_code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.course_code]);

  // const validateDuration = useCallback(async () => {
  //   if (state.dtoCourse.duration.trim() === '') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoCourse.duration]);

  const validateDuration = useCallback(() => {
    if (state.dtoCourse.duration == null || state.dtoCourse.duration <= 0) {
      return gMessageConstants.REQUIRED_FIELD;
    }
    return null;
  }, [state.dtoCourse.duration]);

  const onCourseNameBlur = useCallback(async () => {
    const course_name = await validateCourseName();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourseName, state.errorMessages]);

  const onCourseCodeBlur = useCallback(async () => {
    const course_code = await validateCourseCode();
    setState({ errorMessages: { ...state.errorMessages, course_code: course_code } } as StateType);
  }, [validateCourseCode, state.errorMessages]);

  const onDurationBlur = useCallback(async () => {
    const duration = await validateDuration();
    setState({ errorMessages: { ...state.errorMessages, duration: duration } } as StateType);
  }, [validateDuration, state.errorMessages]);

  const validateCourseType = useCallback(async () => {
    if (state.dtoCourse.course_type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.course_type_name]);

  const onCourseStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourse]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoCourse.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onDurationUnitChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          duration_unit: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourse]
  );
  const validateDurationUnit = useCallback(async () => {
    if (state.dtoCourse.duration_unit.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourse.duration_unit]);

  const onDurationUnitBlur = useCallback(async () => {
    const duration_unit = await validateDurationUnit();
    setState({ errorMessages: { ...state.errorMessages, duration_unit: duration_unit } } as StateType);
  }, [validateDurationUnit, state.errorMessages]);

  const onCourseTypeBlur = useCallback(async () => {
    const course_type_name = await validateCourseType();
    setState({ errorMessages: { ...state.errorMessages, course_type_name: course_type_name } } as StateType);
  }, [validateCourseType, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.course_name = await validateCourseName();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.course_code = await validateCourseCode();
    if (errorMessages.course_code) {
      isFormValid = false;
    }
    errorMessages.duration_unit = await validateDurationUnit();
    if (errorMessages.duration_unit) {
      isFormValid = false;
    }
    errorMessages.duration = await validateDuration();
    if (errorMessages.duration) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.course_type_name = await validateCourseType();
    if (errorMessages.course_type_name) {
      isFormValid = false;
    }
    errorMessages.price = await validatePrice();
    if (errorMessages.price) {
      isFormValid = false;
    }
    errorMessages.reg_fee = await validateRegFee();
    if (errorMessages.reg_fee) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateCourseName,
    validateStatus,
    validateCourseType,
    validateCourseCode,
    validateDuration,
    validatePrice,
    validateDurationUnit,
    validateRegFee
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          console.log('gfhhyiuh', state.dtoCourse.reg_fee);
          if (state.dtoCourse.id === 0) {
            const { data } = await addCourse({
              variables: {
                course_name: state.dtoCourse.course_name,
                course_code: state.dtoCourse.course_code,
                price: Number(state.dtoCourse.price),
                reg_fee: Number(state.dtoCourse.reg_fee),
                duration: Number(state.dtoCourse.duration),
                duration_unit: state.dtoCourse.duration_unit,
                course_type_id: state.dtoCourse.course_type_id,
                logo_url: state.dtoCourse.logo_url,
                thumbnail: state.dtoCourse.thumbnail,
                documents_path: state.dtoCourse.documents_path,
                documents: state.dtoCourse.documents,
                status: state.dtoCourse.status,
                prev_class_marksheet: state.dtoCourse.prev_class_marksheet,
                is10threq: state.dtoCourse.is10threq,
                is12threq: state.dtoCourse.is12threq,
                isdiplomareq: state.dtoCourse.isdiplomareq,
                isgradreq: state.dtoCourse.isgradreq,
                ispgreq: state.dtoCourse.ispgreq,
                isphotoidreq: state.dtoCourse.isphotoidreq,
                is_aadhar_req: state.dtoCourse.is_aadhar_req,
                is_birth_certi_req: state.dtoCourse.is_birth_certi_req,
                is_tc_req: state.dtoCourse.is_tc_req,
                is_samagraid_req: state.dtoCourse.is_samagraid_req,
                is_paid: state.dtoCourse.is_paid
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list`);
            }
          } else {
            const { data } = await updateCourse({
              variables: {
                id: state.dtoCourse.id,
                course_name: state.dtoCourse.course_name,
                course_code: state.dtoCourse.course_code,
                price: Number(state.dtoCourse.price),
                reg_fee: Number(state.dtoCourse.reg_fee),
                duration: Number(state.dtoCourse.duration),
                duration_unit: state.dtoCourse.duration_unit,
                course_type_id: state.dtoCourse.course_type_id,
                logo_url: state.dtoCourse.logo_url,
                thumbnail: state.dtoCourse.thumbnail,
                documents_path: state.dtoCourse.documents_path,
                documents: state.dtoCourse.documents,
                status: state.dtoCourse.status,
                prev_class_marksheet: state.dtoCourse.prev_class_marksheet,
                is10threq: state.dtoCourse.is10threq,
                is12threq: state.dtoCourse.is12threq,
                isdiplomareq: state.dtoCourse.isdiplomareq,
                isgradreq: state.dtoCourse.isgradreq,
                ispgreq: state.dtoCourse.ispgreq,
                isphotoidreq: state.dtoCourse.isphotoidreq,
                is_aadhar_req: state.dtoCourse.is_aadhar_req,
                is_birth_certi_req: state.dtoCourse.is_birth_certi_req,
                is_tc_req: state.dtoCourse.is_tc_req,
                is_samagraid_req: state.dtoCourse.is_samagraid_req,
                is_paid: state.dtoCourse.is_paid
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addCourse, state.dtoCourse, router, updateCourse]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoCourse: { ...COURSE, id: state.dtoCourse.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoCourse.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list`);
    },
    [router]
  );

  // const UploadImage = useCallback(async () => {
  //   const files = (document.getElementById('Course_image') as any)!.files;
  //   console.log(files);
  //   if (files.length == 0) {
  //     return;
  //   }
  //   const { data } = await singleUpload({
  //     variables: {
  //     files: files
  //     }
  //   });
  //   if (data) {
  //     setState({ dtoCourse: { ...state.dtoCourse, logo_url: gConstants.LOGO_PATH + data.singleUpload[0].filename } } as StateType);
  //   }
  // }, [singleUpload, state.dtoCourse]);

  // const UploadImage1 = useCallback(async () => {
  //   const files = (document.getElementById('Course_image') as any)!.files;
  //   console.log(files);
  //   if (files.length == 0) {
  //     return;
  //   }
  //   const { data } = await singleUpload({
  //     variables: {
  //       files: files
  //     }
  //   });
  //   if (data) {
  //     setState({
  //       dtoCourse: { ...state.dtoCourse, documents_path: constants.COURSE_DOC_PATH + data.singleUpload[0].filename }
  //     } as StateType);
  //   }
  // }, [singleUpload, state.dtoCourse]);

  const handleDocumentUpload = useCallback(
    async (event: React.ChangeEvent<any>, field: keyof CourseDTO) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      try {
        if (gConstants.IS_CLOUD_STORAGE_ENABLED) {
          setState({
            dtoCourse: {
              ...state.dtoCourse,
              [field]: files[0]
            }
          } as StateType);
        } else {
          setState({
            dtoCourse: {
              ...state.dtoCourse,
              [field]: null
            }
          } as StateType);
        }
      } catch (error) {
        console.error('GraphQL upload failed:', error);
      }
    },
    [state, setState]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const toggleDocument = (doc: string) => {
    setSelectedDocs((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]));
  };

  return {
    state,
    onInputChange,
    // onPlainInputChange,
    onCodeChange,
    onCourseNameBlur,
    onStatusBlur,
    onCourseTypeBlur,
    onCourseCodeBlur,
    onDurationBlur,
    onCourseStatusChange,
    onCourseTypeChange,
    onRegFeeBlur,
    singleUpload,
    // UploadImage,
    // UploadImage1,
    handleDocumentUpload,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    toggleDocument,
    onPriceBlur,
    onRegAmountChange,
    selectedDocs,
    saving,
    onDurationUnitBlur,
    onDurationUnitChange
  };
};

export default useCourseEntry;
