import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UserDTO from '@/app/types/UserDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_USER_MY_PROFILE } from '@/app/graphql/User';
import { dispatch } from '../../store';
import * as gMessageConstants from '../../constants/messages-constants';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

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
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getUserMyProfile] = useLazyQuery(GET_USER_MY_PROFILE, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUser: UserDTO = {} as UserDTO;
      const { error, data } = await getUserMyProfile();
      if (!error && data) {
        dtoUser = data.getUserMyProfile;
      }
      setState({ dtoUser: dtoUser } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserMyProfile]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push('/edit-affiliate-profile/');
    },
    [router]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/affiliate-summary');
    },
    [router]
  );

  const onImageError = useCallback(async () => {
    setState({ dtoUser: { ...state.dtoUser, image_url: '' } } as StateType);
  }, [state.dtoUser]);

  return {
    state,
    onEditClick,
    onImageError,
    onCancelClick
  };
};

export default useViewProfile;
