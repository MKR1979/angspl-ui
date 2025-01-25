import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import TargetDTO, { TARGET } from '@/app/types/TargetDTO';
import { ADD_TARGET, UPDATE_TARGET, GET_TARGET } from '@/app/graphql/Target';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import { regExEMail, regExUrl } from '@/app/common/Configuration';
import UserDTO, { USER } from '@/app/types/UserDTO';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  account_name: string | null;
  website: string | null;
  assigned_to: string | null;
  email: string | null;
};

type StateType = {
  dtoTarget: TargetDTO;
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
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoTarget: TargetDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useTargetEntry = ({ dtoTarget, arrCountryLookup, arrAssignedToLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    account_name: null,
    website: null,
    assigned_to: null,
    email: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoTarget: dtoTarget,
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
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addTarget] = useMutation(ADD_TARGET, {});

  const [updateTarget] = useMutation(UPDATE_TARGET, {});

  const [getTarget] = useLazyQuery(GET_TARGET, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
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
        country_id: state.dtoTarget.primary_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrPrimaryStateLookup = data.getStateLookup;
    }
    setState({ arrPrimaryStateLookup: arrPrimaryStateLookup } as StateType);
  }, [getStateLookup, state.dtoTarget.primary_country_id]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrOtherStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoTarget.other_country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrOtherStateLookup = data.getStateLookup;
    }
    setState({ arrOtherStateLookup: arrOtherStateLookup } as StateType);
  }, [getStateLookup, state.dtoTarget.other_country_id]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoTarget: TargetDTO = TARGET;
    const { error, data } = await getTarget({
      variables: {
        id: state.dtoTarget.id
      }
    });
    if (!error && data?.getTarget) {
      dtoTarget = data.getTarget;
    }
    setState({ dtoTarget: dtoTarget } as StateType);
  }, [getTarget, state.dtoTarget.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoTarget: {
        ...dtoTarget,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoTarget]);

  useEffect(() => {
    if (state.dtoTarget.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData4();
  }, [state.dtoTarget.id, getData, getData1, getData4, setDefaultValues]);

  useEffect(() => {
    getData5();
  }, [getData5, state.dtoTarget.primary_country_id]);

  useEffect(() => {
    getData6();
  }, [getData6, state.dtoTarget.other_country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoTarget: {
          ...state.dtoTarget,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const onPrimaryStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTarget: { ...state.dtoTarget, primary_state_id: (value as LookupDTO).id, primary_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const onPrimaryCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTarget: { ...state.dtoTarget, primary_country_id: (value as LookupDTO).id, primary_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const onOtherStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTarget: { ...state.dtoTarget, other_state_id: (value as LookupDTO).id, other_state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const onOtherCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTarget: { ...state.dtoTarget, other_country_id: (value as LookupDTO).id, other_country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTarget: { ...state.dtoTarget, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTarget]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoTarget.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoTarget.first_name]);

  const onFirstNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoTarget.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoTarget.last_name]);

  const onLastNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);
  const validateWebsite = useCallback(async () => {
    if (state.dtoTarget.website.trim() != '' && !state.dtoTarget.website.trim().match(regExUrl)) {
      return 'Invalid Website';
    } else {
      return null;
    }
  }, [state.dtoTarget.website]);

  const onWebsiteBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const website = await validateWebsite();
      setState({ errorMessages: { ...state.errorMessages, website: website } } as StateType);
    }, [validateWebsite, state.errorMessages]);

  const validateEMail = useCallback(async () => {
    if (state.dtoTarget.email.trim() != '' && !state.dtoTarget.email.trim().match(regExEMail)) {
      return 'Invalid E-Mail';
    } else {
      return null;
    }
  }, [state.dtoTarget.email]);

  const onEMailBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMail();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMail, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoTarget.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoTarget.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateAccountName = useCallback(async () => {
    if (state.dtoTarget.account_name.trim() === '') {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoTarget.account_name]);

  const onAccountNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_name = await validateAccountName();
      setState({ errorMessages: { ...state.errorMessages, account_name: account_name } } as StateType);
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
    errorMessages.account_name = await validateAccountName();
    if (errorMessages.account_name) {
      isFormValid = false;
    }
    errorMessages.website = await validateWebsite();
    if (errorMessages.website) {
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
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateFirstName, validateLastName, validateAccountName, validateWebsite, validateAssignedToName, validateEMail]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoTarget.id === 0) {
            const { data } = await addTarget({
              variables: {
                first_name: state.dtoTarget.first_name,
                last_name: state.dtoTarget.last_name,
                job_title_name: state.dtoTarget.job_title_name,
                department_name: state.dtoTarget.department_name,
                account_name: state.dtoTarget.account_name,
                office_phone_no: state.dtoTarget.office_phone_no,
                mobile_no: state.dtoTarget.mobile_no,
                fax_no: state.dtoTarget.fax_no,
                website: state.dtoTarget.website,
                email: state.dtoTarget.email,
                description: state.dtoTarget.description,
                assigned_to: state.dtoTarget.assigned_to,
                referred_by: state.dtoTarget.referred_by,
                primary_address: state.dtoTarget.primary_address,
                primary_city_name: state.dtoTarget.primary_city_name,
                primary_state_id: state.dtoTarget.primary_state_id,
                primary_country_id: state.dtoTarget.primary_country_id,
                primary_zip_code: state.dtoTarget.primary_zip_code,
                other_address: state.dtoTarget.other_address,
                other_city_name: state.dtoTarget.other_city_name,
                other_state_id: state.dtoTarget.other_state_id,
                other_country_id: state.dtoTarget.other_country_id,
                other_zip_code: state.dtoTarget.other_zip_code
              }
            });
            if (data?.addTarget) {
              toast.success('record saved successfully');
              router.push('/targets/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateTarget({
              variables: {
                id: state.dtoTarget.id,
                first_name: state.dtoTarget.first_name,
                last_name: state.dtoTarget.last_name,
                job_title_name: state.dtoTarget.job_title_name,
                department_name: state.dtoTarget.department_name,
                account_name: state.dtoTarget.account_name,
                office_phone_no: state.dtoTarget.office_phone_no,
                mobile_no: state.dtoTarget.mobile_no,
                fax_no: state.dtoTarget.fax_no,
                website: state.dtoTarget.website,
                email: state.dtoTarget.email,
                description: state.dtoTarget.description,
                assigned_to: state.dtoTarget.assigned_to,
                referred_by: state.dtoTarget.referred_by,
                primary_address: state.dtoTarget.primary_address,
                primary_city_name: state.dtoTarget.primary_city_name,
                primary_state_id: state.dtoTarget.primary_state_id,
                primary_country_id: state.dtoTarget.primary_country_id,
                primary_zip_code: state.dtoTarget.primary_zip_code,
                other_address: state.dtoTarget.other_address,
                other_city_name: state.dtoTarget.other_city_name,
                other_state_id: state.dtoTarget.other_state_id,
                other_country_id: state.dtoTarget.other_country_id,
                other_zip_code: state.dtoTarget.other_zip_code
              }
            });
            if (data?.updateTarget) {
              toast.success('record saved successfully');
              router.push('/targets/list');
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
    [validateForm, addTarget, state.dtoTarget, router, updateTarget]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/targets/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
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
    onFirstNameBlur,
    onLastNameBlur,
    onWebsiteBlur,
    onEMailBlur,
    onAssignedToNameBlur,
    onAccountNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
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

export default useTargetEntry;
