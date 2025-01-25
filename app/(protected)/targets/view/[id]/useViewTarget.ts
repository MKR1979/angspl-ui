import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import TargetDTO from '@/app/types/TargetDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_TARGET } from '@/app/graphql/Target';
type StateType = {
  dtoTarget: TargetDTO;
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoTarget: TargetDTO;
};

const useViewTarget = ({ dtoTarget }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoTarget: dtoTarget,
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Targets', href: '/targets/list' }, { label: 'View Target' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getTarget] = useLazyQuery(GET_TARGET, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTarget: TargetDTO = {} as TargetDTO;
    const { error, data } = await getTarget({
      variables: {
        id: state.dtoTarget.id
      }
    });
    if (!error && data?.getTarget) {
      dtoTarget = data.getTarget;
    }
    setState({ dtoTarget: dtoTarget } as StateType);
  }, [getTarget, state.dtoTarget.id]);

  useEffect(() => {
    if (state.dtoTarget.id > 0) {
      getData();
    }
  }, [state.dtoTarget.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/targets/edit/' + state.dtoTarget.id);
    },
    [router, state.dtoTarget.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/targets/list');
    },
    [router]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    onEditClick,
    onCancelClick,
    handleTabChange
  };
};

export default useViewTarget;
