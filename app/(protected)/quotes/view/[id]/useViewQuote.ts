import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuoteDTO from '@/app/types/QuoteDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUOTE, GET_QUOTE_ITEM_LIST } from '@/app/graphql/Quote';
import { GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import QuoteItemDTO from '@/app/types/QuoteItemDTO';
import { defaultPageSize } from '@/app/common/Configuration';
type StateType = {
  dtoQuote: QuoteDTO;
  initialState: GridInitialState;
  items: QuoteItemDTO[];
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuote: QuoteDTO;
};

const useViewQuote = ({ dtoQuote }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuote: dtoQuote,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    items: [],
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Quotes', href: '/quotes/list' }, { label: 'View Quote' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getQuote] = useLazyQuery(GET_QUOTE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getQuoteItemList] = useLazyQuery(GET_QUOTE_ITEM_LIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const getData = useCallback(async (): Promise<void> => {
    let dtoQuote: QuoteDTO = {} as QuoteDTO;
    const { error, data } = await getQuote({
      variables: {
        id: state.dtoQuote.id
      }
    });
    if (!error && data?.getQuote) {
      dtoQuote = data.getQuote;
    }
    setState({ dtoQuote: dtoQuote } as StateType);
  }, [getQuote, state.dtoQuote.id]);

  const getItems = useCallback(async (): Promise<void> => {
    let arrItems: QuoteItemDTO[] = [];
    const { error, data } = await getQuoteItemList({
      variables: {
        quote_id: state.dtoQuote.id
      }
    });
    if (!error && data?.getQuoteItemList) {
      arrItems = [...data.getQuoteItemList];
    }
    setState({ items: arrItems } as StateType);
  }, [getQuoteItemList, state.dtoQuote.id]);

  useEffect(() => {
    if (state.dtoQuote.id > 0) {
      getData();
      getItems();
    }
  }, [state.dtoQuote.id, getData, getItems]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quotes/edit/' + state.dtoQuote.id);
    },
    [router, state.dtoQuote.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quotes/list');
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

export default useViewQuote;
