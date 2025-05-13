import { Metadata } from 'next';
import ClientEditQuestionOptions from './client-edit-question-options';
import { GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
import { createServerApolloClient } from '@/app/common/utility';
import QuestionOptionsDTO, { QUESTION_OPTIONS } from '@/app/types/QuestionOptionsDTO';

export const metadata: Metadata = {
   title: 'Edit Question Options '
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditQuestionOptionsPage({ params }: Props) {
  const { id } = await params;
  console.log('Received params:', id);

  let dtoQuestionOptions: QuestionOptionsDTO = QUESTION_OPTIONS;

  try {
    const apolloClient = await createServerApolloClient();
    console.log('Apollo client created.');

    const result = await apolloClient.query({
      query: GET_QUESTION_OPTIONS,
      variables: {
        id: parseInt(id)
      }
    });

    console.log('GraphQL query result:', result);

    if (result?.data?.getQuestionOptions) {
      dtoQuestionOptions = { ...result.data.getQuestionOptions };
      console.log('Loaded QuestionOptions:', dtoQuestionOptions);
    } else {
      console.warn('No getQuestionOptions data found.');
    }
  } catch (error) {
    console.error('Error fetching question options:', error);
  }

  return <ClientEditQuestionOptions dtoQuestionOptions={dtoQuestionOptions} />;
}




// import { Metadata } from 'next';
// import ClientEditQuestionOptions from './client-edit-question-options';
// import { GET_QUESTION_OPTIONS } from '@/app/graphql/QuestionOptions';
// import { createServerApolloClient } from '@/app/common/utility';
// import QuestionOptionsDTO, { QUESTION_OPTIONS } from '@/app/types/QuestionOptionsDTO';


// export const metadata: Metadata = {
//    title: 'Edit Question Options '
// };

// export const revalidate = 0;

// type Props = { params: Promise<{ id: string }> };

// export default async function EditQuestionOptionsPage({ params }: Props) {
//   const { id } = await params;
//   let dtoQuestionOptions: QuestionOptionsDTO = QUESTION_OPTIONS;
//   try {
//     const apolloClient = await createServerApolloClient();
//     const result = apolloClient.query({
//       query: GET_QUESTION_OPTIONS,
//       variables: {
//         id: parseInt(id)
//       }
//     });
//     const results = await Promise.all([result]);
//     alert(results);
//     if (results[0]?.data?.getQuestionOptions) {
//       dtoQuestionOptions = { ...results[0].data.getQuestionOptions };
     
//     }
//   } catch {}
//   return <ClientEditQuestionOptions dtoQuestionOptions={dtoQuestionOptions} />;
// }