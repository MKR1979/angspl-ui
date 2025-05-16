import { useState } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_VIDEO_UPLOADS_ALL } from '@/app/graphql/VideoUploads';
import VideoUploadsDTO, { VIDEO_UPLOADS_LIST_ALL } from '@/app/types/VideoUploadsDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import LookupDTO from '@/app/types/LookupDTO';

type ErrorMessageType = {
  course_name: string | null;
  title: string | null;
  video_source: string | null;
  description: string | null;
  tags: string | null;
  status: string | null;
};
type StateType = {
  isLoading: boolean;
  errorMessages: ErrorMessageType;
  open1: boolean;
  arrCourseLookup: LookupDTO[];
  arrVideoUploadsListAll: VideoUploadsDTO[];
  arrVideoUploadsListFilter: VideoUploadsDTO[];
  dtoVideoUploads: VideoUploadsDTO;
};

const ERROR_MESSAGES: ErrorMessageType = {
  course_name: null,
  title: null,
  video_source: null,
  description: null,
  tags: null,
  status: null
};

type Props = {
  courseId?: number;
  courseName?: string;
  StudyNotesId?: number;
};

const useVideoInsights = ({ courseId, courseName, StudyNotesId }: Props) => {
  const INITIAL_STATE: StateType = {
    isLoading: true,
    errorMessages: { ...ERROR_MESSAGES },
    arrVideoUploadsListAll: [],
    arrVideoUploadsListFilter: [],
    dtoVideoUploads: VIDEO_UPLOADS_LIST_ALL,
    arrCourseLookup: [] as LookupDTO[],
    open1: false
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [getVideoUploadsAll] = useLazyQuery(GET_VIDEO_UPLOADS_ALL, { fetchPolicy: 'network-only' });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });

  const getCourseList = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
    if (!error && data) {
      arrCourseLookup = data.getCourseLookup;
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  const getVideoUpdates = useCallback(
    async (arrCourseLookupParam: LookupDTO[], selectedCourseId?: number): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrVideoUploadsDTO: VideoUploadsDTO[] = [];
      try {
        const { data } = await getVideoUploadsAll();
        if (data?.getVideoUploadsAll) {
          arrVideoUploadsDTO = data.getVideoUploadsAll;
        }
        const usedCourseIds = new Set(arrVideoUploadsDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((videos) => typeof videos.id === 'number' && usedCourseIds.has(videos.id));
        const filteredVideos = arrVideoUploadsDTO.filter((proj) => proj.course_id === selectedCourseId);
        setState({
          arrCourseLookup: filteredCourses,
          arrVideoUploadsListAll: arrVideoUploadsDTO,
          arrVideoUploadsListFilter: filteredVideos,
          dtoVideoUploads: {
            ...VIDEO_UPLOADS_LIST_ALL,
            course_id: selectedCourseId || 0
          },
          isLoading: false
        } as StateType);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Error during data fetch:', err);
        setState({ isLoading: false } as StateType);
      }
    },
    [getVideoUploadsAll]
  );

  const getVideoUpdates1 = useCallback(
    async (arrCourseLookupParam: LookupDTO[]): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrVideoUploadsDTO: VideoUploadsDTO[] = [];

      try {
        const { data } = await getVideoUploadsAll();
        if (data?.getVideoUploadsAll) {
          arrVideoUploadsDTO = data.getVideoUploadsAll;
        }
        const usedCourseIds = new Set(arrVideoUploadsDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((videos) => typeof videos.id === 'number' && usedCourseIds.has(videos.id));
        const filteredCoursesDefault_id = filteredCourses.length > 0 ? filteredCourses[0].id : 0;
        const filteredVideos = arrVideoUploadsDTO.filter((proj) => proj.course_id === filteredCoursesDefault_id);
        setState({
          arrCourseLookup: filteredCourses,
          arrVideoUploadsListAll: arrVideoUploadsDTO,
          arrVideoUploadsListFilter: filteredVideos,
          dtoVideoUploads: {
            ...VIDEO_UPLOADS_LIST_ALL,
            course_id: filteredCoursesDefault_id || 0
          },
          isLoading: false
        } as StateType);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Error during data fetch:', err);
        setState({ isLoading: false } as StateType);
      }
    },
    [getVideoUploadsAll]
  );

  useEffect(() => {
    if (state.arrCourseLookup.length == 0) {
      getCourseList();
    }
  }, [getCourseList]);

  useEffect(() => {
    if (state.arrCourseLookup.length === 0 || state.arrVideoUploadsListAll.length > 0) return;
    const storedCourseId = typeof window !== 'undefined' ? Number(window.sessionStorage.getItem('StudyNotesId')) : 0;
    if (storedCourseId) {
      getVideoUpdates(state.arrCourseLookup, storedCourseId);
    } else {
      getVideoUpdates1(state.arrCourseLookup);
    }
  }, [state.arrCourseLookup, state.arrVideoUploadsListAll]);

  useEffect(() => {
    if (courseId) {
      sessionStorage.setItem('StudyNotesId', courseId.toString());
    }
  }, [courseId]);

  const validateCourse = useCallback(async () => {
    if (state.dtoVideoUploads.course_name.trim() === '') {
      return 'Course Name is required';
    } else {
      return null;
    }
  }, [state.dtoVideoUploads.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedCourse = value as LookupDTO;
      const filteredVideos = state.arrVideoUploadsListAll.filter((proj) => proj.course_id === selectedCourse.id);
      setState({
        arrVideoUploadsListFilter: filteredVideos,
        dtoVideoUploads: {
          ...state.dtoVideoUploads,
          course_id: selectedCourse.id,
          course_name: selectedCourse.text
        }
      } as StateType);
    },
    [state.dtoVideoUploads]
  );

  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    setOpen1,
    setClose1,
    getYouTubeVideoId,
    currentIndex,
    courseId,
    courseName,
    onCourseChange,
    onCourseBlur,
    StudyNotesId
  };
};

export default useVideoInsights;
