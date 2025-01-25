import { Metadata } from 'next';
import ClientAddQuote from './client-add-quote';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import QuoteDTO, { QUOTE } from '@/app/types/QuoteDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Add Quote'
};

export const revalidate = 0;

export default async function AddQuotePage() {
  let arrAccountLookup: LookupDTO[] = [];
  let arrUserLookup: LookupDTO[] = [];
  let arrIncotermLookup: LookupDTO[] = [];
  let arrTermLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrTaxLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  let arrCountryLookup: LookupDTO[] = [];
  const dtoQuote: QuoteDTO = { ...QUOTE };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: INCOTERM_LOOKUP
    });
    const result3 = apolloClient.query({
      query: TERM_LOOKUP
    });
    const result4 = apolloClient.query({
      query: GET_USER_MY_PROFILE
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

    if (results[0]?.data?.getAccountLookup) {
      arrAccountLookup = results[0].data.getAccountLookup;
    }
    if (results[1]?.data?.getUserLookup) {
      arrUserLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getIncotermLookup) {
      arrIncotermLookup = results[2].data.getIncotermLookup;
    }
    if (results[3]?.data?.getTermLookup) {
      arrTermLookup = results[3].data.getTermLookup;
    }
    if (results[4]?.data?.getUserMyProfile) {
      dtoUser = results[4].data.getUserMyProfile;
      dtoQuote.sales_person_id = dtoUser.id;
      dtoQuote.sales_person_name = dtoUser.user_name;
      console.log('hello9', JSON.stringify(dtoQuote));
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
    console.log('test', JSON.stringify(err));
  }
  return (
    <ClientAddQuote
      dtoQuote={dtoQuote}
      arrAccountLookup={arrAccountLookup}
      arrUserLookup={arrUserLookup}
      arrIncotermLookup={arrIncotermLookup}
      arrTermLookup={arrTermLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrTaxLookup={arrTaxLookup}
      arrCountryLookup={arrCountryLookup}
    ></ClientAddQuote>
  );
}
