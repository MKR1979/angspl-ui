import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UserDTO from '@/app/types/UserDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_USER } from '@/app/graphql/User';
type StateType = {
  dtoUser: UserDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoUser: UserDTO;
};

const useViewUser = ({ dtoUser }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoUser: dtoUser,
    breadcrumbsItems: [{ label: 'Users', href: '/users/list' }, { label: 'View User' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoUser: UserDTO = {} as UserDTO;
    const { error, data } = await getUser({
      variables: {
        id: state.dtoUser.id,
      }
    });
    if (!error && data) {
      dtoUser = data.getUser;
    }
    setState({ dtoUser: dtoUser } as StateType);
  }, [getUser, state.dtoUser.id]);

  useEffect(() => {
    if (state.dtoUser.id > 0) {
      getData();
    }
  }, [state.dtoUser.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/users/edit/' + state.dtoUser.id);
    },
    [router, state.dtoUser.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/users/list');
    },
    [router]
  );

  const onImageError = useCallback(async () =>
    //event: any
    {
      setState({ dtoUser: { ...state.dtoUser, image_url: '' } } as StateType);
    }, [state.dtoUser]);

  return {
    state,
    onEditClick,
    onCancelClick,
    onImageError
  };
};

export default useViewUser;
