import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CurrencyDTO from '@/app/types/CurrencyDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_CURRENCY } from '@/app/graphql/Currency';
type StateType = {
  dtoCurrency: CurrencyDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCurrency: CurrencyDTO;
};

const useViewCurrency = ({ dtoCurrency }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCurrency: dtoCurrency,
    breadcrumbsItems: [{ label: 'Currencies', href: '/currencies/list' }, { label: 'View Currency' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getCurrency] = useLazyQuery(GET_CURRENCY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCurrency: CurrencyDTO = {} as CurrencyDTO;
    const { error, data } = await getCurrency({
      variables: {
        id: state.dtoCurrency.id
      }
    });
    if (!error && data) {
      dtoCurrency = data.getCurrency;
    }
    setState({ dtoCurrency: dtoCurrency } as StateType);
  }, [getCurrency, state.dtoCurrency.id]);

  useEffect(() => {
    if (state.dtoCurrency.id > 0) {
      getData();
    }
  }, [state.dtoCurrency.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/currencies/edit/' + state.dtoCurrency.id);
    },
    [router, state.dtoCurrency.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/currencies/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCurrency;
