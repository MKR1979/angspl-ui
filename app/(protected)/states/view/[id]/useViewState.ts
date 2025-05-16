import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import StateDTO from '@/app/types/stateDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_STATE } from '@/app/graphql/state';
type StateType = {
  dtoState: StateDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoState: StateDTO;
};

const useViewState = ({ dtoState }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoState: dtoState,
    breadcrumbsItems: [{ label: 'States', href: '/states/list' }, { label: 'View State' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getState] = useLazyQuery(GET_STATE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoState: StateDTO = {} as StateDTO;
    const { error, data } = await getState({
      variables: {
        id: state.dtoState.id
      }
    });
    if (!error && data) {
      dtoState = data.getState;
    }
    setState({ dtoState: dtoState } as StateType);
  }, [getState, state.dtoState.id]);

  useEffect(() => {
    if (state.dtoState.id > 0) {
      getData();
    }
  }, [state.dtoState.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/states/edit/' + state.dtoState.id);
    },
    [router, state.dtoState.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/states/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewState;
