import { Metadata } from 'next';
import ClientEditOrder from './client-edit-order';
import { GET_ORDER } from '@/app/graphql/Order';
import { createServerApolloClient } from '@/app/common/utility';
import OrderDTO, { ORDER } from '@/app/types/OrderDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { QUOTE_LOOKUP } from '@/app/graphql/Quote';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Edit Order'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditOrderPage({ params }: Props) {
  const { id } = await params;
  let dtoOrder: OrderDTO = ORDER;
  let arrQuoteLookup: LookupDTO[] = [];
  let arrAccountLookup: LookupDTO[] = [];
  let arrUserLookup: LookupDTO[] = [];
  let arrIncotermLookup: LookupDTO[] = [];
  let arrTermLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrTaxLookup: LookupDTO[] = [];
  let arrCountryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ORDER,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: QUOTE_LOOKUP,
      variables: { full: true }
    });
    const result2 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result3 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result4 = apolloClient.query({
      query: INCOTERM_LOOKUP
    });
    const result5 = apolloClient.query({
      query: TERM_LOOKUP
    });
    const result6 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result7 = apolloClient.query({
      query: TAX_LOOKUP
    });
    const result8 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5, result6, result7, result8]);
    if (results[0]?.data?.getOrder) {
      dtoOrder = results[0].data.getOrder;
    }
    if (results[1]?.data?.getQuoteLookup) {
      arrQuoteLookup = results[1].data.getQuoteLookup;
    }
    if (results[2]?.data?.getAccountLookup) {
      arrAccountLookup = results[2].data.getAccountLookup;
    }
    if (results[3]?.data?.getUserLookup) {
      arrUserLookup = results[3].data.getUserLookup;
    }
    if (results[4]?.data?.getIncotermLookup) {
      arrIncotermLookup = results[4].data.getIncotermLookup;
    }
    if (results[5]?.data?.getTermLookup) {
      arrTermLookup = results[5].data.getTermLookup;
    }
    if (results[6]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[6].data.getCurrencyLookup;
    }
    if (results[7]?.data?.getTaxLookup) {
      arrTaxLookup = results[7].data.getTaxLookup;
    }
    if (results[8]?.data?.getCountryLookup) {
      arrCountryLookup = results[8].data.getCountryLookup;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return (
    <ClientEditOrder
      dtoOrder={dtoOrder}
      arrQuoteLookup={arrQuoteLookup}
      arrAccountLookup={arrAccountLookup}
      arrUserLookup={arrUserLookup}
      arrIncotermLookup={arrIncotermLookup}
      arrTermLookup={arrTermLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrTaxLookup={arrTaxLookup}
      arrCountryLookup={arrCountryLookup}
    />
  );
}
