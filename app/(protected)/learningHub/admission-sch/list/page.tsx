import { Metadata } from 'next';
import ClientAdmissionSchList from './client-admission-sch-list';
import { GET_ADMISSION_SCH_LIST } from '@/app/graphql/AdmissionSch';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionSchoolDTO from '@/app/types/AdmissionSchDTO';

export const metadata: Metadata = {
  title: 'Admission'
};
export const revalidate = 0;

export default async function AdmissionSchListPage() {
  let arrAdmissionSchoolDTO: AdmissionSchoolDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_SCH_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionSchList?.admissionSchs) {
      arrAdmissionSchoolDTO = results[0].data.getAdmissionSchList.admissionSchs;
    }
    if (results[0]?.data?.getAdmissionSchList?.total_records) {
      total_records = results[0].data.getAdmissionSchList.total_records;
    }
  } catch {}
  return <ClientAdmissionSchList arrAdmissionSchoolDTO={arrAdmissionSchoolDTO} total_records={total_records}></ClientAdmissionSchList>;
}
