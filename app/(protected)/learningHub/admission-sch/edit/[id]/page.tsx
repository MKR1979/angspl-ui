import { Metadata } from 'next';
import ClientEditAdmissionSch from './client-edit-admission-sch';
import { GET_ADMISSION_SCH } from '@/app/graphql/AdmissionSch';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionSchoolDTO, { ADMISSION_SCHOOL } from '@/app/types/AdmissionSchDTO';

export const metadata: Metadata = {
  title: 'Edit Admission'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAdmissionSchPage({ params }: Props) {
  const { id } = await params;
  let dtoAdmissionSchool: AdmissionSchoolDTO = ADMISSION_SCHOOL;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_SCH,
      variables: {
        id: parseInt(id)
      }
    });

    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionSch) {
      dtoAdmissionSchool = { ...results[0].data.getAdmissionSch };
    } else {
      console.warn('[DEBUG] No admission data found for id:', id); // Debug 9
    }
  } catch (error) {
    console.error('[DEBUG] Error in EditAdmissionPage:', error); // Debug 10
  }
  return <ClientEditAdmissionSch dtoAdmissionSchool={dtoAdmissionSchool} />;
}
