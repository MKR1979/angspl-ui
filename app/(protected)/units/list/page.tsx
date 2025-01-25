import { Metadata } from 'next';
import ClientUnitList from './client-unit-list';
import { UNIT_LIST } from '@/app/graphql/Unit';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import UnitDTO from '@/app/types/UnitDTO';
export const metadata: Metadata = {
  title: 'Product Categories'
};

export const revalidate = 0;

export default async function UnitListPage() {
  let arrUnitDTO: UnitDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: UNIT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUnitList?.units) {
      arrUnitDTO = results[0].data.getUnitList.units;
    }
    if (results[0]?.data?.getUnitList?.total_records) {
      total_records = results[0].data.getUnitList.total_records;
    }
  } catch {}
  return <ClientUnitList arrUnitDTO={arrUnitDTO} total_records={total_records}></ClientUnitList>;
}
