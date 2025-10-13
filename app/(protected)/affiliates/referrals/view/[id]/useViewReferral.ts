import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ReferralDTO from '@/app/types/ReferralDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_REFERRAL } from '@/app/graphql/Referral';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import { dispatch } from '../../../../../store';
import * as Constants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoReferral: ReferralDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoReferral: ReferralDTO;
};

const useViewReferral = ({ dtoReferral }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoReferral: dtoReferral,
    breadcrumbsItems: [{ label: 'Review Referral', href: `/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list` }, { label: 'View Referral' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setReferral] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getReferral] = useLazyQuery(GET_REFERRAL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoReferral: ReferralDTO = {} as ReferralDTO;
      const { error, data } = await getReferral({
        variables: {
          id: state.dtoReferral.id
        }
      });
      if (!error && data) {
        dtoReferral = data.getReferral;
      }
      setReferral({ dtoReferral: dtoReferral } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getReferral, state.dtoReferral.id]);

  useEffect(() => {
    if (state.dtoReferral.id > 0) {
      getData();
    }
  }, [state.dtoReferral.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/edit/` + state.dtoReferral.id);
    },
    [router, state.dtoReferral.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick,
  };
};

export default useViewReferral;
