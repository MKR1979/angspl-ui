import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import GroupDTO from '@/app/types/GroupDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_GROUP } from '@/app/graphql/Group';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoGroup: GroupDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoGroup: GroupDTO;
};

const useViewGroup = ({ dtoGroup }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoGroup: dtoGroup,
    breadcrumbsItems: [{ label: 'Groups', href: '/groups/list' }, { label: 'View Group' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getGroup] = useLazyQuery(GET_GROUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoGroup: GroupDTO = {} as GroupDTO;
      const { error, data } = await getGroup({
        variables: {
          id: state.dtoGroup.id
        }
      });
      if (!error && data) {
        dtoGroup = data.getGroup;
      }
      setState({ dtoGroup: dtoGroup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getGroup, state.dtoGroup.id]);

  useEffect(() => {
    if (state.dtoGroup.id > 0) {
      getData();
    }
  }, [state.dtoGroup.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/groups/edit/' + state.dtoGroup.id);
    },
    [router, state.dtoGroup.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/groups/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewGroup;
