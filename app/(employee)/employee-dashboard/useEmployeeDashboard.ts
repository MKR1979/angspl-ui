import { useState } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbItems: BreadcrumbsItem[];
};

const useEmployeeDashboard = () => {
  const initialState: StateType = { breadcrumbItems: [{ label: 'Employee Dashboard' }] };
  const [state] = useState<StateType>(initialState);

  return {
    state
  };
};

export default useEmployeeDashboard;
