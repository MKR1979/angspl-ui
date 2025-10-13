import { ChangeEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { COURSE_LIST_ALL } from '@/app/graphql/Course';
import { useRouter } from 'next/navigation';
import CourseAllDTO from '@/app/types/CourseAllDTO';
import PaymentDetailsDTO, { PAYMENT_DETAILS } from '@/app/types/PaymentDetailsDTO';
import PaymentDTO, { PAYMENT } from '@/app/types/PaymentDTO';
import { ADD_USER_RETURN_ID, GET_USER_EMAIL_EXIST_USERID, GET_USER_BY_EMAIL } from '@/app/graphql/User';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { capitalizeWords, regExEMail } from '@/app/common/Configuration';
import * as Constants from '../constants/constants';
import * as gConstants from '../../constants/constants';
import { SEND_OTP, VERIFY_OTP, RESEND_OTP } from '@/app/graphql/Email';
import EmailDTO, { EMAIL } from '@/app/types/EmailDTO';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';
import { ADD_ENROLLMENT } from '@/app/graphql/Enrollment';
import { RootState, useDispatch, useSelector } from '../../store';
import { setEnrolledUserId } from '@/app/store/slices/globalState';
import { toLower } from 'lodash';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import UserDTO from '@/app/types/UserDTO';

type ErrorMessageType = Record<'first_name' | 'last_name' | 'email' | 'mobile_no' | 'email_otp', string | null>;
type StateType = {
  arrCourseListAll: CourseAllDTO[];
  isLoading: boolean;
  dtoPaymentDetails: PaymentDetailsDTO & { email_otp?: string };
  dtoPayment: PaymentDTO;
  dtoEmail: EmailDTO;
  open1: boolean;
  otpSent?: boolean;
  otpVerified?: boolean;
  sendingOtp?: boolean;
  verifyingOtp?: boolean;
  resendingOtp?: boolean;
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  first_name: null,
  last_name: null,
  email: null,
  mobile_no: null,
  email_otp: null
};

const usePrograms = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const INITIAL_STATE: StateType = {
    arrCourseListAll: [],
    isLoading: false,
    dtoPaymentDetails: { ...PAYMENT_DETAILS, email_otp: '' },
    dtoPayment: PAYMENT,
    open1: false,
    dtoEmail: EMAIL,
    otpSent: false,
    otpVerified: false,
    sendingOtp: false,
    verifyingOtp: false,
    resendingOtp: false,
    errorMessages: { ...ERROR_MESSAGES }
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [isDataExist, setIsDataExist] = useState(false);
  const [selectedPrice, setPrice] = useState(0);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [selectedCourse, setCourse] = useState('');
  const [selectedCourseId, setCourseId] = useState(0);
  const [addUserReturnId] = useMutation(ADD_USER_RETURN_ID);
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {});
  const [getUserEMailExistUserId] = useLazyQuery(GET_USER_EMAIL_EXIST_USERID, { fetchPolicy: 'network-only' });
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL, { fetchPolicy: 'network-only' });
  const enrolledUserId = useSelector((state: RootState) => state.globalState.enrolledUserId);
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  const [getCourseListAll] = useLazyQuery(COURSE_LIST_ALL, { fetchPolicy: 'network-only' });
  const [sendOtp] = useMutation(SEND_OTP, {});
  const [verifyOtp] = useMutation(VERIFY_OTP, {});
  const [resendOtp] = useMutation(RESEND_OTP, {});
  const [timeLeft, setTimeLeft] = useState<number | 0>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const MAIL_CONFIG = {
    smtpHost: siteConfig.find((c) => c.key === 'SMTP_HOST')?.value ?? '',
    smtpPort: Number(siteConfig.find((c) => c.key === 'SMTP_PORT')?.value ?? ''),
    smtpUser: siteConfig.find((c) => c.key === 'SMTP_USER')?.value ?? '',
    smtpPassword: siteConfig.find((c) => c.key === 'SMTP_PASSWORD')?.value ?? '',
    secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value?.toLowerCase() === 'true',
    fromAddress: siteConfig.find((c) => c.key === 'SMTP_FROM')?.value ?? '',
    resendOtpTime: Number(siteConfig.find((c) => c.key === 'RESEND_OTP_TIME')?.value ?? '')
  };

  const getUserDataByMail = useCallback(async (): Promise<void> => {
    const { error, data } = await getUserByEmail({
      variables: {
        email: state.dtoPaymentDetails.email
      }
    });
    if (!error && data?.getUserByEmail) {
      const dtoUser: UserDTO = data.getUserByEmail;
      setState({
        ...state,
        dtoPaymentDetails: {
          ...state.dtoPaymentDetails,
          first_name: dtoUser.first_name,
          last_name: dtoUser.last_name,
          user_name: dtoUser.user_name,
          mobile_no: dtoUser.mobile_no
        }
      } as StateType);
      setIsDataExist(true);
    }
  }, [getUserByEmail, state]);

  const getCourses = useCallback(async () => {
    const { error, data } = await getCourseListAll();
    if (!error && data?.getCourseListAll) {
      setState({ arrCourseListAll: data.getCourseListAll });
    }
  }, [getCourseListAll]);

  const isEmailExistUserId = useCallback(async (): Promise<{ exists: boolean; user_id: number | null }> => {
    try {
      const { data } = await getUserEMailExistUserId({
        variables: {
          id: 0,
          email: state.dtoPaymentDetails.email
        }
      });
      return {
        exists: data?.getUserEMailExistUserId?.exists ?? false,
        user_id: data?.getUserEMailExistUserId?.user_id ?? null
      };
    } catch (error) {
      console.error('Error checking email existence:', error);
      return { exists: false, user_id: null };
    }
  }, [getUserEMailExistUserId, state.dtoPaymentDetails.email]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully.');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const handlePayNow = (course: string, course_id: number, price: number) => {
    setPrice(price);
    setCourse(course);
    setCourseId(course_id);
    setSubmitted(true);
  };

  const addPaymentDetails = useCallback(
    async (event: React.MouseEvent<HTMLElement>, response: any, price: number, user_id: number, course_id: number) => {
      event.preventDefault();
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
            // fee_head_id: gConstants.FEE_HEAD_COURSE,
            fee_amount: price,
            fee_month: feeMonth,
            fee_year: feeYear,
            currency: gConstants.CURRENCY,
            transaction_id: '',
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            remarks: '',
            status: gConstants.STATUS_PAID,
            source_flag: gConstants.SOURCE_FLAG_PROGRAMS
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

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoPaymentDetails: {
          ...state.dtoPaymentDetails,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoPaymentDetails]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoPaymentDetails: {
          ...state.dtoPaymentDetails,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoPaymentDetails]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        ...state,
        dtoPaymentDetails: {
          ...state.dtoPaymentDetails,
          [name]: formattedValue
        },
        // Reset OTP if email is changed
        ...(name === 'email' && formattedValue !== state.dtoPaymentDetails.email
          ? {
              otpVerified: false,
              otpSent: false,
              dtoPaymentDetails: {
                ...state.dtoPaymentDetails,
                [name]: formattedValue,
                email_otp: '',
                first_name: '',
                last_name: '',
                mobile_no: ''
              }
            }
          : {})
      } as StateType);
      setIsDataExist(false);
    },
    [state]
  );

  const onMobileNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoPaymentDetails: {
          ...state.dtoPaymentDetails,
          mobile_no: value
        }
      } as StateType);
    },
    [state.dtoPaymentDetails]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoPaymentDetails.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoPaymentDetails.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoPaymentDetails.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoPaymentDetails.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.email]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoPaymentDetails.mobile_no.trim())) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.mobile_no]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () => {
    const emailError = await validateEMailId();
    setState({
      errorMessages: { ...state.errorMessages, email: emailError }
    } as StateType);
    if (!emailError) {
      await getUserDataByMail();
    }
  }, [validateEMailId, getUserDataByMail, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () => {
    const mobile_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, mobile_no: mobile_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

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
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.mobile_no = await validatePhoneNo();
    if (errorMessages.mobile_no) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateFirstName, validateLastName, validateEMailId, validatePhoneNo]);

  const generateUserName = async (firstName: string): Promise<string> => {
    return new Promise((resolve) => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      resolve(`${firstName}${randomNum}`);
    });
  };

  const startTimer = useCallback(() => {
    const duration = MAIL_CONFIG.resendOtpTime;
    setTimeLeft(duration);
    if (timerRef.current) clearInterval(timerRef.current);
    let remaining = duration;
    timerRef.current = setInterval(() => {
      remaining--;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
      }
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (state.otpSent) {
      startTimer();
    }
    return stopTimer;
  }, [startTimer, stopTimer, state.otpSent]);

  const openRazorpay = (
    price: number,
    course_id: number,
    user_id: number,
    course: string,
    userName: string,
    event: React.MouseEvent<HTMLElement>
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const options = {
        key: gConstants.RAZORPAY_KEY,
        amount: price * 100,
        currency: gConstants.CURRENCY,
        name: gConstants.COMPANY,
        description: `Payment for ${course}`,
        handler: async (response: any) => {
          const newPaymentId = await addPaymentDetails(event, response, price, user_id, course_id);
          router.push(`/paymentReceipt?id=${newPaymentId}&userName=${encodeURIComponent(userName)}&isDataExist=${isDataExist}`);
          resolve(true); // ✅ Payment succeeded
        },
        prefill: {
          name: 'Student Name',
          email: Constants.CONTACT_EMAIL,
          contact: Constants.CONTACT_PHONE_NO
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: () => {
            console.warn('Payment popup was closed by user');
            resolve(false); // Payment failed or cancelled
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>, price: number, course: string, course_id: number) => {
      event.preventDefault();

      if (!(await validateForm())) return;

      if (state.dtoPaymentDetails.id !== 0) return;

      // const userName = String(await generateUserName(toLower(state.dtoPaymentDetails.first_name)));
      let userName: string;
      if (isDataExist) {
        userName = state.dtoPaymentDetails.user_name;
      } else {
        userName = String(await generateUserName(toLower(state.dtoPaymentDetails.first_name)));
      }
      const { exists, user_id } = await isEmailExistUserId();

      let userId = 0;
      //2. After payment succeeds, proceed with user/enrollment logic
      try {
        if (exists) {
          userId = user_id || 0;
          dispatch(setEnrolledUserId(user_id || 0));
          console.log('for exists user ', enrolledUserId);
          // Get existing userId from backend
          const { data } = await addEnrollment({
            variables: {
              user_id: user_id,
              course_id: course_id,
              enrollment_date: new Date().toISOString(),
              end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
              paid_amount: Number(price),
              status: gConstants.STATUS_ENROLLED
            }
          });
          console.log('Enrollment response for existing user:', data);
        } else {
          // Add new user
          const { data: userData } = await addUserReturnId({
            variables: {
              first_name: state.dtoPaymentDetails.first_name,
              last_name: state.dtoPaymentDetails.last_name,
              email: state.dtoPaymentDetails.email,
              mobile_no: state.dtoPaymentDetails.mobile_no,
              user_name: userName,
              password: Constants.PASSWORD,
              status: gConstants.STATUS_ENROLLED,
              role_id: Constants.ROLE_ID,
              type_id: Constants.STUDENT_TYPE_ID,
              image_url: 'To be updated'
            }
          });
          const newUserId = userData?.addUserReturnId;
          userId = newUserId;
          // dispatch(setEnrolledUserId(newUserId||0));
          dispatch(setEnrolledUserId(userData?.addUserReturnId));
          if (!newUserId) throw new Error('User creation failed');

          const { data: enrollmentData } = await addEnrollment({
            variables: {
              user_id: newUserId,
              course_id: course_id,
              enrollment_date: new Date().toISOString(),
              end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
              paid_amount: Number(price),
              status: gConstants.STATUS_ENROLLED
            }
          });
          console.log('Enrollment response for new user:qqqq', enrollmentData);
        }

        // Open payment first
        const paymentSuccess = openRazorpay(price, course_id, userId, course, userName, event);

        if (!paymentSuccess) {
          console.warn('Payment failed or cancelled');
          return;
        }
      } catch (error) {
        console.error('Error during enrollment:', error);
      }
    },
    [state, enrolledUserId, validateForm, addUserReturnId, addEnrollment]
  );

  const onSendOtpClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (state.sendingOtp) return;
      console.log('mail config data inside send otp method : ', MAIL_CONFIG);
      const emailValidationError = await validateEMailId();
      if (emailValidationError) {
        showSnackbar(emailValidationError, 'error');
        return;
      }
      setState({ sendingOtp: true });
      try {
        const { data } = await sendOtp({
          variables: {
            sendOtpInput: {
              to_address: state.dtoPaymentDetails.email,
              template_name: 'Email template',
              purpose: state.dtoEmail.purpose || 'Email verification' // fallback if undefined
            },
            emailConfigInput: {
              smtpHost: MAIL_CONFIG.smtpHost,
              smtpPort: MAIL_CONFIG.smtpPort,
              smtpUser: MAIL_CONFIG.smtpUser,
              smtpPassword: MAIL_CONFIG.smtpPassword,
              secure: MAIL_CONFIG.secure,
              fromAddress: MAIL_CONFIG.fromAddress
            }
          }
        });
        if (data) {
          showSnackbar(gMessageConstants.SNACKBAR_OTP_SUCCESS, 'success');
          setState({ otpSent: true });
          startTimer();
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_OTP_ERROR, 'error');
      } finally {
        setState({ sendingOtp: false });
      }
    },
    [sendOtp, state.dtoPaymentDetails.email, validateEMailId]
  );

  const onVerifyOtpClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (state.verifyingOtp) return;
      setState({ verifyingOtp: true });

      try {
        const { data } = await verifyOtp({
          variables: {
            verifyOtpInput: {
              to_address: state.dtoPaymentDetails.email,
              otp: state.dtoPaymentDetails.email_otp || '',
              purpose: state.dtoEmail.purpose || 'Email verification' // fallback if undefined
            },
            emailConfigInput: {
              smtpHost: MAIL_CONFIG.smtpHost,
              smtpPort: MAIL_CONFIG.smtpPort,
              smtpUser: MAIL_CONFIG.smtpUser,
              smtpPassword: MAIL_CONFIG.smtpPassword,
              secure: MAIL_CONFIG.secure,
              fromAddress: MAIL_CONFIG.fromAddress
            }
          }
        });

        if (data?.verifyOtp === true) {
          setState({ otpVerified: true });
          showSnackbar('OTP verified successfully', 'success');
        } else {
          showSnackbar('Invalid OTP. Please try again.', 'error');
        }
      } catch (error: any) {
        console.error('Error while verifying OTP:', error);
        showSnackbar('Error verifying OTP', 'error');
      } finally {
        setState({ verifyingOtp: false });
      }
    },
    [verifyOtp, state.dtoPaymentDetails.email, state.dtoPaymentDetails.email_otp]
  );

  const onResendOtpClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (state.resendingOtp) return;
      setState({ resendingOtp: true });
      try {
        const { data } = await resendOtp({
          variables: {
            resendOtpInput: {
              to_address: state.dtoPaymentDetails.email,
              purpose: state.dtoEmail.purpose || 'Email verification' // fallback if undefined
            },
            emailConfigInput: {
              smtpHost: MAIL_CONFIG.smtpHost,
              smtpPort: MAIL_CONFIG.smtpPort,
              smtpUser: MAIL_CONFIG.smtpUser,
              smtpPassword: MAIL_CONFIG.smtpPassword,
              secure: MAIL_CONFIG.secure,
              fromAddress: MAIL_CONFIG.fromAddress
            }
          }
        });

        if (data?.resendOtp === true) {
          showSnackbar(gMessageConstants.SNACKBAR_OTP_SUCCESS, 'success');
          startTimer();
        } else {
          showSnackbar(gMessageConstants.SNACKBAR_OTP_ERROR, 'error');
        }
      } catch (error: any) {
        console.error('Error while resending OTP:', error);
        showSnackbar(gMessageConstants.SNACKBAR_OTP_ERROR, 'error');
      } finally {
        setState({ resendingOtp: false }); // <-- fixed from setSaving
      }
    },
    [resendOtp, state.dtoPaymentDetails.email, state.dtoEmail]
  );

  return {
    state,
    submitted,
    selectedCourse,
    selectedCourseId,
    selectedPrice,
    timeLeft,
    isDataExist,
    onInputChange,
    onPlainInputChange,
    onMobileNoChange,
    onSaveClick,
    handlePayNow,
    onFirstNameBlur,
    onLastNameBlur,
    onNormalizedInputChange,
    onPhoneNoBlur,
    onEMailIdBlur,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick
  };
};

export default usePrograms;
