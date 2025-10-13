
import { Metadata } from 'next';
import ClientEditQuiz from './client-edit-quiz';
import { GET_QUIZ } from '@/app/graphql/Quiz';
import { createServerApolloClient } from '@/app/common/utility';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Edit Exam'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditQuizPage({ params }: Props) {
  const { id } = await params;
  let dtoQuiz: QuizDTO = QUIZ;
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUIZ,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
          query: COURSE_LOOKUP
        });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getQuiz) {
      dtoQuiz = { ...results[0].data.getQuiz };
    }
    if (results[1]?.data?.getCourseLookup) {
      arrCourseLookup = results[1].data.getCourseLookup;
    }
  } catch {}
  return <ClientEditQuiz dtoQuiz={dtoQuiz} arrCourseLookup={arrCourseLookup} />;
}