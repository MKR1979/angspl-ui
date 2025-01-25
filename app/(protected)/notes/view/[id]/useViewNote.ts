import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import NoteDTO from '@/app/types/NoteDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_NOTE } from '@/app/graphql/Note';
type StateType = {
  dtoNote: NoteDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoNote: NoteDTO;
};

const useViewNote = ({ dtoNote }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoNote: dtoNote,
    breadcrumbsItems: [{ label: 'Notes', href: '/notes/list' }, { label: 'View Note' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getNote] = useLazyQuery(GET_NOTE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoNote: NoteDTO = {} as NoteDTO;
    const { error, data } = await getNote({
      variables: {
        id: state.dtoNote.id
      }
    });
    if (!error && data?.getNote) {
      dtoNote = data.getNote;
    }
    setState({ dtoNote: dtoNote } as StateType);
  }, [getNote, state.dtoNote.id]);

  useEffect(() => {
    if (state.dtoNote.id > 0) {
      getData();
    }
  }, [state.dtoNote.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/notes/edit/' + state.dtoNote.id);
    },
    [router, state.dtoNote.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/notes/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewNote;
