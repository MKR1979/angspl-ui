import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from '@/app/types/UserDTO';
import * as gConstants from '../../constants/constants';

import {
  ADD_USER,
  UPDATE_USER,
  GET_USER,
  GET_USER_EMAIL_EXIST,
  GET_USER_USER_NAME_EXIST,
  GET_USER_MOBILE_NO_EXIST,
  UPLOAD_USER_IMAGE
} from '@/app/graphql/User';
import { regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile_no: string | null;
  user_name: string | null;
  password: string | null;
  status: string | null;
  role_id: number | null;
  role_name: string | null;
  admission_id: number | null;
 };

type StateType = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
  open1: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
};

const useUserEntry = ({ dtoUser, arrRoleLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    email: null,
    mobile_no: null,
    user_name: null,
    password: null,
    status: null,
    role_id: null,
    role_name: null,
    admission_id: null,
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoUser: dtoUser,
    
    arrRoleLookup: arrRoleLookup,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
 
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addUser] = useMutation(ADD_USER, {});

  const [updateUser] = useMutation(UPDATE_USER, {});

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [singleUpload] = useMutation(UPLOAD_USER_IMAGE, {});

  const getData = useCallback(async (): Promise<void> => {
    let dtoUser: UserDTO = USER;
    const { error, data } = await getUser({
      variables: {
        id: state.dtoUser.id,
        }
    });
    if (!error && data) {
      dtoUser = data.getUser;
    }
    setState({ dtoUser: dtoUser } as StateType);
  }, [getUser, state.dtoUser.id]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserEMailExist({
      variables: {
        id: state.dtoUser.id,
        email: state.dtoUser.email
      }
    });
    if (!error && data) {
      exist = data.getUserEMailExist;
    }
    return exist;
  }, [getUserEMailExist, state.dtoUser.id, state.dtoUser.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserUserNameExist({
      variables: {
        id: state.dtoUser.id,
        user_name: state.dtoUser.user_name
      }
    });
    if (!error && data) {
      exist = data.getUserUserNameExist;
    }
    return exist;
  }, [getUserUserNameExist, state.dtoUser.id, state.dtoUser.user_name]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUserMobileNoExist({
      variables: {
        id: state.dtoUser.id,
        mobile_no: state.dtoUser.mobile_no
      }
    });
    if (!error && data) {
      exist = data.getUserMobileNoExist;
    }
    return exist;
  }, [getUserMobileNoExist, state.dtoUser.id, state.dtoUser.mobile_no]);

  useEffect(() => {
    if (state.dtoUser.id > 0) {
      getData();
    }
  }, [state.dtoUser.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.name === "admission_id" ? Number(event.target.value) : event.target.value
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  

  const onMobileNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          mobile_no: value
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  const onRoleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUser: { ...state.dtoUser, role_id: (value as LookupDTO).id, role_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoUser]
  );

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoUser.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoUser.first_name]);

  const validateRoleId = useCallback(async () => {
    if (state.dtoUser.role_name.trim() === '') {
      return 'Role Name is required';
    } else {
      return null;
    }
  }, [state.dtoUser.role_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoUser.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoUser.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoUser.email.trim() === '') {
      return 'E-Mail is required';
    } else if (!state.dtoUser.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.email, IsEMailExist]);

  const validateMobileNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoUser.mobile_no.trim())) {
      return 'Mobile # is invalid';
    } else if (await IsMobileNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.mobile_no, IsMobileNoExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoUser.user_name.trim() === '') {
      return 'Username is required';
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoUser.password.trim() === '') {
      return 'Password is required';
    }  
     else if (state.dtoUser.password.length < gConstants.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
    }
    else if (state.dtoUser.password.length > gConstants.PASSWORD_MAX_LENGTH) {
      return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
    }
    return null;
  
  }, [state.dtoUser.password]);

  const validateStatus = useCallback(async () => {
    if (state.dtoUser.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoUser.status]);

  const onFirstNameBlur = useCallback(async () =>
     {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

    const onRoleBlur = useCallback(async () =>
       {
        const role_name = await validateRoleId();
        setState({ errorMessages: { ...state.errorMessages, role_name: role_name } } as StateType);
      }, [validateRoleId, state.errorMessages]);
  

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

  const onStatusBlur = useCallback(async () =>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.role_name = await validateRoleId();
    if (errorMessages.role_name) {
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
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
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
    validateStatus,
    validateRoleId
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoUser.id === 0) {
          const { data } = await addUser({
            variables: { 
              first_name:state.dtoUser.first_name,
              last_name: state.dtoUser.last_name,
              email: state.dtoUser.email,
              mobile_no: state.dtoUser.mobile_no,
              user_name: state.dtoUser.user_name.replace(/\s+/g, ""),
              password: state.dtoUser.password,
              status: state.dtoUser.status,
              role_id: state.dtoUser.role_id,
              role_name: state.dtoUser.role_name,
              admission_id: state.dtoUser.admission_id,
            }
          });
          if (data) {
            router.push('/users/list');
          }
        } else {
          const { data } = await updateUser({
            variables: {
              id: state.dtoUser.id,
              first_name:state.dtoUser.first_name,
              last_name: state.dtoUser.last_name,
              email: state.dtoUser.email,
              mobile_no: state.dtoUser.mobile_no,
              user_name: state.dtoUser.user_name,
              password: state.dtoUser.password,
              status: state.dtoUser.status,
              role_id: state.dtoUser.role_id,
              role_name: state.dtoUser.role_name,
              admission_id: state.dtoUser.admission_id,
            }
          });
          if (data) {
            router.push('/users/list');
          }
        }
      }
    },
    [validateForm, addUser, state.dtoUser, router, updateUser]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoUser: { ...USER, id: state.dtoUser.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoUser.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/users/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const onImageError = useCallback(
    async (event: any) => {
      console.log(event);
      setState({ dtoUser: { ...state.dtoUser, image_url: '' } } as StateType);
    },
    [state.dtoUser]
  );
  const onImageClick = useCallback(async () => {
    document.getElementById('user_image')!.click();
  }, []);

  const UploadImage = useCallback(async () => {
    const files = (document.getElementById('user_image') as any)!.files;
    console.log(files);
    if (files.length == 0) {
      return;
    }
    const { data } = await singleUpload({
      variables: {
        files: files
      }
    });
    if (data) {
      setState({ dtoUser: { ...state.dtoUser, image_url: data.singleUpload[0].filename } } as StateType);
    }
  }, [singleUpload, state.dtoUser]);

  return {
    state,
    onInputChange,
    onMobileNoChange,
    onRoleNameChange,
    onSelectChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onRoleBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    onStatusBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    onImageError,
    onImageClick,
    UploadImage
  };
};

export default useUserEntry;
