import { useState } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbItems: BreadcrumbsItem[];
};

const useDashboard = () => {
  const initialState: StateType = { breadcrumbItems: [{ label: 'Dashboard' }] };
  const [state] = useState<StateType>(initialState);

  return {
    state
  };
};

export default useDashboard;
