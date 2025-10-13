import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ATTENDANCE } from '@/app/graphql/Attendance';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoAttendance: AttendanceDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAttendance: AttendanceDTO;
};

const useViewAttendance = ({ dtoAttendance }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAttendance: dtoAttendance,
    breadcrumbsItems: [{ label: 'Attendances', href: '/attendance/list' }, { label: 'View Attendance' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setAttendance] = useReducer(reducer, INITIAL_STATE);

  const [getAttendance] = useLazyQuery(GET_ATTENDANCE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAttendance: AttendanceDTO = {} as AttendanceDTO;
      const { error, data } = await getAttendance({
        variables: {
          id: state.dtoAttendance.id
        }
      });
      if (!error && data) {
        dtoAttendance = data.getAttendance;
      }
      setAttendance({ dtoAttendance: dtoAttendance } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendance, state.dtoAttendance.id]);

  useEffect(() => {
    if (state.dtoAttendance.id > 0) {
      getData();
    }
  }, [state.dtoAttendance.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/attendance/list');
    },
    [router]
  );

  return {
    state,
    onCancelClick
  };
};

export default useViewAttendance;
