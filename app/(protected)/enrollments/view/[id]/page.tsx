import { Metadata } from 'next';
import ClientViewEnrollment from './client-view-enrollment';
import { GET_ENROLLMENT } from '@/app/graphql/Enrollment';
import { createServerApolloClient } from '@/app/common/utility';
import EnrollmentDTO, { ENROLLMENT } from '@/app/types/EnrollmentDTO';

export const metadata: Metadata = {
  title: 'View Enrollment'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEnrollmentPage({ params }: Props) {
  const { id } = await params;
  let dtoEnrollment: EnrollmentDTO = ENROLLMENT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ENROLLMENT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEnrollment) {
      dtoEnrollment = results[0].data.getEnrollment;
    }
  } catch {}
  return <ClientViewEnrollment dtoEnrollment={dtoEnrollment}></ClientViewEnrollment>;
}
