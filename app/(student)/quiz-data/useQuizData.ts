import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUIZ_DATALIST } from '@/app/graphql/QuizData';
import QuizDataDTO, { QUIZ_DATA } from '@/app/types/QuizDataDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';

type ErrorMessageType = {
  quiz_name: string | null;
  quiz_code: string | null;
  question_id: number | 0;
  question: string | null;
  option_id: number | 0;
  option_text: string | null;
  explanation: string | null;
  is_correct: boolean | false;
  status: string | null;
};
type StateType = {
  arrQuizLists: QuizDataDTO[];
  dtoQuizData: QuizDataDTO;
  isLoading: boolean;
  open1: boolean;
  arrQuizLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  quiz_name: null,
  quiz_code: null,
  question_id: 0,
  question: null,
  option_id: 0,
  option_text: null,
  explanation: null,
  is_correct: false,
  status: null
};

type Props = {
  quizId?: number;
  quizName?: string;
};

const useQuiz = ({ quizId, quizName }: Props) => {
  const INITIAL_STATE: StateType = {
    arrQuizLists: [],
    dtoQuizData: QUIZ_DATA,
    arrQuizLookup: [] as LookupDTO[],
    isLoading: true,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [getQuizLookup] = useLazyQuery(QUIZ_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  const transformQuizData = (rawData: QuizDataDTO[]) => {
    const grouped: any = {};
    rawData.forEach((item) => {
      const qid = item.question_id;

      if (!grouped[qid]) {
        grouped[qid] = {
          question_id: qid,
          question: item.question,
          options: []
        };
      }
      grouped[qid].options.push({
        option_id: item.option_id,
        option_text: item.option_text,
        is_correct: item.is_correct
      });
    });

    return Object.values(grouped);
  };

  const getQuizList = useCallback(async (): Promise<void> => {
    let arrQuizLookup: LookupDTO[] = [];
    const { error, data } = await getQuizLookup();
    if (!error && data) {
      arrQuizLookup = data.getQuizLookup;
    }
    setState({ arrQuizLookup: arrQuizLookup } as StateType);
  }, [getQuizLookup]);

  useEffect(() => {
    getQuizList();
  }, [getQuizList]);

  const [getQuizData] = useLazyQuery(QUIZ_DATALIST, { fetchPolicy: 'network-only' });
  const getdata = useCallback(
    async (quizId: number): Promise<void> => {
      setState({ isLoading: true } as StateType);
      const { error, data } = await getQuizData({
        variables: {
          id: quizId
        }
      });
      if (!error && data?.getQuizData) {
        const rawItems: QuizDataDTO[] = data.getQuizData.quizData;
        const transformed = transformQuizData(rawItems);
        setQuizQuestions(transformed); // store grouped data
        setCurrentQuestionIndex(0);
        setState({
          arrQuizLists: rawItems,
          dtoQuizData: rawItems[0] ?? QUIZ_DATA,
          isLoading: false
        } as StateType);
      } else {
        console.error('Invalid response:', data?.getQuizData);
      }
    },
    [getQuizData]
  );

  useEffect(() => {
    if (state.arrQuizLookup.length === 0) return;

    const storedId = typeof window !== 'undefined' ? Number(window.sessionStorage.getItem('initialQuizId')) : 0;

    const targetQuizId = storedId || state.arrQuizLookup[1]?.id;

    if (targetQuizId) {
      getdata(targetQuizId);
    }
  }, [state.arrQuizLookup, getdata]);

  useEffect(() => {
    if (quizId) {
      sessionStorage.setItem('initialQuizId', quizId.toString());
    }
  }, [quizId]);

  const handleOptionChange = (index: number, selectedAnswer: string) => {
    const updatedSelectedOptions = [...selectedOption];
    const previousAnswer = updatedSelectedOptions[currentQuestionIndex];
    updatedSelectedOptions[currentQuestionIndex] = selectedAnswer;
    setSelectedOption(updatedSelectedOptions);
    const correct = quizQuestions[currentQuestionIndex]?.options.find((opt: any) => opt.is_correct);
    if (!selectedAnswer || !correct) return;
    // If it was previously unanswered
    if (!previousAnswer) {
      setAttemptedQuestions((prev) => prev + 1);
      if (selectedAnswer === correct.option_text) {
        setRightAnswers((prev) => prev + 1);
      } else {
        setWrongAnswers((prev) => prev + 1);
      }
    } else {
      const wasPreviouslyCorrect = previousAnswer === correct.option_text;
      const isNowCorrect = selectedAnswer === correct.option_text;
      if (wasPreviouslyCorrect && !isNowCorrect) {
        setRightAnswers((prev) => prev - 1); // From correct to wrong
        setWrongAnswers((prev) => prev + 1);
      } else if (!wasPreviouslyCorrect && isNowCorrect) {
        setWrongAnswers((prev) => prev - 1); // From wrong to correct
        setRightAnswers((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      setScore(rightAnswers);
      setQuizCompleted(true);
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption([]);
    setAttemptedQuestions(0);
    setRightAnswers(0);
    setWrongAnswers(0);
  };

  const onQuizNameChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedQuiz = value as LookupDTO;
      if (!selectedQuiz.id) return;

      handleRestartQuiz();

      setState({
        dtoQuizData: { ...state.dtoQuizData, id: selectedQuiz.id, quiz_name: selectedQuiz.text }
      } as StateType);

      await getdata(selectedQuiz.id);
    },
    [state.dtoQuizData, getdata]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    handleOptionChange,
    handleNextQuestion,
    quizQuestions,
    onQuizNameChange,
    quizId,
    quizName,
    handleRestartQuiz,
    wrongAnswers,
    quizCompleted,
    getdata,
    rightAnswers,
    attemptedQuestions,
    handlePreviousQuestion,
    setOpen1,
    setClose1,
    currentQuestionIndex,
    selectedOption,
    score
  };
};

export default useQuiz;
