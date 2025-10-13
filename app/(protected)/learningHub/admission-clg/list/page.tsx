import { Metadata } from 'next';
import ClientAdmissionClgList from './client-admission-clg-list';
import { GET_ADMISSION_CLG_LIST } from '@/app/graphql/AdmissionClg';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionClgDTO from '@/app/types/AdmissionClgDTO';

export const metadata: Metadata = {
  title: 'Admission'
};
export const revalidate = 0;

export default async function AdmissionClgListPage() {
  let arrAdmissionClgDTO: AdmissionClgDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_CLG_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionClgList?.admissionClgs) {
      arrAdmissionClgDTO = results[0].data.getAdmissionClgList.admissionClgs;
    }
    if (results[0]?.data?.getAdmissionClgList?.total_records) {
      total_records = results[0].data.getAdmissionClgList.total_records;
    }
  } catch {}
  return (
    <ClientAdmissionClgList arrAdmissionClgDTO={arrAdmissionClgDTO} total_records={total_records}></ClientAdmissionClgList>
  );
}
