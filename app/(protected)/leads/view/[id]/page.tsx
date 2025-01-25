import { Metadata } from 'next';
import ClientViewLead from './client-view-lead';
import { GET_LEAD } from '@/app/graphql/Lead';
import { createServerApolloClient } from '@/app/common/utility';
import LeadDTO, { LEAD } from '@/app/types/LeadDTO';

export const metadata: Metadata = {
  title: 'View Lead'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewLeadPage({ params }: Props) {
  const { id } = await params;
  let dtoLead: LeadDTO = LEAD;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_LEAD,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getLead) {
      dtoLead = results[0].data.getLead;
    }
  } catch {}
  return <ClientViewLead dtoLead={dtoLead}></ClientViewLead>;
}
