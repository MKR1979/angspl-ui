import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CountryDTO, { COUNTRY } from '@/app/types/CountryDTO';
import { ADD_COUNTRY, UPDATE_COUNTRY, GET_COUNTRY, GET_COUNTRY_COUNTRY_NAME_EXIST } from '@/app/graphql/Country';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';
import { arrCommonStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  country_name: string | null;
  status: string | null;
};

type StateType = {
  dtoCountry: CountryDTO;
  arrCommonStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
};

type Props = {
  dtoCountry: CountryDTO;
};

const useCountryEntry = ({ dtoCountry }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    country_name: null,
    status: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCountry: dtoCountry,
    arrCommonStatusLookup: arrCommonStatus,
    errorMessages: { ...ERROR_MESSAGES },
    open1: false
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addCountry] = useMutation(ADD_COUNTRY, {});
  const [updateCountry] = useMutation(UPDATE_COUNTRY, {});
  const [getCountry] = useLazyQuery(GET_COUNTRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getCountryCountryNameExist] = useLazyQuery(GET_COUNTRY_COUNTRY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrCommonStatusLookup.length > 0 &&
      !state.dtoCountry.status
    ) {
      const firstItem = state.arrCommonStatusLookup[0];
      setState({
        ...state,
        dtoCountry: {
          ...state.dtoCountry,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCommonStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoCountry: CountryDTO = COUNTRY;
      const { error, data } = await getCountry({
        variables: {
          id: state.dtoCountry.id
        }
      });
      if (!error && data) {
        dtoCountry = data.getCountry;
      }
      setState({ dtoCountry: dtoCountry } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCountry, state.dtoCountry.id]);

  const IsCountryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCountryCountryNameExist({
      variables: {
        id: state.dtoCountry.id,
        country_name: state.dtoCountry.country_name
      }
    });
    if (!error && data) {
      exist = data.getCountryCountryNameExist;
    }
    return exist;
  }, [getCountryCountryNameExist, state.dtoCountry.id, state.dtoCountry.country_name]);

  useEffect(() => {
    if (state.dtoCountry.id > 0) {
      getData();
    }
  }, [state.dtoCountry.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoCountry: {
          ...state.dtoCountry,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoCountry]
  );

  const validateCountryName = useCallback(async () => {
    if (state.dtoCountry.country_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsCountryNameExist()) {
      return 'Country Name already exists';
    } else {
      return null;
    }
  }, [state.dtoCountry.country_name, IsCountryNameExist]);

  const onCountryNameBlur = useCallback(async () => {
    const country_name = await validateCountryName();
    setState({ errorMessages: { ...state.errorMessages, country_name: country_name } } as StateType);
  }, [validateCountryName, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCountry: {
          ...state.dtoCountry,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCountry]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoCountry.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCountry.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.country_name = await validateCountryName();
    if (errorMessages.country_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCountryName, validateStatus]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoCountry.id === 0) {
            const { data } = await addCountry({
              variables: {
                ...state.dtoCountry
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/countries/list');
            }
          } else {
            const { data } = await updateCountry({
              variables: {
                ...state.dtoCountry
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/countries/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addCountry, state.dtoCountry, router, updateCountry]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoCountry: { ...COUNTRY, id: state.dtoCountry.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoCountry.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/countries/list');
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

export default useCountryEntry;
