import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import CompanyDTO, { COMPANY } from '@/app/types/CompanyDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCompanyStatus, arrCompanyType } from '@/app/common/Configuration';
import { ADD_COMPANY_PUBLIC } from '@/app/graphql/Company';
// import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gConstants from '../../constants/constants';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';

type ErrorMessageType = {
  company_code: string | null;
  company_name: string | null;
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
  open1: boolean;
  open2: boolean;
  arrCompanyStausLookup: LookupDTO[];
  arrCompanyTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

// type Props = {
//   dtoCompany: CompanyDTO;
// };

const useCompany = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    company_code: null,
    company_name: null,
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
    open1: false,
    open2: false,
    arrCompanyStausLookup: arrCompanyStatus,
    arrCompanyTypeLookup: arrCompanyType,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  //   const showSnackbar = useSnackbar();
  const [saving, setSaving] = useState(false);
  const [addCompanyPublic] = useMutation(ADD_COMPANY_PUBLIC, {});
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  //   const [domainInput, setDomainInput] = useState(
  //   state.dtoCompany.domain_name?.split('.adhyayan.')?.[0] || ''
  // );
  // const domainSuffix = `.adhyayan.${company_type || ''}`;

  useEffect(() => {
    if (state.arrCompanyStausLookup.length > 0 && !state.dtoCompany.status) {
      const firstItem = state.arrCompanyStausLookup[0];
      setState({
        ...state,
        dtoCompany: {
          ...state.dtoCompany,
          status: firstItem.text
        }
      });
    }
  }, [state.arrCompanyStausLookup]);

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
            source_flag: gConstants.SOURCE_FLAG_MISCELLANEOUS
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

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Remove all spaces and convert to lowercase
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
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.company_name]);

  const onCompanyNameBlur = useCallback(async () => {
    const company_name = await validateCompanyName();
    setState({ errorMessages: { ...state.errorMessages, company_name: company_name } } as StateType);
  }, [validateCompanyName, state.errorMessages]);

  const validateDomainName = useCallback(async () => {
    if (state.dtoCompany.domain_name.trim() === '') {
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.domain_name]);

  const onDomainNameBlur = useCallback(async () => {
    const domain_name = await validateDomainName();
    setState({ errorMessages: { ...state.errorMessages, domain_name: domain_name } } as StateType);
  }, [validateDomainName, state.errorMessages]);

  const validateCompanyCode = useCallback(async () => {
    if (state.dtoCompany.company_code.trim() === '') {
      return 'Required field!';
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
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.email]);

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
    if (state.dtoCompany.phone_no.trim() === '') {
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.phone_no]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoCompany.address.trim() === '') {
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const onCompanyStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCompany]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoCompany.status.trim() === '') {
      return 'Required field!';
    } else {
      return null;
    }
  }, [state.dtoCompany.status]);
  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

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
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCompanyName, validateStatus, validateEmail, validateCompanyCode, validatePhoneNo, validateAddress]);

  const onSaveClick = useCallback(
    async (
      event: React.MouseEvent<HTMLElement>,
      company_type?: string,
      plan_type?: string,
      payment_type?: string,
      payment_amount?: number
    ) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoCompany.id === 0) {
            const { data } = await addCompanyPublic({
              variables: {
                company_name: state.dtoCompany.company_name,
                company_code: state.dtoCompany.company_code,
                domain_name: state.dtoCompany.domain_name,
                company_type: company_type,
                email: state.dtoCompany.email,
                phone_no: state.dtoCompany.phone_no,
                address: state.dtoCompany.address,
                plan_type: plan_type,
                payment_type: payment_type,
                amount: payment_amount
              }
            });
            if (data) {
              //  router.push('/companies/list');
              const options = {
                key: gConstants.RAZORPAY_KEY,
                amount: (payment_amount ?? 0) * 100, // in paise
                currency: gConstants.CURRENCY,
                name: gConstants.COMPANY,
                description: `Payment for ${gConstants.PAY_FOR_COMPANY_SUBSCRIPTION}`,
                handler: async (response: any) => {
                  const amount = payment_amount ?? 0;
                  const newPaymentId = await addPaymentDetails(event, response, amount, 1, 1);
                  router.push(`/paymentReceipt?id=${newPaymentId}&userName=${encodeURIComponent('')}`);
                },
                // The handler is called after successful payment
                // handler: async (response: any) => {
                //   console.log('Payment Sucessfull, payment response:',response);
                //   //await addPaymentDetails(event, response, price);
                //   router.push(
                //     `/payReceipt?courseName=${encodeURIComponent(course)}&studentName=${encodeURIComponent(
                //       state.dtoPaymentDetails.first_name + ' ' + state.dtoPaymentDetails.last_name
                //     )}&amount=${price}&userName=${encodeURIComponent(userName)}`
                //   );
                // },
                prefill: {
                  name: 'Student Name',
                  email: gConstants.CONTACT_EMAIL,
                  contact: gConstants.CONTACT_PHONE_NO
                },
                theme: {
                  color: '#3399cc'
                }
              };
              const rzp = new (window as any).Razorpay(options);
              rzp.open();
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        // showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addCompanyPublic, state.dtoCompany, router]
  );

  //  const onSaveClick = useCallback(
  //     async (event: React.MouseEvent<HTMLElement>, price: number, course: string) => {
  //       event.preventDefault();
  //       if (await validateForm()) {
  //         if (state.dtoPaymentDetails.id === 0) {
  //           const userName = String(await generateUserName(state.dtoPaymentDetails.first_name));
  //           const { data } = await addUser({
  //             variables: {
  //               first_name: state.dtoPaymentDetails.first_name,
  //               last_name: state.dtoPaymentDetails.last_name,
  //               email: state.dtoPaymentDetails.email,
  //               mobile_no: state.dtoPaymentDetails.mobile_no,
  //               user_name: userName,
  //               password: gConstants.PASSWORD,
  //               status: gConstants.STATUS,
  //               role_id: gConstants.ROLE_ID,
  //               image_url: 'To be updated'
  //             }
  //           });
  //           if (data) {
  //             const options = {
  //               key: gConstants.RAZORPAY_KEY,
  //               amount: price * 100, // in paise
  //               currency: gConstants.CURRENCY,
  //               name: gConstants.COMPANY,
  //               description: `Payment for ${selectedCourse}`,
  //               // The handler is called after successful payment
  //               handler: async (response: any) => {
  //                 await addPaymentDetails(event, response, price);
  //                 router.push(
  //                   `/payReceipt?courseName=${encodeURIComponent(course)}&studentName=${encodeURIComponent(
  //                     state.dtoPaymentDetails.first_name + ' ' + state.dtoPaymentDetails.last_name
  //                   )}&amount=${price}&userName=${encodeURIComponent(userName)}`
  //                 );
  //               },
  //               prefill: {
  //                 name: 'Student Name',
  //                 email: gConstants.CONTACT_EMAIL,
  //                 contact: gConstants.CONTACT_PHONE_NO
  //               },
  //               theme: {
  //                 color: '#3399cc'
  //               }
  //             };
  //             const rzp = new (window as any).Razorpay(options);
  //             rzp.open();
  //           }
  //         }
  //       }
  //     },
  //     [state, validateForm, addUser, addPaymentDetails, selectedCourse, router]
  //   );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoCompany: { ...COMPANY, id: state.dtoCompany.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoCompany.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/pricing-tech');
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
    onNormalizedInputChange,
    onCodeChange,
    onCompanyNameBlur,
    // onCompanyTypeBlur,
    onStatusBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onCompanyStatusChange,
    // onCompanyTypeChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onPhoneNoChange,
    onDomainNameBlur,
    saving
  };
};

export default useCompany;
