import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useAddProvisionalInvoice = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Provisional Invoices', href: '/provisional-invoices/list' }, { label: 'Add Provisional Invoice' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useAddProvisionalInvoice;
