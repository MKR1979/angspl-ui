import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AffiliateDTO from '@/app/types/AffiliateDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_AFFILIATE } from '@/app/graphql/Affiliate';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import { dispatch } from '../../../../../store';
import * as Constants from '../../../../constants/constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../../../constants/messages-constants';

type StateType = {
  dtoAffiliate: AffiliateDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAffiliate: AffiliateDTO;
};

const useViewAffiliate = ({ dtoAffiliate }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAffiliate: dtoAffiliate,
    breadcrumbsItems: [{ label: 'Review Affiliate', href: `/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list` }, { label: 'View Affiliate' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setAffiliate] = useReducer(reducer, INITIAL_STATE);

  const [getAffiliate] = useLazyQuery(GET_AFFILIATE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAffiliate: AffiliateDTO = {} as AffiliateDTO;
      const { error, data } = await getAffiliate({
        variables: {
          id: state.dtoAffiliate.id
        }
      });
      if (!error && data) {
        dtoAffiliate = data.getAffiliate;
      }
      setAffiliate({ dtoAffiliate: dtoAffiliate } as StateType);
    }
    catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAffiliate, state.dtoAffiliate.id]);

  useEffect(() => {
    if (state.dtoAffiliate.id > 0) {
      getData();
    }
  }, [state.dtoAffiliate.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/edit/` + state.dtoAffiliate.id);
    },
    [router, state.dtoAffiliate.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick,
  };
};

export default useViewAffiliate;
