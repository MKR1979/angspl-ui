import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AdmissionClgDTO, { ADMISSION_CLG } from '@/app/types/AdmissionClgDTO';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP, DISTRICT_LOOKUP } from '@/app/graphql/state';
import { COURSE_LOOKUP, GET_COURSE } from '@/app/graphql/Course';
import { COURSE_TYPE_LOOKUP } from '@/app/graphql/CourseType';
import { ADD_ADMISSION_CLG_RETURN_USERID, GET_ADMISSION_CLG_EMAIL_EXIST } from '@/app/graphql/AdmissionClg';
import { GET_LAST_ADMISSION } from '@/app/graphql/AdmissionTech';
import { regExEMail } from '@/app/common/Configuration';
import { useSelector } from '../../../store';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
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
  arrIIILanType,
  arrEduPassingYearType,
  arrStreamType,
  arrEntryType,
  arrHostelType,
  arrTransportRoute,
  arrAdmissionStatus,
  capitalizeWords
} from '@/app/common/Configuration';
import dayjs from 'dayjs';
import PaymentDTO, { PAYMENT } from '@/app/types/PaymentDTO';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import { validateDate } from '@/app/common/validationDate';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  admission_date: string | null;
  course_type_id: number | null;
  course_type_name: string | null;
  entry_type: string | null;
  gender: string | null;
  first_name: string | null;
  last_name: string | null;
  user_name: string | null;
  father_name: string | null;
  mother_name: string | null;
  dob: string | null;
  category: string | null;
  address: string | null;
  district_id: number | null;
  district_name: string | null;
  state_id: number | null;
  state_name: string | null;
  country_id: number | null;
  country_name: string | null;
  city_name: string | null;
  zip_code: string | null;
  corr_address: string | null;
  corr_district_id: number | null;
  corr_district_name: string | null;
  corr_state_id: number | null;
  corr_state_name: string | null;
  corr_country_id: number | null;
  corr_country_name: string | null;
  corr_city_name: string | null;
  corr_zip_code: string | null;
  email: string | null;
  phone_no: string | null;
  religion: string | null;
  blood_group: string | null;
  medium: string | null;
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
  high_school_board: string | null;
  high_school_year: string | null;
  high_school_roll_no: string | null;
  high_school_percentage: number | null;
  intermediate_board: string | null;
  intermediate_year: string | null;
  intermediate_roll_no: string | null;
  intermediate_stream: string | null;
  intermediate_percentage: number | null;
  diploma_college: string | null;
  diploma_university: string | null;
  diploma_registration_no: string | null;
  diploma_course_id: number | null;
  diploma_course_name: string | null;
  diploma_passing_year: string | null;
  diploma_cgpa: number | null;
  ug_college: string | null;
  ug_university: string | null;
  ug_registration_no: string | null;
  ug_course_id: number | null;
  ug_course_name: string | null;
  ug_passing_year: string | null;
  ug_cgpa: number | null;
  pg_college: string | null;
  pg_university: string | null;
  pg_registration_no: string | null;
  pg_course_id: number | null;
  pg_course_name: string | null;
  pg_passing_year: string | null;
  pg_cgpa: number | null;
  scholarship_student: string | null;
  photo: string | null;
  aadhaar_card: string | null;
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
  status: string | null;
};

type StateType = {
  dtoAdmissionClg: AdmissionClgDTO;
  arrGenderTypeLookup: LookupDTO[];
  arrStuMasterTypeLookup: LookupDTO[];
  arrStreamTypeLookup: LookupDTO[];
  arrIILanTypeLookup: LookupDTO[];
  arrIIILanTypeLookup: LookupDTO[];
  arrReligionTypeLookup: LookupDTO[];
  arrBloodGrpTypeLookup: LookupDTO[];
  arrMediumTypeLookup: LookupDTO[];
  arrEduBoardTypeLookup: LookupDTO[];
  arrSchoolBoardingTypeLookup: LookupDTO[];
  arrCategoryTypeLookup: LookupDTO[];
  arrMaritalStatusLookup: LookupDTO[];
  arrModulesStatusLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  arrCourseTypeLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrStateLookup: LookupDTO[];
  arrCorrStateLookup: LookupDTO[];
  arrDistrictLookup: LookupDTO[];
  arrCorrDistrictLookup: LookupDTO[];
  arrAdmissionStatusLookup: LookupDTO[];
  arrEntryTypeLookup: LookupDTO[];
  arrEduPassingYear: LookupDTO[];
  arrHostelTypeLookup: LookupDTO[];
  arrRouteTypeLookup: LookupDTO[];
  dtoReceipt: ReceiptDTO;
  dtoCourse: CourseAllDTO;
  dtoPayment: PaymentDTO;
  isEditMode: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  open8: boolean;
  open10: boolean;
  open11: boolean;
  open12: boolean;
  open14: boolean;
  open17: boolean;
  open18: boolean;
  open19: boolean;
  open20: boolean;
  open21: boolean;
  open22: boolean;
  open23: boolean;
  open24: boolean;
  open25: boolean;
  open26: boolean;
  open27: boolean;
  open28: boolean;
  open29: boolean;
  open30: boolean;
  open31: boolean;
  open32: boolean;
  open33: boolean;
  open34: boolean;
  open35: boolean;
  open36: boolean;
  open37: boolean;
  errorMessages: ErrorMessageType;
};

