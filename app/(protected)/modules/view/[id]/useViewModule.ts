import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ModuleDTO from '@/app/types/ModuleDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_MODULE } from '@/app/graphql/Module';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoModule: ModuleDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoModule: ModuleDTO;
};

const useViewModule = ({ dtoModule }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoModule: dtoModule,
    breadcrumbsItems: [{ label: 'Modules', href: '/modules/list' }, { label: 'View Module' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getModule] = useLazyQuery(GET_MODULE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoModule: ModuleDTO = {} as ModuleDTO;
      const { error, data } = await getModule({
        variables: {
          id: state.dtoModule.id
        }
      });
      if (!error && data) {
        dtoModule = data.getModule;
      }
      setState({ dtoModule: dtoModule } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getModule, state.dtoModule.id]);

  useEffect(() => {
    if (state.dtoModule.id > 0) {
      getData();
    }
  }, [state.dtoModule.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/modules/edit/' + state.dtoModule.id);
    },
    [router, state.dtoModule.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/modules/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewModule;
