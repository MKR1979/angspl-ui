import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CountryDTO, { COUNTRY } from '@/app/types/CountryDTO';
import { ADD_COUNTRY, UPDATE_COUNTRY, GET_COUNTRY, GET_COUNTRY_COUNTRY_NAME_EXIST } from '@/app/graphql/Country';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  country_name: string | null;
};

type StateType = {
  dtoCountry: CountryDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCountry: CountryDTO;
};

const useCountryEntry = ({ dtoCountry }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    country_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCountry: dtoCountry,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addCountry] = useMutation(ADD_COUNTRY, {});

  const [updateCountry] = useMutation(UPDATE_COUNTRY, {});

  const [getCountry] = useLazyQuery(GET_COUNTRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCountryCountryNameExist] = useLazyQuery(GET_COUNTRY_COUNTRY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCountry: CountryDTO = COUNTRY;
    const { error, data } = await getCountry({
      variables: {
        id: state.dtoCountry.id
      }
    });
    if (!error && data?.getCountry) {
      dtoCountry = data.getCountry;
    }
    setState({ dtoCountry: dtoCountry } as StateType);
  }, [getCountry, state.dtoCountry.id]);

  const IsCountryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCountryCountryNameExist({
      variables: {
        id: state.dtoCountry.id,
        country_name: state.dtoCountry.country_name
      }
    });
    if (!error && data?.getCountryCountryNameExist) {
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
      setState({
        dtoCountry: {
          ...state.dtoCountry,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoCountry]
  );

  const validateCountryName = useCallback(async () => {
    if (state.dtoCountry.country_name.trim() === '') {
      return 'Country Name is required';
    }
    if (await IsCountryNameExist()) {
      return 'Country Name already exists';
    } else {
      return null;
    }
  }, [state.dtoCountry.country_name, IsCountryNameExist]);

  const onCountryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const country_name = await validateCountryName();
      setState({ errorMessages: { ...state.errorMessages, country_name: country_name } } as StateType);
    }, [validateCountryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.country_name = await validateCountryName();
    if (errorMessages.country_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCountryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoCountry.id === 0) {
            const { data } = await addCountry({
              variables: {
                country_name: state.dtoCountry.country_name
              }
            });
            if (data?.addCountry) {
              toast.success('record saved successfully');
              router.push('/countries/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateCountry({
              variables: {
                id: state.dtoCountry.id,
                country_name: state.dtoCountry.country_name
              }
            });
            if (data?.updateCountry) {
              toast.success('record saved successfully');
              router.push('/countries/list');
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
    [validateForm, addCountry, state.dtoCountry, router, updateCountry]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/countries/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onCountryNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useCountryEntry;
