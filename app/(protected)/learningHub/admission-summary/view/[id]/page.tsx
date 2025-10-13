import { Metadata } from 'next';
import ClientViewAdmSummary from './client-view-admission-summary';
import { GET_ADMISSION_SUMMARY } from '@/app/graphql/AdmissionReport';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionReportDTO, { ADMISSION_REPORT } from '@/app/types/AdmissionReportDTO';

export const metadata: Metadata = {
  title: 'View Admission'
};

export const revalidate = 0;
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ companyType?: string }>;
};

export default async function ViewAdmSummaryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { companyType } = await searchParams;

  let dtoAdmissionReport: AdmissionReportDTO = ADMISSION_REPORT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ADMISSION_SUMMARY,
      variables: {
        id: parseInt(id),
        source_flag: companyType
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAdmissionSummary) {
      dtoAdmissionReport = results[0].data.getAdmissionSummary;
    } else {
      console.warn('No getAttendance data found for ID:', id);
    }
  } catch (err) {
    console.error('GraphQL query failed:', JSON.stringify(err));
  }
  return <ClientViewAdmSummary dtoAdmissionReport={dtoAdmissionReport} />;
}
