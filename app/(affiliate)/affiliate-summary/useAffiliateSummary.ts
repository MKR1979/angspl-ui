import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import AffiliateDTO from '@/app/types/AffiliateDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_AFFILIATE_SUMMARY } from '@/app/graphql/Affiliate';
import { useSelector } from '../../store';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoAffiliate: AffiliateDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAffiliate: AffiliateDTO;
};

const useAffiliateSummary = ({ dtoAffiliate }: Props) => {
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAffiliate: dtoAffiliate,
    breadcrumbsItems: [{ label: 'Affiliate Summary' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [getAffiliateSummary] = useLazyQuery(GET_AFFILIATE_SUMMARY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getAffiliateSummaryData = useCallback(async (): Promise<void> => {
    try {
      let dtoAffiliate: AffiliateDTO = {} as AffiliateDTO;
      const { error, data } = await getAffiliateSummary({
        variables: {
          affiliate_id: Number(loginUser_id)
        }
      });
      if (!error && data) {
        dtoAffiliate = data.getAffiliateSummary;
      }
      setState({ dtoAffiliate: dtoAffiliate } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAffiliateSummary]);

  useEffect(() => {
    getAffiliateSummaryData();
  }, [getAffiliateSummaryData]);

  return {
    state,
  };
};

export default useAffiliateSummary;