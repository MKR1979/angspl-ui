import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import OptionDTO, { OPTION } from '@/app/types/OptionDTO';
import { ADD_OPTION, UPDATE_OPTION, GET_OPTION, GET_OPTION_CODE_EXIST } from '@/app/graphql/Option';
import { MODULE_LOOKUP } from '@/app/graphql/Module';
import LookupDTO from '@/app/types/LookupDTO';
import * as Constants from '../constants/constants';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrCommonStatus, capitalizeWords } from '@/app/common/Configuration';

type ErrorMessageType = {
  module_id: number | null;
  module_name: string | null;
  option_name: string | null;
  option_code: number | null;
  status: string | null;
};

type StateType = {
  dtoOption: OptionDTO;
  arrModuleLookup: LookupDTO[];
  arrCommonStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
};

type Props = {
  dtoOption: OptionDTO;
  arrModuleLookup: LookupDTO[];
};

const useOptionEntry = ({ dtoOption, arrModuleLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    module_id: null,
    module_name: null,
    option_name: null,
    option_code: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    arrModuleLookup: arrModuleLookup,
    arrCommonStatusLookup: arrCommonStatus,
    dtoOption: dtoOption,
    open1: false,
    open2: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [saving, setSaving] = useState(false);

  const [addOption] = useMutation(ADD_OPTION, {});

  const [updateOption] = useMutation(UPDATE_OPTION, {});

  const [getOption] = useLazyQuery(GET_OPTION, {
    fetchPolicy: 'network-only'
  });

  const [getModuleLookup] = useLazyQuery(MODULE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getOptionCodeExist] = useLazyQuery(GET_OPTION_CODE_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrCommonStatusLookup.length > 0 &&
      !state.dtoOption.status
    ) {
      const firstItem = state.arrCommonStatusLookup[0];
      setState({
        ...state,
        dtoOption: {
          ...state.dtoOption,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCommonStatusLookup]);

  const IsOptionCodeExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getOptionCodeExist({
      variables: {
        id: state.dtoOption?.id,
        option_code: Number(state.dtoOption?.option_code)
      }
    });
    if (!error && data) {
      exist = data.getOptionCodeExist;
    }
    return exist;
  }, [getOptionCodeExist, state.dtoOption?.id, state.dtoOption.option_code]);

  const getData1 = useCallback(async (): Promise<void> => {
    try {
      let arrModuleLookup: LookupDTO[] = [];
      const { error, data } = await getModuleLookup();
      if (!error && data) {
        arrModuleLookup = data.getModuleLookup;
      }
      setState({ arrModuleLookup: arrModuleLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getModuleLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoOption: OptionDTO = OPTION;
      const { error, data } = await getOption({
        variables: {
          id: state.dtoOption.id
        }
      });
      if (!error && data) {
        dtoOption = { ...data.getOption }; // ask sir
      }
      setState({ dtoOption: dtoOption } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getOption, state.dtoOption.id]); // ask sir

  useEffect(() => {
    getData1();
    if (state.dtoOption.id > 0) {
      getData();
    }
  }, [getData1, state.dtoOption.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoOption: {
          ...state.dtoOption,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoOption]
  );

  const onModuleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOption: { ...state.dtoOption, module_id: (value as LookupDTO).id, module_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoOption]
  );

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoOption: {
          ...state.dtoOption,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoOption]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoOption.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoOption.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateModule = useCallback(async () => {
    if (state.dtoOption.module_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoOption.module_name]);

  const onModuleBlur = useCallback(async () => {
    const module_name = await validateModule();
    setState({ errorMessages: { ...state.errorMessages, module_name: module_name } } as StateType);
  }, [validateModule, state.errorMessages]);

  const validateOptionName = useCallback(async () => {
    if (state.dtoOption.option_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    // else if (await IsOptionNameExist()) {
    //   return 'Option already exists';
    // }
    else {
      return null;
    }
  }, [state.dtoOption.option_name]);

  const onOptionNameBlur = useCallback(async () => {
    const option_name = await validateOptionName();
    setState({ errorMessages: { ...state.errorMessages, option_name: option_name } } as StateType);
  }, [validateOptionName, state.errorMessages]);

  const validateOptionCode = useCallback(async () => {
    if (state.dtoOption.option_code == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsOptionCodeExist()) {
      return 'Option already exists';
    } else {
      return null;
    }
  }, [state.dtoOption.option_code]);

  const onOptionCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (digitsOnly.length <= Constants.CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'option_code' }
      });
    }
  };

  const onOptionCodeBlur = useCallback(async () => {
    const option_code = await validateOptionCode();
    setState({ errorMessages: { ...state.errorMessages, option_code: option_code } } as StateType);
  }, [validateOptionCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.option_name = await validateOptionName();
    if (errorMessages.option_name) {
      isFormValid = false;
    }
    errorMessages.module_name = await validateModule();
    if (errorMessages.module_name) {
      isFormValid = false;
    }
    // errorMessages.option_code = await validateOptionCode();
    // if (errorMessages.option_code) {
    //   isFormValid = false;
    // }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateOptionName, validateModule]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoOption.id === 0) {
            const { data } = await addOption({
              variables: {
                option_code: Number(state.dtoOption.option_code),
                option_name: state.dtoOption.option_name,
                module_id: state.dtoOption.module_id,
                status: state.dtoOption.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/options/list`);
            }
          } else {
            const { data } = await updateOption({
              variables: {
                id: state.dtoOption.id,
                option_code: Number(state.dtoOption.option_code),
                option_name: state.dtoOption.option_name,
                module_id: state.dtoOption.module_id,
                status: state.dtoOption.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/options/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving option:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [validateForm, addOption, state.dtoOption, router, updateOption]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoOption: { ...OPTION, id: state.dtoOption.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoOption.id, ERROR_MESSAGES]
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

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/options/list`);
    },
    [router]
  );
  return {
    state,
    onInputChange,
    onOptionNameBlur,
    onOptionCodeBlur,
    onSaveClick,
    onClearClick,
    onModuleNameChange,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onModuleBlur,
    onStatusChange,
    onStatusBlur,
    saving,
    onOptionCodeChange
  };
};

export default useOptionEntry;
