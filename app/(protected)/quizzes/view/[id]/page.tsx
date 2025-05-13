import { Metadata } from 'next';
import ClientViewQuiz from './client-view-quiz';
import { GET_QUIZ } from '@/app/graphql/Quiz';
import { createServerApolloClient } from '@/app/common/utility';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';

export const metadata: Metadata = {
  title: 'View Quiz'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewQuizPage({ params }: Props) {
  const { id } = await params;
  let dtoQuiz: QuizDTO = QUIZ;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUIZ,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuiz) {
      dtoQuiz = results[0].data.getQuiz;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewQuiz dtoQuiz={dtoQuiz}></ClientViewQuiz>;
}
