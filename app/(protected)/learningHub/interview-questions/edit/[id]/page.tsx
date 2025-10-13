
import { Metadata } from 'next';
import ClientEditInterviewQuestions from './client-edit-interview-questions';
import { GET_INTERVIEW_QUESTIONS } from '@/app/graphql/InterviewQuestions';
import { createServerApolloClient } from '@/app/common/utility';
import InterviewQuestionsDTO, { INTERVIEW_QUESTIONS } from '@/app/types/InterviewQuestionsDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Edit Interview Questions'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditInterviewQuestionsPage({ params }: Props) {
  const { id } = await params;
  let dtoInterviewQuestions: InterviewQuestionsDTO = INTERVIEW_QUESTIONS;
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INTERVIEW_QUESTIONS,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COURSE_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getInterviewQuestions) {
      dtoInterviewQuestions = results[0].data.getInterviewQuestions;
    }
    if (results[1]?.data?.getCourseLookup) {
      arrCourseLookup = results[1].data.getCourseLookup;
    }
  } catch {}
  return <ClientEditInterviewQuestions dtoInterviewQuestions={dtoInterviewQuestions} arrCourseLookup={arrCourseLookup} />;
}
