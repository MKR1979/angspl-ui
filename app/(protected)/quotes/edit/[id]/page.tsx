import { Metadata } from 'next';
import ClientEditQuote from './client-edit-quote';
import { GET_QUOTE } from '@/app/graphql/Quote';
import { createServerApolloClient } from '@/app/common/utility';
import QuoteDTO, { QUOTE } from '@/app/types/QuoteDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Edit Quote'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditQuotePage({ params }: Props) {
  const { id } = await params;
  let dtoQuote: QuoteDTO = QUOTE;
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
      query: GET_QUOTE,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result3 = apolloClient.query({
      query: INCOTERM_LOOKUP
    });
    const result4 = apolloClient.query({
      query: TERM_LOOKUP
    });
    const result5 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result6 = apolloClient.query({
      query: TAX_LOOKUP
    });
    const result7 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5, result6, result7]);
    if (results[0]?.data?.getQuote) {
      dtoQuote = results[0].data.getQuote;
    }
    if (results[1]?.data?.getAccountLookup) {
      arrAccountLookup = results[1].data.getAccountLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrUserLookup = results[2].data.getUserLookup;
    }
    if (results[3]?.data?.getIncotermLookup) {
      arrIncotermLookup = results[3].data.getIncotermLookup;
    }
    if (results[4]?.data?.getTermLookup) {
      arrTermLookup = results[4].data.getTermLookup;
    }
    if (results[5]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[5].data.getCurrencyLookup;
    }
    if (results[6]?.data?.getTaxLookup) {
      arrTaxLookup = results[6].data.getTaxLookup;
    }
    if (results[7]?.data?.getCountryLookup) {
      arrCountryLookup = results[7].data.getCountryLookup;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return (
    <ClientEditQuote
      dtoQuote={dtoQuote}
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
