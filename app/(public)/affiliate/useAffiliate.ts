import React, { ChangeEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP, DISTRICT_LOOKUP } from '@/app/graphql/state';
import { ADD_AFFILIATE, UPLOAD_AFFILIATE_IMAGE } from '@/app/graphql/Affiliate';
import { GET_USER_EMAIL_EXIST, GET_USER_USER_NAME_EXIST, GET_USER_MOBILE_NO_EXIST } from '@/app/graphql/User';
import { capitalizeWords, regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as gConstants from '../../constants/constants';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import { ADD_EMAIL, SEND_OTP, VERIFY_OTP, RESEND_OTP } from '@/app/graphql/Email';
import EmailDTO, { EMAIL } from '@/app/types/EmailDTO';
import { useSelector } from '../../store';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  user_name: string | null;
  password: string | null;
  address: string | null;
  city_name: string | null;
  district_name: string | null;
  state_id: string | null;
  state_name: string | null;
  country_id: number | null;
  country_name: number | null;
  zip_code: string | null;
  photo_id_url: string | null;
  email_otp: string | null;
};

type StateType = {
  dtoAffiliate: AffiliateDTO & { email_otp?: string };
  dtoEmail: EmailDTO;
  arrDistrictLookup: LookupDTO[];
  arrStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  otpSent?: boolean;
  otpVerified?: boolean;
  sendingOtp?: boolean;
  verifyingOtp?: boolean;
  resendingOtp?: boolean;
  errorMessages: ErrorMessageType;
};

