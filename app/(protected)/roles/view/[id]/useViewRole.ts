import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import RoleDTO from '@/app/types/RoleDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ROLE } from '@/app/graphql/Role';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoRole: RoleDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoRole: RoleDTO;
};

const useViewRole = ({ dtoRole }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoRole: dtoRole,
    breadcrumbsItems: [{ label: 'Roles', href: '/roles/list' }, { label: 'View Role' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getRole] = useLazyQuery(GET_ROLE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoRole: RoleDTO = {} as RoleDTO;
      const { error, data } = await getRole({
        variables: {
          id: state.dtoRole.id
        }
      });
      if (!error && data) {
        dtoRole = data.getRole;
      }
      setState({ dtoRole: dtoRole } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRole, state.dtoRole.id]);

  useEffect(() => {
    if (state.dtoRole.id > 0) {
      getData();
    }
  }, [state.dtoRole.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/roles/edit/' + state.dtoRole.id);
    },
    [router, state.dtoRole.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/roles/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewRole;
