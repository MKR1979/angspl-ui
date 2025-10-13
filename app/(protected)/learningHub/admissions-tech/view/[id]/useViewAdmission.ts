import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AdmissionDTO from '@/app/types/AdmissionTechDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ADMISSION_TECH } from '@/app/graphql/AdmissionTech';
import { dispatch, useSelector } from '../../../../../store';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import * as gConstants from '../../../../../constants/constants';
import CourseAllDTO, { COURSE_LIST_ALL } from '@/app/types/CourseAllDTO';
import { GET_COURSE } from '@/app/graphql/Course';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoAdmission: AdmissionDTO;
  dtoCourse: CourseAllDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAdmission: AdmissionDTO;
};

const useViewAdmission = ({ dtoAdmission }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmission: dtoAdmission,
    dtoCourse: COURSE_LIST_ALL,
    breadcrumbsItems: [{ label: 'Admission', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/list` }, { label: 'View Admission' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [state, setAdmission] = useReducer(reducer, INITIAL_STATE);
  const [getCourse] = useLazyQuery(GET_COURSE, { fetchPolicy: 'network-only' });
  const [getAdmissionTech] = useLazyQuery(GET_ADMISSION_TECH, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAdmission: AdmissionDTO = {} as AdmissionDTO;
      const { error, data } = await getAdmissionTech({
        variables: {
          id: state.dtoAdmission.id
        }
      });
      if (!error && data) {
        dtoAdmission = data.getAdmissionTech;
      }
      setAdmission({ dtoAdmission: dtoAdmission } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAdmissionTech, state.dtoAdmission.id]);

  useEffect(() => {
    if (state.dtoAdmission.id > 0) {
      getData();
    }
  }, [state.dtoAdmission.id, getData]);

  const getCourseData = useCallback(async (): Promise<void> => {
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoAdmission.course_id
      }
    });

    if (!error && data?.getCourse) {
      const dtoCourse: CourseAllDTO = {
        ...data.getCourse
      };
      setAdmission({ dtoCourse } as StateType);
    }
  }, [getCourse, state.dtoAdmission.course_id]);

  useEffect(() => {
    if (state.dtoAdmission.course_id > 0) {
      getCourseData();
    }
  }, [state.dtoAdmission.course_id, getCourseData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/edit/` + state.dtoAdmission.id);
    },
    [router, state.dtoAdmission.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/list/`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick,
    isEditMode
  };
};

export default useViewAdmission;
