import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import QuizQuestionDTO, { QUIZ_QUESTION } from '@/app/types/QuizQuestionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrQuizStatus } from '@/app/common/Configuration';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';
import { ADD_QUIZ_QUESTION, UPDATE_QUIZ_QUESTION, GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';

type ErrorMessageType = {
  quiz_id: number | null;
  quiz_name: string | null;
  question: string | null;
  status: string | null;
};

type StateType = {
  dtoQuizQuestion: QuizQuestionDTO;
  open1: boolean;
  open2: boolean;
  arrQuizStatusLookup: LookupDTO[];
  arrQuizLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoQuizQuestion: QuizQuestionDTO;
  arrQuizLookup: LookupDTO[];
};

const useQuizQuestionEntry = ({ dtoQuizQuestion, arrQuizLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    quiz_id: null,
    quiz_name: null,
    question: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuizQuestion: dtoQuizQuestion,
    arrQuizLookup: arrQuizLookup,
    open1: false,
    open2: false,
    arrQuizStatusLookup: arrQuizStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addQuizQuestion] = useMutation(ADD_QUIZ_QUESTION, {});

  const [updateQuizQuestion] = useMutation(UPDATE_QUIZ_QUESTION, {});

  const [getQuizQuestion] = useLazyQuery(GET_QUIZ_QUESTION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getQuizLookup] = useLazyQuery(QUIZ_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData1 = useCallback(async (): Promise<void> => {
    let arrQuizLookup: LookupDTO[] = [];
    const { error, data } = await getQuizLookup();
    if (!error && data) {
      arrQuizLookup = data.getQuizLookup;
    }
    setState({ arrQuizLookup: arrQuizLookup } as StateType);
  }, [getQuizLookup]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoQuizQuestion: QuizQuestionDTO = QUIZ_QUESTION;
    const { error, data } = await getQuizQuestion({
      variables: {
        id: state.dtoQuizQuestion.id
      }
    });
    if (!error && data) {
      dtoQuizQuestion = { ...data.getQuizQuestion };
      dtoQuizQuestion.quizLookupDTO = { id: dtoQuizQuestion.quiz_id, text: dtoQuizQuestion.quiz_name };
    }
    setState({ dtoQuizQuestion: dtoQuizQuestion } as StateType);
  }, [getQuizQuestion, state.dtoQuizQuestion.id]);

  useEffect(() => {
    getData1();
    if (state.dtoQuizQuestion.id > 0) {
      getData();
    }
  }, [getData1, state.dtoQuizQuestion.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoQuizQuestion: {
          ...state.dtoQuizQuestion,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoQuizQuestion]
  );

  const onQuizStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuizQuestion: {
          ...state.dtoQuizQuestion,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoQuizQuestion]
  );

  const validateQuestion = useCallback(async () => {
    if (state.dtoQuizQuestion.question.trim() === '') {
      return 'Question is required';
    } else {
      return null;
    }
  }, [state.dtoQuizQuestion.question]);

  const onQuestionBlur = useCallback(async () => {
    const question = await validateQuestion();
    setState({ errorMessages: { ...state.errorMessages, question: question } } as StateType);
  }, [validateQuestion, state.errorMessages]);

  const onQuizNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuizQuestion: { ...state.dtoQuizQuestion, quiz_id: (value as LookupDTO).id, quiz_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoQuizQuestion]
  );
  const validateQuiz = useCallback(async () => {
    if (state.dtoQuizQuestion.quiz_name.trim() === '') {
      return 'Quiz Name is required';
    } else {
      return null;
    }
  }, [state.dtoQuizQuestion.quiz_name]);

  const onQuizBlur = useCallback(async () => {
    const quiz_name = await validateQuiz();
    setState({ errorMessages: { ...state.errorMessages, quiz_name: quiz_name } } as StateType);
  }, [validateQuiz, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoQuizQuestion.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoQuizQuestion.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

    errorMessages.quiz_name = await validateQuiz();
    if (errorMessages.quiz_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.question = await validateQuestion();
    if (errorMessages.question) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateQuiz, validateStatus, validateQuestion]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoQuizQuestion.id === 0) {
          const { data } = await addQuizQuestion({
            variables: {
              ...state.dtoQuizQuestion
            }
          });
          if (data) {
            router.push('/quiz-question/list');
          }
        } else {
          const { data } = await updateQuizQuestion({
            variables: {
              ...state.dtoQuizQuestion
            }
          });
          if (data) {
            router.push('/quiz-question/list');
          }
        }
      }
    },
    [validateForm, addQuizQuestion, state.dtoQuizQuestion, router, updateQuizQuestion]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoQuizQuestion: { ...QUIZ_QUESTION, id: state.dtoQuizQuestion.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoQuizQuestion.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quiz-question/list');
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
    onQuizNameChange,
    onStatusBlur,
    onQuestionBlur,
    onQuizBlur,
    onQuizStatusChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  };
};

export default useQuizQuestionEntry;
