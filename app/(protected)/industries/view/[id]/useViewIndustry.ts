import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import IndustryDTO from '@/app/types/IndustryDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_INDUSTRY } from '@/app/graphql/Industry';
type StateType = {
  dtoIndustry: IndustryDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoIndustry: IndustryDTO;
};

const useViewIndustry = ({ dtoIndustry }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoIndustry: dtoIndustry,
    breadcrumbsItems: [{ label: 'Industries', href: '/industries/list' }, { label: 'View Industry' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getIndustry] = useLazyQuery(GET_INDUSTRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoIndustry: IndustryDTO = {} as IndustryDTO;
    const { error, data } = await getIndustry({
      variables: {
        id: state.dtoIndustry.id
      }
    });
    if (!error && data?.getIndustry) {
      dtoIndustry = data.getIndustry;
    }
    setState({ dtoIndustry: dtoIndustry } as StateType);
  }, [getIndustry, state.dtoIndustry.id]);

  useEffect(() => {
    if (state.dtoIndustry.id > 0) {
      getData();
    }
  }, [state.dtoIndustry.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/industries/edit/' + state.dtoIndustry.id);
    },
    [router, state.dtoIndustry.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/industries/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewIndustry;
