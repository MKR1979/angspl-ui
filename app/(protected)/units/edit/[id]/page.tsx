import { Metadata } from 'next';
import ClientEditUnit from './client-edit-unit';
import { GET_UNIT } from '@/app/graphql/Unit';
import { createServerApolloClient } from '@/app/common/utility';
import UnitDTO, { UNIT } from '@/app/types/UnitDTO';

export const metadata: Metadata = {
  title: 'Edit Unit'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditUnitPage({ params }: Props) {
  const { id } = await params;
  let dtoUnit: UnitDTO = UNIT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_UNIT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getUnit) {
      dtoUnit = results[0].data.getUnit;
    }
  } catch {}
  return <ClientEditUnit dtoUnit={dtoUnit} />;
}
