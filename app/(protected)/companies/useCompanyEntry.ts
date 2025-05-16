import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CompanyDTO, { COMPANY } from '@/app/types/CompanyDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCompanyStatus } from '@/app/common/Configuration';
import { arrCompanyType } from '@/app/common/Configuration';
import { ADD_COMPANY, UPDATE_COMPANY, GET_COMPANY } from '@/app/graphql/Company';

type ErrorMessageType = {
  company_code: string | null;
  company_name: string | null;
  company_type: string | null;
  email: string | null;
  phone_no: string | null;
  address: string | null;
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

type Props = {
  dtoCompany: CompanyDTO;
};

const useCompanyEntry = ({ dtoCompany }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    company_code: null,
    company_name: null,
    company_type: null,
    email: null,
    phone_no: null,
    address: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCompany: dtoCompany,
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
  const [addCompany] = useMutation(ADD_COMPANY, {});
  const [updateCompany] = useMutation(UPDATE_COMPANY, {});
  const [getCompany] = useLazyQuery(GET_COMPANY, { fetchPolicy: 'network-only' });

  const getCompanyData = useCallback(async (): Promise<void> => {
    let dtoCompany: CompanyDTO = COMPANY;
    const { error, data } = await getCompany({
      variables: {
        id: state.dtoCompany.id
      }
    });
    if (!error && data) {
      dtoCompany = data.getCompany;
    }
    setState({ dtoCompany: dtoCompany } as StateType);
  }, [getCompany, state.dtoCompany.id]);

  useEffect(() => {
    if (state.dtoCompany.id > 0) {
      getCompanyData();
    }
  }, [state.dtoCompany.id, getCompanyData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;

      setState({
        dtoCompany: {
          ...state.dtoCompany,
          [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const validateCompanyName = useCallback(async () => {
    if (state.dtoCompany.company_name.trim() === '') {
      return 'Company Name is required';
    } else {
      return null;
    }
  }, [state.dtoCompany.company_name]);

  const onCompanyNameBlur = useCallback(async () => {
    const company_name = await validateCompanyName();
    setState({ errorMessages: { ...state.errorMessages, company_name: company_name } } as StateType);
  }, [validateCompanyName, state.errorMessages]);

  const validateCompanyCode = useCallback(async () => {
    if (state.dtoCompany.company_code.trim() === '') {
      return 'Company Code is required';
    } else {
      return null;
    }
  }, [state.dtoCompany.company_code]);

  const onCompanyCodeBlur = useCallback(async () => {
    const company_code = await validateCompanyCode();
    setState({ errorMessages: { ...state.errorMessages, company_code: company_code } } as StateType);
  }, [validateCompanyCode, state.errorMessages]);

  const onCompanyTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCompany: {
          ...state.dtoCompany,
          company_type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCompany]
  );

  const validateCompanyType = useCallback(async () => {
    if (state.dtoCompany.company_type.trim() === '') {
      return 'Company Type is required';
    } else {
      return null;
    }
  }, [state.dtoCompany.company_type]);

  const onCompanyTypeBlur = useCallback(async () => {
    const company_type = await validateCompanyType();
    setState({ errorMessages: { ...state.errorMessages, company_type: company_type } } as StateType);
  }, [validateCompanyType, state.errorMessages]);

  const validateEmail = useCallback(async () => {
    if (state.dtoCompany.email.trim() === '') {
      return 'Email  is required';
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
      return 'Phone Number  is required';
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
      return 'Address is required';
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
      return 'Status is required';
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
    errorMessages.company_type = await validateCompanyType();
    if (errorMessages.company_type) {
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
  }, [validateCompanyName, validateCompanyType, validateStatus, validateEmail, validateCompanyCode, validatePhoneNo, validateAddress]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoCompany.id === 0) {
          const { data } = await addCompany({
            variables: {
              ...state.dtoCompany
            }
          });
          if (data) {
            router.push('/companies/list');
          }
        } else {
          const { data } = await updateCompany({
            variables: {
              ...state.dtoCompany
            }
          });
          if (data) {
            router.push('/companies/list');
          }
        }
      }
    },
    [validateForm, addCompany, state.dtoCompany, router, updateCompany]
  );

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
      router.push('/companies/list');
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
    onCompanyNameBlur,
    onCompanyTypeBlur,
    onStatusBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onCompanyStatusChange,
    onCompanyTypeChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onPhoneNoChange
  };
};

export default useCompanyEntry;
