import { Metadata } from 'next';
import ClientResultList from './client-quiz-result-list';
import { QUIZ_RESULT_REVIEW_LIST } from '@/app/graphql/Quiz';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import QuizDataDTO from '@/app/types/QuizDataDTO';
export const metadata: Metadata = {
  title: 'Review Result'
};

export const revalidate = 0;

export default async function ResultListPage() {
  let arrQuizDataDTO: QuizDataDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUIZ_RESULT_REVIEW_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuizResultReviewList?.quizResults) {
      arrQuizDataDTO = results[0].data.getQuizResultReviewList.quizResults;
    }
    if (results[0]?.data?.getQuizResultReviewList?.total_records) {
      total_records = results[0].data.getQuizResultReviewList.total_records;
    }
  } catch {}
  return <ClientResultList arrQuizDataDTO={arrQuizDataDTO} total_records={total_records}></ClientResultList>;
}
