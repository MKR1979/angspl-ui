import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import TaxDTO from '@/app/types/TaxDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_TAX } from '@/app/graphql/Tax';
type StateType = {
  dtoTax: TaxDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoTax: TaxDTO;
};

const useViewTax = ({ dtoTax }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoTax: dtoTax,
    breadcrumbsItems: [{ label: 'Taxes', href: '/taxes/list' }, { label: 'View Tax' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getTax] = useLazyQuery(GET_TAX, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTax: TaxDTO = {} as TaxDTO;
    const { error, data } = await getTax({
      variables: {
        id: state.dtoTax.id
      }
    });
    if (!error && data?.getTax) {
      dtoTax = data.getTax;
    }
    setState({ dtoTax: dtoTax } as StateType);
  }, [getTax, state.dtoTax.id]);

  useEffect(() => {
    if (state.dtoTax.id > 0) {
      getData();
    }
  }, [state.dtoTax.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/taxes/edit/' + state.dtoTax.id);
    },
    [router, state.dtoTax.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/taxes/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewTax;
