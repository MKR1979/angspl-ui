import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import OpportunityDTO, { OPPORTUNITY } from '@/app/types/OpportunityDTO';
import { ADD_OPPORTUNITY, UPDATE_OPPORTUNITY, GET_OPPORTUNITY } from '@/app/graphql/Opportunity';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { STAGE_LOOKUP } from '@/app/graphql/Stage';
import { OPPORTUNITY_TYPE_LOOKUP } from '@/app/graphql/OpportunityType';
import { LEAD_SOURCE_LOOKUP } from '@/app/graphql/LeadSource';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  opportunity_name: string | null;
  account_id: string | null;
  stage_id: string | null;
  opportunity_type_id: string | null;
  assigned_to: string | null;
};

type StateType = {
  dtoOpportunity: OpportunityDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  arrAccountLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrStageLookup: LookupDTO[];
  arrOpportunityTypeLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoOpportunity: OpportunityDTO;
  arrAccountLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrStageLookup: LookupDTO[];
  arrOpportunityTypeLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useOpportunityEntry = ({
  dtoOpportunity,
  arrAccountLookup,
  arrCurrencyLookup,
  arrStageLookup,
  arrOpportunityTypeLookup,
  arrLeadSourceLookup,
  arrAssignedToLookup
}: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    opportunity_name: null,
    account_id: null,
    stage_id: null,
    opportunity_type_id: null,
    assigned_to: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoOpportunity: dtoOpportunity,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    arrAccountLookup: arrAccountLookup,
    arrCurrencyLookup: arrCurrencyLookup,
    arrStageLookup: arrStageLookup,
    arrOpportunityTypeLookup: arrOpportunityTypeLookup,
    arrLeadSourceLookup: arrLeadSourceLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addOpportunity] = useMutation(ADD_OPPORTUNITY, {});

  const [updateOpportunity] = useMutation(UPDATE_OPPORTUNITY, {});

  const [getOpportunity] = useLazyQuery(GET_OPPORTUNITY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountLookup] = useLazyQuery(ACCOUNT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyLookup] = useLazyQuery(CURRENCY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getStageLookup] = useLazyQuery(STAGE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getOpportunityTypeLookup] = useLazyQuery(OPPORTUNITY_TYPE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLeadSourceLookup] = useLazyQuery(LEAD_SOURCE_LOOKUP, {
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
    let arrAccountLookup: LookupDTO[] = [];
    const { error, data } = await getAccountLookup();
    if (!error && data?.getAccountLookup) {
      arrAccountLookup = data.getAccountLookup;
    }
    setState({ arrAccountLookup: arrAccountLookup } as StateType);
  }, [getAccountLookup]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrCurrencyLookup: LookupDTO[] = [];
    const { error, data } = await getCurrencyLookup();
    if (!error && data?.getCurrencyLookup) {
      arrCurrencyLookup = data.getCurrencyLookup;
    }
    setState({ arrCurrencyLookup: arrCurrencyLookup } as StateType);
  }, [getCurrencyLookup]);

  const getData4 = useCallback(async (): Promise<void> => {
    let arrStageLookup: LookupDTO[] = [];
    const { error, data } = await getStageLookup();
    if (!error && data?.getStageLookup) {
      arrStageLookup = data.getStageLookup;
    }
    setState({ arrStageLookup: arrStageLookup } as StateType);
  }, [getStageLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrOpportunityTypeLookup: LookupDTO[] = [];
    const { error, data } = await getOpportunityTypeLookup();
    if (!error && data?.getOpportunityTypeLookup) {
      arrOpportunityTypeLookup = data.getOpportunityTypeLookup;
    }
    setState({ arrOpportunityTypeLookup: arrOpportunityTypeLookup } as StateType);
  }, [getOpportunityTypeLookup]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrLeadSourceLookup: LookupDTO[] = [];
    const { error, data } = await getLeadSourceLookup();
    if (!error && data?.getLeadSourceLookup) {
      arrLeadSourceLookup = data.getLeadSourceLookup;
    }
    setState({ arrLeadSourceLookup: arrLeadSourceLookup } as StateType);
  }, [getLeadSourceLookup]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoOpportunity: OpportunityDTO = OPPORTUNITY;
    const { error, data } = await getOpportunity({
      variables: {
        id: state.dtoOpportunity.id
      }
    });
    if (!error && data?.getOpportunity) {
      dtoOpportunity = data.getOpportunity;
    }
    setState({ dtoOpportunity: dtoOpportunity } as StateType);
  }, [getOpportunity, state.dtoOpportunity.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoOpportunity: {
        ...dtoOpportunity,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoOpportunity]);

  useEffect(() => {
    if (state.dtoOpportunity.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData3();
    getData4();
    getData5();
    getData6();
  }, [state.dtoOpportunity.id, getData, getData1, getData2, getData3, getData4, getData5, getData6, setDefaultValues]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'amount':
        case 'probability':
          setState({
            dtoOpportunity: {
              ...state.dtoOpportunity,
              [event.target.name]: Number(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoOpportunity: {
              ...state.dtoOpportunity,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoOpportunity]
  );

  const onAccountNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: {
          ...state.dtoOpportunity,
          account_id: (value as LookupDTO).id,
          account_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onCurrencyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: {
          ...state.dtoOpportunity,
          currency_id: (value as LookupDTO).id,
          currency_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onStageNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: {
          ...state.dtoOpportunity,
          stage_id: (value as LookupDTO).id,
          stage_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onOpportunityTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: {
          ...state.dtoOpportunity,
          opportunity_type_id: (value as LookupDTO).id,
          opportunity_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onLeadSourceNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: {
          ...state.dtoOpportunity,
          lead_source_id: (value as LookupDTO).id,
          lead_source_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOpportunity: { ...state.dtoOpportunity, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOpportunity]
  );

  const onExpectedCloseDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoOpportunity: { ...state.dtoOpportunity, expected_close_date: value } } as StateType);
    },
    [state.dtoOpportunity]
  );

  const validateOpportunityName = useCallback(async () => {
    if (state.dtoOpportunity.opportunity_name.trim() === '') {
      return 'Opportunity Name is required';
    } else {
      return null;
    }
  }, [state.dtoOpportunity.opportunity_name]);

  const onOpportunityNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const opportunity_name = await validateOpportunityName();
      setState({ errorMessages: { ...state.errorMessages, opportunity_name: opportunity_name } } as StateType);
    }, [validateOpportunityName, state.errorMessages]);

  const validateAccountName = useCallback(async () => {
    if (state.dtoOpportunity.account_id === 0) {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoOpportunity.account_id]);

  const onAccountNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_id = await validateAccountName();
      setState({ errorMessages: { ...state.errorMessages, account_id: account_id } } as StateType);
    }, [validateAccountName, state.errorMessages]);

  const validateStageName = useCallback(async () => {
    if (state.dtoOpportunity.stage_id === 0) {
      return 'Stage is required';
    } else {
      return null;
    }
  }, [state.dtoOpportunity.stage_id]);

  const onStageNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const stage_id = await validateStageName();
      setState({ errorMessages: { ...state.errorMessages, stage_id: stage_id } } as StateType);
    }, [validateStageName, state.errorMessages]);

  const validateOpportunityTypeName = useCallback(async () => {
    if (state.dtoOpportunity.opportunity_type_id === 0) {
      return 'Opportunity Type is required';
    } else {
      return null;
    }
  }, [state.dtoOpportunity.opportunity_type_id]);

  const onOpportunityTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const opportunity_type_id = await validateOpportunityTypeName();
      setState({ errorMessages: { ...state.errorMessages, opportunity_type_id: opportunity_type_id } } as StateType);
    }, [validateOpportunityTypeName, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoOpportunity.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoOpportunity.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.opportunity_name = await validateOpportunityName();
    if (errorMessages.opportunity_name) {
      isFormValid = false;
    }
    errorMessages.account_id = await validateAccountName();
    if (errorMessages.account_id) {
      isFormValid = false;
    }
    errorMessages.stage_id = await validateStageName();
    if (errorMessages.stage_id) {
      isFormValid = false;
    }
    errorMessages.opportunity_type_id = await validateOpportunityTypeName();
    if (errorMessages.opportunity_type_id) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateOpportunityName, validateAccountName, validateStageName, validateOpportunityTypeName, validateAssignedToName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoOpportunity.id === 0) {
            const { data } = await addOpportunity({
              variables: {
                opportunity_name: state.dtoOpportunity.opportunity_name,
                account_id: state.dtoOpportunity.account_id,
                currency_id: state.dtoOpportunity.currency_id,
                amount: state.dtoOpportunity.amount,
                expected_close_date: state.dtoOpportunity.expected_close_date,
                stage_id: state.dtoOpportunity.stage_id,
                opportunity_type_id: state.dtoOpportunity.opportunity_type_id,
                probability: state.dtoOpportunity.probability,
                lead_source_id: state.dtoOpportunity.lead_source_id,
                next_step: state.dtoOpportunity.next_step,
                description: state.dtoOpportunity.description,
                assigned_to: state.dtoOpportunity.assigned_to
              }
            });
            if (data?.addOpportunity) {
              toast.success('record saved successfully');
              router.push('/opportunities/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateOpportunity({
              variables: {
                id: state.dtoOpportunity.id,
                opportunity_name: state.dtoOpportunity.opportunity_name,
                account_id: state.dtoOpportunity.account_id,
                currency_id: state.dtoOpportunity.currency_id,
                amount: state.dtoOpportunity.amount,
                expected_close_date: state.dtoOpportunity.expected_close_date,
                stage_id: state.dtoOpportunity.stage_id,
                opportunity_type_id: state.dtoOpportunity.opportunity_type_id,
                probability: state.dtoOpportunity.probability,
                lead_source_id: state.dtoOpportunity.lead_source_id,
                next_step: state.dtoOpportunity.next_step,
                description: state.dtoOpportunity.description,
                assigned_to: state.dtoOpportunity.assigned_to
              }
            });
            if (data?.updateOpportunity) {
              toast.success('record saved successfully');
              router.push('/opportunities/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addOpportunity, state.dtoOpportunity, router, updateOpportunity]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunities/list');
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

  return {
    state,
    onInputChange,
    onAccountNameChange,
    onCurrencyNameChange,
    onStageNameChange,
    onOpportunityTypeNameChange,
    onExpectedCloseDateChange,
    onLeadSourceNameChange,
    onAssignedToNameChange,
    onOpportunityNameBlur,
    onAccountNameBlur,
    onStageNameBlur,
    onOpportunityTypeNameBlur,
    onAssignedToNameBlur,
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
    setClose6
  };
};

export default useOpportunityEntry;
