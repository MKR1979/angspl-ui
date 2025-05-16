import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import SiteConfigDTO, { SITE_CONFIG } from '@/app/types/SiteConfigDTO';
import { ADD_SITE_CONFIG, UPDATE_SITE_CONFIG, GET_SITE_CONFIG } from '@/app/graphql/SiteConfig';
import { arrSiteConfigStatus } from '@/app/common/Configuration';
import { arrSiteConfigType } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  key: string | null;
  value: string | null;
  type: string | null;
  description: string | null;
  status: string | null;
};

type StateType = {
  dtoSiteConfig: SiteConfigDTO;
  arrSiteConfigStatusLookup: LookupDTO[];
  arrSiteConfigTypeLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoSiteConfig: SiteConfigDTO;
};

const useSiteConfigEntry = ({ dtoSiteConfig }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    key: null,
    value: null,
    type: null,
    description: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoSiteConfig: dtoSiteConfig,
    arrSiteConfigStatusLookup:arrSiteConfigStatus,
    arrSiteConfigTypeLookup: arrSiteConfigType,
    open1: false,
    open2: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addSiteConfig] = useMutation(ADD_SITE_CONFIG, {});

  const [updateSiteConfig] = useMutation(UPDATE_SITE_CONFIG, {});

  const [getSiteConfig] = useLazyQuery(GET_SITE_CONFIG, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoSiteConfig: SiteConfigDTO = SITE_CONFIG;
    const { error, data } = await getSiteConfig({
      variables: {
        id: state.dtoSiteConfig.id
      }
    });
    if (!error && data) {
      dtoSiteConfig = data.getSiteConfig;
    }
    setState({ dtoSiteConfig: dtoSiteConfig } as StateType);
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
      return 'Key is required';
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.key]);

  const validateValue = useCallback(async () => {
    if (state.dtoSiteConfig.value.trim() === '') {
      return 'Value is required';
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.value]);

  const validateType = useCallback(async () => {
    if (state.dtoSiteConfig.type.trim() === '') {
      return 'Type is required';
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.type]);

  const validateDescription = useCallback(async () => {
    if (state.dtoSiteConfig.description.trim() === '') {
      return 'Description is required';
    } else {
      return null;
    }
  }, [state.dtoSiteConfig.description]);

  const validateStatus = useCallback(async () => {
    if (state.dtoSiteConfig.status.trim() === '') {
      return 'Status is required';
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

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoSiteConfig.id === 0) {
          const { data } = await addSiteConfig({
            variables: {
              ...state.dtoSiteConfig
            }
          });
          if (data) {
            router.push('/site-config/list');
          }
        } else {
          const { data } = await updateSiteConfig({
            variables: {
              ...state.dtoSiteConfig
            }
          });
          if (data) {
            router.push('/site-config/list');
          }
        }
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
    setOpen1,
    setOpen2,
    setClose1,
    setClose2
  };
};

export default useSiteConfigEntry;
