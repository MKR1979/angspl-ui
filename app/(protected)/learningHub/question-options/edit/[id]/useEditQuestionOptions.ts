import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import * as gConstants from '../../../../../constants/constants';


type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useEditQuestionOptions = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Question Options', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list` }, { label: 'Edit Options' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useEditQuestionOptions;
