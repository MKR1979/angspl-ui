import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AdmissionClgDTO from '@/app/types/AdmissionClgDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ADMISSION_CLG } from '@/app/graphql/AdmissionClg';
import * as gConstants from '../../../../../constants/constants';
import { dispatch } from '../../../../../store/';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { GET_COURSE } from '@/app/graphql/Course';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoAdmissionClg: AdmissionClgDTO;
  breadcrumbsItems: BreadcrumbsItem[];
  dtoCourse: CourseAllDTO;
};

type Props = {
  dtoAdmissionClg: AdmissionClgDTO;
};

const useViewAdmissionClg = ({ dtoAdmissionClg }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmissionClg: dtoAdmissionClg,
    dtoCourse: COURSE_LIST_ALL,
    breadcrumbsItems: [
      { label: 'Admission', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-clg/list` },
      { label: 'View Admission' }
    ]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setAdmissionClg] = useReducer(reducer, INITIAL_STATE);
  const [getAdmissionClg] = useLazyQuery(GET_ADMISSION_CLG, { fetchPolicy: 'network-only' });
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAdmissionClg: AdmissionClgDTO = {} as AdmissionClgDTO;
      const { error, data } = await getAdmissionClg({
        variables: {
          id: state.dtoAdmissionClg.id
        }
      });
      if (!error && data) {
        dtoAdmissionClg = data.getAdmissionClg;
      }
      setAdmissionClg({ dtoAdmissionClg: dtoAdmissionClg } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAdmissionClg, state.dtoAdmissionClg.id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.id > 0) {
      getData();
    }
  }, [state.dtoAdmissionClg.id, getData]);

  const getCourseData = useCallback(async (): Promise<void> => {
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoAdmissionClg.course_id
      }
    });

    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setAdmissionClg({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmissionClg.course_id]);

  useEffect(() => {
    if (state.dtoAdmissionClg.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmissionClg.course_id, getCourseData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-clg/edit/` + state.dtoAdmissionClg.id);
    },
    [router, state.dtoAdmissionClg.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-clg/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewAdmissionClg;
