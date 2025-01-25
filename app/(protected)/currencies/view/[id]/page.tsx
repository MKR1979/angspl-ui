import { Metadata } from 'next';
import ClientViewCurrency from './client-view-currency';
import { GET_CURRENCY } from '@/app/graphql/Currency';
import { createServerApolloClient } from '@/app/common/utility';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';

export const metadata: Metadata = {
  title: 'View Currency'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCurrencyPage({ params }: Props) {
  const { id } = await params;
  let dtoCurrency: CurrencyDTO = CURRENCY;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CURRENCY,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCurrency) {
      dtoCurrency = results[0].data.getCurrency;
    }
  } catch {}
  return <ClientViewCurrency dtoCurrency={dtoCurrency}></ClientViewCurrency>;
}
