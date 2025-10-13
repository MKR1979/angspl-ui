import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ModuleDTO, { MODULE } from '@/app/types/ModuleDTO';
import { ADD_MODULE, UPDATE_MODULE, GET_MODULE, GET_MODULE_NAME_EXIST } from '@/app/graphql/Module';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  module_name: string | null;
  code: string | null;
  status: string | null;
};

type StateType = {
  dtoModule: ModuleDTO;
  open1: boolean;
  arrModulesStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoModule: ModuleDTO;
};

const useModuleEntry = ({ dtoModule }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    module_name: null,
    code: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoModule: dtoModule,
    open1: false,
    arrModulesStatusLookup: arrModulesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addModule] = useMutation(ADD_MODULE, {});

  const [updateModule] = useMutation(UPDATE_MODULE, {});

  const [getModule] = useLazyQuery(GET_MODULE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getModuleNameExist] = useLazyQuery(GET_MODULE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrModulesStatusLookup.length > 0 &&
      !state.dtoModule.status
    ) {
      const firstItem = state.arrModulesStatusLookup[0];
      setState({
        ...state,
        dtoModule: {
          ...state.dtoModule,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrModulesStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoModule: ModuleDTO = MODULE;
      const { error, data } = await getModule({
        variables: {
          id: state.dtoModule.id
        }
      });
      if (!error && data) {
        dtoModule = data.getModule;
      }
      setState({ dtoModule: dtoModule } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getModule, state.dtoModule.id]);

  const IsModuleNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getModuleNameExist({
      variables: {
        id: state.dtoModule.id,
        module_name: state.dtoModule.module_name
      }
    });
    if (!error && data) {
      exist = data.getModuleNameExist;
    }
    return exist;
  }, [getModuleNameExist, state.dtoModule.id, state.dtoModule.module_name]);

  useEffect(() => {
    if (state.dtoModule.id > 0) {
      getData();
    }
  }, [state.dtoModule.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoModule: {
          ...state.dtoModule,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoModule]
  );


  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoModule: {
          ...state.dtoModule,
          code: value,
        },
      } as StateType);
    },
    [state.dtoModule]
  );

  const validateModuleName = useCallback(async () => {
    if (state.dtoModule.module_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsModuleNameExist()) {
      return 'Module Name already exists';
    } else {
      return null;
    }
  }, [state.dtoModule.module_name]);

  const validateCode = useCallback(async () => {
    if (state.dtoModule.code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoModule.code]);

  const onCodeBlur = useCallback(async () => {
    const code = await validateCode();
    setState({ errorMessages: { ...state.errorMessages, code: code } } as StateType);
  }, [validateCode, state.errorMessages]);

  const onModulesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoModule: {
          ...state.dtoModule,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoModule]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoModule.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoModule.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onModuleNameBlur = useCallback(async () => {
    const module_name = await validateModuleName();
    setState({ errorMessages: { ...state.errorMessages, module_name: module_name } } as StateType);
  }, [validateModuleName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.module_name = await validateModuleName();
    if (errorMessages.module_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateModuleName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoModule.id === 0) {
            const { data } = await addModule({
              variables: {
                // ...state.dtoModule
                module_name: state.dtoModule.module_name,
                code: state.dtoModule.code,
                status: state.dtoModule.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/modules/list');
            }
          } else {
            const { data } = await updateModule({
              variables: {
                // ...state.dtoModule
                id: state.dtoModule.id,
                module_name: state.dtoModule.module_name,
                code: state.dtoModule.code,
                status: state.dtoModule.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/modules/list');
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
    [saving, validateForm, addModule, state.dtoModule, router, updateModule]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoModule: { ...MODULE, id: state.dtoModule.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoModule.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/modules/list');
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
    onModuleNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onModulesStatusChange,
    onStatusBlur,
    onCodeBlur
  };
};

export default useModuleEntry;
