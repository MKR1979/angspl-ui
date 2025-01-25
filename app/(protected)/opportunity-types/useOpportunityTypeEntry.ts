import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import OpportunityTypeDTO, { OPPORTUNITY_TYPE } from '@/app/types/OpportunityTypeDTO';
import {
  ADD_OPPORTUNITY_TYPE,
  UPDATE_OPPORTUNITY_TYPE,
  GET_OPPORTUNITY_TYPE,
  GET_OPPORTUNITY_TYPE_OPPORTUNITY_TYPE_NAME_EXIST
} from '@/app/graphql/OpportunityType';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  opportunity_type_name: string | null;
};

type StateType = {
  dtoOpportunityType: OpportunityTypeDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoOpportunityType: OpportunityTypeDTO;
};

const useOpportunityTypeEntry = ({ dtoOpportunityType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    opportunity_type_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoOpportunityType: dtoOpportunityType,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addOpportunityType] = useMutation(ADD_OPPORTUNITY_TYPE, {});

  const [updateOpportunityType] = useMutation(UPDATE_OPPORTUNITY_TYPE, {});

  const [getOpportunityType] = useLazyQuery(GET_OPPORTUNITY_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getOpportunityTypeOpportunityTypeNameExist] = useLazyQuery(GET_OPPORTUNITY_TYPE_OPPORTUNITY_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoOpportunityType: OpportunityTypeDTO = OPPORTUNITY_TYPE;
    const { error, data } = await getOpportunityType({
      variables: {
        id: state.dtoOpportunityType.id
      }
    });
    if (!error && data?.getOpportunityType) {
      dtoOpportunityType = data.getOpportunityType;
    }
    setState({ dtoOpportunityType: dtoOpportunityType } as StateType);
  }, [getOpportunityType, state.dtoOpportunityType.id]);

  const IsOpportunityTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getOpportunityTypeOpportunityTypeNameExist({
      variables: {
        id: state.dtoOpportunityType.id,
        opportunity_type_name: state.dtoOpportunityType.opportunity_type_name
      }
    });
    if (!error && data?.getOpportunityTypeOpportunityTypeNameExist) {
      exist = data.getOpportunityTypeOpportunityTypeNameExist;
    }
    return exist;
  }, [getOpportunityTypeOpportunityTypeNameExist, state.dtoOpportunityType.id, state.dtoOpportunityType.opportunity_type_name]);

  useEffect(() => {
    if (state.dtoOpportunityType.id > 0) {
      getData();
    }
  }, [state.dtoOpportunityType.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoOpportunityType: {
          ...state.dtoOpportunityType,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoOpportunityType]
  );

  const validateOpportunityTypeName = useCallback(async () => {
    if (state.dtoOpportunityType.opportunity_type_name.trim() === '') {
      return 'Opportunity Type Name is required';
    }
    if (await IsOpportunityTypeNameExist()) {
      return 'Opportunity Type Name already exists';
    } else {
      return null;
    }
  }, [state.dtoOpportunityType.opportunity_type_name, IsOpportunityTypeNameExist]);

  const onOpportunityTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const opportunity_type_name = await validateOpportunityTypeName();
      setState({ errorMessages: { ...state.errorMessages, opportunity_type_name: opportunity_type_name } } as StateType);
    }, [validateOpportunityTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.opportunity_type_name = await validateOpportunityTypeName();
    if (errorMessages.opportunity_type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateOpportunityTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoOpportunityType.id === 0) {
            const { data } = await addOpportunityType({
              variables: {
                opportunity_type_name: state.dtoOpportunityType.opportunity_type_name
              }
            });
            if (data?.addOpportunityType) {
              toast.success('record saved successfully');
              router.push('/opportunity-types/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateOpportunityType({
              variables: {
                id: state.dtoOpportunityType.id,
                opportunity_type_name: state.dtoOpportunityType.opportunity_type_name
              }
            });
            if (data?.updateOpportunityType) {
              toast.success('record saved successfully');
              router.push('/opportunity-types/list');
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
    [validateForm, addOpportunityType, state.dtoOpportunityType, router, updateOpportunityType]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunity-types/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onOpportunityTypeNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useOpportunityTypeEntry;
