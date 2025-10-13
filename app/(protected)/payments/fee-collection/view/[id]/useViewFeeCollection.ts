import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_FEE_COLLECTION } from '@/app/graphql/FeeCollection';
import * as Constants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoFeeCollection: FeeCollectionDTO;
  arrFeeCollectionDTO: FeeCollectionDTO[];
  isLoading: boolean;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoFeeCollection: FeeCollectionDTO;
};

const useViewFeeCollection = ({ dtoFeeCollection }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoFeeCollection: dtoFeeCollection,
    breadcrumbsItems: [{ label: 'View Fee Collection', href: `/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/list` }, { label: 'View Fee Collection' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getFeeCollection] = useLazyQuery(GET_FEE_COLLECTION, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoFeeCollection: FeeCollectionDTO = {} as FeeCollectionDTO;
      const { error, data } = await getFeeCollection({
        variables: {
          id: state.dtoFeeCollection.id
        }
      });
      if (!error && data) {
        dtoFeeCollection = data.getFeeCollection;
      }
      setState({ dtoFeeCollection: dtoFeeCollection } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeCollection, state.dtoFeeCollection.id]);

  useEffect(() => {
    if (state.dtoFeeCollection.id > 0) {
      getData();
    }
  }, [state.dtoFeeCollection.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick
  };
};

export default useViewFeeCollection;