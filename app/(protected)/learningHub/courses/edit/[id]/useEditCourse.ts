import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import * as gConstants from '../../../../../constants/constants';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useEditCourse = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Courses', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list` }, { label: 'Edit Course' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useEditCourse;
