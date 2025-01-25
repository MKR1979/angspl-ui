import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import IndustryDTO, { INDUSTRY } from '@/app/types/IndustryDTO';
import { ADD_INDUSTRY, UPDATE_INDUSTRY, GET_INDUSTRY, GET_INDUSTRY_INDUSTRY_NAME_EXIST } from '@/app/graphql/Industry';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  industry_name: string | null;
};

type StateType = {
  dtoIndustry: IndustryDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoIndustry: IndustryDTO;
};

const useIndustryEntry = ({ dtoIndustry }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    industry_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoIndustry: dtoIndustry,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addIndustry] = useMutation(ADD_INDUSTRY, {});

  const [updateIndustry] = useMutation(UPDATE_INDUSTRY, {});

  const [getIndustry] = useLazyQuery(GET_INDUSTRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getIndustryIndustryNameExist] = useLazyQuery(GET_INDUSTRY_INDUSTRY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoIndustry: IndustryDTO = INDUSTRY;
    const { error, data } = await getIndustry({
      variables: {
        id: state.dtoIndustry.id
      }
    });
    if (!error && data?.getIndustry) {
      dtoIndustry = data.getIndustry;
    }
    setState({ dtoIndustry: dtoIndustry } as StateType);
  }, [getIndustry, state.dtoIndustry.id]);

  const IsIndustryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getIndustryIndustryNameExist({
      variables: {
        id: state.dtoIndustry.id,
        industry_name: state.dtoIndustry.industry_name
      }
    });
    if (!error && data?.getIndustryIndustryNameExist) {
      exist = data.getIndustryIndustryNameExist;
    }
    return exist;
  }, [getIndustryIndustryNameExist, state.dtoIndustry.id, state.dtoIndustry.industry_name]);

  useEffect(() => {
    if (state.dtoIndustry.id > 0) {
      getData();
    }
  }, [state.dtoIndustry.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoIndustry: {
          ...state.dtoIndustry,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoIndustry]
  );

  const validateIndustryName = useCallback(async () => {
    if (state.dtoIndustry.industry_name.trim() === '') {
      return 'Industry Name is required';
    }
    if (await IsIndustryNameExist()) {
      return 'Industry Name already exists';
    } else {
      return null;
    }
  }, [state.dtoIndustry.industry_name, IsIndustryNameExist]);

  const onIndustryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const industry_name = await validateIndustryName();
      setState({ errorMessages: { ...state.errorMessages, industry_name: industry_name } } as StateType);
    }, [validateIndustryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.industry_name = await validateIndustryName();
    if (errorMessages.industry_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateIndustryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoIndustry.id === 0) {
            const { data } = await addIndustry({
              variables: {
                industry_name: state.dtoIndustry.industry_name
              }
            });
            if (data?.addIndustry) {
              toast.success('record saved successfully');
              router.push('/industries/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateIndustry({
              variables: {
                id: state.dtoIndustry.id,
                industry_name: state.dtoIndustry.industry_name
              }
            });
            if (data?.updateIndustry) {
              toast.success('record saved successfully');
              router.push('/industries/list');
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
    [validateForm, addIndustry, state.dtoIndustry, router, updateIndustry]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/industries/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onIndustryNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useIndustryEntry;
