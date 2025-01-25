import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import OpportunityTypeDTO from '@/app/types/OpportunityTypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_OPPORTUNITY_TYPE } from '@/app/graphql/OpportunityType';
type StateType = {
  dtoOpportunityType: OpportunityTypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoOpportunityType: OpportunityTypeDTO;
};

const useViewOpportunityType = ({ dtoOpportunityType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoOpportunityType: dtoOpportunityType,
    breadcrumbsItems: [{ label: 'Opportunity Types', href: '/opportunity-types/list' }, { label: 'View Opportunity Type' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getOpportunityType] = useLazyQuery(GET_OPPORTUNITY_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoOpportunityType: OpportunityTypeDTO = {} as OpportunityTypeDTO;
    const { error, data } = await getOpportunityType({
      variables: {
        id: state.dtoOpportunityType.id
      }
    });
    if (!error && data?.getOpportunityType) {
      dtoOpportunityType = data.getOpportunityType;
    }
    setState({ dtoOpportunityType: dtoOpportunityType } as StateType);
  }, [getOpportunityType, state.dtoOpportunityType.id]);

  useEffect(() => {
    if (state.dtoOpportunityType.id > 0) {
      getData();
    }
  }, [state.dtoOpportunityType.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunity-types/edit/' + state.dtoOpportunityType.id);
    },
    [router, state.dtoOpportunityType.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/opportunity-types/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewOpportunityType;
