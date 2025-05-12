import { Metadata } from 'next';
import ClientViewQuestionOptions from './client-view-question-options';
import { GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
import { createServerApolloClient } from '@/app/common/utility';
import QuestionOptionsDTO, { QUESTION_OPTIONS } from '@/app/types/QuestionOptionsDTO';

export const metadata: Metadata = {
  title: 'View Question Options'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStatePage({ params }: Props) {
  const { id } = await params;
  let dtoQuestionOptions: QuestionOptionsDTO = QUESTION_OPTIONS;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUESTION_OPTIONS,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuestionOptions) {
      dtoQuestionOptions = results[0].data.getQuestionOptions;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewQuestionOptions dtoQuestionOptions={dtoQuestionOptions}></ClientViewQuestionOptions>;
}
