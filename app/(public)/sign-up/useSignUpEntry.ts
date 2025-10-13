'use client';
import React, { ChangeEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from '@/app/types/UserDTO';
import EmailDTO, { EMAIL } from '@/app/types/EmailDTO';
import { ADD_USER, GET_USER_EMAIL_EXIST, GET_USER_USER_NAME_EXIST, GET_USER_MOBILE_NO_EXIST } from '@/app/graphql/User';
import { SEND_OTP, VERIFY_OTP, RESEND_OTP } from '@/app/graphql/Email';
import { capitalizeWords, regExEMail } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as gConstants from '../../constants/constants';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import { useSelector } from '../../store';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile_no: string | null;
  user_name: string | null;
  password: string | null;
  role_id: number | null;
  status: string | null;
  email_otp: string | null;
};

type StateType = {
  dtoSignUp: UserDTO & { email_otp?: string };
  dtoEmail: EmailDTO;
  open1: boolean;
  errorMessages: ErrorMessageType;
  otpSent?: boolean;
  otpVerified?: boolean;
  sendingOtp?: boolean;
  verifyingOtp?: boolean;
  resendingOtp?: boolean;
};

const useSignUpEntry = () => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const ERROR_MESSAGES: ErrorMessageType = {
    first_name: null,
    last_name: null,
    email: null,
    mobile_no: null,
    user_name: null,
    password: null,
    role_id: null,
    status: null,
    email_otp: null
  };

  const INITIAL_STATE: StateType = {
    dtoSignUp: { ...USER, email_otp: '' },
    dtoEmail: EMAIL,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES },
    otpSent: false,
    otpVerified: false,
    sendingOtp: false,
    verifyingOtp: false,
    resendingOtp: false
  };

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addUser] = useMutation(ADD_USER, {});
  const [sendOtp] = useMutation(SEND_OTP, {});
  const [verifyOtp] = useMutation(VERIFY_OTP, {});
  const [resendOtp] = useMutation(RESEND_OTP, {});
  const [timeLeft, setTimeLeft] = useState<number | 0>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, { fetchPolicy: 'network-only' });
  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, { fetchPolicy: 'network-only' });

  const MAIL_CONFIG = {
    smtpHost: siteConfig.find((c) => c.key === 'SMTP_HOST')?.value ?? '',
    smtpPort: Number(siteConfig.find((c) => c.key === 'SMTP_PORT')?.value ?? ''),
    smtpUser: siteConfig.find((c) => c.key === 'SMTP_USER')?.value ?? '',
    smtpPassword: siteConfig.find((c) => c.key === 'SMTP_PASSWORD')?.value ?? '',
     secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value?.toLowerCase() === 'true',
    fromAddress: siteConfig.find((c) => c.key === 'SMTP_FROM')?.value ?? '',
    resendOtpTime: Number(siteConfig.find((c) => c.key === 'RESEND_OTP_TIME')?.value ?? '')
  };

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoSignUp: {
          ...state.dtoSignUp,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoSignUp]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoSignUp: {
          ...state.dtoSignUp,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoSignUp]
  );

