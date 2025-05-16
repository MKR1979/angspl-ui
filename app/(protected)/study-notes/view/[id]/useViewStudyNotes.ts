import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import StudyNotesDTO from '@/app/types/StudyNotesDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_STUDY_NOTES } from '@/app/graphql/StudyNotes';
type StateType = {
  dtoStudyNotes: StudyNotesDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoStudyNotes: StudyNotesDTO;
};

const useViewStudyNotes = ({ dtoStudyNotes }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoStudyNotes: dtoStudyNotes,
    breadcrumbsItems: [{ label: 'Study Notes', href: '/study-notes/list' }, { label: 'View Study Notes' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getStudyNotes] = useLazyQuery(GET_STUDY_NOTES, { fetchPolicy: 'network-only' });

  const getStudyNotesData = useCallback(async (): Promise<void> => {
    let dtoStudyNotes: StudyNotesDTO = {} as StudyNotesDTO;
    const { error, data } = await getStudyNotes({
      variables: {
        id: state.dtoStudyNotes.id
      }
    });
    if (!error && data) {
      dtoStudyNotes = data.getStudyNotes;
    }
    setState({ dtoStudyNotes: dtoStudyNotes } as StateType);
  }, [getStudyNotes, state.dtoStudyNotes.id]);

  useEffect(() => {
    if (state.dtoStudyNotes.id > 0) {
      getStudyNotesData();
    }
  }, [state.dtoStudyNotes.id, getStudyNotesData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/study-notes/edit/' + state.dtoStudyNotes.id);
    },
    [router, state.dtoStudyNotes.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/study-notes/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewStudyNotes;
