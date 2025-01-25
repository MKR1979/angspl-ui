import { Metadata } from 'next';
import ClientEditIncoterm from './client-edit-incoterm';
import { GET_INCOTERM } from '@/app/graphql/Incoterm';
import { createServerApolloClient } from '@/app/common/utility';
import IncotermDTO, { INCOTERM } from '@/app/types/IncotermDTO';

export const metadata: Metadata = {
  title: 'Edit Incoterm'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditIncotermPage({ params }: Props) {
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
  return <ClientEditIncoterm dtoIncoterm={dtoIncoterm} />;
}
