import { Metadata } from 'next';
import ClientAccountList from './client-account-list';
import { ACCOUNT_LIST } from '@/app/graphql/Account';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AccountDTO from '@/app/types/AccountDTO';
export const metadata: Metadata = {
  title: 'Accounts'
};

export const revalidate = 0;

export default async function AccountListPage() {
  let arrAccountDTO: AccountDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ACCOUNT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAccountList?.accounts) {
      arrAccountDTO = results[0].data.getAccountList.accounts;
    }
    if (results[0]?.data?.getAccountList?.total_records) {
      total_records = results[0].data.getAccountList.total_records;
    }
  } catch {}
  return <ClientAccountList arrAccountDTO={arrAccountDTO} total_records={total_records}></ClientAccountList>;
}
