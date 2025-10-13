import { Metadata } from 'next';
import ClientUploadQuiz from './client-upload-quiz';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Add Exam'
};
export const revalidate = 0;
export default async function AddQuizPage() {
  let arrCourseLookup: LookupDTO[] = [];
  const dtoQuiz: QuizDTO = { ...QUIZ }; 
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COURSE_LOOKUP
    });
    const results = await Promise.all([result]);

    if (results[0]?.data?.getCourseLookup) {
      arrCourseLookup = results[0].data.getCourseLookup;
    }
    console.log('hello', JSON.stringify(arrCourseLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }


  return <ClientUploadQuiz arrCourseLookup={arrCourseLookup} dtoQuiz={dtoQuiz} ></ClientUploadQuiz>;
}