import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CodeProjectDTO, { CODE_PROJECT } from '@/app/types/CodeProjectDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCodeProjectStatus, capitalizeWords } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { ADD_CODE_PROJECT, UPDATE_CODE_PROJECT, GET_CODE_PROJECT } from '@/app/graphql/CodeProject';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  title: string | null;
  description: string | null;
  source_code: string | null;
  status: string | null;
};

type StateType = {
  dtoCodeProject: CodeProjectDTO;
  open1: boolean;
  open2: boolean;
  arrCourseStatusLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCodeProject: CodeProjectDTO;
  arrCourseLookup: LookupDTO[];
};

const useCodeProjectEntry = ({ dtoCodeProject, arrCourseLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    title: null,
    description: null,
    source_code: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCodeProject: dtoCodeProject,
    arrCourseLookup: arrCourseLookup,
    open1: false,
    open2: false,
    arrCourseStatusLookup: arrCodeProjectStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addCodeProject] = useMutation(ADD_CODE_PROJECT, {});
  const [updateCodeProject] = useMutation(UPDATE_CODE_PROJECT, {});
  const [getCodeProject] = useLazyQuery(GET_CODE_PROJECT, {
    fetchPolicy: 'network-only'
  });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (
      state.arrCourseStatusLookup.length > 0 &&
      !state.dtoCodeProject.status
    ) {
      const firstItem = state.arrCourseStatusLookup[0];
      setState({
        ...state,
        dtoCodeProject: {
          ...state.dtoCodeProject,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCourseStatusLookup]);

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
      const { error, data } = await getCodeProject({
        variables: {
          id: state.dtoCodeProject.id
        }
      });
      if (!error && data) {
        dtoCodeProject.id = data.getCodeProject.id;
        dtoCodeProject.title = data.getCodeProject.title;
        dtoCodeProject.source_code = data.getCodeProject.source_code?.code || '';
        dtoCodeProject.description = data.getCodeProject.description;
        dtoCodeProject.status = data.getCodeProject.status;
        dtoCodeProject.course_id = data.getCodeProject.course_id;
        dtoCodeProject.course_name = data.getCodeProject.course_name;
        dtoCodeProject.courseLookupDTO = { id: dtoCodeProject.course_id, text: dtoCodeProject.course_name };
      }
      setState({ dtoCodeProject: dtoCodeProject } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCodeProject, state.dtoCodeProject.id]);

  useEffect(() => {
    getData1();
    if (state.dtoCodeProject.id > 0) {
      getData();
    }
  }, [getData1, state.dtoCodeProject.id, getData]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoCodeProject: {
          ...state.dtoCodeProject,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoCodeProject]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoCodeProject: {
          ...state.dtoCodeProject,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoCodeProject]
  );

  const onCodeProjectStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCodeProject: {
          ...state.dtoCodeProject,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCodeProject]
  );

  const validateTitle = useCallback(async () => {
    if (state.dtoCodeProject.title.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCodeProject.title]);

  const onTitleBlur = useCallback(async () => {
    const title = await validateTitle();
    setState({ errorMessages: { ...state.errorMessages, title: title } } as StateType);
  }, [validateTitle, state.errorMessages]);

  const validateDescription = useCallback(async () => {
    if (state.dtoCodeProject.description.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoCodeProject.description]);

  const onDescriptionBlur = useCallback(async () => {
    const description = await validateDescription();
    setState({ errorMessages: { ...state.errorMessages, description: description } } as StateType);
  }, [validateDescription, state.errorMessages]);

  const formatSourceCode = (sourceCode: any) => {
    const escapedSource = sourceCode.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `\n\"${escapedSource}\\n\"`;
  };

  // const validateSourceCode = useCallback(async () => {
  //   if (state.dtoCodeProject.source_code.trim() === '') {
  //    return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoCodeProject.source_code]);

  // const onSourceCodeBlur = useCallback(async () => {
  //   const source_code = await validateSourceCode();
  //   setState({ errorMessages: { ...state.errorMessages, source_code: source_code } } as StateType);
  // }, [validateSourceCode, state.errorMessages]);

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCodeProject: { ...state.dtoCodeProject, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoCodeProject]
  );
  const validateCourse = useCallback(async () => {
    if (state.dtoCodeProject.course_name.trim() === '') {
      return 'Course Name is required';
    } else {
      return null;
    }
  }, [state.dtoCodeProject.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoCodeProject.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoCodeProject.status]);

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
    // errorMessages.source_code = await validateSourceCode();
    // if (errorMessages.source_code) {
    //   isFormValid = false;
    // }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCourse,
    validateStatus,
    validateTitle,
    validateDescription,
    //  validateSourceCode
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoCodeProject.id === 0) {
            const { data } = await addCodeProject({
              variables: {
                course_id: state.dtoCodeProject.course_id,
                course_name: state.dtoCodeProject.course_name,
                title: state.dtoCodeProject.title,
                description: state.dtoCodeProject.description,
                source_code: formatSourceCode(state.dtoCodeProject.source_code),
                status: state.dtoCodeProject.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/code-projects/list`);
            }
          } else {
            const { data } = await updateCodeProject({
              variables: {
                id: state.dtoCodeProject.id,
                course_id: state.dtoCodeProject.course_id,
                course_name: state.dtoCodeProject.course_name,
                title: state.dtoCodeProject.title,
                description: state.dtoCodeProject.description,
                source_code: formatSourceCode(state.dtoCodeProject.source_code),
                status: state.dtoCodeProject.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/code-projects/list`);
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
    [validateForm, addCodeProject, state.dtoCodeProject, router, updateCodeProject]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoCodeProject: { ...CODE_PROJECT, id: state.dtoCodeProject.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoCodeProject.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/code-projects/list`);
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
    onCodeProjectStatusChange,
    onDescriptionBlur,
    // onSourceCodeBlur,
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

export default useCodeProjectEntry;
