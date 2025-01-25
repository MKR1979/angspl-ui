import { Metadata } from 'next';
import ClientViewQuote from './client-view-quote';
import { GET_QUOTE } from '@/app/graphql/Quote';
import { createServerApolloClient } from '@/app/common/utility';
import QuoteDTO, { QUOTE } from '@/app/types/QuoteDTO';

export const metadata: Metadata = {
  title: 'View Quote'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewQuotePage({ params }: Props) {
  const { id } = await params;
  let dtoQuote: QuoteDTO = QUOTE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_QUOTE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getQuote) {
      dtoQuote = results[0].data.getQuote;
    }
  } catch {}
  return <ClientViewQuote dtoQuote={dtoQuote}></ClientViewQuote>;
}
