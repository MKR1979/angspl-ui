'use client';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';
import { useRouter } from 'next/navigation';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP, DISTRICT_LOOKUP } from '@/app/graphql/state';
import {
  ADD_AFFILIATE,
  GET_AFFILIATE,
  UPDATE_AFFILIATE,
  GET_AFFILIATE_EMAIL_EXIST,
  GET_AFFILIATE_USER_NAME_EXIST,
  GET_AFFILIATE_PHONE_NO_EXIST,
  UPLOAD_AFFILIATE_IMAGE
} from '@/app/graphql/Affiliate';
import { arrAffiliateStatus, capitalizeWords } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { regExEMail } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import { useSelector } from '../../../store';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  user_name: string | null;
  password: string | null;
  address: string | null;
  city_name: string | null;
  state_id: number | null;
  state_name: string | null;
  district_name: string | null;
  country_id: number | null;
  country_name: string | null;
  zip_code: string | null;
  status: string | null;
  photo_id_url: string | null;
  conversion_rate: number | null;
};

type StateType = {
  dtoAffiliate: AffiliateDTO;
  arrStateLookup: LookupDTO[];
  arrDistrictLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrAffiliateStatusLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  isEditMode: boolean;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
};

type Props = {
  dtoAffiliate: AffiliateDTO;
};

