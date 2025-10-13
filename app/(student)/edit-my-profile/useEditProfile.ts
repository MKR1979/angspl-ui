import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from '@/app/types/UserDTO';
import { GET_USER_MY_PROFILE, GET_USER_EMAIL_EXIST, GET_USER_MOBILE_NO_EXIST, UPLOAD_USER_IMAGE, UPDATE_USER } from '@/app/graphql/User';
import { regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useSelector } from '../../store';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile_no: string | null;
  status: string | null;
};

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
  dtoUser: UserDTO;
  isEditMode: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoUser: UserDTO;
};

const useEditProfile = ({ dtoUser }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    email: null,
    mobile_no: null,
    status: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Edit Profile' }],
    dtoUser: dtoUser,
    isEditMode: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [emailCopy, setEmailCopy] = useState('');
  const [phoneCopy, setPhoneCopy] = useState('');
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, { fetchPolicy: 'network-only' });
  const [updateUserProfile] = useMutation(UPDATE_USER, {});
  const [getUserEMailExist] = useLazyQuery(GET_USER_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getUserMobileNoExist] = useLazyQuery(GET_USER_MOBILE_NO_EXIST, { fetchPolicy: 'network-only' });
  const [singleUpload] = useMutation(UPLOAD_USER_IMAGE, {});

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUser: UserDTO = USER;
      const { error, data } = await getUserMyProfile();
      if (!error && data) {
        dtoUser = data.getUserMyProfile;
      }
      setEmailCopy(data.getUserMyProfile.email);
      setPhoneCopy(data.getUserMyProfile.mobile_no);
      setState({ dtoUser: dtoUser } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserMyProfile]);

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
  }, [getUserMobileNoExist, state.dtoUser.id, state.dtoUser.mobile_no, phoneCopy, isEditMode]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onInputChange = useCallback(
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

  const onPhoneNoChange = useCallback(
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
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoUser.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoUser.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
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
      return 'Invalid mobile number';
    } else if (await IsMobileNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoUser.mobile_no, IsMobileNoExist]);

  const validateStatus = useCallback(async () => {
    if (state.dtoUser.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUser.status]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

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

  const onStatusBlur = useCallback(async () => {
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
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [ERROR_MESSAGES, validateFirstName, validateLastName, validateEMailId, validateMobileNo, validateStatus]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          const { data } = await updateUserProfile({
            variables: {
              ...state.dtoUser
            }
          });
          if (data) {
            showSnackbar(gMessageConstants.SNACKBAR_UPDATE_PROFILE, 'success');
            router.push('/my-profile');
          }
        }
      } catch (error: any) {
        console.error('Error while saving profile:', error);
        showSnackbar(gMessageConstants.SNACKBAR_PROFILE_UPDATE_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, state.dtoUser, router, updateUserProfile]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/my-profile');
    },
    [router]
  );

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
    onSelectChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onMobileNoBlur,
    onStatusBlur,
    onSaveClick,
    onCancelClick,
    onImageError,
    onImageClick,
    UploadImage,
    onPhoneNoChange,
    saving,
    onNormalizedInputChange
  };
};

export default useEditProfile;
