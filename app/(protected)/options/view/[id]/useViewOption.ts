import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import OptionDTO from '@/app/types/OptionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_OPTION } from '@/app/graphql/Option';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
//import * as gConstants from '../../../../constants/constants';

type StateType = {
  dtoOption: OptionDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoOption: OptionDTO;
};

const useViewOption = ({ dtoOption }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoOption: dtoOption,
    breadcrumbsItems: [{ label: 'Option', href: `/options/list` }, { label: 'View Option' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getOption] = useLazyQuery(GET_OPTION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoOption: OptionDTO = {} as OptionDTO;
      const { error, data } = await getOption({
        variables: {
          id: state.dtoOption.id
        }
      });
      if (!error && data) {
        dtoOption = data.getOption;
      }
      setState({ dtoOption: dtoOption } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getOption, state.dtoOption.id]);

  useEffect(() => {
    if (state.dtoOption.id > 0) {
      getData();
    }
  }, [state.dtoOption.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/options/edit/` + state.dtoOption.id);
    },
    [router, state.dtoOption.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/options/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewOption;
