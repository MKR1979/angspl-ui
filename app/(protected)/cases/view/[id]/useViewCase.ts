import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CaseDTO from '@/app/types/CaseDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_CASE } from '@/app/graphql/Case';
type StateType = {
  dtoCase: CaseDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCase: CaseDTO;
};

const useViewCase = ({ dtoCase }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCase: dtoCase,
    breadcrumbsItems: [{ label: 'cases', href: '/cases/list' }, { label: 'View Case' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getCase] = useLazyQuery(GET_CASE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCase: CaseDTO = {} as CaseDTO;
    const { error, data } = await getCase({
      variables: {
        id: state.dtoCase.id
      }
    });
    if (!error && data?.getCase) {
      dtoCase = data.getCase;
    }
    setState({ dtoCase: dtoCase } as StateType);
  }, [getCase, state.dtoCase.id]);

  useEffect(() => {
    if (state.dtoCase.id > 0) {
      getData();
    }
  }, [state.dtoCase.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/cases/edit/' + state.dtoCase.id);
    },
    [router, state.dtoCase.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/cases/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCase;
