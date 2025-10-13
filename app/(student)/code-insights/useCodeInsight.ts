import { useState } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CODE_PROJECT_ALL } from '@/app/graphql/CodeProject';
import LookupDTO from '@/app/types/LookupDTO';
import CodeProjectDTO, { CODE_PROJECT } from '@/app/types/CodeProjectDTO';
import {COURSE_LOOKUP_BY_USER_ID } from '@/app/graphql/Course';
import { generatePDF } from '@/app/custom-components/MyPdfGeneration';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { RootState, useSelector } from '@/app/store';

type ErrorMessageType = {
  course_name: string | null;
  title: string | null;
  description: string | null;
  source_code: string | null;
  status: string | null;
};
type StateType = {
  arrCodeProjectListAll: CodeProjectDTO[];
  arrCodeProjectListFilter: CodeProjectDTO[];
  dtoCodeProject: CodeProjectDTO;
  isLoading: boolean;
  open1: boolean;
  arrCourseLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  course_name: null,
  title: null,
  description: null,
  source_code: null,
  status: null
};

type Props = {
  courseId?: number;
  courseName?: string;
  CodeProjectId?: number;
};

const useCodeInsight = ({ courseId, courseName, CodeProjectId }: Props) => {
  const INITIAL_STATE: StateType = {
    arrCodeProjectListAll: [],
    arrCodeProjectListFilter: [],
    dtoCodeProject: CODE_PROJECT,
    isLoading: false,
    arrCourseLookup: [] as LookupDTO[],
    open1: false,
    errorMessages: { ...ERROR_MESSAGES }
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [copied, setCopied] = useState(false);
  const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);
  const showSnackbar = useSnackbar();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [getCodeProjectsAll] = useLazyQuery(GET_CODE_PROJECT_ALL, { fetchPolicy: 'network-only' });
  // const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [getCourseByUserIdLookup] = useLazyQuery(COURSE_LOOKUP_BY_USER_ID, { fetchPolicy: 'network-only' });

  // const getCourseList = useCallback(async (): Promise<void> => {
  //   try {
  //     let arrCourseLookup: LookupDTO[] = [];
  //     const { error, data } = await getCourseLookup();
  //     if (!error && data) {
  //       arrCourseLookup = data.getCourseLookup;
  //     }
  //     setState({ arrCourseLookup: arrCourseLookup } as StateType);
  //   } catch (err) {
  //     console.error('Error loading quiz question:', err);
  //     showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
  //   }
  // }, [getCourseLookup]);

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
      }

      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseByUserIdLookup, companyInfo.company_type]);

  const getCodeProjects = useCallback(
    async (arrCourseLookupParam: LookupDTO[], selectedCourseId?: number): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrCodeProjectDTO: CodeProjectDTO[] = [];
      try {
        const { data } = await getCodeProjectsAll();
        if (data?.getCodeProjectsAll) {
          arrCodeProjectDTO = data.getCodeProjectsAll;
        }
        const usedCourseIds = new Set(arrCodeProjectDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((course) => typeof course.id === 'number' && usedCourseIds.has(course.id));
        const filteredProjects = arrCodeProjectDTO.filter((proj) => proj.course_id === selectedCourseId);
        setState({
          arrCourseLookup: filteredCourses,
          arrCodeProjectListAll: arrCodeProjectDTO,
          arrCodeProjectListFilter: filteredProjects,
          dtoCodeProject: {
            ...CODE_PROJECT,
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
    [getCodeProjectsAll]
  );

  const getCodeProjects1 = useCallback(
    async (arrCourseLookupParam: LookupDTO[]): Promise<void> => {
      setState({ isLoading: true } as StateType);
      let arrCodeProjectDTO: CodeProjectDTO[] = [];

      try {
        const { data } = await getCodeProjectsAll();
        if (data?.getCodeProjectsAll) {
          arrCodeProjectDTO = data.getCodeProjectsAll;
        }
        const usedCourseIds = new Set(arrCodeProjectDTO.map((proj) => proj.course_id));
        const filteredCourses = arrCourseLookupParam.filter((course) => typeof course.id === 'number' && usedCourseIds.has(course.id));
        const filteredCoursesDefault_id = filteredCourses.length > 0 ? filteredCourses[0].id : 0;
        const filteredProjects = arrCodeProjectDTO.filter((proj) => proj.course_id === filteredCoursesDefault_id);
        setState({
          arrCourseLookup: filteredCourses,
          arrCodeProjectListAll: arrCodeProjectDTO,
          arrCodeProjectListFilter: filteredProjects,
          dtoCodeProject: {
            ...CODE_PROJECT,
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
    [getCodeProjectsAll]
  );

  useEffect(() => {
    if (state.arrCourseLookup.length == 0) {
      getCourseList();
    }
  }, [getCourseList]);

  useEffect(() => {
    if (state.arrCourseLookup.length === 0 || state.arrCodeProjectListAll.length > 0) return;
    const storedCourseId = typeof window !== 'undefined' ? Number(window.sessionStorage.getItem('codeProjectId')) : 0;
    //const targetCourseId = storedCourseId || state.arrCourseLookup[0]?.id;
    if (storedCourseId) {
      getCodeProjects(state.arrCourseLookup, storedCourseId);
    } else {
      getCodeProjects1(state.arrCourseLookup);
    }
  }, [state.arrCourseLookup, state.arrCodeProjectListAll]);

  useEffect(() => {
    if (courseId) {
      sessionStorage.setItem('codeProjectId', courseId.toString());
    }
  }, [courseId]);

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedCourse = value as LookupDTO;
      const filteredProjects = state.arrCodeProjectListAll.filter((proj) => proj.course_id === selectedCourse.id);
      setState({
        arrCodeProjectListFilter: filteredProjects,
        dtoCodeProject: {
          ...state.dtoCodeProject,
          course_id: selectedCourse.id,
          course_name: selectedCourse.text
        }
      } as StateType);
    },
    [state.dtoCodeProject]
  );

  const goToNext = () => {
    if (currentIndex < state.arrCodeProjectListAll.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // const currentProgram = state.arrCodeProjectListFilter[0] || {};
  const currentProgram = state.arrCodeProjectListFilter[currentIndex] || {};

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);

  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const handleCopy = async () => {
    const codeText = currentProgram.source_code?.code;
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
  //     content: currentProgram.source_code?.code
  //   });
  // };
  const handleDownloadPdf = async () => {
    await generatePDF({
      title: currentProgram.title,
      content: currentProgram.source_code?.code,
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
    // onCourseBlur,
    isPrevDisabled: currentIndex === 0,
    isNextDisabled: currentIndex === state.arrCodeProjectListFilter.length - 1,
    handleDownloadPdf,
    getCodeProjects,
    CodeProjectId,
    handleCopy,
    copied
  };
};
export default useCodeInsight;
