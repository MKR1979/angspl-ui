'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuizQuestionEntry from '../quiz-question-entry';
import useAddQuizQuestion from './useAddQuizQuestion';
import { QUIZ_QUESTION } from '@/app/types/QuizQuestionDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrQuizLookup: LookupDTO[] };
const ClientAddQuizQuestion = ({ arrQuizLookup }: Props) => {
  const { state } = useAddQuizQuestion();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuizQuestionEntry dtoQuizQuestion={QUIZ_QUESTION} arrQuizLookup={arrQuizLookup}/>
    </>
  );
};

export default memo(ClientAddQuizQuestion, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});



