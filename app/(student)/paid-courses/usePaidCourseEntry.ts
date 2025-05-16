import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import PaidCourseDTO, { PAID_COURSE } from '@/app/types/PaidCourseDTO';
import { COURSE_LIST_ALL } from '@/app/graphql/Course';
import CourseDTO, { COURSE } from '@/app/types/CourseDTO';
import CourseAllDTO from '@/app/types/CourseAllDTO';

type ErrorMessageType = {
  Course_Name: string | null;
  Course_Code: string | null;
  Duration: string | null;
  Price: number | null;
  Content: string | null;
  Notes: string | null;
  Sample_Questions: string | null;
  Exam_Quiz: string | null;
  Sample_Questions_File: string | null;
};

type StateType = {
  arrCourseListAll: CourseAllDTO[];
  dtoCourseAll: CourseDTO;
  dtoPaidCourse: PaidCourseDTO;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
};

const ERROR_MESSAGES: ErrorMessageType = {
  Course_Name: null,
  Course_Code: null,
  Duration: null,
  Price: null,
  Content: null,
  Notes: null,
  Sample_Questions: null,
  Exam_Quiz: null,
  Sample_Questions_File: null
};

const INITIAL_STATE: StateType = {
  arrCourseListAll: [],
  dtoCourseAll: COURSE,
  dtoPaidCourse: PAID_COURSE,
  errorMessages: ERROR_MESSAGES,
  isLoading: true
};

const reducer = (state: StateType, action: Partial<StateType>): StateType => {
  return { ...state, ...action };
};

const usePaidCourseEntry = () => {
  const router = useRouter();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getCourseListAll] = useLazyQuery(COURSE_LIST_ALL, { fetchPolicy: 'network-only' });

  const getCourses = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrCourseAllDTO: CourseAllDTO[] = [];
    const { error, data } = await getCourseListAll();
    if (!error && data?.getCourseListAll) {
      arrCourseAllDTO = data.getCourseListAll.map((item: CourseAllDTO) => {
        return {
          ...item,
          id: parseInt(item.id.toString()),
          course_name: item.course_name,
          course_code: item.course_code,
          price: item.price
        };
      });
    }
    setState({
      arrCourseListAll: arrCourseAllDTO,
      isLoading: false
    } as StateType);
  }, [getCourseListAll]);

  const onSaveClickCodeInsights = useCallback((course_id: number, course_name: string | null) => {
    router.push(`/code-insights?courseId=${encodeURIComponent(course_id)}&courseName=${encodeURIComponent(course_name ?? '')}`);
  }, []);

  const onSaveClick = useCallback((quiz_id: number, quiz_name: string | null) => {
    router.push(`/quiz-data?quizId=${encodeURIComponent(quiz_id)}&quizName=${encodeURIComponent(quiz_name ?? '')}`);
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return { state, onSaveClick, onSaveClickCodeInsights };
};

export default usePaidCourseEntry;