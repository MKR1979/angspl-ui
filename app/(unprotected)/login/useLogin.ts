import { useCallback, useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';

import User, { USER } from '../../types/UserDTO';
import { LOGIN_USER } from '../../graphql/User';
import { setToken } from '../../store/slices/globalState';
import { useDispatch } from '@/app/store';
type ErrorMessageType = {
  user_name: string | null;
  password: string | null;
};

type StateType = {
  dtoUser: User;
  errorMessages: ErrorMessageType;
};

const useLogin = () => {
  const [, setCookie] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_name: null,
    password: null
  });

  const INITIAL_STATE: StateType = {
    dtoUser: USER,
    errorMessages: ERROR_MESSAGES
  };

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [login] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result.data, result.data.login);
      if (result.data.login.trim() != '') {
        const expiration_date = new Date();

        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        setCookie('biz-comrade-token', result.data.login, { path: '/', expires: expiration_date });
        dispatch(setToken(result.data.login));
        router.push('/dashboard');
      }
    },
    onError(err: any) {
      console.log(JSON.stringify(err));
      if (err.message === 'Wrong Credentials') {
        setState({
          errorMessages: {
            ...state.errorMessages,
            password: 'Wrong Credentials'
          }
        } as StateType);
      }
    }
  });

  const onInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  const validateUserName = useCallback(async () => {
    if (state.dtoUser.user_name.trim() === '') {
      return 'Username is required';
    } else {
      return '';
    }
  }, [state.dtoUser.user_name]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({
      errorMessages: { ...state.errorMessages, user_name: user_name }
    } as StateType);
  }, [validateUserName, state.errorMessages]);

  const validatePassword = useCallback(async () => {
    if (state.dtoUser.password.trim() === '') {
      return 'Password is required';
    } else {
      return '';
    }
  }, [state.dtoUser.password]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({
      errorMessages: { ...state.errorMessages, password: password }
    } as StateType);
  }, [validatePassword, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
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
  }, [validateUserName, validatePassword]);

  const onLoginClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        login({
          variables: {
            user_name: state.dtoUser.user_name,
            password: state.dtoUser.password
          }
        });
      }
    },
    [validateForm, login, state.dtoUser.user_name, state.dtoUser.password]
  );

  return {
    state,
    onInputChange,
    onUserNameBlur,
    onPasswordBlur,
    onLoginClick,
    theme,
    matchDownSM
  };
};

export default useLogin;
