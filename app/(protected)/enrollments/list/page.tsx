import { Metadata } from 'next';
import ClientEnrollmentList from './client-enrollment-list';
import { ENROLLMENT_LIST } from '@/app/graphql/Enrollment';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import EnrollmentDTO from '@/app/types/EnrollmentDTO';
export const metadata: Metadata = {
  title: 'Enrollments'
};

export const revalidate = 0;

export default async function EnrollmentListPage() {
  let arrEnrollmentDTO: EnrollmentDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ENROLLMENT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEnrollmentList?.enrollments) {
      arrEnrollmentDTO = results[0].data.getEnrollmentList.enrollments;
    }
    if (results[0]?.data?.getEnrollmentList?.total_records) {
      total_records = results[0].data.getEnrollmentList.total_records;
    }
  } catch {}
  return <ClientEnrollmentList arrEnrollmentDTO={arrEnrollmentDTO} total_records={total_records}></ClientEnrollmentList>;
}
