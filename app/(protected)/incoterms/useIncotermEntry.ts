import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import IncotermDTO, { INCOTERM } from '@/app/types/IncotermDTO';
import { ADD_INCOTERM, UPDATE_INCOTERM, GET_INCOTERM } from '@/app/graphql/Incoterm';
import { GET_INCOTERM_INCOTERM_CODE_EXIST, GET_INCOTERM_INCOTERM_DESCRIPTION_EXIST } from '@/app/graphql/Incoterm';
import { isTargetInDescendants } from '@mui/x-tree-view/internals';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  incoterm_description: string | null;
  incoterm_code: string | null;
};

type StateType = {
  dtoIncoterm: IncotermDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoIncoterm: IncotermDTO;
};

const useIncotermEntry = ({ dtoIncoterm }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    incoterm_description: null,
    incoterm_code: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoIncoterm: dtoIncoterm,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addIncoterm] = useMutation(ADD_INCOTERM, {});

  const [updateIncoterm] = useMutation(UPDATE_INCOTERM, {});

  const [getIncoterm] = useLazyQuery(GET_INCOTERM, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getIncotermIncotermCodeExist] = useLazyQuery(GET_INCOTERM_INCOTERM_CODE_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getIncotermIncotermDescriptionExist] = useLazyQuery(GET_INCOTERM_INCOTERM_DESCRIPTION_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoIncoterm: IncotermDTO = INCOTERM;
    const { error, data } = await getIncoterm({
      variables: {
        id: state.dtoIncoterm.id
      }
    });
    if (!error && data?.getIncoterm) {
      dtoIncoterm = data.getIncoterm;
    }
    setState({ dtoIncoterm: dtoIncoterm } as StateType);
  }, [getIncoterm, state.dtoIncoterm.id]);

  const IsIncotermCodeExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getIncotermIncotermCodeExist({
      variables: {
        id: state.dtoIncoterm.id,
        incoterm_code: state.dtoIncoterm.incoterm_code
      }
    });
    if (!error && data?.getIncotermIncotermCodeExist) {
      exist = data.getIncotermIncotermCodeExist;
    }
    return exist;
  }, [getIncotermIncotermCodeExist, state.dtoIncoterm.id, state.dtoIncoterm.incoterm_code]);

  const IsIncotermDescriptionExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getIncotermIncotermDescriptionExist({
      variables: {
        id: state.dtoIncoterm.id,
        incoterm_description: state.dtoIncoterm.incoterm_description
      }
    });
    if (!error && data?.getIncotermIncotermDescriptionExist) {
      exist = data.getIncotermIncotermDescriptionExist;
    }
    return exist;
  }, [getIncotermIncotermDescriptionExist, state.dtoIncoterm.id, state.dtoIncoterm.incoterm_description]);

  useEffect(() => {
    if (state.dtoIncoterm.id > 0) {
      getData();
    }
  }, [state.dtoIncoterm.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoIncoterm: {
          ...state.dtoIncoterm,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoIncoterm]
  );

  const validateIncotermDescription = useCallback(async () => {
    if (state.dtoIncoterm.incoterm_description.trim() === '') {
      return 'Incoterm Description is required';
    } else if (await IsIncotermDescriptionExist()) {
      return 'Incoterm Description already exists';
    } else {
      return null;
    }
  }, [state.dtoIncoterm.incoterm_description, isTargetInDescendants]);

  const onIncotermDescriptionBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const incoterm_description = await validateIncotermDescription();
      setState({ errorMessages: { ...state.errorMessages, incoterm_description: incoterm_description } } as StateType);
    }, [validateIncotermDescription, state.errorMessages]);

  const validateIncotermCode = useCallback(async () => {
    if (state.dtoIncoterm.incoterm_code.trim() === '') {
      return 'Incoterm Code is required';
    } else if (await IsIncotermCodeExist()) {
      return 'Incoterm Code already exists';
    } else {
      return null;
    }
  }, [state.dtoIncoterm.incoterm_code, IsIncotermCodeExist]);

  const onIncotermCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const incoterm_code = await validateIncotermCode();
      setState({ errorMessages: { ...state.errorMessages, incoterm_code: incoterm_code } } as StateType);
    }, [validateIncotermCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.incoterm_description = await validateIncotermDescription();
    if (errorMessages.incoterm_description) {
      isFormValid = false;
    }
    errorMessages.incoterm_code = await validateIncotermCode();
    if (errorMessages.incoterm_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateIncotermDescription, validateIncotermCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoIncoterm.id === 0) {
            const { data } = await addIncoterm({
              variables: {
                incoterm_code: state.dtoIncoterm.incoterm_code,
                incoterm_description: state.dtoIncoterm.incoterm_description
              }
            });
            if (data?.addIncoterm) {
              toast.success('record saved successfully');
              router.push('/incoterms/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateIncoterm({
              variables: {
                id: state.dtoIncoterm.id,
                incoterm_code: state.dtoIncoterm.incoterm_code,
                incoterm_description: state.dtoIncoterm.incoterm_description
              }
            });
            if (data?.updateIncoterm) {
              toast.success('record saved successfully');
              router.push('/incoterms/list');
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
    [validateForm, addIncoterm, state.dtoIncoterm, router, updateIncoterm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/incoterms/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onIncotermDescriptionBlur,
    onIncotermCodeBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useIncotermEntry;
