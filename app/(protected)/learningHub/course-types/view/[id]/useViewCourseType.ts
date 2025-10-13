import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CourseTypeDTO from '@/app/types/CourseTypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COURSE_TYPE } from '@/app/graphql/CourseType';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoCourseType: CourseTypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCourseType: CourseTypeDTO;
};

const useViewCourseType = ({ dtoCourseType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCourseType: dtoCourseType,
    breadcrumbsItems: [{ label: 'Course-types', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list` }, { label: 'View CourseType' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getGroupType] = useLazyQuery(GET_COURSE_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const showSnackbar = useSnackbar();
  const [getCourseType] = useLazyQuery(GET_COURSE_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoCourseType: CourseTypeDTO = {} as CourseTypeDTO;
      const { error, data } = await getCourseType({
        variables: {
          id: state.dtoCourseType.id
        }
      });
      if (!error && data) {
        dtoCourseType = data.getCourseType;
      }
      setState({ dtoCourseType: dtoCourseType } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseType, state.dtoCourseType.id]);

  useEffect(() => {
    if (state.dtoCourseType.id > 0) {
      getData();
    }
  }, [state.dtoCourseType.id, getData]);


  const getGroupName = useCallback(async (): Promise<void> => {
    let dtoCourseType: CourseTypeDTO = {} as CourseTypeDTO;
    const { error, data } = await getCourseType({
      variables: {
        id: state.dtoCourseType.id
      }
    });
    if (!error && data) {
      dtoCourseType = data.getGroupType;
    }
    setState({ dtoCourseType: dtoCourseType } as StateType);
  }, [getGroupType, state.dtoCourseType.id]);

  useEffect(() => {
    if (state.dtoCourseType.id > 0) {
      getData();
    }
  }, [state.dtoCourseType.id, getGroupName]);


  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/edit/` + state.dtoCourseType.id);
    },
    [router, state.dtoCourseType.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCourseType;
