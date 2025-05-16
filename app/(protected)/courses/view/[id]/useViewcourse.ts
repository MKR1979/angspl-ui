import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import courseDTO from '@/app/types/CourseDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COURSE } from '@/app/graphql/Course';
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
    breadcrumbsItems: [{ label: 'Courses', href: '/courses/list' }, { label: 'View Course' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setCourse] = useReducer(reducer, INITIAL_STATE);

  const [getCourse] = useLazyQuery(GET_COURSE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
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
  }, [getCourse, state.dtoCourse.id]);

  useEffect(() => {
    if (state.dtoCourse.id > 0) {
      getData();
    }
  }, [state.dtoCourse.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/courses/edit/' + state.dtoCourse.id);
    },
    [router, state.dtoCourse.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/courses/list');
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
