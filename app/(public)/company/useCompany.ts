import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CompanyDTO, { COMPANY } from '@/app/types/CompanyDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCompanyStatus, arrCompanyType, regExEMail } from '@/app/common/Configuration';
import { ADD_COMPANY_RETURN_ID, GET_COMPANY_NAME_EXIST, GET_COMPANY_EMAIL_EXIST, GET_COMPANY_PHONE_NO_EXIST } from '@/app/graphql/Company';
// import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gConstants from '../../constants/constants';
import { ADD_FEE_COLLECT_COMPANY_RETURN_ID } from '@/app/graphql/FeeCollection';
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as gMessageConstants from '@/app/constants/messages-constants';

type ErrorMessageType = {
  company_code: string | null;
  company_name: string | null;
  domain_prefix: string | null;
  domain_name: string | null;
  company_type: string | null;
  email: string | null;
  phone_no: string | null;
  address: string | null;
  logo_url: string | null;
  logo_height: number | null;
  logo_width: number | null;
  status: string | null;
};

type StateType = {
  dtoCompany: CompanyDTO;
  open2: boolean;
  arrCompanyStatusLookup: LookupDTO[];
  arrCompanyTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

const useCompany = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    company_code: null,
    company_name: null,
    domain_prefix: null,
    domain_name: null,
    company_type: null,
    email: null,
    phone_no: null,
    address: null,
    logo_url: null,
    logo_height: null,
    logo_width: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCompany: COMPANY,
    // open1: false,
    open2: false,
    arrCompanyStatusLookup: arrCompanyStatus,
    arrCompanyTypeLookup: arrCompanyType,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  //   const showSnackbar = useSnackbar();
  const [saving, setSaving] = useState(false);
  const [addCompanyReturnId] = useMutation(ADD_COMPANY_RETURN_ID, {});
  const [addFeeCollectCompanyReturnId] = useMutation(ADD_FEE_COLLECT_COMPANY_RETURN_ID);
  const [getCompanyEmailExist] = useLazyQuery(GET_COMPANY_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getCompanyNameExist] = useLazyQuery(GET_COMPANY_NAME_EXIST, { fetchPolicy: 'network-only' });
  const [getCompanyPhoneNoExist] = useLazyQuery(GET_COMPANY_PHONE_NO_EXIST, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (state.arrCompanyStatusLookup.length > 0 && !state.dtoCompany.status) {
      const firstItem = state.arrCompanyStatusLookup[0];
      setState({
        ...state,
        dtoCompany: {
          ...state.dtoCompany,
          status: firstItem.text
        }
      });
    }
  }, [state.arrCompanyStatusLookup]);

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

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCompanyEmailExist({
      variables: {
        id: state.dtoCompany.id,
        email: state.dtoCompany.email
      }
    });
    if (!error && data) {
      exist = data.getCompanyEmailExist;
    }
    return exist;
  }, [getCompanyEmailExist, state.dtoCompany.id, state.dtoCompany.email]);

  const IsCompanyNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCompanyNameExist({
      variables: {
        id: state.dtoCompany.id,
        company_name: state.dtoCompany.company_name
      }
    });
    if (!error && data) {
      exist = data.getCompanyNameExist;
    }
    return exist;
  }, [getCompanyNameExist, state.dtoCompany.id, state.dtoCompany.company_name]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCompanyPhoneNoExist({
      variables: {
        id: state.dtoCompany.id,
        phone_no: state.dtoCompany.phone_no
      }
    });
    if (!error && data) {
      exist = data.getCompanyPhoneNoExist;
    }
    return exist;
  }, [getCompanyPhoneNoExist, state.dtoCompany.id, state.dtoCompany.phone_no]);

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      // const capitalizedValue = capitalizeWords(value);
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          [name]: value
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const onDomainPrefixChange = useCallback(
    (company_type?: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const prefix = event.target.value.trim().toLowerCase();
      let suffix = '';
      switch (company_type?.toLowerCase()) {
        case 'school':
          suffix = '.adhyayan.school';
          break;
        case 'college':
          suffix = '.adhyayan.college';
          break;
        case 'institute':
          suffix = '.adhyayan.online';
          break;
        default:
          suffix = '.adhyayan.online';
      }
      // Construct full domain name
      const fullDomain = prefix ? `${prefix}${suffix}` : '';
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          domain_prefix: prefix,
          domain_name: fullDomain
        },
        errorMessages: {
          ...state.errorMessages,
          domain_prefix: ''
        }
      } as StateType);
    },
    [state.dtoCompany, state.errorMessages]
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, '');
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          company_code: value
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const validateCompanyName = useCallback(async () => {
    if (state.dtoCompany.company_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsCompanyNameExist()) {
      return gMessageConstants.ALREADY_EXIST;
    } else {
      return null;
    }
  }, [state.dtoCompany.company_name, IsCompanyNameExist]);

  const onCompanyNameBlur = useCallback(async () => {
    const company_name = await validateCompanyName();
    setState({ errorMessages: { ...state.errorMessages, company_name: company_name } } as StateType);
  }, [validateCompanyName, state.errorMessages]);

  const validateDomainPrefix = useCallback(async () => {
    if (state.dtoCompany.domain_prefix.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompany.domain_prefix]);

  const onDomainPrefixBlur = useCallback(async () => {
    const domain_prefix = await validateDomainPrefix();
    setState({ errorMessages: { ...state.errorMessages, domain_prefix: domain_prefix } } as StateType);
  }, [validateDomainPrefix, state.errorMessages]);

  const validateCompanyCode = useCallback(async () => {
    if (state.dtoCompany.company_code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompany.company_code]);

  const onCompanyCodeBlur = useCallback(async () => {
    const company_code = await validateCompanyCode();
    setState({ errorMessages: { ...state.errorMessages, company_code: company_code } } as StateType);
  }, [validateCompanyCode, state.errorMessages]);

  const validateEmail = useCallback(async () => {
    if (state.dtoCompany.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoCompany.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else if (await IsEMailExist()) {
      return gMessageConstants.ALREADY_EXIST;
    } else {
      return null;
    }
  }, [state.dtoCompany.email, IsEMailExist]);

  const onEmailBlur = useCallback(async () => {
    const email = await validateEmail();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEmail, state.errorMessages]);

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoCompany.phone_no.trim())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsMobileNoExist()) {
      return gMessageConstants.ALREADY_EXIST;
    } else {
      return null;
    }
  }, [state.dtoCompany.phone_no, IsMobileNoExist]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoCompany.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompany.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.company_name = await validateCompanyName();
    if (errorMessages.company_name) {
      isFormValid = false;
    }
    errorMessages.company_code = await validateCompanyCode();
    if (errorMessages.company_code) {
      isFormValid = false;
    }
    errorMessages.email = await validateEmail();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.phone_no = await validatePhoneNo();
    if (errorMessages.phone_no) {
      isFormValid = false;
    }
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCompanyName, validateEmail, validateCompanyCode, validatePhoneNo, validateAddress]);

  const addPaymentDetails = useCallback(
    async (event: React.MouseEvent<HTMLElement>, response: any, paymentAmount: number, companyId: number) => {
      event.preventDefault();
      try {
        const today = new Date();
        const paymentDate = today.toISOString().split('T')[0];
        const feeMonth = today.toLocaleString('default', { month: 'long' });
        const feeYear = today.getFullYear();
        const result = await addFeeCollectCompanyReturnId({
          variables: {
            company_id: companyId,
            payment_date: paymentDate,
            payment_mode: gConstants.PAY_MODE,
            cheque_number: '',
            fee_amount: paymentAmount,
            fee_month: feeMonth,
            fee_year: feeYear,
            currency: gConstants.CURRENCY,
            transaction_id: '',
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            remarks: '',
            status: gConstants.STATUS_PAID,
            source_flag: gConstants.SOURCE_FLAG_PUBLIC
          }
        });
        const newPaymentId = result?.data?.addFeeCollectCompanyReturnId ?? 0;
        return newPaymentId;
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    },
    [addFeeCollectCompanyReturnId]
  );

  // const openRazorpay = (paymentAmount: number, companyId: number, event: React.MouseEvent<HTMLElement>): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     const options = {
  //       key: gConstants.RAZORPAY_KEY,
  //       amount: paymentAmount * 100,
  //       currency: gConstants.CURRENCY,
  //       name: gConstants.COMPANY,
  //       description: `Payment for ${gConstants.PAY_FOR_COMPANY_SUBSCRIPTION}`,
  //       handler: async (response: any) => {
  //         const newPaymentId = await addPaymentDetails(event, response, paymentAmount, companyId);
  //         router.push(`/paymentReceipt?id=${newPaymentId}&userName=${encodeURIComponent(state.dtoCompany.company_name)}`);
  //         resolve(true); // ✅ Payment succeeded
  //       },
  //       prefill: {
  //         name: 'Student Name',
  //         email: gConstants.CONTACT_EMAIL,
  //         contact: gConstants.CONTACT_PHONE_NO
  //       },
  //       theme: {
  //         color: '#3399cc'
  //       },
  //       modal: {
  //         ondismiss: () => {
  //           console.warn('Payment popup was closed by user');
  //           resolve(false);
  //         }
  //       }
  //     };
  //     const rzp = new (window as any).Razorpay(options);
  //     rzp.open();
  //   });
  // };

  const openRazorpay = (
  paymentAmount: number,
  companyId: number,
  event: React.MouseEvent<HTMLElement>
): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log('[Razorpay] openRazorpay called');
    console.log('[Razorpay] Payment Amount:', paymentAmount, 'Company ID:', companyId);
    if (typeof window === 'undefined') {
      console.error('[Razorpay] window is undefined. Are you on server-side?');
      resolve(false);
      return;
    }
    if (!(window as any).Razorpay) {
      console.error('[Razorpay] window.Razorpay is undefined. Script might not be loaded.');
      resolve(false);
      return;
    } else {
      console.log('[Razorpay] window.Razorpay is available');
    }
    const options = {
      key: gConstants.RAZORPAY_KEY,
      amount: paymentAmount * 100,
      currency: gConstants.CURRENCY,
      name: gConstants.COMPANY,
      description: `Payment for ${gConstants.PAY_FOR_COMPANY_SUBSCRIPTION}`,
      handler: async (response: any) => {
        console.log('[Razorpay] Payment success handler called', response);
        const newPaymentId = await addPaymentDetails(event, response, paymentAmount, companyId);
        console.log('[Razorpay] Payment recorded, newPaymentId:', newPaymentId);
        router.push(`/paymentReceipt?id=${newPaymentId}`);
        resolve(true); // ✅ Payment succeeded
      },
      prefill: {
        name: 'Student Name',
        email: gConstants.CONTACT_EMAIL,
        contact: gConstants.CONTACT_PHONE_NO
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: () => {
          console.warn('[Razorpay] Payment popup was closed by user');
          resolve(false);
        }
      }
    };
    try {
      console.log('[Razorpay] Creating Razorpay instance with options:', options);
      const rzp = new (window as any).Razorpay(options);
      console.log('[Razorpay] Opening Razorpay checkout');
      rzp.open();
    } catch (err) {
      console.error('[Razorpay] Error creating Razorpay instance:', err);
      resolve(false);
    }
  });
};

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>, company_type: string, payment_amount: number) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      if (!(await validateForm())) return;
      if (state.dtoCompany.id !== 0) return;
      try {
        const result = await addCompanyReturnId({
          variables: {
            company_code: state.dtoCompany.company_code,
            company_name: state.dtoCompany.company_name,
            company_type: company_type,
            email: state.dtoCompany.email,
            phone_no: state.dtoCompany.phone_no,
            address: state.dtoCompany.address,
            status: gConstants.STATUS,
            domain_name: state.dtoCompany.domain_name,
            source_flag: gConstants.SOURCE_FLAG_PUBLIC
          }
        });
        const newCompanyId = result?.data?.addCompanyReturnId;
        console.log('CompanyId we get :', newCompanyId);
        const paymentSuccess = openRazorpay(payment_amount, newCompanyId, event);
        if (!paymentSuccess) {
          console.warn('Payment failed or cancelled');
          return;
        }
      } catch (error: any) {
        console.error('Error while saving company:', error);
        // showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addCompanyReturnId, state.dtoCompany, router]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/pricing-tech');
    },
    [router]
  );
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onNormalizedInputChange,
    onCodeChange,
    onCompanyNameBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onSaveClick,
    onCancelClick,
    setOpen2,
    setClose2,
    onPhoneNoChange,
    onDomainPrefixBlur,
    saving,
    onDomainPrefixChange
  };
};

export default useCompany;
