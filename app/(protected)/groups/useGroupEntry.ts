import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import GroupDTO, { GROUP } from '@/app/types/GroupDTO';
import { ADD_GROUP, UPDATE_GROUP, GET_GROUP, GET_GROUP_NAME_EXIST } from '../../graphql/Group';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  group_name: string | null;
  status: string | null;
};

type StateType = {
  dtoGroup: GroupDTO;
  open1: boolean;
  arrGroupStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoGroup: GroupDTO;
};

const useGroupEntry = ({ dtoGroup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    group_name: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoGroup: dtoGroup,
    open1: false,
    arrGroupStatusLookup: arrModulesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addGroup] = useMutation(ADD_GROUP, {});
  const [updateGroup] = useMutation(UPDATE_GROUP, {});
  const [getGroup] = useLazyQuery(GET_GROUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrGroupStatusLookup.length > 0 &&
      !state.dtoGroup.status
    ) {
      const firstItem = state.arrGroupStatusLookup[0];
      setState({
        ...state,
        dtoGroup: {
          ...state.dtoGroup,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrGroupStatusLookup]);

  const [getGroupNameExist] = useLazyQuery(GET_GROUP_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoGroup: GroupDTO = GROUP;
      const { error, data } = await getGroup({
        variables: {
          id: state.dtoGroup.id
        }
      });
      if (!error && data) {
        dtoGroup = data.getGroup;
      }
      setState({ dtoGroup: dtoGroup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getGroup, state.dtoGroup.id]);

  const IsGroupNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getGroupNameExist({
      variables: {
        id: state.dtoGroup.id,
        group_name: state.dtoGroup.group_name
      }
    });
    if (!error && data) {
      exist = data.IsGroupNameExist;
    }
    return exist;
  }, [getGroupNameExist, state.dtoGroup.id, state.dtoGroup.group_name]);

  useEffect(() => {
    if (state.dtoGroup.id > 0) {
      getData();
    }
  }, [state.dtoGroup.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoGroup: {
          ...state.dtoGroup,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoGroup]
  );


  const validateGroupName = useCallback(async () => {
    if (state.dtoGroup.group_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await IsGroupNameExist()) {
      return 'Group Name already exists';
    } else {
      return null;
    }
  }, [state.dtoGroup.group_name, IsGroupNameExist]);

  const onGroupsStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoGroup: {
          ...state.dtoGroup,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoGroup]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoGroup.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoGroup.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onGroupNameBlur = useCallback(async () => {
    const group_name = await validateGroupName();
    setState({ errorMessages: { ...state.errorMessages, group_name: group_name } } as StateType);
  }, [validateGroupName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.group_name = await validateGroupName();
    if (errorMessages.group_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateGroupName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoGroup.id === 0) {
            const { data } = await addGroup({
              variables: {
                // ...state.dtoGroup
                group_name: state.dtoGroup.group_name,
                status: state.dtoGroup.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/groups/list');
            }
          } else {
            const { data } = await updateGroup({
              variables: {
                // ...state.dtoGroup
                id: state.dtoGroup.id,
                group_name: state.dtoGroup.group_name,
                status: state.dtoGroup.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/groups/list');
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
    [saving, validateForm, addGroup, state.dtoGroup, router, updateGroup]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoGroup: { ...GROUP, id: state.dtoGroup.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoGroup.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/groups/list');
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
    onGroupNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onGroupsStatusChange,
    onStatusBlur
  };
};

export default useGroupEntry;
