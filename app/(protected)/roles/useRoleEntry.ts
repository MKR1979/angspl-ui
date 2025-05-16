import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import RoleDTO, { ROLE } from '@/app/types/RoleDTO';
import { ADD_ROLE, UPDATE_ROLE, GET_ROLE, GET_ROLE_ROLE_NAME_EXIST } from '@/app/graphql/Role';

type ErrorMessageType = {
  role_name: string | null;
};

type StateType = {
  dtoRole: RoleDTO;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoRole: RoleDTO;
};

const useRoleEntry = ({ dtoRole }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    role_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoRole: dtoRole,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addRole] = useMutation(ADD_ROLE, {});

  const [updateRole] = useMutation(UPDATE_ROLE, {});

  const [getRole] = useLazyQuery(GET_ROLE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getRoleRoleNameExist] = useLazyQuery(GET_ROLE_ROLE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
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
  }, [getRole, state.dtoRole.id]);

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
      setState({
        dtoRole: {
          ...state.dtoRole,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoRole]
  );

  const validateRoleName = useCallback(async () => {
    if (state.dtoRole.role_name.trim() === '') {
      return 'Role Name is required';
    }
    if (await IsRoleNameExist()) {
      return 'Role Name already exists';
    } else {
      return null;
    }
  }, [state.dtoRole.role_name, IsRoleNameExist]);

  const onRoleNameBlur = useCallback(async () =>
    {
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
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateRoleName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoRole.id === 0) {
          const { data } = await addRole({
            variables: {
              ...state.dtoRole
            }
          });
          if (data) {
            router.push('/roles/list');
          }
        } else {
          const { data } = await updateRole({
            variables: {
              ...state.dtoRole
            }
          });
          if (data) {
            router.push('/roles/list');
          }
        }
      }
    },
    [validateForm, addRole, state.dtoRole, router, updateRole]
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

  return {
    state,
    onInputChange,
    onRoleNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick
  };
};

export default useRoleEntry;
