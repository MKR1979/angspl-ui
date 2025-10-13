import { Metadata } from 'next';
import ClientViewAdmissionClg from './client-view-admission-clg';
import { GET_ADMISSION_CLG } from '@/app/graphql/AdmissionClg';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionClgDTO, { ADMISSION_CLG } from '@/app/types/AdmissionClgDTO';

export const metadata: Metadata = {
  title: 'View Admission'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewAdmissionClgPage({ params }: Props) {
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
      dtoAdmissionClg = results[0].data.getAdmissionClg;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAdmissionClg dtoAdmissionClg={dtoAdmissionClg}></ClientViewAdmissionClg>;
}
