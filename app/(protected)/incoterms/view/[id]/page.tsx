import { Metadata } from 'next';
import ClientViewIncoterm from './client-view-incoterm';
import { GET_INCOTERM } from '@/app/graphql/Incoterm';
import { createServerApolloClient } from '@/app/common/utility';
import IncotermDTO, { INCOTERM } from '@/app/types/IncotermDTO';

export const metadata: Metadata = {
  title: 'View Incoterm'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewIncotermPage({ params }: Props) {
  const { id } = await params;
  let dtoIncoterm: IncotermDTO = INCOTERM;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INCOTERM,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getIncoterm) {
      dtoIncoterm = results[0].data.getIncoterm;
    }
  } catch {}
  return <ClientViewIncoterm dtoIncoterm={dtoIncoterm}></ClientViewIncoterm>;
}
