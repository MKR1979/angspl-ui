import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import QuizQuestionDTO, { OptionDTO, QUIZ_QUESTION } from '@/app/types/QuizQuestionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrQuizStatus, capitalizeWords } from '@/app/common/Configuration';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';
import { ADD_QUIZ_QUESTION, UPDATE_QUIZ_QUESTION, GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

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
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [arrOptions, setArrOptions] = useState<OptionDTO[]>([]);
  const [saving, setSaving] = useState(false);
  const [addQuizQuestion] = useMutation(ADD_QUIZ_QUESTION, {});
  const [updateQuizQuestion] = useMutation(UPDATE_QUIZ_QUESTION, {});
  const [getQuizQuestion] = useLazyQuery(GET_QUIZ_QUESTION, { fetchPolicy: 'network-only' });
  const [getQuizLookup] = useLazyQuery(QUIZ_LOOKUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrQuizStatusLookup.length > 0 &&
      !state.dtoQuizQuestion.status
    ) {
      const firstItem = state.arrQuizStatusLookup[0];
      setState({
        ...state,
        dtoQuizQuestion: {
          ...state.dtoQuizQuestion,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrQuizStatusLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
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

  const getData = useCallback(async (): Promise<void> => {
    try {
      const { error, data } = await getQuizQuestion({
        variables: { id: state.dtoQuizQuestion.id }
      });
      if (!error && data?.getQuizQuestion) {
        const dtoRaw = data.getQuizQuestion;
        const dto = {
          ...dtoRaw,
          quizLookupDTO: { id: dtoRaw.quiz_id, text: dtoRaw.quiz_name }
        };
        setArrOptions(Array.isArray(dtoRaw.options) ? dtoRaw.options : []);
        const dtoWithoutOptions = { ...dto };
        delete dtoWithoutOptions.options;
        setState({
          dtoQuizQuestion: dtoWithoutOptions
        } as StateType);
      }
    } catch (err) {
      console.error('Failed to fetch question data:', err);
    }
  }, [getQuizQuestion, state.dtoQuizQuestion.id]);

  useEffect(() => {
    getData1();
    if (state.dtoQuizQuestion.id > 0) {
      getData();
    }
  }, [getData1, state.dtoQuizQuestion.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoQuizQuestion: {
          ...state.dtoQuizQuestion,
          [name]: capitalizedValue
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
      return gMessageConstants.REQUIRED_FIELD;
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
      return gMessageConstants.REQUIRED_FIELD;
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
      return gMessageConstants.REQUIRED_FIELD;
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

  const validateOptions = (): boolean => {
    if (arrOptions.length < 2) {
      showSnackbar('Each question must have at least 2 options.', 'warning');
      return false;
    }

    const lastOption = arrOptions[arrOptions.length - 1];
    if (lastOption && lastOption.option_text.trim() === '') {
      showSnackbar("Please fill all option's before saving.", 'warning');
      return false;
    }

    const hasCorrectOption = arrOptions.some((opt) => opt.is_correct);
    if (!hasCorrectOption) {
      showSnackbar('Please select at least one option as correct.', 'warning');
      return false;
    }

    return true;
  };

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (!validateOptions()) return;
          const { quiz_id, question, status } = state.dtoQuizQuestion;
          const updatedOptions = arrOptions.map((opt) => ({
            option_text: opt.option_text,
            is_correct: opt.is_correct,
            explanation: opt.explanation
          }));
          if (state.dtoQuizQuestion.id === 0) {
            const { data } = await addQuizQuestion({
              variables: {
                quiz_id,
                question,
                status,
                options: updatedOptions
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list`);
            }
          } else {
            const { data } = await updateQuizQuestion({
              variables: {
                id: state.dtoQuizQuestion.id,
                quiz_id,
                question,
                status,
                options: updatedOptions
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addQuizQuestion, updateQuizQuestion, arrOptions, state.dtoQuizQuestion, router, saving]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoQuizQuestion: { ...QUIZ_QUESTION, id: state.dtoQuizQuestion.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
      setArrOptions([]);
    },
    [state.dtoQuizQuestion.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list`);
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

  const onAddOption = () => {
    if (arrOptions.length >= 6) {
      showSnackbar('You can only add up to 6 options only.', 'error');
      return;
    }
    const lastOption = arrOptions[arrOptions.length - 1];
    if (lastOption && lastOption.option_text.trim() === '') {
      showSnackbar('Please fill the previous option before adding a new one.', 'warning');
      return;
    }
    setArrOptions((prev) => [...prev, { id: 0, option_text: '', is_correct: false, explanation: '' }]);
  };

  // const hasDuplicateOptions = arrOptions.some((opt, idx) =>
  //   arrOptions.some((o, i) => i !== idx && o.option_text.trim().toLowerCase() === opt.option_text.trim().toLowerCase())
  // );

  const hasDuplicateOptions = arrOptions.some(
    (opt, idx) =>
      !!opt.option_text.trim() &&
      arrOptions.some((o, i) => i !== idx && !!o.option_text.trim() && o.option_text.trim() === opt.option_text.trim())
  );

  const onOptionChange = (index: number, field: keyof OptionDTO, value: any) => {
    setArrOptions((prev) => prev.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)));
  };

  const onRemoveOption = (index: number) => {
    setArrOptions((prev) => prev.filter((_, i) => i !== index));
  };

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
    setClose2,
    saving,
    arrOptions,
    onAddOption,
    onOptionChange,
    onRemoveOption,
    hasDuplicateOptions
  };
};

export default useQuizQuestionEntry;
