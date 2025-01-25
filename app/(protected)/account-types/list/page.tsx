import { Metadata } from 'next';
import ClientAccountTypeList from './client-account-type-list';
import { ACCOUNT_TYPE_LIST } from '@/app/graphql/AccountType';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import AccountTypeDTO from '@/app/types/AccountTypeDTO';
export const metadata: Metadata = {
  title: 'Account Types'
};

export const revalidate = 0;

export default async function AccountTypeListPage() {
  let arrAccountTypeDTO: AccountTypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ACCOUNT_TYPE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAccountTypeList?.accountTypes) {
      arrAccountTypeDTO = results[0].data.getAccountTypeList.accountTypes;
    }
    if (results[0]?.data?.getAccountTypeList?.total_records) {
      total_records = results[0].data.getAccountTypeList.total_records;
    }
  } catch {}
  return <ClientAccountTypeList arrAccountTypeDTO={arrAccountTypeDTO} total_records={total_records}></ClientAccountTypeList>;
}
