import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AccountTypeDTO, { ACCOUNT_TYPE } from '@/app/types/AccountTypeDTO';
import {
  ADD_ACCOUNT_TYPE,
  UPDATE_ACCOUNT_TYPE,
  GET_ACCOUNT_TYPE,
  GET_ACCOUNT_TYPE_ACCOUNT_TYPE_NAME_EXIST
} from '@/app/graphql/AccountType';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  account_type_name: string | null;
};

type StateType = {
  dtoAccountType: AccountTypeDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoAccountType: AccountTypeDTO;
};

const useAccountTypeEntry = ({ dtoAccountType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    account_type_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAccountType: dtoAccountType,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addAccountType] = useMutation(ADD_ACCOUNT_TYPE, {});

  const [updateAccountType] = useMutation(UPDATE_ACCOUNT_TYPE, {});

  const [getAccountType] = useLazyQuery(GET_ACCOUNT_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAccountTypeAccountTypeNameExist] = useLazyQuery(GET_ACCOUNT_TYPE_ACCOUNT_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoAccountType: AccountTypeDTO = ACCOUNT_TYPE;
    const { error, data } = await getAccountType({
      variables: {
        id: state.dtoAccountType.id
      }
    });
    if (!error && data?.getAccountType) {
      dtoAccountType = data.getAccountType;
    }
    setState({ dtoAccountType: dtoAccountType } as StateType);
  }, [getAccountType, state.dtoAccountType.id]);

  const IsAccountTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getAccountTypeAccountTypeNameExist({
      variables: {
        id: state.dtoAccountType.id,
        account_type_name: state.dtoAccountType.account_type_name
      }
    });
    if (!error && data?.getAccountTypeAccountTypeNameExist) {
      exist = data.getAccountTypeAccountTypeNameExist;
    }
    return exist;
  }, [getAccountTypeAccountTypeNameExist, state.dtoAccountType.id, state.dtoAccountType.account_type_name]);

  useEffect(() => {
    if (state.dtoAccountType.id > 0) {
      getData();
    }
  }, [state.dtoAccountType.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAccountType: {
          ...state.dtoAccountType,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAccountType]
  );

  const validateAccountTypeName = useCallback(async () => {
    if (state.dtoAccountType.account_type_name.trim() === '') {
      return 'Account Type Name is required';
    }
    if (await IsAccountTypeNameExist()) {
      return 'Account Type Name already exists';
    } else {
      return null;
    }
  }, [state.dtoAccountType.account_type_name, IsAccountTypeNameExist]);

  const onAccountTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const account_type_name = await validateAccountTypeName();
      setState({ errorMessages: { ...state.errorMessages, account_type_name: account_type_name } } as StateType);
    }, [validateAccountTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.account_type_name = await validateAccountTypeName();
    if (errorMessages.account_type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateAccountTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoAccountType.id === 0) {
            const { data } = await addAccountType({
              variables: {
                account_type_name: state.dtoAccountType.account_type_name
              }
            });
            if (data?.addAccountType) {
              toast.success('record saved successfully');
              router.push('/account-types/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateAccountType({
              variables: {
                id: state.dtoAccountType.id,
                account_type_name: state.dtoAccountType.account_type_name
              }
            });
            if (data?.updateAccountType) {
              toast.success('record saved successfully');
              router.push('/account-types/list');
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
    [validateForm, addAccountType, state.dtoAccountType, router, updateAccountType]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/account-types/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onAccountTypeNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useAccountTypeEntry;
