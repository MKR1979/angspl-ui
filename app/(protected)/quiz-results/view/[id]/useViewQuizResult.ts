import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuizDataDTO from '@/app/types/QuizDataDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUIZ_RESULT } from '@/app/graphql/Quiz';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoQuizData: QuizDataDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuizData: QuizDataDTO;
};

const useViewQuizResult = ({ dtoQuizData }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuizData: dtoQuizData,
    breadcrumbsItems: [{ label: 'Review Quiz Result', href: `/quiz-results/list` }, { label: 'View Quiz Result' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setResult] = useReducer(reducer, INITIAL_STATE);

  const [getQuizResult] = useLazyQuery(GET_QUIZ_RESULT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoQuizData: QuizDataDTO = {} as QuizDataDTO;
      const { error, data } = await getQuizResult({
        variables: {
          id: state.dtoQuizData.id
        }
      });
      if (!error && data) {
        dtoQuizData = data.getQuizResult;
      }
      setResult({ dtoQuizData: dtoQuizData } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuizResult, state.dtoQuizData.id]);

  useEffect(() => {
    if (state.dtoQuizData.id > 0) {
      getData();
    }
  }, [state.dtoQuizData.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/quiz-results/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick,
  };
};

export default useViewQuizResult;
