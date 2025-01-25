import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CaseDTO, { CASE } from '@/app/types/CaseDTO';
import { ADD_CASE, UPDATE_CASE, GET_CASE } from '@/app/graphql/Case';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import accounting from 'accounting';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { CASE_TYPE_LOOKUP } from '@/app/graphql/CaseType';
import { arrCasePriority, arrCaseStatus, arrCaseState } from '@/app/common/Configuration';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  case_number: string | null;
  case_description: string | null;
  account_id: string | null;
  state_id: string | null;
  case_type_id: string | null;
  assigned_to: string | null;
  priority: string | null;
  status: string | null;
  state: string | null;
};

type StateType = {
  dtoCase: CaseDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  arrAccountLookup: LookupDTO[];
  arrCaseStatusLookup: LookupDTO[];
  arrCasePriorityLookup: LookupDTO[];
  arrCaseStateLookup: LookupDTO[];
  arrCaseTypeLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCase: CaseDTO;
  arrAccountLookup: LookupDTO[];
  arrCaseStatusLookup: LookupDTO[];
  arrCasePriorityLookup: LookupDTO[];
  arrCaseStateLookup: LookupDTO[];
  arrCaseTypeLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useCaseEntry = ({ dtoCase, arrAccountLookup, arrCaseTypeLookup, arrAssignedToLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    case_number: null,
    case_description: null,
    account_id: null,
    state_id: null,
    case_type_id: null,
    assigned_to: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCase: dtoCase,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    arrCaseStatusLookup: arrCaseStatus,
    arrCasePriorityLookup: arrCasePriority,
    arrCaseStateLookup: arrCaseState,
    arrAccountLookup: arrAccountLookup,
    arrCaseTypeLookup: arrCaseTypeLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addCase] = useMutation(ADD_CASE, {});

  const [updateCase] = useMutation(UPDATE_CASE, {});

  const [getCase] = useLazyQuery(GET_CASE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountLookup] = useLazyQuery(ACCOUNT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCaseTypeLookup] = useLazyQuery(CASE_TYPE_LOOKUP, {
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
    let arrCaseTypeLookup: LookupDTO[] = [];
    const { error, data } = await getCaseTypeLookup();
    if (!error && data?.getCaseTypeLookup) {
      arrCaseTypeLookup = data.getCaseTypeLookup;
    }
    setState({ arrCaseTypeLookup: arrCaseTypeLookup } as StateType);
  }, [getCaseTypeLookup]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoCase: CaseDTO = CASE;
    const { error, data } = await getCase({
      variables: {
        id: state.dtoCase.id
      }
    });
    if (!error && data?.getCase) {
      dtoCase = data.getCase;
    }
    setState({ dtoCase: dtoCase } as StateType);
  }, [getCase, state.dtoCase.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoCase: {
        ...dtoCase,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoCase]);

  useEffect(() => {
    if (state.dtoCase.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
    getData3();
  }, [state.dtoCase.id, getData, getData1, getData2, getData3, setDefaultValues]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'amount':
        case 'probability':
          setState({
            dtoCase: {
              ...state.dtoCase,
              [event.target.name]: Number(accounting.toFixed(parseFloat(event.target.value), 2))
            }
          } as StateType);
          break;
        default:
          setState({
            dtoCase: {
              ...state.dtoCase,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoCase]
  );

  const onAccountNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: {
          ...state.dtoCase,
          account_id: (value as LookupDTO).id,
          account_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCase]
  );

  const onPriorityChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: {
          ...state.dtoCase,
          priority: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCase]
  );
  const onStateChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: {
          ...state.dtoCase,
          state: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCase]
  );
  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: {
          ...state.dtoCase,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCase]
  );

  const onCaseTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: {
          ...state.dtoCase,
          case_type_id: (value as LookupDTO).id,
          case_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCase]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCase: { ...state.dtoCase, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoCase]
  );

  const validateCaseNumber = useCallback(async () => {
    if (state.dtoCase.case_number.trim() === '') {
      return 'Case Number is required';
    } else {
      return null;
    }
  }, [state.dtoCase.case_number]);

  const validateDescription = useCallback(async () => {
    if (state.dtoCase.case_description.trim() === '') {
      return 'Case description is required';
    } else {
      return null;
    }
  }, [state.dtoCase.case_description]);

  const validateAccountName = useCallback(async () => {
    if (state.dtoCase.account_id === 0) {
      return 'Account Name is required';
    } else {
      return null;
    }
  }, [state.dtoCase.account_id]);

  const onAccountNameBlur = useCallback(async () => {
    const account_id = await validateAccountName();
    setState({ errorMessages: { ...state.errorMessages, account_id: account_id } } as StateType);
  }, [validateAccountName, state.errorMessages]);

  const validateState = useCallback(async () => {
    if (state.dtoCase.state === '') {
      return 'State is required';
    } else {
      return null;
    }
  }, [state.dtoCase.state]);

  const onStateBlur = useCallback(async () => {
    const state1 = await validateState();
    setState({ errorMessages: { ...state.errorMessages, state: state1 } } as StateType);
  }, [validateState, state.errorMessages]);

  const validatePriority = useCallback(async () => {
    if (state.dtoCase.priority === '') {
      return 'Priority is required';
    } else {
      return null;
    }
  }, [state.dtoCase.priority]);

  const onPriorityBlur = useCallback(async () => {
    const priority = await validatePriority();
    setState({ errorMessages: { ...state.errorMessages, state: priority } } as StateType);
  }, [validatePriority, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoCase.status === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoCase.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, state: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateCaseTypeName = useCallback(async () => {
    if (state.dtoCase.case_type_id === 0) {
      return 'Case Type is required';
    } else {
      return null;
    }
  }, [state.dtoCase.case_type_id]);

  const onCaseTypeNameBlur = useCallback(async () => {
    const case_type_id = await validateCaseTypeName();
    setState({ errorMessages: { ...state.errorMessages, case_type_id: case_type_id } } as StateType);
  }, [validateCaseTypeName, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoCase.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoCase.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () => {
    const assigned_to = await validateAssignedToName();
    setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
  }, [validateAssignedToName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.case_number = await validateCaseNumber();
    if (errorMessages.case_number) {
      isFormValid = false;
    }
    errorMessages.case_description = await validateDescription();
    if (errorMessages.case_description) {
      isFormValid = false;
    }
    errorMessages.account_id = await validateAccountName();
    if (errorMessages.account_id) {
      isFormValid = false;
    }

    errorMessages.case_type_id = await validateCaseTypeName();
    if (errorMessages.case_type_id) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateDescription,
    validateAccountName,
    validatePriority,
    validateState,
    validateStatus,
    validateCaseTypeName,
    validateAssignedToName
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoCase.id === 0) {
            const { data } = await addCase({
              variables: {
                case_number: state.dtoCase.case_number,
                case_description: state.dtoCase.case_description,
                account_id: state.dtoCase.account_id,
                priority: state.dtoCase.priority,
                state: state.dtoCase.state,
                status: state.dtoCase.status,
                subject: state.dtoCase.subject,
                resolution: state.dtoCase.resolution,
                case_type_id: state.dtoCase.case_type_id,
                assigned_to: state.dtoCase.assigned_to
              }
            });
            if (data?.addCase) {
              toast.success('record saved successfully');
              router.push('/cases/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateCase({
              variables: {
                id: state.dtoCase.id,
                case_number: state.dtoCase.case_number,
                case_description: state.dtoCase.case_description,
                account_id: state.dtoCase.account_id,
                priority: state.dtoCase.priority,
                state: state.dtoCase.state,
                status: state.dtoCase.status,
                subject: state.dtoCase.subject,
                resolution: state.dtoCase.resolution,
                case_type_id: state.dtoCase.case_type_id,
                assigned_to: state.dtoCase.assigned_to
              }
            });
            if (data?.updateCase) {
              toast.success('record saved successfully');
              router.push('/cases/list');
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
    [validateForm, addCase, state.dtoCase, router, updateCase]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/cases/list');
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
    onStateChange,
    onCaseTypeNameChange,
    onAssignedToNameChange,
    onPriorityChange,
    onStatusChange,
    onAccountNameBlur,
    onStateBlur,
    onPriorityBlur,
    onStatusBlur,
    onCaseTypeNameBlur,
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

export default useCaseEntry;
