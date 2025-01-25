import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';
import { ADD_ACCOUNT, UPDATE_ACCOUNT, GET_ACCOUNT } from '@/app/graphql/Account';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_TYPE_LOOKUP } from '@/app/graphql/AccountType';
import { INDUSTRY_LOOKUP } from '@/app/graphql/Industry';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import accounting from 'accounting';
import { regExEMail, regExUrl } from '@/app/common/Configuration';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  account_name: string | null;
  website: string | null;
  email: string | null;
  // billing_address: string | null;
  // billing_city_name: string | null;
  // billing_state_id: string | null;
  // billing_country_id: string | null;
  // billing_zip_code: string | null;
  // shipping_address: string | null;
  // shipping_city_name: string | null;
  // shipping_state_id: string | null;
  // shipping_country_id: string | null;
  // shipping_zip_code: string | null;
  assigned_to: string | null;
  account_type_id: string | null;
  industry_id: string | null;
};

type StateType = {
  dtoAccount: AccountDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  tabIndex: number;
  arrBillingStateLookup: LookupDTO[];
  arrShippingStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrAccountTypeLookup: LookupDTO[];
  arrIndustryLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoAccount: AccountDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrAccountTypeLookup: LookupDTO[];
  arrIndustryLookup: LookupDTO[];
};

