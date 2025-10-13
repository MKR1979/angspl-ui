import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AdmissionSchoolDTO, { ADMISSION_SCHOOL } from '@/app/types/AdmissionSchDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import { COURSE_LOOKUP, GET_COURSE } from '@/app/graphql/Course';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { ADD_ADMISSION_RETURN_USERID } from '@/app/graphql/AdmissionSch';
import { GET_LAST_ADMISSION } from '@/app/graphql/AdmissionTech';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import { regExEMail } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useSelector } from '../../../store';
import {
  getLocalTime,
  arrGenderType,
  arrModulesStatus,
  arrMaritalStatusType,
  arrCategoryType,
  arrBloodGrpType,
  arrReligionType,
  arrSchoolBoardingType,
  arrEduBoardType,
  arrStuMasterType,
  arrMediumType,
  arrIILanType,
  arrTransportRoute,
  arrIIILanType,
  arrStreamType,
  capitalizeWords
} from '@/app/common/Configuration';
import dayjs from 'dayjs';
import PaymentDTO, { PAYMENT } from '@/app/types/PaymentDTO';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import { validateDate } from '@/app/common/validationDate';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  admission_date: string | null;
  gender: string | null;
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  mother_name: string | null;
  dob: string | null;
  category: string | null;
  address: string | null;
  state_id: number | null;
  state_name: string | null;
  country_id: number | null;
  country_name: string | null;
  city_name: string | null;
  zip_code: string | null;
  email: string | null;
  phone_no: string | null;
  religion: string | null;
  blood_group: string | null;
  boarder_day_scholar: string | null;
  current_school: string | null;
  current_board: string | null;
  medium: string | null;
  stream: string | null;
  father_qualification: string | null;
  father_occupation: string | null;
  father_organisation: string | null;
  father_designation: string | null;
  father_phone_no: string | null;
  father_email: string | null;
  mother_qualification: string | null;
  mother_occupation: string | null;
  mother_organisation: string | null;
  mother_designation: string | null;
  mother_phone_no: string | null;
  mother_email: string | null;
  student_aadhaar_no: string | null;
  father_aadhaar_no: string | null;
  mother_aadhaar_no: string | null;
  samagra_id_no: string | null;
  photo: string | null;
  aadhaar_card: string | null;
  birth_certificate: string | null;
  other_certificate: string | null;
  father_aadhaar: string | null;
  mother_aadhaar: string | null;
  samagra_id: string | null;
  prev_class_marksheet: string | null;
  father_photo: string | null;
  mother_photo: string | null;
  student_pen_no: string | null;
  family_samagra_id: string | null;
  undertaking: string | null;
};

type StateType = {
  dtoAdmissionSchool: AdmissionSchoolDTO;
  arrGenderTypeLookup: LookupDTO[];
  arrStuMasterTypeLookup: LookupDTO[];
  arrStreamTypeLookup: LookupDTO[];
  arrIILanTypeLookup: LookupDTO[];
  arrIIILanTypeLookup: LookupDTO[];
  arrReligionTypeLookup: LookupDTO[];
  arrRouteTypeLookup: LookupDTO[];
  arrBloodGrpTypeLookup: LookupDTO[];
  arrMediumTypeLookup: LookupDTO[];
  arrEduBoardTypeLookup: LookupDTO[];
  arrSchoolBoardingTypeLookup: LookupDTO[];
  arrCategoryTypeLookup: LookupDTO[];
  arrMaritalStatusLookup: LookupDTO[];
  arrModulesStatusLookup: LookupDTO[];
  dtoPayment: PaymentDTO;
  arrCourseLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrStateLookup: LookupDTO[];
  dtoReceipt: ReceiptDTO;
  dtoCourse: CourseAllDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  open8: boolean;
  open9: boolean;
  open10: boolean;
  open11: boolean;
  open13: boolean;
  open14: boolean;
  open15: boolean;
  open16: boolean;
  open17: boolean;
  open18: boolean;
  errorMessages: ErrorMessageType;
};

