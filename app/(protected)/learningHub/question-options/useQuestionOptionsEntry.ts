import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import QuestionOptionsDTO, { QUESTION_OPTIONS } from '@/app/types/QuestionOptionsDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { ADD_QUESTION_OPTIONS, UPDATE_QUESTION_OPTIONS, GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
import { QUESTION_LOOKUP } from '@/app/graphql/QuizQuestion';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { capitalizeWords } from '@/app/common/Configuration';
type ErrorMessageType = {
  quiz_id: number | null;
  quiz_name: string | null;
  question_id: number | null;
  question: string | null;
  option_text: string | null;
  explanation: string | null;
  is_correct: boolean;
};

type StateType = {
  dtoQuestionOptions: QuestionOptionsDTO;
  open1: boolean;
  open2: boolean;
  arrCourseStausLookup: LookupDTO[];
  arrQuestionLookup: LookupDTO[];
  arrQuizLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoQuestionOptions: QuestionOptionsDTO;
};

const useQuestionOptionsEntry = ({ dtoQuestionOptions }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    quiz_id: null,
    quiz_name: null,
    question_id: null,
    question: null,
    option_text: null,
    explanation: null,
    is_correct: false,
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuestionOptions: dtoQuestionOptions,
    arrQuestionLookup: [] as LookupDTO[],
    arrQuizLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addQuestionOptions] = useMutation(ADD_QUESTION_OPTIONS, {});
  const showSnackbar = useSnackbar();
  const [updateQuestionOptions] = useMutation(UPDATE_QUESTION_OPTIONS, {});

  const [getQuestionOptions] = useLazyQuery(GET_QUESTION_OPTIONS, {
    fetchPolicy: 'network-only'
  });

  const [getQuizQuestionLookup] = useLazyQuery(QUESTION_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  const [getQuizLookup] = useLazyQuery(QUIZ_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoQuestionOptions: QuestionOptionsDTO = QUESTION_OPTIONS;
      const { error, data } = await getQuestionOptions({
        variables: {
          id: state.dtoQuestionOptions.id
        }
      });
      if (!error && data) {
        dtoQuestionOptions = data.getQuestionOptions;
      }
      setState({ dtoQuestionOptions: dtoQuestionOptions } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuestionOptions, state.dtoQuestionOptions.id]);

  useEffect(() => {
    if (state.dtoQuestionOptions.id > 0) {
      getData();
    }
  },
    [state.dtoQuestionOptions.id, getData]);


  const getQuizList = useCallback(async (): Promise<void> => {
    try {
      let arrQuizLookup: LookupDTO[] = [];
      const { error, data } = await getQuizLookup();
      if (!error && data) {
        arrQuizLookup = data.getQuizLookup;
      }
      setState({ arrQuizLookup: arrQuizLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuizLookup]);


  const getQuestionList = useCallback(async (): Promise<void> => {
    try {
      let arrQuestionLookup: LookupDTO[] = [];
      const { error, data } = await getQuizQuestionLookup({
        variables: {
          quiz_id: state.dtoQuestionOptions.quiz_id,
        }
      });
      if (!error && data) {
        arrQuestionLookup = data.getQuizQuestionLookup;
      }
      setState({ arrQuestionLookup: arrQuestionLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuizQuestionLookup, state.dtoQuestionOptions.quiz_id]);

  useEffect(() => {
    getQuizList();
  }, [getQuizList]);


  useEffect(() => {
    getQuestionList();
  }, [getQuestionList, state.dtoQuestionOptions.quiz_id]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;

      setState({
        dtoQuestionOptions: {
          ...state.dtoQuestionOptions,
          [name]: type === "checkbox" ? checked : name === "price" ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoQuestionOptions]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoQuestionOptions: {
          ...state.dtoQuestionOptions,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoQuestionOptions]
  );

  const validateExplanation = useCallback(async () => {
    if (state.dtoQuestionOptions.explanation.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuestionOptions.explanation]);

  const onExplanationBlur = useCallback(async () => {
    const explanation = await validateExplanation();
    setState({ errorMessages: { ...state.errorMessages, explanation: explanation } } as StateType);
  }, [validateExplanation, state.errorMessages]);

  const validateQuestion = useCallback(async () => {
    if (state.dtoQuestionOptions.question.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuestionOptions.question]);

  const onQuestionBlur = useCallback(async () => {
    const question = await validateQuestion();
    setState({ errorMessages: { ...state.errorMessages, question: question } } as StateType);
  }, [validateQuestion, state.errorMessages]);

  const validateQuiz = useCallback(async () => {
    if (state.dtoQuestionOptions.quiz_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuestionOptions.quiz_name]);

  const onQuizBlur = useCallback(async () => {
    const quiz_name = await validateQuiz();
    setState({ errorMessages: { ...state.errorMessages, quiz_name: quiz_name } } as StateType);
  }, [validateQuiz, state.errorMessages]);

  const onQuestionChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuestionOptions: { ...state.dtoQuestionOptions, question_id: (value as LookupDTO).id, question: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoQuestionOptions]
  );

  const onQuizNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuestionOptions: { ...state.dtoQuestionOptions, quiz_id: (value as LookupDTO).id, quiz_name: (value as LookupDTO).text }
      } as StateType);
    },

    [state.dtoQuestionOptions],

  );

  const validateOptionText = useCallback(async () => {
    if (state.dtoQuestionOptions.option_text.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuestionOptions.option_text]
  );

  const onOptionTextBlur = useCallback(async () => {
    const option_text = await validateOptionText();
    setState({ errorMessages: { ...state.errorMessages, option_text: option_text } } as StateType);
  }, [validateOptionText, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

    errorMessages.question = await validateQuestion();
    if (errorMessages.question) {
      isFormValid = false;
    }

    errorMessages.quiz_name = await validateQuiz();
    if (errorMessages.quiz_name) {
      isFormValid = false;
    }

    errorMessages.option_text = await validateOptionText();
    if (errorMessages.option_text) {
      isFormValid = false;
    }
    errorMessages.explanation = await validateExplanation();
    if (errorMessages.explanation) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateQuestion, validateOptionText, validateExplanation, validateQuiz]);


  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoQuestionOptions.id === 0) {
            const { data } = await addQuestionOptions({
              variables: {
                ...state.dtoQuestionOptions
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list`);
            }
          } else {
            const { data } = await updateQuestionOptions({
              variables: {
                ...state.dtoQuestionOptions
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list`);
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
    [validateForm, addQuestionOptions, state.dtoQuestionOptions, router, updateQuestionOptions]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoQuestionOptions: { ...QUESTION_OPTIONS, id: state.dtoQuestionOptions.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoQuestionOptions.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list`);
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
    onQuestionChange,
    onInputChange,
    onPlainInputChange,
    onQuestionBlur,
    onQuizBlur,
    validateOptionText,
    onOptionTextBlur,
    onExplanationBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onQuizNameChange,
    saving
  };
};

export default useQuestionOptionsEntry;