const onNormalizedInputChange = useCallback(
  async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedValue = value.replace(/\s+/g, '').toLowerCase();
    setState({
      ...state,
      dtoSignUp: {
        ...state.dtoSignUp,
        [name]: formattedValue
      },
      // Reset OTP if email is changed
      ...(name === "email" && formattedValue !== state.dtoSignUp.email
        ? {
            otpVerified: false,
            otpSent: false,
            dtoSignUp: {
              ...state.dtoSignUp,
              [name]: formattedValue,
              email_otp: ""
            }
          }
        : {})
    } as StateType);
  },
  [state]
);

  const onMobileNoChange = useCallback(
    (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoSignUp: {
          ...state.dtoSignUp,
          mobile_no: typeof value === 'string' ? value : value.target.value
        }
      });
    },
    [state.dtoSignUp]
  );

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoSignUp.id,
        email: state.dtoSignUp.email
      }
    });
    return !error && data ? data.getUserEMailExist : false;
  }, [getUserEMailExist, state.dtoSignUp]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoSignUp.id,
        user_name: state.dtoSignUp.user_name
      }
    });
    return !error && data ? data.getUserUserNameExist : false;
  }, [getUserUserNameExist, state.dtoSignUp]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    const { error, data } = await getUserMobileNoExist({
      variables: {
        id: state.dtoSignUp.id,
        mobile_no: state.dtoSignUp.mobile_no
      }
    });
    return !error && data ? data.getUserMobileNoExist : false;
  }, [getUserMobileNoExist, state.dtoSignUp]);

  const validateFirstName = useCallback(
    async () => (!state.dtoSignUp.first_name.trim() ?  gMessageConstants.REQUIRED_FIELD : null),
    [state.dtoSignUp.first_name]
  );

  const validateLastName = useCallback(
    async () => (!state.dtoSignUp.last_name.trim() ? gMessageConstants.REQUIRED_FIELD : null),
    [state.dtoSignUp.last_name]
  );

  const validateEMailId = useCallback(async () => {
    if (!state.dtoSignUp.email.trim())  return gMessageConstants.REQUIRED_FIELD;;
    if (!state.dtoSignUp.email.trim().match(regExEMail)) return 'E-Mail is invalid';
    if (await IsEMailExist()) return 'E-Mail already exists';
    return null;
  }, [state.dtoSignUp.email, IsEMailExist]);

  const validateMobileNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoSignUp.mobile_no.trim()))  return gMessageConstants.REQUIRED_FIELD;;
    if (await IsMobileNoExist()) return 'Mobile # already exists';
    return null;
  }, [state.dtoSignUp.mobile_no, IsMobileNoExist]);

  const validateUserName = useCallback(async () => {
    if (!state.dtoSignUp.user_name.trim())  return gMessageConstants.REQUIRED_FIELD;;
    if (await IsUserNameExist()) return 'Username already exists';
    return null;
  }, [state.dtoSignUp.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    const { password } = state.dtoSignUp;
    if (!password.trim())  return gMessageConstants.REQUIRED_FIELD;;
    if (password.length < gConstants.PASSWORD_MIN_LENGTH) return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
    if (password.length > gConstants.PASSWORD_MAX_LENGTH)
      return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
    return null;
  }, [state.dtoSignUp.password]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name } });
  }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name } });
  }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email } });
  }, [validateEMailId, state.errorMessages]);

  const onMobileNoBlur = useCallback(async () => {
    const mobile_no = await validateMobileNo();
    setState({ errorMessages: { ...state.errorMessages, mobile_no } });
  }, [validateMobileNo, state.errorMessages]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({ errorMessages: { ...state.errorMessages, user_name } });
  }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({ errorMessages: { ...state.errorMessages, password } });
  }, [validatePassword, state.errorMessages]);

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

  const validateForm = useCallback(async () => {
    let isValid = true;
    const errors: ErrorMessageType = { ...ERROR_MESSAGES };

    errors.first_name = await validateFirstName();
    errors.last_name = await validateLastName();
    errors.email = await validateEMailId();
    errors.mobile_no = await validateMobileNo();
    errors.user_name = await validateUserName();
    errors.password = await validatePassword();

    Object.values(errors).forEach((val) => {
      if (val) isValid = false;
    });

    setState({ errorMessages: errors });
    return isValid;
  }, [validateFirstName, validateLastName, validateEMailId, validateMobileNo, validateUserName, validatePassword]);

  console.log(validateForm);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving || !state.otpVerified) return;
      setSaving(true);

      try {
        if (state.dtoSignUp.id === 0) {
          const { data } = await addUser({
            variables: {
              first_name: state.dtoSignUp.first_name,
              last_name: state.dtoSignUp.last_name,
              email: state.dtoSignUp.email,
              mobile_no: state.dtoSignUp.mobile_no,
              user_name: state.dtoSignUp.first_name,
              password: state.dtoSignUp.password,
              status: gConstants.STATUS_ACTIVE,
              role_id: companyInfo.role_id
            }
          });

          if (data) {
            showSnackbar(gMessageConstants.SNACKBAR_REGISTER_USER, 'success');
            router.push('/login');
          }
        }
      } catch (error: any) {
        console.error('Error while saving:', error);
        showSnackbar(gMessageConstants.SNACKBAR_REGISTERED_USER_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [saving, state.dtoSignUp, state.otpVerified]
  );

  const onSendOtpClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (state.sendingOtp) return;
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
              to_address: state.dtoSignUp.email,
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
    [sendOtp, state.dtoSignUp.email, validateEMailId]
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
              to_address: state.dtoSignUp.email,
              otp: state.dtoSignUp.email_otp || '',
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
    [verifyOtp, state.dtoSignUp.email, state.dtoSignUp.email_otp]
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
              to_address: state.dtoSignUp.email,
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
    [resendOtp, state.dtoSignUp.email, state.dtoEmail]
  );

  return {
    state,
    onInputChange,
    onPlainInputChange,
    onMobileNoChange,
    onEMailIdBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    onFirstNameBlur,
    onLastNameBlur,
    onSaveClick,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    saving,
    timeLeft,
    onNormalizedInputChange
  };
};

export default useSignUpEntry;
