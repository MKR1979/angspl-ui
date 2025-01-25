import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CaseTypeDTO, { CASE_TYPE } from '@/app/types/CaseTypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_CASE_TYPE } from '@/app/graphql/CaseType';
type StateType = {
  dtoCaseType: CaseTypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCaseType: CaseTypeDTO;
};

const useViewCaseType = ({ dtoCaseType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCaseType: dtoCaseType,
    breadcrumbsItems: [{ label: 'Case Types', href: '/case-types/list' }, { label: 'View Case Type' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getCaseType] = useLazyQuery(GET_CASE_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCaseType: CaseTypeDTO = CASE_TYPE;
    const { error, data } = await getCaseType({
      variables: {
        id: state.dtoCaseType.id
      }
    });
    if (!error && data?.getCaseType) {
      dtoCaseType = data.getCaseType;
    }
    setState({ dtoCaseType: dtoCaseType } as StateType);
  }, [getCaseType, state.dtoCaseType.id]);

  useEffect(() => {
    if (state.dtoCaseType.id > 0) {
      getData();
    }
  }, [state.dtoCaseType.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/case-types/edit/' + state.dtoCaseType.id);
    },
    [router, state.dtoCaseType.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/case-types/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCaseType;
