import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from '@/app/types/UserDTO';
import {
  ADD_USER,
  UPDATE_USER,
  GET_USER,
  GET_USER_EMAIL_EXIST,
  GET_USER_USER_NAME_EXIST,
  GET_USER_MOBILE_NO_EXIST,
  UPLOAD_USER_IMAGE
} from '@/app/graphql/User';
import { regExEMail, capitalizeWords } from '@/app/common/Configuration';
// import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { useSelector } from '../../store';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { ROLE_LOOKUP } from '@/app/graphql/Role';
import { TYPE_LOOKUP } from '@/app/graphql/Type';
import * as gConstants from '../../constants/constants';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus } from '@/app/common/Configuration';

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
  code: string | null;
  type_id: number | null;
  type_name: string | null;
};

type StateType = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
  arrTypeLookup: LookupDTO[];
  arrUserStatusLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  isEditMode: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
  arrTypeLookup: LookupDTO[];
};

const useUserEntry = ({ dtoUser, arrRoleLookup, arrTypeLookup }: Props) => {
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
    code: null,
    type_id: null,
    type_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoUser: dtoUser,
    arrRoleLookup: arrRoleLookup,
    arrTypeLookup: arrTypeLookup,
    arrUserStatusLookup: arrModulesStatus,
    open1: false,
    open2: false,
    open3: false,
    isEditMode: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [emailCopy, setEmailCopy] = useState('');
  const [phoneCopy, setPhoneCopy] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userNameCopy, setUserNameCopy] = useState('');
  const showSnackbar = useSnackbar();
  const [addUser] = useMutation(ADD_USER, {});
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [updateUser] = useMutation(UPDATE_USER, {});
  const [getUser] = useLazyQuery(GET_USER, { fetchPolicy: 'network-only' });
  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getUserUserNameExist] = useLazyQuery(GET_USER_USER_NAME_EXIST, { fetchPolicy: 'network-only' });
  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, { fetchPolicy: 'network-only' });
  const [getRoleLookup] = useLazyQuery(ROLE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getTypeLookup] = useLazyQuery(TYPE_LOOKUP, { fetchPolicy: 'network-only' });
  const [singleUpload] = useMutation(UPLOAD_USER_IMAGE, {});

  useEffect(() => {
    if (
      state.arrUserStatusLookup.length > 0 &&
      !state.dtoUser.status
    ) {
      const firstItem = state.arrUserStatusLookup[0];
      setState({
        ...state,
        dtoUser: {
          ...state.dtoUser,
          status: firstItem.text,
        }
      });
    }
  }, [state.arrUserStatusLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
    try {
      let arrRoleLookup: LookupDTO[] = [];
      const { error, data } = await getRoleLookup();
      if (!error && data) {
        arrRoleLookup = data.getRoleLookup;
      }
      setState({ arrRoleLookup: arrRoleLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRoleLookup]);

  const getUserType = useCallback(async (): Promise<void> => {
    try {
      let arrTypeLookup: LookupDTO[] = [];
      const { error, data } = await getTypeLookup();
      if (!error && data) {
        arrTypeLookup = data.getTypeLookup;
      }
      setState({ arrTypeLookup: arrTypeLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getTypeLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUser: UserDTO = USER;
      const { error, data } = await getUser({
        variables: {
          id: state.dtoUser.id
        }
      });
      if (!error && data) {
        dtoUser = data.getUser;
      }
      setEmailCopy(data.getUser.email);
      setPhoneCopy(data.getUser.mobile_no);
      setUserNameCopy(data.getUser.user_name);
      setState({ dtoUser: dtoUser } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUser, state.dtoUser.id]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && userNameCopy.trim() === state.dtoUser.user_name.trim()) {
      return false;
    }
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
  }, [getUserUserNameExist, state.dtoUser.id, state.dtoUser.user_name, isEditMode, userNameCopy]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && emailCopy.trim() === state.dtoUser.email.trim()) {
      return false;
    }
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
  }, [getUserEMailExist, state.dtoUser.id, state.dtoUser.email, isEditMode, emailCopy]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && phoneCopy.trim() === state.dtoUser.mobile_no.trim()) {
      return false;
    }
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
  }, [getUserMobileNoExist, state.dtoUser.id, state.dtoUser.mobile_no, isEditMode, phoneCopy]);

  useEffect(() => {
    getData1();
    getUserType();
    if (state.dtoUser.id > 0) {
      getData();
    }
  }, [state.dtoUser.id, getData]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoUser]
  );

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
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoUser: {
          ...state.dtoUser,
          [name]: capitalizedValue
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

  const onTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUser: { ...state.dtoUser, type_id: (value as LookupDTO).id, type_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoUser]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoUser.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.first_name]);

  const validateRoleId = useCallback(async () => {
    if (state.dtoUser.role_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.role_name]);

  const validateTypeId = useCallback(async () => {
    if (state.dtoUser.type_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.type_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoUser.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.last_name]);

  // const validateEMailId = useCallback(async () => {
  //   if (state.dtoUser.email.trim() === '') {
  //     return 'E-Mail is required';
  //   } else if (!state.dtoUser.email.trim().match(regExEMail)) {
  //     return 'E-Mail is invalid';
  //   } else if (await IsEMailExist()) {
  //     return 'E-Mail already exists';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoUser.email, IsEMailExist]);

  const validateEMailId = useCallback(async () => {
    const email = state.dtoUser.email.trim();
    if (email === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!regExEMail.test(email)) {
      return 'E-Mail is invalid';
    } else {
      const domain = email.split('@')[1];
      const parts = domain.split('.');
      const last = parts[parts.length - 1];
      if (last.length < 2 || last.length > 6) {
        return 'E-Mail is invalid';
      }
      const repeatCount = parts.filter((p) => p === last).length;
      if (repeatCount > 2) {
        return 'E-Mail is invalid';
      }
    }
    if (await IsEMailExist()) {
      return 'E-Mail already exists';
    }
    return null;
  }, [state.dtoUser.email, IsEMailExist]);

  const validateMobileNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoUser.mobile_no.trim())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsMobileNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.mobile_no, IsMobileNoExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoUser.user_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoUser.password.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (state.dtoUser.password.length < gConstants.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${gConstants.PASSWORD_MIN_LENGTH} characters.`;
    } else if (state.dtoUser.password.length > gConstants.PASSWORD_MAX_LENGTH) {
      return `Password must be no more than ${gConstants.PASSWORD_MAX_LENGTH} characters.`;
    }
    return null;
  }, [state.dtoUser.password]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoUser]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoUser.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const onRoleBlur = useCallback(async () => {
    const role_name = await validateRoleId();
    setState({ errorMessages: { ...state.errorMessages, role_name: role_name } } as StateType);
  }, [validateRoleId, state.errorMessages]);

  const onTypeBlur = useCallback(async () => {
    const type_name = await validateTypeId();
    setState({ errorMessages: { ...state.errorMessages, type_name: type_name } } as StateType);
  }, [validateTypeId, state.errorMessages]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const onMobileNoBlur = useCallback(async () => {
    const mobile_no = await validateMobileNo();
    setState({ errorMessages: { ...state.errorMessages, mobile_no: mobile_no } } as StateType);
  }, [validateMobileNo, state.errorMessages]);

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () => {
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
    errorMessages.role_name = await validateRoleId();
    if (errorMessages.role_name) {
      isFormValid = false;
    }
    errorMessages.type_name = await validateTypeId();
    if (errorMessages.type_name) {
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
    validateRoleId,
    validateTypeId
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoUser.id === 0) {
            const { data } = await addUser({
              variables: {
                first_name: state.dtoUser.first_name,
                last_name: state.dtoUser.last_name,
                email: state.dtoUser.email,
                mobile_no: state.dtoUser.mobile_no,
                user_name: state.dtoUser.user_name.replace(/\s+/g, ''),
                password: state.dtoUser.password,
                status: state.dtoUser.status,
                role_id: state.dtoUser.role_id,
                role_name: state.dtoUser.role_name,
                code: state.dtoUser.code,
                type_id: state.dtoUser.type_id,
                type_name: state.dtoUser.type_name
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/users/list');
            }
          } else {
            const { data } = await updateUser({
              variables: {
                id: state.dtoUser.id,
                first_name: state.dtoUser.first_name,
                last_name: state.dtoUser.last_name,
                email: state.dtoUser.email,
                mobile_no: state.dtoUser.mobile_no,
                user_name: state.dtoUser.user_name,
                password: state.dtoUser.password,
                status: state.dtoUser.status,
                role_id: state.dtoUser.role_id,
                role_name: state.dtoUser.role_name,
                code: state.dtoUser.code,
                type_id: state.dtoUser.type_id,
                type_name: state.dtoUser.type_name
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/users/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
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

  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
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
    state, isEditMode,
    onInputChange,
    onStatusChange,
    onPlainInputChange,
    onMobileNoChange,
    onRoleNameChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onRoleBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    onStatusBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onImageError,
    onImageClick,
    UploadImage,
    saving,
    onTypeChange,
    onTypeBlur,
    onNormalizedInputChange
  };
};

export default useUserEntry;
