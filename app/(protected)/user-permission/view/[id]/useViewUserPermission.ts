import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UserPermissionDTO from '@/app/types/UserPermissionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_USER_PERMISSION } from '@/app/graphql/UserPermission';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoUserPermission: UserPermissionDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoUserPermission: UserPermissionDTO;
};

const useViewUserPermission = ({ dtoUserPermission }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoUserPermission: dtoUserPermission,
    breadcrumbsItems: [{ label: 'User Permission', href: `/user-permission/list` }, { label: 'View User Permission' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setUserPermission] = useReducer(reducer, INITIAL_STATE);

  const [getUserPermission] = useLazyQuery(GET_USER_PERMISSION, {
    fetchPolicy: 'network-only'
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUserPermission: UserPermissionDTO = {} as UserPermissionDTO;
      const { error, data } = await getUserPermission({
        variables: {
          id: state.dtoUserPermission.id
        }
      });
      if (!error && data) {
        dtoUserPermission = data.getUserPermission;
      }
      setUserPermission({ dtoUserPermission: dtoUserPermission } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserPermission, state.dtoUserPermission.id]);

  useEffect(() => {
    if (state.dtoUserPermission.id > 0) {
      getData();
    }
  }, [state.dtoUserPermission.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/user-permission/edit/` + state.dtoUserPermission.id);
    },
    [router, state.dtoUserPermission.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/user-permission/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewUserPermission;
