import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUIZ_DATALIST, QUIZ_LOOKUP } from '@/app/graphql/Quiz';
// import { COURSE_LOOKUP } from '@/app/graphql/Course';
import QuizDataDTO, { QUIZ_DATA } from '@/app/types/QuizDataDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { dispatch, useSelector } from '@/app/store';
import { setShowQuiz } from '@/app/store/slices/siteConfigState';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { COURSE_LOOKUP_BY_USER_ID, } from '@/app/graphql/Course';
// import * as gConstants from '../../constants/constants';

type ErrorMessageType = {
  course_name: string | null;
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
  arrCourseLookup: LookupDTO[];
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  arrQuizLookup: LookupDTO[];
  hasReadInstructions: boolean;
  startExamError: string | null;
  errorMessages: ErrorMessageType;
};

type Props = {
  courseId?: number;
  courseName?: string;
  StudyNotesId?: number;
};

const ERROR_MESSAGES: ErrorMessageType = {
  course_name: null,
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

// const useQuiz = () => {
const useQuiz = ({ courseId }: Props) => {
  const INITIAL_STATE: StateType = {
    arrQuizLists: [],
    dtoQuizData: QUIZ_DATA,
    arrQuizLookup: [],
    arrCourseLookup: [],
    isLoading: true,
    open1: false,
    open2: false,
    hasReadInstructions: true,
    startExamError: null,
    errorMessages: { ...ERROR_MESSAGES }
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getQuizLookup] = useLazyQuery(QUIZ_LOOKUP, { fetchPolicy: 'network-only' });
  const [getQuizData] = useLazyQuery(QUIZ_DATALIST, { fetchPolicy: 'network-only' });
  const showSnackbar = useSnackbar();
  const { companyInfo } = useSelector((state) => state.globalState);
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [getCourseByUserIdLookup] = useLazyQuery(COURSE_LOOKUP_BY_USER_ID, { fetchPolicy: 'network-only' });

  const getCourse = useCallback(async () => {
    try {
      const { error, data } = await getCourseByUserIdLookup({
        variables: {
          user_id: loginUser_id,
          group_name: companyInfo.company_type,
            // source_flag: gConstants.SOURCE_FLAG_STUDENT
        }
      }
      );
      if (!error && data) {
        const courses: LookupDTO[] = data.getCourseByUserIdLookup;
        setState({ arrCourseLookup: courses });
        // If courseId is passed via props
        if (courseId) {
          const selectedCourse = courses.find((c) => c.id === courseId);
          if (selectedCourse && selectedCourse.id !== undefined) {
            setState({
              dtoQuizData: {
                ...QUIZ_DATA,
                course_id: selectedCourse.id,
                course_name: selectedCourse.text
              }
            });
          }
        }
      }
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseByUserIdLookup, courseId]);


  useEffect(() => {
    getCourse();
  }, [getCourse]);

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

  const getQuizList = useCallback(async () => {
    try {
      if (!state.dtoQuizData.course_id) return;
      const { error, data } = await getQuizLookup({ variables: { course_id: state.dtoQuizData.course_id } });
      if (!error && data) {
        setState({ arrQuizLookup: data.getQuizLookup });
      }
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuizLookup, state.dtoQuizData.course_id]);

  useEffect(() => {
    if (state.dtoQuizData.course_id > 0) {
      getQuizList();
    }
  }, [state.dtoQuizData.course_id, getQuizList]);

  useEffect(() => {
    if (courseId) {
      sessionStorage.setItem('StudyNotesId', courseId.toString());
    }
  }, [courseId]);

  const getData = useCallback(
    async (quizId: number) => {
      try {
        setState({ isLoading: true });
        const { error, data } = await getQuizData({ variables: { id: quizId } });
        if (!error && data?.getQuizData) {
          const rawItems = data.getQuizData.quizData;
          const transformed = transformQuizData(rawItems);
          setQuizQuestions(transformed);
          setCurrentQuestionIndex(0);
          setState({
            arrQuizLists: rawItems,
            dtoQuizData: { ...state.dtoQuizData, ...(rawItems[0] ?? {}) },
            isLoading: false
          });
        }
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [getQuizData, state.dtoQuizData]
  );

  const validateCourseName = useCallback(async () => {
    if (state.dtoQuizData.course_name.trim() === '') {
      return 'Please Select Course';
    } else {
      return null;
    }
  }, [state.dtoQuizData.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourseName();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourseName, state.errorMessages]);

  const validateExamName = useCallback(async () => {
    if (state.dtoQuizData.quiz_name.trim() === '') {
      return 'Please Select Exam';
    } else {
      return null;
    }
  }, [state.dtoQuizData.quiz_name]);

  const onExamBlur = useCallback(async () => {
    const quiz_name = await validateExamName();
    setState({ errorMessages: { ...state.errorMessages, quiz_name: quiz_name } } as StateType);
  }, [validateExamName, state.errorMessages]);

  const onQuizNameChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedQuiz = value as LookupDTO;
      if (!selectedQuiz.id || selectedQuiz.id === state.dtoQuizData.id) return;
      setState({
        dtoQuizData: {
          ...state.dtoQuizData,
          id: selectedQuiz.id,
          quiz_name: selectedQuiz.text
        }
      });
    },
    [state.arrQuizLookup, state.dtoQuizData]
  );

  const onCourseNameChange = useCallback(
    (event: any, value: unknown) => {
      const selected = value as LookupDTO;
      setState({
        dtoQuizData: {
          ...state.dtoQuizData,
          course_id: selected.id || 0,
          course_name: selected.text || ''
        },
        // hasReadInstructions: false,
        startExamError: null
      });
    },
    [state.dtoQuizData, state.arrCourseLookup]
  );


  const onToggleReadInstructions = (checked: boolean) => {
    setState({ hasReadInstructions: checked, startExamError: null });
  };

  const setOpen1 = useCallback(() => {
    setState({ open1: true });
  }, []);

  const setClose1 = useCallback(() => {
    setState({ open1: false });
  }, []);

  const setOpen2 = useCallback(() => {
    setState({ open2: true });
  }, []);

  const setClose2 = useCallback(() => {
    setState({ open2: false });
  }, []);

  const handleStartExam = async () => {
    if (!state.dtoQuizData.course_id) {
      setState({ ...state, startExamError: 'Please select a valid course.' });
    } else if (!state.dtoQuizData?.id) {
      setState({ ...state, startExamError: 'Please select a Exam.' });
    } else if (!state.hasReadInstructions) {
      setState({ ...state, startExamError: 'Please confirm you have read all instructions.' });
    } else {
      await getData(state.dtoQuizData.id);
      dispatch(setShowQuiz(true));
    }
  };


  return {
    state,
    quizQuestions,
    currentQuestionIndex,
    onQuizNameChange,
    onCourseNameChange,
    //onCourseBlur,
    onToggleReadInstructions,
    handleStartExam,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    courseId,
    getData,
    onCourseBlur,
    onExamBlur,
  };
};

export default useQuiz;
