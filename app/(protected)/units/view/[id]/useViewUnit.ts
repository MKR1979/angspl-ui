import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UnitDTO from '@/app/types/UnitDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_UNIT } from '@/app/graphql/Unit';
type StateType = {
  dtoUnit: UnitDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoUnit: UnitDTO;
};

const useViewUnit = ({ dtoUnit }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoUnit: dtoUnit,
    breadcrumbsItems: [{ label: 'Units', href: '/units/list' }, { label: 'View Unit' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getUnit] = useLazyQuery(GET_UNIT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoUnit: UnitDTO = {} as UnitDTO;
    const { error, data } = await getUnit({
      variables: {
        id: state.dtoUnit.id
      }
    });
    if (!error && data?.getUnit) {
      dtoUnit = data.getUnit;
    }
    setState({ dtoUnit: dtoUnit } as StateType);
  }, [getUnit, state.dtoUnit.id]);

  useEffect(() => {
    if (state.dtoUnit.id > 0) {
      getData();
    }
  }, [state.dtoUnit.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/units/edit/' + state.dtoUnit.id);
    },
    [router, state.dtoUnit.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/units/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewUnit;
