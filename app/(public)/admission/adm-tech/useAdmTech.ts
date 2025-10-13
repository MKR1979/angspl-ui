import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AdmissionDTO, { ADMISSION_TECH } from '@/app/types/AdmissionTechDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { COURSE_LOOKUP, GET_COURSE } from '@/app/graphql/Course';
import { ADD_ADMISSION_TECH_RETURN_USERID, GET_LAST_ADMISSION } from '@/app/graphql/AdmissionTech';
import { useSelector } from '../../../store';
import { regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { getLocalTime } from '@/app/common/Configuration';
import { arrGenderType, arrPaymentMode, capitalizeWords } from '@/app/common/Configuration';
import dayjs from 'dayjs';
import PaymentDTO, { PAYMENT } from '@/app/types/PaymentDTO';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import { validateDate } from '@/app/common/validationDate';

type ErrorMessageType = {
  course_id: string | null;
  course_name: string | null;
  admission_date: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  dob: string | null;
  gender: string | null;
  address: string | null;
  city_name: string | null;
  state_id: number | null;
  state_name: string | null;
  country_id: string | null;
  country_name: string | null;
  zip_code: string | null;
  aadhaar_no: string | null;
  samagra_id: string | null;
  pen_no: string | null;
  father_name: string | null;
  father_occupation: string | null;
  father_phone_no: string | null;
  mother_name: string | null;
  mother_occupation: string | null;
  mother_phone_no: string | null;
  highschoolname: string | null;
  highschoolpercentage: string | null;
  highersschoolname: string | null;
  highersschoolpercentage: string | null;
  graduationname: string | null;
  graduationpercentage: string | null;
  tenthproof: string | null;
  twelthproof: string | null;
  graduationproof: string | null;
  photoidproof: string | null;
  photo: string | null;
  is_aadhar_req: string | null;
  is_birth_certi_req: string | null;
  is_tc_req: string | null;
  is_samagraid_req: string | null;
  paid_amount: number | null;
  total_fee: number | null;
  payment_mode: string | null;
};

type StateType = {
  dtoAdmission: AdmissionDTO;
  arrStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  arrCourseListAll: CourseAllDTO[];
  arrGenderTypeLookup: LookupDTO[];
  dtoPayment: PaymentDTO;
  arrPaymentModeLookup: LookupDTO[];
  dtoReceipt: ReceiptDTO;
  dtoCourse: CourseAllDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  errorMessages: ErrorMessageType;
};

const useAdmTech = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    admission_date: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_no: null,
    dob: null,
    gender: null,
    address: null,
    city_name: null,
    state_id: null,
    state_name: null,
    country_id: null,
    country_name: null,
    zip_code: null,
    aadhaar_no: null,
    samagra_id: null,
    pen_no: null,
    father_name: null,
    father_occupation: null,
    father_phone_no: null,
    mother_name: null,
    mother_occupation: null,
    mother_phone_no: null,
    highschoolname: null,
    highschoolpercentage: null,
    highersschoolname: null,
    highersschoolpercentage: null,
    graduationname: null,
    graduationpercentage: null,
    tenthproof: null,
    twelthproof: null,
    graduationproof: null,
    photoidproof: null,
    photo: null,
    is_aadhar_req: null,
    is_birth_certi_req: null,
    is_tc_req: null,
    is_samagraid_req: null,
    paid_amount: null,
    total_fee: null,
    payment_mode: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmission: ADMISSION_TECH,
    arrStateLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    arrCourseListAll: [] as CourseAllDTO[],
    arrGenderTypeLookup: arrGenderType,
    dtoPayment: PAYMENT,
    arrPaymentModeLookup: arrPaymentMode,
    dtoReceipt: RECEIPT,
    dtoCourse: COURSE_LIST_ALL,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    errorMessages: { ...ERROR_MESSAGES }
  });
  const [submitted, setSubmitted] = useState(false);
  const [studentId, setStudentId] = useState<number>();
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [admissionNumber, setAdmissionNumber] = useState<string | null>(null);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const { companyInfo } = useSelector((state) => state.globalState);
  const [generateReceipt, setGenerateReceipt] = useState(false);
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [addAdmissionTechReturnUserId] = useMutation(ADD_ADMISSION_TECH_RETURN_USERID, {});
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, { fetchPolicy: 'network-only' });
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [getLastAdmission] = useLazyQuery(GET_LAST_ADMISSION, { fetchPolicy: 'network-only' });

  const RAZORPAY_CONFIG = {
    scriptUrl: siteConfig.find((c) => c.key === 'RAZORPAY_SCRIPT_URL')?.value ?? '',
    publicKey: siteConfig.find((c) => c.key === 'RAZORPAY_PUBLIC_KEY')?.value ?? '',
    merchantName: siteConfig.find((c) => c.key === 'RAZORPAY_MERCHANT_NAME')?.value ?? ''
  };

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
          name: name,
          email: state.dtoAdmission.email,
          contact: state.dtoAdmission.phone_no
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

  const getCourseData = useCallback(async (): Promise<void> => {
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoAdmission.course_id
      }
    });
    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setState({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmission.course_id]);

  useEffect(() => {
    console.log('i am inside use Effect');
    if (state.dtoAdmission.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmission.course_id, getCourseData]);

  //#----------Lookups---------
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
          country_id: state.dtoAdmission.country_id
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
  }, [getStateLookup, state.dtoAdmission.country_id]);

  useEffect(() => {
    if (state.dtoAdmission.country_id > 0) {
      getStateList();
    }
  }, [getStateList, state.dtoAdmission.country_id]);

  const isValidPercentage = (value: string | number): boolean => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) && num >= gConstants.PERCENTAGE_LOWER && num <= gConstants.PERCENTAGE_HIGHEST;
  };

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const isPercentageField = name === 'highschoolpercentage' || name === 'highersschoolpercentage' || name === 'graduationpercentage';
      const errorMessages = { ...state.errorMessages };
      if (isPercentageField) {
        const num = parseFloat(value);
        if (value === '') {
          errorMessages[name] = '';
        } else if (isNaN(num) || !isValidPercentage(num)) {
          errorMessages[name] = 'Percentage must be between 33 and 100';
        } else {
          errorMessages[name] = '';
        }
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
            [name]: value
          },
          errorMessages
        } as StateType);
      } else {
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
            [name]: value
          }
        } as StateType);
      }
    },
    [state.dtoAdmission, state.errorMessages]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoAdmission]
  );

  const onInputNameChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoAdmission]
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

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAdmission]
  );

  const validateCourseId = useCallback(async () => {
    if (state.dtoAdmission.course_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.course_id]);

  const validateFirstName = useCallback(async () => {
    if (state.dtoAdmission.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.first_name]);

  const validateFatherName = useCallback(async () => {
    if (state.dtoAdmission.father_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.father_name]);

  const validateMotherName = useCallback(async () => {
    if (state.dtoAdmission.mother_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.mother_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAdmission.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAdmission.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoAdmission.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoAdmission.email]);

  const validatePhoneNo = useCallback(async () => {
    const phone = state.dtoAdmission.phone_no.trim();
    if (phone === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmission.phone_no]);

  const validateFatherPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmission.father_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmission.father_phone_no]);

  const validateMotherPhoneNo = useCallback(async () => {
    const phone = state.dtoAdmission.mother_phone_no.trim();
    if (phone === '') {
      return null;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAdmission.mother_phone_no]);

  // const validateDob = useCallback(async () => {
  //   if (state.dtoAdmission.dob == null || dayjs(getLocalTime(state.dtoAdmission.dob)).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAdmission.dob]);
  const validateDob = useCallback(() => {
    return validateDate({
      value: state.dtoAdmission.dob,
    });
  }, [state.dtoAdmission.dob]);

  const validateGender = useCallback(async () => {
    if (state.dtoAdmission.gender.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.gender]);

  const validateAdmissionDate = useCallback(async () => {
    if (
      state.dtoAdmission.admission_date == null ||
      dayjs(getLocalTime(state.dtoAdmission.admission_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.admission_date]);

  const validateAddress = useCallback(async () => {
    if (state.dtoAdmission.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAdmission.address]);

  const onCourseIdBlur = useCallback(async () => {
    const course_id = await validateCourseId();
    setState({ errorMessages: { ...state.errorMessages, course_id: course_id } } as StateType);
  }, [validateCourseId, state.errorMessages]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const onFatherNameBlur = useCallback(async () => {
    const father_name = await validateFatherName();
    setState({ errorMessages: { ...state.errorMessages, father_name: father_name } } as StateType);
  }, [validateFatherName, state.errorMessages]);

  const onMotherNameBlur = useCallback(async () => {
    const mother_name = await validateMotherName();
    setState({ errorMessages: { ...state.errorMessages, mother_name: mother_name } } as StateType);
  }, [validateMotherName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const onFatherPhoneNoBlur = useCallback(async () => {
    const father_phone_no = await validateFatherPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, father_phone_no: father_phone_no } } as StateType);
  }, [validateFatherPhoneNo, state.errorMessages]);

  const onMotherPhoneNoBlur = useCallback(async () => {
    const mother_phone_no = await validateMotherPhoneNo();
    setState({ errorMessages: { ...state.errorMessages, mother_phone_no: mother_phone_no } } as StateType);
  }, [validateMotherPhoneNo, state.errorMessages]);

  const onDobBlur = useCallback(async () => {
    const dob = await validateDob();
    setState({ errorMessages: { ...state.errorMessages, dob: dob } } as StateType);
  }, [validateDob, state.errorMessages]);

  const onAdmissionDateBlur = useCallback(async () => {
    const admission_date = await validateAdmissionDate();
    setState({ errorMessages: { ...state.errorMessages, admission_date: admission_date } } as StateType);
  }, [validateAdmissionDate, state.errorMessages]);

  const onGenderBlur = useCallback(async () => {
    const gender = await validateGender();
    setState({ errorMessages: { ...state.errorMessages, gender: gender } } as StateType);
  }, [validateGender, state.errorMessages]);

  // const calculateFeeAmount = (baseAmount: number, frequency: string): number => {
  //   const freq = frequency?.toLowerCase();
  //   if (freq === 'monthly') return Number((baseAmount / 12).toFixed(0));
  //   if (freq === 'quarterly') return Number((baseAmount / 4).toFixed(0));
  //   return baseAmount; // annually or any default
  // };

  // const onPaymentModeChange = useCallback(
  //   async (event: any, value: unknown) => {
  //     const selectedMode = (value as LookupDTO).text;
  //     const baseAmount = selectedCoursePrice ?? 0;
  //     const calculatedAmount = calculateFeeAmount(baseAmount, selectedMode);
  //     setState({
  //       dtoAdmission: {
  //         ...state.dtoAdmission,
  //         payment_mode: (value as LookupDTO).text,
  //         paid_amount: calculatedAmount
  //       }
  //     } as StateType);
  //   },
  //   [state.dtoAdmission]
  // );

  // const validatePaymentMode = useCallback(async () => {
  //   if (state.dtoAdmission.payment_mode.trim() === '') {
  //     return 'Payment Mode is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAdmission.payment_mode]);

  // const onPaymentModeBlur = useCallback(async () => {
  //   const payment_mode = await validatePaymentMode();
  //   setState({ errorMessages: { ...state.errorMessages, payment_mode: payment_mode } } as StateType);
  // }, [validatePaymentMode, state.errorMessages]);

  const validateAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoAdmission.aadhaar_no.trim();
    if (!aadhaar) return state.dtoCourse.is_aadhar_req ? gMessageConstants.REQUIRED_FIELD : null;
    const isInvalidFormat = !/^\d{12}$/.test(aadhaar);
    const isRepeatingDigits = /^(\d)\1{11}$/.test(aadhaar);
    return isInvalidFormat || isRepeatingDigits ? gMessageConstants.INVALID : null;
  }, [state.dtoAdmission.aadhaar_no, state.dtoCourse.is_aadhar_req]);

  const onAadhaarNoBlur = useCallback(async () => {
    const aadhaar_no = await validateAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, aadhaar_no: aadhaar_no } } as StateType);
  }, [validateAadhaarNo, state.errorMessages]);

  const validateZipCode = useCallback(async () => {
    const zip = state.dtoAdmission.zip_code.trim();
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
  }, [state.dtoAdmission.zip_code]);

  const onZipCodeBlur = useCallback(async () => {
    const zip_code = await validateZipCode();
    setState({ errorMessages: { ...state.errorMessages, zip_code: zip_code } } as StateType);
  }, [validateZipCode, state.errorMessages]);

  const validateSamagraId = useCallback(async () => {
    const samagra = state.dtoAdmission.samagra_id.trim();
    if (!samagra) return state.dtoCourse.is_samagraid_req ? gMessageConstants.REQUIRED_FIELD : null;
    const isInvalidLength = samagra.length < gConstants.SAMAGRA_ID_LENGTH;
    const isRepeatingDigits = /^(\d)\1{8}$/.test(samagra);
    return isInvalidLength || isRepeatingDigits ? gMessageConstants.INVALID : null;
  }, [state.dtoAdmission.samagra_id, state.dtoCourse.is_samagraid_req]);

  const onSamagraIdBlur = useCallback(async () => {
    const samagra_id = await validateSamagraId();
    setState({ errorMessages: { ...state.errorMessages, samagra_id: samagra_id } } as StateType);
  }, [validateSamagraId, state.errorMessages]);

  const validatePenNo = useCallback(async () => {
    const pen = state.dtoAdmission.pen_no.trim();
    if (!pen) return null;
    const isInvalidLength = pen.length < gConstants.PEN_NO_LENGTH;
    const isRepeatingDigits = /^(\d)\1{11}$/.test(pen);
    return isInvalidLength || isRepeatingDigits ? gMessageConstants.INVALID : null;
  }, [state.dtoAdmission.pen_no]);

  const onPenNoBlur = useCallback(async () => {
    const pen_no = await validatePenNo();
    setState({ errorMessages: { ...state.errorMessages, pen_no: pen_no } } as StateType);
  }, [validatePenNo, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.course_id = await validateCourseId();
    if (errorMessages.course_id) {
      isFormValid = false;
    }
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
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
    errorMessages.admission_date = await validateAdmissionDate();
    if (errorMessages.admission_date) {
      isFormValid = false;
    }
    errorMessages.samagra_id = await validateSamagraId();
    if (errorMessages.samagra_id) {
      isFormValid = false;
    }
    errorMessages.zip_code = await validateZipCode();
    if (errorMessages.zip_code) {
      isFormValid = false;
    }
    errorMessages.aadhaar_no = await validateAadhaarNo();
    if (errorMessages.aadhaar_no) {
      isFormValid = false;
    }
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
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

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    validateSamagraId,
    validateFirstName,
    validateMotherName,
    validateFatherName,
    validateAddress,
    validateLastName,
    validateEMailId,
    validateDob,
    validateGender,
    validateAdmissionDate,
    validatePhoneNo,
    validateCourseId,
    validateAadhaarNo,
    validateZipCode
  ]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/');
    },
    [router]
  );

  const onPhoneNoChange = useCallback(
    (field: 'phone_no' | 'father_phone_no' | 'mother_phone_no') =>
      (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const actualValue = typeof value === 'string' ? value : value.target.value;
        setState({
          ...state,
          dtoAdmission: {
            ...state.dtoAdmission,
            [field]: actualValue
          }
        } as StateType);
      },
    [state]
  );

  const onLookupIdNameChange = useCallback(
    (fieldBase: 'country' | 'state' | 'course') => async (event: any, value: unknown) => {
      if (fieldBase === 'country') {
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
            [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
            [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? '',
            state_id: 0,
            state_name: ''
          }
        } as StateType);
      } else {
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
            [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
            [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? ''
          }
        } as StateType);
      }
    },
    [state.dtoAdmission]
  );

  const onDobChange = useCallback(
    async (value: any): Promise<void> => {
      const dobError = await validateDob();
      setState({
        ...state,
        dtoAdmission: {
          ...state.dtoAdmission,
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

  const onAdmissionDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmission: { ...state.dtoAdmission, admission_date: value } } as StateType);
    },
    [state.dtoAdmission]
  );

  const onGenderChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          gender: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoAdmission]
  );

  const onAadhaarNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'aadhaar_no' }
      });
    }
  };

  const onSamagraIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.SAMAGRA_ID_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'samagra_id' }
      });
    }
  };

  const onPenNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.PEN_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'pen_no' }
      });
    }
  };

  //   const onNumericInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   fieldName: string,
  //   maxLength: number
  // ) => {
  //   const digitsOnly = e.target.value.replace(/\D/g, '');
  //   if (digitsOnly.length <= maxLength) {
  //     onInputChange({
  //       ...e,
  //       target: { ...e.target, value: digitsOnly, name: fieldName }
  //     });
  //   }
  // };

  const handleDocumentUpload = useCallback(
    async (event: React.ChangeEvent<any>, field: keyof AdmissionDTO) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;
      try {
        if (gConstants.IS_CLOUD_STORAGE_ENABLED) {
          setState({
            dtoAdmission: {
              ...state.dtoAdmission,
              [field]: files[0]
            }
          } as StateType);
        } else {
          setState({
            dtoAdmission: {
              ...state.dtoAdmission,
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

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoAdmission: { ...ADMISSION_TECH, id: state.dtoAdmission.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoAdmission.id, ERROR_MESSAGES]
  );

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        const isValid = await validateForm();
        if (!isValid) {
          showSnackbar('Please fill all the required fields.', 'error');
          setSaving(false);
          return;
        }

        const isUndertakingAccepted = state.dtoAdmission.undertaking === 'Yes';
        if (!isUndertakingAccepted) {
          showSnackbar('You must agree to the undertaking before submitting.', 'warning');
          setSaving(false);
          return;
        }
        if (state.dtoAdmission.id === 0) {
          const result = await addAdmissionTechReturnUserId({
            variables: {
              data: {
                course_id: state.dtoAdmission.course_id,
                admission_date: state.dtoAdmission.admission_date,
                first_name: state.dtoAdmission.first_name,
                last_name: state.dtoAdmission.last_name,
                dob: state.dtoAdmission.dob,
                gender: state.dtoAdmission.gender,
                email: state.dtoAdmission.email,
                phone_no: state.dtoAdmission.phone_no,
                address: state.dtoAdmission.address,
                city_name: state.dtoAdmission.city_name,
                state_id: state.dtoAdmission.state_id,
                country_id: state.dtoAdmission.country_id,
                zip_code: state.dtoAdmission.zip_code,
                aadhaar_no: state.dtoAdmission.aadhaar_no,
                samagra_id: state.dtoAdmission.samagra_id,
                pen_no: state.dtoAdmission.pen_no,
                father_name: state.dtoAdmission.father_name,
                father_occupation: state.dtoAdmission.father_occupation,
                father_phone_no: state.dtoAdmission.father_phone_no,
                mother_name: state.dtoAdmission.mother_name,
                mother_occupation: state.dtoAdmission.mother_occupation,
                mother_phone_no: state.dtoAdmission.mother_phone_no,
                highschoolname: state.dtoAdmission.highschoolname,
                highschoolpercentage: Number(state.dtoAdmission.highschoolpercentage),
                highersschoolname: state.dtoAdmission.highersschoolname,
                highersschoolpercentage: Number(state.dtoAdmission.highersschoolpercentage),
                graduationname: state.dtoAdmission.graduationname,
                graduationpercentage: Number(state.dtoAdmission.graduationpercentage),
                undertaking: state.dtoAdmission.undertaking,
                status: gConstants.STATUS_UNPAID,
                paid_amount: state.dtoAdmission.paid_amount,
                total_fee: state.dtoCourse.price,
                payment_mode: state.dtoAdmission.payment_mode
              },
              tenthproof: state.dtoAdmission.tenthproof,
              twelthproof: state.dtoAdmission.twelthproof,
              graduationproof: state.dtoAdmission.graduationproof,
              photoidproof: state.dtoAdmission.photoidproof,
              photo: state.dtoAdmission.photo,
              is_aadhar_req: state.dtoAdmission.is_aadhar_req,
              is_birth_certi_req: state.dtoAdmission.is_birth_certi_req,
              is_tc_req: state.dtoAdmission.is_tc_req,
              is_samagraid_req: state.dtoAdmission.is_samagraid_req
            }
          });
          if (result?.data?.addAdmissionTechReturnUserId > 0) {
            showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
            const newUserId = result?.data?.addAdmissionTechReturnUserId;
            setStudentId(newUserId);
            setSubmitted(true);
          } else {
            showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
          }
        }
        // }
      } catch (error: any) {
        console.error('Error while saving affiliate:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addAdmissionTechReturnUserId, state.dtoAdmission]
  );

  useEffect(() => {
    getLastAdmissionId();
  }, [getLastAdmissionId]);

  useEffect(() => {
    getCourseList();
  }, [getCourseList]);

  useEffect(() => {
    getCountryList();
  }, [getCountryList]);

  const onUndertakingChange = (checked: boolean) => {
    setState({
      ...state,
      dtoAdmission: {
        ...state.dtoAdmission,
        undertaking: checked ? 'Yes' : 'No'
      }
    });
  };

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

  return {
    state,
    generateReceipt,
    saving,
    admissionNumber,
    studentId,
    submitted,
    onUndertakingChange,
    setGenerateReceipt,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onAdmissionDateBlur,
    onGenderBlur,
    onCourseIdBlur,
    onSelectChange,
    onInputChange,
    onInputNameChange,
    onNormalizedInputChange,
    onLookupIdNameChange,
    onDobChange,
    onAdmissionDateChange,
    onGenderChange,
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
    onPhoneNoChange,
    onPhoneNoBlur,
    onSaveClick,
    onCancelClick,
    handleDocumentUpload,
    handlePayNow,
    onAadhaarNoBlur,
    onSamagraIdBlur,
    onPenNoBlur,
    onAadhaarNoChange,
    onSamagraIdChange,
    onPenNoChange,
    // onNumericInputChange,
    onFatherPhoneNoBlur,
    onMotherPhoneNoBlur,
    onMotherNameBlur,
    onFatherNameBlur,
    onZipCodeChange,
    onZipCodeBlur,
    onClearClick,
    onAddressBlur
  };
};
export default useAdmTech;
