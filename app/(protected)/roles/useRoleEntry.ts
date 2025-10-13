import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import RoleDTO, { ROLE } from '@/app/types/RoleDTO';
import { ADD_ROLE, UPDATE_ROLE, GET_ROLE, GET_ROLE_ROLE_NAME_EXIST } from '@/app/graphql/Role';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { TYPE_LOOKUP } from '@/app/graphql/Type';

type ErrorMessageType = {
  type_id: number | null;
  type_name: string | null;
  role_name: string | null;
  status: string | null;
};

type StateType = {
  dtoRole: RoleDTO;
  open1: boolean;
  open2: boolean;
  arrRolesStatusLookup: LookupDTO[];
  arrTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoRole: RoleDTO;
};

const useRoleEntry = ({ dtoRole }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    type_id: null,
    type_name: null,
    role_name: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoRole: dtoRole,
    open1: false,
    open2: false,
    arrRolesStatusLookup: arrModulesStatus,
    arrTypeLookup: [] as LookupDTO[],
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addRole] = useMutation(ADD_ROLE, {});
  const [getTypeLookup] = useLazyQuery(TYPE_LOOKUP, { fetchPolicy: 'network-only' });
  const [updateRole] = useMutation(UPDATE_ROLE, {});
  const [getRole] = useLazyQuery(GET_ROLE, { fetchPolicy: 'network-only' });
  const [getRoleRoleNameExist] = useLazyQuery(GET_ROLE_ROLE_NAME_EXIST, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrRolesStatusLookup.length > 0 &&
      !state.dtoRole.status
    ) {
      const firstItem = state.arrRolesStatusLookup[0];
      setState({
        ...state,
        dtoRole: {
          ...state.dtoRole,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrRolesStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoRole: RoleDTO = ROLE;
      const { error, data } = await getRole({
        variables: {
          id: state.dtoRole.id
        }
      });
      if (!error && data) {
        dtoRole = data.getRole;
      }
      setState({ dtoRole: dtoRole } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRole, state.dtoRole.id]);

  const getRoleType = useCallback(async (): Promise<void> => {
    try {
      let arrTypeLookup: LookupDTO[] = [];
      const { error, data } = await getTypeLookup();
      if (!error && data) {
        arrTypeLookup = data.getTypeLookup;
      }
      setState({ arrTypeLookup: arrTypeLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getTypeLookup]);

  useEffect(() => {
    getRoleType();
  }, [getRoleType]);

  const IsRoleNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getRoleRoleNameExist({
      variables: {
        id: state.dtoRole.id,
        role_name: state.dtoRole.role_name
      }
    });
    if (!error && data) {
      exist = data.getRoleRoleNameExist;
    }
    return exist;
  }, [getRoleRoleNameExist, state.dtoRole.id, state.dtoRole.role_name]);

  useEffect(() => {
    if (state.dtoRole.id > 0) {
      getData();
    }
  }, [state.dtoRole.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoRole: {
          ...state.dtoRole,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoRole]
  );

  const onRolesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoRole: {
          ...state.dtoRole,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoRole]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoRole.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoRole.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoRole: { ...state.dtoRole, type_id: (value as LookupDTO).id, type_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoRole]
  );

  const validateType = useCallback(async () => {
    if (state.dtoRole.type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoRole.type_name]);

  const onTypeBlur = useCallback(async () => {
    const type_name = await validateType();
    setState({ errorMessages: { ...state.errorMessages, type_name: type_name } } as StateType);
  }, [validateType, state.errorMessages]);

  const validateRoleName = useCallback(async () => {
    if (state.dtoRole.role_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsRoleNameExist()) {
      return 'Role Name already exists';
    } else {
      return null;
    }
  }, [state.dtoRole.role_name, IsRoleNameExist]);

  const onRoleNameBlur = useCallback(async () => {
    const role_name = await validateRoleName();
    setState({ errorMessages: { ...state.errorMessages, role_name: role_name } } as StateType);
  }, [validateRoleName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.role_name = await validateRoleName();
    if (errorMessages.role_name) {
      isFormValid = false;
    }
    errorMessages.type_name = await validateType();
    if (errorMessages.type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateRoleName, validateType]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoRole.id === 0) {
            const { data } = await addRole({
              variables: {
                role_name: state.dtoRole.role_name,
                type_id: state.dtoRole.type_id,
                status: state.dtoRole.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/roles/list');
            }
          } else {
            const { data } = await updateRole({
              variables: {
                id: state.dtoRole.id,
                role_name: state.dtoRole.role_name,
                type_id: state.dtoRole.type_id,
                status: state.dtoRole.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/roles/list');
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
    [saving, validateForm, addRole, state.dtoRole, router, updateRole]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoRole: { ...ROLE, id: state.dtoRole.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoRole.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/roles/list');
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

  return {
    state,
    onInputChange,
    onRoleNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onRolesStatusChange,
    onStatusBlur,
    setOpen2,
    setClose2,
    onTypeChange,
    onTypeBlur
  };
};

export default useRoleEntry;
