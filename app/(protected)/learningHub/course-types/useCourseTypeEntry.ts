import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CourseTypeDTO, { COURSE_TYPE } from '@/app/types/CourseTypeDTO';
import { ADD_COURSE_TYPE, UPDATE_COURSE_TYPE, GET_COURSE_TYPE, GET_COURSE_TYPE_NAME_EXIST, COURSE_GROUP_LOOKUP } from '@/app/graphql/CourseType';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrStatusLookup, capitalizeWords } from '@/app/common/Configuration';
import * as gConstants from '../../../constants/constants';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  course_type_name: string | null;
  group_id: string | null;
  group_name: string | null;
  code: string | null;
  status: string | null;
};

type StateType = {
  dtoCourseType: CourseTypeDTO;
  open1: boolean;
  open2: boolean;
  arrStatusLookup: LookupDTO[];
  arrCourseGroupLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCourseType: CourseTypeDTO;
};

const useCourseTypeEntry = ({ dtoCourseType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_type_name: null,
    group_id: null,
    group_name: null,
    code: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCourseType: dtoCourseType,
    open1: false,
    open2: false,
    arrStatusLookup: arrStatusLookup,
    arrCourseGroupLookup: [] as LookupDTO[],
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addCourseType] = useMutation(ADD_COURSE_TYPE, {});

  const [updateCourseType] = useMutation(UPDATE_COURSE_TYPE, {});
  const [getGroupLookup] = useLazyQuery(COURSE_GROUP_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourseType] = useLazyQuery(GET_COURSE_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCourseTypeNameExist] = useLazyQuery(GET_COURSE_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrStatusLookup.length > 0 &&
      !state.dtoCourseType.status
    ) {
      const firstItem = state.arrStatusLookup[0];
      setState({
        ...state,
        dtoCourseType: {
          ...state.dtoCourseType,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoCourseType: CourseTypeDTO = COURSE_TYPE;
      const { error, data } = await getCourseType({
        variables: {
          id: state.dtoCourseType.id
        }
      });
      if (!error && data) {
        dtoCourseType = data.getCourseType;
      }
      setState({ dtoCourseType: dtoCourseType } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseType, state.dtoCourseType.id]);

  const IsCourseTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCourseTypeNameExist({
      variables: {
        id: state.dtoCourseType.id,
        course_type_name: state.dtoCourseType.course_type_name
      }
    });
    if (!error && data) {
      exist = data.getCourseTypeNameExist;
    }
    return exist;
  }, [getCourseTypeNameExist, state.dtoCourseType.id, state.dtoCourseType.course_type_name]);

  useEffect(() => {
    if (state.dtoCourseType.id > 0) {
      getData();
    }
  }, [state.dtoCourseType.id, getData]);

  const getCourseGroupList = useCallback(async (): Promise<void> => {
    try {
      let arrCourseGroupLookup: LookupDTO[] = [];
      const { error, data } = await getGroupLookup();
      if (!error && data) {
        arrCourseGroupLookup = data.getGroupLookup;
      }
      setState({ arrCourseGroupLookup: arrCourseGroupLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getGroupLookup]);

  useEffect(() => {
    getCourseGroupList();
  }, [getCourseGroupList]);


  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoCourseType: {
          ...state.dtoCourseType,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoCourseType]
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoCourseType: {
          ...state.dtoCourseType,
          code: value,
        },
      } as StateType);
    },
    [state.dtoCourseType]
  );


  const validateCourseTypeName = useCallback(async () => {
    if (state.dtoCourseType.course_type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsCourseTypeNameExist()) {
      return 'Module Name already exists';
    } else {
      return null;
    }
  }, [state.dtoCourseType.course_type_name]);

  const validateCode = useCallback(async () => {
    if (state.dtoCourseType.code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourseType.code]);

  const onCodeBlur = useCallback(async () => {
    const code = await validateCode();
    setState({ errorMessages: { ...state.errorMessages, code: code } } as StateType);
  }, [validateCode, state.errorMessages]);

  const onCourseTypesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourseType: {
          ...state.dtoCourseType,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourseType]
  );

  const onGroupNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourseType: {
          ...state.dtoCourseType,
          group_id: (value as LookupDTO).id,
          group_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourseType]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoCourseType.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourseType.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateGroupName = useCallback(async () => {
    if (state.dtoCourseType.group_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCourseType.group_name]);

  const onGroupNameBlur = useCallback(async () => {
    const group_name = await validateGroupName();
    setState({ errorMessages: { ...state.errorMessages, group_name: group_name } } as StateType);
  }, [validateGroupName, state.errorMessages]);


  const onCourseTypeNameBlur = useCallback(async () => {
    const course_type_name = await validateCourseTypeName();
    setState({ errorMessages: { ...state.errorMessages, course_type_name: course_type_name } } as StateType);
  }, [validateCourseTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.course_type_name = await validateCourseTypeName();
    if (errorMessages.course_type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCourseTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoCourseType.id === 0) {
            const { data } = await addCourseType({
              variables: {
                // ...state.dtoCourseType
                course_type_name: state.dtoCourseType.course_type_name,
                code: state.dtoCourseType.code,
                group_id: state.dtoCourseType.group_id,
                status: state.dtoCourseType.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list`);
            }
          } else {
            const { data } = await updateCourseType({
              variables: {
                // ...state.dtoCourseType
                id: state.dtoCourseType.id,
                course_type_name: state.dtoCourseType.course_type_name,
                code: state.dtoCourseType.code,
                group_id: state.dtoCourseType.group_id,
                status: state.dtoCourseType.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [saving, validateForm, addCourseType, state.dtoCourseType, router, updateCourseType]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoCourseType: { ...COURSE_TYPE, id: state.dtoCourseType.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoCourseType.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list`);
    },
    [router]
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

  return {
    state,
    onInputChange,
    onCourseTypeNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onCourseTypesStatusChange,
    onStatusBlur,
    onGroupNameChange,
    onGroupNameBlur,
    onCodeBlur,
    onCodeChange
  };
};

export default useCourseTypeEntry;
