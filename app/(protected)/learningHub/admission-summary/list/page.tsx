import { Metadata } from 'next';
import ClientAdmSummaryList from './client-admission-summary-list';
import { GET_ADMISSION_SUMMARY_LIST } from '@/app/graphql/AdmissionReport';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionReportDTO from '@/app/types/AdmissionReportDTO';
export const metadata: Metadata = {
  title: 'Admission Summary'
};

export const revalidate = 0;

export default async function AdmSummaryListPage() {
  let arrAdmissionReportDTO: AdmissionReportDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_SUMMARY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionSummaryList?.admissionSummaries) {
      arrAdmissionReportDTO = results[0].data.getAdmissionSummaryList.admissionSummaries;
    }
    if (results[0]?.data?.getAdmissionSummaryList?.total_records) {
      total_records = results[0].data.getAdmissionSummaryList.total_records;
    }
  } catch {}
  return <ClientAdmSummaryList arrAdmissionReportDTO={arrAdmissionReportDTO} total_records={total_records}></ClientAdmSummaryList>;
}
