import { Metadata } from 'next';
import ClientViewAdmission from './client-view-admission';
import { GET_ADMISSION_TECH } from '@/app/graphql/AdmissionTech';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionDTO, { ADMISSION_TECH } from '@/app/types/AdmissionTechDTO';

export const metadata: Metadata = {
  title: 'View Admissions'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewAdmissionTechPage({ params }: Props) {
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
      dtoAdmission = results[0].data.getAdmissionTech;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAdmission dtoAdmission={dtoAdmission}></ClientViewAdmission>;
}
