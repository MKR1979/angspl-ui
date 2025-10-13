import { Metadata } from 'next';
import ClientEditEmployee from './client-edit-admission-clg';
import { GET_ADMISSION_CLG } from '@/app/graphql/AdmissionClg';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionClgDTO, { ADMISSION_CLG } from '@/app/types/AdmissionClgDTO';

export const metadata: Metadata = {
  title: 'Edit Admission'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAdmissionClgPage({ params }: Props) {

  const { id } = await params;
  let dtoAdmissionClg: AdmissionClgDTO = ADMISSION_CLG;

  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_CLG,
      variables: {
        id: parseInt(id)        
      }
    });

    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionClg) {
      dtoAdmissionClg = { ...results[0].data.getAdmissionClg };
    } else {
      console.warn('[DEBUG] No admission data found for id:', id); 
    }
  } catch (error) {
    console.error('[DEBUG] Error in EditAdmissionPage:', error); 
  }
  return <ClientEditEmployee dtoAdmissionClg={dtoAdmissionClg} />;
}
