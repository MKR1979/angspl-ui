import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import TermDTO, { TERM } from '@/app/types/TermDTO';
import { ADD_TERM, UPDATE_TERM, GET_TERM } from '@/app/graphql/Term';
import { GET_TERM_TERM_CODE_EXIST, GET_TERM_TERM_DESCRIPTION_EXIST } from '@/app/graphql/Term';
import { isTargetInDescendants } from '@mui/x-tree-view/internals';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  term_description: string | null;
  term_code: string | null;
};

type StateType = {
  dtoTerm: TermDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoTerm: TermDTO;
};

const useTermEntry = ({ dtoTerm }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    term_description: null,
    term_code: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoTerm: dtoTerm,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addTerm] = useMutation(ADD_TERM, {});

  const [updateTerm] = useMutation(UPDATE_TERM, {});

  const [getTerm] = useLazyQuery(GET_TERM, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTermTermCodeExist] = useLazyQuery(GET_TERM_TERM_CODE_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTermTermDescriptionExist] = useLazyQuery(GET_TERM_TERM_DESCRIPTION_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTerm: TermDTO = TERM;
    const { error, data } = await getTerm({
      variables: {
        id: state.dtoTerm.id
      }
    });
    if (!error && data?.getTerm) {
      dtoTerm = data.getTerm;
    }
    setState({ dtoTerm: dtoTerm } as StateType);
  }, [getTerm, state.dtoTerm.id]);

  const IsTermCodeExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getTermTermCodeExist({
      variables: {
        id: state.dtoTerm.id,
        term_code: state.dtoTerm.term_code
      }
    });
    if (!error && data?.getTermTermCodeExist) {
      exist = data.getTermTermCodeExist;
    }
    return exist;
  }, [getTermTermCodeExist, state.dtoTerm.id, state.dtoTerm.term_code]);

  const IsTermDescriptionExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getTermTermDescriptionExist({
      variables: {
        id: state.dtoTerm.id,
        term_description: state.dtoTerm.term_description
      }
    });
    if (!error && data?.getTermTermDescriptionExist) {
      exist = data.getTermTermDescriptionExist;
    }
    return exist;
  }, [getTermTermDescriptionExist, state.dtoTerm.id, state.dtoTerm.term_description]);

  useEffect(() => {
    if (state.dtoTerm.id > 0) {
      getData();
    }
  }, [state.dtoTerm.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoTerm: {
          ...state.dtoTerm,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoTerm]
  );

  const validateTermDescription = useCallback(async () => {
    if (state.dtoTerm.term_description.trim() === '') {
      return 'Term Description is required';
    } else if (await IsTermDescriptionExist()) {
      return 'Term Description already exists';
    } else {
      return null;
    }
  }, [state.dtoTerm.term_description, isTargetInDescendants]);

  const onTermDescriptionBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const term_description = await validateTermDescription();
      setState({ errorMessages: { ...state.errorMessages, term_description: term_description } } as StateType);
    }, [validateTermDescription, state.errorMessages]);

  const validateTermCode = useCallback(async () => {
    if (state.dtoTerm.term_code.trim() === '') {
      return 'Term Code is required';
    } else if (await IsTermCodeExist()) {
      return 'Term Code already exists';
    } else {
      return null;
    }
  }, [state.dtoTerm.term_code, IsTermCodeExist]);

  const onTermCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const term_code = await validateTermCode();
      setState({ errorMessages: { ...state.errorMessages, term_code: term_code } } as StateType);
    }, [validateTermCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.term_description = await validateTermDescription();
    if (errorMessages.term_description) {
      isFormValid = false;
    }
    errorMessages.term_code = await validateTermCode();
    if (errorMessages.term_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateTermDescription, validateTermCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoTerm.id === 0) {
            const { data } = await addTerm({
              variables: {
                term_code: state.dtoTerm.term_code,
                term_description: state.dtoTerm.term_description
              }
            });
            if (data?.addTerm) {
              toast.success('record saved successfully');
              router.push('/terms/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateTerm({
              variables: {
                id: state.dtoTerm.id,
                term_code: state.dtoTerm.term_code,
                term_description: state.dtoTerm.term_description
              }
            });
            if (data?.updateTerm) {
              toast.success('record saved successfully');
              router.push('/terms/list');
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
    [validateForm, addTerm, state.dtoTerm, router, updateTerm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/terms/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onTermDescriptionBlur,
    onTermCodeBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useTermEntry;
