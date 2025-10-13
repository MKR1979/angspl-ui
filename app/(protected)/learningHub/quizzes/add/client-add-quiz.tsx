'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuizEntry from '../quiz-entry';
import useAddQuiz from './useAddQuiz';
import { QUIZ } from '@/app/types/QuizDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCourseLookup: LookupDTO[] };

const ClientAddQuiz = ({ arrCourseLookup }: Props) => {
  const { state } = useAddQuiz();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuizEntry dtoQuiz={QUIZ} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientAddQuiz, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
