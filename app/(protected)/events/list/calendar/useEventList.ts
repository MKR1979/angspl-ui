import { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import EventCalendarDTO from '@/app/types/EventCalendarDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { ADD_EVENT, DELETE_EVENT, EVENT_LIST_ALL, GET_EVENT, UPDATE_EVENT } from '@/app/graphql/Event';
import { ContextMenuType, getLocalTime } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import EventDTO, { EVENT } from '@/app/types/EventDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import { CURRENCY_LOOKUP, GET_CURRENCY } from '@/app/graphql/Currency';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';
import UserDTO, { USER } from '@/app/types/UserDTO';
import dayjs from 'dayjs';
import moment from 'moment';
import { momentLocalizer } from './moment';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

type visibleDialog1Type = { id: number; visibility: boolean };
type ErrorMessageType = {
  event_name: string | null;
  start_date_time: string | null;
  end_date_time: string | null;
  currency_id: string | null;
  location_id: string | null;
  email_template_id: string | null;
  assigned_to: string | null;
};
type StateType = {
  isLoading: boolean;
  arrEventCalendarDTO: EventCalendarDTO[];
  visibleDialog1: visibleDialog1Type;
  dtoEvent: EventDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrCurrencyLookup: LookupDTO[];
  arrLocationLookup: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
  openPopup: boolean;
  contextMenu: ContextMenuType | null;
  selectedId: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  arrEventCalendarDTO: EventCalendarDTO[];
};
const useEventList = ({ arrEventCalendarDTO }: Props) => {
  const router = useRouter();
  const localizer = momentLocalizer(moment);
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    event_name: null,
    start_date_time: null,
    end_date_time: null,
    currency_id: null,
    location_id: null,
    email_template_id: null,
    assigned_to: null
  } as ErrorMessageType);
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    arrEventCalendarDTO: arrEventCalendarDTO,
    visibleDialog: false,
    visibleDialog1: { id: 0, visibility: false },
    dtoEvent: EVENT,
    open1: false,
    open2: false,
    open3: false,
    arrCurrencyLookup: [],
    arrLocationLookup: [],
    arrEmailTemplateLookup: [],
    arrAssignedToLookup: [],
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES },
    openPopup: false,
    contextMenu: null,
    selectedId: 0,
    breadcrumbsItems: [{ label: 'Events' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getEventListAll] = useLazyQuery(EVENT_LIST_ALL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, {});

  const getData = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrEventCalendarDTO: EventCalendarDTO[] = [];
    const { error, data } = await getEventListAll();
    if (!error && data?.getEventListAll) {
      arrEventCalendarDTO = data.getEventListAll.map((item: EventCalendarDTO) => {
        return { ...item, id: parseInt(item.id.toString()), start: getLocalTime(item.start), end: getLocalTime(item.end) };
      });
    }
    setState({
      arrEventCalendarDTO: arrEventCalendarDTO,
      isLoading: false
    } as StateType);
  }, [getEventListAll]);

  useEffect(() => {
    getData();
  }, []);

  const toggleDialog1 = useCallback(
    async (id: number): Promise<void> => {
      setState({ visibleDialog1: { id: id, visibility: !state.visibleDialog1.visibility } } as StateType);
    },
    [state.visibleDialog1.visibility]
  );

  const DeleteSingle = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const params = [Number(state.visibleDialog1.id)];
        const { data } = await deleteEvent({
          variables: {
            ids: params
          }
        });
        await toggleDialog1(0);
        if (data?.deleteEvent) {
          getData();
          toast.success('record(s) deleted successfully');
        } else {
          toast.error('Error occured while deleting record(s)');
        }
      } catch {
        toast.error('Error occured while deleting record(s)');
      }
    },
    [deleteEvent, getData, state.visibleDialog1.id, toggleDialog1]
  );

  const onDeleteSingleClose = useCallback(async () => {
    toggleDialog1(0);
  }, [toggleDialog1]);

  const onGridViewClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/events/list');
    },
    [router]
  );

  const [addEvent] = useMutation(ADD_EVENT, {});

  const [updateEvent] = useMutation(UPDATE_EVENT, {});

  const [getEvent] = useLazyQuery(GET_EVENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrency] = useLazyQuery(GET_CURRENCY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyLookup] = useLazyQuery(CURRENCY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getLocationLookup] = useLazyQuery(LOCATION_LOOKUP, {
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

  const getData3 = useCallback(async (): Promise<void> => {
    let arrCurrencyLookup: LookupDTO[] = [];
    const { error, data } = await getCurrencyLookup();
    if (!error && data?.getCurrencyLookup) {
      arrCurrencyLookup = data.getCurrencyLookup;
    }
    setState({ arrCurrencyLookup: arrCurrencyLookup } as StateType);
  }, [getCurrencyLookup]);

  const getCurrencyData = useCallback(
    async (currency_id: number): Promise<void> => {
      let dtoCurrency: CurrencyDTO = CURRENCY;
      const { error, data } = await getCurrency({
        variables: {
          id: currency_id
        }
      });
      if (!error && data?.getCurrency) {
        dtoCurrency = data.getCurrency;
      }
      setState({ dtoEvent: { ...state.dtoEvent, currency_symbol: dtoCurrency.currency_symbol } } as StateType);
    },
    [getCurrency, state.dtoEvent]
  );

  const getMyProfile = useCallback(async (): Promise<UserDTO> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    return dtoUser;
  }, [getUserMyProfile]);

  const getData2 = useCallback(
    async (event_id: number): Promise<EventDTO> => {
      let dtoEvent: EventDTO = EVENT;
      const { error, data } = await getEvent({
        variables: {
          id: event_id
        }
      });
      if (!error && data?.getEvent) {
        dtoEvent = data.getEvent;
        dtoEvent = {
          ...dtoEvent,
          start_date_time: getLocalTime(dtoEvent.start_date_time),
          end_date_time: getLocalTime(dtoEvent.end_date_time)
        };
      }
      return dtoEvent;
    },
    [getEvent]
  );

  const setDefaultValues = useCallback(async () => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoEvent: {
        ...state.dtoEvent,
        assigned_to: dtoUser.id,
        assigned_to_user_name: dtoUser.user_name
      }
    } as StateType);
  }, [getMyProfile, state.dtoEvent]);

  useEffect(() => {
    if (state.dtoEvent.id > 0) {
      getData2(state.dtoEvent.id);
    } else {
      setDefaultValues();
    }
    getData1();
    getData3();
    getData5();
  }, []);

  const onClosePopup = useCallback(async (): Promise<void> => {
    setState({
      openPopup: false
    } as StateType);
  }, []);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'budget':
          setState({
            dtoEvent: {
              ...state.dtoEvent,
              [event.target.name]: Number(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoEvent: {
              ...state.dtoEvent,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoEvent]
  );

  const onCurrencyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEvent: {
          ...state.dtoEvent,
          currency_id: (value as LookupDTO).id,
          currency_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEvent]
  );
  const onLocationNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEvent: {
          ...state.dtoEvent,
          location_id: (value as LookupDTO).id,
          location_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEvent]
  );
  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEvent: { ...state.dtoEvent, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoEvent]
  );

  const onStartDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoEvent: { ...state.dtoEvent, start_date_time: value } } as StateType);
    },
    [state.dtoEvent]
  );

  const onEndDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoEvent: { ...state.dtoEvent, end_date_time: value } } as StateType);
    },
    [state.dtoEvent]
  );

  const validateEventName = useCallback(async () => {
    if (state.dtoEvent.event_name.trim() === '') {
      return 'Event Name is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.event_name]);

  const onEventNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const event_name = await validateEventName();
      setState({ errorMessages: { ...state.errorMessages, event_name: event_name } } as StateType);
    }, [validateEventName, state.errorMessages]);

  const validateStartDateTime = useCallback(async () => {
    if (
      state.dtoEvent.start_date_time == null ||
      dayjs(getLocalTime(state.dtoEvent.start_date_time)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return 'Start Time is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.start_date_time]);

  const onStartDateTimeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const start_date_time = await validateStartDateTime();
      setState({ errorMessages: { ...state.errorMessages, start_date_time: start_date_time } } as StateType);
    }, [validateStartDateTime, state.errorMessages]);

  const validateEndDateTime = useCallback(async () => {
    if (state.dtoEvent.end_date_time == null || dayjs(getLocalTime(state.dtoEvent.end_date_time)).format('MM/DD/YYYY') === '12/31/1899') {
      return 'End Time is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.end_date_time]);

  const onEndDateTimeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const end_date_time = await validateEndDateTime();
      setState({ errorMessages: { ...state.errorMessages, end_date_time: end_date_time } } as StateType);
    }, [validateEndDateTime, state.errorMessages]);

  const validateCurrencyName = useCallback(async () => {
    if (state.dtoEvent.currency_id === 0) {
      return 'Currency Name is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.currency_id]);

  const onCurrencyNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      getCurrencyData(state.dtoEvent.currency_id);
      const currency_id = await validateCurrencyName();
      setState({ errorMessages: { ...state.errorMessages, currency_id: currency_id } } as StateType);
    }, [getCurrencyData, state.dtoEvent.currency_id, validateCurrencyName]);

  const validateLocationName = useCallback(async () => {
    if (state.dtoEvent.location_id === 0) {
      return 'Location is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.location_id]);

  const onLocationNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const location_id = await validateLocationName();
      setState({ errorMessages: { ...state.errorMessages, location_id: location_id } } as StateType);
    }, [validateLocationName, state.errorMessages]);

  const validateAssignedToName = useCallback(async () => {
    if (state.dtoEvent.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoEvent.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedToName();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedToName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.event_name = await validateEventName();
    if (errorMessages.event_name) {
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
    errorMessages.currency_id = await validateCurrencyName();
    if (errorMessages.currency_id) {
      isFormValid = false;
    }
    errorMessages.location_id = await validateLocationName();
    if (errorMessages.location_id) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedToName();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateEventName, validateStartDateTime, validateEndDateTime, validateCurrencyName, validateLocationName, validateAssignedToName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();
        if (await validateForm()) {
          if (state.dtoEvent.id === 0) {
            const { data } = await addEvent({
              variables: {
                event_name: state.dtoEvent.event_name,
                start_date_time: state.dtoEvent.start_date_time,
                end_date_time: state.dtoEvent.end_date_time,
                currency_id: state.dtoEvent.currency_id,
                budget: state.dtoEvent.budget,
                description: state.dtoEvent.description,
                location_id: state.dtoEvent.location_id,
                email_template_id: state.dtoEvent.email_template_id,
                assigned_to: state.dtoEvent.assigned_to
              }
            });
            if (data?.addEvent) {
              toast.success('record saved successfully');
              getData();
              onClosePopup();
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateEvent({
              variables: {
                id: state.dtoEvent.id,
                event_name: state.dtoEvent.event_name,
                start_date_time: state.dtoEvent.start_date_time,
                end_date_time: state.dtoEvent.end_date_time,
                currency_id: state.dtoEvent.currency_id,
                budget: state.dtoEvent.budget,
                description: state.dtoEvent.description,
                location_id: state.dtoEvent.location_id,
                email_template_id: state.dtoEvent.email_template_id,
                assigned_to: state.dtoEvent.assigned_to
              }
            });
            if (data?.updateEvent) {
              toast.success('record saved successfully');
              getData();
              onClosePopup();
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
    [validateForm, addEvent, state.dtoEvent, router, updateEvent, getData, onClosePopup]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onClosePopup();
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

  const onSelectSlot = useCallback(async ({ start, end }: { start: Date; end: Date }) => {
    const dtoUser: UserDTO = await getMyProfile();
    setState({
      openPopup: true,
      dtoEvent: { ...EVENT, start_date_time: start, end_date_time: end, assigned_to: dtoUser.id, assigned_to_user_name: dtoUser.user_name }
    } as StateType);
  }, []);

  const onClose = useCallback(
    async (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason !== 'backdropClick') {
        onClosePopup();
      }
    },
    [onClosePopup]
  );

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
  );
  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      //router.push('/events/edit/' + state.selectedRow);
      handleClose();
      const dtoEvent: EventDTO = await getData2(state.selectedId);
      setState({ openPopup: true, dtoEvent: dtoEvent } as StateType);
    },
    [state.selectedId]
  );

  const onDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog1(state.selectedId);
      await handleClose();
    },
    [toggleDialog1, handleClose, state.selectedId]
  );

  const handleContextMenu = useCallback(
    async (event: React.MouseEvent<HTMLElement>, data: EventCalendarDTO): Promise<void> => {
      event.preventDefault();
      setState({
        selectedId: data.id,
        contextMenu: state.contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
      } as StateType);
    },
    [state.contextMenu]
  );
  const onDoubleClick = useCallback(async (data: EventCalendarDTO, event: React.SyntheticEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    handleClose();
    const dtoEvent: EventDTO = await getData2(data.id);
    setState({ openPopup: true, dtoEvent: dtoEvent } as StateType);
  }, []);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrLocationLookup: LookupDTO[] = [];
    const { error, data } = await getLocationLookup();
    if (!error && data?.getLocationLookup) {
      arrLocationLookup = data.getLocationLookup;
    }
    setState({ arrLocationLookup: arrLocationLookup } as StateType);
  }, [getLocationLookup]);

  return {
    state,
    DeleteSingle,
    onDeleteSingleClose,
    onGridViewClick,
    onSelectSlot,
    onClosePopup,
    onClose,
    onInputChange,
    onCurrencyNameChange,
    onLocationNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onAssignedToNameChange,
    onEventNameBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onCurrencyNameBlur,
    onLocationNameBlur,
    onAssignedToNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    handleClose,
    onContextMenu,
    onEditClick,
    onDeleteClick,
    handleContextMenu,
    onDoubleClick,
    localizer
  };
};

export default useEventList;
