import React, { ChangeEvent, useCallback, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import ContactUsDTO, { CONTACT_US } from '@/app/types/ContactUsDTO';
import { ADD_CONTACT_US } from '@/app/graphql/ContactUs';
import { ADD_EMAIL } from '@/app/graphql/Email';
import { capitalizeWords, regExEMail } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';
import { arrEnquiryCategoryType } from '@/app/common/Configuration';
import * as Constants from '../constants/constants';
import LookupDTO from '@/app/types/LookupDTO';
import { useSelector } from '../../store';

type ErrorMessageType = {
  contact_name: string | null;
  email: string | null;
  phone_no: string | null;
  category_name: string | null;
  subject: string | null;
  message: string | null;
  can_contacted: boolean;
};

type StateType = {
  dtoContactPoint: ContactUsDTO;
  arrEnquiryCategoryLookup: LookupDTO[];
  open1: boolean;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

const useContactUs = () => {
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    contact_name: null,
    email: null,
    phone_no: null,
    category_name: null,
    subject: null,
    message: null,
    can_contacted: false
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoContactPoint: CONTACT_US,
    arrEnquiryCategoryLookup: arrEnquiryCategoryType,
    open1: false,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [isChecked, setIsChecked] = useState(true);
  const [addContactUs] = useMutation(ADD_CONTACT_US, {});
  const [addEmail] = useMutation(ADD_EMAIL, {});

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
        dtoContactPoint: {
          ...state.dtoContactPoint,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          category_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const validateMessage = useCallback(async () => {
    if (state.dtoContactPoint.message.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoContactPoint.message]);

  const onMessageBlur = useCallback(async () => {
    const message = await validateMessage();
    setState({ errorMessages: { ...state.errorMessages, message: message } } as StateType);
  }, [validateMessage, state.errorMessages]);

  const validateContactName = useCallback(async () => {
    if (state.dtoContactPoint.contact_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoContactPoint.contact_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoContactPoint.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoContactPoint.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoContactPoint.email]);

  const validatePhoneNo = useCallback(async () => {
    const phone = state.dtoContactPoint.phone_no.trim();
    if (phone === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!isValidPhoneNumber(phone)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoContactPoint.phone_no]);

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const onContactNameBlur = useCallback(async () => {
    const contact_name = await validateContactName();
    setState({ errorMessages: { ...state.errorMessages, contact_name: contact_name } } as StateType);
  }, [validateContactName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.contact_name = await validateContactName();
    if (errorMessages.contact_name) {
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

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [ERROR_MESSAGES, validateContactName, validateEMailId, validatePhoneNo]);

  const onSendEmail = useCallback(async () => {
    try {
      const { data } = await addEmail({
        variables: {
          addEmailInput: {
            to_address: state.dtoContactPoint.email,
            subject: `${Constants.CONTACT_US_SUBJECT} - ${state.dtoContactPoint.category_name}`,
            body: gMessageConstants.CONTACT_US_EMAIL_BODY,
            template_name: '',
            attachment_path: '',
            status: '',
            retry_count: 0,
            email_source: 'contact us'
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
        console.log('Successfully sent email:', data);
        // showSnackbar(gMessageConstants.SNACKBAR_OTP_SUCCESS, 'success');
      }
    } catch (error: any) {
      console.error('Error while sending email:', error);
      // showSnackbar(gMessageConstants.SNACKBAR_OTP_ERROR, 'error');
    }
  }, [addEmail, state.dtoContactPoint.email, state.dtoContactPoint.category_name]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();
        console.log('...................', state.dtoContactPoint.subject);
        if (await validateForm()) {
          const { data } = await addContactUs({
            variables: {
              contact_name: state.dtoContactPoint.contact_name,
              email: state.dtoContactPoint.email,
              phone_no: state.dtoContactPoint.phone_no,
              category_name: state.dtoContactPoint.category_name,
              subject: state.dtoContactPoint.subject,
              message: state.dtoContactPoint.message,
              can_contacted: isChecked
            }
          });
          if (data?.addContactUs) {
            showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
            try {
              await onSendEmail();
            } catch (emailError) {
              console.error('Email sending failed:', emailError);
            }
            router.push('/thankyou?source=contact');
          } else {
            showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
          }
        }
      } catch {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addContactUs, state.dtoContactPoint, router, onSendEmail]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/contactpoints/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    isChecked,
    onInputChange,
    onPhoneNoChange,
    onContactNameBlur,
    onEMailIdBlur,
    onPhoneNoBlur,
    onSaveClick,
    handleCheckboxChange,
    onNormalizedInputChange,
    onCancelClick,
    setOpen1,
    setClose1,
    onStatusChange,
    onMessageBlur
  };
};

export default useContactUs;
