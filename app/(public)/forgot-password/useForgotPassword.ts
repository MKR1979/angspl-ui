import React, { ChangeEvent, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ForgotPasswordDTO, { FORGOT_PASSWORD } from '@/app/types/ForgotPasswordDTO';
import * as gConstants from '../../constants/constants';
import {
   GET_USER_EMAIL_EXIST,
  GET_USER_USER_NAME_EXIST,
  FORGET_USER_PASSWORD,
} from '@/app/graphql/User';
import { regExEMail } from '@/app/common/Configuration';
type ErrorMessageType = {
   email: string | null;
  user_name: string | null;
  password: string | null;
  confirm_password: string | null;
};

type StateType = {
  dtoForgotPassword: ForgotPasswordDTO;
  open1: boolean;
  errorMessages: ErrorMessageType;
};

const useForgotPassword = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    email: null,
    user_name: null,
    password: null,
    confirm_password: null,
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoForgotPassword: FORGOT_PASSWORD,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [forgetUserPassword] = useMutation(FORGET_USER_PASSWORD, {});

  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

   const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoForgotPassword.id,
        email: state.dtoForgotPassword.email
      }
    });
    if (!error && data) {
      exist = data.getUserEMailExist;
    }
    return exist;
  }, [getUserEMailExist, state.dtoForgotPassword.id, state.dtoForgotPassword.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoForgotPassword.id,
        user_name: state.dtoForgotPassword.user_name
      }
    });
    if (!error && data) {
      exist = data.getUserUserNameExist;
    }
    return exist;
  }, [getUserUserNameExist, state.dtoForgotPassword.id, state.dtoForgotPassword.user_name]);


  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoForgotPassword: {
          ...state.dtoForgotPassword,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoForgotPassword]
  );


  const validateEMailId = useCallback(async () => {
    if (state.dtoForgotPassword.email.trim() === '') {
      return 'E-Mail is required';
    } else if (!state.dtoForgotPassword.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return null;      
    } else {
      return 'E-Mail doesnot exist';;
    }
  }, [state.dtoForgotPassword.email, IsEMailExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoForgotPassword.user_name.trim() === '') {
      return 'Username is required';
    } else if (await IsUserNameExist()) {
      return null;
    } else {
      return 'Username doesnot exist';;
    }
  }, [state.dtoForgotPassword.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
      if (state.dtoForgotPassword.password.trim() === '') {
        return 'Password is required';
      }  
       else if (state.dtoForgotPassword.password.length < gConstants.PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
      }
      else if (state.dtoForgotPassword.password.length > gConstants.PASSWORD_MAX_LENGTH) {
        return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
      }
      return null;
    
    }, [state.dtoForgotPassword.password]);

  const validateConfirmPassword  = useCallback(async () => {
    const newPassword = state.dtoForgotPassword.password.trim();
    const confirmPassword = state.dtoForgotPassword.confirm_password.trim();
  
    if (!confirmPassword) {
      return "Confirm Password is required";
    }
  
    if (newPassword !== confirmPassword) {
      return "New and Confirm Password do not match";
    }
  
    return null;
  }, [state.dtoForgotPassword.confirm_password,state.dtoForgotPassword.password]);

  
  const onEMailIdBlur = useCallback(async () =>
    {
      const email = await validateEMailId();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMailId, state.errorMessages]);


  const onUserNameBlur = useCallback(async () =>
    {
      const user_name = await validateUserName();
      setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
    }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () =>
    {
      const password = await validatePassword();
      setState({ errorMessages: { ...state.errorMessages, password: password } } as StateType);
    }, [validatePassword, state.errorMessages]);

    const onConfirmPasswordBlur = useCallback(async () =>
        {        
        const confirm_password = await validateConfirmPassword();
        setState({ errorMessages: { ...state.errorMessages, confirm_password: confirm_password } } as StateType);
      }, [validateConfirmPassword, state.errorMessages]);
  
  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.user_name = await validateUserName();
    if (errorMessages.user_name) {
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
  }, [
    ERROR_MESSAGES,
    validateEMailId,
    validateUserName,
    validatePassword,
    validateConfirmPassword,
    ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      //if (await validateForm()) {
        if (state.dtoForgotPassword.id === 0) {
          const { data } = await forgetUserPassword({
            variables: {
              user_name: state.dtoForgotPassword.user_name,
              email: state.dtoForgotPassword.email,
              password: state.dtoForgotPassword.password,            
            }
          });
          if (data) {
            router.push('/login')
          }
      }
    },
    [validateForm, forgetUserPassword, state.dtoForgotPassword, router]
  );
 
  return {
    state,
    onInputChange,
    onEMailIdBlur,
    onUserNameBlur,
    onPasswordBlur,
    onSaveClick,
    onConfirmPasswordBlur,
  };
};

export default useForgotPassword;
