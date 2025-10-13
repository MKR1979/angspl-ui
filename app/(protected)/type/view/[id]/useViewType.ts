import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import TypeDTO from '@/app/types/TypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_TYPE } from '@/app/graphql/Type';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoType: TypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoType: TypeDTO;
};

const useViewType = ({ dtoType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoType: dtoType,
    breadcrumbsItems: [{ label: 'Types', href: '/type/list' }, { label: 'View Type' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getType] = useLazyQuery(GET_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoType: TypeDTO = {} as TypeDTO;
      const { error, data } = await getType({
        variables: {
          id: state.dtoType.id
        }
      });
      if (!error && data) {
        dtoType = data.getType;
      }
      setState({ dtoType: dtoType } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getType, state.dtoType.id]);

  useEffect(() => {
    if (state.dtoType.id > 0) {
      getData();
    }
  }, [state.dtoType.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/type/edit/' + state.dtoType.id);
    },
    [router, state.dtoType.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/type/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewType;
