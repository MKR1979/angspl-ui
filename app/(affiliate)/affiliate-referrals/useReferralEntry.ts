'use client';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import ReferralDTO, { REFERRAL } from '@/app/types/ReferralDTO';
import { ADD_REFERRAL, GET_REFERRAL } from '@/app/graphql/Referral';
import { useRouter } from 'next/navigation';
import { useSelector } from '../../store';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { regExEMail } from '@/app/common/Configuration';
import { arrProductInterest } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';

type ErrorMessageType = {
  referral_company_name: string | null;
  referral_date: string | null;
  contact_person: string | null;
  mobile_no: string | null;
  email: string | null;
  address: string | null;
  product_interest: string | null;
  requirement: string | null;
};

type StateType = {
  dtoReferral: ReferralDTO;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
  open1: boolean;
  arrProductInterestLookup: LookupDTO[];
};

type Props = {
  dtoReferral: ReferralDTO;
};

const useReferralEntry = ({ dtoReferral }: Props) => {
  const router = useRouter();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    referral_company_name: null,
    referral_date: null,
    contact_person: null,
    mobile_no: null,
    email: null,
    address: null,
    product_interest: null,
    requirement: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoReferral: dtoReferral,
    errorMessages: { ...ERROR_MESSAGES },
    isLoading: true,
    open1: false,
    arrProductInterestLookup: arrProductInterest
  } as StateType);

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addReferral] = useMutation(ADD_REFERRAL);
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [getReferral] = useLazyQuery(GET_REFERRAL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoReferral: ReferralDTO = REFERRAL;
      const { error, data } = await getReferral({
        variables: {
          id: state.dtoReferral.id
        }
      });
      if (!error && data) {
        dtoReferral = data.getReferral;
      }
      setState({ dtoReferral: dtoReferral } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getReferral, state.dtoReferral.id]);

  useEffect(() => {
    if (state.dtoReferral.id > 0) {
      getData();
    }
  }, [state.dtoReferral.id, getData]);

  const validateAddress = useCallback(async () => {
    if (state.dtoReferral.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const validateKeyRequirements = useCallback(async () => {
    if (state.dtoReferral.requirement.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.requirement]);

  const onKeyRequirementsBlur = useCallback(async () => {
    const requirement = await validateKeyRequirements();
    setState({ errorMessages: { ...state.errorMessages, requirement: requirement } } as StateType);
  }, [validateKeyRequirements, state.errorMessages]);

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          mobile_no: value
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const validateEMailId = useCallback(async () => {
    console.log('you are inimplementation',state.dtoReferral.email)
    if (state.dtoReferral.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoReferral.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoReferral.email]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoReferral.mobile_no.trim())) {
      return gMessageConstants.INVALID;
    } else {
      return null;
    }
  }, [state.dtoReferral.mobile_no]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () => {
    const mobile_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, mobile_no: mobile_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const validateReferralName = useCallback(async () => {
    if (state.dtoReferral.referral_company_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.referral_company_name]);

  const onReferralCompanyNameBlur = useCallback(async () => {
    const referral_company_name = await validateReferralName();
    setState({ errorMessages: { ...state.errorMessages, referral_company_name: referral_company_name } } as StateType);
  }, [validateReferralName, state.errorMessages]);

  const onProductInterestChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          product_interest: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const validateProductInterest = useCallback(async () => {
    if (state.dtoReferral?.product_interest.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral?.product_interest]);

  const onProductInterestBlur = useCallback(async () => {
    const product_interest = await validateProductInterest();
    setState({ errorMessages: { ...state.errorMessages, product_interest: product_interest } } as StateType);
  }, [validateProductInterest, state.errorMessages]);

  const validateContactPerson = useCallback(async () => {
    if (state.dtoReferral.contact_person.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.contact_person]);

  const onContactPersonBlur = useCallback(async () => {
    const contact_person = await validateContactPerson();
    setState({ errorMessages: { ...state.errorMessages, contact_person: contact_person } } as StateType);
  }, [validateContactPerson, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

    errorMessages.referral_company_name = await validateReferralName();
    if (errorMessages.referral_company_name) {
      isFormValid = false;
    }
    errorMessages.product_interest = await validateProductInterest();
    if (errorMessages.product_interest) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.mobile_no = await validatePhoneNo();
    if (errorMessages.mobile_no) {
      isFormValid = false;
    }
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    errorMessages.requirement = await validateKeyRequirements();
    if (errorMessages.requirement) {
      isFormValid = false;
    }
    errorMessages.contact_person = await validateContactPerson();
    if (errorMessages.contact_person) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateReferralName,
    validateEMailId,
    validatePhoneNo,
    validateAddress,
    validateKeyRequirements,
    validateContactPerson,
    validateProductInterest
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoReferral.id === 0) {
            const { data } = await addReferral({
              variables: {
                //  ...state.dtoReferral
                referral_company_name: state.dtoReferral.referral_company_name,
                referral_date: state.dtoReferral.referral_date,
                contact_person: state.dtoReferral.contact_person,
                mobile_no: state.dtoReferral.mobile_no,
                email: state.dtoReferral.email,
                address: state.dtoReferral.address,
                product_interest: state.dtoReferral.product_interest,
                requirement: state.dtoReferral.requirement,
                status: 'Created',
                referred_by: Number(loginUser_id)
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success'); // ✅ green snackbar
              router.push('/affiliate-referrals/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addReferral, state.dtoReferral, router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoReferral: { ...REFERRAL, id: state.dtoReferral.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoReferral.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/affiliate-referrals/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    onCancelClick,
    saving,
    onReferralCompanyNameBlur,
    onInputChange,
    onPhoneNoBlur,
    onEMailIdBlur,
    onPhoneNoChange,
    onKeyRequirementsBlur,
    onClearClick,
    onAddressBlur,
    onSaveClick,
    onContactPersonBlur,
    setOpen1,
    setClose1,
    onProductInterestChange,
    onProductInterestBlur,
    onNormalizedInputChange
  };
};

export default useReferralEntry;
