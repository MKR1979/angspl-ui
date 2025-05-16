import { useState } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbItems: BreadcrumbsItem[];
};

const useStudentDashboard = () => {
  const initialState: StateType = { breadcrumbItems: [{ label: 'Learning Dashboard' }] };
  const [state] = useState<StateType>(initialState);

  return {
    state
  };
};

export default useStudentDashboard;
