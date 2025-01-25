import { Metadata } from 'next';
import ClientViewIndustry from './client-view-industry';
import { GET_INDUSTRY } from '@/app/graphql/Industry';
import { createServerApolloClient } from '@/app/common/utility';
import IndustryDTO, { INDUSTRY } from '@/app/types/IndustryDTO';

export const metadata: Metadata = {
  title: 'View Industry'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewIndustryPage({ params }: Props) {
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
  return <ClientViewIndustry dtoIndustry={dtoIndustry}></ClientViewIndustry>;
}
