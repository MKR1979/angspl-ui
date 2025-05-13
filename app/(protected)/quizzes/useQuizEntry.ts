import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';
import { ADD_QUIZ, UPDATE_QUIZ, GET_QUIZ, GET_QUIZ_QUIZ_NAME_EXIST } from '@/app/graphql/Quiz';
import { arrQuizStatus } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  quiz_name: string | null;
  quiz_code: string | null;
  status: string | null;
};

type StateType = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
  arrQuizStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
};

type Props = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
};

const useQuizEntry = ({ dtoQuiz, arrCourseLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    quiz_name: null,
    quiz_code: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    arrCourseLookup: arrCourseLookup,
    dtoQuiz: dtoQuiz,
    open1: false,
    open2: false,
    arrQuizStatusLookup: arrQuizStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addQuiz] = useMutation(ADD_QUIZ, {});

  const [updateQuiz] = useMutation(UPDATE_QUIZ, {});

  const [getQuiz] = useLazyQuery(GET_QUIZ, {
    fetchPolicy: 'network-only'
  });

  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getQuizQuizNameExist] = useLazyQuery(GET_QUIZ_QUIZ_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const IsQuizNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getQuizQuizNameExist({
      variables: {
        id: state.dtoQuiz?.id,
        quiz_name: state.dtoQuiz?.quiz_name
      }
    });
    if (!error && data) {
      exist = data.getQuizQuizNameExist;
    }
    return exist;
  }, [getQuizQuizNameExist, state.dtoQuiz?.id, state.dtoQuiz.quiz_name]);

  const getData1 = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
    if (!error && data) {
      arrCourseLookup = data.getCourseLookup;
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoQuiz: QuizDTO = QUIZ;
    const { error, data } = await getQuiz({
      variables: {
        id: state.dtoQuiz.id
      }
    });
    if (!error && data) {
      dtoQuiz = { ...data.getQuiz }; // ask sir
    }
    setState({ dtoQuiz: dtoQuiz } as StateType);
  }, [getQuiz, state.dtoQuiz.id]); // ask sir

  useEffect(() => {
    getData1();
    if (state.dtoQuiz.id > 0) {
      getData();
    }
  }, [getData1, state.dtoQuiz.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: { ...state.dtoQuiz, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const validateCourse = useCallback(async () => {
    if (state.dtoQuiz.course_name.trim() === '') {
      return 'Course Name is required';
    } else {
      return null;
    }
  }, [state.dtoQuiz.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateQuizName = useCallback(async () => {
    if (state.dtoQuiz.quiz_name.trim() === '') {
      return 'Quiz Name is required';
    } else if (await IsQuizNameExist()) {
      return 'Quiz already exists';
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_name, IsQuizNameExist]);

  const onQuizNameBlur = useCallback(async () => {
    const quiz_name = await validateQuizName();
    setState({ errorMessages: { ...state.errorMessages, quiz_name: quiz_name } } as StateType);
  }, [validateQuizName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.quiz_name = await validateQuizName();
    if (errorMessages.quiz_name) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateQuizName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoQuiz.id === 0) {
          const { data } = await addQuiz({
            variables: {
              id: state.dtoQuiz.id,
              course_id: state.dtoQuiz.course_id,
              course_name: state.dtoQuiz.course_name,
              quiz_name: state.dtoQuiz.quiz_name,
              quiz_code: state.dtoQuiz.quiz_code,
              status: state.dtoQuiz.status
            }
          });
          if (data) {
            router.push('/quizzes/list');
          }
        } else {
          const { data } = await updateQuiz({
            variables: {
              ...state.dtoQuiz
            }
          });
          if (data) {
            router.push('/quizzes/list');
          }
        }
      }
    },
    [validateForm, addQuiz, state.dtoQuiz, router, updateQuiz]
  );

  const onQuizStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoQuiz.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoQuiz.status]);

  const onQuizStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoQuiz: { ...QUIZ, id: state.dtoQuiz.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoQuiz.id, ERROR_MESSAGES]
  );
  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quizzes/list');
    },
    [router]
  );
  return {
    state,
    onInputChange,
    onQuizNameBlur,
    onQuizStatusBlur,
    onSaveClick,
    onClearClick,
    onCourseNameChange,
    onCancelClick,
    onQuizStatusChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onCourseBlur
  };
};

export default useQuizEntry;
