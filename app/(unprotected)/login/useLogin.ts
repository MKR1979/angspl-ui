'use client';

import { useCallback, useReducer, useEffect, useState, ChangeEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import * as Constants from '../constants/constants';
import User, { USER } from '../../types/UserDTO';
import SiteConfigDTO, { SITE_CONFIG } from '../../types/SiteConfigDTO';
import CompanyInfoDTO, { COMPANY_INFO } from '../../types/CompanyInfoDTO';
import UserPermissionDTO, { USER_PERMISSION } from '../../types/UserPermissionDTO';
import { setToken, setCode, setLoginUser, setLoginUserId, setAffiliateId,setAdmissionId } from '../../store/slices/loginState';
import { setSiteConfig, setUserPermission } from '../../store/slices/siteConfigState';
import { setCompanyInfo } from '../../store/slices/globalState';
import { useDispatch, useSelector } from '@/app/store';
import { RootState } from '@/app/store';
import { LOGIN_USER, GET_USER_BY_USER_NAME } from '../../graphql/User';
import { GET_USER_PERMISSION_ALL } from '@/app/graphql/UserPermission';
import { GET_SITE_CONFIG_By_COMPANY } from '@/app/graphql/SiteConfig';
import { GET_COMPANY_INFO_BY_DOMAIN } from '@/app/graphql/Company';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '../../custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_name: string | null;
  password: string | null;
};

type StateType = {
  dtoUser: User;
  dtoSiteConfig: SiteConfigDTO;
  dtoUserPermission: UserPermissionDTO;
  dtoCompanyInfo: CompanyInfoDTO;
  errorMessages: ErrorMessageType;
};

