import { Metadata } from 'next';
import ClientQuestionOptionsList from './client-question-options-list';
import { QUESTION_OPTIONS_LIST } from '@/app/graphql/QuestionOptions';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';
export const metadata: Metadata = {
  title: 'Question Options'
};

export const revalidate = 0;

export default async function questionOptionsListPage() {
  let arrQuestionOptionsDTO: QuestionOptionsDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: QUESTION_OPTIONS_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuestionOptionsList?.questionOptions) {
      arrQuestionOptionsDTO = results[0].data.getQuestionOptionsList.questionOptions;
    }
    if (results[0]?.data?.getQuestionOptionsList?.total_records) {
      total_records = results[0].data.getQuestionOptionsList.total_records;
    }
  } catch {}
  return <ClientQuestionOptionsList arrQuestionOptionsDTO={arrQuestionOptionsDTO} total_records={total_records}></ClientQuestionOptionsList>;
}
