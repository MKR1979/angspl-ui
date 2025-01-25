import { Metadata } from 'next';
import ClientEditTerm from './client-edit-term';
import { GET_TERM } from '@/app/graphql/Term';
import { createServerApolloClient } from '@/app/common/utility';
import TermDTO, { TERM } from '@/app/types/TermDTO';

export const metadata: Metadata = {
  title: 'Edit Term'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditTermPage({ params }: Props) {
  const { id } = await params;
  let dtoTerm: TermDTO = TERM;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TERM,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTerm) {
      dtoTerm = results[0].data.getTerm;
    }
  } catch {}
  return <ClientEditTerm dtoTerm={dtoTerm} />;
}
