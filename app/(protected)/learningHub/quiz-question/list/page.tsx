import { Metadata } from 'next';
import ClientQuizQuestionList from './client-quiz-question-list';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import { QUIZ_QUESTION_LIST } from '@/app/graphql/QuizQuestion';
export const metadata: Metadata = {
  title: 'Exam Question'
};

export const revalidate = 0;

export default async function QuizQuestionListPage() {
  let arrQuizQuestionDTO: QuizQuestionDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUIZ_QUESTION_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuizQuestionList?.quizQuestions) {
      arrQuizQuestionDTO = results[0].data.getQuizQuestionList.quizQuestions;
    }
    if (results[0]?.data?.getQuizQuestionList?.total_records) {
      total_records = results[0].data.getQuizQuestionList.total_records;
    }
  } catch {}
  return <ClientQuizQuestionList arrQuizQuestionDTO={arrQuizQuestionDTO} total_records={total_records}></ClientQuizQuestionList>;
}
