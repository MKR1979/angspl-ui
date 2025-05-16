import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useAddQuestionOptions = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'questionOptions', href: '/question-options/list' }, { label: 'Add Option' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useAddQuestionOptions;
