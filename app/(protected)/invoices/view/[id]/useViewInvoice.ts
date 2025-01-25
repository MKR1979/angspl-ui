import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import InvoiceDTO, { INVOICE } from '@/app/types/InvoiceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_INVOICE, GET_INVOICE_ITEM_LIST } from '@/app/graphql/Invoice';
import { GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import InvoiceItemDTO from '@/app/types/InvoiceItemDTO';
import { defaultPageSize } from '@/app/common/Configuration';
type StateType = {
  dtoInvoice: InvoiceDTO;
  initialState: GridInitialState;
  items: InvoiceItemDTO[];
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoInvoice: InvoiceDTO;
};

const useViewInvoice = ({ dtoInvoice }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoInvoice: dtoInvoice,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    items: [],
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Invoices', href: '/invoices/list' }, { label: 'View Invoice' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getInvoice] = useLazyQuery(GET_INVOICE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getInvoiceItemList] = useLazyQuery(GET_INVOICE_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const getData = useCallback(async (): Promise<void> => {
    let dtoInvoice: InvoiceDTO = INVOICE;
    const { error, data } = await getInvoice({
      variables: {
        id: state.dtoInvoice.id
      }
    });
    if (!error && data?.getInvoice) {
      dtoInvoice = data.getInvoice;
    }
    setState({ dtoInvoice: dtoInvoice } as StateType);
  }, [getInvoice, state.dtoInvoice.id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: InvoiceItemDTO[] = [];
    const { error, data } = await getInvoiceItemList({
      variables: {
        invoice_id: state.dtoInvoice.id
      }
    });
    if (!error && data?.getInvoiceItemList) {
      arrItems = [...data.getInvoiceItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getInvoiceItemList, state.dtoInvoice.id]);

  useEffect(() => {
    if (state.dtoInvoice.id > 0) {
      getData();
      getItems();
    }
  }, [state.dtoInvoice.id, getData, getItems]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/invoices/edit/' + state.dtoInvoice.id);
    },
    [router, state.dtoInvoice.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/invoices/list');
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

export default useViewInvoice;
