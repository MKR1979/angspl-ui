import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import MeetingDTO from '@/app/types/MeetingDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_MEETING } from '@/app/graphql/Meeting';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoMeeting: MeetingDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoMeeting: MeetingDTO;
};

const useViewMeeting = ({ dtoMeeting }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoMeeting: dtoMeeting,
    breadcrumbsItems: [{ label: 'Meetings', href: '/meetings/list' }, { label: 'View Meeting' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getMeeting] = useLazyQuery(GET_MEETING, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoMeeting: MeetingDTO = {} as MeetingDTO;
      const { error, data } = await getMeeting({
        variables: {
          id: state.dtoMeeting.id
        }
      });
      if (!error && data?.getMeeting) {
        dtoMeeting = data.getMeeting;
      }
      setState({ dtoMeeting: dtoMeeting } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getMeeting, state.dtoMeeting.id]);

  useEffect(() => {
    if (state.dtoMeeting.id > 0) {
      getData();
    }
  }, [state.dtoMeeting.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/meetings/edit/' + state.dtoMeeting.id);
    },
    [router, state.dtoMeeting.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/meetings/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewMeeting;
