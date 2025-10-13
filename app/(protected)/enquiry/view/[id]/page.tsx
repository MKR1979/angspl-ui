
import { Metadata } from 'next';
import ClientViewEnquiry from './client-view-enquiry';
import { GET_ENQUIRY } from '@/app/graphql/ContactUs';
import { createServerApolloClient } from '@/app/common/utility';
import ContactPointDTO, { CONTACT_US } from '@/app/types/ContactUsDTO';

export const metadata: Metadata = {
  title: 'View Enquiry'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEnquiryPage({ params }: Props) {
  const { id } = await params;
 
  let dtoContactPoint: ContactPointDTO = CONTACT_US;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ENQUIRY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    console.log('GraphQL result:', JSON.stringify(results[0], null, 2));
    if (results[0]?.data?.getEnquiry) {
      dtoContactPoint = results[0].data.getEnquiry;
      console.log('dtoQuizResult populated:', dtoContactPoint);
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }

  return <ClientViewEnquiry dtoContactPoint={dtoContactPoint} />;
}
