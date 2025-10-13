import { Metadata } from 'next';
import ClientGroupList from './client-group-list';
import { GROUP_LIST } from '@/app/graphql/Group';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import GroupDTO from '@/app/types/GroupDTO';
export const metadata: Metadata = {
  title: 'Groups'
};

export const revalidate = 0;

export default async function GroupListPage() {
  let arrGroupDTO: GroupDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GROUP_LIST,
      variables: {       
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getGroupList?.groups) {
      arrGroupDTO = results[0].data.getGroupList.groups;
    }
    if (results[0]?.data?.getGroupList?.total_records) {
      total_records = results[0].data.getGroupList.total_records;
    }
  } catch {}
  return <ClientGroupList arrGroupDTO={arrGroupDTO} total_records={total_records}></ClientGroupList>;
}
