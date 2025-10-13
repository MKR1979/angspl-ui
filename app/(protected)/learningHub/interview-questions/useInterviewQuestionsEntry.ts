import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import InterviewQuestionsDTO, { INTERVIEW_QUESTIONS } from '@/app/types/InterviewQuestionsDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrStudyNotesStatus, capitalizeWords } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { ADD_INTERVIEW_QUESTIONS, UPDATE_INTERVIEW_QUESTIONS, GET_INTERVIEW_QUESTIONS } from '@/app/graphql/InterviewQuestions';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  title: string | null;
  description: string | null;
  status: string | null;
};

type StateType = {
  dtoInterviewQuestions: InterviewQuestionsDTO;
  open1: boolean;
  open2: boolean;
  arrCourseStatusLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoInterviewQuestions: InterviewQuestionsDTO;
  arrCourseLookup: LookupDTO[];
};

const useInterviewQuestionsEntry = ({ dtoInterviewQuestions, arrCourseLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    title: null,
    description: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoInterviewQuestions: dtoInterviewQuestions,
    arrCourseLookup: arrCourseLookup,
    open1: false,
    open2: false,
    arrCourseStatusLookup: arrStudyNotesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addInterviewQuestions] = useMutation(ADD_INTERVIEW_QUESTIONS, {});
  const [updateInterviewQuestions] = useMutation(UPDATE_INTERVIEW_QUESTIONS, {});
  const [getInterviewQuestions] = useLazyQuery(GET_INTERVIEW_QUESTIONS, {
    fetchPolicy: 'network-only'
  });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (
      state.arrCourseStatusLookup.length > 0 &&
      !state.dtoInterviewQuestions.status
    ) {
      const firstItem = state.arrCourseStatusLookup[0];
      setState({
        ...state,
        dtoInterviewQuestions: {
          ...state.dtoInterviewQuestions,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCourseStatusLookup]);

  const getCourseLookupData = useCallback(async (): Promise<void> => {
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

  const getInterviewQuestionsData = useCallback(async (): Promise<void> => {
    try {
      //let dtoCodeProject: CodeProjectDTO = INTERVIEW_QUESTIONS;
      const { error, data } = await getInterviewQuestions({
        variables: {
          id: state.dtoInterviewQuestions.id
        }
      });
      if (!error && data) {
        //dtoCodeProject = { ...data.getCodeProject };
        dtoInterviewQuestions.id = data.getInterviewQuestions.id;
        dtoInterviewQuestions.title = data.getInterviewQuestions.title;
        dtoInterviewQuestions.description = data.getInterviewQuestions.description.code || '';
        dtoInterviewQuestions.status = data.getInterviewQuestions.status;
        dtoInterviewQuestions.course_id = data.getInterviewQuestions.course_id;
        dtoInterviewQuestions.course_name = data.getInterviewQuestions.course_name;
        dtoInterviewQuestions.courseLookupDTO = { id: dtoInterviewQuestions.course_id, text: dtoInterviewQuestions.course_name };
      }
      setState({ dtoInterviewQuestions: dtoInterviewQuestions } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getInterviewQuestions, state.dtoInterviewQuestions.id]);

  useEffect(() => {
    getCourseLookupData();
    if (state.dtoInterviewQuestions.id > 0) {
      getInterviewQuestionsData();
    }
  }, [getCourseLookupData, state.dtoInterviewQuestions.id, getInterviewQuestionsData]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoInterviewQuestions: {
          ...state.dtoInterviewQuestions,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoInterviewQuestions]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoInterviewQuestions: {
          ...state.dtoInterviewQuestions,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoInterviewQuestions]
  );

  const onStudyNotesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoInterviewQuestions: {
          ...state.dtoInterviewQuestions,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoInterviewQuestions]
  );

  const validateTitle = useCallback(async () => {
    if (state.dtoInterviewQuestions.title.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoInterviewQuestions.title]);

  const onTitleBlur = useCallback(async () => {
    const title = await validateTitle();
    setState({ errorMessages: { ...state.errorMessages, title: title } } as StateType);
  }, [validateTitle, state.errorMessages]);

  // const validateDescription = useCallback(async () => {
  //   if (state.dtoInterviewQuestions.description.trim() === '') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoInterviewQuestions.description]);

  // const onDescriptionBlur = useCallback(async () => {
  //   const description = await validateDescription();
  //   setState({ errorMessages: { ...state.errorMessages, description: description } } as StateType);
  // }, [validateDescription, state.errorMessages]);

  const formatStudyNotes = (sourceCode: any) => {
    const escapedSource = sourceCode.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `\n\"${escapedSource}\\n\"`;
  };

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoInterviewQuestions: { ...state.dtoInterviewQuestions, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoInterviewQuestions]
  );
  const validateCourse = useCallback(async () => {
    if (state.dtoInterviewQuestions.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoInterviewQuestions.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoInterviewQuestions.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoInterviewQuestions.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;

    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.title = await validateTitle();
    if (errorMessages.title) {
      isFormValid = false;
    }
    // errorMessages.description = await validateDescription();
    // if (errorMessages.description) {
    //   isFormValid = false;
    // }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCourse, validateStatus, validateTitle]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoInterviewQuestions.id === 0) {
            const { data } = await addInterviewQuestions({
              variables: {
                course_id: state.dtoInterviewQuestions.course_id,
                title: state.dtoInterviewQuestions.title,
               description: formatStudyNotes(state.dtoInterviewQuestions.description) ,
                status: state.dtoInterviewQuestions.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/study-notes/list`);
            }
          } else {
            const { data } = await updateInterviewQuestions({
              variables: {
                // ...state.dtoCodeProject
                id: state.dtoInterviewQuestions.id,
                course_id: state.dtoInterviewQuestions.course_id,
                title: state.dtoInterviewQuestions.title,
                description: formatStudyNotes(state.dtoInterviewQuestions.description),
                status: state.dtoInterviewQuestions.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/study-notes/list`);
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
    [validateForm, addInterviewQuestions, state.dtoInterviewQuestions, router, updateInterviewQuestions]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoInterviewQuestions: { ...INTERVIEW_QUESTIONS, id: state.dtoInterviewQuestions.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoInterviewQuestions.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/study-notes/list`);
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
    onPlainInputChange,
    onCourseChange,
    onStatusBlur,
    onTitleBlur,
    onCourseBlur,
    onStudyNotesStatusChange,
    // onDescriptionBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    saving
  };
};

export default useInterviewQuestionsEntry;
