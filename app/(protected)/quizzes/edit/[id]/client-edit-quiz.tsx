'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuizEntry from '../../quiz-entry';
import useEditQuiz from './useEditQuiz';
import QuizDTO from '@/app/types/QuizDTO';
import LookupDTO from '@/app/types/LookupDTO';


type Props = { dtoQuiz: QuizDTO; arrCourseLookup: LookupDTO[] };

const ClientEditQuiz = ({ dtoQuiz, arrCourseLookup }: Props) => {
  const { state } = useEditQuiz();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuizEntry dtoQuiz={dtoQuiz} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientEditQuiz, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
