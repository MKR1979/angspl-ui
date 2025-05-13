import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import StudyNotesDTO, { STUDY_NOTES } from '@/app/types/StudyNotesDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrStudyNotesStatus } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { ADD_STUDY_NOTES, UPDATE_STUDY_NOTES, GET_STUDY_NOTES } from '@/app/graphql/StudyNotes';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  title: string | null;
  description: string | null;
  status: string | null;
};

type StateType = {
  dtoStudyNotes: StudyNotesDTO;
  open1: boolean;
  open2: boolean;
  arrCourseStatusLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoStudyNotes: StudyNotesDTO;
  arrCourseLookup: LookupDTO[];
};

const useStudyProjectEntry = ({ dtoStudyNotes, arrCourseLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    title: null,
    description: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoStudyNotes: dtoStudyNotes,
    arrCourseLookup: arrCourseLookup,
    open1: false,
    open2: false,
    arrCourseStatusLookup: arrStudyNotesStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [addStudyNotes] = useMutation(ADD_STUDY_NOTES, {});
  const [updateStudyNotes] = useMutation(UPDATE_STUDY_NOTES, {});
  const [getStudyNotes] = useLazyQuery(GET_STUDY_NOTES, {
    fetchPolicy: 'network-only'
  });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  const getCourseLookupData = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
    if (!error && data) {
      arrCourseLookup = data.getCourseLookup;
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  const getStudyNotesData = useCallback(async (): Promise<void> => {
    //let dtoCodeProject: CodeProjectDTO = STUDY_NOTES;
    const { error, data } = await getStudyNotes({
      variables: {
        id: state.dtoStudyNotes.id
      }
    });
    if (!error && data) {
      //dtoCodeProject = { ...data.getCodeProject };
      dtoStudyNotes.id = data.getStudyNotes.id;
      dtoStudyNotes.title = data.getStudyNotes.title;
      dtoStudyNotes.description = data.getStudyNotes.description.code || '';
      dtoStudyNotes.status = data.getStudyNotes.status;
      dtoStudyNotes.course_id = data.getStudyNotes.course_id;
      dtoStudyNotes.course_name = data.getStudyNotes.course_name;
      dtoStudyNotes.courseLookupDTO = { id: dtoStudyNotes.course_id, text: dtoStudyNotes.course_name };
    }
    setState({ dtoStudyNotes: dtoStudyNotes } as StateType);
  }, [getStudyNotes, state.dtoStudyNotes.id]);

  useEffect(() => {
    getCourseLookupData();
    if (state.dtoStudyNotes.id > 0) {
      getStudyNotesData();
    }
  }, [getCourseLookupData, state.dtoStudyNotes.id, getStudyNotesData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoStudyNotes: {
          ...state.dtoStudyNotes,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoStudyNotes]
  );

  const onStudyNotesStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoStudyNotes: {
          ...state.dtoStudyNotes,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoStudyNotes]
  );

  const validateTitle = useCallback(async () => {
    if (state.dtoStudyNotes.title.trim() === '') {
      return 'Title is required';
    } else {
      return null;
    }
  }, [state.dtoStudyNotes.title]);

  const onTitleBlur = useCallback(async () => {
    const title = await validateTitle();
    setState({ errorMessages: { ...state.errorMessages, title: title } } as StateType);
  }, [validateTitle, state.errorMessages]);

  const validateDescription = useCallback(async () => {
    if (state.dtoStudyNotes.description.trim() === '') {
      return 'Description is required';
    } else {
      return null;
    }
  }, [state.dtoStudyNotes.description]);

  const onDescriptionBlur = useCallback(async () => {
    const description = await validateDescription();
    setState({ errorMessages: { ...state.errorMessages, description: description } } as StateType);
  }, [validateDescription, state.errorMessages]);

  const formatStudyNotes = (sourceCode: any) => {
    const escapedSource = sourceCode.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `\n\"${escapedSource}\\n\"`;
  };

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoStudyNotes: { ...state.dtoStudyNotes, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoStudyNotes]
  );
  const validateCourse = useCallback(async () => {
    if (state.dtoStudyNotes.course_name.trim() === '') {
      return 'Course Name is required';
    } else {
      return null;
    }
  }, [state.dtoStudyNotes.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoStudyNotes.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoStudyNotes.status]);

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
    errorMessages.description = await validateDescription();
    if (errorMessages.description) {
      isFormValid = false;
    }

    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCourse, validateStatus, validateTitle, validateDescription]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoStudyNotes.id === 0) {
          const { data } = await addStudyNotes({
            variables: {
              course_id: state.dtoStudyNotes.course_id,
              title: state.dtoStudyNotes.title,
              description: formatStudyNotes(state.dtoStudyNotes.description),
              status: state.dtoStudyNotes.status
            }
          });
          if (data) {
            router.push('/study-notes/list');
          }
        } else {
          const { data } = await updateStudyNotes({
            variables: {
              // ...state.dtoCodeProject
              id: state.dtoStudyNotes.id,
              course_id: state.dtoStudyNotes.course_id,
              title: state.dtoStudyNotes.title,
              description: formatStudyNotes(state.dtoStudyNotes.description),
              status: state.dtoStudyNotes.status
            }
          });
          if (data) {
            router.push('/study-notes/list');
          }
        }
      }
    },
    [validateForm, addStudyNotes, state.dtoStudyNotes, router, updateStudyNotes]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoStudyNotes: { ...STUDY_NOTES, id: state.dtoStudyNotes.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoStudyNotes.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/study-notes/list');
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
    onCourseChange,
    onStatusBlur,
    onTitleBlur,
    onCourseBlur,
    onStudyNotesStatusChange,
    onDescriptionBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  };
};

export default useStudyProjectEntry;