const useLogin = () => {
  const [, setCookie] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  //const token = useSelector((state: RootState) => state.loginState.token);
  //const { siteConfig, userPermission } = useSelector((state: RootState) => state.siteConfigState);
  const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);

  const ERROR_MESSAGES: ErrorMessageType = {
    user_name: null,
    password: null
  };

  const INITIAL_STATE: StateType = {
    dtoUser: USER,
    dtoSiteConfig: SITE_CONFIG,
    dtoUserPermission: USER_PERMISSION,
    dtoCompanyInfo: COMPANY_INFO,
    errorMessages: ERROR_MESSAGES
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({
    ...state,
    ...action
  });
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [customHostName, setCustomHostName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const { company_id } = useSelector((state) => state.globalState);
  const [getUserPermissionAll] = useLazyQuery(GET_USER_PERMISSION_ALL, { fetchPolicy: 'network-only' });
  const [getUserByUserName] = useLazyQuery(GET_USER_BY_USER_NAME, { fetchPolicy: 'network-only' });
  const [getSiteConfigByCompanyId] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY, { fetchPolicy: 'network-only' });
  const [getCompanyInfoByDomain] = useLazyQuery(GET_COMPANY_INFO_BY_DOMAIN, { fetchPolicy: 'network-only' });

  const getCompanyInfo = useCallback(async () => {
    try {
      const { data } = await getCompanyInfoByDomain({ variables: { domain_name: customHostName } });

      if (!data?.getCompanyInfoByDomain) {
         showSnackbar(gMessageConstants.SNACKBAR_SERVER_ERROR, 'error');
        return;
      }

      const companyInfoData = data.getCompanyInfoByDomain;

      if (companyInfoData.status === 'In-active') {
        router.push('/company-inactive');
        return;
      }
      
      if (companyInfoData.status !== 'Active') {
        console.log('give me details of error please', companyInfoData.status, companyInfoData);
        router.push('/company-inactive');
        return;
      }

      dispatch(setCompanyInfo(companyInfoData));
    } catch (error) {
      console.error('Error fetching company info:', error);
      router.push('/system-alert');
    }
  }, [customHostName, dispatch, getCompanyInfoByDomain, router]);

  const getSiteConfig = useCallback(async () => {
    try {
      const { data } = await getSiteConfigByCompanyId({
        variables: { company_id: companyInfo.company_id }
      });
      if (data?.getSiteConfigByCompanyId) {
        dispatch(setSiteConfig(data.getSiteConfigByCompanyId));
      }
    } catch (error) {
      console.error('Error fetching site config:', error);
    }
  }, [dispatch, getSiteConfigByCompanyId, companyInfo.company_id]);

  const getUserPermission = useCallback(
    async (user_id: number) => {
      try {
        const { data } = await getUserPermissionAll({
          variables: { user_id }
        });

        if (data?.getUserPermissionAll) {
          dispatch(setUserPermission(data.getUserPermissionAll.userPermissions));
        }
      } catch (error) {
        console.error('Error fetching User Permission:', error);
      }
    },
    [dispatch, getUserPermissionAll]
  );

  const [login] = useMutation(LOGIN_USER, {
    update: async (_, result) => {
      const token = result?.data?.login?.trim();
      if (!token) return;

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      setCookie('Adhyayan-token', token, { path: '/', expires: expirationDate });
      setCookie('company_id', companyInfo.company_id?.toString() || '', {
        path: '/',
        expires: expirationDate
      });

      dispatch(setToken(token));

      try {
        const { data } = await getUserByUserName({
          variables: { user_name: state.dtoUser.user_name }
        });

        const user = data?.getUserByUserName;
        const role = user?.role_name?.trim()?.toLowerCase();
        const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();

        dispatch(setLoginUser(fullName));
        dispatch(setLoginUserId(user?.id));
        dispatch(setCode(user?.code));
        dispatch(setAffiliateId(user?.affiliate_id));
        dispatch(setAdmissionId(user?.admission_id));

        await getUserPermission(user?.id);

        if (role === Constants.STUDENT_ROLE) {
          router.push('/learning-dashboard');
        } else if (role === Constants.EMPLOYEE_ROLE) {
          router.push('/attendance/list');
        } else if (role === Constants.AFFILIATE_ROLE) {
          router.push('/affiliate-summary');
        } else if (role === Constants.ADMIN_ROLE) {
          router.push('/dashboard');
        } else {
          router.push('/system-alert');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    },
    onError: (err) => {
      console.error('Login error:', err);
      if (err.message === 'Wrong Credentials') {
        setState({
          errorMessages: {
            ...state.errorMessages,
            password: 'Wrong Credentials'
          }
        });
      }
    }
  });

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Remove all spaces and convert to lowercase
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();

      setState({
        dtoUser: {
          ...state.dtoUser,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value
        }
      });
    },
    [state.dtoUser]
  );

  const validateUserName = useCallback(async () => {
    return state.dtoUser.user_name.trim() === '' ? gMessageConstants.REQUIRED_FIELD : '';
  }, [state.dtoUser.user_name]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({
      errorMessages: { ...state.errorMessages, user_name }
    });
  }, [validateUserName, state.errorMessages]);

  const validatePassword = useCallback(async () => {
    return state.dtoUser.password.trim() === '' ? gMessageConstants.REQUIRED_FIELD : '';
  }, [state.dtoUser.password]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({
      errorMessages: { ...state.errorMessages, password }
    });
  }, [validatePassword, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isValid = true;
    const messages: ErrorMessageType = {
      user_name: await validateUserName(),
      password: await validatePassword()
    };

    if (messages.user_name) isValid = false;
    if (messages.password) isValid = false;

    setState({ errorMessages: messages });
    return isValid;
  }, [validateUserName, validatePassword]);

  const onLoginClick = useCallback(
    async (event?: React.SyntheticEvent) => {
      event?.preventDefault();
      const isValid = await validateForm();
      if (!isValid) return;
      setLoading(true); // start loading
      const variables: Record<string, any> = {
        user_name: state.dtoUser.user_name,
        password: state.dtoUser.password
      };
      try {
        await login({ variables });
      } finally {
        setLoading(false);
      }
    },
    [validateForm, login, state.dtoUser]
  );

  useEffect(() => {
    const hostname = window.location.hostname;
    const cleanHost = hostname.startsWith('www.') ? hostname.replace(/^www\./, '') : hostname;
    setCustomHostName(cleanHost);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCompanyInfo();
    };
    if (customHostName) {
      fetchData();
    }
  }, [customHostName, getCompanyInfo]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  return {
    state,
    companyInfo,
    matchDownSM,
    showPassword,
    setShowPassword,
    onNormalizedInputChange,
    onInputChange,
    onUserNameBlur,
    onPasswordBlur,
    onLoginClick,
    errorMessages: state.errorMessages,
    loading
  };
};

export default useLogin;
