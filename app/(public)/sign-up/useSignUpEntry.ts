import React, { ChangeEvent, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from '@/app/types/UserDTO';
import {
  ADD_USER,
  GET_USER_EMAIL_EXIST,
  GET_USER_USER_NAME_EXIST,
  GET_USER_MOBILE_NO_EXIST,
 
} from '@/app/graphql/User';
import { regExEMail } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as gConstants from '../../constants/constants';
type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile_no: string | null;
  user_name: string | null;
  password: string | null;
  role_id: number |null;
  status:string | null;
};

type StateType = {
  dtoSignUp: UserDTO;
  open1: boolean;
  errorMessages: ErrorMessageType;
};

const useSignUpEntry = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    email: null,
    mobile_no: null,
    user_name: null,
    password: null,
    role_id: null,
    status: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoSignUp: USER,
    // arrRoleLookup: arrRoleLookup,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addUser] = useMutation(ADD_USER, {});

  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

   const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoSignUp.id,
        email: state.dtoSignUp.email
      }
    });
    if (!error && data) {
      exist = data.getUserEMailExist;
    }
    return exist;
  }, [getUserEMailExist, state.dtoSignUp.id, state.dtoSignUp.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoSignUp.id,
        user_name: state.dtoSignUp.user_name
      }
    });
    if (!error && data) {
      exist = data.getUserUserNameExist;
    }
    return exist;
  }, [getUserUserNameExist, state.dtoSignUp.id, state.dtoSignUp.user_name]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserMobileNoExist({
      variables: {
        id: state.dtoSignUp.id,
        mobile_no: state.dtoSignUp.mobile_no
      }
    });
    if (!error && data) {
      exist = data.getUserMobileNoExist;
    }
    return exist;
  }, [getUserMobileNoExist, state.dtoSignUp.id, state.dtoSignUp.mobile_no]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoSignUp: {
          ...state.dtoSignUp,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoSignUp]
  );

  const onMobileNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoSignUp: {
          ...state.dtoSignUp,
          mobile_no: value
        }
      } as StateType);
    },
    [state.dtoSignUp]
  );


     const validateFirstName = useCallback(async () => {
      if (state.dtoSignUp.first_name.trim() === '') {
        return 'First Name is required';
      } else {
        return null;
      }
    }, [state.dtoSignUp.first_name]);
  
    const validateLastName = useCallback(async () => {
      if (state.dtoSignUp.last_name.trim() === '') {
        return 'Last Name is required';
      } else {
        return null;
      }
    }, [state.dtoSignUp.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoSignUp.email.trim() === '') {
      return 'E-Mail is required';
    } else if (!state.dtoSignUp.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoSignUp.email, IsEMailExist]);

  const validateMobileNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoSignUp.mobile_no.trim())) {
      return 'Mobile # is invalid';
    } else if (await IsMobileNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoSignUp.mobile_no, IsMobileNoExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoSignUp.user_name.trim() === '') {
      return 'Username is required';
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoSignUp.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoSignUp.password.trim() === '') {
      return 'Password is required';
    }  
     else if (state.dtoSignUp.password.length < gConstants.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
    }
    else if (state.dtoSignUp.password.length > gConstants.PASSWORD_MAX_LENGTH) {
      return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
    }
    return null;
  
  }, [state.dtoSignUp.password]);

  const onFirstNameBlur = useCallback(async () =>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () =>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () =>
    {
      const email = await validateEMailId();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMailId, state.errorMessages]);

  const onMobileNoBlur = useCallback(async () =>
    {
      const mobile_no = await validateMobileNo();
      setState({ errorMessages: { ...state.errorMessages, mobile_no: mobile_no } } as StateType);
    }, [validateMobileNo, state.errorMessages]);

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

  
  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.mobile_no = await validateMobileNo();
    if (errorMessages.mobile_no) {
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
    
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    validateFirstName,
    validateLastName,
    validateEMailId,
    validateMobileNo,
    validateUserName,
    validatePassword,
    ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      //if (await validateForm()) {
        if (state.dtoSignUp.id === 0) {
          const { data } = await addUser({
            variables: {
              first_name: state.dtoSignUp.first_name,
              last_name: state.dtoSignUp.last_name,
              email: state.dtoSignUp.email,
              mobile_no: state.dtoSignUp.mobile_no,
              user_name: state.dtoSignUp.first_name,
              password: state.dtoSignUp.password,
              status:gConstants.STATUS,
              role_id:gConstants.ROLE_ID,        
            }
          });
          if (data) {
            router.push('/login')
          }
       // }
      }
    },
    [validateForm, addUser, state.dtoSignUp, router]
  );
 
  return {
    state,
    onInputChange,
    onMobileNoChange,   
    onEMailIdBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    onFirstNameBlur,
    onLastNameBlur,   
    onSaveClick,
  };
};

export default useSignUpEntry;
