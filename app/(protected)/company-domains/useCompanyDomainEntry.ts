import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CompanyDomainDTO, { COMPANY_DOMAIN } from '@/app/types/CompanyDomainDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCompanyDomainStatus } from '@/app/common/Configuration';
import { ADD_COMPANY_DOMAIN, UPDATE_COMPANY_DOMAIN, GET_COMPANY_DOMAIN } from '@/app/graphql/CompanyDomain';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';

type ErrorMessageType = {
  company_id: string | null;
  domain_name: string | null;
  company_name: string | null;
  logo_url: string | null;
  logo_height: string | null;
  logo_width: string | null;
  status: string | null;
};

type StateType = {
  dtoCompanyDomain: CompanyDomainDTO;
  arrCompanyLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  arrCompanyDomainStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCompanyDomain: CompanyDomainDTO;
  arrCompanyLookup: LookupDTO[];
};

const useCompanyDomainEntry = ({ dtoCompanyDomain, arrCompanyLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    company_id: null,
    domain_name: null,
    company_name: null,
    logo_url: null,
    logo_height: null,
    logo_width: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCompanyDomain: dtoCompanyDomain,
    arrCompanyLookup: arrCompanyLookup,
    open1: false,
    open2: false,
    arrCompanyDomainStatusLookup: arrCompanyDomainStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addCompanyDomain] = useMutation(ADD_COMPANY_DOMAIN, {});
  const [updateCompanyDomain] = useMutation(UPDATE_COMPANY_DOMAIN, {});
  const [getCompanyDomain] = useLazyQuery(GET_COMPANY_DOMAIN, { fetchPolicy: 'network-only' });
  const [getCompanyLookup] = useLazyQuery(COMPANY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrCompanyDomainStatusLookup.length > 0 &&
      !state.dtoCompanyDomain.status
    ) {
      const firstItem = state.arrCompanyDomainStatusLookup[0];
      setState({
        ...state,
        dtoCompanyDomain: {
          ...state.dtoCompanyDomain,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCompanyDomainStatusLookup]);

  const getCompany = useCallback(async (): Promise<void> => {
    try {
      let arrCompanyLookup: LookupDTO[] = [];
      const { error, data } = await getCompanyLookup();
      if (!error && data) {
        arrCompanyLookup = data.getCompanyLookup;
      }
      setState({ arrCompanyLookup: arrCompanyLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCompanyLookup]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  const getCompanyData = useCallback(async (): Promise<void> => {
    try {
      let dtoCompanyDomain: CompanyDomainDTO = COMPANY_DOMAIN;
      const { error, data } = await getCompanyDomain({
        variables: {
          id: state.dtoCompanyDomain.id
        }
      });
      if (!error && data) {
        dtoCompanyDomain = data.getCompanyDomain;
      }
      setState({ dtoCompanyDomain: dtoCompanyDomain } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCompanyDomain, state.dtoCompanyDomain.id]);

  useEffect(() => {
    if (state.dtoCompanyDomain.id > 0) {
      getCompanyData();
    }
  }, [state.dtoCompanyDomain.id, getCompanyData]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;
      setState({
        dtoCompanyDomain: {
          ...state.dtoCompanyDomain,
          [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoCompanyDomain]
  );

  const validateDomainName = useCallback(async () => {
    if (state.dtoCompanyDomain.domain_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.domain_name]);

  const onDomainNameBlur = useCallback(async () => {
    const domain_name = await validateDomainName();
    setState({ errorMessages: { ...state.errorMessages, domain_name: domain_name } } as StateType);
  }, [validateDomainName, state.errorMessages]);

  const onCompanyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCompanyDomain: { ...state.dtoCompanyDomain, company_id: (value as LookupDTO).id, company_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoCompanyDomain]
  );
  const validateCompanyName = useCallback(async () => {
    if (state.dtoCompanyDomain.company_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.company_name]);

  const onCompanyNameBlur = useCallback(async () => {
    const company_name = await validateCompanyName();
    setState({ errorMessages: { ...state.errorMessages, company_name: company_name } } as StateType);
  }, [validateCompanyName, state.errorMessages]);

  const validateLogoHeight = useCallback(async () => {
    if (state.dtoCompanyDomain.logo_height === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.logo_height]);

  const onLogoHeightBlur = useCallback(async () => {
    const logo_height = await validateLogoHeight();
    setState({ errorMessages: { ...state.errorMessages, logo_height: logo_height } } as StateType);
  }, [validateLogoHeight, state.errorMessages]);

  const validateLogoWidth = useCallback(async () => {
    if (state.dtoCompanyDomain.logo_width === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.logo_width]);

  const onLogoWidthBlur = useCallback(async () => {
    const logo_width = await validateLogoWidth();
    setState({ errorMessages: { ...state.errorMessages, logo_width: logo_width } } as StateType);
  }, [validateLogoWidth, state.errorMessages]);

  const validateLogoUrl = useCallback(async () => {
    if (state.dtoCompanyDomain.logo_url.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.logo_url]);

  const onLogoUrlBlur = useCallback(async () => {
    const logo_url = await validateLogoUrl();
    setState({ errorMessages: { ...state.errorMessages, logo_url: logo_url } } as StateType);
  }, [validateLogoUrl, state.errorMessages]);

  const onCompanyDomainStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCompanyDomain: {
          ...state.dtoCompanyDomain,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCompanyDomain]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoCompanyDomain.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCompanyDomain.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.company_name = await validateCompanyName();
    if (errorMessages.company_name) {
      isFormValid = false;
    }
    errorMessages.domain_name = await validateDomainName();
    if (errorMessages.domain_name) {
      isFormValid = false;
    }
    errorMessages.logo_url = await validateLogoUrl();
    if (errorMessages.logo_url) {
      isFormValid = false;
    }
    errorMessages.logo_height = await validateLogoHeight();
    if (errorMessages.logo_height) {
      isFormValid = false;
    }
    errorMessages.logo_width = await validateLogoWidth();
    if (errorMessages.logo_width) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCompanyName, validateLogoUrl, validateStatus, validateLogoHeight, validateDomainName, validateLogoWidth]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoCompanyDomain.id === 0) {
            const { data } = await addCompanyDomain({
              variables: {
                // ...state.dtoCompanyDomain
                company_id: state.dtoCompanyDomain.company_id,
                domain_name: state.dtoCompanyDomain.domain_name,
                logo_url: state.dtoCompanyDomain.logo_url,
                logo_height: Number(state.dtoCompanyDomain.logo_height),
                logo_width: Number(state.dtoCompanyDomain.logo_width),
                status: state.dtoCompanyDomain.status || ''
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/company-domains/list');
            }
          } else {
            const { data } = await updateCompanyDomain({
              variables: {
                // ...state.dtoCompanyDomain
                id: state.dtoCompanyDomain.id,
                company_id: state.dtoCompanyDomain.company_id,
                domain_name: state.dtoCompanyDomain.domain_name,
                logo_url: state.dtoCompanyDomain.logo_url,
                logo_height: Number(state.dtoCompanyDomain.logo_height),
                logo_width: Number(state.dtoCompanyDomain.logo_width),
                status: state.dtoCompanyDomain.status || ''
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/company-domains/list');
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
    [validateForm, addCompanyDomain, state.dtoCompanyDomain, router, updateCompanyDomain]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoCompanyDomain: { ...COMPANY_DOMAIN, id: state.dtoCompanyDomain.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoCompanyDomain.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/company-domains/list');
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

  return {
    state,
    onPlainInputChange,
    onCompanyNameBlur,
    onCompanyNameChange,
    onStatusBlur,
    onDomainNameBlur,
    onCompanyDomainStatusChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    saving,
    onLogoUrlBlur,
    onLogoHeightBlur,
    onLogoWidthBlur
  };
};

export default useCompanyDomainEntry;
