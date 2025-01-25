import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import OrderDTO from '@/app/types/OrderDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ORDER, GET_ORDER_ITEM_LIST } from '@/app/graphql/Order';
import { GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import OrderItemDTO from '@/app/types/OrderItemDTO';
import { defaultPageSize } from '@/app/common/Configuration';
type StateType = {
  dtoOrder: OrderDTO;
  initialState: GridInitialState;
  items: OrderItemDTO[];
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoOrder: OrderDTO;
};

const useViewOrder = ({ dtoOrder }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoOrder: dtoOrder,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    items: [],
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Orders', href: '/orders/list' }, { label: 'View Order' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getOrder] = useLazyQuery(GET_ORDER, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getOrderItemList] = useLazyQuery(GET_ORDER_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const getData = useCallback(async (): Promise<void> => {
    let dtoOrder: OrderDTO = {} as OrderDTO;
    const { error, data } = await getOrder({
      variables: {
        id: state.dtoOrder.id
      }
    });
    if (!error && data?.getOrder) {
      dtoOrder = data.getOrder;
    }
    setState({ dtoOrder: dtoOrder } as StateType);
  }, [getOrder, state.dtoOrder.id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: OrderItemDTO[] = [];
    const { error, data } = await getOrderItemList({
      variables: {
        order_id: state.dtoOrder.id
      }
    });
    if (!error && data?.getOrderItemList) {
      arrItems = [...data.getOrderItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getOrderItemList, state.dtoOrder.id]);

  useEffect(() => {
    if (state.dtoOrder.id > 0) {
      getData();
      getItems();
    }
  }, [state.dtoOrder.id, getData, getItems]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/orders/edit/' + state.dtoOrder.id);
    },
    [router, state.dtoOrder.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/orders/list');
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

export default useViewOrder;
