import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import VideoUploadsDTO, { VIDEO_UPLOADS_LIST_ALL } from '@/app/types/VideoUploadsDTO';
import { ADD_VIDEO_UPLOADS, UPDATE_VIDEO_UPLOADS, GET_VIDEO_UPLOADS } from '@/app/graphql/VideoUploads';
import { arrVideoUploadsStatus, capitalizeWords } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import LookupDTO from '@/app/types/LookupDTO';
import * as gConstants from '../../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  title: string | null;
  video_source: string | null;
  description: string | null;
  tags: string | null;
  status: string | null;
};

type StateType = {
  dtoVideoUploads: VideoUploadsDTO;
  arrCourseLookup: LookupDTO[];
  arrVideoUploadsStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
};

type Props = {
  dtoVideoUploads: VideoUploadsDTO;
  arrCourseLookup: LookupDTO[];
};

const useVideoUploadsEntry = ({ dtoVideoUploads, arrCourseLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    title: null,
    video_source: null,
    description: null,
    tags: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    arrCourseLookup: arrCourseLookup,
    dtoVideoUploads: dtoVideoUploads,
    open1: false,
    open2: false,
    arrVideoUploadsStatusLookup: arrVideoUploadsStatus,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addVideoUploads] = useMutation(ADD_VIDEO_UPLOADS, {});
  const [updateVideoUploads] = useMutation(UPDATE_VIDEO_UPLOADS, {});
  const [getVideoUploads] = useLazyQuery(GET_VIDEO_UPLOADS, { fetchPolicy: 'network-only' });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrVideoUploadsStatusLookup.length > 0 &&
      !state.dtoVideoUploads.status
    ) {
      const firstItem = state.arrVideoUploadsStatusLookup[0];
      setState({
        ...state,
        dtoVideoUploads: {
          ...state.dtoVideoUploads,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrVideoUploadsStatusLookup]);

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

  const getVideoUploadsData = useCallback(async (): Promise<void> => {
    try {
      let dtoVideoUploads: VideoUploadsDTO = VIDEO_UPLOADS_LIST_ALL;
      const { error, data } = await getVideoUploads({
        variables: {
          id: state.dtoVideoUploads.id
        }
      });
      if (!error && data) {
        dtoVideoUploads = { ...data.getVideoUploads };
      }
      setState({ dtoVideoUploads: dtoVideoUploads } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getVideoUploads, state.dtoVideoUploads.id]);

  useEffect(() => {
    getCourseLookupData();
    if (state.dtoVideoUploads.id > 0) {
      getVideoUploadsData();
    }
  }, [getCourseLookupData, state.dtoVideoUploads.id, getVideoUploadsData]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoVideoUploads: {
          ...state.dtoVideoUploads,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoVideoUploads]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoVideoUploads: {
          ...state.dtoVideoUploads,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoVideoUploads]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoVideoUploads: { ...state.dtoVideoUploads, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoVideoUploads]
  );

  const validateCourse = useCallback(async () => {
    if (state.dtoVideoUploads.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoVideoUploads.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateTitle = useCallback(async () => {
    if (state.dtoVideoUploads.title.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoVideoUploads.title]);

  const onTitleBlur = useCallback(async () => {
    const title = await validateTitle();
    setState({ errorMessages: { ...state.errorMessages, title: title } } as StateType);
  }, [validateTitle, state.errorMessages]);

  const validateVideoSource = useCallback(async () => {
    if (state.dtoVideoUploads.video_source.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoVideoUploads.video_source]);

  const onVideoSourceBlur = useCallback(async () => {
    const video_source = await validateVideoSource();
    setState({ errorMessages: { ...state.errorMessages, video_source: video_source } } as StateType);
  }, [validateVideoSource, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoVideoUploads: {
          ...state.dtoVideoUploads,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoVideoUploads]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoVideoUploads.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoVideoUploads.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.title = await validateTitle();
    if (errorMessages.title) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.video_source = await validateVideoSource();
    if (errorMessages.video_source) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateTitle, validateStatus, validateCourse, validateVideoSource]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoVideoUploads.id === 0) {
            const { data } = await addVideoUploads({
              variables: {
                course_id: state.dtoVideoUploads.course_id,
                title: state.dtoVideoUploads.title,
                video_source: state.dtoVideoUploads.video_source,
                description: state.dtoVideoUploads.description,
                tags: state.dtoVideoUploads.tags,
                status: state.dtoVideoUploads.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/video-uploads/list`);
            }
          } else {
            const { data } = await updateVideoUploads({
              variables: {
                id: state.dtoVideoUploads.id,
                course_id: state.dtoVideoUploads.course_id,
                title: state.dtoVideoUploads.title,
                video_source: state.dtoVideoUploads.video_source,
                description: state.dtoVideoUploads.description,
                tags: state.dtoVideoUploads.tags,
                status: state.dtoVideoUploads.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/video-uploads/list`);
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
    [validateForm, addVideoUploads, state.dtoVideoUploads, router, updateVideoUploads]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoVideoUploads: { ...VIDEO_UPLOADS_LIST_ALL, id: state.dtoVideoUploads.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoVideoUploads.id, ERROR_MESSAGES]
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
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/video-uploads/list`);
    },
    [router]
  );
  return {
    state,
    onInputChange,
    onPlainInputChange,
    onTitleBlur,
    onStatusBlur,
    onVideoSourceBlur,
    onSaveClick,
    onClearClick,
    onCourseNameChange,
    onStatusChange,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onCourseBlur,
    saving
  };
};

export default useVideoUploadsEntry;
