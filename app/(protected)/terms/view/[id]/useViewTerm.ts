import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import TermDTO from '@/app/types/TermDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_TERM } from '@/app/graphql/Term';
type StateType = {
  dtoTerm: TermDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoTerm: TermDTO;
};

const useViewTerm = ({ dtoTerm }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoTerm: dtoTerm,
    breadcrumbsItems: [{ label: 'Terms', href: '/terms/list' }, { label: 'View Term' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getTerm] = useLazyQuery(GET_TERM, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTerm: TermDTO = {} as TermDTO;
    const { error, data } = await getTerm({
      variables: {
        id: state.dtoTerm.id
      }
    });
    if (!error && data?.getTerm) {
      dtoTerm = data.getTerm;
    }
    setState({ dtoTerm: dtoTerm } as StateType);
  }, [getTerm, state.dtoTerm.id]);

  useEffect(() => {
    if (state.dtoTerm.id > 0) {
      getData();
    }
  }, [state.dtoTerm.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/terms/edit/' + state.dtoTerm.id);
    },
    [router, state.dtoTerm.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/terms/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewTerm;
