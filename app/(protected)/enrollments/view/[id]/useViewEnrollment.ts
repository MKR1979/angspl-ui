import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import EnrollmentDTO, { ENROLLMENT } from '@/app/types/EnrollmentDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ENROLLMENT } from '@/app/graphql/Enrollment';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoEnrollment: EnrollmentDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoEnrollment: EnrollmentDTO;
};

const useViewEnrollment = ({ dtoEnrollment }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoEnrollment: dtoEnrollment,
    breadcrumbsItems: [{ label: 'Enrollments', href: '/Enrollments/list' }, { label: 'View Enrollment' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getEnrollment] = useLazyQuery(GET_ENROLLMENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEnrollment: EnrollmentDTO = ENROLLMENT;
      const { error, data } = await getEnrollment({
        variables: {
          id: state.dtoEnrollment.id
        }
      });
      if (!error && data?.getEnrollment) {
        dtoEnrollment = data.getEnrollment;
      }
      setState({ dtoEnrollment: dtoEnrollment } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEnrollment, state.dtoEnrollment.id]);

  useEffect(() => {
    if (state.dtoEnrollment.id > 0) {
      getData();
    }
  }, [state.dtoEnrollment.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/enrollments/edit/` + state.dtoEnrollment.id);
    },
    [router, state.dtoEnrollment.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/enrollments/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewEnrollment;
