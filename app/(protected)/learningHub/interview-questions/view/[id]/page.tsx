import { Metadata } from 'next';
import ClientViewInterviewQuestions from './client-view-interview-questions';
import { GET_INTERVIEW_QUESTIONS } from '@/app/graphql/InterviewQuestions';
import { createServerApolloClient } from '@/app/common/utility';
import InterviewQuestionsDTO, { INTERVIEW_QUESTIONS } from '@/app/types/InterviewQuestionsDTO';

export const metadata: Metadata = {
  title: 'View Interview Questions'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewInterviewQuestionsPage({ params }: Props) {
  const { id } = await params;
  let dtoInterviewQuestions: InterviewQuestionsDTO = INTERVIEW_QUESTIONS;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INTERVIEW_QUESTIONS,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getInterviewQuestions) {
      dtoInterviewQuestions = results[0].data.getInterviewQuestions;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewInterviewQuestions dtoInterviewQuestions={dtoInterviewQuestions}></ClientViewInterviewQuestions>;
}
