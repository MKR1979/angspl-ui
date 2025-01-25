import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ContactDTO, { CONTACT } from '@/app/types/ContactDTO';
import { ADD_CONTACT, UPDATE_CONTACT, GET_CONTACT, CONTACT_LOOKUP } from '@/app/graphql/Contact';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import { regExEMail } from '@/app/common/Configuration';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { isValidPhoneNumber } from 'libphonenumber-js';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  account_id: string | null;
  lead_source_id: string | null;
  assigned_to: string | null;
  email: string | null;
};

type StateType = {
  dtoContact: ContactDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  open8: boolean;
  tabIndex: number;
  arrPrimaryStateLookup: LookupDTO[];
  arrOtherStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoContact: ContactDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
};

const useContactEntry = ({
  dtoContact,
  arrCountryLookup,
  arrAssignedToLookup,
  arrLeadSourceLookup,
  arrContactLookup,
  arrAccountLookup
}: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    account_id: null,
    lead_source_id: null,
    assigned_to: null,
    email: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoContact: dtoContact,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
    tabIndex: 0,
    arrPrimaryStateLookup: [],
    arrOtherStateLookup: [],
    arrCountryLookup: arrCountryLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    arrLeadSourceLookup: arrLeadSourceLookup,
    arrContactLookup: arrContactLookup,
    arrAccountLookup: arrAccountLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addContact] = useMutation(ADD_CONTACT, {});

  const [updateContact] = useMutation(UPDATE_CONTACT, {});

  const [getContact] = useLazyQuery(GET_CONTACT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLeadSourceLookup] = useLazyQuery(LEAD_SOURCE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getContactLookup] = useLazyQuery(CONTACT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountLookup] = useLazyQuery(ACCOUNT_LOOKUP, {
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
    let arrLeadSourceLookup: LookupDTO[] = [];
    const { error, data } = await getLeadSourceLookup();
    if (!error && data?.getLeadSourceLookup) {
      arrLeadSourceLookup = data.getLeadSourceLookup;
    }
    setState({ arrLeadSourceLookup: arrLeadSourceLookup } as StateType);
  }, [getLeadSourceLookup]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrContactLookup: LookupDTO[] = [];
    const { error, data } = await getContactLookup({
      variables: {
        account_id: state.dtoContact.account_id
      }
    });
    if (!error && data?.getContactLookup) {
      arrContactLookup = data.getContactLookup;
    }
    setState({ arrContactLookup: arrContactLookup } as StateType);
  }, [getContactLookup]);

  const getData4 = useCallback(async (): Promise<void> => {
    let arrCountryLookup: LookupDTO[] = [];
    const { error, data } = await getCountryLookup();
    if (!error && data?.getCountryLookup) {
      arrCountryLookup = data.getCountryLookup;
    }
    setState({ arrCountryLookup: arrCountryLookup } as StateType);
  }, [getCountryLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrPrimaryStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoContact.primary_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrPrimaryStateLookup = data.getStateLookup;
    }
    setState({ arrPrimaryStateLookup: arrPrimaryStateLookup } as StateType);
  }, [getStateLookup, state.dtoContact.primary_country_id]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrOtherStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoContact.other_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrOtherStateLookup = data.getStateLookup;
    }
    setState({ arrOtherStateLookup: arrOtherStateLookup } as StateType);
  }, [getStateLookup, state.dtoContact.other_country_id]);

  const getData7 = useCallback(async (): Promise<void> => {
    let arrAccountLookup: LookupDTO[] = [];
    const { error, data } = await getAccountLookup();
    if (!error && data?.getAccountLookup) {
      arrAccountLookup = data.getAccountLookup;
    }
    setState({ arrAccountLookup: arrAccountLookup } as StateType);
  }, [getAccountLookup]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoContact: ContactDTO = CONTACT;
    const { error, data } = await getContact({
      variables: {
        id: state.dtoContact.id
      }
    });
    if (!error && data?.getContact) {
      dtoContact = data.getContact;
    }
    setState({ dtoContact: dtoContact } as StateType);
  }, [getContact, state.dtoContact.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoContact: {
        ...dtoContact,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoContact]);

  useEffect(() => {
    if (state.dtoContact.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData3();
    getData4();
    getData7();
  }, [state.dtoContact.id, getData, getData1, getData2, getData3, getData4, getData7, setDefaultValues]);

  useEffect(() => {
    getData5();
  }, [getData5, state.dtoContact.primary_country_id]);

  useEffect(() => {
    getData6();
  }, [getData6, state.dtoContact.other_country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoContact: {
          ...state.dtoContact,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onMobileNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoContact: {
          ...state.dtoContact,
          mobile_no: value
        }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onPrimaryStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, primary_state_id: (value as LookupDTO).id, primary_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onPrimaryCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, primary_country_id: (value as LookupDTO).id, primary_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onOtherStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, other_state_id: (value as LookupDTO).id, other_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onOtherCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, other_country_id: (value as LookupDTO).id, other_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onLeadSourceNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, lead_source_id: (value as LookupDTO).id, lead_source_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onReportsToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, reports_to: (value as LookupDTO).id, reports_to_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const onAccountNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContact: { ...state.dtoContact, account_id: (value as LookupDTO).id, account_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoContact]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoContact.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoContact.first_name]);

  const onFirstNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoContact.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoContact.last_name]);

  const onLastNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);

  const validateEMail = useCallback(async () => {
    if (state.dtoContact.email.trim() != '' && !state.dtoContact.email.trim().match(regExEMail)) {
      return 'Invalid E-Mail';
    } else {
      return null;
    }
  }, [state.dtoContact.email]);

  const onEMailBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMail();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMail, state.errorMessages]);

  const onMobileNoBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      setState({
        dtoContact: {
          ...state.dtoContact,
          mobile_no: !isValidPhoneNumber(state.dtoContact.mobile_no.trim()) ? '' : state.dtoContact.mobile_no.trim()
        }
      } as StateType);
    }, [state.dtoContact.mobile_no]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoContact.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoContact.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateLeadSourceName = useCallback(async () => {
    if (state.dtoContact.lead_source_id === 0) {
      return 'Lead Source is required';
    } else {
      return null;
    }
  }, [state.dtoContact.lead_source_id]);

  const onLeadSourceNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const lead_source_id = await validateLeadSourceName();
      setState({ errorMessages: { ...state.errorMessages, lead_source_id: lead_source_id } } as StateType);
    }, [validateLeadSourceName, state.errorMessages]);

  const validateAccountName = useCallback(async () => {
    if (state.dtoContact.account_id === 0) {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoContact.account_id]);

  const onAccountNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_id = await validateAccountName();
      setState({ errorMessages: { ...state.errorMessages, account_id: account_id } } as StateType);
    }, [validateAccountName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
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
    errorMessages.lead_source_id = await validateLeadSourceName();
    if (errorMessages.lead_source_id) {
      isFormValid = false;
    }
    errorMessages.account_id = await validateAccountName();
    if (errorMessages.account_id) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateFirstName, validateLastName, validateEMail, validateAssignedToName, validateLeadSourceName, validateAccountName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoContact.id === 0) {
            const { data } = await addContact({
              variables: {
                first_name: state.dtoContact.first_name,
                last_name: state.dtoContact.last_name,
                office_phone_no: state.dtoContact.office_phone_no,
                mobile_no: state.dtoContact.mobile_no,
                job_title_name: state.dtoContact.job_title_name,
                department_name: state.dtoContact.department_name,
                account_id: state.dtoContact.account_id,
                fax_no: state.dtoContact.fax_no,
                email: state.dtoContact.email,
                primary_address: state.dtoContact.primary_address,
                primary_city_name: state.dtoContact.primary_city_name,
                primary_state_id: state.dtoContact.primary_state_id,
                primary_country_id: state.dtoContact.primary_country_id,
                primary_zip_code: state.dtoContact.primary_zip_code,
                other_address: state.dtoContact.other_address,
                other_city_name: state.dtoContact.other_city_name,
                other_state_id: state.dtoContact.other_state_id,
                other_country_id: state.dtoContact.other_country_id,
                other_zip_code: state.dtoContact.other_zip_code,
                description: state.dtoContact.description,
                assigned_to: state.dtoContact.assigned_to,
                lead_source_id: state.dtoContact.lead_source_id,
                reports_to: state.dtoContact.reports_to
              }
            });
            if (data?.addContact) {
              toast.success('record saved successfully');
              router.push('/contacts/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateContact({
              variables: {
                id: state.dtoContact.id,
                first_name: state.dtoContact.first_name,
                last_name: state.dtoContact.last_name,
                office_phone_no: state.dtoContact.office_phone_no,
                mobile_no: state.dtoContact.mobile_no,
                job_title_name: state.dtoContact.job_title_name,
                department_name: state.dtoContact.department_name,
                account_id: state.dtoContact.account_id,
                fax_no: state.dtoContact.fax_no,
                email: state.dtoContact.email,
                primary_address: state.dtoContact.primary_address,
                primary_city_name: state.dtoContact.primary_city_name,
                primary_state_id: state.dtoContact.primary_state_id,
                primary_country_id: state.dtoContact.primary_country_id,
                primary_zip_code: state.dtoContact.primary_zip_code,
                other_address: state.dtoContact.other_address,
                other_city_name: state.dtoContact.other_city_name,
                other_state_id: state.dtoContact.other_state_id,
                other_country_id: state.dtoContact.other_country_id,
                other_zip_code: state.dtoContact.other_zip_code,
                description: state.dtoContact.description,
                assigned_to: state.dtoContact.assigned_to,
                lead_source_id: state.dtoContact.lead_source_id,
                reports_to: state.dtoContact.reports_to
              }
            });
            if (data?.updateContact) {
              toast.success('record saved successfully');
              router.push('/contacts/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        } else {
          setState({ tabIndex: 0 } as StateType);
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addContact, state.dtoContact, router, updateContact]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/contacts/list');
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

  const setOpen8 = useCallback(async (): Promise<void> => {
    setState({ open8: true } as StateType);
  }, []);

  const setClose8 = useCallback(async (): Promise<void> => {
    setState({ open8: false } as StateType);
  }, []);

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onMobileNoChange,
    onPrimaryStateNameChange,
    onPrimaryCountryNameChange,
    onOtherStateNameChange,
    onOtherCountryNameChange,
    onAssignedToNameChange,
    onLeadSourceNameChange,
    onReportsToNameChange,
    onAccountNameChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailBlur,
    onMobileNoBlur,
    onAssignedToNameBlur,
    onLeadSourceNameBlur,
    onAccountNameBlur,
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
    setOpen8,
    setClose8,
    handleTabChange
  };
};

export default useContactEntry;
