import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoQuizQuestion: QuizQuestionDTO;
  arrOptions: any[]; // Or define OptionDTO[]
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuizQuestion: QuizQuestionDTO;
};

const useViewQuizQuestion = ({ dtoQuizQuestion }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuizQuestion: dtoQuizQuestion,
    arrOptions: [],
    breadcrumbsItems: [{ label: 'Exam Question', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list` }, { label: 'View Exam Question' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getQuizQuestion] = useLazyQuery(GET_QUIZ_QUESTION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      const { error, data } = await getQuizQuestion({
        variables: {
          id: state.dtoQuizQuestion.id
        }
      });
      if (!error && data?.getQuizQuestion) {
        const dtoRaw = data.getQuizQuestion;
        setState({
          dtoQuizQuestion: {
            ...dtoRaw,
            quizLookupDTO: { id: dtoRaw.quiz_id, text: dtoRaw.quiz_name }
          },
          arrOptions: dtoRaw.options || []
        } as StateType);
      }
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuizQuestion, state.dtoQuizQuestion.id]);


  useEffect(() => {
    if (state.dtoQuizQuestion.id > 0) {
      getData();
    }
  }, [state.dtoQuizQuestion.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/edit/` + state.dtoQuizQuestion.id);
    },
    [router, state.dtoQuizQuestion.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewQuizQuestion;
