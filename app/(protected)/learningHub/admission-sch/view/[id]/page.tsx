import { Metadata } from 'next';
import ClientViewAdmissionSch from './client-view-admission-sch';
import { GET_ADMISSION_SCH } from '@/app/graphql/AdmissionSch';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionSchoolDTO, { ADMISSION_SCHOOL } from '@/app/types/AdmissionSchDTO';

export const metadata: Metadata = {
  title: 'View Admission'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewAdmissionSchPage({ params }: Props) {
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
      dtoAdmissionSchool = results[0].data.getAdmissionSch;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewAdmissionSch dtoAdmissionSchool={dtoAdmissionSchool}></ClientViewAdmissionSch>;
}
