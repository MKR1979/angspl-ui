import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import SiteConfigDTO, { SITE_CONFIG } from '@/app/types/SiteConfigDTO';
import { ADD_SITE_CONFIG, UPDATE_SITE_CONFIG, GET_SITE_CONFIG } from '@/app/graphql/SiteConfig';
import { arrSiteConfigStatus } from '@/app/common/Configuration';
import { arrSiteConfigType } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';

type ErrorMessageType = {
  key: string | null;
  value: string | null;
  type: string | null;
  description: string | null;
  status: string | null;
  company_id: number | null;
  company_name: string | null;
  business_config: string | null;
};

type StateType = {
  dtoSiteConfig: SiteConfigDTO;
  arrSiteConfigStatusLookup: LookupDTO[];
  arrSiteConfigTypeLookup: LookupDTO[];
  arrCompanyLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoSiteConfig: SiteConfigDTO;
  arrCompanyLookup: LookupDTO[];
};

const useSiteConfigEntry = ({ dtoSiteConfig, arrCompanyLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    key: null,
    value: null,
    type: null,
    description: null,
    status: null,
    company_id: null,
    company_name: null,
    business_config: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoSiteConfig: dtoSiteConfig,
    arrSiteConfigStatusLookup: arrSiteConfigStatus,
    arrSiteConfigTypeLookup: arrSiteConfigType,
    arrCompanyLookup: arrCompanyLookup,
    open1: false,
    open2: false,
    open3: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [addSiteConfig] = useMutation(ADD_SITE_CONFIG, {});
  const [saving, setSaving] = useState(false);
  const [updateSiteConfig] = useMutation(UPDATE_SITE_CONFIG, {});
  const [getSiteConfig] = useLazyQuery(GET_SITE_CONFIG, { fetchPolicy: 'network-only' });
  const [getCompanyLookup] = useLazyQuery(COMPANY_LOOKUP, { fetchPolicy: 'network-only' });
  useEffect(() => {
    if (
      state.arrSiteConfigStatusLookup.length > 0 &&
      !state.dtoSiteConfig.status
    ) {
      const firstItem = state.arrSiteConfigStatusLookup[0];
      setState({
        ...state,
        dtoSiteConfig: {
          ...state.dtoSiteConfig,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrSiteConfigStatusLookup]);


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

  // const getData = useCallback(async (): Promise<void> => {
  //   let dtoSiteConfig: SiteConfigDTO = SITE_CONFIG;
  //   const { error, data } = await getSiteConfig({
  //     variables: {
  //       id: state.dtoSiteConfig.id,
  //       company_id: state.dtoSiteConfig.company_id
  //     }
  //   });
  //   if (!error && data) {
  //     dtoSiteConfig = data.getSiteConfig;
  //   }
  //   setState({ dtoSiteConfig: dtoSiteConfig } as StateType);
  // }, [getSiteConfig, state.dtoSiteConfig.id]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      // let dtoSiteConfig: SiteConfigDTO = SITE_CONFIG;
      const { error, data } = await getSiteConfig({
        variables: {
          id: state.dtoSiteConfig.id,
          company_id: state.dtoSiteConfig.company_id
        }
      });
      if (!error && data) {
        dtoSiteConfig.id = data.getSiteConfig.id;
        dtoSiteConfig.key = data.getSiteConfig.key;
        dtoSiteConfig.value = data.getSiteConfig.value;
        dtoSiteConfig.type = data.getSiteConfig.type;
        dtoSiteConfig.description = data.getSiteConfig.description;
        dtoSiteConfig.status = data.getSiteConfig.status;
        dtoSiteConfig.company_id = data.getSiteConfig.company_id;
        dtoSiteConfig.company_name = data.getSiteConfig.company_name;
        dtoSiteConfig.business_config = data.getSiteConfig.business_config?.business_config || '';
      }
      setState({ dtoSiteConfig: dtoSiteConfig } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getSiteConfig, state.dtoSiteConfig.id]);

  useEffect(() => {
    if (state.dtoSiteConfig.id > 0) {
      getData();
    }
  }, [state.dtoSiteConfig.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoSiteConfig: {
          ...state.dtoSiteConfig,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoSiteConfig]
  );

  const onSiteConfigStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoSiteConfig: {
          ...state.dtoSiteConfig,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoSiteConfig]
  );

  const onSiteConfigTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoSiteConfig: {
          ...state.dtoSiteConfig,
          type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoSiteConfig]
  );

  const validateKey = useCallback(async () => {
    if (state.dtoSiteConfig.key.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.key]);

  const validateValue = useCallback(async () => {
    if (state.dtoSiteConfig.value.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.value]);

  const validateType = useCallback(async () => {
    if (state.dtoSiteConfig.type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.type]);

  const validateDescription = useCallback(async () => {
    if (state.dtoSiteConfig.description.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.description]);

  const validateStatus = useCallback(async () => {
    if (state.dtoSiteConfig.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.status]);

  const onKeyBlur = useCallback(async () => {
    const key = await validateKey();
    setState({ errorMessages: { ...state.errorMessages, key: key } } as StateType);
  }, [validateKey, state.errorMessages]);

  const onValueBlur = useCallback(async () => {
    const value = await validateValue();
    setState({ errorMessages: { ...state.errorMessages, value: value } } as StateType);
  }, [validateValue, state.errorMessages]);

  const onTypeBlur = useCallback(async () => {
    const type = await validateType();
    setState({ errorMessages: { ...state.errorMessages, type: type } } as StateType);
  }, [validateType, state.errorMessages]);

  const onDescriptionBlur = useCallback(async () => {
    const description = await validateDescription();
    setState({ errorMessages: { ...state.errorMessages, description: description } } as StateType);
  }, [validateDescription, state.errorMessages]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onCompanyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoSiteConfig: { ...state.dtoSiteConfig, company_id: (value as LookupDTO).id, company_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoSiteConfig]
  );
  const validateCompanyName = useCallback(async () => {
    if (state.dtoSiteConfig.company_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.company_name]);

  const onCompanyNameBlur = useCallback(async () => {
    const company_name = await validateCompanyName();
    setState({ errorMessages: { ...state.errorMessages, company_name: company_name } } as StateType);
  }, [validateCompanyName, state.errorMessages]);

  const validateBusinessConfig = useCallback(async () => {
    if (state.dtoSiteConfig.business_config.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return gMessageConstants.REQUIRED_FIELD;
      return null;
    }
  }, [state.dtoSiteConfig.business_config]);

  const onBusinessConfigBlur = useCallback(async () => {
    const business_config = await validateBusinessConfig();
    setState({ errorMessages: { ...state.errorMessages, business_config: business_config } } as StateType);
  }, [validateBusinessConfig, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.key = await validateKey();
    if (errorMessages.key) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateKey]);

  const formatBusinessConfig = (businessConfig: any) => {
    const escapedSource = businessConfig.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `\n\"${escapedSource}\\n\"`;
  };

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoSiteConfig.id === 0) {
            const { data } = await addSiteConfig({
              variables: {
                // ...state.dtoSiteConfig,
                key: state.dtoSiteConfig.key,
                value: state.dtoSiteConfig.value,
                type: state.dtoSiteConfig.type,
                description: state.dtoSiteConfig.description,
                status: state.dtoSiteConfig.status,
                company_id: state.dtoSiteConfig.company_id,
                business_config: formatBusinessConfig(
                  typeof state.dtoSiteConfig.business_config === 'object'
                    ? JSON.stringify(state.dtoSiteConfig.business_config)
                    : (state.dtoSiteConfig.business_config ?? '')
                )
                // business_config: formatBusinessConfig(state.dtoSiteConfig.business_config)
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/site-config/list');
            }
          } else {
            const { data } = await updateSiteConfig({
              variables: {
                // ...state.dtoSiteConfig
                id: state.dtoSiteConfig.id,
                key: state.dtoSiteConfig.key,
                value: state.dtoSiteConfig.value,
                type: state.dtoSiteConfig.type,
                description: state.dtoSiteConfig.description,
                status: state.dtoSiteConfig.status,
                company_id: state.dtoSiteConfig.company_id,
                business_config: formatBusinessConfig(
                  typeof state.dtoSiteConfig.business_config === 'object'
                    ? JSON.stringify(state.dtoSiteConfig.business_config)
                    : (state.dtoSiteConfig.business_config ?? '')
                )
                // business_config: formatBusinessConfig(state.dtoSiteConfig.business_config)
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/site-config/list');
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
    [validateForm, addSiteConfig, state.dtoSiteConfig, router, updateSiteConfig]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoSiteConfig: { ...SITE_CONFIG, id: state.dtoSiteConfig.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoSiteConfig.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/site-config/list');
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

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onKeyBlur,
    onStatusBlur,
    onDescriptionBlur,
    onTypeBlur,
    onValueBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onSiteConfigStatusChange,
    onSiteConfigTypeChange,
    onCompanyNameChange,
    onCompanyNameBlur,
    setOpen1,
    setOpen2,
    setClose1,
    setClose2,
    setOpen3,
    setClose3,
    onBusinessConfigBlur,
    saving
  };
};

export default useSiteConfigEntry;
