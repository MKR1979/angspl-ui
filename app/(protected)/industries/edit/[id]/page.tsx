import { Metadata } from 'next';
import ClientEditIndustry from './client-edit-industry';
import { GET_INDUSTRY } from '@/app/graphql/Industry';
import { createServerApolloClient } from '@/app/common/utility';
import IndustryDTO, { INDUSTRY } from '@/app/types/IndustryDTO';

export const metadata: Metadata = {
  title: 'Edit Industry'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditIndustryPage({ params }: Props) {
  const { id } = await params;
  let dtoIndustry: IndustryDTO = INDUSTRY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INDUSTRY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getIndustry) {
      dtoIndustry = results[0].data.getIndustry;
    }
  } catch {}
  return <ClientEditIndustry dtoIndustry={dtoIndustry} />;
}
