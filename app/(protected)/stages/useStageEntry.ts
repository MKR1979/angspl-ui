import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import StageDTO, { STAGE } from '@/app/types/StageDTO';
import { ADD_STAGE, UPDATE_STAGE, GET_STAGE, GET_STAGE_STAGE_NAME_EXIST } from '@/app/graphql/Stage';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  stage_name: string | null;
};

type StateType = {
  dtoStage: StageDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoStage: StageDTO;
};

const useStageEntry = ({ dtoStage }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    stage_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoStage: dtoStage,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addStage] = useMutation(ADD_STAGE, {});

  const [updateStage] = useMutation(UPDATE_STAGE, {});

  const [getStage] = useLazyQuery(GET_STAGE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getStageStageNameExist] = useLazyQuery(GET_STAGE_STAGE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoStage: StageDTO = STAGE;
    const { error, data } = await getStage({
      variables: {
        id: state.dtoStage.id
      }
    });
    if (!error && data?.getStage) {
      dtoStage = data.getStage;
    }
    setState({ dtoStage: dtoStage } as StateType);
  }, [getStage, state.dtoStage.id]);

  const IsStageNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getStageStageNameExist({
      variables: {
        id: state.dtoStage.id,
        stage_name: state.dtoStage.stage_name
      }
    });
    if (!error && data?.getStageStageNameExist) {
      exist = data.getStageStageNameExist;
    }
    return exist;
  }, [getStageStageNameExist, state.dtoStage.id, state.dtoStage.stage_name]);

  useEffect(() => {
    if (state.dtoStage.id > 0) {
      getData();
    }
  }, [state.dtoStage.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoStage: {
          ...state.dtoStage,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoStage]
  );

  const validateStageName = useCallback(async () => {
    if (state.dtoStage.stage_name.trim() === '') {
      return 'Stage Name is required';
    }
    if (await IsStageNameExist()) {
      return 'Stage Name already exists';
    } else {
      return null;
    }
  }, [state.dtoStage.stage_name, IsStageNameExist]);

  const onStageNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const stage_name = await validateStageName();
      setState({ errorMessages: { ...state.errorMessages, stage_name: stage_name } } as StateType);
    }, [validateStageName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.stage_name = await validateStageName();
    if (errorMessages.stage_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStageName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoStage.id === 0) {
            const { data } = await addStage({
              variables: {
                stage_name: state.dtoStage.stage_name
              }
            });
            if (data?.addStage) {
              toast.success('record saved successfully');
              router.push('/stages/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateStage({
              variables: {
                id: state.dtoStage.id,
                stage_name: state.dtoStage.stage_name
              }
            });
            if (data?.updateStage) {
              toast.success('record saved successfully');
              router.push('/stages/list');
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
    [validateForm, addStage, state.dtoStage, router, updateStage]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/stages/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onStageNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useStageEntry;
