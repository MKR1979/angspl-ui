import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AccountTypeDTO, { ACCOUNT_TYPE } from '@/app/types/AccountTypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ACCOUNT_TYPE } from '@/app/graphql/AccountType';
type StateType = {
  dtoAccountType: AccountTypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAccountType: AccountTypeDTO;
};

const useViewAccountType = ({ dtoAccountType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAccountType: dtoAccountType,
    breadcrumbsItems: [{ label: 'Account Types', href: '/account-types/list' }, { label: 'View Account Type' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getAccountType] = useLazyQuery(GET_ACCOUNT_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoAccountType: AccountTypeDTO = ACCOUNT_TYPE;
    const { error, data } = await getAccountType({
      variables: {
        id: state.dtoAccountType.id
      }
    });
    if (!error && data?.getAccountType) {
      dtoAccountType = data.getAccountType;
    }
    setState({ dtoAccountType: dtoAccountType } as StateType);
  }, [getAccountType, state.dtoAccountType.id]);

  useEffect(() => {
    if (state.dtoAccountType.id > 0) {
      getData();
    }
  }, [state.dtoAccountType.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/account-types/edit/' + state.dtoAccountType.id);
    },
    [router, state.dtoAccountType.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/account-types/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewAccountType;
