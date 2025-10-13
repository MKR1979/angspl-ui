import { Metadata } from 'next';
import ClientDistrictList from './client-district-list';
import { DISTRICT_LIST } from '@/app/graphql/District';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import DistrictDTO from '@/app/types/DistrictDTO';
export const metadata: Metadata = {
  title: 'Districts'
};

export const revalidate = 0;

export default async function DistrictListPage() {
  let arrDistrictDTO: DistrictDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: DISTRICT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getDistrictList?.districts) {
      arrDistrictDTO = results[0].data.getDistrictList.districts;
    }
    if (results[0]?.data?.getDistrictList?.total_records) {
      total_records = results[0].data.getDistrictList.total_records;
    }
  } catch {}
  return <ClientDistrictList arrDistrictDTO={arrDistrictDTO} total_records={total_records}></ClientDistrictList>;
}
