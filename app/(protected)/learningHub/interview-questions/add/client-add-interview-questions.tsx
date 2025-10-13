'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import InterviewQuestionsEntry from '../interview-questions-entry';
import useAddInterviewQuestions from './useAddInterviewQuestions';
import { INTERVIEW_QUESTIONS } from '@/app/types/InterviewQuestionsDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCourseLookup: LookupDTO[] };
const ClientAddInterviewQuestions = ({ arrCourseLookup }: Props) => {
  const { state } = useAddInterviewQuestions();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <InterviewQuestionsEntry dtoInterviewQuestions={INTERVIEW_QUESTIONS} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientAddInterviewQuestions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
