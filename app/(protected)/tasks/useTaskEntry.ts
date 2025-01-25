import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import TaskDTO, { TASK } from '@/app/types/TaskDTO';
import { ADD_TASK, UPDATE_TASK, GET_TASK } from '@/app/graphql/Task';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { CONTACT_LOOKUP1 } from '@/app/graphql/Contact';
import { arrParentType, arrTaskStatus } from '@/app/common/Configuration';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { OPPORTUNITY_LOOKUP } from '@/app/graphql/Opportunity';
import { LEAD_LOOKUP } from '@/app/graphql/Lead';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  subject: string | null;
  status: string | null;
  parent_type: string | null;
  parent_type_id: string | null;
  priority: string | null;
  assigned_to: string | null;
};

type StateType = {
  dtoTask: TaskDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  arrTaskStausLookup: LookupDTO[];
  arrParentTypeLookup: LookupDTO[];
  arrParentTypeNameLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrPriorityLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoTask: TaskDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useTaskEntry = ({ dtoTask, arrContactLookup, arrAssignedToLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    subject: null,
    status: null,
    parent_type: null,
    parent_type_id: null,
    priority: null,
    assigned_to: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoTask: dtoTask,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    arrTaskStausLookup: arrTaskStatus,
    arrParentTypeLookup: arrParentType,
    arrParentTypeNameLookup: [],
    arrContactLookup: arrContactLookup,
    arrPriorityLookup: [{ text: 'Low' }, { text: 'Medium' }, { text: 'High' }],
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addTask] = useMutation(ADD_TASK, {});

  const [updateTask] = useMutation(UPDATE_TASK, {});

  const [getTask] = useLazyQuery(GET_TASK, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getContactLookup1] = useLazyQuery(CONTACT_LOOKUP1, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountLookup] = useLazyQuery(ACCOUNT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getOpportunityLookup] = useLazyQuery(OPPORTUNITY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLeadLookup] = useLazyQuery(LEAD_LOOKUP, {
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
    let arrContactLookup: LookupDTO[] = [];
    const { error, data } = await getContactLookup1();
    if (!error && data?.getContactLookup1) {
      arrContactLookup = data.getContactLookup1;
    }
    setState({ arrContactLookup: arrContactLookup } as StateType);
  }, [getContactLookup1]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrParentTypeNameLookup: LookupDTO[] = [];
    const { error, data } = await getAccountLookup();
    if (!error && data?.getAccountLookup) {
      arrParentTypeNameLookup = data.getAccountLookup;
    }
    setState({ arrParentTypeNameLookup: arrParentTypeNameLookup } as StateType);
  }, [getAccountLookup]);

  const getData4 = useCallback(async (): Promise<void> => {
    setState({ arrParentTypeNameLookup: state.arrContactLookup } as StateType);
  }, [state.arrContactLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrParentTypeNameLookup: LookupDTO[] = [];
    const { error, data } = await getOpportunityLookup();
    if (!error && data?.getOpportunityLookup) {
      arrParentTypeNameLookup = data.getOpportunityLookup;
    }
    setState({ arrParentTypeNameLookup: arrParentTypeNameLookup } as StateType);
  }, [getOpportunityLookup]);

  const getData6 = useCallback(async (): Promise<void> => {
    let arrParentTypeNameLookup: LookupDTO[] = [];
    const { error, data } = await getLeadLookup();
    if (!error && data?.getLeadLookup) {
      arrParentTypeNameLookup = data.getLeadLookup;
    }
    setState({ arrParentTypeNameLookup: arrParentTypeNameLookup } as StateType);
  }, [getLeadLookup]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoTask: TaskDTO = TASK;
    const { error, data } = await getTask({
      variables: {
        id: state.dtoTask.id
      }
    });
    if (!error && data?.getTask) {
      dtoTask = data.getTask;
    }
    setState({ dtoTask: dtoTask } as StateType);
  }, [getTask, state.dtoTask.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoTask: {
        ...dtoTask,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoTask]);

  useEffect(() => {
    if (state.dtoTask.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
  }, [state.dtoTask.id, getData, getData1, getData2, setDefaultValues]);

  useEffect(() => {
    switch (state.dtoTask.parent_type) {
      case 'Account':
        getData3();
        break;
      case 'Contact':
        getData4();
        break;
      case 'Opportunity':
        getData5();
        break;
      case 'Lead':
        getData6();
        break;
      default:
        setState({
          dtoTask: {
            ...state.dtoTask,
            parent_type_id: 0,
            parent_type_name: ''
          },
          arrParentTypeNameLookup: [] as LookupDTO[]
        } as StateType);
    }
  }, [state.dtoTask.parent_type]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onTaskStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onParentTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          parent_type: (value as LookupDTO).text,
          parent_type_id: 0,
          parent_type_name: ''
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onParentTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          parent_type_id: (value as LookupDTO).id,
          parent_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onContactNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          contact_id: (value as LookupDTO).id,
          contact_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onPriorityChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: {
          ...state.dtoTask,
          priority: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTask: { ...state.dtoTask, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoTask]
  );

  const onStartDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoTask: { ...state.dtoTask, start_date: value } } as StateType);
    },
    [state.dtoTask]
  );

  const onDueDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoTask: { ...state.dtoTask, due_date: value } } as StateType);
    },
    [state.dtoTask]
  );

  const validateSubject = useCallback(async () => {
    if (state.dtoTask.subject.trim() === '') {
      return 'Subject is required';
    } else {
      return null;
    }
  }, [state.dtoTask.subject]);

  const onSubjectBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const subject = await validateSubject();
      setState({ errorMessages: { ...state.errorMessages, subject: subject } } as StateType);
    }, [validateSubject, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoTask.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoTask.status]);

  const onStatusBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

  // const validateParentType = useCallback(async () => {
  //   if (state.dtoTask.parent_type.trim() === '') {
  //     return 'Parent Type is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoTask.parent_type]);

  // const onParentTypeBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type = await validateParentType();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type: parent_type } } as StateType);
  //   }, [validateParentType, state.errorMessages]);

  // const validateParentTypeName = useCallback(async () => {
  //   if (state.dtoTask.parent_type_id === 0) {
  //     return 'Parent Type Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoTask.parent_type_id]);

  // const onParentTypeNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type_id = await validateParentTypeName();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type_id: parent_type_id } } as StateType);
  //   }, [validateParentTypeName, state.errorMessages]);

  const validatePriority = useCallback(async () => {
    if (state.dtoTask.priority.trim() === '') {
      return 'Priority is required';
    } else {
      return null;
    }
  }, [state.dtoTask.priority]);

  const onPriorityBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const priority = await validatePriority();
      setState({ errorMessages: { ...state.errorMessages, priority: priority } } as StateType);
    }, [validatePriority, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoTask.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoTask.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.subject = await validateSubject();
    if (errorMessages.subject) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    // errorMessages.parent_type = await validateParentType();
    // if (errorMessages.parent_type) {
    //   isFormValid = false;
    // }
    // errorMessages.parent_type_id = await validateParentTypeName();
    // if (errorMessages.parent_type_id) {
    //   isFormValid = false;
    // }
    errorMessages.priority = await validatePriority();
    if (errorMessages.priority) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateSubject, validateStatus, validatePriority, validateAssignedToName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoTask.id === 0) {
            const { data } = await addTask({
              variables: {
                subject: state.dtoTask.subject,
                status: state.dtoTask.status,
                start_date: state.dtoTask.start_date,
                parent_type: state.dtoTask.parent_type,
                parent_type_id: state.dtoTask.parent_type_id,
                parent_type_name: state.dtoTask.parent_type_name,
                due_date: state.dtoTask.due_date,
                contact_id: state.dtoTask.contact_id,
                contact_name: state.dtoTask.contact_name,
                priority: state.dtoTask.priority,
                description: state.dtoTask.description,
                assigned_to: state.dtoTask.assigned_to
              }
            });
            if (data?.addTask) {
              toast.success('record saved successfully');
              router.push('/tasks/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateTask({
              variables: {
                id: state.dtoTask.id,
                subject: state.dtoTask.subject,
                status: state.dtoTask.status,
                start_date: state.dtoTask.start_date,
                parent_type: state.dtoTask.parent_type,
                parent_type_id: state.dtoTask.parent_type_id,
                parent_type_name: state.dtoTask.parent_type_name,
                due_date: state.dtoTask.due_date,
                contact_id: state.dtoTask.contact_id,
                contact_name: state.dtoTask.contact_name,
                priority: state.dtoTask.priority,
                description: state.dtoTask.description,
                assigned_to: state.dtoTask.assigned_to
              }
            });
            if (data?.updateTask) {
              toast.success('record saved successfully');
              router.push('/tasks/list');
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
    [validateForm, addTask, state.dtoTask, router, updateTask]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/tasks/list');
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
    onTaskStatusChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onContactNameChange,
    onPriorityChange,
    onAssignedToNameChange,
    onStartDateChange,
    onDueDateChange,
    onSubjectBlur,
    onStatusBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
    onPriorityBlur,
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

export default useTaskEntry;
