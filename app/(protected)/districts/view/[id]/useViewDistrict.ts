import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DistrictDTO from '@/app/types/DistrictDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DISTRICT } from '@/app/graphql/District';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoDistrict: DistrictDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDistrict: DistrictDTO;
};

const useViewDistrict = ({ dtoDistrict }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDistrict: dtoDistrict,
    breadcrumbsItems: [{ label: 'Districts', href: '/districts/list' }, { label: 'View Districts' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getDistrict] = useLazyQuery(GET_DISTRICT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoDistrict: DistrictDTO = {} as DistrictDTO;
      const { error, data } = await getDistrict({
        variables: {
          id: state.dtoDistrict.id
        }
      });
      if (!error && data) {
        dtoDistrict = data.getDistrict;
      }
      setState({ dtoDistrict: dtoDistrict } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getDistrict, state.dtoDistrict.id]);

  useEffect(() => {
    if (state.dtoDistrict.id > 0) {
      getData();
    }
  }, [state.dtoDistrict.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/districts/edit/' + state.dtoDistrict.id);
    },
    [router, state.dtoDistrict.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/districts/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewDistrict;
