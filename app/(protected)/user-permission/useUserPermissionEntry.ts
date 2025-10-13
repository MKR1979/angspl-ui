import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserPermissionDTO, { USER_PERMISSION } from '@/app/types/UserPermissionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { ADD_USER_PERMISSION, UPDATE_USER_PERMISSION, GET_USER_PERMISSION } from '@/app/graphql/UserPermission';
import { MODULE_LOOKUP } from '@/app/graphql/Module';
import { OPTION_LOOKUP } from '@/app/graphql/Option';
import { USER_LOOKUP } from '@/app/graphql/User';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_id: number | null;
  user_name: string | null;
  module_id: number | null;
  module_name: string | null;
  option_id: number | null;
  option_name: string | null;
  grant: boolean | false;
};

type StateType = {
  dtoUserPermission: UserPermissionDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrUserLookup: LookupDTO[];
  arrOptionLookup: LookupDTO[];
  arrModuleLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoUserPermission: UserPermissionDTO;
};

const useUserPermissionEntry = ({ dtoUserPermission }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    user_name: null,
    module_id: null,
    module_name: null,
    option_id: null,
    option_name: null,
    grant: false
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoUserPermission: dtoUserPermission,
    arrUserLookup: [] as LookupDTO[],
    arrOptionLookup: [] as LookupDTO[],
    arrModuleLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    open3: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addUserPermission] = useMutation(ADD_USER_PERMISSION, {});
  const showSnackbar = useSnackbar();
  const [updateUserPermission] = useMutation(UPDATE_USER_PERMISSION, {});

  const [getUserPermission] = useLazyQuery(GET_USER_PERMISSION, {
    fetchPolicy: 'network-only'
  });

  const [getModuleLookup] = useLazyQuery(MODULE_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  const [getOptionLookup] = useLazyQuery(OPTION_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUserPermission: UserPermissionDTO = USER_PERMISSION;
      const { error, data } = await getUserPermission({
        variables: {
          id: state.dtoUserPermission.id
        }
      });
      if (!error && data) {
        dtoUserPermission = data.getUserPermission;
      }
      setState({ dtoUserPermission: dtoUserPermission } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserPermission, state.dtoUserPermission.id]);

  useEffect(() => {
    if (state.dtoUserPermission.id > 0) {
      getData();
    }
  }, [state.dtoUserPermission.id, getData]);

  const getOption = useCallback(async (): Promise<void> => {
    try {
      let arrOptionLookup: LookupDTO[] = [];
      const { error, data } = await getOptionLookup({
        variables: {
          module_id: state.dtoUserPermission.module_id
        }
      });
      if (!error && data) {
        arrOptionLookup = data.getOptionLookup;
      }
      setState({ arrOptionLookup: arrOptionLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getOptionLookup, state.dtoUserPermission.module_id]);

  const getUser = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup();
      if (!error && data) {
        arrUserLookup = data.getUserLookup;
      }
      setState({ arrUserLookup: arrUserLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  const getModule = useCallback(async (): Promise<void> => {
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

  useEffect(() => {
    const fetchLookups = async () => {
      await Promise.all([getModule(), getOption(), getUser()]);
    };

    fetchLookups();
  }, [getModule, getOption, getUser]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;
      setState({
        dtoUserPermission: {
          ...state.dtoUserPermission,
          [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoUserPermission]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserPermission: {
          ...state.dtoUserPermission,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoUserPermission]
  );

  const validateUserName = useCallback(async () => {
    if (state.dtoUserPermission.user_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUserPermission.user_name]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  }, [validateUserName, state.errorMessages]);

  const onModuleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserPermission: { ...state.dtoUserPermission, module_id: (value as LookupDTO).id, module_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoUserPermission]
  );

  const validateModule = useCallback(async () => {
    if (state.dtoUserPermission.module_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUserPermission.module_name]);

  const onModuleBlur = useCallback(async () => {
    const module_name = await validateModule();
    setState({ errorMessages: { ...state.errorMessages, module_name: module_name } } as StateType);
  }, [validateModule, state.errorMessages]);

  const onOptionNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserPermission: { ...state.dtoUserPermission, option_id: (value as LookupDTO).id, option_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoUserPermission]
  );

  const validateOption = useCallback(async () => {
    if (state.dtoUserPermission.option_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUserPermission.option_name]);

  const onOptionBlur = useCallback(async () => {
    const option_name = await validateOption();
    setState({ errorMessages: { ...state.errorMessages, option_name: option_name } } as StateType);
  }, [validateOption, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

    errorMessages.user_name = await validateUserName();
    if (errorMessages.user_name) {
      isFormValid = false;
    }
    errorMessages.module_name = await validateModule();
    if (errorMessages.module_name) {
      isFormValid = false;
    }
    errorMessages.option_name = await validateOption();
    if (errorMessages.option_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateUserName, validateModule, validateOption]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoUserPermission.id === 0) {
            const { data } = await addUserPermission({
              variables: {
                user_id: state.dtoUserPermission.user_id,
                option_id: state.dtoUserPermission.option_id,
                grant: state.dtoUserPermission.grant
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/user-permission/list`);
            }
          } else {
            const { data } = await updateUserPermission({
              variables: {
                id: state.dtoUserPermission.id,
                user_id: state.dtoUserPermission.user_id,
                option_id: state.dtoUserPermission.option_id,
                grant: state.dtoUserPermission.grant
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/user-permission/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving user Permission:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [validateForm, addUserPermission, state.dtoUserPermission, router, updateUserPermission]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoUserPermission: { ...USER_PERMISSION, id: state.dtoUserPermission.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoUserPermission.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/user-permission/list`);
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    state,
    onUserNameChange,
    onInputChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    saving,
    onModuleBlur,
    onModuleNameChange,
    onUserNameBlur,
    onOptionNameChange,
    onOptionBlur
  };
};

export default useUserPermissionEntry;
