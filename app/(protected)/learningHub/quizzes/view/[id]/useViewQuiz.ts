import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuizDTO from '@/app/types/QuizDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUIZ } from '@/app/graphql/Quiz';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoQuiz: QuizDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuiz: QuizDTO;
};

const useViewQuiz = ({ dtoQuiz }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuiz: dtoQuiz,
    breadcrumbsItems: [{ label: 'Exams', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list` }, { label: 'View Exam' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getQuiz] = useLazyQuery(GET_QUIZ, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoQuiz: QuizDTO = {} as QuizDTO;
      const { error, data } = await getQuiz({
        variables: {
          id: state.dtoQuiz.id
        }
      });
      if (!error && data) {
        dtoQuiz = data.getQuiz;
      }
      setState({ dtoQuiz: dtoQuiz } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuiz, state.dtoQuiz.id]);

  useEffect(() => {
    if (state.dtoQuiz.id > 0) {
      getData();
    }
  }, [state.dtoQuiz.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/edit/` + state.dtoQuiz.id);
    },
    [router, state.dtoQuiz.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewQuiz;
