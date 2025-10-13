import { Metadata } from 'next';
import ClientViewQuizQuestion from './client-view-quiz-question';
import { GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';
import { createServerApolloClient } from '@/app/common/utility';
import QuizQuestionDTO, { QUIZ_QUESTION } from '@/app/types/QuizQuestionDTO';

export const metadata: Metadata = {
  title: 'View Exam Question'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewQuizQuestionPage({ params }: Props) {
  const { id } = await params;
  let dtoQuizQuestion: QuizQuestionDTO = QUIZ_QUESTION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUIZ_QUESTION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuizQuestion) {
      dtoQuizQuestion = results[0].data.getQuizQuestion;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewQuizQuestion dtoQuizQuestion={dtoQuizQuestion}></ClientViewQuizQuestion>;
}
