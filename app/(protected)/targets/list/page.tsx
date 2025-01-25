import { Metadata } from 'next';
import ClientTargetList from './client-target-list';
import { TARGET_LIST } from '@/app/graphql/Target';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TargetDTO from '@/app/types/TargetDTO';
export const metadata: Metadata = {
  title: 'Targets'
};

export const revalidate = 0;

export default async function TargetListPage() {
  let arrTargetDTO: TargetDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: TARGET_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTargetList?.targets) {
      arrTargetDTO = results[0].data.getTargetList.targets;
    }
    if (results[0]?.data?.getTargetList?.total_records) {
      total_records = results[0].data.getTargetList.total_records;
    }
  } catch {}
  return <ClientTargetList arrTargetDTO={arrTargetDTO} total_records={total_records}></ClientTargetList>;
}
