import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';
type StateType = {
  dtoQuizQuestion: QuizQuestionDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuizQuestion: QuizQuestionDTO;
};

const useViewQuizQuestion = ({ dtoQuizQuestion }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuizQuestion: dtoQuizQuestion,
    breadcrumbsItems: [{ label: 'Quiz Question', href: '/quiz-question/list' }, { label: 'View Quiz Question' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getQuizQuestion] = useLazyQuery(GET_QUIZ_QUESTION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoQuizQuestion: QuizQuestionDTO = {} as QuizQuestionDTO;
    const { error, data } = await getQuizQuestion({
      variables: {
        id: state.dtoQuizQuestion.id
      }
    });
    if (!error && data) {
      dtoQuizQuestion = data.getQuizQuestion;
    }
    setState({ dtoQuizQuestion: dtoQuizQuestion } as StateType);
  }, [getQuizQuestion, state.dtoQuizQuestion.id]);

  useEffect(() => {
    if (state.dtoQuizQuestion.id > 0) {
      getData();
    }
  }, [state.dtoQuizQuestion.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quiz-question/edit/' + state.dtoQuizQuestion.id);
    },
    [router, state.dtoQuizQuestion.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/quiz-question/list');
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
