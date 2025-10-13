import { Metadata } from 'next';
import ClientEmailList from './client-email-list';
import { GET_EMAIL_LIST } from '@/app/graphql/Email';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import EmailDTO from '@/app/types/EmailDTO';
export const metadata: Metadata = {
  title: 'Review Email'
};

export const revalidate = 0;

export default async function EmailListPage() {
  let arrEmailDTO: EmailDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EMAIL_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEmailList?.emails) {
      arrEmailDTO = results[0].data.getEmailList.emails;
    }
    if (results[0]?.data?.getEmailList?.total_records) {
      total_records = results[0].data.getEmailList.total_records;
    }
  } catch {}
  return <ClientEmailList arrEmailDTO={arrEmailDTO} total_records={total_records}></ClientEmailList>;
}
