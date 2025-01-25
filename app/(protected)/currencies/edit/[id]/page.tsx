import { Metadata } from 'next';
import ClientEditCurrency from './client-edit-currency';
import { GET_CURRENCY } from '@/app/graphql/Currency';
import { createServerApolloClient } from '@/app/common/utility';
import CurrencyDTO, { CURRENCY } from '@/app/types/CurrencyDTO';

export const metadata: Metadata = {
  title: 'Edit Currency'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCurrencyPage({ params }: Props) {
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
  return <ClientEditCurrency dtoCurrency={dtoCurrency} />;
}
