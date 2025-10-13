import { Metadata } from 'next';
import ClientViewEmail from './client-view-email';
import { GET_EMAIL } from '@/app/graphql/Email';
import { createServerApolloClient } from '@/app/common/utility';
import EmailDTO, { EMAIL } from '@/app/types/EmailDTO';

export const metadata: Metadata = {
  title: 'View Email'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEmailPage({ params }: Props) {
  const { id } = await params;

  let dtoEmail: EmailDTO = EMAIL;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EMAIL,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    console.log('GraphQL result:', JSON.stringify(results[0], null, 2));
    if (results[0]?.data?.getEmail) {
      dtoEmail = results[0].data.getEmail;
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewEmail dtoEmail={dtoEmail} />;
}
