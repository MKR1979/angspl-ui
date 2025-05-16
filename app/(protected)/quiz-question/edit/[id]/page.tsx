
import { Metadata } from 'next';
import ClientEditQuizQuestion from './client-edit-quiz-question';
import { GET_QUIZ_QUESTION } from '@/app/graphql/QuizQuestion';
import { createServerApolloClient } from '@/app/common/utility';
import QuizQuestionDTO, { QUIZ_QUESTION } from '@/app/types/QuizQuestionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';

export const metadata: Metadata = {
  title: 'Edit Quiz Question'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditQuizQuestionPage({ params }: Props) {
  const { id } = await params;
  let dtoQuizQuestion: QuizQuestionDTO = QUIZ_QUESTION;
  let arrQuizLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUIZ_QUESTION,
      variables: {
        id: parseInt(id)
      }
    });
     const result1 = apolloClient.query({
      query: QUIZ_LOOKUP
    });
    const results = await Promise.all([result, result1]);
      if (results[0]?.data?.getQuizQuestion) {
      dtoQuizQuestion = results[0].data.getQuizQuestion;
      }
    if (results[1]?.data?.getQuizLookup) {
      arrQuizLookup = results[1].data.getQuizLookup;
    }
  } catch {}
  return <ClientEditQuizQuestion dtoQuizQuestion={dtoQuizQuestion} arrQuizLookup={arrQuizLookup} />;
}