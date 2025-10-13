import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ReceiptDTO from '@/app/types/ReceiptDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_PAY_RECEIPT } from '@/app/graphql/Receipt';
import * as Constants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoReceipt: ReceiptDTO;
  arrReceiptDTO: ReceiptDTO[];
  isLoading: boolean;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoReceipt: ReceiptDTO;
};

const useViewPaymentReceipt = ({ dtoReceipt }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoReceipt: dtoReceipt,
    breadcrumbsItems: [
      { label: 'View Payment Receipt', href: `/${Constants.ADMIN_PAYMENT_MODULES}/payment-receipt/list` },
      { label: 'View Payment Receipt' }
    ]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getPayReceipt] = useLazyQuery(GET_PAY_RECEIPT, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoReceipt: ReceiptDTO = {} as ReceiptDTO;
      const { error, data } = await getPayReceipt({
        variables: {
          id: state.dtoReceipt.id
        }
      });
      if (!error && data) {
        dtoReceipt = data.getPayReceipt;
      }
      setState({ dtoReceipt: dtoReceipt } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getPayReceipt, state.dtoReceipt.id]);

  useEffect(() => {
    if (state.dtoReceipt.id > 0) {
      getData();
    }
  }, [state.dtoReceipt.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/payment-receipt/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick
  };
};

export default useViewPaymentReceipt;
