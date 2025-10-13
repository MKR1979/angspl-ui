
import { Metadata } from 'next';
import ClientViewQuizResult from './client-view-quiz-result';
import { GET_QUIZ_RESULT } from '@/app/graphql/Quiz';
import { createServerApolloClient } from '@/app/common/utility';
import QuizDataDTO, { QUIZ_DATA } from '@/app/types/QuizDataDTO';

export const metadata: Metadata = {
  title: 'View Exam Result'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewResultPage({ params }: Props) {
  const { id } = await params;
 
  let dtoQuizData: QuizDataDTO = QUIZ_DATA;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUIZ_RESULT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    console.log('GraphQL result:', JSON.stringify(results[0], null, 2));
    if (results[0]?.data?.getQuizResult) {
      dtoQuizData = results[0].data.getQuizResult;
      console.log('dtoQuizResult populated:', dtoQuizData);
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewQuizResult dtoQuizData={dtoQuizData} />;
}