const useAffiliateEntry = ({ dtoAffiliate }: Props) => {
  const router = useRouter();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_no: null,
    user_name: null,
    password: null,
    address: null,
    city_name: null,
    state_id: null,
    state_name: null,
    district_name: null,
    country_id: null,
    country_name: null,
    zip_code: null,
    status: null,
    photo_id_url: null,
    conversion_rate: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAffiliate: dtoAffiliate,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    isEditMode: false,
    arrStateLookup: [] as LookupDTO[],
    arrDistrictLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    arrAffiliateStatusLookup: arrAffiliateStatus,
    errorMessages: { ...ERROR_MESSAGES },
    isLoading: true
  } as StateType);

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [emailCopy, setEmailCopy] = useState('');
  const [phoneCopy, setPhoneCopy] = useState('');
  const [userNameCopy, setUserNameCopy] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [addAffiliate] = useMutation(ADD_AFFILIATE);
  const [updateAffiliate] = useMutation(UPDATE_AFFILIATE);
  const [getAffiliate] = useLazyQuery(GET_AFFILIATE, { fetchPolicy: 'network-only' });
  const [getAffiliateEMailExist] = useLazyQuery(GET_AFFILIATE_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getAffiliateUserNameExist] = useLazyQuery(GET_AFFILIATE_USER_NAME_EXIST, { fetchPolicy: 'network-only' });
  const [getAffiliatePhoneNoExist] = useLazyQuery(GET_AFFILIATE_PHONE_NO_EXIST, { fetchPolicy: 'network-only' });
  const [singleUpload] = useMutation(UPLOAD_AFFILIATE_IMAGE, {});
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getDistrictLookup] = useLazyQuery(DISTRICT_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrAffiliateStatusLookup.length > 0 &&
      !state.dtoAffiliate.status
    ) {
      const firstItem = state.arrAffiliateStatusLookup[0];
      setState({
        ...state,
        dtoAffiliate: {
          ...state.dtoAffiliate,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrAffiliateStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAffiliate: AffiliateDTO = AFFILIATE;
      const { error, data } = await getAffiliate({
        variables: {
          id: state.dtoAffiliate.id
        }
      });
      if (!error && data) {
        dtoAffiliate = data.getAffiliate;
      }
      setPhoneCopy(data.getAffiliate.phone_no);
      setEmailCopy(data.getAffiliate.email);
      setUserNameCopy(data.getAffiliate.user_name);
      setState({ dtoAffiliate: dtoAffiliate } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAffiliate, state.dtoAffiliate?.id]);

  useEffect(() => {
    if (state.dtoAffiliate?.id > 0) {
      getData();
    }
  }, [state.dtoAffiliate?.id, getData]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && userNameCopy.trim() === state.dtoAffiliate.user_name.trim()) {
      return false;
    }
    let exist: boolean = false;
    const { error, data } = await getAffiliateUserNameExist({
      variables: {
        id: state.dtoAffiliate.id,
        user_name: state.dtoAffiliate.user_name
      }
    });
    if (!error && data) {
      exist = data.getAffiliateUserNameExist;
    }
    return exist;
  }, [getAffiliateUserNameExist, state.dtoAffiliate?.id, state.dtoAffiliate?.user_name, isEditMode, userNameCopy]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && emailCopy.trim() === state.dtoAffiliate.email.trim()) {
      return false;
    }
    let exist: boolean = false;
    const { error, data } = await getAffiliateEMailExist({
      variables: {
        id: state.dtoAffiliate.id,
        email: state.dtoAffiliate.email
      }
    });
    if (!error && data) {
      exist = data.getAffiliateEMailExist;
    }
    return exist;
  }, [getAffiliateEMailExist, state.dtoAffiliate?.id, state.dtoAffiliate?.email, isEditMode, emailCopy]);

  const IsPhoneNoExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && phoneCopy.trim() === state.dtoAffiliate.phone_no.trim()) {
      return false;
    }
    let exist: boolean = false;
    const { error, data } = await getAffiliatePhoneNoExist({
      variables: {
        id: state.dtoAffiliate.id,
        phone_no: state.dtoAffiliate.phone_no
      }
    });
    if (!error && data) {
      exist = data.getAffiliatePhoneNoExist;
    }
    return exist;
  }, [getAffiliatePhoneNoExist, state.dtoAffiliate.id, state.dtoAffiliate.phone_no, phoneCopy, isEditMode]);

  //----------Lookups---------
  const getCountry = useCallback(async (): Promise<void> => {
    try {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCountryLookup]);

  const getState = useCallback(async (): Promise<void> => {
    try {
      let arrStateLookup: LookupDTO[] = [];
      const { error, data } = await getStateLookup({
        variables: {
          country_id: state.dtoAffiliate.country_id
        }
      });
      if (!error && data) {
        arrStateLookup = data.getStateLookup;
      }
      setState({ arrStateLookup: arrStateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getStateLookup, state.dtoAffiliate.country_id]);

  const getDistrict = useCallback(async (): Promise<void> => {
    try {
      let arrDistrictLookup: LookupDTO[] = [];
      const { error, data } = await getDistrictLookup({
        variables: {
          state_id: state.dtoAffiliate.state_id
        }
      });
      if (!error && data) {
        arrDistrictLookup = data.getDistrictLookup;
      }
      setState({ arrDistrictLookup: arrDistrictLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getDistrictLookup, state.dtoAffiliate.state_id]);

  useEffect(() => {
    getCountry();
  }, [getCountry]);

  useEffect(() => {
    getState();
  }, [getState, state.dtoAffiliate?.country_id]);

  useEffect(() => {
    getDistrict();
  }, [getDistrict, state.dtoAffiliate?.state_id]);
  //-------------------------
  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoAffiliate.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAffiliate.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAffiliate.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoAffiliate.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.email, IsEMailExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoAffiliate.user_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoAffiliate.password.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.password]);

  const validateAddress = useCallback(async () => {
    if (state.dtoAffiliate.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.address]);

  const validateCityName = useCallback(async () => {
    if (state.dtoAffiliate.city_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.city_name]);

  const validateZipCode = useCallback(async () => {
    const zip = state.dtoAffiliate.zip_code.trim();
    if (zip === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (zip.length < gConstants.ZIP_CODE_LENGTH) {
      return gMessageConstants.INVALID;
    }
    const isRepeatingDigits = /^(\d)\1{5}$/.test(zip);
    if (isRepeatingDigits) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoAffiliate.zip_code]);

  // const onConversionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

  //   if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
  //     onInputChange({
  //       ...e,
  //       target: { ...e.target, value: digitsOnly, name: 'conversion_rate' }
  //     });
  //   }
  // };

  const onConversionRateChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]?.length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    const numVal = parseFloat(value);
    if (!isNaN(numVal) && numVal > Constants.CONVERSION_RATE_HIGHEST) {
      value = Constants.CONVERSION_RATE_HIGHEST_STRING;
    }
    // Respect max length rule (max 5 chars → "10.00")
    if (value.length <= 5) {
      onInputChange({
        ...e,
        target: { ...e.target, value, name: fieldName }
      });
    }
  };

  const validateConversionRate = useCallback(async () => {
    if (state.dtoAffiliate.conversion_rate == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate.conversion_rate]);


  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Remove all spaces and convert to lowercase
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();

      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

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

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUserName();
    setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () => {
    const password = await validatePassword();
    setState({ errorMessages: { ...state.errorMessages, password: password } } as StateType);
  }, [validatePassword, state.errorMessages]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const onCityNameBlur = useCallback(async () => {
    const city_name = await validateCityName();
    setState({ errorMessages: { ...state.errorMessages, city_name: city_name } } as StateType);
  }, [validateCityName, state.errorMessages]);

  const onZipCodeBlur = useCallback(async () => {
    const zip_code = await validateZipCode();
    setState({ errorMessages: { ...state.errorMessages, zip_code: zip_code } } as StateType);
  }, [validateZipCode, state.errorMessages]);

  const onConversionRateBlur = useCallback(async () => {
    const conversion_rate = await validateConversionRate();
    setState({ errorMessages: { ...state.errorMessages, conversion_rate: conversion_rate } } as StateType);
  }, [validateConversionRate, state.errorMessages]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoAffiliate.phone_no.trim())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsPhoneNoExist()) {
      return 'Mobile # already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.phone_no, IsPhoneNoExist]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onImageClick = useCallback(async () => {
    document.getElementById('user_image')!.click();
  }, []);

  const onCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAffiliate: { ...state.dtoAffiliate, country_id: (value as LookupDTO).id, country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAffiliate: { ...state.dtoAffiliate, state_id: (value as LookupDTO).id, state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const onDistrictChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAffiliate: { ...state.dtoAffiliate, district_id: (value as LookupDTO).id, district_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const validateDistrictName = useCallback(async () => {
    if (state.dtoAffiliate.district_name.trim() === '') {
      return 'District Name is Required';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.district_name]);

  const onDistrictBlur = useCallback(async () => {
    const district_name = await validateDistrictName();
    setState({ errorMessages: { ...state.errorMessages, district_name: district_name } } as StateType);
  }, [validateDistrictName, state.errorMessages]);

  const onZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'zip_code' }
      });
    }
  };

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAffiliate: {
          ...state.dtoAffiliate,
          status: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoAffiliate]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoAffiliate?.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAffiliate?.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

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
    errorMessages.phone_no = await validatePhoneNo();
    if (errorMessages.phone_no) {
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
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    errorMessages.zip_code = await validateZipCode();
    if (errorMessages.zip_code) {
      isFormValid = false;
    }
    errorMessages.city_name = await validateCityName();
    if (errorMessages.city_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateEMailId,
    validateLastName,
    validatePhoneNo,
    validateUserName,
    validateAddress,
    validatePassword,
    validateCityName,
    validateZipCode,
    validateFirstName,
    validateStatus
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoAffiliate.id === 0) {
            const { data } = await addAffiliate({
              variables: {
                first_name: state.dtoAffiliate.first_name,
                last_name: state.dtoAffiliate.last_name,
                email: state.dtoAffiliate.email,
                phone_no: state.dtoAffiliate.phone_no,
                user_name: state.dtoAffiliate.user_name,
                password: state.dtoAffiliate.password,
                address: state.dtoAffiliate.address,
                city_name: state.dtoAffiliate.city_name,
                country_id: state.dtoAffiliate.country_id,
                state_id: state.dtoAffiliate.state_id,
                district_id: state.dtoAffiliate.district_id,
                zip_code: state.dtoAffiliate.zip_code,
                status: state.dtoAffiliate.status,
                photo_id_url: state.dtoAffiliate.photo_id_url,
                role_id: gConstants.AFFILIATE_ROLE_ID,
                conversion_rate: Number(state.dtoAffiliate.conversion_rate)
              }
            });

            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list`);
            }
          } else {
            const { data } = await updateAffiliate({
              variables: {
                id: state.dtoAffiliate.id,
                first_name: state.dtoAffiliate.first_name,
                last_name: state.dtoAffiliate.last_name,
                email: state.dtoAffiliate.email,
                phone_no: state.dtoAffiliate.phone_no,
                user_name: state.dtoAffiliate.user_name,
                password: state.dtoAffiliate.password,
                address: state.dtoAffiliate.address,
                city_name: state.dtoAffiliate.city_name,
                country_id: state.dtoAffiliate.country_id,
                state_id: state.dtoAffiliate.state_id,
                district_id: state.dtoAffiliate.district_id,
                zip_code: state.dtoAffiliate.zip_code,
                status: state.dtoAffiliate.status,
                photo_id_url: state.dtoAffiliate.photo_id_url,
                role_id: gConstants.AFFILIATE_ROLE_ID,
                conversion_rate: Number(state.dtoAffiliate.conversion_rate)
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving profile:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [addAffiliate, state.dtoAffiliate, updateAffiliate, router, validateForm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list`);
    },
    [router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoAffiliate: { ...AFFILIATE, id: state.dtoAffiliate.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoAffiliate.id, ERROR_MESSAGES]
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
  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);
  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);

  return {
    state,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    saving,
    showPassword,
    setShowPassword,
    onInputChange,
    onClearClick,
    onSaveClick,
    onPhoneNoBlur,
    onPhoneNoChange,
    onEMailIdBlur,
    onAddressBlur,
    onStatusChange,
    onStatusBlur,
    onPasswordBlur,
    onUserNameBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onCountryNameChange,
    onStateNameChange,
    IsPhoneNoExist,
    singleUpload,
    onImageClick,
    onCityNameBlur,
    onZipCodeBlur,
    onZipCodeChange,
    validatePhoneNo,
    onConversionRateBlur,
    onConversionRateChange,
    onPlainInputChange,
    onDistrictChange,
    onNormalizedInputChange,
    onDistrictBlur
  };
};

export default useAffiliateEntry;
