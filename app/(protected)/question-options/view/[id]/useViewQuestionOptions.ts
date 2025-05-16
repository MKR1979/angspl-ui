import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
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
    breadcrumbsItems: [{ label: 'Question Options', href: '/question-options/list' }, { label: 'View Question Options' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setQuestionOptions] = useReducer(reducer, INITIAL_STATE);

  const [getQuestionOptions] = useLazyQuery(GET_QUESTION_OPTIONS, {
    fetchPolicy: 'network-only' 
  });

  const getData = useCallback(async (): Promise<void> => {
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
  }, [getQuestionOptions, state.dtoQuestionOptions.id]);

  useEffect(() => {
    if (state.dtoQuestionOptions.id > 0) {
      getData();
    }
  }, [state.dtoQuestionOptions.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/question-options/edit/' + state.dtoQuestionOptions.id);
    },
    [router, state.dtoQuestionOptions.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/question-options/list');
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
