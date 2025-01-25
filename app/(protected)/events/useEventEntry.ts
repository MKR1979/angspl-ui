import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import EventDTO, { EVENT } from '@/app/types/EventDTO';
import { ADD_EVENT, UPDATE_EVENT, GET_EVENT } from '@/app/graphql/Event';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { CURRENCY_LOOKUP, GET_CURRENCY } from '@/app/graphql/Currency';
import toast from 'react-hot-toast';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';
import dayjs from 'dayjs';
import { getLocalTime } from '@/app/common/Configuration';
import { LOCATION_LOOKUP } from '@/app/graphql/Location';

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
};

type Props = {
  dtoEvent: EventDTO;
  arrCurrencyLookup: LookupDTO[];
  arrLocationLookup: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useEventEntry = ({ dtoEvent, arrCurrencyLookup, arrLocationLookup, arrEmailTemplateLookup, arrAssignedToLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    event_name: null,
    start_date_time: null,
    end_date_time: null,
    currency_id: null,
    email_template_id: null,
    assigned_to: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoEvent: dtoEvent,
    open1: false,
    open2: false,
    open3: false,
    arrCurrencyLookup: arrCurrencyLookup,
    arrLocationLookup: arrLocationLookup,
    arrEmailTemplateLookup: arrEmailTemplateLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

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

  const getData5 = useCallback(async (): Promise<void> => {
    let arrLocationLookup: LookupDTO[] = [];
    const { error, data } = await getLocationLookup();
    if (!error && data?.getLocationLookup) {
      arrLocationLookup = data.getLocationLookup;
    }
    setState({ arrLocationLookup: arrLocationLookup } as StateType);
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
    let dtoEvent: EventDTO = EVENT;
    const { error, data } = await getEvent({
      variables: {
        id: state.dtoEvent.id
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
    setState({ dtoEvent: dtoEvent } as StateType);
  }, [getEvent, state.dtoEvent.id]);

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
      getData();
    } else {
      setDefaultValues();
    }
    getData1();
    getData3();
    getData5();
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
              router.push('/events/list');
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
              router.push('/events/list');
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
    [validateForm, addEvent, state.dtoEvent, router, updateEvent]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/events/list');
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

  return {
    state,
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
    setClose3
  };
};

export default useEventEntry;
