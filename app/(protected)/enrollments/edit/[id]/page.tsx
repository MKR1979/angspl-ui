import { Metadata } from 'next';
import ClientEditEnrollment from './client-edit-enrollment';
import { GET_ENROLLMENT } from '@/app/graphql/Enrollment';
import { createServerApolloClient } from '@/app/common/utility';
import EnrollmentDTO, { ENROLLMENT } from '@/app/types/EnrollmentDTO';
// import { COURSE_LOOKUP } from '@/app/graphql/Location';

export const metadata: Metadata = {
  title: 'Edit Enrollment'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditEnrollmentPage({ params }: Props) {
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

  return (
    <ClientEditEnrollment
      dtoEnrollment={dtoEnrollment}
    />
  );
}
