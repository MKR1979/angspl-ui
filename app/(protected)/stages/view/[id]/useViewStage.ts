import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import StageDTO from '@/app/types/StageDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_STAGE } from '@/app/graphql/Stage';
type StateType = {
  dtoStage: StageDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoStage: StageDTO;
};

const useViewStage = ({ dtoStage }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoStage: dtoStage,
    breadcrumbsItems: [{ label: 'Stages', href: '/stages/list' }, { label: 'View Stage' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getStage] = useLazyQuery(GET_STAGE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoStage: StageDTO = {} as StageDTO;
    const { error, data } = await getStage({
      variables: {
        id: state.dtoStage.id
      }
    });
    if (!error && data?.getStage) {
      dtoStage = data.getStage;
    }
    setState({ dtoStage: dtoStage } as StateType);
  }, [getStage, state.dtoStage.id]);

  useEffect(() => {
    if (state.dtoStage.id > 0) {
      getData();
    }
  }, [state.dtoStage.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/stages/edit/' + state.dtoStage.id);
    },
    [router, state.dtoStage.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/stages/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewStage;
