
import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_FEE_HEAD } from '@/app/graphql/FeeHead';
import * as Constants from '../../../../constants/constants'
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoFeeHead: FeeHeadDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoFeeHead: FeeHeadDTO;
};

const useViewFeeHead = ({ dtoFeeHead }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoFeeHead: dtoFeeHead,
    breadcrumbsItems: [{ label: 'FeeHeads', href: `/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list` }, { label: 'View FeeHeads' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getFeeHead] = useLazyQuery(GET_FEE_HEAD, {
    fetchPolicy: 'network-only'
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoFeeHead: FeeHeadDTO = {} as FeeHeadDTO;
      const { error, data } = await getFeeHead({
        variables: {
          id: state.dtoFeeHead.id
        }
      });
      if (!error && data) {
        dtoFeeHead = data.getFeeHead;
      }
      setState({ dtoFeeHead: dtoFeeHead } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeHead, state.dtoFeeHead.id]);

  useEffect(() => {
    if (state.dtoFeeHead.id > 0) {
      getData();
    }
  }, [state.dtoFeeHead.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/edit/` + state.dtoFeeHead.id);
    },
    [router, state.dtoFeeHead.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewFeeHead;
