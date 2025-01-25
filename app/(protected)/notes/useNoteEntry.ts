import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import NoteDTO, { NOTE } from '@/app/types/NoteDTO';
import { ADD_NOTE, UPDATE_NOTE, GET_NOTE, UPLOAD_NOTE_FILE } from '@/app/graphql/Note';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { CONTACT_LOOKUP1 } from '@/app/graphql/Contact';
import { arrParentType } from '@/app/common/Configuration';
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
  dtoNote: NoteDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  arrParentTypeLookup: LookupDTO[];
  arrParentTypeNameLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoNote: NoteDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useNoteEntry = ({ dtoNote, arrContactLookup, arrAssignedToLookup }: Props) => {
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
    dtoNote: dtoNote,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    arrParentTypeLookup: arrParentType,
    arrParentTypeNameLookup: [],
    arrContactLookup: arrContactLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addNote] = useMutation(ADD_NOTE, {});

  const [updateNote] = useMutation(UPDATE_NOTE, {});

  const [getNote] = useLazyQuery(GET_NOTE, {
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

  const [singleUpload] = useMutation(UPLOAD_NOTE_FILE, {});

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
    let dtoNote: NoteDTO = NOTE;
    const { error, data } = await getNote({
      variables: {
        id: state.dtoNote.id
      }
    });
    if (!error && data?.getNote) {
      dtoNote = data.getNote;
    }
    setState({ dtoNote: dtoNote } as StateType);
  }, [getNote, state.dtoNote.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoNote: {
        ...dtoNote,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoNote]);

  useEffect(() => {
    if (state.dtoNote.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
  }, [state.dtoNote.id, getData, getData1, getData2, setDefaultValues]);

  useEffect(() => {
    switch (state.dtoNote.parent_type) {
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
          dtoNote: {
            ...state.dtoNote,
            parent_type_id: 0,
            parent_type_name: ''
          },
          arrParentTypeNameLookup: [] as LookupDTO[]
        } as StateType);
    }
  }, [state.dtoNote.parent_type, getData3, getData4, getData5, getData6]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoNote: {
          ...state.dtoNote,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoNote]
  );

  const onParentTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoNote: {
          ...state.dtoNote,
          parent_type: (value as LookupDTO).text,
          parent_type_id: 0,
          parent_type_name: ''
        }
      } as StateType);
    },
    [state.dtoNote]
  );

  const onParentTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoNote: {
          ...state.dtoNote,
          parent_type_id: (value as LookupDTO).id,
          parent_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoNote]
  );

  const onContactNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoNote: {
          ...state.dtoNote,
          contact_id: (value as LookupDTO).id,
          contact_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoNote]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoNote: { ...state.dtoNote, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoNote]
  );

  const validateSubject = useCallback(async () => {
    if (state.dtoNote.subject.trim() === '') {
      return 'Subject is required';
    } else {
      return null;
    }
  }, [state.dtoNote.subject]);

  const onSubjectBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const subject = await validateSubject();
      setState({ errorMessages: { ...state.errorMessages, subject: subject } } as StateType);
    }, [validateSubject, state.errorMessages]);

  // const validateParentType = useCallback(async () => {
  //   if (state.dtoNote.parent_type.trim() === '') {
  //     return 'Parent Type is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoNote.parent_type]);

  // const onParentTypeBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type = await validateParentType();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type: parent_type } } as StateType);
  //   }, [validateParentType, state.errorMessages]);

  // const validateParentTypeName = useCallback(async () => {
  //   if (state.dtoNote.parent_type_id === 0) {
  //     return 'Parent Type Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoNote.parent_type_id]);

  // const onParentTypeNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type_id = await validateParentTypeName();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type_id: parent_type_id } } as StateType);
  //   }, [validateParentTypeName, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoNote.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoNote.assigned_to]);

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
    errorMessages.subject = await validateSubject();
    if (errorMessages.subject) {
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

    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateSubject, validateAssignedToName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoNote.id === 0) {
            const { data } = await addNote({
              variables: {
                contact_id: state.dtoNote.contact_id,
                parent_type: state.dtoNote.parent_type,
                parent_type_id: state.dtoNote.parent_type_id,
                subject: state.dtoNote.subject,
                note: state.dtoNote.note,
                file_name: state.dtoNote.file_name,
                assigned_to: state.dtoNote.assigned_to
              }
            });
            if (data?.addNote) {
              toast.success('record saved successfully');
              router.push('/notes/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateNote({
              variables: {
                id: state.dtoNote.id,
                contact_id: state.dtoNote.contact_id,
                parent_type: state.dtoNote.parent_type,
                parent_type_id: state.dtoNote.parent_type_id,
                subject: state.dtoNote.subject,
                note: state.dtoNote.note,
                file_name: state.dtoNote.file_name,
                assigned_to: state.dtoNote.assigned_to
              }
            });
            if (data?.updateNote) {
              toast.success('record saved successfully');
              router.push('/notes/list');
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
    [validateForm, addNote, state.dtoNote, router, updateNote]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/notes/list');
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

  // const onUploadClick = useCallback(async () => {
  //   document.getElementById('user_image')!.click();
  // }, []);

  const UploadFile = useCallback(async () => {
    const files = (document.getElementById('note_file') as any)!.files;
    console.log(files);
    if (files.length == 0) {
      return;
    }
    const { data } = await singleUpload({
      variables: {
        files: files
      }
    });
    if (data?.singleUpload) {
      setState({ dtoNote: { ...state.dtoNote, file_name: data.singleUpload[0].filename } } as StateType);
    }
  }, [singleUpload, state.dtoNote]);

  return {
    state,
    onInputChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onContactNameChange,
    onAssignedToNameChange,
    onSubjectBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
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
    UploadFile
  };
};

export default useNoteEntry;
