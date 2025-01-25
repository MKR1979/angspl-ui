import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import LeadSourceDTO from '@/app/types/LeadSourceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_LEAD_SOURCE } from '@/app/graphql/LeadSource';
type StateType = {
  dtoLeadSource: LeadSourceDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoLeadSource: LeadSourceDTO;
};

const useViewLeadSource = ({ dtoLeadSource }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoLeadSource: dtoLeadSource,
    breadcrumbsItems: [{ label: 'Lead Sources', href: '/lead-sources/list' }, { label: 'View Lead Source' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getLeadSource] = useLazyQuery(GET_LEAD_SOURCE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoLeadSource: LeadSourceDTO = {} as LeadSourceDTO;
    const { error, data } = await getLeadSource({
      variables: {
        id: state.dtoLeadSource.id
      }
    });
    if (!error && data?.getLeadSource) {
      dtoLeadSource = data.getLeadSource;
    }
    setState({ dtoLeadSource: dtoLeadSource } as StateType);
  }, [getLeadSource, state.dtoLeadSource.id]);

  useEffect(() => {
    if (state.dtoLeadSource.id > 0) {
      getData();
    }
  }, [state.dtoLeadSource.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/lead-sources/edit/' + state.dtoLeadSource.id);
    },
    [router, state.dtoLeadSource.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/lead-sources/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewLeadSource;
