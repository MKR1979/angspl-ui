import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import LeadDTO, { LEAD } from '@/app/types/LeadDTO';
import { ADD_LEAD, UPDATE_LEAD, GET_LEAD } from '@/app/graphql/Lead';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import { regExEMail, regExUrl } from '@/app/common/Configuration';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';
import accounting from 'accounting';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  account_name: string | null;
  website: string | null;
  lead_source_id: string | null;
  assigned_to: string | null;
  email: string | null;
  status: string | null;
};

type StateType = {
  dtoLead: LeadDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  open7: boolean;
  tabIndex: number;
  arrPrimaryStateLookup: LookupDTO[];
  arrOtherStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoLead: LeadDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
};

const useLeadEntry = ({ dtoLead, arrCountryLookup, arrAssignedToLookup, arrLeadSourceLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    account_name: null,
    website: null,
    lead_source_id: null,
    assigned_to: null,
    email: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoLead: dtoLead,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    tabIndex: 0,
    arrPrimaryStateLookup: [],
    arrOtherStateLookup: [],
    arrCountryLookup: arrCountryLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    arrLeadSourceLookup: arrLeadSourceLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addLead] = useMutation(ADD_LEAD, {});

  const [updateLead] = useMutation(UPDATE_LEAD, {});

  const [getLead] = useLazyQuery(GET_LEAD, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLeadSourceLookup] = useLazyQuery(LEAD_SOURCE_LOOKUP, {
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
        country_id: state.dtoLead.primary_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrPrimaryStateLookup = data.getStateLookup;
    }
    setState({ arrPrimaryStateLookup: arrPrimaryStateLookup } as StateType);
  }, [getStateLookup, state.dtoLead.primary_country_id]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrOtherStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoLead.other_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrOtherStateLookup = data.getStateLookup;
    }
    setState({ arrOtherStateLookup: arrOtherStateLookup } as StateType);
  }, [getStateLookup, state.dtoLead.other_country_id]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoLead: LeadDTO = LEAD;
    const { error, data } = await getLead({
      variables: {
        id: state.dtoLead.id
      }
    });
    if (!error && data?.getLead) {
      dtoLead = data.getLead;
    }
    setState({ dtoLead: dtoLead } as StateType);
  }, [getLead, state.dtoLead.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoLead: {
        ...dtoLead,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoLead]);

  useEffect(() => {
    if (state.dtoLead.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData4();
  }, [state.dtoLead.id, getData, getData1, getData2, getData4, setDefaultValues]);

  useEffect(() => {
    getData5();
  }, [getData5, state.dtoLead.primary_country_id]);

  useEffect(() => {
    getData6();
  }, [getData6, state.dtoLead.other_country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'amount':
          setState({
            dtoLead: {
              ...state.dtoLead,
              [event.target.name]: Number(accounting.toFixed(parseFloat(event.target.value), 2))
            }
          } as StateType);
          break;
        default:
          setState({
            dtoLead: {
              ...state.dtoLead,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoLead]
  );

  const onPrimaryStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, primary_state_id: (value as LookupDTO).id, primary_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onPrimaryCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, primary_country_id: (value as LookupDTO).id, primary_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onOtherStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, other_state_id: (value as LookupDTO).id, other_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onOtherCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, other_country_id: (value as LookupDTO).id, other_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onLeadSourceNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, lead_source_id: (value as LookupDTO).id, lead_source_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLead: { ...state.dtoLead, status: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLead]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoLead.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoLead.first_name]);

  const onFirstNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoLead.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoLead.last_name]);

  const onLastNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);
  const validateWebsite = useCallback(async () => {
    if (state.dtoLead.website.trim() != '' && !state.dtoLead.website.trim().match(regExUrl)) {
      return 'Invalid Website';
    } else {
      return null;
    }
  }, [state.dtoLead.website]);

  const onWebsiteBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const website = await validateWebsite();
      setState({ errorMessages: { ...state.errorMessages, website: website } } as StateType);
    }, [validateWebsite, state.errorMessages]);

  const validateEMail = useCallback(async () => {
    if (state.dtoLead.email.trim() != '' && !state.dtoLead.email.trim().match(regExEMail)) {
      return 'Invalid E-Mail';
    } else {
      return null;
    }
  }, [state.dtoLead.email]);

  const onEMailBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMail();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMail, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoLead.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoLead.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateLeadSourceName = useCallback(async () => {
    if (state.dtoLead.lead_source_id === 0) {
      return 'Lead Source is required';
    } else {
      return null;
    }
  }, [state.dtoLead.lead_source_id]);

  const onLeadSourceNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const lead_source_id = await validateLeadSourceName();
      setState({ errorMessages: { ...state.errorMessages, lead_source_id: lead_source_id } } as StateType);
    }, [validateLeadSourceName, state.errorMessages]);

  const validateAccountName = useCallback(async () => {
    if (state.dtoLead.account_name.trim() === '') {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoLead.account_name]);

  const onAccountNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_name = await validateAccountName();
      setState({ errorMessages: { ...state.errorMessages, account_name: account_name } } as StateType);
    }, [validateAccountName, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoLead.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoLead.status]);

  const onStatusBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

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
    errorMessages.account_name = await validateAccountName();
    if (errorMessages.account_name) {
      isFormValid = false;
    }
    errorMessages.website = await validateWebsite();
    if (errorMessages.website) {
      isFormValid = false;
    }
    errorMessages.lead_source_id = await validateLeadSourceName();
    if (errorMessages.lead_source_id) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMail();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateFirstName,
    validateLastName,
    validateAccountName,
    validateWebsite,
    validateLeadSourceName,
    validateAssignedToName,
    validateEMail,
    validateStatus
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoLead.id === 0) {
            const { data } = await addLead({
              variables: {
                first_name: state.dtoLead.first_name,
                last_name: state.dtoLead.last_name,
                job_title_name: state.dtoLead.job_title_name,
                department_name: state.dtoLead.department_name,
                account_name: state.dtoLead.account_name,
                office_phone_no: state.dtoLead.office_phone_no,
                mobile_no: state.dtoLead.mobile_no,
                fax_no: state.dtoLead.fax_no,
                website: state.dtoLead.website,
                email: state.dtoLead.email,
                description: state.dtoLead.description,
                assigned_to: state.dtoLead.assigned_to,
                status: state.dtoLead.status,
                lead_source_id: state.dtoLead.lead_source_id,
                status_description: state.dtoLead.status_description,
                lead_source_description: state.dtoLead.lead_source_description,
                amount: state.dtoLead.amount,
                referred_by: state.dtoLead.referred_by,
                primary_address: state.dtoLead.primary_address,
                primary_city_name: state.dtoLead.primary_city_name,
                primary_state_id: state.dtoLead.primary_state_id,
                primary_country_id: state.dtoLead.primary_country_id,
                primary_zip_code: state.dtoLead.primary_zip_code,
                other_address: state.dtoLead.other_address,
                other_city_name: state.dtoLead.other_city_name,
                other_state_id: state.dtoLead.other_state_id,
                other_country_id: state.dtoLead.other_country_id,
                other_zip_code: state.dtoLead.other_zip_code
              }
            });
            if (data?.addLead) {
              toast.success('record saved successfully');
              router.push('/leads/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateLead({
              variables: {
                id: state.dtoLead.id,
                first_name: state.dtoLead.first_name,
                last_name: state.dtoLead.last_name,
                job_title_name: state.dtoLead.job_title_name,
                department_name: state.dtoLead.department_name,
                account_name: state.dtoLead.account_name,
                office_phone_no: state.dtoLead.office_phone_no,
                mobile_no: state.dtoLead.mobile_no,
                fax_no: state.dtoLead.fax_no,
                website: state.dtoLead.website,
                email: state.dtoLead.email,
                description: state.dtoLead.description,
                assigned_to: state.dtoLead.assigned_to,
                status: state.dtoLead.status,
                lead_source_id: state.dtoLead.lead_source_id,
                status_description: state.dtoLead.status_description,
                lead_source_description: state.dtoLead.lead_source_description,
                amount: state.dtoLead.amount,
                referred_by: state.dtoLead.referred_by,
                primary_address: state.dtoLead.primary_address,
                primary_city_name: state.dtoLead.primary_city_name,
                primary_state_id: state.dtoLead.primary_state_id,
                primary_country_id: state.dtoLead.primary_country_id,
                primary_zip_code: state.dtoLead.primary_zip_code,
                other_address: state.dtoLead.other_address,
                other_city_name: state.dtoLead.other_city_name,
                other_state_id: state.dtoLead.other_state_id,
                other_country_id: state.dtoLead.other_country_id,
                other_zip_code: state.dtoLead.other_zip_code
              }
            });
            if (data?.updateLead) {
              toast.success('record saved successfully');
              router.push('/leads/list');
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
    [validateForm, addLead, state.dtoLead, router, updateLead]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/leads/list');
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
    onPrimaryStateNameChange,
    onPrimaryCountryNameChange,
    onOtherStateNameChange,
    onOtherCountryNameChange,
    onAssignedToNameChange,
    onLeadSourceNameChange,
    onStatusChange,
    onFirstNameBlur,
    onLastNameBlur,
    onWebsiteBlur,
    onEMailBlur,
    onAssignedToNameBlur,
    onLeadSourceNameBlur,
    onStatusBlur,
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
    handleTabChange
  };
};

export default useLeadEntry;
