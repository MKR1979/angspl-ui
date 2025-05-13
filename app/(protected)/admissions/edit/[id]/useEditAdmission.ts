import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useEditAdmission = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Admissions', href: '/admissions/list' }, { label: 'Edit Admission' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    console.log('Type action', action);
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useEditAdmission;
