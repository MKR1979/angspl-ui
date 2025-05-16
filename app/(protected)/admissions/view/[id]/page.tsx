import { Metadata } from 'next';
import ClientViewAdmission from './client-view-admission';
import { GET_ADMISSION } from '@/app/graphql/Admission';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionDTO, { ADMISSION } from '@/app/types/AdmissionDTO';

export const metadata: Metadata = {
  title: 'View Admissions'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStatePage({ params }: Props) {
  const { id } = await params;
  let dtoAdmission: AdmissionDTO = ADMISSION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmission) {
      dtoAdmission = results[0].data.getAdmission;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAdmission dtoAdmission={dtoAdmission}></ClientViewAdmission>;
}
