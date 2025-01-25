import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import OpportunityDTO, { OPPORTUNITY } from '@/app/types/OpportunityDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_OPPORTUNITY } from '@/app/graphql/Opportunity';
type StateType = {
  dtoOpportunity: OpportunityDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoOpportunity: OpportunityDTO;
};

const useViewOpportunity = ({ dtoOpportunity }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoOpportunity: dtoOpportunity,
    breadcrumbsItems: [{ label: 'Opportunities', href: '/opportunities/list' }, { label: 'View Opportunity' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getOpportunity] = useLazyQuery(GET_OPPORTUNITY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoOpportunity: OpportunityDTO = OPPORTUNITY;
    const { error, data } = await getOpportunity({
      variables: {
        id: state.dtoOpportunity.id
      }
    });
    if (!error && data?.getOpportunity) {
      dtoOpportunity = data.getOpportunity;
    }
    setState({ dtoOpportunity: dtoOpportunity } as StateType);
  }, [getOpportunity, state.dtoOpportunity.id]);

  useEffect(() => {
    if (state.dtoOpportunity.id > 0) {
      getData();
    }
  }, [state.dtoOpportunity.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunities/edit/' + state.dtoOpportunity.id);
    },
    [router, state.dtoOpportunity.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunities/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewOpportunity;
