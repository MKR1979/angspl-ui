import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ReferralDTO from '@/app/types/ReferralDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_REFERRAL } from '@/app/graphql/Referral';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoReferral: ReferralDTO;
  breadcrumbsItems: BreadcrumbsItem[];
  stepDates?: Record<string, string>; // ✅ ADDED
};

type Props = {
  dtoReferral: ReferralDTO;
};

const useViewReferral = ({ dtoReferral }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoReferral: dtoReferral,
    breadcrumbsItems: [{ label: 'Referral', href: '/affiliate-referrals/list' }, { label: 'View Referral' }],
    stepDates: {} // ✅ INITIALLY EMPTY
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setReferral] = useReducer(reducer, INITIAL_STATE);

  const [getReferral] = useLazyQuery(GET_REFERRAL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const extractStepDates = (statusHistory: any[]): Record<string, string> => {
    const map: Record<string, string> = {};
    statusHistory.forEach(item => {
      if (item.new_status && item.created_at) {
        map[item.new_status] = item.created_at;
      }
    });
    return map;
  };

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
        const stepDates = extractStepDates(dtoReferral.status_history || []); // ✅ EXTRACT
        setReferral({ dtoReferral, stepDates } as StateType); // ✅ SET
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

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/affiliate-referrals/list');
    },
    [router]
  );

  return {
    state,
    onCancelClick
  };
};

export default useViewReferral;
