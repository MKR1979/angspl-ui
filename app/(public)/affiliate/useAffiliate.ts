import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AffiliateDTO, { AFFILIATE } from '@/app/types/AffiliateDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import {
  ADD_AFFILIATE,
  GET_AFFILIATE_EMAIL_EXIST,
  GET_AFFILIATE_USER_NAME_EXIST,
  GET_AFFILIATE_PHONE_NO_EXIST,
  UPLOAD_AFFILIATE_IMAGE
} from '@/app/graphql/Affiliate';
import { regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  user_name: string | null;
  password: string | null;
  address : string | null;
  city_name : string | null;
  state_id : string | null;
  state_name : string | null;
  country_id: number | null;
  country_name: number | null;
  zip_code : string | null;
  photo_id_url : string | null;
};

type StateType = {
  dtoAffiliate: AffiliateDTO;
  arrStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  errorMessages: ErrorMessageType;
};

const useAffiliate = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name:  null,
    last_name: null,
    email:  null,
    phone_no: null,
    user_name: null,
    password: null,
    address : null,
    city_name : null,
    state_id : null,
    state_name : null,
    country_id: null,
    country_name: null,
    zip_code : null,
    photo_id_url : null,
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAffiliate: AFFILIATE,
    arrStateLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addAffiliate] = useMutation(ADD_AFFILIATE, {});

  const [getAffiliateEMailExist] = useLazyQuery(GET_AFFILIATE_EMAIL_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAffiliateUserNameExist] = useLazyQuery(GET_AFFILIATE_USER_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getAffiliatePhoneNoExist] = useLazyQuery(GET_AFFILIATE_PHONE_NO_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [singleUpload] = useMutation(UPLOAD_AFFILIATE_IMAGE, {}); 

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
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
  }, [getAffiliateEMailExist, state.dtoAffiliate.id, state.dtoAffiliate.email]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
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
  }, [getAffiliateUserNameExist, state.dtoAffiliate.id, state.dtoAffiliate.user_name]);

  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

   const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
     fetchPolicy: 'network-only' // Doesn't check cache before making a network request
   });

  //----------Lookups---------
   const getData1 = useCallback(async (): Promise<void> => {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    }, [getCountryLookup]);

  
    const getData2 = useCallback(async (): Promise<void> => {
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
      }, [getStateLookup, state.dtoAffiliate.country_id]);

  //-------------------------
  const onInputChange = useCallback(
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

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
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
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAffiliate.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAffiliate.email.trim() === '') {
      return 'E-Mail is required';
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
      return 'Username is required';
    } else if (await IsUserNameExist()) {
      return 'Username already exists';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoAffiliate.password.trim() === '') {
      return 'Password is required';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.password]);

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
    validateUserName,
    validatePassword,
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      // if (await validateForm()) {
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
              zip_code: state.dtoAffiliate.zip_code,
              status: state.dtoAffiliate.status,
              photo_id_url: state.dtoAffiliate.photo_id_url,
            }
          });
          if (data) {
            // toast.success(constants.SUCCESS)
            router.push('/thankyou')
          }        
        } 
      //}
    },
    [validateForm, addAffiliate, state.dtoAffiliate, router, ]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/Affiliates/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoAffiliate.phone_no.trim())) {
      return 'Phone # is invalid';
    } else {
      return null;
    }
  }, [state.dtoAffiliate.phone_no]);  

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

  const onPhoneNoBlur = useCallback(async () =>
      {
        const phone_no = await validatePhoneNo();
        setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
      }, [validatePhoneNo, state.errorMessages]);
    
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

    const IsPhoneNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getAffiliatePhoneNoExist({
      variables: {
        id: state.dtoAffiliate.id,
        mobile_no: state.dtoAffiliate.phone_no
      }
    });
    if (!error && data) {
      exist = data.getAffiliatePhoneNoExist;
    }
    return exist;
  }, [getAffiliatePhoneNoExist, state.dtoAffiliate.id, state.dtoAffiliate.phone_no]);

  useEffect(() => {
    getData1();
  },[getData1]);

  useEffect(() => {
    getData2();
  },[getData2,state.dtoAffiliate.country_id]);

  return {
    state,
    onPasswordBlur,
    onUserNameBlur,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,   
    onSelectChange,
    onInputChange,
    onCountryNameChange,
    onStateNameChange,
    IsUserNameExist,
    IsEMailExist,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onPhoneNoChange,
    onPhoneNoBlur,
    IsPhoneNoExist,
    singleUpload,
    onSaveClick,
    onCancelClick,
    onImageClick
  };
}
export default useAffiliate;
