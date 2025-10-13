import { useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import * as Constants from '../../../../constants/constants';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};

const useEditReferral = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Review Referral', href: `/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list` }, { label: 'Edit Referral' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state
  };
};

export default useEditReferral;
