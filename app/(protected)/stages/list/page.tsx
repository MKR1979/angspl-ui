import { Metadata } from 'next';
import ClientStageList from './client-stage-list';
import { STAGE_LIST } from '@/app/graphql/Stage';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import StageDTO from '@/app/types/StageDTO';
export const metadata: Metadata = {
  title: 'Stages'
};

export const revalidate = 0;

export default async function StageListPage() {
  let arrStageDTO: StageDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: STAGE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getStageList?.stages) {
      arrStageDTO = results[0].data.getStageList.stages;
    }
    if (results[0]?.data?.getStageList?.total_records) {
      total_records = results[0].data.getStageList.total_records;
    }
  } catch {}
  return <ClientStageList arrStageDTO={arrStageDTO} total_records={total_records}></ClientStageList>;
}
