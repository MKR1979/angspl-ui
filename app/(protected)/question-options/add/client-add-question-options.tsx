
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuestionOptionsEntry from '../question-options-entry';
import useAddQuestionOptions from './useAddQuestionOptions';
import { QUESTION_OPTIONS } from '@/app/types/QuestionOptionsDTO';

const ClientAddAdmissionReview = () => {
  const { state } = useAddQuestionOptions();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuestionOptionsEntry dtoQuestionOptions={QUESTION_OPTIONS} />
    </>
  );
};

export default memo(ClientAddAdmissionReview, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});