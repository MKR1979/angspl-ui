import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DeliverySlipDTO from '@/app/types/DeliverySlipDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DELIVERY_SLIP, GET_DELIVERY_SLIP_ITEM_LIST } from '@/app/graphql/DeliverySlip';
import { GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import DeliverySlipItemDTO from '@/app/types/DeliverySlipItemDTO';
import { defaultPageSize } from '@/app/common/Configuration';
type StateType = {
  dtoDeliverySlip: DeliverySlipDTO;
  initialState: GridInitialState;
  items: DeliverySlipItemDTO[];
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDeliverySlip: DeliverySlipDTO;
};

const useViewDeliverySlip = ({ dtoDeliverySlip }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDeliverySlip: dtoDeliverySlip,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    items: [],
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Delivery Slips', href: '/delivery-slips/list' }, { label: 'View Delivery Slip' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getDeliverySlip] = useLazyQuery(GET_DELIVERY_SLIP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getDeliverySlipItemList] = useLazyQuery(GET_DELIVERY_SLIP_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const getData = useCallback(async (): Promise<void> => {
    let dtoDeliverySlip: DeliverySlipDTO = {} as DeliverySlipDTO;
    const { error, data } = await getDeliverySlip({
      variables: {
        id: state.dtoDeliverySlip.id
      }
    });
    if (!error && data?.getDeliverySlip) {
      dtoDeliverySlip = data.getDeliverySlip;
    }
    setState({ dtoDeliverySlip: dtoDeliverySlip } as StateType);
  }, [getDeliverySlip, state.dtoDeliverySlip.id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: DeliverySlipItemDTO[] = [];
    const { error, data } = await getDeliverySlipItemList({
      variables: {
        delivery_slip_id: state.dtoDeliverySlip.id
      }
    });
    if (!error && data?.getDeliverySlipItemList) {
      arrItems = [...data.getDeliverySlipItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getDeliverySlipItemList, state.dtoDeliverySlip.id]);

  useEffect(() => {
    if (state.dtoDeliverySlip.id > 0) {
      getData();
      getItems();
    }
  }, [state.dtoDeliverySlip.id, getData, getItems]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/delivery-slips/edit/' + state.dtoDeliverySlip.id);
    },
    [router, state.dtoDeliverySlip.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/delivery-slips/list');
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

export default useViewDeliverySlip;
