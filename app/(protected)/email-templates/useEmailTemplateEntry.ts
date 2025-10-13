import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import EmailTemplateDTO, { EMAIL_TEMPLATE } from '@/app/types/EmailTemplateDTO';
import { ADD_EMAIL_TEMPLATE, UPDATE_EMAIL_TEMPLATE, GET_EMAIL_TEMPLATE, GET_EMAIL_TEMPLATE_NAME_EXIST } from '../../graphql/EmailTemplate';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrModulesStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  email_template_name: string | null;
  email_template_body: string | null;
  email_template_sub: string | null;
  status: string | null;
};

type StateType = {
  dtoEmailTemplate: EmailTemplateDTO;
  open1: boolean;
  arrEmailTemplateStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoEmailTemplate: EmailTemplateDTO;
};

const useEmailTemplateEntry = ({ dtoEmailTemplate }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    email_template_name: null,
    email_template_body: null,
    email_template_sub: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoEmailTemplate: dtoEmailTemplate,
    open1: false,
    arrEmailTemplateStatusLookup: arrModulesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addEmailTemplate] = useMutation(ADD_EMAIL_TEMPLATE, {});
  const [updateEmailTemplate] = useMutation(UPDATE_EMAIL_TEMPLATE, {});
  const [getEmailTemplate] = useLazyQuery(GET_EMAIL_TEMPLATE, { fetchPolicy: 'network-only' });

  const [getEmailTemplateNameExist] = useLazyQuery(GET_EMAIL_TEMPLATE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrEmailTemplateStatusLookup.length > 0 &&
      !state.dtoEmailTemplate.status
    ) {
      const firstItem = state.arrEmailTemplateStatusLookup[0];
      setState({
        ...state,
        dtoEmailTemplate: {
          ...state.dtoEmailTemplate,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrEmailTemplateStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEmailTemplate: EmailTemplateDTO = EMAIL_TEMPLATE;
      const { error, data } = await getEmailTemplate({
        variables: {
          id: state.dtoEmailTemplate.id
        }
      });
      if (!error && data) {
        dtoEmailTemplate = data.getEmailTemplate;
      }
      setState({ dtoEmailTemplate: dtoEmailTemplate } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplate, state.dtoEmailTemplate.id]);

  const isEmailTemplateNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getEmailTemplateNameExist({
      variables: {
        id: state.dtoEmailTemplate.id,
        email_template_name: state.dtoEmailTemplate.email_template_name
      }
    });
    if (!error && data) {
      exist = data.isEmailTemplateNameExist;
    }
    return exist;
  }, [getEmailTemplateNameExist, state.dtoEmailTemplate.id, state.dtoEmailTemplate.email_template_name]);

  useEffect(() => {
    if (state.dtoEmailTemplate.id > 0) {
      getData();
    }
  }, [state.dtoEmailTemplate.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoEmailTemplate: {
          ...state.dtoEmailTemplate,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoEmailTemplate]
  );

const onTemplateNameChange = useCallback(
  async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isValid = /^[A-Za-z\s\-]*$/.test(value);
    if (!isValid && value !== "") return;
    const capitalizedValue = capitalizeWords(value);
    setState({
      ...state,
      dtoEmailTemplate: {
        ...state.dtoEmailTemplate,
        [name]: capitalizedValue
      },
      errorMessages: {
        ...state.errorMessages,
        [name]: "", 
      }
    } as StateType);
  },
  [state]
);

  const validateEmailTemplateName = useCallback(async () => {
    if (state.dtoEmailTemplate.email_template_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await isEmailTemplateNameExist()) {
      return 'Email Template Name already exists';
    } else {
      return null;
    }
  }, [state.dtoEmailTemplate.email_template_name, isEmailTemplateNameExist]);

  const validateEmailTemplateBodyName = useCallback(async () => {
    if (state.dtoEmailTemplate.email_template_body.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (await isEmailTemplateNameExist()) {
      return 'Email Template Body Name already exists';
    } else {
      return null;
    }
  }, [state.dtoEmailTemplate.email_template_body, isEmailTemplateNameExist]);

    const validateEmailTemplateSubName = useCallback(async () => {
    if (state.dtoEmailTemplate.email_template_sub.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmailTemplate.email_template_sub]);

  const onEmailTemplateStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEmailTemplate: {
          ...state.dtoEmailTemplate,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEmailTemplate]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoEmailTemplate.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmailTemplate.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onEmailTemplateNameBlur = useCallback(async () => {
    const email_template_name = await validateEmailTemplateName();
    setState({ errorMessages: { ...state.errorMessages, email_template_name: email_template_name } } as StateType);
  }, [validateEmailTemplateName, state.errorMessages]);

  const onEmailTemplateBodyNameBlur = useCallback(async () => {
    const email_template_body = await validateEmailTemplateBodyName();
    setState({ errorMessages: { ...state.errorMessages, email_template_body: email_template_body } } as StateType);
  }, [validateEmailTemplateBodyName, state.errorMessages]);

    const onEmailTemplateSubNameBlur = useCallback(async () => {
    const email_template_sub = await validateEmailTemplateSubName();
    setState({ errorMessages: { ...state.errorMessages, email_template_sub: email_template_sub } } as StateType);
  }, [validateEmailTemplateSubName, state.errorMessages]);


  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.email_template_name = await validateEmailTemplateName();
    if (errorMessages.email_template_name) {
      isFormValid = false;
    }
    errorMessages.email_template_body = await validateEmailTemplateBodyName();
    if (errorMessages.email_template_body) {
      isFormValid = false;
    }
     errorMessages.email_template_sub = await validateEmailTemplateSubName();
    if (errorMessages.email_template_sub) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateEmailTemplateName,validateEmailTemplateBodyName,validateEmailTemplateSubName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoEmailTemplate.id === 0) {
            const { data } = await addEmailTemplate({
              variables: {
                // ...state.dtoEmailTemplate
                email_template_name: state.dtoEmailTemplate.email_template_name,
                email_template_body: state.dtoEmailTemplate.email_template_body,
                email_template_sub: state.dtoEmailTemplate.email_template_sub,
                status: state.dtoEmailTemplate.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/email-templates/list');
            }
          } else {
            const { data } = await updateEmailTemplate({
              variables: {
                // ...state.dtoEmailTemplate
                id: state.dtoEmailTemplate.id,
                email_template_name: state.dtoEmailTemplate.email_template_name,
                email_template_body: state.dtoEmailTemplate.email_template_body,
                email_template_sub: state.dtoEmailTemplate.email_template_sub,
                status: state.dtoEmailTemplate.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/email-templates/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving types:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [saving, validateForm, addEmailTemplate, state.dtoEmailTemplate, router, updateEmailTemplate]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoEmailTemplate: { ...EMAIL_TEMPLATE, id: state.dtoEmailTemplate.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoEmailTemplate.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/email-templates/list');
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
    onInputChange,
    onEmailTemplateNameBlur,
    onEmailTemplateBodyNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onEmailTemplateStatusChange,
    onTemplateNameChange,
    onStatusBlur,
    onEmailTemplateSubNameBlur
  };
};

export default useEmailTemplateEntry;
