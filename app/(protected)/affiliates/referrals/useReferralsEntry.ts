'use client';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import ReferralDTO, { REFERRAL } from '@/app/types/ReferralDTO';
import { ADD_REFERRAL, GET_REFERRAL, UPDATE_REFERRAL } from '@/app/graphql/Referral';
import { useRouter } from 'next/navigation';
import { arrProductInterest, arrReferralStatus } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { regExEMail, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSelector } from '../../../store';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_id: number | null;
  referral_company_name: string | null;
  referral_date: string | null;
  contact_person: string | null;
  mobile_no: string | null;
  email: string | null;
  address: string | null;
  product_interest: string | null;
  requirement: string | null;
  status: string | null;
  referred_by: number | null;
  received_amount: number | null;
};

type StateType = {
  dtoReferral: ReferralDTO;
  arrProductInterestLookup: LookupDTO[];
  arrReferralStatusLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  isEditMode: boolean;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
};

type Props = {
  dtoReferral: ReferralDTO;
};

const useReferralEntry = ({ dtoReferral }: Props) => {
  const router = useRouter();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    referral_company_name: null,
    referral_date: null,
    contact_person: null,
    mobile_no: null,
    email: null,
    address: null,
    product_interest: null,
    requirement: null,
    status: null,
    referred_by: null,
    received_amount: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoReferral: dtoReferral,
    open1: false,
    open2: false,
    open3: false,
    isEditMode: false,
    arrProductInterestLookup: arrProductInterest,
    arrReferralStatusLookup: arrReferralStatus,
    arrUserLookup: [] as LookupDTO[],
    errorMessages: { ...ERROR_MESSAGES },
    isLoading: true
  } as StateType);

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addReferral] = useMutation(ADD_REFERRAL);
  const [updateReferral] = useMutation(UPDATE_REFERRAL);
  const [getReferral] = useLazyQuery(GET_REFERRAL, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (state.arrReferralStatusLookup.length > 0 && !state.dtoReferral.status) {
      const firstItem = state.arrReferralStatusLookup[0];
      setState({
        ...state,
        dtoReferral: {
          ...state.dtoReferral,
          status: firstItem.text
        }
      });
    }
  }, [state.arrReferralStatusLookup]);

  const getUserList = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup({
        variables: {
          type_name: gMessageConstants.AFFILIATE_TYPE_NAME
        }
      });
      if (!error && data?.getUserLookup) {
        arrUserLookup = [...data.getUserLookup];
      }
      setState({ arrUserLookup: arrUserLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      const id = state.dtoReferral?.id;
      if (!Number.isInteger(id) || id <= 0) return;
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
  }, [getReferral, state.dtoReferral?.id]);

  useEffect(() => {
    if (state.dtoReferral?.id > 0) {
      getData();
    }
  }, [state.dtoReferral?.id, getData]);

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

  const validateReferredBy = useCallback(async () => {
    if (state.dtoReferral.referred_by == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.referred_by]);

  const onReferredByBlur = useCallback(async () => {
    const referred_by = await validateReferredBy();
    setState({ errorMessages: { ...state.errorMessages, referred_by: referred_by } } as StateType);
  }, [validateReferredBy, state.errorMessages]);

  const validateReceivedAmount = useCallback(async () => {
    if (state.dtoReferral.received_amount == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral.received_amount]);

  const onReceivedAmtBlur = useCallback(async () => {
    const received_amount = await validateReceivedAmount();
    setState({ errorMessages: { ...state.errorMessages, received_amount: received_amount } } as StateType);
  }, [validateReceivedAmount, state.errorMessages]);

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

  const onReferredByChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const validateEMailId = useCallback(async () => {
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
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoReferral: {
          ...state.dtoReferral,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const onPlainInputChange = useCallback(
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

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      const newStatus = (value as LookupDTO)?.text ?? '';
      const currentStatus = state.dtoReferral?.status || 'Created';
      // If already Rejected → only allow Created
      if (currentStatus === 'Rejected') {
        if (newStatus === 'Created') {
          setState({
            dtoReferral: {
              ...state.dtoReferral,
              status: newStatus
            }
          } as StateType);
        } else {
          setState({
            ...state,
            errorMessages: {
              ...state.errorMessages,
              status: 'Once Rejected, you can only reset back to Created.'
            }
          } as StateType);
        }
        return;
      }
      const currentIndex = state.arrReferralStatusLookup.findIndex(
        (s) => s.text === currentStatus
      );
      const nextAllowed =
        currentIndex !== -1
          ? state.arrReferralStatusLookup[currentIndex + 1]?.text
          : null;
      // Allowed if: next or Rejected
      if (newStatus === nextAllowed || newStatus === 'Rejected') {
        setState({
          dtoReferral: {
            ...state.dtoReferral,
            status: newStatus
          }
        } as StateType);
      } else {
        setState({
          ...state,
          errorMessages: {
            ...state.errorMessages,
            status: 'Please select the next status in sequence or choose Rejected.'
          }
        } as StateType);
      }
    },
    [state.dtoReferral, state.arrReferralStatusLookup, state.errorMessages]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoReferral?.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoReferral?.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

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

  const onDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const localDateTime = new Date(event.target.value);
      const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);
      setState({
        ...state,
        dtoReferral: {
          ...state.dtoReferral,
          [event.target.name]: utcDateTime.toISOString()
        }
      });
    },
    [state]
  );

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
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
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
    validateProductInterest,
    validateStatus
  ]);

  const extractIdFromUsername = (userName: string): number | null => {
    const match = userName.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : null;
  };

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
                status: state.dtoReferral.status,
                referred_by: extractIdFromUsername(state.dtoReferral.user_name)
              }
            });

            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list`);
            }
          } else {
            const { data } = await updateReferral({
              variables: {
                id: state.dtoReferral.id,
                referral_company_name: state.dtoReferral.referral_company_name,
                referral_date: state.dtoReferral.referral_date,
                contact_person: state.dtoReferral.contact_person,
                mobile_no: state.dtoReferral.mobile_no,
                email: state.dtoReferral.email,
                address: state.dtoReferral.address,
                product_interest: state.dtoReferral.product_interest,
                requirement: state.dtoReferral.requirement,
                status: state.dtoReferral.status,
                // referred_by: extractIdFromUsername(state.dtoReferral.user_name),
                referred_by: state.dtoReferral.referred_by,
                received_amount: Number(state.dtoReferral.received_amount) || 0
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list`);
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
    [addReferral, state.dtoReferral, updateReferral, router, validateForm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list`);
    },
    [router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoReferral: { ...REFERRAL, id: state.dtoReferral.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoReferral.id, ERROR_MESSAGES]
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

  return {
    state,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    saving,
    onInputChange,
    onPlainInputChange,
    onDateChange,
    onClearClick,
    onSaveClick,
    onReferralCompanyNameBlur,
    onContactPersonBlur,
    onPhoneNoBlur,
    onPhoneNoChange,
    onEMailIdBlur,
    onKeyRequirementsBlur,
    onProductInterestBlur,
    onProductInterestChange,
    // getAllowedStatuses,
    onAddressBlur,
    onReferredByBlur,
    onStatusChange,
    onStatusBlur,
    onReferredByChange,
    onReceivedAmtBlur,
    isEditMode,
    onNormalizedInputChange
  };
};

export default useReferralEntry;
