'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import InterviewQuestionsEntry from '../../interview-questions-entry';
import useEditInterviewQuestions from './useEditInterviewQuestions';
import InterviewQuestionsDTO from '@/app/types/InterviewQuestionsDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoInterviewQuestions: InterviewQuestionsDTO; arrCourseLookup: LookupDTO[] };

const ClientEditInterviewQuestions = ({ dtoInterviewQuestions, arrCourseLookup }: Props) => {
  const { state } = useEditInterviewQuestions();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <InterviewQuestionsEntry dtoInterviewQuestions={dtoInterviewQuestions} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientEditInterviewQuestions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
