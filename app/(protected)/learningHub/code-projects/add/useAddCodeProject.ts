import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import * as gConstants from '../../../../constants/constants';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useAddCodeProject = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Code Project', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/code-projects/list` }, { label: 'Add Code Project' }]
  });
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useAddCodeProject;