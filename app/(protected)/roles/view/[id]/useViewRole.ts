import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import RoleDTO from '@/app/types/RoleDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ROLE } from '@/app/graphql/Role';
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

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getRole] = useLazyQuery(GET_ROLE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoRole: RoleDTO = {} as RoleDTO;
    const { error, data } = await getRole({
      variables: {
        id: state.dtoRole.id
      }
    });
    if (!error && data?.getRole) {
      dtoRole = data.getRole;
    }
    setState({ dtoRole: dtoRole } as StateType);
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
