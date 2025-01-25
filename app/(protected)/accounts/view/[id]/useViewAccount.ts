import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ACCOUNT } from '@/app/graphql/Account';
type StateType = {
  dtoAccount: AccountDTO;
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAccount: AccountDTO;
};

const useViewAccount = ({ dtoAccount }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAccount: dtoAccount,
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Accounts', href: '/accounts/list' }, { label: 'View Account' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getAccount] = useLazyQuery(GET_ACCOUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoAccount: AccountDTO = ACCOUNT;
    const { error, data } = await getAccount({
      variables: {
        id: state.dtoAccount.id
      }
    });
    if (!error && data?.getAccount) {
      dtoAccount = data.getAccount;
    }
    setState({ dtoAccount: dtoAccount } as StateType);
  }, [getAccount, state.dtoAccount.id]);

  useEffect(() => {
    if (state.dtoAccount.id > 0) {
      getData();
    }
  }, [state.dtoAccount.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/accounts/edit/' + state.dtoAccount.id);
    },
    [router, state.dtoAccount.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/accounts/list');
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

export default useViewAccount;
