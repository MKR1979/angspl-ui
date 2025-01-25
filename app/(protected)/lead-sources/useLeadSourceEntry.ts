import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import LeadSourceDTO, { LEAD_SOURCE } from '@/app/types/LeadSourceDTO';
import { ADD_LEAD_SOURCE, UPDATE_LEAD_SOURCE, GET_LEAD_SOURCE, GET_LEAD_SOURCE_LEAD_SOURCE_NAME_EXIST } from '@/app/graphql/LeadSource';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  lead_source_name: string | null;
};

type StateType = {
  dtoLeadSource: LeadSourceDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoLeadSource: LeadSourceDTO;
};

const useLeadSourceEntry = ({ dtoLeadSource }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    lead_source_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoLeadSource: dtoLeadSource,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addLeadSource] = useMutation(ADD_LEAD_SOURCE, {});

  const [updateLeadSource] = useMutation(UPDATE_LEAD_SOURCE, {});

  const [getLeadSource] = useLazyQuery(GET_LEAD_SOURCE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLeadSourceLeadSourceNameExist] = useLazyQuery(GET_LEAD_SOURCE_LEAD_SOURCE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoLeadSource: LeadSourceDTO = LEAD_SOURCE;
    const { error, data } = await getLeadSource({
      variables: {
        id: state.dtoLeadSource.id
      }
    });
    if (!error && data?.getLeadSource) {
      dtoLeadSource = data.getLeadSource;
    }
    setState({ dtoLeadSource: dtoLeadSource } as StateType);
  }, [getLeadSource, state.dtoLeadSource.id]);

  const IsLeadSourceNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getLeadSourceLeadSourceNameExist({
      variables: {
        id: state.dtoLeadSource.id,
        lead_source_name: state.dtoLeadSource.lead_source_name
      }
    });
    if (!error && data?.getLeadSourceLeadSourceNameExist) {
      exist = data.getLeadSourceLeadSourceNameExist;
    }
    return exist;
  }, [getLeadSourceLeadSourceNameExist, state.dtoLeadSource.id, state.dtoLeadSource.lead_source_name]);

  useEffect(() => {
    if (state.dtoLeadSource.id > 0) {
      getData();
    }
  }, [state.dtoLeadSource.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoLeadSource: {
          ...state.dtoLeadSource,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoLeadSource]
  );

  const validateLeadSourceName = useCallback(async () => {
    if (state.dtoLeadSource.lead_source_name.trim() === '') {
      return 'Lead Source Name is required';
    }
    if (await IsLeadSourceNameExist()) {
      return 'Lead Source Name already exists';
    } else {
      return null;
    }
  }, [state.dtoLeadSource.lead_source_name, IsLeadSourceNameExist]);

  const onLeadSourceNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const lead_source_name = await validateLeadSourceName();
      setState({ errorMessages: { ...state.errorMessages, lead_source_name: lead_source_name } } as StateType);
    }, [validateLeadSourceName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.lead_source_name = await validateLeadSourceName();
    if (errorMessages.lead_source_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateLeadSourceName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoLeadSource.id === 0) {
            const { data } = await addLeadSource({
              variables: {
                lead_source_name: state.dtoLeadSource.lead_source_name
              }
            });
            if (data?.addLeadSource) {
              toast.success('record saved successfully');
              router.push('/lead-sources/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateLeadSource({
              variables: {
                id: state.dtoLeadSource.id,
                lead_source_name: state.dtoLeadSource.lead_source_name
              }
            });
            if (data?.updateLeadSource) {
              toast.success('record saved successfully');
              router.push('/lead-sources/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addLeadSource, state.dtoLeadSource, router, updateLeadSource]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/lead-sources/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onLeadSourceNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useLeadSourceEntry;