const useAffiliate = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    email: null,
    phone_no: null,
    user_name: null,
    password: null,
    address: null,
    city_name: null,
    district_name: null,
    state_id: null,
    state_name: null,
    country_id: null,
    country_name: null,
    zip_code: null,
    photo_id_url: null,
    email_otp: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAffiliate: AFFILIATE,
    dtoEmail: EMAIL,
    arrDistrictLookup: [] as LookupDTO[],
    arrStateLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    open3: false,
    otpSent: false,
    otpVerified: false,
    sendingOtp: false,
    verifyingOtp: false,
    resendingOtp: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  // const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  //   return { ...state, ...action };
  // };

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [addEmail] = useMutation(ADD_EMAIL, {});
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addAffiliate] = useMutation(ADD_AFFILIATE, {});
  const { companyInfo } = useSelector((state) => state.globalState);
  const [sendOtp] = useMutation(SEND_OTP, {});
  const [verifyOtp] = useMutation(VERIFY_OTP, {});
  const [resendOtp] = useMutation(RESEND_OTP, {});
  const [timeLeft, setTimeLeft] = useState<number | 0>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getDistrictLookup] = useLazyQuery(DISTRICT_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, { fetchPolicy: 'network-only' });
  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, { fetchPolicy: 'network-only' });
  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, { fetchPolicy: 'network-only' });
  const [singleUpload] = useMutation(UPLOAD_AFFILIATE_IMAGE, {});

  const MAIL_CONFIG = {
    smtpHost: siteConfig.find((c) => c.key === 'SMTP_HOST')?.value ?? '',
    smtpPort: Number(siteConfig.find((c) => c.key === 'SMTP_PORT')?.value ?? ''),
    smtpUser: siteConfig.find((c) => c.key === 'SMTP_USER')?.value ?? '',
    smtpPassword: siteConfig.find((c) => c.key === 'SMTP_PASSWORD')?.value ?? '',
    // secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value ?? '',
    secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value?.toLowerCase() === 'true',
    fromAddress: siteConfig.find((c) => c.key === 'SMTP_FROM')?.value ?? '',
    resendOtpTime: Number(siteConfig.find((c) => c.key === 'RESEND_OTP_TIME')?.value ?? '')
  };

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoAffiliate.id,
        email: state.dtoAffiliate.email
      }
    });
    if (!error && data) {
      exist = data.getUserEMailExist;
    }
    return exist;
  }, [getUserEMailExist, state.dtoAffiliate.id, state.dtoAffiliate.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoAffiliate.id,
        user_name: state.dtoAffiliate.user_name
      }
    });
    if (!error && data) {
      exist = data.getUserUserNameExist;
    }
    return exist;
  }, [getUserUserNameExist, state.dtoAffiliate.id, state.dtoAffiliate.user_name]);

  // const onNormalizedInputChange = useCallback(
  //   async (event: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;

  //     // Remove all spaces and convert to lowercase
  //     const formattedValue = value.replace(/\s+/g, '').toLowerCase();

  //     setState({
  //       dtoAffiliate: {
  //         ...state.dtoAffiliate,
  //         [name]: formattedValue
  //       }
  //     } as StateType);
  //   },
  //   [state.dtoAffiliate]
  // );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        ...state,
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [name]: formattedValue
        },
        // Reset OTP if email is changed
        ...(name === "email" && formattedValue !== state.dtoAffiliate.email
          ? {
            otpVerified: false,
            otpSent: false,
            dtoAffiliate: {
              ...state.dtoAffiliate,
              [name]: formattedValue,
              email_otp: ""
            }
          }
          : {})
      } as StateType);
    },
    [state]
  );

  const IsPhoneNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserMobileNoExist({
      variables: {
        id: state.dtoAffiliate.id,
        mobile_no: state.dtoAffiliate.phone_no
      }
    });
    if (!error && data) {
      exist = data.getUserMobileNoExist;
    }
    return exist;
  }, [getUserMobileNoExist, state.dtoAffiliate.id, state.dtoAffiliate.phone_no]);

  //----------Lookups---------
  const getData1 = useCallback(async (): Promise<void> => {
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

  const getData2 = useCallback(async (): Promise<void> => {
    try {
      let arrStateLookup: LookupDTO[] = [];
      const { error, data } = await getStateLookup({
        variables: {
          country_id: state.dtoAffiliate.country_id
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
  }, [getStateLookup, state.dtoAffiliate.country_id]);

  const getDistrict = useCallback(async (): Promise<void> => {
    try {
      let arrDistrictLookup: LookupDTO[] = [];
      const { error, data } = await getDistrictLookup({
        variables: {
          state_id: state.dtoAffiliate.state_id
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
  }, [getDistrictLookup, state.dtoAffiliate.state_id]);

  //-------------------------
  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onPlainInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'zip_code' }
      });
    }
  };

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoAffiliate.phone_no.trim())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsPhoneNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.phone_no, IsPhoneNoExist]);

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateFirstName = useCallback(async () => {
    if (state.dtoAffiliate.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAffiliate.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAffiliate.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoAffiliate.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.email, IsEMailExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoAffiliate.user_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoAffiliate.password.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.password]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

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

  const onLookupValueChange = useCallback(
    (fieldBase: 'country' | 'state' | 'district') => (event: any, value: unknown) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
          [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? ''
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

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
    errorMessages.user_name = await validateUserName();
    if (errorMessages.user_name) {
      isFormValid = false;
    }
    errorMessages.password = await validatePassword();
    if (errorMessages.password) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [ERROR_MESSAGES, validateFirstName, validateLastName, validateEMailId, validateUserName, validatePassword, validatePhoneNo]);

  const onSendEmail = useCallback(async () => {
    try {
      const { data } = await addEmail({
        variables: {
          addEmailInput: {
            to_address: state.dtoAffiliate.email,
            subject: gMessageConstants.AFFILIATE_REGISTRATION_MAIL_SUBJECT +` with - ${companyInfo.domain_name}`,
            body: gMessageConstants.AFFILIATE_REGISTRATION_EMAIL_BODY,
            template_name: '',
            attachment_path: '',
            status: '',
            retry_count: 0,
            email_source: 'affiliate'
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
        console.log('Email sent Successfully :', data);
      }
    } catch (error: any) {
      console.error('Error while sending email:', error);
    }
  }, [addEmail, state.dtoAffiliate.email]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoAffiliate.id === 0) {
            const { data } = await addAffiliate({
              variables: {
                first_name: state.dtoAffiliate.first_name,
                last_name: state.dtoAffiliate.last_name,
                email: state.dtoAffiliate.email,
                phone_no: state.dtoAffiliate.phone_no,
                user_name: state.dtoAffiliate.user_name,
                password: state.dtoAffiliate.password,
                address: state.dtoAffiliate.address,
                city_name: state.dtoAffiliate.city_name,
                country_id: state.dtoAffiliate.country_id,
                state_id: state.dtoAffiliate.state_id,
                district_id: state.dtoAffiliate.district_id,
                zip_code: state.dtoAffiliate.zip_code,
                photo_id_url: state.dtoAffiliate.photo_id_url,
                role_id: gConstants.AFFILIATE_ROLE_ID
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              try {
                await onSendEmail();
              } catch (emailError) {
                console.error('Email sending failed:', emailError);
              }
              router.push('/thankyou?source=affiliate');
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
    [validateForm, addAffiliate, state.dtoAffiliate, router, onSendEmail]
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
              to_address: state.dtoAffiliate.email,
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
    [sendOtp, state.dtoAffiliate.email, validateEMailId]
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
              to_address: state.dtoAffiliate.email,
              otp: state.dtoAffiliate.email_otp || '',
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
    [verifyOtp, state.dtoAffiliate.email, state.dtoAffiliate.email_otp]
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
              to_address: state.dtoAffiliate.email,
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
    [resendOtp, state.dtoAffiliate.email]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/Affiliates/list');
    },
    [router]
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

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const onImageClick = useCallback(async () => {
    document.getElementById('user_image')!.click();
  }, []);

  useEffect(() => {
    getData1();
  }, [getData1]);

  useEffect(() => {
    getData2();
  }, [getData2, state.dtoAffiliate.country_id]);

  useEffect(() => {
    getDistrict();
  }, [getDistrict, state.dtoAffiliate.state_id]);

  return {
    state,
    onPasswordBlur,
    onUserNameBlur,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onSelectChange,
    onInputChange,
    onPlainInputChange,
    IsUserNameExist,
    IsEMailExist,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onPhoneNoChange,
    onPhoneNoBlur,
    IsPhoneNoExist,
    singleUpload,
    onSaveClick,
    onCancelClick,
    onImageClick,
    onZipCodeChange,
    onLookupValueChange,
    onNormalizedInputChange,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft,
    saving
  };
};
export default useAffiliate;
