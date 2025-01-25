import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import IncotermDTO from '@/app/types/IncotermDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_INCOTERM } from '@/app/graphql/Incoterm';
type StateType = {
  dtoIncoterm: IncotermDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoIncoterm: IncotermDTO;
};

const useViewIncoterm = ({ dtoIncoterm }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoIncoterm: dtoIncoterm,
    breadcrumbsItems: [{ label: 'Incoterms', href: '/incoterms/list' }, { label: 'View Incoterm' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getIncoterm] = useLazyQuery(GET_INCOTERM, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoIncoterm: IncotermDTO = {} as IncotermDTO;
    const { error, data } = await getIncoterm({
      variables: {
        id: state.dtoIncoterm.id
      }
    });
    if (!error && data?.getIncoterm) {
      dtoIncoterm = data.getIncoterm;
    }
    setState({ dtoIncoterm: dtoIncoterm } as StateType);
  }, [getIncoterm, state.dtoIncoterm.id]);

  useEffect(() => {
    if (state.dtoIncoterm.id > 0) {
      getData();
    }
  }, [state.dtoIncoterm.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/incoterms/edit/' + state.dtoIncoterm.id);
    },
    [router, state.dtoIncoterm.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/incoterms/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewIncoterm;
