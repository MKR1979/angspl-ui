import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import EventDTO, { EVENT } from '@/app/types/EventDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_EVENT } from '@/app/graphql/Event';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoEvent: EventDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoEvent: EventDTO;
};

const useViewEvent = ({ dtoEvent }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoEvent: dtoEvent,
    breadcrumbsItems: [{ label: 'Events', href: '/events/list' }, { label: 'View Event' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getEvent] = useLazyQuery(GET_EVENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEvent: EventDTO = EVENT;
      const { error, data } = await getEvent({
        variables: {
          id: state.dtoEvent.id
        }
      });
      if (!error && data?.getEvent) {
        dtoEvent = data.getEvent;
      }
      setState({ dtoEvent: dtoEvent } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEvent, state.dtoEvent.id]);

  useEffect(() => {
    if (state.dtoEvent.id > 0) {
      getData();
    }
  }, [state.dtoEvent.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/events/edit/' + state.dtoEvent.id);
    },
    [router, state.dtoEvent.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/events/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewEvent;
