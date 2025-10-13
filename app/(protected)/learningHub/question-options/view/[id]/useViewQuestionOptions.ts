import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
import * as gConstants from '../../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoQuestionOptions: QuestionOptionsDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuestionOptions: QuestionOptionsDTO;
};

const useViewQuestionOptions = ({ dtoQuestionOptions }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoQuestionOptions: dtoQuestionOptions,
    breadcrumbsItems: [{ label: 'Question Options', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list` }, { label: 'View Question Options' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setQuestionOptions] = useReducer(reducer, INITIAL_STATE);

  const [getQuestionOptions] = useLazyQuery(GET_QUESTION_OPTIONS, {
    fetchPolicy: 'network-only'
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoQuestionOptions: QuestionOptionsDTO = {} as QuestionOptionsDTO;
      const { error, data } = await getQuestionOptions({
        variables: {
          id: state.dtoQuestionOptions.id
        }
      });
      if (!error && data) {
        dtoQuestionOptions = data.getQuestionOptions;
      }
      setQuestionOptions({ dtoQuestionOptions: dtoQuestionOptions } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getQuestionOptions, state.dtoQuestionOptions.id]);

  useEffect(() => {
    if (state.dtoQuestionOptions.id > 0) {
      getData();
    }
  }, [state.dtoQuestionOptions.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/edit/` + state.dtoQuestionOptions.id);
    },
    [router, state.dtoQuestionOptions.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/question-options/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewQuestionOptions;
