import { Metadata } from 'next';
import ClientInterviewQuestionsList from './client-interview-questions-list';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import InterviewQuestionsDTO from '@/app/types/InterviewQuestionsDTO';
import { INTERVIEW_QUESTIONS_LIST } from '@/app/graphql/InterviewQuestions';
export const metadata: Metadata = {
  title: 'Interview Questions'
};

export const revalidate = 0;

export default async function StudyNotesListPage() {
  let arrInterviewQuestionsDTO: InterviewQuestionsDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: INTERVIEW_QUESTIONS_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getInterviewQuestionsList?.InterviewQuestions) {
      arrInterviewQuestionsDTO = results[0].data.getInterviewQuestionsList.InterviewQuestions;
    }
    if (results[0]?.data?.getInterviewQuestionsList?.total_records) {
      total_records = results[0].data.getInterviewQuestionsList.total_records;
    }
  } catch {}
  return <ClientInterviewQuestionsList arrInterviewQuestionsDTO={arrInterviewQuestionsDTO} total_records={total_records}></ClientInterviewQuestionsList>;
}
