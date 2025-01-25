import { Metadata } from 'next';
import ClientEditLeadSource from './client-edit-lead-source';
import { GET_LEAD_SOURCE } from '@/app/graphql/LeadSource';
import { createServerApolloClient } from '@/app/common/utility';
import LeadSourceDTO, { LEAD_SOURCE } from '@/app/types/LeadSourceDTO';

export const metadata: Metadata = {
  title: 'Edit Lead Source'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditLeadSourcePage({ params }: Props) {
  const { id } = await params;
  let dtoLeadSource: LeadSourceDTO = LEAD_SOURCE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_LEAD_SOURCE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLeadSource) {
      dtoLeadSource = results[0].data.getLeadSource;
    }
  } catch {}
  return <ClientEditLeadSource dtoLeadSource={dtoLeadSource} />;
}
