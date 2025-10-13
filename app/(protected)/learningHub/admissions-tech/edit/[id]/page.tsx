import { Metadata } from 'next';
import ClientEditAdmission from './client-edit-admission';
import { GET_ADMISSION_TECH } from '@/app/graphql/AdmissionTech';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionDTO, { ADMISSION_TECH } from '@/app/types/AdmissionTechDTO';

export const metadata: Metadata = {
  title: 'Edit Admission '
};

export const revalidate = 0;
type Props = { params: Promise<{ id: string }> };
export default async function EditAdmissionPage({ params }: Props) {
  const { id } = await params;
  let dtoAdmission: AdmissionDTO = ADMISSION_TECH;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_TECH,
      variables: {
        id: parseInt(id)
      }
    });

    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionTech) {
      dtoAdmission = { ...results[0].data.getAdmissionTech };
    } else {
    }
  } catch (error) {
    console.error('[DEBUG] Error in EditAdmissionPage:', error); 
  }
  return <ClientEditAdmission dtoAdmission={dtoAdmission} />;
}