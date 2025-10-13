import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import TypeDTO, { TYPE } from '@/app/types/TypeDTO';
import { ADD_TYPE, UPDATE_TYPE, GET_TYPE, GET_TYPE_NAME_EXIST } from '@/app/graphql/Type';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  type_name: string | null;
  status: string | null;
};

type StateType = {
  dtoType: TypeDTO;
  open1: boolean;
  arrTypesStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoType: TypeDTO;
};

const useTypeEntry = ({ dtoType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    type_name: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoType: dtoType,
    open1: false,
    arrTypesStatusLookup: arrModulesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addType] = useMutation(ADD_TYPE, {});
  const [updateType] = useMutation(UPDATE_TYPE, {});
  const [getType] = useLazyQuery(GET_TYPE, { fetchPolicy: 'network-only' });

  const [getTypeNameExist] = useLazyQuery(GET_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrTypesStatusLookup.length > 0 &&
      !state.dtoType.status
    ) {
      const firstItem = state.arrTypesStatusLookup[0];
      setState({
        ...state,
        dtoType: {
          ...state.dtoType,
          status: firstItem.text,
        }
      });
    }
  }, [state.arrTypesStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoType: TypeDTO = TYPE;
      const { error, data } = await getType({
        variables: {
          id: state.dtoType.id
        }
      });
      if (!error && data) {
        dtoType = data.getType;
      }
      setState({ dtoType: dtoType } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getType, state.dtoType.id]);

  const IsTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getTypeNameExist({
      variables: {
        id: state.dtoType.id,
        type_name: state.dtoType.type_name
      }
    });
    if (!error && data) {
      exist = data.getTypeNameExist;
    }
    return exist;
  }, [getTypeNameExist, state.dtoType.id, state.dtoType.type_name]);

  useEffect(() => {
    if (state.dtoType.id > 0) {
      getData();
    }
  }, [state.dtoType.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoType: {
          ...state.dtoType,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoType]
  );

  const validateTypeName = useCallback(async () => {
    if (state.dtoType.type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsTypeNameExist()) {
      return 'Type Name already exists';
    } else {
      return null;
    }
  }, [state.dtoType.type_name, IsTypeNameExist]);

  const onTypesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoType: {
          ...state.dtoType,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoType]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoType.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoType.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onTypeNameBlur = useCallback(async () => {
    const type_name = await validateTypeName();
    setState({ errorMessages: { ...state.errorMessages, type_name: type_name } } as StateType);
  }, [validateTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.type_name = await validateTypeName();
    if (errorMessages.type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoType.id === 0) {
            const { data } = await addType({
              variables: {
                // ...state.dtoType
                type_name: state.dtoType.type_name,
                status: state.dtoType.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/type/list');
            }
          } else {
            const { data } = await updateType({
              variables: {
                // ...state.dtoType
                id: state.dtoType.id,
                type_name: state.dtoType.type_name,
                status: state.dtoType.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/type/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving types:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [saving, validateForm, addType, state.dtoType, router, updateType]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoType: { ...TYPE, id: state.dtoType.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoType.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/type/list');
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
    onTypeNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onTypesStatusChange,
    onStatusBlur
  };
};

export default useTypeEntry;
