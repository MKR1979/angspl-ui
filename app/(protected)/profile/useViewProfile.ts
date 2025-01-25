import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UserDTO from '@/app/types/UserDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_USER_MY_PROFILE } from '@/app/graphql/User';
type StateType = {
  dtoUser: UserDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoUser: UserDTO;
};

const useViewProfile = ({ dtoUser }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoUser: dtoUser,
    breadcrumbsItems: [{ label: 'Profile' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoUser: UserDTO = {} as UserDTO;
    const { error, data } = await getUserMyProfile();
    if (!error && data?.getUserMyProfile) {
      dtoUser = data.getUserMyProfile;
    }
    setState({ dtoUser: dtoUser } as StateType);
  }, [getUserMyProfile]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/edit-profile/');
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
    onImageError
  };
};

export default useViewProfile;
