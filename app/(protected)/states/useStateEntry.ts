import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import StateDTO, { STATE } from '@/app/types/stateDTO';
import { ADD_STATE, UPDATE_STATE, GET_STATE } from '@/app/graphql/state';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { arrCommonStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  state_name: string | null;
  country_id: string | null;
  state_code: string | null;
  status: string | null;
};

type StateType = {
  dtoState: StateDTO;
  arrCountryLookup: LookupDTO[];
  arrCommonStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
};

type Props = {
  dtoState: StateDTO;
  arrCountryLookup: LookupDTO[];
};

const useStateEntry = ({ dtoState, arrCountryLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    state_name: null,
    state_code: null,
    country_id: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoState: dtoState,
    arrCountryLookup: arrCountryLookup,
    arrCommonStatusLookup: arrCommonStatus,
    errorMessages: { ...ERROR_MESSAGES },
    open1: false
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addState] = useMutation(ADD_STATE, {});

  const [updateState] = useMutation(UPDATE_STATE, {});

  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getState] = useLazyQuery(GET_STATE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrCommonStatusLookup.length > 0 &&
      !state.dtoState.status
    ) {
      const firstItem = state.arrCommonStatusLookup[0];
      setState({
        ...state,
        dtoState: {
          ...state.dtoState,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCommonStatusLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
    try {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCountryLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoState: StateDTO = STATE;
      const { error, data } = await getState({
        variables: {
          id: state.dtoState.id
        }
      });
      if (!error && data) {
        dtoState = { ...data.getState };
        dtoState.countryLookupDTO = { id: dtoState.country_id, text: dtoState.country_name };
      }
      setState({ dtoState: dtoState } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getState, state.dtoState.id]);

  useEffect(() => {
    getData1();
    if (state.dtoState.id > 0) {
      getData();
    }
  }, [getData1, state.dtoState.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoState: {
          ...state.dtoState,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoState]
  );


  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoState: {
          ...state.dtoState,
          state_code: value,
        },
      } as StateType);
    },
    [state.dtoState]
  );
  const onCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoState: { ...state.dtoState, country_id: (value as LookupDTO).id, countryLookupDTO: value }
      } as StateType);
    },
    [state.dtoState]
  );

  const validateStateName = useCallback(async () => {
    if (state.dtoState.state_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoState.state_name]);

  const onStateNameBlur = useCallback(async () => {
    const state_name = await validateStateName();
    setState({ errorMessages: { ...state.errorMessages, state_name: state_name } } as StateType);
  }, [validateStateName, state.errorMessages]);

  const validateCountryName = useCallback(async () => {
    if (state.dtoState.country_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoState.country_id]);

  const onCountryNameBlur = useCallback(async () => {
    const country_id = await validateCountryName();
    setState({ errorMessages: { ...state.errorMessages, country_id: country_id } } as StateType);
  }, [validateCountryName, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoState: {
          ...state.dtoState,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoState]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoState.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoState.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.state_name = await validateStateName();
    if (errorMessages.state_name) {
      isFormValid = false;
    }
    errorMessages.country_id = await validateCountryName();
    if (errorMessages.country_id) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStateName, validateCountryName, validateStatus]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoState.id === 0) {
            const { data } = await addState({
              variables: {
                ...state.dtoState
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/states/list');
            }
          } else {
            const { data } = await updateState({
              variables: {
                ...state.dtoState
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/states/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [validateForm, addState, state.dtoState, router, updateState]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoState: { ...STATE, id: state.dtoState.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoState.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/states/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  return {
    state,
    onInputChange,
    onCodeChange,
    onCountryNameChange,
    onStateNameBlur,
    onCountryNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onStatusChange,
    onStatusBlur
  };
};

export default useStateEntry;