const useAdmCollege = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: 0,
    course_name: null,
    admission_date: null,
    course_type_id: null,
    course_type_name: null,
    entry_type: null,
    gender: null,
    first_name: null,
    last_name: null,
    user_name: null,
    father_name: null,
    mother_name: null,
    dob: null,
    category: null,
    address: null,
    district_id: 0,
    district_name: null,
    state_id: 0,
    state_name: null,
    country_id: 0,
    country_name: null,
    city_name: null,
    zip_code: null,
    corr_address: null,
    corr_district_id: 0,
    corr_district_name: null,
    corr_state_id: 0,
    corr_state_name: null,
    corr_country_id: 0,
    corr_country_name: null,
    corr_city_name: null,
    corr_zip_code: null,
    email: null,
    phone_no: null,
    religion: null,
    blood_group: null,
    medium: null,
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
    high_school_board: null,
    high_school_year: null,
    high_school_roll_no: null,
    high_school_percentage: null,
    intermediate_board: null,
    intermediate_year: null,
    intermediate_roll_no: null,
    intermediate_stream: null,
    intermediate_percentage: null,
    diploma_college: null,
    diploma_university: null,
    diploma_registration_no: null,
    diploma_course_id: null,
    diploma_course_name: null,
    diploma_passing_year: null,
    diploma_cgpa: null,
    ug_college: null,
    ug_university: null,
    ug_registration_no: null,
    ug_course_id: 0,
    ug_course_name: null,
    ug_passing_year: null,
    ug_cgpa: null,
    pg_college: null,
    pg_university: null,
    pg_registration_no: null,
    pg_course_id: null,
    pg_course_name: null,
    pg_passing_year: null,
    pg_cgpa: null,
    scholarship_student: null,
    photo: null,
    aadhaar_card: null,
    other_certificate: null,
    father_aadhaar: null,
    mother_aadhaar: null,
    samagra_id: null,
    prev_class_marksheet: null,
    father_photo: null,
    mother_photo: null,
    student_pen_no: null,
    family_samagra_id: null,
    undertaking: null,
    status: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmissionClg: ADMISSION_CLG,
    arrGenderTypeLookup: arrGenderType,
    arrStuMasterTypeLookup: arrStuMasterType,
    arrStreamTypeLookup: arrStreamType,
    arrIILanTypeLookup: arrIILanType,
    arrIIILanTypeLookup: arrIIILanType,
    arrReligionTypeLookup: arrReligionType,
    arrBloodGrpTypeLookup: arrBloodGrpType,
    arrEduBoardTypeLookup: arrEduBoardType,
    arrMediumTypeLookup: arrMediumType,
    arrSchoolBoardingTypeLookup: arrSchoolBoardingType,
    arrCategoryTypeLookup: arrCategoryType,
    arrMaritalStatusLookup: arrMaritalStatusType,
    arrModulesStatusLookup: arrModulesStatus,
    arrAdmissionStatusLookup: arrAdmissionStatus,
    arrEntryTypeLookup: arrEntryType,
    arrEduPassingYear: arrEduPassingYearType,
    arrHostelTypeLookup: arrHostelType,
    arrRouteTypeLookup: arrTransportRoute,
    arrCourseTypeLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    arrStateLookup: [] as LookupDTO[],
    arrDistrictLookup: [] as LookupDTO[],
    arrCorrStateLookup: [] as LookupDTO[],
    arrCorrDistrictLookup: [] as LookupDTO[],
    dtoReceipt: RECEIPT,
    dtoCourse: COURSE_LIST_ALL,
    dtoPayment: PAYMENT,
    isEditMode: false,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
    open10: false,
    open11: false,
    open12: false,
    open14: false,
    open17: false,
    open18: false,
    open19: false,
    open20: false,
    open21: false,
    open22: false,
    open23: false,
    open24: false,
    open25: false,
    open26: false,
    open27: false,
    open28: false,
    open29: false,
    open30: false,
    open31: false,
    open32: false,
    open33: false,
    open34: false,
    open35: false,
    open36: false,
    open37: false,
    errorMessages: { ...ERROR_MESSAGES }
  });
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [studentId, setStudentId] = useState<number>();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [admissionNumber, setAdmissionNumber] = useState<string | null>(null);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [addAdmissionClgReturnUserId] = useMutation(ADD_ADMISSION_CLG_RETURN_USERID, {});
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourseTypeLookup] = useLazyQuery(COURSE_TYPE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, { fetchPolicy: 'network-only' });
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getDistrictLookup] = useLazyQuery(DISTRICT_LOOKUP, { fetchPolicy: 'network-only' });
  const [getAdmissionClgEMailExist] = useLazyQuery(GET_ADMISSION_CLG_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getLastAdmission] = useLazyQuery(GET_LAST_ADMISSION, { fetchPolicy: 'network-only' });
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);

  // -----------------------payment----------------------------

  const RAZORPAY_CONFIG = {
    scriptUrl: siteConfig.find((c) => c.key === 'RAZORPAY_SCRIPT_URL')?.value ?? '',
    publicKey: siteConfig.find((c) => c.key === 'RAZORPAY_PUBLIC_KEY')?.value ?? '',
    merchantName: siteConfig.find((c) => c.key === 'RAZORPAY_MERCHANT_NAME')?.value ?? ''
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CONFIG.scriptUrl;
    script.async = true;
    console.log('public key ', RAZORPAY_CONFIG.publicKey);
    console.log('scriptUrl ', RAZORPAY_CONFIG.scriptUrl);
    console.log('merchantName ', RAZORPAY_CONFIG.merchantName);

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

  const handlePayNow = (course: string, fee: number, course_id: number, user_id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      //   if (fee <= 0) {
      //   console.log("Invalid fee amount. Fee must be greater than 0.");
      //   alert("Please enter a valid fee amount greater than 0.");
      //   resolve(false);
      //   return;
      // }
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
          name: state.dtoAdmissionClg.first_name + " " + state.dtoAdmissionClg.last_name, // userName || 'Student Name',
          email: state.dtoAdmissionClg.email,
          contact: state.dtoAdmissionClg.phone_no
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: () => {
            console.warn('Payment popup was closed by user');
            resolve(false);
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
        id: state.dtoAdmissionClg.course_id
      }
    });

    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setState({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmissionClg.course_id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmissionClg.course_id, getCourseData]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getAdmissionClgEMailExist({
      variables: {
        id: state.dtoAdmissionClg.id,
        email: state.dtoAdmissionClg.email
      }
    });
    if (!error && data) {
      exist = data.getAdmissionClgEMailExist;
    }
    return exist;
  }, [getAdmissionClgEMailExist, state.dtoAdmissionClg.id, state.dtoAdmissionClg.email]);

  const getLastAdmissionId = useCallback(async (): Promise<void> => {
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
    getLastAdmissionId();
  }, [getLastAdmissionId]);

  // new code
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
          country_id: state.dtoAdmissionClg.country_id
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
  }, [getStateLookup, state.dtoAdmissionClg.country_id]);

  const getDistrictList = useCallback(async (): Promise<void> => {
    try {
      let arrDistrictLookup: LookupDTO[] = [];
      const { error, data } = await getDistrictLookup({
        variables: {
          state_id: state.dtoAdmissionClg.state_id
        }
      });
      if (!error && data) {
        arrDistrictLookup = data.getDistrictLookup;
      }
      setState({ arrDistrictLookup: arrDistrictLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getDistrictLookup, state.dtoAdmissionClg.state_id]);

  const getCorrStateList = useCallback(async (): Promise<void> => {
    try {
      let arrCorrStateLookup: LookupDTO[] = [];
      const { error, data } = await getStateLookup({
        variables: {
          country_id: state.dtoAdmissionClg.corr_country_id
        }
      });
      if (!error && data) {
        arrCorrStateLookup = data.getStateLookup;
      }
      setState({ arrCorrStateLookup: arrCorrStateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getStateLookup, state.dtoAdmissionClg.corr_country_id]);

  const getCorrDistrictList = useCallback(async (): Promise<void> => {
    try {
      let arrCorrDistrictLookup: LookupDTO[] = [];
      const { error, data } = await getDistrictLookup({
        variables: {
          state_id: state.dtoAdmissionClg.corr_state_id
        }
      });
      if (!error && data) {
        arrCorrDistrictLookup = data.getDistrictLookup;
      }
      setState({ arrCorrDistrictLookup: arrCorrDistrictLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getDistrictLookup, state.dtoAdmissionClg.corr_state_id]);

  useEffect(() => {
    getCourseList();
    getCountryList();
  }, [getCourseList, getCountryList]);

  useEffect(() => {
    getCourseTypeList();
  }, [getCourseTypeList]);

  useEffect(() => {
    if (state.dtoAdmissionClg.country_id > 0) {
      getStateList();
    }
  }, [getStateList, state.dtoAdmissionClg.country_id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.corr_country_id > 0) {
      getCorrStateList();
    }
  }, [getCorrStateList, state.dtoAdmissionClg.corr_country_id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.state_id > 0) {
      getDistrictList();
    }
  }, [getDistrictList, state.dtoAdmissionClg.state_id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.corr_state_id > 0) {
      getCorrDistrictList();
    }
  }, [getCorrDistrictList, state.dtoAdmissionClg.corr_state_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoAdmissionClg]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAdmissionClg]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoAdmissionClg]
  );

  // UG Details  ***

  const validateUgRegNo = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_registration_no.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_registration_no]);

  const onUgRegNoBlur = useCallback(async () => {
    const ug_registration_no = await validateUgRegNo();
    setState({ errorMessages: { ...state.errorMessages, ug_registration_no: ug_registration_no } } as StateType);
  }, [validateUgRegNo, state.errorMessages]);

  const validateUgCourseName = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_course_name]);

  const onUgCourseNameBlur = useCallback(async () => {
    const ug_course_name = await validateUgCourseName();
    setState({ errorMessages: { ...state.errorMessages, ug_course_name: ug_course_name } } as StateType);
  }, [validateUgCourseName, state.errorMessages]);

  const validateUgPassingYear = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_passing_year.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_passing_year]);

  const onUgPassingYearBlur = useCallback(async () => {
    const ug_passing_year = await validateUgPassingYear();
    setState({ errorMessages: { ...state.errorMessages, ug_passing_year: ug_passing_year } } as StateType);
  }, [validateUgPassingYear, state.errorMessages]);

  const validateUgCgpa = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_cgpa == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_cgpa]);

  const onUgCgpaBlur = useCallback(async () => {
    const ug_cgpa = await validateUgCgpa();
    setState({ errorMessages: { ...state.errorMessages, ug_cgpa: ug_cgpa } } as StateType);
  }, [validateUgCgpa, state.errorMessages]);

  const validateUgCollege = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_college.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_college]);

  const onUgCollegeBlur = useCallback(async () => {
    const ug_college = await validateUgCollege();
    setState({ errorMessages: { ...state.errorMessages, ug_college: ug_college } } as StateType);
  }, [validateUgCollege, state.errorMessages]);

  const validateUgUniversity = useCallback(async () => {
    if (state.dtoAdmissionClg.ug_university.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.ug_university]);

  const onUgUniversityBlur = useCallback(async () => {
    const ug_university = await validateUgUniversity();
    setState({ errorMessages: { ...state.errorMessages, ug_university: ug_university } } as StateType);
  }, [validateUgUniversity, state.errorMessages]);

  // UG Details Ends here

  // PG Details  ***

  const validatePgRegNo = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_registration_no.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_registration_no]);

  const onPgRegNoBlur = useCallback(async () => {
    const pg_registration_no = await validatePgRegNo();
    setState({ errorMessages: { ...state.errorMessages, pg_registration_no: pg_registration_no } } as StateType);
  }, [validatePgRegNo, state.errorMessages]);

  const validatePgCourseName = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_course_name]);

  const onPgCourseNameBlur = useCallback(async () => {
    const pg_course_name = await validatePgCourseName();
    setState({ errorMessages: { ...state.errorMessages, pg_course_name: pg_course_name } } as StateType);
  }, [validatePgCourseName, state.errorMessages]);

  const validatePgCollege = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_college.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_college]);

  const onPgCollegeBlur = useCallback(async () => {
    const pg_college = await validatePgCollege();
    setState({ errorMessages: { ...state.errorMessages, pg_college: pg_college } } as StateType);
  }, [validatePgCollege, state.errorMessages]);

  const validatePgUniversity = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_university.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_university]);

  const onPgUniversityBlur = useCallback(async () => {
    const pg_university = await validatePgUniversity();
    setState({ errorMessages: { ...state.errorMessages, pg_university: pg_university } } as StateType);
  }, [validatePgUniversity, state.errorMessages]);

  const validatePgPassingYear = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_passing_year.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_passing_year]);

  const onPgPassingYearBlur = useCallback(async () => {
    const pg_passing_year = await validatePgPassingYear();
    setState({ errorMessages: { ...state.errorMessages, pg_passing_year: pg_passing_year } } as StateType);
  }, [validatePgPassingYear, state.errorMessages]);

  const validatePgCgpa = useCallback(async () => {
    if (state.dtoAdmissionClg.pg_cgpa == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.pg_cgpa]);

  const onPgCgpaBlur = useCallback(async () => {
    const pg_cgpa = await validatePgCgpa();
    setState({ errorMessages: { ...state.errorMessages, pg_cgpa: pg_cgpa } } as StateType);
  }, [validatePgCgpa, state.errorMessages]);

  // PG Details Ends here

  // Diploma Details  ***

  const validateDiplomaRegNo = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_registration_no.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_registration_no]);

  const onDiplomaRegNoBlur = useCallback(async () => {
    const diploma_registration_no = await validateDiplomaRegNo();
    setState({ errorMessages: { ...state.errorMessages, diploma_registration_no: diploma_registration_no } } as StateType);
  }, [validateDiplomaRegNo, state.errorMessages]);

  const validateDiplomaCourseName = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_course_name]);

  const onDiplomaCourseNameBlur = useCallback(async () => {
    const diploma_course_name = await validateDiplomaCourseName();
    setState({ errorMessages: { ...state.errorMessages, diploma_course_name: diploma_course_name } } as StateType);
  }, [validateDiplomaCourseName, state.errorMessages]);

  const validateDiplomaCollege = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_college.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_college]);

  const onDiplomaCollegeBlur = useCallback(async () => {
    const diploma_college = await validateDiplomaCollege();
    setState({ errorMessages: { ...state.errorMessages, diploma_college: diploma_college } } as StateType);
  }, [validateDiplomaCollege, state.errorMessages]);

  const validateDiplomaUniversity = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_university.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_university]);

  const onDiplomaUniversityBlur = useCallback(async () => {
    const diploma_university = await validateDiplomaUniversity();
    setState({ errorMessages: { ...state.errorMessages, diploma_university: diploma_university } } as StateType);
  }, [validateDiplomaUniversity, state.errorMessages]);

  const validateDiplomaPassingYear = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_passing_year.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_passing_year]);

  const onDiplomaPassingYearBlur = useCallback(async () => {
    const diploma_passing_year = await validateDiplomaPassingYear();
    setState({ errorMessages: { ...state.errorMessages, diploma_passing_year: diploma_passing_year } } as StateType);
  }, [validateDiplomaPassingYear, state.errorMessages]);

  const validateDiplomaCgpa = useCallback(async () => {
    if (state.dtoAdmissionClg.diploma_cgpa == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.diploma_cgpa]);

  const onDiplomaCgpaBlur = useCallback(async () => {
    const diploma_cgpa = await validateDiplomaCgpa();
    setState({ errorMessages: { ...state.errorMessages, diploma_cgpa: diploma_cgpa } } as StateType);
  }, [validateDiplomaCgpa, state.errorMessages]);

  // Diploma Details Ends here

  const onLookupValueChange = useCallback(
    (
      fieldBase:
        | 'country'
        | 'state'
        | 'district'
        | 'corr_country'
        | 'corr_state'
        | 'corr_district'
        | 'diploma_course'
        | 'ug_course'
        | 'pg_course'
        | 'course_type'
    ) =>
      (event: any, value: unknown) => {
        setState({
          dtoAdmissionClg: {
            ...state.dtoAdmissionClg,
            [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
            [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      },
    [state.dtoAdmissionClg]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAdmissionClg: { ...state.dtoAdmissionClg, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAdmissionClg]
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
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.SAMAGRA_ID_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'family_samagra_id' }
      });
    }
  };

  const validatePenNo = useCallback(async () => {
    const pen = state.dtoAdmissionClg.student_pen_no.trim();
    if (pen === '') {
      return null;
    }
    if (pen.length < gConstants.PEN_NO_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{11}$/.test(pen);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.student_pen_no]);

  const onPenNoBlur = useCallback(async () => {
    const student_pen_no = await validatePenNo();
    setState({ errorMessages: { ...state.errorMessages, student_pen_no: student_pen_no } } as StateType);
  }, [validatePenNo, state.errorMessages]);

  const validateFamilySamagraId = useCallback(async () => {
    const samagra = state.dtoAdmissionClg.family_samagra_id.trim();
    if (samagra === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (samagra.length < gConstants.FAMILY_SAMAGRA_ID_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{7}$/.test(samagra);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.family_samagra_id]);

  const onFamilySamagraIdBlur = useCallback(async () => {
    const family_samagra_id = await validateFamilySamagraId();
    setState({ errorMessages: { ...state.errorMessages, family_samagra_id: family_samagra_id } } as StateType);
  }, [validateFamilySamagraId, state.errorMessages]);

  const validateStudentSamagraId = useCallback(async () => {
    const samagra = state.dtoAdmissionClg.samagra_id_no.trim();
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
  }, [state.dtoAdmissionClg.samagra_id_no]);

  const onStudentSamagraIdBlur = useCallback(async () => {
    const samagra_id_no = await validateStudentSamagraId();
    setState({ errorMessages: { ...state.errorMessages, samagra_id_no: samagra_id_no } } as StateType);
  }, [validateStudentSamagraId, state.errorMessages]);

  const validateCountryName = useCallback(async () => {
    if (state.dtoAdmissionClg.country_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.country_name]);

  const onCountryNameBlur = useCallback(async () => {
    const country_name = await validateCountryName();
    setState({ errorMessages: { ...state.errorMessages, country_name: country_name } } as StateType);
  }, [validateCountryName, state.errorMessages]);

  const validateCorrDistrict = useCallback(async () => {
    if (state.dtoAdmissionClg.corr_district_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.corr_district_name]);

  const onCorrDistrictBlur = useCallback(async () => {
    const corr_district_name = await validateCorrDistrict();
    setState({ errorMessages: { ...state.errorMessages, corr_district_name: corr_district_name } } as StateType);
  }, [validateCorrDistrict, state.errorMessages]);

  const validateCorrStateName = useCallback(async () => {
    if (state.dtoAdmissionClg.corr_state_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.corr_state_name]);

  const onCorrStateBlur = useCallback(async () => {
    const corr_state_name = await validateCorrStateName();
    setState({ errorMessages: { ...state.errorMessages, corr_state_name: corr_state_name } } as StateType);
  }, [validateCorrStateName, state.errorMessages]);

  const validateCorrCountryName = useCallback(async () => {
    if (state.dtoAdmissionClg.corr_country_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.corr_country_name]);

  const onCorrCountryBlur = useCallback(async () => {
    const corr_country_name = await validateCorrCountryName();
    setState({ errorMessages: { ...state.errorMessages, corr_country_name: corr_country_name } } as StateType);
  }, [validateCorrCountryName, state.errorMessages]);

  const validateStateName = useCallback(async () => {
    if (state.dtoAdmissionClg.state_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.state_name]);

  const onStateNameBlur = useCallback(async () => {
    const state_name = await validateStateName();
    setState({ errorMessages: { ...state.errorMessages, state_name: state_name } } as StateType);
  }, [validateStateName, state.errorMessages]);

  const validateDistrictName = useCallback(async () => {
    if (state.dtoAdmissionClg.district_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.district_name]);

  const onDistrictNameBlur = useCallback(async () => {
    const district_name = await validateDistrictName();
    setState({ errorMessages: { ...state.errorMessages, district_name: district_name } } as StateType);
  }, [validateDistrictName, state.errorMessages]);

  const validateCourseName = useCallback(async () => {
    if (state.dtoAdmissionClg.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.course_name]);

  const onCourseNameBlur = useCallback(async () => {
    const course_name = await validateCourseName();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourseName, state.errorMessages]);

  const validateXiiStream = useCallback(async () => {
    if (state.dtoAdmissionClg.intermediate_stream.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.intermediate_stream]);

  const onIntermediateStreamBlur = useCallback(async () => {
    const intermediate_stream = await validateXiiStream();
    setState({ errorMessages: { ...state.errorMessages, intermediate_stream: intermediate_stream } } as StateType);
  }, [validateXiiStream, state.errorMessages]);

  const validateXRollNo = useCallback(async () => {
    if (state.dtoAdmissionClg.high_school_roll_no.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.high_school_roll_no]);

  const onXRollNoBlur = useCallback(async () => {
    const high_school_roll_no = await validateXRollNo();
    setState({ errorMessages: { ...state.errorMessages, high_school_roll_no: high_school_roll_no } } as StateType);
  }, [validateXRollNo, state.errorMessages]);

  const validateXiiRollNo = useCallback(async () => {
    if (state.dtoAdmissionClg.intermediate_roll_no.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.intermediate_roll_no]);

  const onXiiRollNoBlur = useCallback(async () => {
    const intermediate_roll_no = await validateXiiRollNo();
    setState({ errorMessages: { ...state.errorMessages, intermediate_roll_no: intermediate_roll_no } } as StateType);
  }, [validateXiiRollNo, state.errorMessages]);

  const validateFirstName = useCallback(async () => {
    if (state.dtoAdmissionClg.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.first_name]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAdmissionClg.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.last_name]);

  const validateEmails = (): string | null => {
    const { email, mother_email, father_email } = state.dtoAdmissionClg;
    if (!email && !mother_email && !father_email) {
      return "A valid email is required. You may provide Student, Mother, or Father's email address.”";
    }
    return null;
  };

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  const validateCityName = useCallback(async () => {
    if (state.dtoAdmissionClg.city_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.city_name]);

  const onCityNameBlur = useCallback(async () => {
    const city_name = await validateCityName();
    setState({ errorMessages: { ...state.errorMessages, city_name: city_name } } as StateType);
  }, [validateCityName, state.errorMessages]);

  const validateCorrCity = useCallback(async () => {
    if (state.dtoAdmissionClg.corr_city_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.corr_city_name]);

  const onCorrCityBlur = useCallback(async () => {
    const corr_city_name = await validateCorrCity();
    setState({ errorMessages: { ...state.errorMessages, corr_city_name: corr_city_name } } as StateType);
  }, [validateCorrCity, state.errorMessages]);

  const validateZipCode = useCallback(async () => {
    const zip = state.dtoAdmissionClg.zip_code.trim();
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
  }, [state.dtoAdmissionClg.zip_code]);

  const onZipCodeBlur = useCallback(async () => {
    const zip_code = await validateZipCode();
    setState({ errorMessages: { ...state.errorMessages, zip_code: zip_code } } as StateType);
  }, [validateZipCode, state.errorMessages]);

  const validateCorrZipCode = useCallback(async () => {
    const zip = state.dtoAdmissionClg.corr_zip_code.trim();
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
  }, [state.dtoAdmissionClg.corr_zip_code]);

  const onCorrZipCodeBlur = useCallback(async () => {
    const corr_zip_code = await validateCorrZipCode();
    setState({ errorMessages: { ...state.errorMessages, corr_zip_code: corr_zip_code } } as StateType);
  }, [validateCorrZipCode, state.errorMessages]);

  // const validateDob = useCallback(async () => {
  //   if (state.dtoAdmissionClg.dob == null || dayjs(getLocalTime(state.dtoAdmissionClg.dob)).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAdmissionClg.dob]);
  const validateDob = useCallback(() => {
    return validateDate({
      value: state.dtoAdmissionClg.dob,
    });
  }, [state.dtoAdmissionClg.dob]);

  const onDobBlur = useCallback(async () => {
    const dob = await validateDob();
    setState({ errorMessages: { ...state.errorMessages, dob: dob } } as StateType);
  }, [validateDob, state.errorMessages]);

  const validateAdmissionDate = useCallback(async () => {
    if (
      state.dtoAdmissionClg.admission_date == null ||
      dayjs(getLocalTime(state.dtoAdmissionClg.admission_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.admission_date]);

  const onAdmissionDateBlur = useCallback(async () => {
    const admission_date = await validateAdmissionDate();
    setState({ errorMessages: { ...state.errorMessages, admission_date: admission_date } } as StateType);
  }, [validateAdmissionDate, state.errorMessages]);

  const onAdmissionDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmissionClg: { ...state.dtoAdmissionClg, admission_date: value } } as StateType);
    },
    [state.dtoAdmissionClg]
  );

  const validateGender = useCallback(async () => {
    if (state.dtoAdmissionClg.gender.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.gender]);

  const onGenderBlur = useCallback(async () => {
    const gender = await validateGender();
    setState({ errorMessages: { ...state.errorMessages, gender: gender } } as StateType);
  }, [validateGender, state.errorMessages]);

  const onSamagraIdNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (digitsOnly.length <= gConstants.SAMAGRA_ID_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'samagra_id_no' }
      });
    }
  };

  const validateCourseType = useCallback(async () => {
    if (state.dtoAdmissionClg.course_type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.course_type_name]);

  const onCourseTypeBlur = useCallback(async () => {
    const course_type_name = await validateCourseType();
    setState({ errorMessages: { ...state.errorMessages, course_type_name: course_type_name } } as StateType);
  }, [validateCourseType, state.errorMessages]);

  const validateEntryType = useCallback(async () => {
    if (state.dtoAdmissionClg.entry_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.entry_type]);

  const onEntryTypeBlur = useCallback(async () => {
    const entry_type = await validateEntryType();
    setState({ errorMessages: { ...state.errorMessages, entry_type: entry_type } } as StateType);
  }, [validateEntryType, state.errorMessages]);

  const validateXIIBoard = useCallback(async () => {
    if (state.dtoAdmissionClg.intermediate_board.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.intermediate_board]);

  const onXIIBoardBlur = useCallback(async () => {
    const intermediate_board = await validateXIIBoard();
    setState({ errorMessages: { ...state.errorMessages, intermediate_board: intermediate_board } } as StateType);
  }, [validateXIIBoard, state.errorMessages]);

  const validateXBoard = useCallback(async () => {
    if (state.dtoAdmissionClg.high_school_board.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.high_school_board]);

  const onXBoardBlur = useCallback(async () => {
    const high_school_board = await validateXBoard();
    setState({ errorMessages: { ...state.errorMessages, high_school_board: high_school_board } } as StateType);
  }, [validateXBoard, state.errorMessages]);

  const validateXYear = useCallback(async () => {
    const highSchoolYear = state.dtoAdmissionClg.high_school_year.trim();
    const intermediateYear = state.dtoAdmissionClg.intermediate_year.trim();
    const is10threq = state.dtoCourse.is10threq;
    const is12threq = state.dtoCourse.is12threq;
    if (highSchoolYear === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (is10threq && is12threq && intermediateYear && Number(highSchoolYear) >= Number(intermediateYear)) {
      return 'High School year should be less than Intermediate year';
    }
    return null;
  }, [
    state.dtoAdmissionClg.high_school_year,
    state.dtoAdmissionClg.intermediate_year,
    state.dtoCourse.is10threq,
    state.dtoCourse.is12threq
  ]);

  const onXYearBlur = useCallback(async () => {
    const high_school_year = await validateXYear();
    setState({ errorMessages: { ...state.errorMessages, high_school_year: high_school_year } } as StateType);
  }, [validateXYear, state.errorMessages]);

  const validateXIIYear = useCallback(async () => {
    const highSchoolYear = state.dtoAdmissionClg.high_school_year.trim();
    const intermediateYear = state.dtoAdmissionClg.intermediate_year.trim();
    const is10threq = state.dtoCourse?.is10threq;
    const is12threq = state.dtoCourse?.is12threq;
    if (intermediateYear === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (is10threq && is12threq && highSchoolYear !== '' && Number(intermediateYear) <= Number(highSchoolYear)) {
      return 'Intermediate year should be greater than High School year';
    }
    return null;
  }, [
    state.dtoAdmissionClg.high_school_year,
    state.dtoAdmissionClg.intermediate_year,
    state.dtoCourse?.is10threq,
    state.dtoCourse?.is12threq
  ]);

  const onXIIYearBlur = useCallback(async () => {
    const intermediate_year = await validateXIIYear();
    setState({ errorMessages: { ...state.errorMessages, intermediate_year: intermediate_year } } as StateType);
  }, [validateXIIYear, state.errorMessages]);

  const validateScholarshipType = useCallback(async () => {
    if (state.dtoAdmissionClg.scholarship_student.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.scholarship_student]);

  const onScholarshipTypeBlur = useCallback(async () => {
    const scholarship_student = await validateScholarshipType();
    setState({ errorMessages: { ...state.errorMessages, scholarship_student: scholarship_student } } as StateType);
  }, [validateScholarshipType, state.errorMessages]);

  const validateCategory = useCallback(async () => {
    if (state.dtoAdmissionClg.category.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.category]);

  const onCategoryBlur = useCallback(async () => {
    const category = await validateCategory();
    setState({ errorMessages: { ...state.errorMessages, category: category } } as StateType);
  }, [validateCategory, state.errorMessages]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAdmissionClg.email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionClg.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.email, IsEMailExist]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const validateFEMailId = useCallback(async () => {
    if (state.dtoAdmissionClg.father_email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionClg.father_email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.father_email]);

  const onFatherEMailIdBlur = useCallback(async () => {
    const father_email = await validateFEMailId();
    setState({ errorMessages: { ...state.errorMessages, father_email: father_email } } as StateType);
  }, [validateFEMailId, state.errorMessages]);

  const validateMEMailId = useCallback(async () => {
    if (state.dtoAdmissionClg.mother_email.trim() === '') {
      return null;
    } else if (!state.dtoAdmissionClg.mother_email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.mother_email]);

  const onMotherEMailIdBlur = useCallback(async () => {
    const mother_email = await validateMEMailId();
    setState({ errorMessages: { ...state.errorMessages, mother_email: mother_email } } as StateType);
  }, [validateMEMailId, state.errorMessages]);

  const validatePhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionClg.phone_no.trim();
    if (phone === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.phone_no]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateFPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionClg.father_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.father_phone_no]);

  const onFPhoneNoBlur = useCallback(async () => {
    const father_phone_no = await validateFPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, father_phone_no: father_phone_no } } as StateType);
  }, [validateFPhoneNo, state.errorMessages]);

  const validateMPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmissionClg.mother_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.mother_phone_no]);

  const onMPhoneNoBlur = useCallback(async () => {
    const mother_phone_no = await validateMPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, mother_phone_no: mother_phone_no } } as StateType);
  }, [validateMPhoneNo, state.errorMessages]);

  const validateFatherName = useCallback(async () => {
    if (state.dtoAdmissionClg.father_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.father_name]);

  const onFatherNameBlur = useCallback(async () => {
    const father_name = await validateFatherName();
    setState({ errorMessages: { ...state.errorMessages, father_name: father_name } } as StateType);
  }, [validateFatherName, state.errorMessages]);

  const validateMotherName = useCallback(async () => {
    if (state.dtoAdmissionClg.mother_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.mother_name]);

  const onMotherNameBlur = useCallback(async () => {
    const mother_name = await validateMotherName();
    setState({ errorMessages: { ...state.errorMessages, mother_name: mother_name } } as StateType);
  }, [validateMotherName, state.errorMessages]);

  const validateXPercentage = useCallback(async () => {
    if (state.dtoAdmissionClg.high_school_percentage == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.high_school_percentage]);

  const onXPercentageBlur = useCallback(async () => {
    const high_school_percentage = await validateXPercentage();
    setState({ errorMessages: { ...state.errorMessages, high_school_percentage: high_school_percentage } } as StateType);
  }, [validateXPercentage, state.errorMessages]);

  const validateXIIPercentage = useCallback(async () => {
    if (state.dtoAdmissionClg.intermediate_percentage == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.intermediate_percentage]);

  const onXIIPercentageBlur = useCallback(async () => {
    const intermediate_percentage = await validateXIIPercentage();
    setState({ errorMessages: { ...state.errorMessages, intermediate_percentage: intermediate_percentage } } as StateType);
  }, [validateXIIPercentage, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoAdmissionClg.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const validateCorrAddress = useCallback(async () => {
    if (state.dtoAdmissionClg.corr_address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmissionClg.corr_address]);

  const onCorrAddressBlur = useCallback(async () => {
    const corr_address = await validateCorrAddress();
    setState({ errorMessages: { ...state.errorMessages, corr_address: corr_address } } as StateType);
  }, [validateCorrAddress, state.errorMessages]);

  const validateStuAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionClg.student_aadhaar_no.trim();
    if (aadhaar === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1{11}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmissionClg.student_aadhaar_no]);

  const onStuAadhaarNoBlur = useCallback(async () => {
    const student_aadhaar_no = await validateStuAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, student_aadhaar_no: student_aadhaar_no } } as StateType);
  }, [validateStuAadhaarNo, state.errorMessages]);

  const validateFAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionClg.father_aadhaar_no.trim();
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
  }, [state.dtoAdmissionClg.father_aadhaar_no]);

  const onFAadhaarNoBlur = useCallback(async () => {
    const father_aadhaar_no = await validateFAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, father_aadhaar_no: father_aadhaar_no } } as StateType);
  }, [validateFAadhaarNo, state.errorMessages]);

  const validateMAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmissionClg.mother_aadhaar_no.trim();
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
  }, [state.dtoAdmissionClg.mother_aadhaar_no]);

  const onMAadhaarNoBlur = useCallback(async () => {
    const mother_aadhaar_no = await validateMAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, mother_aadhaar_no: mother_aadhaar_no } } as StateType);
  }, [validateMAadhaarNo, state.errorMessages]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-clg/list`);
    },
    [router]
  );

  const onDobChange = useCallback(
    async (value: any): Promise<void> => {
      const dobError = await validateDob();

      setState({
        ...state,
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
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

  const onZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'zip_code' }
      });
    }
  };

  const onCorrZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'corr_zip_code' }
      });
    }
  };

  const onPhoneNoChange = useCallback(
    (field: 'phone_no' | 'father_phone_no' | 'mother_phone_no' | 'guardian_phone_no') =>
      (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const actualValue = typeof value === 'string' ? value : value.target.value;
        setState({
          ...state,
          dtoAdmissionClg: {
            ...state.dtoAdmissionClg,
            [field]: actualValue
          }
        } as StateType);
      },
    [state]
  );

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
          dtoAdmissionClg: {
            ...state.dtoAdmissionClg,
            [field]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      },
    [state.dtoAdmissionClg]
  );

  const onAadhaarNoChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: fieldName }
      });
    }
  };

  const onPercentageChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]?.length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    const numVal = parseFloat(value);
    if (!isNaN(numVal) && numVal > gConstants.PERCENTAGE_HIGHEST) {
      value = gConstants.PERCENTAGE_HIGHEST_STRING;
    }
    if (value.length <= gConstants.PERCENTAGE_MAX_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value, name: fieldName }
      });
    }
  };

  const onCgpaChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]?.length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    const numVal = parseFloat(value);
    if (!isNaN(numVal) && numVal > gConstants.CGPA_HIGHEST) {
      value = gConstants.CGPA_HIGHEST_STRING;
    }
    if (value.length <= 5) {
      onInputChange({
        ...e,
        target: { ...e.target, value, name: fieldName }
      });
    }
  };

  const handleDocumentUpload = useCallback(
    async (event: React.ChangeEvent<any>, field: keyof AdmissionClgDTO) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      try {
        if (gConstants.IS_CLOUD_STORAGE_ENABLED) {
          setState({
            dtoAdmissionClg: {
              ...state.dtoAdmissionClg,
              [field]: files[0]
            }
          } as StateType);
        } else {
          setState({
            dtoAdmissionClg: {
              ...state.dtoAdmissionClg,
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsSameAddress(checked);

    if (checked) {
      const { address, country_id, country_name, state_id, state_name, district_id, district_name, city_name, zip_code } =
        state.dtoAdmissionClg;

      setState({
        ...state,
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
          corr_address: address,
          corr_country_id: country_id,
          corr_country_name: country_name,
          corr_state_id: state_id,
          corr_state_name: state_name,
          corr_district_id: district_id,
          corr_district_name: district_name,
          corr_city_name: city_name,
          corr_zip_code: zip_code
        },
        errorMessages: {
          ...state.errorMessages,
          corr_address: address ? '' : state.errorMessages.corr_address,
          corr_country_name: country_name ? '' : state.errorMessages.corr_country_name,
          corr_state_name: state_name ? '' : state.errorMessages.corr_state_name,
          corr_district_name: district_name ? '' : state.errorMessages.corr_district_name,
          corr_city_name: city_name ? '' : state.errorMessages.corr_city_name,
          corr_zip_code: zip_code ? '' : state.errorMessages.corr_zip_code
        }
      });
    } else {
      setState({
        ...state,
        dtoAdmissionClg: {
          ...state.dtoAdmissionClg,
          corr_address: '',
          corr_country_id: 0,
          corr_country_name: '',
          corr_state_id: 0,
          corr_state_name: '',
          corr_district_id: 0,
          corr_district_name: '',
          corr_city_name: '',
          corr_zip_code: ''
        }
      });
    }
  };

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.course_type_name = await validateCourseType();
    if (errorMessages.course_type_name) {
      isFormValid = false;
    }
    errorMessages.entry_type = await validateEntryType();
    if (errorMessages.entry_type) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
      isFormValid = false;
    }

    errorMessages.phone_no = await validatePhoneNo();
    if (errorMessages.phone_no) {
      isFormValid = false;
    }
    errorMessages.gender = await validateGender();
    if (errorMessages.gender) {
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
    errorMessages.course_name = await validateCourseName();
    if (errorMessages.course_name) {
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
    errorMessages.district_name = await validateDistrictName();
    if (errorMessages.district_name) {
      isFormValid = false;
    }
    errorMessages.city_name = await validateCityName();
    if (errorMessages.city_name) {
      isFormValid = false;
    }
    errorMessages.family_samagra_id = await validateFamilySamagraId();
    if (errorMessages.family_samagra_id) {
      isFormValid = false;
    }
    errorMessages.scholarship_student = await validateScholarshipType();
    if (errorMessages.scholarship_student) {
      isFormValid = false;
    }
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    errorMessages.zip_code = await validateZipCode();
    if (errorMessages.zip_code) {
      isFormValid = false;
    }
    errorMessages.category = await validateCategory();
    if (errorMessages.category) {
      isFormValid = false;
    }
    errorMessages.dob = await validateDob();
    if (errorMessages.dob) {
      isFormValid = false;
    }
    errorMessages.student_aadhaar_no = await validateStuAadhaarNo();
    if (errorMessages.student_aadhaar_no) {
      isFormValid = false;
    }
    if (errorMessages.father_phone_no) {
      isFormValid = false;
    }
    errorMessages.mother_phone_no = await validateMPhoneNo();
    if (errorMessages.mother_phone_no) {
      isFormValid = false;
    }

    if (!isSameAddress) {
      errorMessages.corr_country_name = await validateCorrCountryName();
      if (errorMessages.corr_country_name) {
        isFormValid = false;
      }
      errorMessages.corr_state_name = await validateCorrStateName();
      if (errorMessages.corr_state_name) {
        isFormValid = false;
      }
      errorMessages.corr_district_name = await validateCorrDistrict();
      if (errorMessages.corr_district_name) {
        isFormValid = false;
      }
      errorMessages.corr_city_name = await validateCorrCity();
      if (errorMessages.corr_city_name) {
        isFormValid = false;
      }
      errorMessages.corr_address = await validateCorrAddress();
      if (errorMessages.corr_address) {
        isFormValid = false;
      }
      errorMessages.corr_zip_code = await validateCorrZipCode();
      if (errorMessages.corr_zip_code) {
        isFormValid = false;
      }
    }

    if (state.dtoCourse.is10threq) {
      errorMessages.high_school_year = await validateXYear();
      if (errorMessages.high_school_year) {
        isFormValid = false;
      }
      errorMessages.high_school_board = await validateXBoard();
      if (errorMessages.high_school_board) {
        isFormValid = false;
      }
      errorMessages.high_school_roll_no = await validateXRollNo();
      if (errorMessages.high_school_roll_no) {
        isFormValid = false;
      }
    }

    if (state.dtoCourse.is12threq) {
      errorMessages.intermediate_year = await validateXIIYear();
      if (errorMessages.intermediate_year) {
        isFormValid = false;
      }
      errorMessages.intermediate_board = await validateXIIBoard();
      if (errorMessages.intermediate_board) {
        isFormValid = false;
      }
      errorMessages.intermediate_roll_no = await validateXiiRollNo();
      if (errorMessages.intermediate_roll_no) {
        isFormValid = false;
      }
      errorMessages.intermediate_stream = await validateXiiStream();
      if (errorMessages.intermediate_stream) {
        isFormValid = false;
      }
    }

    if (state.dtoCourse.isdiplomareq) {
      errorMessages.diploma_registration_no = await validateDiplomaRegNo();
      if (errorMessages.diploma_registration_no) isFormValid = false;

      errorMessages.diploma_course_name = await validateDiplomaCourseName();
      if (errorMessages.diploma_course_name) isFormValid = false;

      errorMessages.diploma_college = await validateDiplomaCollege();
      if (errorMessages.diploma_college) isFormValid = false;

      errorMessages.diploma_university = await validateDiplomaUniversity();
      if (errorMessages.diploma_university) isFormValid = false;

      errorMessages.diploma_passing_year = await validateDiplomaPassingYear();
      if (errorMessages.diploma_passing_year) isFormValid = false;
    }

    if (state.dtoCourse.isgradreq) {
      errorMessages.ug_registration_no = await validateUgRegNo();
      if (errorMessages.ug_registration_no) isFormValid = false;

      errorMessages.ug_course_name = await validateUgCourseName();
      if (errorMessages.ug_course_name) isFormValid = false;

      errorMessages.ug_college = await validateUgCollege();
      if (errorMessages.ug_college) isFormValid = false;

      errorMessages.ug_university = await validateUgUniversity();
      if (errorMessages.ug_university) isFormValid = false;

      errorMessages.ug_passing_year = await validateUgPassingYear();
      if (errorMessages.ug_passing_year) isFormValid = false;
    }

    if (state.dtoCourse.ispgreq) {
      errorMessages.pg_registration_no = await validatePgRegNo();
      if (errorMessages.pg_registration_no) isFormValid = false;

      errorMessages.pg_course_name = await validatePgCourseName();
      if (errorMessages.pg_course_name) isFormValid = false;

      errorMessages.pg_college = await validatePgCollege();
      if (errorMessages.pg_college) isFormValid = false;

      errorMessages.pg_university = await validatePgUniversity();
      if (errorMessages.pg_university) isFormValid = false;

      errorMessages.pg_passing_year = await validatePgPassingYear();
      if (errorMessages.pg_passing_year) isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    isSameAddress,
    state.dtoCourse,
    validateCourseType,
    validateFirstName,
    validateZipCode,
    validateCourseName,
    validateMotherName,
    validateFamilySamagraId,
    validateScholarshipType,
    validateAddress,
    validateFatherName,
    validateLastName,
    validateGender,
    validatePhoneNo,
    validateDiplomaRegNo,
    validateDiplomaCourseName,
    validateDiplomaCollege,
    validateDiplomaUniversity,
    validateDiplomaPassingYear,
    validateUgRegNo,
    validateUgCourseName,
    validateUgCollege,
    validateUgUniversity,
    validateUgPassingYear,
    validatePgRegNo,
    validatePgCourseName,
    validatePgCollege,
    validatePgUniversity,
    validatePgPassingYear,
    validateXYear,
    validateXBoard,
    validateXRollNo,
    validateXIIYear,
    validateXIIBoard,
    validateXiiRollNo,
    validateXiiStream,
    validateEntryType,
    validateCountryName,
    validateStateName,
    validateDistrictName,
    validateCityName,
    validateCorrCountryName,
    validateCorrStateName,
    validateCorrDistrict,
    validateCorrCity,
    validateCorrAddress,
    validateCorrZipCode,
    validateDob,
    validateCategory,
    validateStuAadhaarNo,
    validateMPhoneNo
  ]);

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoAdmissionClg: { ...ADMISSION_CLG, id: state.dtoAdmissionClg.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoAdmissionClg.id, ERROR_MESSAGES]
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
          const isUndertakingAccepted = state.dtoAdmissionClg.undertaking === 'Yes';
          if (!isUndertakingAccepted) {
            showSnackbar('You must agree to the undertaking before submitting.', 'warning');
            setSaving(false);
            return;
          }
          if (state.dtoAdmissionClg.id === 0) {
            const result = await addAdmissionClgReturnUserId({
              variables: {
                data: {
                  admission_date: state.dtoAdmissionClg.admission_date,
                  course_type_id: state.dtoAdmissionClg.course_type_id,
                  course_id: state.dtoAdmissionClg.course_id,
                  entry_type: state.dtoAdmissionClg.entry_type,
                  gender: state.dtoAdmissionClg.gender,
                  first_name: state.dtoAdmissionClg.first_name,
                  last_name: state.dtoAdmissionClg.last_name,
                  user_name: state.dtoAdmissionClg.user_name,
                  father_name: state.dtoAdmissionClg.father_name,
                  mother_name: state.dtoAdmissionClg.mother_name,
                  dob: state.dtoAdmissionClg.dob,
                  category: state.dtoAdmissionClg.category,
                  address: state.dtoAdmissionClg.address,
                  district_id: state.dtoAdmissionClg.district_id,
                  state_id: state.dtoAdmissionClg.state_id,
                  country_id: state.dtoAdmissionClg.country_id,
                  city_name: state.dtoAdmissionClg.city_name,
                  zip_code: state.dtoAdmissionClg.zip_code,
                  corr_address: state.dtoAdmissionClg.corr_address,
                  corr_district_id: state.dtoAdmissionClg.corr_district_id,
                  corr_state_id: state.dtoAdmissionClg.corr_state_id,
                  corr_country_id: state.dtoAdmissionClg.corr_country_id,
                  corr_city_name: state.dtoAdmissionClg.corr_city_name,
                  corr_zip_code: state.dtoAdmissionClg.corr_zip_code,
                  high_school_board: state.dtoAdmissionClg.high_school_board,
                  high_school_year: Number(state.dtoAdmissionClg.high_school_year),
                  high_school_roll_no: state.dtoAdmissionClg.high_school_roll_no,
                  high_school_percentage: state.dtoAdmissionClg.high_school_percentage,
                  intermediate_board: state.dtoAdmissionClg.intermediate_board,
                  intermediate_year: Number(state.dtoAdmissionClg.intermediate_year),
                  intermediate_roll_no: state.dtoAdmissionClg.intermediate_roll_no,
                  intermediate_stream: state.dtoAdmissionClg.intermediate_stream,
                  intermediate_percentage: state.dtoAdmissionClg.intermediate_percentage,
                  diploma_college: state.dtoAdmissionClg.diploma_college,
                  diploma_university: state.dtoAdmissionClg.diploma_university,
                  diploma_registration_no: state.dtoAdmissionClg.diploma_registration_no,
                  diploma_course_id: state.dtoAdmissionClg.diploma_course_id,
                  diploma_passing_year: Number(state.dtoAdmissionClg.diploma_passing_year),
                  diploma_cgpa: state.dtoAdmissionClg.diploma_cgpa,
                  ug_college: state.dtoAdmissionClg.ug_college,
                  ug_university: state.dtoAdmissionClg.ug_university,
                  ug_registration_no: state.dtoAdmissionClg.ug_registration_no,
                  ug_course_id: state.dtoAdmissionClg.ug_course_id,
                  ug_passing_year: Number(state.dtoAdmissionClg.ug_passing_year),
                  ug_cgpa: state.dtoAdmissionClg.ug_cgpa,
                  pg_college: state.dtoAdmissionClg.pg_college,
                  pg_university: state.dtoAdmissionClg.pg_university,
                  pg_registration_no: state.dtoAdmissionClg.pg_registration_no,
                  pg_course_id: state.dtoAdmissionClg.pg_course_id,
                  pg_passing_year: Number(state.dtoAdmissionClg.pg_passing_year),
                  pg_cgpa: state.dtoAdmissionClg.pg_cgpa,
                  email: state.dtoAdmissionClg.email,
                  phone_no: state.dtoAdmissionClg.phone_no,
                  religion: state.dtoAdmissionClg.religion,
                  blood_group: state.dtoAdmissionClg.blood_group,
                  medium: state.dtoAdmissionClg.medium,
                  father_qualification: state.dtoAdmissionClg.father_qualification,
                  father_occupation: state.dtoAdmissionClg.father_occupation,
                  father_organisation: state.dtoAdmissionClg.father_organisation,
                  father_designation: state.dtoAdmissionClg.father_designation,
                  father_phone_no: state.dtoAdmissionClg.father_phone_no,
                  father_email: state.dtoAdmissionClg.father_email,
                  mother_qualification: state.dtoAdmissionClg.mother_qualification,
                  mother_occupation: state.dtoAdmissionClg.mother_occupation,
                  mother_organisation: state.dtoAdmissionClg.mother_organisation,
                  mother_designation: state.dtoAdmissionClg.mother_designation,
                  mother_phone_no: state.dtoAdmissionClg.mother_phone_no,
                  mother_email: state.dtoAdmissionClg.mother_email,
                  student_aadhaar_no: state.dtoAdmissionClg.student_aadhaar_no,
                  father_aadhaar_no: state.dtoAdmissionClg.father_aadhaar_no,
                  mother_aadhaar_no: state.dtoAdmissionClg.mother_aadhaar_no,
                  samagra_id_no: state.dtoAdmissionClg.samagra_id_no,
                  staff_child: state.dtoAdmissionClg.staff_child,
                  sibling_in_college: state.dtoAdmissionClg.sibling_in_college,
                  parents_ex_college: state.dtoAdmissionClg.parents_ex_college,
                  guardian_name: state.dtoAdmissionClg.guardian_name,
                  guardian_phone_no: state.dtoAdmissionClg.guardian_phone_no,
                  undertaking: state.dtoAdmissionClg.undertaking,
                  transport_facility: state.dtoAdmissionClg.transport_facility,
                  transport_route: state.dtoAdmissionClg.transport_route,
                  hostel_facility: state.dtoAdmissionClg.hostel_facility,
                  hostel_occupancy: state.dtoAdmissionClg.hostel_occupancy,
                  scholarship_student: state.dtoAdmissionClg.scholarship_student,
                  stream: state.dtoAdmissionClg.stream,
                  family_samagra_id: state.dtoAdmissionClg.family_samagra_id,
                  student_pen_no: state.dtoAdmissionClg.student_pen_no,
                  status: gConstants.STATUS_UNPAID,
                },
                photo: state.dtoAdmissionClg.photo,
                aadhaar_card: state.dtoAdmissionClg.aadhaar_card,
                other_certificate: state.dtoAdmissionClg.other_certificate,
                father_aadhaar: state.dtoAdmissionClg.father_aadhaar,
                mother_aadhaar: state.dtoAdmissionClg.mother_aadhaar,
                samagra_id: state.dtoAdmissionClg.samagra_id,
                transfer_certificate: state.dtoAdmissionClg.transfer_certificate,
                high_school_marksheet: state.dtoAdmissionClg.high_school_marksheet,
                intermediate_marksheet: state.dtoAdmissionClg.intermediate_marksheet,
                diploma_marksheet: state.dtoAdmissionClg.diploma_marksheet,
                ug_marksheet: state.dtoAdmissionClg.ug_marksheet,
                pg_marksheet: state.dtoAdmissionClg.pg_marksheet,
                anti_ragging: state.dtoAdmissionClg.anti_ragging,
                student_undertaking: state.dtoAdmissionClg.student_undertaking,
                parents_undertaking: state.dtoAdmissionClg.parents_undertaking,
                father_photo: state.dtoAdmissionClg.father_photo,
                mother_photo: state.dtoAdmissionClg.mother_photo
              }
            });
            if (result?.data?.addAdmissionClgReturnUserId > 0) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              const newUserId = result?.data?.addAdmissionClgReturnUserId;
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
    [validateForm, addAdmissionClgReturnUserId, state.dtoAdmissionClg]
  );

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

  const setOpen10 = useCallback(async (): Promise<void> => {
    setState({ open10: true } as StateType);
  }, []);

  const setOpen11 = useCallback(async (): Promise<void> => {
    setState({ open11: true } as StateType);
  }, []);

  const setOpen12 = useCallback(async (): Promise<void> => {
    setState({ open12: true } as StateType);
  }, []);

  const setOpen14 = useCallback(async (): Promise<void> => {
    setState({ open14: true } as StateType);
  }, []);

  const setOpen17 = useCallback(async (): Promise<void> => {
    setState({ open17: true } as StateType);
  }, []);
  const setOpen19 = useCallback(async (): Promise<void> => {
    setState({ open19: true } as StateType);
  }, []);
  const setOpen20 = useCallback(async (): Promise<void> => {
    setState({ open20: true } as StateType);
  }, []);
  const setOpen21 = useCallback(async (): Promise<void> => {
    setState({ open21: true } as StateType);
  }, []);
  const setOpen22 = useCallback(async (): Promise<void> => {
    setState({ open22: true } as StateType);
  }, []);
  const setOpen23 = useCallback(async (): Promise<void> => {
    setState({ open23: true } as StateType);
  }, []);
  const setOpen24 = useCallback(async (): Promise<void> => {
    setState({ open24: true } as StateType);
  }, []);
  const setOpen25 = useCallback(async (): Promise<void> => {
    setState({ open25: true } as StateType);
  }, []);
  const setOpen26 = useCallback(async (): Promise<void> => {
    setState({ open26: true } as StateType);
  }, []);
  const setOpen27 = useCallback(async (): Promise<void> => {
    setState({ open27: true } as StateType);
  }, []);
  const setOpen28 = useCallback(async (): Promise<void> => {
    setState({ open28: true } as StateType);
  }, []);
  const setOpen29 = useCallback(async (): Promise<void> => {
    setState({ open29: true } as StateType);
  }, []);
  const setOpen30 = useCallback(async (): Promise<void> => {
    setState({ open30: true } as StateType);
  }, []);
  const setOpen31 = useCallback(async (): Promise<void> => {
    setState({ open31: true } as StateType);
  }, []);
  const setOpen32 = useCallback(async (): Promise<void> => {
    setState({ open32: true } as StateType);
  }, []);
  const setOpen33 = useCallback(async (): Promise<void> => {
    setState({ open33: true } as StateType);
  }, []);
  const setOpen34 = useCallback(async (): Promise<void> => {
    setState({ open34: true } as StateType);
  }, []);
  const setOpen35 = useCallback(async (): Promise<void> => {
    setState({ open35: true } as StateType);
  }, []);
  const setOpen36 = useCallback(async (): Promise<void> => {
    setState({ open36: true } as StateType);
  }, []);
  const setOpen37 = useCallback(async (): Promise<void> => {
    setState({ open37: true } as StateType);
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
  const setClose10 = useCallback(async (): Promise<void> => {
    setState({ open10: false } as StateType);
  }, []);
  const setClose11 = useCallback(async (): Promise<void> => {
    setState({ open11: false } as StateType);
  }, []);
  const setClose12 = useCallback(async (): Promise<void> => {
    setState({ open12: false } as StateType);
  }, []);
  const setClose14 = useCallback(async (): Promise<void> => {
    setState({ open14: false } as StateType);
  }, []);
  const setClose17 = useCallback(async (): Promise<void> => {
    setState({ open17: false } as StateType);
  }, []);
  const setClose19 = useCallback(async (): Promise<void> => {
    setState({ open19: false } as StateType);
  }, []);
  const setClose20 = useCallback(async (): Promise<void> => {
    setState({ open20: false } as StateType);
  }, []);
  const setClose21 = useCallback(async (): Promise<void> => {
    setState({ open21: false } as StateType);
  }, []);
  const setClose22 = useCallback(async (): Promise<void> => {
    setState({ open22: false } as StateType);
  }, []);
  const setClose23 = useCallback(async (): Promise<void> => {
    setState({ open23: false } as StateType);
  }, []);
  const setClose24 = useCallback(async (): Promise<void> => {
    setState({ open24: false } as StateType);
  }, []);
  const setClose25 = useCallback(async (): Promise<void> => {
    setState({ open25: false } as StateType);
  }, []);
  const setClose26 = useCallback(async (): Promise<void> => {
    setState({ open26: false } as StateType);
  }, []);
  const setClose27 = useCallback(async (): Promise<void> => {
    setState({ open27: false } as StateType);
  }, []);
  const setClose28 = useCallback(async (): Promise<void> => {
    setState({ open28: false } as StateType);
  }, []);
  const setClose29 = useCallback(async (): Promise<void> => {
    setState({ open29: false } as StateType);
  }, []);
  const setClose30 = useCallback(async (): Promise<void> => {
    setState({ open30: false } as StateType);
  }, []);
  const setClose31 = useCallback(async (): Promise<void> => {
    setState({ open31: false } as StateType);
  }, []);
  const setClose32 = useCallback(async (): Promise<void> => {
    setState({ open32: false } as StateType);
  }, []);
  const setClose33 = useCallback(async (): Promise<void> => {
    setState({ open33: false } as StateType);
  }, []);
  const setClose34 = useCallback(async (): Promise<void> => {
    setState({ open34: false } as StateType);
  }, []);
  const setClose35 = useCallback(async (): Promise<void> => {
    setState({ open35: false } as StateType);
  }, []);
  const setClose36 = useCallback(async (): Promise<void> => {
    setState({ open36: false } as StateType);
  }, []);
  const setClose37 = useCallback(async (): Promise<void> => {
    setState({ open37: false } as StateType);
  }, []);

  const onUndertakingChange = (checked: boolean) => {
    setState({
      ...state,
      dtoAdmissionClg: {
        ...state.dtoAdmissionClg,
        undertaking: checked ? 'Yes' : 'No'
      }
    });
  };

  return {
    state,
    saving,
    isSameAddress,
    submitted,
    admissionNumber, studentId,
    handlePayNow,
    onStudentSamagraIdBlur,
    onFPhoneNoBlur,
    onFatherEMailIdBlur,
    onMPhoneNoBlur,
    onMotherEMailIdBlur,
    onMAadhaarNoBlur,
    onFAadhaarNoBlur,
    onStuAadhaarNoBlur,
    onAadhaarNoChange,
    onSamagraIdNumChange,
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
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen12,
    setClose12,
    setOpen14,
    setClose14,
    setOpen17,
    setClose17,
    setOpen19,
    setClose19,
    setOpen20,
    setClose20,
    setOpen21,
    setClose21,
    setOpen22,
    setClose22,
    setOpen23,
    setClose23,
    setOpen24,
    setClose24,
    setOpen25,
    setClose25,
    setOpen26,
    setClose26,
    setOpen27,
    setClose27,
    setOpen28,
    setClose28,
    setOpen29,
    setClose29,
    setOpen30,
    setClose30,
    setOpen31,
    setClose31,
    setOpen32,
    setClose32,
    setOpen33,
    setClose33,
    setOpen34,
    setClose34,
    setOpen37,
    setClose37,
    setOpen35,
    setClose35,
    setOpen36,
    setClose36,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onClearClick,
    onMotherNameBlur,
    onFatherNameBlur,
    onAddressBlur,
    onCategoryBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onLookupValueChange,
    onCourseNameChange,
    onCityNameBlur,
    onZipCodeBlur,
    onPenNoBlur,
    onPenNoChange,
    onFamilySamagraIdChange,
    onZipCodeChange,
    onFamilySamagraIdBlur,
    onCourseTypeBlur,
    onXBoardBlur,
    onXIIBoardBlur,
    onXIIYearBlur,
    onXYearBlur,
    onXIIPercentageBlur,
    onXPercentageBlur,
    onUgCollegeBlur,
    onUgUniversityBlur,
    onUgCourseNameBlur,
    onUgPassingYearBlur,
    onPgCgpaBlur,
    onUgCgpaBlur,
    onPgPassingYearBlur,
    onPgCourseNameBlur,
    onPgUniversityBlur,
    onPgCollegeBlur,
    onPassingYearChange,
    onDistrictNameBlur,
    onCorrAddressBlur,
    onCourseNameBlur,
    onCorrZipCodeChange,
    onCorrStateBlur,
    onCorrDistrictBlur,
    onCorrCityBlur,
    onCorrZipCodeBlur,
    onCorrCountryBlur,
    handleCheckboxChange,
    onIntermediateStreamBlur,
    onXiiRollNoBlur,
    onXRollNoBlur,
    onPgRegNoBlur,
    onUgRegNoBlur,
    onDiplomaCollegeBlur,
    onDiplomaUniversityBlur,
    onDiplomaRegNoBlur,
    onDiplomaCourseNameBlur,
    onDiplomaPassingYearBlur,
    onDiplomaCgpaBlur,
    onScholarshipTypeBlur,
    onPercentageChange,
    onEntryTypeBlur,
    onCgpaChange,
    onUndertakingChange,
    onAdmissionDateChange,
    onAdmissionDateBlur,
    onNormalizedInputChange
  };
};
export default useAdmCollege;
