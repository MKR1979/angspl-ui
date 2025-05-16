import { Metadata } from 'next';
import ClientQuizList from './client-quiz-list';
import { QUIZ_LIST } from '@/app/graphql/Quiz';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import QuizDTO from '@/app/types/QuizDTO';
export const metadata: Metadata = {
  title: 'Quizzes'
};

export const revalidate = 0;

export default async function QuizListPage() {
  let arrQuizDTO: QuizDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUIZ_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuizList?.quizzes) {
      arrQuizDTO = results[0].data.getQuizList.quizzes;
    }
    if (results[0]?.data?.getQuizList?.total_records) {
      total_records = results[0].data.getQuizList.total_records;
    }
  } catch {}
  return <ClientQuizList arrQuizDTO={arrQuizDTO} total_records={total_records}></ClientQuizList>;
}