const useAdmSchool = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: 0,
    course_name: null,
    admission_date: null,
    gender: null,
    first_name: null,
    last_name: null,
    father_name: null,
    mother_name: null,
    dob: null,
    category: null,
    address: null,
    state_id: 0,
    state_name: null,
    country_id: 0,
    country_name: null,
    city_name: null,
    zip_code: null,
    email: null,
    phone_no: null,
    religion: null,
    blood_group: null,
    boarder_day_scholar: null,
    current_school: null,
    current_board: null,
    medium: null,
    stream: null,
    father_qualification: null,
    father_occupation: null,
    father_organisation: null,
    father_designation: null,
    father_phone_no: null,
    father_email: null,
    mother_qualification: null,
    mother_occupation: null,
    mother_organisation: null,
    mother_designation: null,
    mother_phone_no: null,
    mother_email: null,
    student_aadhaar_no: null,
    father_aadhaar_no: null,
    mother_aadhaar_no: null,
    samagra_id_no: null,
    photo: null,
    aadhaar_card: null,
    birth_certificate: null,
    other_certificate: null,
    father_aadhaar: null,
    mother_aadhaar: null,
    samagra_id: null,
    prev_class_marksheet: null,
    father_photo: null,
    mother_photo: null,
    student_pen_no: null,
    family_samagra_id: null,
    undertaking: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmissionSchool: ADMISSION_SCHOOL,
    arrGenderTypeLookup: arrGenderType,
    arrStuMasterTypeLookup: arrStuMasterType,
    arrStreamTypeLookup: arrStreamType,
    arrIILanTypeLookup: arrIILanType,
    arrIIILanTypeLookup: arrIIILanType,
    arrReligionTypeLookup: arrReligionType,
    arrBloodGrpTypeLookup: arrBloodGrpType,
    arrRouteTypeLookup: arrTransportRoute,
    arrEduBoardTypeLookup: arrEduBoardType,
    arrMediumTypeLookup: arrMediumType,
    arrSchoolBoardingTypeLookup: arrSchoolBoardingType,
    arrCategoryTypeLookup: arrCategoryType,
    arrMaritalStatusLookup: arrMaritalStatusType,
    arrModulesStatusLookup: arrModulesStatus,
    dtoPayment: PAYMENT,
    arrCourseLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    arrStateLookup: [] as LookupDTO[],
    dtoReceipt: RECEIPT,
    dtoCourse: COURSE_LIST_ALL,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
    open9: false,
    open10: false,
    open11: false,
    open13: false,
    open14: false,
    open15: false,
    open16: false,
    open17: false,
    open18: false,
    errorMessages: { ...ERROR_MESSAGES }
  });
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [studentId, setStudentId] = useState<number>();
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [admissionNumber, setAdmissionNumber] = useState<string | null>(null);
  const [addAdmissionReturnUserId] = useMutation(ADD_ADMISSION_RETURN_USERID, {});
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, { fetchPolicy: 'network-only' });
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getLastAdmission] = useLazyQuery(GET_LAST_ADMISSION, { fetchPolicy: 'network-only' });
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);

  const RAZORPAY_CONFIG = {
    scriptUrl: siteConfig.find((c) => c.key === 'RAZORPAY_SCRIPT_URL')?.value ?? '',
    publicKey: siteConfig.find((c) => c.key === 'RAZORPAY_PUBLIC_KEY')?.value ?? '',
    merchantName: siteConfig.find((c) => c.key === 'RAZORPAY_MERCHANT_NAME')?.value ?? ''
  };

  // -----------------------payment----------------------------
  useEffect(() => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CONFIG.scriptUrl;
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully.');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addPaymentDetails = useCallback(
    async (response: any, fee: number, course_id: number, user_id: number) => {
      try {
        const today = new Date();
        const paymentDate = today.toISOString().split('T')[0];
        const feeMonth = today.toLocaleString('default', { month: 'long' });
        const feeYear = today.getFullYear();
        const result = await addFeeCollectionReturnId({
          variables: {
            course_id: course_id,
            learner_id: user_id,
            payment_date: paymentDate,
            payment_mode: gConstants.PAY_MODE,
            cheque_number: '',
            // fee_head_id: gConstants.FEE_HEAD_ADMISSION,
            fee_amount: fee,
            fee_month: feeMonth,
            fee_year: feeYear,
            currency: gConstants.CURRENCY,
            transaction_id: '',
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            remarks: '',
            status: gConstants.STATUS_PAID,
            source_flag: gConstants.SOURCE_FLAG_ADMISSION
          }
        });
        const newPaymentId = result?.data?.addFeeCollectionReturnId ?? 0;
        return newPaymentId;
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    },
    [addFeeCollectionReturnId]
  );

  const handlePayNow = (course_id: number, course: string, fee: number, user_id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!(window as any).Razorpay) {
        console.error('Razorpay SDK not loaded properly.');
        resolve(false);
        return;
      }
      const options = {
        key: RAZORPAY_CONFIG.publicKey,
        amount: fee * 100,
        currency: gConstants.CURRENCY,
        name: RAZORPAY_CONFIG.merchantName,
        description: `Payment for ${course}`,
        handler: async (response: any) => {
          try {
            const newPaymentId = await addPaymentDetails(response, fee, course_id, user_id);
            router.push(`/paymentReceipt?id=${newPaymentId}&userName=${encodeURIComponent('')}`);
          } catch (err) {
            console.error('Payment handler error:', err);
            resolve(false);
          }
        },
        prefill: {
          name: name, // userName || 'Student Name',
          email: state.dtoAdmissionSchool.email,
          contact: state.dtoAdmissionSchool.phone_no
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: () => {
            console.warn('Payment popup was closed by user');
            resolve(false); // payment cancelled
          }
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };
  // ------------payment end-----------------------

  const getCourseData = useCallback(async (): Promise<void> => {
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoAdmissionSchool.course_id
      }
    });

    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setState({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmissionSchool.course_id]);

  useEffect(() => {
    if (state.dtoAdmissionSchool.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmissionSchool.course_id, getCourseData]);

  const getLastAdmissionFormId = useCallback(async (): Promise<void> => {
    try {
      const { error, data } = await getLastAdmission();
      if (error) {
        console.error('GraphQL error:', error);
        return;
      }
      const admissionId = Number(data?.getLastAdmission?.id ?? 0) + 1;
      setAdmissionNumber(gConstants.ADMISSION_PREFIX + admissionId);
    } catch (err) {
      console.error('Error fetching last admission ID:', err);
    }
  }, [getLastAdmission]);

  useEffect(() => {
    getLastAdmissionFormId();
  }, [getLastAdmissionFormId]);

  const getCourseList = useCallback(async (): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseLookup({
        variables: {
          group_name: companyInfo.company_type
        }
      });
      if (!error && data) {
        arrCourseLookup = data.getCourseLookup;
      }
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseLookup, companyInfo.company_type]);

  const getCountryList = useCallback(async (): Promise<void> => {
    try {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCountryLookup]);

  const getStateList = useCallback(async (): Promise<void> => {
    try {
      let arrStateLookup: LookupDTO[] = [];
      const { error, data } = await getStateLookup({
        variables: {
          country_id: state.dtoAdmissionSchool.country_id
        }
      });
      if (!error && data) {
        arrStateLookup = data.getStateLookup;
      }
      setState({ arrStateLookup: arrStateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getStateLookup, state.dtoAdmissionSchool.country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoAdmissionSchool: {
          ...state.dtoAdmissionSchool,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoAdmissionSchool]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAdmissionSchool: {
          ...state.dtoAdmissionSchool,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAdmissionSchool]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoAdmissionSchool: {
          ...state.dtoAdmissionSchool,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoAdmissionSchool]
  );

  const onPenNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');

    if (digitsOnly.length <= gConstants.PEN_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'student_pen_no' }
      });
    }
  };

  const onFamilySamagraIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (digitsOnly.length <= gConstants.SAMAGRA_ID_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'family_samagra_id' }
      });
    }
  };

  const validatePenNo = useCallback(async () => {
    const pen = state.dtoAdmissionSchool.student_pen_no.trim();
    if (pen === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (pen.length < gConstants.PEN_NO_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{11}$/.test(pen);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.student_pen_no]);

  const onPenNoBlur = useCallback(async () => {
    const student_pen_no = await validatePenNo();
    setState({ errorMessages: { ...state.errorMessages, student_pen_no: student_pen_no } } as StateType);
  }, [validatePenNo, state.errorMessages]);

  const validateFamilySamagraId = useCallback(async () => {
    const samagra = state.dtoAdmissionSchool.family_samagra_id.trim();
    if (samagra === '') {
      return null;
    }
    if (samagra.length < gConstants.FAMILY_SAMAGRA_ID_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{7}$/.test(samagra);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.family_samagra_id]);

  const onFamilySamagraIdBlur = useCallback(async () => {
    const family_samagra_id = await validateFamilySamagraId();
    setState({ errorMessages: { ...state.errorMessages, family_samagra_id: family_samagra_id } } as StateType);
  }, [validateFamilySamagraId, state.errorMessages]);

  const validateCountryName = useCallback(async () => {
    if (state.dtoAdmissionSchool.country_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.country_name]);

  const onCountryNameBlur = useCallback(async () => {
    const country_name = await validateCountryName();
    setState({ errorMessages: { ...state.errorMessages, country_name: country_name } } as StateType);
  }, [validateCountryName, state.errorMessages]);

  const validateStateName = useCallback(async () => {
    if (state.dtoAdmissionSchool.state_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.state_name]);

  const onStateNameBlur = useCallback(async () => {
    const state_name = await validateStateName();
    setState({ errorMessages: { ...state.errorMessages, state_name: state_name } } as StateType);
  }, [validateStateName, state.errorMessages]);

  const validateCourseName = useCallback(async () => {
    if (state.dtoAdmissionSchool.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.course_name]);

  const onCourseNameBlur = useCallback(async () => {
    const course_name = await validateCourseName();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourseName, state.errorMessages]);

  const validateFirstName = useCallback(async () => {
    if (state.dtoAdmissionSchool.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.first_name]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAdmissionSchool.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.last_name]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  const validateCityName = useCallback(async () => {
    if (state.dtoAdmissionSchool.city_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.city_name]);

  const onCityNameBlur = useCallback(async () => {
    const city_name = await validateCityName();
    setState({ errorMessages: { ...state.errorMessages, city_name: city_name } } as StateType);
  }, [validateCityName, state.errorMessages]);

  const validateZipCode = useCallback(async () => {
    const zip = state.dtoAdmissionSchool.zip_code.trim();
    if (zip === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (zip.length < gConstants.ZIP_CODE_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{5}$/.test(zip);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.zip_code]);

  const onZipCodeBlur = useCallback(async () => {
    const zip_code = await validateZipCode();
    setState({ errorMessages: { ...state.errorMessages, zip_code: zip_code } } as StateType);
  }, [validateZipCode, state.errorMessages]);

  // const validateDob = useCallback(async () => {
  //   if (state.dtoAdmissionSchool.dob == null || dayjs(getLocalTime(state.dtoAdmissionSchool.dob)).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAdmissionSchool.dob]);
  const validateDob = useCallback(() => {
    return validateDate({
      value: state.dtoAdmissionSchool.dob,
    });
  }, [state.dtoAdmissionSchool.dob]);

  const onDobBlur = useCallback(async () => {
    const dob = await validateDob();
    setState({ errorMessages: { ...state.errorMessages, dob: dob } } as StateType);
  }, [validateDob, state.errorMessages]);

  const validateGender = useCallback(async () => {
    if (state.dtoAdmissionSchool.gender.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.gender]);

  const onGenderBlur = useCallback(async () => {
    const gender = await validateGender();
    setState({ errorMessages: { ...state.errorMessages, gender: gender } } as StateType);
  }, [validateGender, state.errorMessages]);

  const validateStream = useCallback(async () => {
    if (state.dtoAdmissionSchool.stream.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.stream]);

  const onStreamBlur = useCallback(async () => {
    const stream = await validateStream();
    setState({ errorMessages: { ...state.errorMessages, stream: stream } } as StateType);
  }, [validateStream, state.errorMessages]);

  const onStuAadhaarNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'student_aadhaar_no' }
      });
    }
  };

  const onFAadhaarNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'father_aadhaar_no' }
      });
    }
  };

  const onMAadhaarNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'mother_aadhaar_no' }
      });
    }
  };

  const onSamagraIdNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.SAMAGRA_ID_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'samagra_id_no' }
      });
    }
  };

  const validateStudentSamagraId = useCallback(async () => {
    const samagra = state.dtoAdmissionSchool.samagra_id_no.trim();
    if (samagra === '') {
      return null;
    }
    if (samagra.length < gConstants.SAMAGRA_ID_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{8}$/.test(samagra);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.samagra_id_no]);

  const onStudentSamagraIdBlur = useCallback(async () => {
    const samagra_id_no = await validateStudentSamagraId();
    setState({ errorMessages: { ...state.errorMessages, samagra_id_no: samagra_id_no } } as StateType);
  }, [validateStudentSamagraId, state.errorMessages]);

  const validateBloodGrp = useCallback(async () => {
    if (state.dtoAdmissionSchool.blood_group.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.blood_group]);

  const onBloodGrpBlur = useCallback(async () => {
    const blood_group = await validateBloodGrp();
    setState({ errorMessages: { ...state.errorMessages, blood_group: blood_group } } as StateType);
  }, [validateBloodGrp, state.errorMessages]);

  const validateBoardingType = useCallback(async () => {
    if (state.dtoAdmissionSchool.boarder_day_scholar.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.boarder_day_scholar]);

  const onBoardingTypeBlur = useCallback(async () => {
    const boarder_day_scholar = await validateBoardingType();
    setState({ errorMessages: { ...state.errorMessages, boarder_day_scholar: boarder_day_scholar } } as StateType);
  }, [validateBoardingType, state.errorMessages]);

  const validateCategory = useCallback(async () => {
    if (state.dtoAdmissionSchool.category.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.category]);

  const onCategoryBlur = useCallback(async () => {
    const category = await validateCategory();
    setState({ errorMessages: { ...state.errorMessages, category: category } } as StateType);
  }, [validateCategory, state.errorMessages]);

  const validateEmails = (): string | null => {
    const { email, mother_email, father_email } = state.dtoAdmissionSchool;
    if (!email && !mother_email && !father_email) {
      return "A valid email is required. You may provide Student, Mother, or Father's email address.”";
    }
    return null;
  };

  const validateEMailId = useCallback(async () => {
    if (state.dtoAdmissionSchool.email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionSchool.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.email]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const validateFEMailId = useCallback(async () => {
    if (state.dtoAdmissionSchool.father_email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionSchool.father_email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.father_email]);

  const onFatherEMailIdBlur = useCallback(async () => {
    const father_email = await validateFEMailId();
    setState({ errorMessages: { ...state.errorMessages, father_email: father_email } } as StateType);
  }, [validateFEMailId, state.errorMessages]);

  const validateMEMailId = useCallback(async () => {
    if (state.dtoAdmissionSchool.mother_email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionSchool.mother_email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.mother_email]);

  const onMotherEMailIdBlur = useCallback(async () => {
    const mother_email = await validateMEMailId();
    setState({ errorMessages: { ...state.errorMessages, mother_email: mother_email } } as StateType);
  }, [validateMEMailId, state.errorMessages]);

  const validatePhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionSchool.phone_no.trim();
    if (phone === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.phone_no]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateFPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionSchool.father_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.father_phone_no]);

  const onFPhoneNoBlur = useCallback(async () => {
    const father_phone_no = await validateFPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, father_phone_no: father_phone_no } } as StateType);
  }, [validateFPhoneNo, state.errorMessages]);

  const validateMPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionSchool.mother_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.mother_phone_no]);

  const onMPhoneNoBlur = useCallback(async () => {
    const mother_phone_no = await validateMPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, mother_phone_no: mother_phone_no } } as StateType);
  }, [validateMPhoneNo, state.errorMessages]);

  const validateStuAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionSchool.student_aadhaar_no.trim();
    if (aadhaar === '') {
      return null;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1{11}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.student_aadhaar_no]);

  const onStuAadhaarNoBlur = useCallback(async () => {
    const student_aadhaar_no = await validateStuAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, student_aadhaar_no: student_aadhaar_no } } as StateType);
  }, [validateStuAadhaarNo, state.errorMessages]);

  const validateFAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionSchool.father_aadhaar_no.trim();
    if (aadhaar === '') {
      return null;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1{11}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.father_aadhaar_no]);

  const onFAadhaarNoBlur = useCallback(async () => {
    const father_aadhaar_no = await validateFAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, father_aadhaar_no: father_aadhaar_no } } as StateType);
  }, [validateFAadhaarNo, state.errorMessages]);

  const validateMAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionSchool.mother_aadhaar_no.trim();
    if (aadhaar === '') {
      return null;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1{11}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionSchool.mother_aadhaar_no]);

  const onMAadhaarNoBlur = useCallback(async () => {
    const mother_aadhaar_no = await validateMAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, mother_aadhaar_no: mother_aadhaar_no } } as StateType);
  }, [validateMAadhaarNo, state.errorMessages]);

  const validateFatherName = useCallback(async () => {
    if (state.dtoAdmissionSchool.father_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.father_name]);

  const onFatherNameBlur = useCallback(async () => {
    const father_name = await validateFatherName();
    setState({ errorMessages: { ...state.errorMessages, father_name: father_name } } as StateType);
  }, [validateFatherName, state.errorMessages]);

  const validateMotherName = useCallback(async () => {
    if (state.dtoAdmissionSchool.mother_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.mother_name]);

  const onMotherNameBlur = useCallback(async () => {
    const mother_name = await validateMotherName();
    setState({ errorMessages: { ...state.errorMessages, mother_name: mother_name } } as StateType);
  }, [validateMotherName, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoAdmissionSchool.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/');
    },
    [router]
  );

  const onPhoneNoChange = useCallback(
    (field: 'phone_no' | 'father_phone_no' | 'mother_phone_no' | 'guardian_phone_no') =>
      (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const actualValue = typeof value === 'string' ? value : value.target.value;

        setState({
          ...state,
          dtoAdmissionSchool: {
            ...state.dtoAdmissionSchool,
            [field]: actualValue
          }
        } as StateType);
      },
    [state]
  );

  const onDobChange = useCallback(
    async (value: any): Promise<void> => {
      const dobError = await validateDob();
      setState({
        ...state,
        dtoAdmissionSchool: {
          ...state.dtoAdmissionSchool,
          dob: value
        },
        errorMessages: {
          ...state.errorMessages,
          dob: dobError
        }
      } as StateType);
    },
    [state, validateDob]
  );

  const validateAdmissionDate = useCallback(async () => {
    if (
      state.dtoAdmissionSchool.admission_date == null ||
      dayjs(getLocalTime(state.dtoAdmissionSchool.admission_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionSchool.admission_date]);

  const onAdmissionDateBlur = useCallback(async () => {
    const admission_date = await validateAdmissionDate();
    setState({ errorMessages: { ...state.errorMessages, admission_date: admission_date } } as StateType);
  }, [validateAdmissionDate, state.errorMessages]);

  const onAdmissionDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmissionSchool: { ...state.dtoAdmissionSchool, admission_date: value } } as StateType);
    },
    [state.dtoAdmissionSchool]
  );

  const onZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'zip_code' }
      });
    }
  };

  const onUndertakingChange = (checked: boolean) => {
    setState({
      ...state,
      dtoAdmissionSchool: {
        ...state.dtoAdmissionSchool,
        undertaking: checked ? 'Yes' : 'No'
      }
    });
  };

  const onPassingYearChange = useCallback(
    (
      field:
        | 'ug_passing_year'
        | 'pg_passing_year'
        | 'intermediate_year'
        | 'high_school_year'
        | 'diploma_passing_year'
        | 'intermediate_board'
        | 'high_school_board'
        | 'current_board'
        | 'boarder_day_scholar'
        | 'medium'
        | 'transport_route'
        | 'hostel_occupancy'
        | 'hostel_facility'
        | 'transport_facility'
        | 'scholarship_student'
        | 'religion'
        | 'course_type'
        | 'entry_type'
        | 'status'
        | 'blood_group'
        | 'category'
        | 'intermediate_stream'
        | 'gender'
        | 'staff_child'
    ) =>
      (event: any, value: unknown) => {
        setState({
          dtoAdmissionSchool: {
            ...state.dtoAdmissionSchool,
            [field]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      },
    [state.dtoAdmissionSchool]
  );

  const onLookupIdNameChange = useCallback(
    (fieldBase: 'country' | 'state' | 'course') => async (event: any, value: unknown) => {
      if (fieldBase === 'country') {
        setState({
          dtoAdmissionSchool: {
            ...state.dtoAdmissionSchool,
            [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
            [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? '',
            state_id: 0,
            state_name: ''
          }
        } as StateType);
      } else {
        setState({
          dtoAdmissionSchool: {
            ...state.dtoAdmissionSchool,
            [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
            [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      }
    },
    [state.dtoAdmissionSchool]
  );

  const onLookupValueChange = useCallback(
    (
      field:
        | 'category'
        | 'blood_group'
        | 'status'
        | 'religion'
        | 'current_board'
        | 'boarder_day_scholar'
        | 'medium'
        | 'transport_facility'
        | 'staff_child'
        | 'mess_facility'
        | 'iii_language'
        | 'ii_language'
        | 'stream'
        | 'gender'
    ) =>
      (event: any, value: unknown) => {
        setState({
          dtoAdmissionSchool: {
            ...state.dtoAdmissionSchool,
            [field]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      },
    [state.dtoAdmissionSchool]
  );

  const handleDocumentUpload = useCallback(
    async (event: React.ChangeEvent<any>, field: keyof AdmissionSchoolDTO) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      try {
        if (gConstants.IS_CLOUD_STORAGE_ENABLED) {
          setState({
            dtoAdmissionSchool: {
              ...state.dtoAdmissionSchool,
              [field]: files[0]
            }
          } as StateType);
        } else {
          setState({
            dtoAdmissionSchool: {
              ...state.dtoAdmissionSchool,
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

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
      isFormValid = false;
    }
    if (state.dtoCourse.course_type_name === gConstants.COURSE_TYPE_NAME_FOR_STREAM) {
      errorMessages.stream = await validateStream();
      if (errorMessages.stream) {
        isFormValid = false;
      }
    }
    errorMessages.category = await validateCategory();
    if (errorMessages.category) {
      isFormValid = false;
    }
    errorMessages.phone_no = await validatePhoneNo();
    if (errorMessages.phone_no) {
      isFormValid = false;
    }
    errorMessages.dob = await validateDob();
    if (errorMessages.dob) {
      isFormValid = false;
    }
    errorMessages.gender = await validateGender();
    if (errorMessages.gender) {
      isFormValid = false;
    }
    errorMessages.family_samagra_id = await validateFamilySamagraId();
    if (errorMessages.family_samagra_id) {
      isFormValid = false;
    }
    errorMessages.student_pen_no = await validatePenNo();
    if (errorMessages.student_pen_no) {
      isFormValid = false;
    }

    errorMessages.father_name = await validateFatherName();
    if (errorMessages.father_name) {
      isFormValid = false;
    }
    errorMessages.mother_name = await validateMotherName();
    if (errorMessages.mother_name) {
      isFormValid = false;
    }
    errorMessages.student_pen_no = await validatePenNo();
    if (errorMessages.student_pen_no) {
      isFormValid = false;
    }

    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    errorMessages.country_name = await validateCountryName();
    if (errorMessages.country_name) {
      isFormValid = false;
    }
    errorMessages.state_name = await validateStateName();
    if (errorMessages.state_name) {
      isFormValid = false;
    }
    errorMessages.city_name = await validateCityName();
    if (errorMessages.city_name) {
      isFormValid = false;
    }
    errorMessages.zip_code = await validateZipCode();
    if (errorMessages.zip_code) {
      isFormValid = false;
    }
    errorMessages.boarder_day_scholar = await validateBoardingType();
    if (errorMessages.boarder_day_scholar) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourseName();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.blood_group = await validateBloodGrp();
    if (errorMessages.blood_group) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    state.dtoCourse.course_type_name,
    validateCountryName,
    validateStateName,
    validateCityName,
    validateFirstName,
    validateStream,
    validateCategory,
    validateBloodGrp,
    validateBoardingType,
    validateZipCode,
    validateCourseName,
    validateMotherName,
    validateAddress,
    validateFatherName,
    validatePenNo,
    validateLastName,
    validateFamilySamagraId,
    validateDob,
    validateGender,
    validatePhoneNo
  ]);

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoAdmissionSchool: { ...ADMISSION_SCHOOL, id: state.dtoAdmissionSchool.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoAdmissionSchool.id, ERROR_MESSAGES]
  );

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          const emailError = validateEmails();
          if (emailError) {
            showSnackbar(emailError, 'error');
            setSaving(false);
            return;
          }
          const isUndertakingAccepted = state.dtoAdmissionSchool.undertaking === 'Yes';
          if (!isUndertakingAccepted) {
            showSnackbar('You must agree to the undertaking before submitting.', 'warning');
            setSaving(false);
            return;
          }
          if (state.dtoAdmissionSchool.id === 0) {
            const result = await addAdmissionReturnUserId({
              variables: {
                data: {
                  course_id: state.dtoAdmissionSchool.course_id,
                  course_name: state.dtoAdmissionSchool.course_name,
                  admission_date: state.dtoAdmissionSchool.admission_date,
                  gender: state.dtoAdmissionSchool.gender,
                  first_name: state.dtoAdmissionSchool.first_name,
                  last_name: state.dtoAdmissionSchool.last_name,
                  father_name: state.dtoAdmissionSchool.father_name,
                  mother_name: state.dtoAdmissionSchool.mother_name,
                  dob: state.dtoAdmissionSchool.dob,
                  category: state.dtoAdmissionSchool.category,
                  address: state.dtoAdmissionSchool.address,
                  state_id: state.dtoAdmissionSchool.state_id,
                  state_name: state.dtoAdmissionSchool.state_name,
                  country_id: state.dtoAdmissionSchool.country_id,
                  country_name: state.dtoAdmissionSchool.country_name,
                  city_name: state.dtoAdmissionSchool.city_name,
                  zip_code: state.dtoAdmissionSchool.zip_code,
                  email: state.dtoAdmissionSchool.email,
                  phone_no: state.dtoAdmissionSchool.phone_no,
                  religion: state.dtoAdmissionSchool.religion,
                  blood_group: state.dtoAdmissionSchool.blood_group,
                  boarder_day_scholar: state.dtoAdmissionSchool.boarder_day_scholar,
                  current_school: state.dtoAdmissionSchool.current_school,
                  current_board: state.dtoAdmissionSchool.current_board,
                  medium: state.dtoAdmissionSchool.medium,
                  father_qualification: state.dtoAdmissionSchool.father_qualification,
                  father_occupation: state.dtoAdmissionSchool.father_occupation,
                  father_organisation: state.dtoAdmissionSchool.father_organisation,
                  father_designation: state.dtoAdmissionSchool.father_designation,
                  father_phone_no: state.dtoAdmissionSchool.father_phone_no,
                  father_email: state.dtoAdmissionSchool.father_email,
                  mother_qualification: state.dtoAdmissionSchool.mother_qualification,
                  mother_occupation: state.dtoAdmissionSchool.mother_occupation,
                  mother_organisation: state.dtoAdmissionSchool.mother_organisation,
                  mother_designation: state.dtoAdmissionSchool.mother_designation,
                  mother_phone_no: state.dtoAdmissionSchool.mother_phone_no,
                  mother_email: state.dtoAdmissionSchool.mother_email,
                  student_aadhaar_no: state.dtoAdmissionSchool.student_aadhaar_no,
                  father_aadhaar_no: state.dtoAdmissionSchool.father_aadhaar_no,
                  mother_aadhaar_no: state.dtoAdmissionSchool.mother_aadhaar_no,
                  samagra_id_no: state.dtoAdmissionSchool.samagra_id_no,
                  staff_child: state.dtoAdmissionSchool.staff_child,
                  sibling_in_school: state.dtoAdmissionSchool.sibling_in_school,
                  parents_ex_school: state.dtoAdmissionSchool.parents_ex_school,
                  guardian_name: state.dtoAdmissionSchool.guardian_name,
                  guardian_phone_no: state.dtoAdmissionSchool.guardian_phone_no,
                  undertaking: state.dtoAdmissionSchool.undertaking,
                  iii_language: state.dtoAdmissionSchool.iii_language,
                  transport_facility: state.dtoAdmissionSchool.transport_facility,
                  transport_route: state.dtoAdmissionSchool.transport_route,
                  mess_facility: state.dtoAdmissionSchool.mess_facility,
                  ii_language: state.dtoAdmissionSchool.ii_language,
                  stream: state.dtoAdmissionSchool.stream,
                  family_samagra_id: state.dtoAdmissionSchool.family_samagra_id,
                  student_pen_no: state.dtoAdmissionSchool.student_pen_no,
                  status: gConstants.STATUS_UNPAID,
                },
                photo: state.dtoAdmissionSchool.photo,
                aadhaar_card: state.dtoAdmissionSchool.aadhaar_card,
                birth_certificate: state.dtoAdmissionSchool.birth_certificate,
                other_certificate: state.dtoAdmissionSchool.other_certificate,
                father_aadhaar: state.dtoAdmissionSchool.father_aadhaar,
                mother_aadhaar: state.dtoAdmissionSchool.mother_aadhaar,
                samagra_id: state.dtoAdmissionSchool.samagra_id,
                transfer_certificate: state.dtoAdmissionSchool.transfer_certificate,
                prev_class_marksheet: state.dtoAdmissionSchool.prev_class_marksheet,
                father_photo: state.dtoAdmissionSchool.father_photo,
                mother_photo: state.dtoAdmissionSchool.mother_photo
              }
            });
            if (result?.data?.addAdmissionReturnUserId > 0) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              const newUserId = result?.data?.addAdmissionReturnUserId;
              setStudentId(newUserId);
              setSubmitted(true);
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving affiliate:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addAdmissionReturnUserId, state.dtoAdmissionSchool]
  );

  useEffect(() => {
    getCourseList();
  }, [getCourseList]);

  useEffect(() => {
    getCountryList();
  }, [getCountryList]);

  useEffect(() => {
    getStateList();
  }, [getStateList, state.dtoAdmissionSchool.country_id]);

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);

  const setOpen5 = useCallback(async (): Promise<void> => {
    setState({ open5: true } as StateType);
  }, []);

  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setOpen7 = useCallback(async (): Promise<void> => {
    setState({ open7: true } as StateType);
  }, []);

  const setOpen8 = useCallback(async (): Promise<void> => {
    setState({ open8: true } as StateType);
  }, []);

  const setOpen9 = useCallback(async (): Promise<void> => {
    setState({ open9: true } as StateType);
  }, []);

  const setOpen10 = useCallback(async (): Promise<void> => {
    setState({ open10: true } as StateType);
  }, []);

  const setOpen11 = useCallback(async (): Promise<void> => {
    setState({ open11: true } as StateType);
  }, []);

  const setOpen13 = useCallback(async (): Promise<void> => {
    setState({ open13: true } as StateType);
  }, []);

  const setOpen14 = useCallback(async (): Promise<void> => {
    setState({ open14: true } as StateType);
  }, []);

  const setOpen15 = useCallback(async (): Promise<void> => {
    setState({ open15: true } as StateType);
  }, []);

  const setOpen16 = useCallback(async (): Promise<void> => {
    setState({ open16: true } as StateType);
  }, []);

  const setOpen17 = useCallback(async (): Promise<void> => {
    setState({ open17: true } as StateType);
  }, []);

  const setOpen18 = useCallback(async (): Promise<void> => {
    setState({ open18: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);

  const setClose5 = useCallback(async (): Promise<void> => {
    setState({ open5: false } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  const setClose7 = useCallback(async (): Promise<void> => {
    setState({ open7: false } as StateType);
  }, []);

  const setClose8 = useCallback(async (): Promise<void> => {
    setState({ open8: false } as StateType);
  }, []);

  const setClose9 = useCallback(async (): Promise<void> => {
    setState({ open9: false } as StateType);
  }, []);

  const setClose10 = useCallback(async (): Promise<void> => {
    setState({ open10: false } as StateType);
  }, []);

  const setClose11 = useCallback(async (): Promise<void> => {
    setState({ open11: false } as StateType);
  }, []);

  const setClose13 = useCallback(async (): Promise<void> => {
    setState({ open13: false } as StateType);
  }, []);

  const setClose14 = useCallback(async (): Promise<void> => {
    setState({ open14: false } as StateType);
  }, []);

  const setClose15 = useCallback(async (): Promise<void> => {
    setState({ open15: false } as StateType);
  }, []);

  const setClose16 = useCallback(async (): Promise<void> => {
    setState({ open16: false } as StateType);
  }, []);

  const setClose17 = useCallback(async (): Promise<void> => {
    setState({ open17: false } as StateType);
  }, []);

  const setClose18 = useCallback(async (): Promise<void> => {
    setState({ open18: false } as StateType);
  }, []);

  return {
    studentId,
    state,
    saving,
    submitted,
    admissionNumber,
    onPassingYearChange,
    onFPhoneNoBlur,
    onFatherEMailIdBlur,
    onMAadhaarNoChange,
    onFAadhaarNoChange,
    onStuAadhaarNoChange,
    onSamagraIdNumChange,
    setSubmitted,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onGenderBlur,
    onInputChange,
    onPlainInputChange,
    onDobChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen7,
    setClose7,
    setOpen8,
    setClose8,
    setOpen9,
    setClose9,
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen13,
    setClose13,
    setOpen14,
    setClose14,
    setOpen15,
    setClose15,
    setOpen16,
    setClose16,
    setOpen17,
    setClose17,
    setOpen18,
    setClose18,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onClearClick,
    onMotherNameBlur,
    onFatherNameBlur,
    onAddressBlur,
    onCourseNameBlur,
    onCategoryBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onCityNameBlur,
    onZipCodeBlur,
    onBloodGrpBlur,
    onBoardingTypeBlur,
    onPenNoBlur,
    onPenNoChange,
    onFamilySamagraIdChange,
    onZipCodeChange,
    onFamilySamagraIdBlur,
    handlePayNow,
    onUndertakingChange,
    onStreamBlur,
    onLookupValueChange,
    onLookupIdNameChange,
    onMPhoneNoBlur,
    onMAadhaarNoBlur,
    onFAadhaarNoBlur,
    onStuAadhaarNoBlur,
    onStudentSamagraIdBlur,
    onMotherEMailIdBlur,
    onAdmissionDateChange,
    onAdmissionDateBlur,
    onNormalizedInputChange
  };
};
export default useAdmSchool;
