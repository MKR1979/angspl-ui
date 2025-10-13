import React, { ChangeEvent, useCallback, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { UPDATE_USER_PASSWORD, VALIDATE_USER_PASSWORD } from '@/app/graphql/User';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';

type ErrorMessageType = {
  old_password: string | null;
  password: string | null;
  confirm_password: string | null;
};

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
  old_password: string;
  password: string;
  confirm_password: string;
  errorMessages: ErrorMessageType;
};

const useChangePassword = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    old_password: null,
    password: null,
    confirm_password: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Change Password' }],
    old_password: '',
    password: '',
    confirm_password: '',
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
   const [showPassword2, setShowPassword2] = useState(false);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD, {});

  const [validateUserPassword] = useLazyQuery(VALIDATE_USER_PASSWORD, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const IsPasswordExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await validateUserPassword({
      variables: {
        password: state.old_password
      }
    });
    if (!error && data) {
      exist = data.validateUserPassword;
    }
    return exist;
  }, [validateUserPassword, state.old_password]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.value } as StateType);
    },
    [state]
  );
  const validateOldPassword = useCallback(async () => {
    if (state.old_password.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else if (!(await IsPasswordExist())) {
      return 'Old Password is wrong';
    } else {
      return null;
    }
  }, [state.old_password, IsPasswordExist]);

  const onOldPasswordBlur = useCallback(async () => {
    const old_password = await validateOldPassword();
    setState({ errorMessages: { ...state.errorMessages, old_password: old_password } } as StateType);
  }, [validateOldPassword, state.errorMessages]);

  const validatePassword = useCallback(async () => {
    if (state.password.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.password]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({ errorMessages: { ...state.errorMessages, password: password } } as StateType);
  }, [validatePassword, state.errorMessages]);

  const validateConfirmPassword = useCallback(async () => {
    if (state.confirm_password.trim() === '') {
     return gMessageConstants.REQUIRED_FIELD;
    } else if (state.password.trim() != state.confirm_password.trim()) {
      return 'Password and Confirm Password do not match';
    } else {
      return null;
    }
  }, [state.confirm_password, state.password]);

  const onConfirmPasswordBlur = useCallback(async () => {
    const confirm_password = await validateConfirmPassword();
    setState({ errorMessages: { ...state.errorMessages, confirm_password: confirm_password } } as StateType);
  }, [validateConfirmPassword, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.old_password = await validateOldPassword();
    if (errorMessages.old_password) {
      isFormValid = false;
    }
    errorMessages.password = await validatePassword();
    if (errorMessages.password) {
      isFormValid = false;
    }
    errorMessages.confirm_password = await validateConfirmPassword();
    if (errorMessages.confirm_password) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [ERROR_MESSAGES, validateOldPassword, validatePassword, validateConfirmPassword]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          const { data } = await updateUserPassword({
            variables: {
              old_password: state.old_password,
              password: state.password
            }
          });
          if (data) {
            showSnackbar(gMessageConstants.SNACKBAR_UPDATE_PASSWORD, 'success');
            router.push('/login');
          }
        }
      } catch (error: any) {
        console.error('Error while saving password:', error);
        showSnackbar(gMessageConstants.SNACKBAR_PASSWORD_UPDATE_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, state.old_password, state.password, router, updateUserPassword]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/dashboard');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onOldPasswordBlur,
    onPasswordBlur,
    onConfirmPasswordBlur,
    showPassword,
    setShowPassword,
    showPassword1,
    setShowPassword1,
    showPassword2,
    setShowPassword2,
    onSaveClick,
    onCancelClick,
    saving
  };
};

export default useChangePassword;