const useAccountEntry = ({ dtoAccount, arrCountryLookup, arrAssignedToLookup, arrAccountTypeLookup, arrIndustryLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    account_name: null,
    website: null,
    email: null,
    // billing_address: null,
    // billing_city_name: null,
    // billing_state_id: null,
    // billing_country_id: null,
    // billing_zip_code: null,
    // shipping_address: null,
    // shipping_city_name: null,
    // shipping_state_id: null,
    // shipping_country_id: null,
    // shipping_zip_code: null,
    assigned_to: null,
    account_type_id: null,
    industry_id: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAccount: dtoAccount,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    tabIndex: 0,
    arrBillingStateLookup: [],
    arrShippingStateLookup: [],
    arrCountryLookup: arrCountryLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    arrAccountTypeLookup: arrAccountTypeLookup,
    arrIndustryLookup: arrIndustryLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addAccount] = useMutation(ADD_ACCOUNT, {});

  const [updateAccount] = useMutation(UPDATE_ACCOUNT, {});

  const [getAccount] = useLazyQuery(GET_ACCOUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountTypeLookup] = useLazyQuery(ACCOUNT_TYPE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getIndustryLookup] = useLazyQuery(INDUSTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData1 = useCallback(async (): Promise<void> => {
    let arrAssignedToLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup();
    if (!error && data?.getUserLookup) {
      arrAssignedToLookup = data.getUserLookup;
    }
    setState({ arrAssignedToLookup: arrAssignedToLookup } as StateType);
  }, [getUserLookup]);

  const getData2 = useCallback(async (): Promise<void> => {
    let arrAccountTypeLookup: LookupDTO[] = [];
    const { error, data } = await getAccountTypeLookup();
    if (!error && data?.getAccountTypeLookup) {
      arrAccountTypeLookup = data.getAccountTypeLookup;
    }
    setState({ arrAccountTypeLookup: arrAccountTypeLookup } as StateType);
  }, [getAccountTypeLookup]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrIndustryLookup: LookupDTO[] = [];
    const { error, data } = await getIndustryLookup();
    if (!error && data?.getIndustryLookup) {
      arrIndustryLookup = data.getIndustryLookup;
    }
    setState({ arrIndustryLookup: arrIndustryLookup } as StateType);
  }, [getIndustryLookup]);

  const getData4 = useCallback(async (): Promise<void> => {
    let arrCountryLookup: LookupDTO[] = [];
    const { error, data } = await getCountryLookup();
    if (!error && data?.getCountryLookup) {
      arrCountryLookup = data.getCountryLookup;
    }
    setState({ arrCountryLookup: arrCountryLookup } as StateType);
  }, [getCountryLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrBillingStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoAccount.billing_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrBillingStateLookup = data.getStateLookup;
    }
    setState({ arrBillingStateLookup: arrBillingStateLookup } as StateType);
  }, [getStateLookup, state.dtoAccount.billing_country_id]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrShippingStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoAccount.shipping_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrShippingStateLookup = data.getStateLookup;
    }
    setState({ arrShippingStateLookup: arrShippingStateLookup } as StateType);
  }, [getStateLookup, state.dtoAccount.shipping_country_id]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoAccount: AccountDTO = ACCOUNT;
    const { error, data } = await getAccount({
      variables: {
        id: state.dtoAccount.id
      }
    });
    if (!error && data?.getAccount) {
      dtoAccount = data.getAccount;
    }
    setState({ dtoAccount: dtoAccount } as StateType);
  }, [getAccount, state.dtoAccount.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoAccount: {
        ...dtoAccount,
        assigned_to: dtoUser.id,
        assigned_to_first_name: dtoUser.first_name,
        assigned_to_last_name: dtoUser.last_name,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoAccount]);

  useEffect(() => {
    if (state.dtoAccount.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData3();
    getData4();
  }, [state.dtoAccount.id, getData, getData1, getData2, getData3, getData4, setDefaultValues]);

  useEffect(() => {
    getData5();
  }, [getData5, state.dtoAccount.billing_country_id]);

  useEffect(() => {
    getData6();
  }, [getData6, state.dtoAccount.shipping_country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      // setState({
      //   dtoAccount: {
      //     ...state.dtoAccount,
      //     [event.target.name]: event.target.value
      //   }
      // } as StateType);
      switch (event.target.name) {
        case 'annual_revenue':
          setState({
            dtoAccount: {
              ...state.dtoAccount,
              [event.target.name]: parseFloat(accounting.toFixed(parseFloat(event.target.value), 2))
            }
          } as StateType);
          break;
        case 'head_count':
          setState({
            dtoAccount: {
              ...state.dtoAccount,
              [event.target.name]: parseInt(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoAccount: {
              ...state.dtoAccount,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoAccount]
  );

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoAccount: {
          ...state.dtoAccount,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onCopyClick = useCallback(async () =>
    //event: React.MouseEvent<HTMLElement>
    {
      setState({
        dtoAccount: {
          ...state.dtoAccount,
          shipping_address: state.dtoAccount.billing_address,
          shipping_city_name: state.dtoAccount.billing_city_name,
          shipping_state_id: state.dtoAccount.billing_state_id,
          shipping_state_code: state.dtoAccount.billing_state_code,
          shipping_state_name: state.dtoAccount.billing_state_name,
          shipping_country_id: state.dtoAccount.billing_country_id,
          shipping_country_name: state.dtoAccount.billing_country_name,
          shipping_zip_code: state.dtoAccount.billing_zip_code
        }
      } as StateType);
    }, [state.dtoAccount]);

  const onBillingStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, billing_state_id: (value as LookupDTO).id, billing_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onBillingCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, billing_country_id: (value as LookupDTO).id, billing_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onShippingStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, shipping_state_id: (value as LookupDTO).id, shipping_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onShippingCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, shipping_country_id: (value as LookupDTO).id, shipping_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onAccountTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, account_type_id: (value as LookupDTO).id, account_type_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const onIndustryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAccount: { ...state.dtoAccount, industry_id: (value as LookupDTO).id, industry_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAccount]
  );

  const validateAccountName = useCallback(async () => {
    if (state.dtoAccount.account_name.trim() === '') {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoAccount.account_name]);

  const onAccountNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_name = await validateAccountName();
      setState({ errorMessages: { ...state.errorMessages, account_name: account_name } } as StateType);
    }, [validateAccountName, state.errorMessages]);

  const validateWebsite = useCallback(async () => {
    if (state.dtoAccount.website.trim() != '' && !state.dtoAccount.website.trim().match(regExUrl)) {
      return 'Invalid Website';
    } else {
      return null;
    }
  }, [state.dtoAccount.website]);

  const onWebsiteBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const website = await validateWebsite();
      setState({ errorMessages: { ...state.errorMessages, website: website } } as StateType);
    }, [validateWebsite, state.errorMessages]);

  const validateEMail = useCallback(async () => {
    if (state.dtoAccount.email.trim() != '' && !state.dtoAccount.email.trim().match(regExEMail)) {
      return 'Invalid E-Mail';
    } else {
      return null;
    }
  }, [state.dtoAccount.email]);

  const onEMailBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMail();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMail, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      setState({
        dtoAccount: {
          ...state.dtoAccount,
          phone_no: !isValidPhoneNumber(state.dtoAccount.phone_no.trim()) ? '' : state.dtoAccount.phone_no.trim()
        }
      } as StateType);
    }, [state.dtoAccount]);

  // const validateBillingAddress = useCallback(async () => {
  //   if (state.dtoAccount.billing_address.trim() === '') {
  //     return 'Billing Address is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.billing_address]);

  // const onBillingAddressBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const billing_address = await validateBillingAddress();
  //     setState({ errorMessages: { ...state.errorMessages, billing_address: billing_address } } as StateType);
  //   }, [validateBillingAddress, state.errorMessages]);

  // const validateBillingCityName = useCallback(async () => {
  //   if (state.dtoAccount.billing_city_name.trim() === '') {
  //     return 'Billing City Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.billing_city_name]);

  // const onBillingCityNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const billing_city_name = await validateBillingCityName();
  //     setState({ errorMessages: { ...state.errorMessages, billing_city_name: billing_city_name } } as StateType);
  //   }, [validateBillingCityName, state.errorMessages]);

  // const validateBillingStateName = useCallback(async () => {
  //   if (state.dtoAccount.billing_state_id === 0) {
  //     return 'Billing State Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.billing_state_id]);

  // const onBillingStateNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const billing_state_id = await validateBillingStateName();
  //     setState({ errorMessages: { ...state.errorMessages, billing_state_id: billing_state_id } } as StateType);
  //   }, [validateBillingStateName, state.errorMessages]);

  // const validateBillingCountryName = useCallback(async () => {
  //   if (state.dtoAccount.billing_country_id === 0) {
  //     return 'Billing Country Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.billing_country_id]);

  // const onBillingCountryNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const billing_country_id = await validateBillingCountryName();
  //     setState({ errorMessages: { ...state.errorMessages, billing_country_id: billing_country_id } } as StateType);
  //   }, [validateBillingCountryName, state.errorMessages]);

  // const validateBillingZipCode = useCallback(async () => {
  //   if (state.dtoAccount.billing_zip_code.trim() === '') {
  //     return 'Billing Zip Code is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.billing_zip_code]);

  // const onBillingZipCodeBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const billing_zip_code = await validateBillingZipCode();
  //     setState({ errorMessages: { ...state.errorMessages, billing_zip_code: billing_zip_code } } as StateType);
  //   }, [validateBillingZipCode, state.errorMessages]);

  // const validateShippingAddress = useCallback(async () => {
  //   if (state.dtoAccount.shipping_address.trim() === '') {
  //     return 'Shipping Address is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.shipping_address]);

  // const onShippingAddressBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const shipping_address = await validateShippingAddress();
  //     setState({ errorMessages: { ...state.errorMessages, shipping_address: shipping_address } } as StateType);
  //   }, [validateShippingAddress, state.errorMessages]);

  // const validateShippingCityName = useCallback(async () => {
  //   if (state.dtoAccount.shipping_city_name.trim() === '') {
  //     return 'Shipping City Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.shipping_city_name]);

  // const onShippingCityNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const shipping_city_name = await validateShippingCityName();
  //     setState({ errorMessages: { ...state.errorMessages, shipping_city_name: shipping_city_name } } as StateType);
  //   }, [validateShippingCityName, state.errorMessages]);

  // const validateShippingStateName = useCallback(async () => {
  //   if (state.dtoAccount.shipping_state_id === 0) {
  //     return 'Shipping State Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.shipping_state_id]);

  // const onShippingStateNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const shipping_state_id = await validateShippingStateName();
  //     setState({ errorMessages: { ...state.errorMessages, shipping_state_id: shipping_state_id } } as StateType);
  //   }, [validateShippingStateName, state.errorMessages]);

  // const validateShippingCountryName = useCallback(async () => {
  //   if (state.dtoAccount.shipping_country_id === 0) {
  //     return 'Shipping Country Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.shipping_country_id]);

  // const onShippingCountryNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const shipping_country_id = await validateShippingCountryName();
  //     setState({ errorMessages: { ...state.errorMessages, shipping_country_id: shipping_country_id } } as StateType);
  //   }, [validateShippingCountryName, state.errorMessages]);

  // const validateShippingZipCode = useCallback(async () => {
  //   if (state.dtoAccount.shipping_zip_code.trim() === '') {
  //     return 'Shipping Zip Code is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoAccount.shipping_zip_code]);

  // const onShippingZipCodeBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const shipping_zip_code = await validateShippingZipCode();
  //     setState({ errorMessages: { ...state.errorMessages, shipping_zip_code: shipping_zip_code } } as StateType);
  //   }, [validateShippingZipCode, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoAccount.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoAccount.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateAccountTypeName = useCallback(async () => {
    if (state.dtoAccount.account_type_id === 0) {
      return 'Account Type is required';
    } else {
      return null;
    }
  }, [state.dtoAccount.account_type_id]);

  const onAccountTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_type_id = await validateAccountTypeName();
      setState({ errorMessages: { ...state.errorMessages, account_type_id: account_type_id } } as StateType);
    }, [validateAccountTypeName, state.errorMessages]);

  const validateIndustryName = useCallback(async () => {
    if (state.dtoAccount.industry_id === 0) {
      return 'Industry is required';
    } else {
      return null;
    }
  }, [state.dtoAccount.industry_id]);

  const onIndustryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const industry_id = await validateIndustryName();
      setState({ errorMessages: { ...state.errorMessages, industry_id: industry_id } } as StateType);
    }, [validateIndustryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.account_name = await validateAccountName();
    if (errorMessages.account_name) {
      isFormValid = false;
    }
    errorMessages.website = await validateWebsite();
    if (errorMessages.website) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMail();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    errorMessages.account_type_id = await validateAccountTypeName();
    if (errorMessages.account_type_id) {
      isFormValid = false;
    }
    errorMessages.industry_id = await validateIndustryName();
    if (errorMessages.industry_id) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateAccountName, validateWebsite, validateEMail, validateAssignedToName, validateAccountTypeName, validateIndustryName]);

  // const validateForm1 = useCallback(async () => {
  //   let isFormValid = true;
  //   const errorMessages: ErrorMessageType = {} as ErrorMessageType;
  //   errorMessages.billing_address = await validateBillingAddress();
  //   if (errorMessages.billing_address) {
  //     isFormValid = false;
  //   }
  //   errorMessages.billing_city_name = await validateBillingCityName();
  //   if (errorMessages.billing_city_name) {
  //     isFormValid = false;
  //   }
  //   errorMessages.billing_state_id = await validateBillingStateName();
  //   if (errorMessages.billing_state_id) {
  //     isFormValid = false;
  //   }
  //   errorMessages.billing_country_id = await validateBillingCountryName();
  //   if (errorMessages.billing_country_id) {
  //     isFormValid = false;
  //   }
  //   errorMessages.billing_zip_code = await validateBillingZipCode();
  //   if (errorMessages.billing_zip_code) {
  //     isFormValid = false;
  //   }
  //   setState({ errorMessages: errorMessages } as StateType);
  //   return isFormValid;
  // }, [validateBillingAddress, validateBillingCityName, validateBillingStateName, validateBillingCountryName, validateBillingZipCode]);

  // const validateForm2 = useCallback(async () => {
  //   let isFormValid = true;
  //   const errorMessages: ErrorMessageType = {} as ErrorMessageType;
  //   errorMessages.shipping_address = await validateShippingAddress();
  //   if (errorMessages.shipping_address) {
  //     isFormValid = false;
  //   }
  //   errorMessages.shipping_city_name = await validateShippingCityName();
  //   if (errorMessages.shipping_city_name) {
  //     isFormValid = false;
  //   }
  //   errorMessages.shipping_state_id = await validateShippingStateName();
  //   if (errorMessages.shipping_state_id) {
  //     isFormValid = false;
  //   }
  //   errorMessages.shipping_country_id = await validateShippingCountryName();
  //   if (errorMessages.shipping_country_id) {
  //     isFormValid = false;
  //   }
  //   errorMessages.shipping_zip_code = await validateShippingZipCode();
  //   if (errorMessages.shipping_zip_code) {
  //     isFormValid = false;
  //   }
  //   setState({ errorMessages: errorMessages } as StateType);
  //   return isFormValid;
  // }, [validateShippingAddress, validateShippingCityName, validateShippingStateName, validateShippingCountryName, validateShippingZipCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          // if (await validateForm1()) {
          // if (await validateForm2()) {
          if (state.dtoAccount.id === 0) {
            const { data } = await addAccount({
              variables: {
                account_name: state.dtoAccount.account_name,
                website: state.dtoAccount.website,
                email: state.dtoAccount.email,
                phone_no: state.dtoAccount.phone_no,
                fax_no: state.dtoAccount.fax_no,
                billing_address: state.dtoAccount.billing_address,
                billing_city_name: state.dtoAccount.billing_city_name,
                billing_state_id: state.dtoAccount.billing_state_id,
                billing_country_id: state.dtoAccount.billing_country_id,
                billing_zip_code: state.dtoAccount.billing_zip_code,
                shipping_address: state.dtoAccount.shipping_address,
                shipping_city_name: state.dtoAccount.shipping_city_name,
                shipping_state_id: state.dtoAccount.shipping_state_id,
                shipping_country_id: state.dtoAccount.shipping_country_id,
                shipping_zip_code: state.dtoAccount.shipping_zip_code,
                description: state.dtoAccount.description,
                assigned_to: state.dtoAccount.assigned_to,
                account_type_id: state.dtoAccount.account_type_id,
                industry_id: state.dtoAccount.industry_id,
                annual_revenue: state.dtoAccount.annual_revenue,
                head_count: state.dtoAccount.head_count
              }
            });
            if (data?.addAccount) {
              toast.success('record saved successfully');
              router.push('/accounts/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateAccount({
              variables: {
                id: state.dtoAccount.id,
                account_name: state.dtoAccount.account_name,
                website: state.dtoAccount.website,
                email: state.dtoAccount.email,
                phone_no: state.dtoAccount.phone_no,
                fax_no: state.dtoAccount.fax_no,
                billing_address: state.dtoAccount.billing_address,
                billing_city_name: state.dtoAccount.billing_city_name,
                billing_state_id: state.dtoAccount.billing_state_id,
                billing_country_id: state.dtoAccount.billing_country_id,
                billing_zip_code: state.dtoAccount.billing_zip_code,
                shipping_address: state.dtoAccount.shipping_address,
                shipping_city_name: state.dtoAccount.shipping_city_name,
                shipping_state_id: state.dtoAccount.shipping_state_id,
                shipping_country_id: state.dtoAccount.shipping_country_id,
                shipping_zip_code: state.dtoAccount.shipping_zip_code,
                description: state.dtoAccount.description,
                assigned_to: state.dtoAccount.assigned_to,
                account_type_id: state.dtoAccount.account_type_id,
                industry_id: state.dtoAccount.industry_id,
                annual_revenue: state.dtoAccount.annual_revenue,
                head_count: state.dtoAccount.head_count
              }
            });
            if (data?.updateAccount) {
              toast.success('record saved successfully');
              router.push('/accounts/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
          //   } else {
          //     setState({ tabIndex: 2 } as StateType);
          //   }
          // } else {
          //   setState({ tabIndex: 1 } as StateType);
          // }
        } else {
          setState({ tabIndex: 0 } as StateType);
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [
      validateForm,
      //validateForm1,
      //validateForm2,
      addAccount,
      state.dtoAccount,
      router,
      updateAccount
    ]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/accounts/list');
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

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);

  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);

  const setOpen5 = useCallback(async (): Promise<void> => {
    setState({ open5: true } as StateType);
  }, []);

  const setClose5 = useCallback(async (): Promise<void> => {
    setState({ open5: false } as StateType);
  }, []);

  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  const setOpen7 = useCallback(async (): Promise<void> => {
    setState({ open7: true } as StateType);
  }, []);

  const setClose7 = useCallback(async (): Promise<void> => {
    setState({ open7: false } as StateType);
  }, []);

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onPhoneNoChange,
    onBillingStateNameChange,
    onBillingCountryNameChange,
    onShippingStateNameChange,
    onShippingCountryNameChange,
    onAssignedToNameChange,
    onAccountTypeNameChange,
    onIndustryNameChange,
    onAccountNameBlur,
    onWebsiteBlur,
    onEMailBlur,
    onPhoneNoBlur,
    // onBillingAddressBlur,
    // onBillingCityNameBlur,
    // onBillingStateNameBlur,
    // onBillingCountryNameBlur,
    // onBillingZipCodeBlur,
    // onShippingAddressBlur,
    // onShippingCityNameBlur,
    // onShippingStateNameBlur,
    // onShippingCountryNameBlur,
    // onShippingZipCodeBlur,
    onAssignedToNameBlur,
    onAccountTypeNameBlur,
    onIndustryNameBlur,
    onSaveClick,
    onCancelClick,
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
    handleTabChange,
    onCopyClick
  };
};

export default useAccountEntry;
