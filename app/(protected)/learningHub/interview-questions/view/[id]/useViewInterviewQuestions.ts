import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import InterviewQuestionsDTO from '@/app/types/InterviewQuestionsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_INTERVIEW_QUESTIONS } from '@/app/graphql/InterviewQuestions';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoInterviewQuestions: InterviewQuestionsDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoInterviewQuestions: InterviewQuestionsDTO;
};

const useViewInterviewQuestions = ({ dtoInterviewQuestions }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoInterviewQuestions: dtoInterviewQuestions,
    breadcrumbsItems: [{ label: 'Interview Questions', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/list` }, { label: 'View Interview Questions' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getInterviewQuestions] = useLazyQuery(GET_INTERVIEW_QUESTIONS, { fetchPolicy: 'network-only' });

  const getInterviewQuestionsData = useCallback(async (): Promise<void> => {
    try {
      let dtoInterviewQuestions: InterviewQuestionsDTO = {} as InterviewQuestionsDTO;
      const { error, data } = await getInterviewQuestions({
        variables: {
          id: state.dtoInterviewQuestions.id
        }
      });
      if (!error && data) {
        dtoInterviewQuestions = data.getInterviewQuestions;
      }
      setState({ dtoInterviewQuestions: dtoInterviewQuestions } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getInterviewQuestions, state.dtoInterviewQuestions.id]);

  useEffect(() => {
    if (state.dtoInterviewQuestions.id > 0) {
      getInterviewQuestionsData();
    }
  }, [state.dtoInterviewQuestions.id, getInterviewQuestionsData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/edit/` + state.dtoInterviewQuestions.id);
    },
    [router, state.dtoInterviewQuestions.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewInterviewQuestions;
