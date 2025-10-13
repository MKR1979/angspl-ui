
import { Metadata } from 'next';
import ClientAddQuizQuestion from './client-add-quiz-question';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { QUIZ_LOOKUP } from '@/app/graphql/Quiz';

export const metadata: Metadata = {
  title: 'Add Exam Question'
};

export const revalidate = 0;

export default async function AddQuizQuestionPage() {
  let arrQuizLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUIZ_LOOKUP
    });

    const results = await Promise.all([result]);

    if (results[0]?.data?.getQuizLookup) {
      arrQuizLookup = results[0].data.getQuizLookup;
    }
    console.log('hello', JSON.stringify(arrQuizLookup));
  } catch (e) {
    console.log('hello', JSON.stringify(e));
  }
  return <ClientAddQuizQuestion arrQuizLookup={arrQuizLookup}></ClientAddQuizQuestion>;
}