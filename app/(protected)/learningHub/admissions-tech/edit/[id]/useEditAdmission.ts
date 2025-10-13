import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import * as gConstants from '../../../../../constants/constants';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useEditAdmission = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Admissions', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/list` }, { label: 'Edit Admission' }]
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
