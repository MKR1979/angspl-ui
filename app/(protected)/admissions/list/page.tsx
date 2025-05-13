import { Metadata } from 'next';
import ClientAdmissionList from './client-admission-list';
import {  GET_ADMISSION_LIST } from '@/app/graphql/Admission';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionDTO from '@/app/types/AdmissionDTO';

export const metadata: Metadata = {
  title: 'Admissions'
};

export const revalidate = 0;

export default async function AdmissionListPage() {
  let arrAdmissionDTO: AdmissionDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionList?.admissions) {
      arrAdmissionDTO = results[0].data.getAdmissionList.admissions;
    }
    if (results[0]?.data?.getAdmissionList?.total_records) {
      total_records = results[0].data.getAdmissionList.total_records;
    }
  } catch {}
  return <ClientAdmissionList arrAdmissionDTO={arrAdmissionDTO} total_records={total_records}></ClientAdmissionList>;
}
