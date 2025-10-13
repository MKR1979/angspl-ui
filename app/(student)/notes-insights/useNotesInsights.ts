import { useState } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_STUDY_NOTES_ALL } from '@/app/graphql/StudyNotes';
import LookupDTO from '@/app/types/LookupDTO';
import StudyNotesDTO, { STUDY_NOTES } from '@/app/types/StudyNotesDTO';
// import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { COURSE_LOOKUP_BY_USER_ID } from '@/app/graphql/Course';
import { generatePDF } from '@/app/custom-components/MyPdfGeneration';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { RootState, useSelector } from '@/app/store';

type ErrorMessageType = {
  course_name: string | null;
  title: string | null;
  description: string | null;
  status: string | null;
};
type StateType = {
  arrStudyNotesListAll: StudyNotesDTO[];
  arrStudyNotesListFilter: StudyNotesDTO[];
  dtoStudyNotes: StudyNotesDTO;
  isLoading: boolean;
  open1: boolean;
  arrCourseLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  course_name: null,
  title: null,
  description: null,
  status: null
};

type Props = {
  courseId?: number;
  courseName?: string;
  StudyNotesId?: number;
};

const useNotesInsight = ({ courseId, courseName, StudyNotesId }: Props) => {
  const INITIAL_STATE: StateType = {
    arrStudyNotesListAll: [],
    arrStudyNotesListFilter: [],
    dtoStudyNotes: STUDY_NOTES,
    isLoading: false,
    arrCourseLookup: [] as LookupDTO[],
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);
  // const [getCompanyInfoByDomain] = useLazyQuery(GET_COMPANY_INFO_BY_DOMAIN, { fetchPolicy: 'network-only' });
  const [getStudyNotesAll] = useLazyQuery(GET_STUDY_NOTES_ALL, { fetchPolicy: 'network-only' });
  const showSnackbar = useSnackbar();
  // const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [getCourseByUserIdLookup] = useLazyQuery(COURSE_LOOKUP_BY_USER_ID, { fetchPolicy: 'network-only' });

  // const getCourseList = useCallback(async (): Promise<void> => {
  //   try {
  //     let arrCourseLookup: LookupDTO[] = [];
  //     const { error, data } = await getCourseByUserIdLookup();
  //     if (!error && data) {
  //       arrCourseLookup = data.getCourseLookup;
  //     }
  //     setState({ arrCourseLookup: arrCourseLookup } as StateType);
  //   } catch (err) {
  //     console.error('Error loading quiz question:', err);
  //     showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
  //   }
  // }, [getCourseByUserIdLookup]);

  const getCourseList = useCallback(async (): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseByUserIdLookup({
        variables: {
          user_id: loginUser_id,
          group_name: companyInfo.company_type,
        }
      });
      if (!error && data) {
        arrCourseLookup = data.getCourseByUserIdLookup;
        console.log('course data we get', data.getCourseByUserIdLookup);
      }

      setState({ arrCourseLookup: arrCourseLookup } as StateType);
      console.log('State after setState: arrCourseLookup:**************', arrCourseLookup); // Log immediately after setting state
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseByUserIdLookup, companyInfo.company_type]);

  const getNotes = useCallback(
    async (arrCourseLookupParam: LookupDTO[], selectedCourseId?: number): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrStudyNotesDTO: StudyNotesDTO[] = [];

      try {
        const { data } = await getStudyNotesAll();
        console.log("Fetched data:", data);
        if (data?.getStudyNotesAll) {
          arrStudyNotesDTO = data.getStudyNotesAll;
        }
        const usedCourseIds = new Set(arrStudyNotesDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((notes) => typeof notes.id === 'number' && usedCourseIds.has(notes.id));
        const filteredNotes = arrStudyNotesDTO.filter((proj) => proj.course_id === selectedCourseId);
        setState({
          arrCourseLookup: filteredCourses,
          arrStudyNotesListAll: arrStudyNotesDTO,
          arrStudyNotesListFilter: filteredNotes,

          dtoStudyNotes: {
            ...STUDY_NOTES,
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
    [getStudyNotesAll]
  );

  const getNotes1 = useCallback(
    async (arrCourseLookupParam: LookupDTO[]): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrStudyNotesDTO: StudyNotesDTO[] = [];

      try {
        const { data } = await getStudyNotesAll();
        if (data?.getStudyNotesAll) {
          arrStudyNotesDTO = data.getStudyNotesAll;
        }
        const usedCourseIds = new Set(arrStudyNotesDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((notes) => typeof notes.id === 'number' && usedCourseIds.has(notes.id));
        const filteredCoursesDefault_id = filteredCourses.length > 0 ? filteredCourses[0].id : 0;
        const filteredNotes = arrStudyNotesDTO.filter((proj) => proj.course_id === filteredCoursesDefault_id);
        setState({
          arrCourseLookup: filteredCourses,
          arrStudyNotesListAll: arrStudyNotesDTO,
          arrStudyNotesListFilter: filteredNotes,
          dtoStudyNotes: {
            ...STUDY_NOTES,
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
    [getStudyNotesAll]
  );

  useEffect(() => {
    if (state.arrCourseLookup.length == 0) {
      getCourseList();
    }
  }, [getCourseList]);

  useEffect(() => {
    if (state.arrCourseLookup.length === 0 || state.arrStudyNotesListAll.length > 0) return;
    const storedCourseId = typeof window !== 'undefined' ? Number(window.sessionStorage.getItem('StudyNotesId')) : 0;
    if (storedCourseId) {
      getNotes(state.arrCourseLookup, storedCourseId);
    } else {
      getNotes1(state.arrCourseLookup);
    }
  }, [state.arrCourseLookup, state.arrStudyNotesListAll]);

  useEffect(() => {
    if (courseId) {
      sessionStorage.setItem('StudyNotesId', courseId.toString());
    }
  }, [courseId]);

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedCourse = value as LookupDTO;
      const filteredProjects = state.arrStudyNotesListAll.filter((proj) => proj.course_id === selectedCourse.id);
      setState({
        arrStudyNotesListFilter: filteredProjects,
        dtoStudyNotes: {
          ...state.dtoStudyNotes,
          course_id: selectedCourse.id,
          course_name: selectedCourse.text
        }
      } as StateType);
    },
    [state.dtoStudyNotes]
  );

  const goToNext = () => {
    if (currentIndex < state.arrStudyNotesListAll.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentProgram = state.arrStudyNotesListFilter[currentIndex] || {};

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const handleCopy = async () => {
    const codeText = currentProgram.description?.code;
    if (codeText) {
      try {
        await navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 900);
      } catch (err) {
        console.error('Clipboard copy failed', err);
      }
    }
  };

  // const handleDownloadPdf = async () => {
  //   await generatePDF({
  //     title: currentProgram.title,
  //     content: currentProgram.description?.code
  //   });
  // };

  const handleDownloadPdf = async () => {
    await generatePDF({
      title: currentProgram.title,
      content: currentProgram.description?.code,
      logoUrl: companyInfo.logo_url,
      company: {
        email: companyInfo.company_email,
        website: 'adhyayan.online',
        contact: '+91-9522933330',
        contactUsPage: 'adhyayan.online/contact-us'
      }
    });
  };

  return {
    currentProgram,
    state,
    goToNext,
    setOpen1,
    courseId,
    courseName,
    goToPrev,
    setClose1,
    onCourseChange,
    isPrevDisabled: currentIndex === 0,
    isNextDisabled: currentIndex === state.arrStudyNotesListFilter.length - 1,
    handleDownloadPdf,
    getNotes,
    StudyNotesId,
    handleCopy,
    copied
  };
};
export default useNotesInsight;
