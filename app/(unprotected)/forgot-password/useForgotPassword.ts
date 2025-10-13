import React, { ChangeEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ForgotPasswordDTO, { FORGOT_PASSWORD } from '@/app/types/ForgotPasswordDTO';
import * as gConstants from '../../constants/constants';
import { GET_USER_EMAIL_EXIST, GET_USER_USER_NAME_EXIST, FORGET_USER_PASSWORD } from '@/app/graphql/User';
import { SEND_OTP, VERIFY_OTP, RESEND_OTP } from '@/app/graphql/Email';
import { regExEMail } from '@/app/common/Configuration';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import EmailDTO, { EMAIL } from '@/app/types/EmailDTO';
import { useSelector } from '../../store';

type ErrorMessageType = {
  email: string | null;
  user_name: string | null;
  password: string | null;
  confirm_password: string | null;
  email_otp: string | null;
};

type StateType = {
  dtoForgotPassword: ForgotPasswordDTO & { email_otp?: string };
  dtoEmail: EmailDTO;
  open1: boolean;
  otpSent?: boolean;
  otpVerified?: boolean;
  sendingOtp?: boolean;
  verifyingOtp?: boolean;
  resendingOtp?: boolean;
  errorMessages: ErrorMessageType;
};

const useForgotPassword = () => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    email: null,
    user_name: null,
    password: null,
    confirm_password: null,
    email_otp: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoForgotPassword: { ...FORGOT_PASSWORD, email_otp: '' },
    dtoEmail: EMAIL,
    open1: false,
    otpSent: false,
    otpVerified: false,
    sendingOtp: false,
    verifyingOtp: false,
    resendingOtp: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [sendOtp] = useMutation(SEND_OTP, {});
  const [verifyOtp] = useMutation(VERIFY_OTP, {});
  const [resendOtp] = useMutation(RESEND_OTP, {});
  const [forgetUserPassword] = useMutation(FORGET_USER_PASSWORD, {});
  const [timeLeft, setTimeLeft] = useState<number | 0>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

      const MAIL_CONFIG = {
    smtpHost: siteConfig.find((c) => c.key === 'SMTP_HOST')?.value ?? '',
    smtpPort: Number(siteConfig.find((c) => c.key === 'SMTP_PORT')?.value ?? ''),
    smtpUser: siteConfig.find((c) => c.key === 'SMTP_USER')?.value ?? '',
    smtpPassword: siteConfig.find((c) => c.key === 'SMTP_PASSWORD')?.value ?? '',
    secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value?.toLowerCase() === 'true',
    fromAddress: siteConfig.find((c) => c.key === 'SMTP_FROM')?.value ?? '',
    resendOtpTime: Number(siteConfig.find((c) => c.key === 'RESEND_OTP_TIME')?.value ?? '')
  };

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoForgotPassword.id,
        email: state.dtoForgotPassword.email
      }
    });
    if (!error && data) {
      exist = data.getUserEMailExist;
    }
    return exist;
  }, [getUserEMailExist, state.dtoForgotPassword.id, state.dtoForgotPassword.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoForgotPassword.id,
        user_name: state.dtoForgotPassword.user_name
      }
    });
    if (!error && data) {
      exist = data.getUserUserNameExist;
    }
    return exist;
  }, [getUserUserNameExist, state.dtoForgotPassword.id, state.dtoForgotPassword.user_name]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoForgotPassword: {
          ...state.dtoForgotPassword,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoForgotPassword]
  );

  const validateEMailId = useCallback(async () => {
    if (state.dtoForgotPassword.email.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoForgotPassword.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return null;
    } else {
      return 'E-Mail does not exist';
    }
  }, [state.dtoForgotPassword.email, IsEMailExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoForgotPassword.user_name.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsUserNameExist()) {
      return null;
    } else {
      return 'Username doesnot exist';
    }
  }, [state.dtoForgotPassword.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoForgotPassword.password.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else if (state.dtoForgotPassword.password.length < gConstants.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
    } else if (state.dtoForgotPassword.password.length > gConstants.PASSWORD_MAX_LENGTH) {
      return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
    }
    return null;
  }, [state.dtoForgotPassword.password]);

  const validateConfirmPassword = useCallback(async () => {
    const newPassword = state.dtoForgotPassword.password.trim();
    const confirmPassword = state.dtoForgotPassword.confirm_password.trim();

    if (!confirmPassword) {
     return gMessageConstants.REQUIRED_FIELD;
    }

    if (newPassword !== confirmPassword) {
      return 'New and Confirm Password do not match';
    }

    return null;
  }, [state.dtoForgotPassword.confirm_password, state.dtoForgotPassword.password]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({ errorMessages: { ...state.errorMessages, password: password } } as StateType);
  }, [validatePassword, state.errorMessages]);

  const onConfirmPasswordBlur = useCallback(async () => {
    const confirm_password = await validateConfirmPassword();
    setState({ errorMessages: { ...state.errorMessages, confirm_password: confirm_password } } as StateType);
  }, [validateConfirmPassword, state.errorMessages]);

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
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.user_name = await validateUserName();
    if (errorMessages.user_name) {
      isFormValid = false;
    }
    errorMessages.password = await validatePassword();
    if (errorMessages.password) {
      isFormValid = false;
    }
    errorMessages.confirm_password = await validateConfirmPassword();
    if (errorMessages.confirm_password) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [ERROR_MESSAGES, validateEMailId, validateUserName, validatePassword, validateConfirmPassword]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      try {
        if (state.dtoForgotPassword.id === 0) {
          const { data } = await forgetUserPassword({
            variables: {
              user_name: state.dtoForgotPassword.user_name,
              email: state.dtoForgotPassword.email,
              password: state.dtoForgotPassword.password
            }
          });
          if (data) {
            showSnackbar(gMessageConstants.SNACKBAR_UPDATE_PASSWORD, 'success');
            router.push('/login');
          }
        }
      } catch (error: any) {
        console.error('Error while saving:', error);
        showSnackbar(gMessageConstants.SNACKBAR_REGISTERED_USER_FAILED, 'error');
      }
    },
    [validateForm, forgetUserPassword, state.dtoForgotPassword, router]
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
              to_address: state.dtoForgotPassword.email,
              template_name: 'Email template',
              purpose: 'Email verification'
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
    [sendOtp, state.dtoForgotPassword.email, validateEMailId]
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
              to_address: state.dtoForgotPassword.email,
              otp: state.dtoForgotPassword.email_otp || '',
              purpose: 'Email verification'
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
    [verifyOtp, state.dtoForgotPassword.email, state.dtoForgotPassword.email_otp]
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
              to_address: state.dtoForgotPassword.email,
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
    [resendOtp, state.dtoForgotPassword.email]
  );

  return {
    state,
    onInputChange,
    onEMailIdBlur,
    onUserNameBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    showPassword1,
    setShowPassword1,
    onSaveClick,
    onConfirmPasswordBlur,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft
  };
};

export default useForgotPassword;
