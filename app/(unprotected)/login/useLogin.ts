import { useCallback, useReducer, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import * as constants from '../../constants/constants';
import User, { USER } from '../../types/UserDTO';
import SiteConfigDTO, { SITE_CONFIG } from '../../types/SiteConfigDTO';
import { LOGIN_USER, GET_USER_BY_USER_NAME } from '../../graphql/User';
import { setToken, setAdmissionId, setLoginUser,setCompanyInfo } from '../../store/slices/globalState';
import { useDispatch } from '@/app/store';
import { setSiteConfig } from '../../store/slices/globalState';
import { GET_SITE_CONFIG_By_COMPANY } from '@/app/graphql/SiteConfig';

type ErrorMessageType = {
  user_name: string | null;
  password: string | null;
};

type StateType = {
  dtoUser: User;
  dtoSiteConfig:SiteConfigDTO;
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
  const companyInfo= {
    company_id: 1,
    company_code: '',
    company_name: '',
    company_type: '',
    email: '',
    phone_no: '',
    address: '',
    status: ''
  }
  const INITIAL_STATE: StateType = {
    dtoUser: USER,
    dtoSiteConfig: SITE_CONFIG,
    errorMessages: ERROR_MESSAGES
  };
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getUserByUserName] = useLazyQuery(GET_USER_BY_USER_NAME, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getSiteConfigByCompanyId] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [login] = useMutation(LOGIN_USER, {
    update: async (proxy, result) => {
      const token = result?.data?.login?.trim();
      if (!token) return;

      // Set cookie with 1-year expiration
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      setCookie('Adhyayan-token', token, { path: '/', expires: expirationDate });

      // Store token in redux
      dispatch(setToken(token));
     
      // Fetch user details by username
      try {
        const { data } = await getUserByUserName({
          variables: {
            user_name: state.dtoUser.user_name
          }
        });

        const user = data?.getUserByUserName;
        const role = user?.role_name?.trim();
        const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
        dispatch(setLoginUser(fullName));
        if (role && role !== constants.STUDENT_ROLE) {
          router.push('/dashboard');
        } else {
          dispatch(setAdmissionId(user?.admission_id));
          router.push('/learning-dashboard');
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
      }   
        
    },    

    onError: (err: any) => {
      console.error(JSON.stringify(err));
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
  //dispatch(setCompanyInfo(companyInfo));

  const getSiteConfig = useCallback(async (): Promise<void> => {
      const { data } = await getSiteConfigByCompanyId({
        variables: {
          company_id: 1//state.dtoSiteConfig.company_id
        }
      });

   if ( data) {
        const siteConfigData = data.getSiteConfigByCompanyId;
       // Dispatch to Redux store
        dispatch(setSiteConfig({
            key: siteConfigData.key,
            value: siteConfigData.value,
            type: siteConfigData.type,
            description: siteConfigData.description
        }));
    }
  }, [getSiteConfigByCompanyId, dispatch]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  useEffect(() => {
    dispatch(setCompanyInfo(companyInfo));
  }, [dispatch]);
  
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
    async (event: React.SyntheticEvent) => {
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
  //
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
