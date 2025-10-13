import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AdmissionSchoolDTO from '@/app/types/AdmissionSchDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ADMISSION_SCH } from '@/app/graphql/AdmissionSch';
import * as gConstants from '../../../../../constants/constants';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { GET_COURSE } from '@/app/graphql/Course';
import { dispatch} from '../../../../../store';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoAdmissionSchool: AdmissionSchoolDTO;
  breadcrumbsItems: BreadcrumbsItem[];
  dtoCourse: CourseAllDTO;
};

type Props = {
  dtoAdmissionSchool: AdmissionSchoolDTO;
};

const useViewAdmissionSch = ({ dtoAdmissionSchool }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmissionSchool: dtoAdmissionSchool,
    dtoCourse: COURSE_LIST_ALL,
    breadcrumbsItems: [
      { label: 'Admission', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-sch/list` },
      { label: 'View Admission' }
    ]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
const showSnackbar = useSnackbar();
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [state, setAdmissionForm] = useReducer(reducer, INITIAL_STATE);
  const [getAdmissionSch] = useLazyQuery(GET_ADMISSION_SCH, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
    let dtoAdmissionSchool: AdmissionSchoolDTO = {} as AdmissionSchoolDTO;
    const { error, data } = await getAdmissionSch({
      variables: {
        id: state.dtoAdmissionSchool.id
      }
    });
    if (!error && data) {
      dtoAdmissionSchool = data.getAdmissionSch;
    }
    setAdmissionForm({ dtoAdmissionSchool: dtoAdmissionSchool } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAdmissionSch, state.dtoAdmissionSchool.id]);

  useEffect(() => {
    if (state.dtoAdmissionSchool.id > 0) {
      getData();
    }
  }, [state.dtoAdmissionSchool.id, getData]);

  const getCourseData = useCallback(async (): Promise<void> => {
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoAdmissionSchool.course_id
      }
    });

    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setAdmissionForm({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmissionSchool.course_id]);

  useEffect(() => {
    if (state.dtoAdmissionSchool.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmissionSchool.course_id, getCourseData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-sch/edit/` + state.dtoAdmissionSchool.id);
    },
    [router, state.dtoAdmissionSchool.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-sch/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewAdmissionSch;
