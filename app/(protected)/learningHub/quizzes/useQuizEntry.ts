import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';
import { ADD_QUIZ, UPDATE_QUIZ, GET_QUIZ, GET_QUIZ_QUIZ_NAME_EXIST } from '@/app/graphql/Quiz';
import { arrQuizStatus, arrQuizType, capitalizeWords } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import LookupDTO from '@/app/types/LookupDTO';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  quiz_name: string | null;
  quiz_code: string | null;
  quiz_type: string | null;
  exam_duration: number | null;
  status: string | null;
};

type StateType = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
  arrQuizStatusLookup: LookupDTO[];
  arrQuizTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
  open3: boolean;
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
    quiz_type: null,
    exam_duration: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    arrCourseLookup: arrCourseLookup,
    dtoQuiz: dtoQuiz,
    open1: false,
    open2: false,
    open3: false,
    arrQuizStatusLookup: arrQuizStatus,
    arrQuizTypeLookup: arrQuizType,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    if (
      state.arrQuizStatusLookup.length > 0 &&
      !state.dtoQuiz.status
    ) {
      const firstItem = state.arrQuizStatusLookup[0];
      setState({
        ...state,
        dtoQuiz: {
          ...state.dtoQuiz,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrQuizStatusLookup]);

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
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseLookup();
      if (!error && data) {
        arrCourseLookup = data.getCourseLookup;
      }
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
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
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuiz, state.dtoQuiz.id]); // ask sir

  useEffect(() => {
    getData1();
    if (state.dtoQuiz.id > 0) {
      getData();
    }
  }, [getData1, state.dtoQuiz.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );


  const onQuizCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          quiz_code: value,
        },
      } as StateType);
    },
    [state.dtoQuiz]
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

  const onQuizTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          quiz_type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const validateQuizType = useCallback(async () => {
    if (state.dtoQuiz.quiz_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_type]);

  const onQuizTypeBlur = useCallback(async () => {
    const quiz_type = await validateQuizType();
    setState({ errorMessages: { ...state.errorMessages, quiz_type: quiz_type } } as StateType);
  }, [validateQuizType, state.errorMessages]);

  const onExamDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= Constants.EXAM_DURATION_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'exam_duration' }
      });
    }
  };

  const validateStatus = useCallback(async () => {
    if (state.dtoQuiz.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.status]);

  const onQuizStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

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
      return gMessageConstants.REQUIRED_FIELD;
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
      return gMessageConstants.REQUIRED_FIELD;
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

  const validateQuizCode = useCallback(async () => {
    if (state.dtoQuiz.quiz_code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_code]);

  const onQuizCodeBlur = useCallback(async () => {
    const quiz_code = await validateQuizCode();
    setState({ errorMessages: { ...state.errorMessages, quiz_code: quiz_code } } as StateType);
  }, [validateQuizCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.quiz_name = await validateQuizName();
    if (errorMessages.quiz_name) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.quiz_code = await validateQuizCode();
    if (errorMessages.quiz_code) {
      isFormValid = false;
    }
    errorMessages.quiz_type = await validateQuizType();
    if (errorMessages.quiz_type) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateQuizName, validateCourse, validateStatus, validateQuizCode, validateQuizType]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoQuiz.id === 0) {
            const { data } = await addQuiz({
              variables: {
                // id: state.dtoQuiz.id,
                course_id: state.dtoQuiz.course_id,
                course_name: state.dtoQuiz.course_name,
                quiz_name: state.dtoQuiz.quiz_name,
                quiz_code: state.dtoQuiz.quiz_code,
                quiz_type: state.dtoQuiz.quiz_type,
                exam_duration: Number(state.dtoQuiz.exam_duration),
                status: state.dtoQuiz.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list`);
            }
          } else {
            const { data } = await updateQuiz({
              variables: {
                // ...state.dtoQuiz
                id: state.dtoQuiz.id,
                course_id: state.dtoQuiz.course_id,
                course_name: state.dtoQuiz.course_name,
                quiz_name: state.dtoQuiz.quiz_name,
                quiz_code: state.dtoQuiz.quiz_code,
                quiz_type: state.dtoQuiz.quiz_type,
                exam_duration: Number(state.dtoQuiz.exam_duration),
                status: state.dtoQuiz.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list`);
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
    [validateForm, addQuiz, state.dtoQuiz, router, updateQuiz]
  );

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
  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list`);
    },
    [router]
  );
  return {
    state,
    saving,
    onInputChange,
    onQuizNameBlur,
    onQuizCodeBlur,
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
    setOpen3,
    setClose3,
    onCourseBlur,
    onQuizTypeBlur,
    onQuizTypeChange,
    onExamDurationChange,
    onQuizCodeChange
  };
};

export default useQuizEntry;
