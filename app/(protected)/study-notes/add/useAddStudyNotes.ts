import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useAddStudyNotes = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Study Notes', href: '/study-notes/list' }, { label: 'Add Study Notes' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useAddStudyNotes;
