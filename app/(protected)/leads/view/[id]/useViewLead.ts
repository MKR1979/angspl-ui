import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import LeadDTO from '@/app/types/LeadDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_LEAD } from '@/app/graphql/Lead';
type StateType = {
  dtoLead: LeadDTO;
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoLead: LeadDTO;
};

const useViewLead = ({ dtoLead }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoLead: dtoLead,
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Leads', href: '/leads/list' }, { label: 'View Lead' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getLead] = useLazyQuery(GET_LEAD, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoLead: LeadDTO = {} as LeadDTO;
    const { error, data } = await getLead({
      variables: {
        id: state.dtoLead.id
      }
    });
    if (!error && data?.getLead) {
      dtoLead = data.getLead;
    }
    setState({ dtoLead: dtoLead } as StateType);
  }, [getLead, state.dtoLead.id]);

  useEffect(() => {
    if (state.dtoLead.id > 0) {
      getData();
    }
  }, [state.dtoLead.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/leads/edit/' + state.dtoLead.id);
    },
    [router, state.dtoLead.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/leads/list');
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

export default useViewLead;
