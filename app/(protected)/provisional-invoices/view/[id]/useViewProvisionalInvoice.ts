import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ProvisionalInvoiceDTO from '@/app/types/ProvisionalInvoiceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_PROVISIONAL_INVOICE, GET_PROVISIONAL_INVOICE_ITEM_LIST } from '@/app/graphql/ProvisionalInvoice';
import { GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import ProvisionalInvoiceItemDTO from '@/app/types/ProvisionalInvoiceItemDTO';
import { defaultPageSize } from '@/app/common/Configuration';
type StateType = {
  dtoProvisionalInvoice: ProvisionalInvoiceDTO;
  initialState: GridInitialState;
  items: ProvisionalInvoiceItemDTO[];
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoProvisionalInvoice: ProvisionalInvoiceDTO;
};

const useViewProvisionalInvoice = ({ dtoProvisionalInvoice }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoProvisionalInvoice: dtoProvisionalInvoice,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    items: [],
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Provisional Invoices', href: '/provisional-invoices/list' }, { label: 'View Provisional Invoice' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getProvisionalInvoice] = useLazyQuery(GET_PROVISIONAL_INVOICE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getProvisionalInvoiceItemList] = useLazyQuery(GET_PROVISIONAL_INVOICE_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const getData = useCallback(async (): Promise<void> => {
    let dtoProvisionalInvoice: ProvisionalInvoiceDTO = {} as ProvisionalInvoiceDTO;
    const { error, data } = await getProvisionalInvoice({
      variables: {
        id: state.dtoProvisionalInvoice.id
      }
    });
    if (!error && data?.getProvisionalInvoice) {
      dtoProvisionalInvoice = data.getProvisionalInvoice;
    }
    setState({ dtoProvisionalInvoice: dtoProvisionalInvoice } as StateType);
  }, [getProvisionalInvoice, state.dtoProvisionalInvoice.id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: ProvisionalInvoiceItemDTO[] = [];
    const { error, data } = await getProvisionalInvoiceItemList({
      variables: {
        provisional_invoice_id: state.dtoProvisionalInvoice.id
      }
    });
    if (!error && data?.getProvisionalInvoiceItemList) {
      arrItems = [...data.getProvisionalInvoiceItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getProvisionalInvoiceItemList, state.dtoProvisionalInvoice.id]);

  useEffect(() => {
    if (state.dtoProvisionalInvoice.id > 0) {
      getData();
      getItems();
    }
  }, [state.dtoProvisionalInvoice.id, getData, getItems]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/provisional-invoices/edit/' + state.dtoProvisionalInvoice.id);
    },
    [router, state.dtoProvisionalInvoice.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/provisional-invoices/list');
    },
    [router]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    apiRef,
    state,
    paginationModel,
    setPaginationModel,
    onEditClick,
    onCancelClick,
    handleTabChange
  };
};

export default useViewProvisionalInvoice;
