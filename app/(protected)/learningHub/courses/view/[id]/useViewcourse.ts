import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import courseDTO from '@/app/types/CourseDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COURSE } from '@/app/graphql/Course';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoCourse: courseDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCourse: courseDTO;
};

const useViewCourse = ({ dtoCourse }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCourse: dtoCourse,
    breadcrumbsItems: [{ label: 'Courses', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list` }, { label: 'View Course' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setCourse] = useReducer(reducer, INITIAL_STATE);

  const [getCourse] = useLazyQuery(GET_COURSE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoCourse: courseDTO = {} as courseDTO;
      const { error, data } = await getCourse({
        variables: {
          id: state.dtoCourse.id
        }
      });
      if (!error && data) {
        dtoCourse = data.getCourse;
      }
      setCourse({ dtoCourse: dtoCourse } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourse, state.dtoCourse.id]);

  useEffect(() => {
    if (state.dtoCourse.id > 0) {
      getData();
    }
  }, [state.dtoCourse.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/edit/` + state.dtoCourse.id);
    },
    [router, state.dtoCourse.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCourse;
