'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuizQuestionEntry from '../../quiz-question-entry';
import useEditQuizQuestion from './useEditQuizQuestion';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoQuizQuestion: QuizQuestionDTO; arrQuizLookup: LookupDTO[] };

const ClientEditQuizQuestion = ({ dtoQuizQuestion, arrQuizLookup}: Props) => {
  const { state } = useEditQuizQuestion();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuizQuestionEntry dtoQuizQuestion={dtoQuizQuestion} arrQuizLookup={arrQuizLookup} />
    </>
  );
};

export default memo(ClientEditQuizQuestion, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
