import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import MeetingDTO, { MEETING } from '@/app/types/MeetingDTO';
import { ADD_MEETING, UPDATE_MEETING, GET_MEETING } from '@/app/graphql/Meeting';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';
import { arrParentType, arrRelatedTo, arrMeetingStatus, arrReminder, getLocalTime, capitalizeWords } from '@/app/common/Configuration';
import * as gMessageConstants from '../../constants/messages-constants';
// import dayjs from 'dayjs';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { validateDateTime } from '@/app/common/validationDate';

type ErrorMessageType = {
  subject: string | null;
  start_date_time: string | null;
  end_date_time: string | null;
  location_id: string | null;
  status: string | null;
  parent_type: string | null;
  parent_type_id: string | null;
  reminder: string | null;
  assigned_to: string | null;
};

type StateType = {
  dtoMeeting: MeetingDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  arrMeetingStausLookup: LookupDTO[];
  arrParentTypeLookup: LookupDTO[];
  arrParentTypeNameLookup: LookupDTO[];
  arrLocationLookup: LookupDTO[];
  arrReminderLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoMeeting: MeetingDTO;
  arrLocationLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useMeetingEntry = ({ dtoMeeting, arrLocationLookup, arrAssignedToLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    subject: null,
    start_date_time: null,
    end_date_time: null,
    location_id: null,
    status: null,
    parent_type: null,
    parent_type_id: null,
    reminder: null,
    assigned_to: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoMeeting: dtoMeeting,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    arrMeetingStausLookup: arrMeetingStatus,
    arrParentTypeLookup: arrParentType,
    arrParentTypeNameLookup: arrRelatedTo,
    arrLocationLookup: arrLocationLookup,
    arrReminderLookup: arrReminder,
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addMeeting] = useMutation(ADD_MEETING, {});

  const [updateMeeting] = useMutation(UPDATE_MEETING, {});

  const [getMeeting] = useLazyQuery(GET_MEETING, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLocationLookup] = useLazyQuery(LOCATION_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });


  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrMeetingStausLookup.length > 0 &&
      !state.dtoMeeting.status
    ) {
      const firstItem = state.arrMeetingStausLookup[0];
      setState({
        ...state,
        dtoMeeting: {
          ...state.dtoMeeting,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrMeetingStausLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
    try {
      let arrAssignedToLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup();
      if (!error && data?.getUserLookup) {
        arrAssignedToLookup = data.getUserLookup;
      }
      setState({ arrAssignedToLookup: arrAssignedToLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  const getData2 = useCallback(async (): Promise<void> => {
    try {
      let arrLocationLookup: LookupDTO[] = [];
      const { error, data } = await getLocationLookup();
      if (!error && data?.getLocationLookup) {
        arrLocationLookup = data.getLocationLookup;
      }
      setState({ arrLocationLookup: arrLocationLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getLocationLookup]);

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoMeeting: MeetingDTO = MEETING;
      const { error, data } = await getMeeting({
        variables: {
          id: state.dtoMeeting.id
        }
      });
      if (!error && data?.getMeeting) {
        dtoMeeting = data.getMeeting;
        dtoMeeting = {
          ...dtoMeeting,
          start_date_time: getLocalTime(dtoMeeting.start_date_time),
          end_date_time: getLocalTime(dtoMeeting.end_date_time)
        };
      }
      setState({ dtoMeeting: dtoMeeting } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getMeeting, state.dtoMeeting.id]);

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoMeeting: {
        ...dtoMeeting,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, dtoMeeting]);

  useEffect(() => {
    if (state.dtoMeeting.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData2();
  }, []);

  // useEffect(() => {
  //   setState({
  //     dtoMeeting: {
  //       ...state.dtoMeeting,
  //       parent_type_id: 0,
  //       parent_type_name: ''
  //     },
  //     arrParentTypeNameLookup: [] as LookupDTO[]
  //   } as StateType);
  // }, [state.dtoMeeting.parent_type_name]);


  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoMeeting
    ]
  );

  const onMeetingStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onParentTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          parent_type: (value as LookupDTO).text,
          parent_type_id: 0,
          parent_type_name: ''
        }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onParentTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          parent_type_id: (value as LookupDTO).id,
          parent_type_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onLocationNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          location_id: (value as LookupDTO).id,
          location_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onReminderChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: {
          ...state.dtoMeeting,
          reminder: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoMeeting: { ...state.dtoMeeting, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoMeeting]
  );

  const onStartDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoMeeting: { ...state.dtoMeeting, start_date_time: value } } as StateType);
    },
    [state.dtoMeeting]
  );

  const onEndDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoMeeting: { ...state.dtoMeeting, end_date_time: value } } as StateType);
    },
    [state.dtoMeeting]
  );

  const validateSubject = useCallback(async () => {
    if (state.dtoMeeting.subject.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoMeeting.subject]);

  const onSubjectBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const subject = await validateSubject();
    setState({ errorMessages: { ...state.errorMessages, subject: subject } } as StateType);
  }, [validateSubject, state.errorMessages]);

  // const validateStartDateTime = useCallback(async () => {
  //   if (state.dtoMeeting.start_date_time == null || dayjs(state.dtoMeeting.start_date_time).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoMeeting.start_date_time]);
  const validateStartDateTime = useCallback(() => {
    return validateDateTime({
      startDate: state.dtoMeeting.start_date_time,
      endDate: state.dtoMeeting.start_date_time,
      type: 'start',
      label: 'Start Time',
      allowPast: false,
    });
  }, [state.dtoMeeting.start_date_time, state.dtoMeeting.start_date_time]);

  const onStartDateTimeBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const start_date_time = await validateStartDateTime();
    setState({ errorMessages: { ...state.errorMessages, start_date_time: start_date_time } } as StateType);
  }, [validateStartDateTime, state.errorMessages]);

  // const validateEndDateTime = useCallback(async () => {
  //   if (state.dtoMeeting.end_date_time == null || dayjs(state.dtoMeeting.end_date_time).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoMeeting.end_date_time]);

  const validateEndDateTime = useCallback(() => {
    return validateDateTime({
      startDate: state.dtoMeeting.end_date_time,
      endDate: state.dtoMeeting.end_date_time,
      type: 'end',
      label: 'End Time',
      allowPast: false,
    });
  }, [state.dtoMeeting.end_date_time, state.dtoMeeting.end_date_time]);

  const onEndDateTimeBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const end_date_time = await validateEndDateTime();
    setState({ errorMessages: { ...state.errorMessages, end_date_time: end_date_time } } as StateType);
  }, [validateEndDateTime, state.errorMessages]);

  const validateLocationName = useCallback(async () => {
    if (state.dtoMeeting.location_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoMeeting.location_id]);

  const onLocationNameBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const location_id = await validateLocationName();
    setState({ errorMessages: { ...state.errorMessages, location_id: location_id } } as StateType);
  }, [validateLocationName, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoMeeting.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoMeeting.status]);

  const onStatusBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  // const validateParentType = useCallback(async () => {
  //   if (state.dtoMeeting.parent_type.trim() === '') {
  //     return 'Parent Type is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoMeeting.parent_type]);

  // const onParentTypeBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type = await validateParentType();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type: parent_type } } as StateType);
  //   }, [validateParentType, state.errorMessages]);

  // const validateParentTypeName = useCallback(async () => {
  //   if (state.dtoMeeting.parent_type_id === 0) {
  //     return 'Parent Type Name is required';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoMeeting.parent_type_id]);

  // const onParentTypeNameBlur = useCallback(async () =>
  //   //event: React.FocusEvent<HTMLInputElement>
  //   {
  //     const parent_type_id = await validateParentTypeName();
  //     setState({ errorMessages: { ...state.errorMessages, parent_type_id: parent_type_id } } as StateType);
  //   }, [validateParentTypeName, state.errorMessages]);

  const validateReminder = useCallback(async () => {
    if (state.dtoMeeting.reminder.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoMeeting.reminder]);

  const onReminderBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const reminder = await validateReminder();
    setState({ errorMessages: { ...state.errorMessages, reminder: reminder } } as StateType);
  }, [validateReminder, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoMeeting.assigned_to === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoMeeting.assigned_to]);

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
    errorMessages.start_date_time = await validateStartDateTime();
    if (errorMessages.start_date_time) {
      isFormValid = false;
    }
    errorMessages.end_date_time = await validateEndDateTime();
    if (errorMessages.end_date_time) {
      isFormValid = false;
    }
    errorMessages.location_id = await validateLocationName();
    if (errorMessages.location_id) {
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
    errorMessages.reminder = await validateReminder();
    if (errorMessages.reminder) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateSubject, validateStartDateTime, validateEndDateTime, validateStatus, validateReminder, validateAssignedToName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoMeeting.id === 0) {
            const { data } = await addMeeting({
              variables: {
                subject: state.dtoMeeting.subject,
                start_date_time: state.dtoMeeting.start_date_time,
                end_date_time: state.dtoMeeting.end_date_time,
                location_id: state.dtoMeeting.location_id,
                reminder: state.dtoMeeting.reminder,
                description: state.dtoMeeting.description,
                parent_type: state.dtoMeeting.parent_type,
                parent_type_id: state.dtoMeeting.parent_type_id,
                assigned_to: state.dtoMeeting.assigned_to,
                status: state.dtoMeeting.status
              }
            });
            if (data?.addMeeting) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/meetings/list');
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          } else {
            const { data } = await updateMeeting({
              variables: {
                id: state.dtoMeeting.id,
                subject: state.dtoMeeting.subject,
                start_date_time: state.dtoMeeting.start_date_time,
                end_date_time: state.dtoMeeting.end_date_time,
                location_id: state.dtoMeeting.location_id,
                reminder: state.dtoMeeting.reminder,
                description: state.dtoMeeting.description,
                parent_type: state.dtoMeeting.parent_type,
                parent_type_id: state.dtoMeeting.parent_type_id,
                assigned_to: state.dtoMeeting.assigned_to,
                status: state.dtoMeeting.status
              }
            });
            if (data?.updateMeeting) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/meetings/list');
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_FAILED, 'error');
            }
          }
        }
      } catch {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addMeeting, state.dtoMeeting, router, updateMeeting]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/meetings/list');
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
    onMeetingStatusChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onLocationNameChange,
    onReminderChange,
    onAssignedToNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onSubjectBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onLocationNameBlur,
    onStatusBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
    onReminderBlur,
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

export default useMeetingEntry;
