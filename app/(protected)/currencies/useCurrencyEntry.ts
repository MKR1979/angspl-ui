import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';
import { ADD_CURRENCY, UPDATE_CURRENCY, GET_CURRENCY } from '@/app/graphql/Currency';
import { GET_CURRENCY_CURRENCY_CODE_EXIST, GET_CURRENCY_CURRENCY_NAME_EXIST } from '@/app/graphql/Currency';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  currency_name: string | null;
  currency_code: string | null;
  currency_symbol: string | null;
};

type StateType = {
  dtoCurrency: CurrencyDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCurrency: CurrencyDTO;
};

const useCurrencyEntry = ({ dtoCurrency }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    currency_name: null,
    currency_code: null,
    currency_symbol: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCurrency: dtoCurrency,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addCurrency] = useMutation(ADD_CURRENCY, {});

  const [updateCurrency] = useMutation(UPDATE_CURRENCY, {});

  const [getCurrency] = useLazyQuery(GET_CURRENCY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyCurrencyCodeExist] = useLazyQuery(GET_CURRENCY_CURRENCY_CODE_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyCurrencyNameExist] = useLazyQuery(GET_CURRENCY_CURRENCY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCurrency: CurrencyDTO = CURRENCY;
    const { error, data } = await getCurrency({
      variables: {
        id: state.dtoCurrency.id
      }
    });
    if (!error && data?.getCurrency) {
      dtoCurrency = data.getCurrency;
    }
    setState({ dtoCurrency: dtoCurrency } as StateType);
  }, [getCurrency, state.dtoCurrency.id]);

  const IsCurrencyCodeExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCurrencyCurrencyCodeExist({
      variables: {
        id: state.dtoCurrency.id,
        currency_code: state.dtoCurrency.currency_code
      }
    });
    if (!error && data?.getCurrencyCurrencyCodeExist) {
      exist = data.getCurrencyCurrencyCodeExist;
    }
    return exist;
  }, [getCurrencyCurrencyCodeExist, state.dtoCurrency.id, state.dtoCurrency.currency_code]);

  const IsCurrencyNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCurrencyCurrencyNameExist({
      variables: {
        id: state.dtoCurrency.id,
        currency_name: state.dtoCurrency.currency_name
      }
    });
    if (!error && data?.getCurrencyCurrencyNameExist) {
      exist = data.getCurrencyCurrencyNameExist;
    }
    return exist;
  }, [getCurrencyCurrencyNameExist, state.dtoCurrency.id, state.dtoCurrency.currency_name]);

  useEffect(() => {
    if (state.dtoCurrency.id > 0) {
      getData();
    }
  }, [state.dtoCurrency.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoCurrency: {
          ...state.dtoCurrency,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoCurrency]
  );

  const validateCurrencyName = useCallback(async () => {
    if (state.dtoCurrency.currency_name.trim() === '') {
      return 'Currency Name is required';
    } else if (await IsCurrencyNameExist()) {
      return 'Currency Name already exists';
    } else {
      return null;
    }
  }, [state.dtoCurrency.currency_name, IsCurrencyNameExist]);

  const onCurrencyNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const currency_name = await validateCurrencyName();
      setState({ errorMessages: { ...state.errorMessages, currency_name: currency_name } } as StateType);
    }, [validateCurrencyName, state.errorMessages]);

  const validateCurrencyCode = useCallback(async () => {
    if (state.dtoCurrency.currency_code.trim() != '' && (await IsCurrencyCodeExist())) {
      return 'Currency Code already exists';
    } else {
      return null;
    }
  }, [state.dtoCurrency.currency_code, IsCurrencyCodeExist]);

  const onCurrencyCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const currency_code = await validateCurrencyCode();
      setState({ errorMessages: { ...state.errorMessages, currency_code: currency_code } } as StateType);
    }, [validateCurrencyCode, state.errorMessages]);

  const validateCurrencySymbol = useCallback(async () => {
    if (state.dtoCurrency.currency_symbol.trim() === '') {
      return 'Currency Symbol is required';
    } else {
      return null;
    }
  }, [state.dtoCurrency.currency_symbol]);

  const onCurrencySymbolBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const currency_symbol = await validateCurrencySymbol();
      setState({ errorMessages: { ...state.errorMessages, currency_symbol: currency_symbol } } as StateType);
    }, [validateCurrencySymbol, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.currency_name = await validateCurrencyName();
    if (errorMessages.currency_name) {
      isFormValid = false;
    }
    errorMessages.currency_code = await validateCurrencyCode();
    if (errorMessages.currency_code) {
      isFormValid = false;
    }
    errorMessages.currency_symbol = await validateCurrencySymbol();
    if (errorMessages.currency_symbol) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCurrencyName, validateCurrencyCode, validateCurrencySymbol]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoCurrency.id === 0) {
            const { data } = await addCurrency({
              variables: {
                currency_code: state.dtoCurrency.currency_code,
                currency_name: state.dtoCurrency.currency_name,
                currency_symbol: state.dtoCurrency.currency_symbol
              }
            });
            if (data?.addCurrency) {
              toast.success('record saved successfully');
              router.push('/currencies/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateCurrency({
              variables: {
                id: state.dtoCurrency.id,
                currency_code: state.dtoCurrency.currency_code,
                currency_name: state.dtoCurrency.currency_name,
                currency_symbol: state.dtoCurrency.currency_symbol
              }
            });
            if (data?.updateCurrency) {
              toast.success('record saved successfully');
              router.push('/currencies/list');
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
    [validateForm, addCurrency, state.dtoCurrency, router, updateCurrency]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/currencies/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onCurrencyNameBlur,
    onCurrencyCodeBlur,
    onCurrencySymbolBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useCurrencyEntry;
