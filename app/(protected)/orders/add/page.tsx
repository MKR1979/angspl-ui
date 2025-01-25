import { Metadata } from 'next';
import ClientAddOrder from './client-add-order';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import OrderDTO, { ORDER } from '@/app/types/OrderDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { QUOTE_LOOKUP } from '@/app/graphql/Quote';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Add Order'
};

export const revalidate = 0;

export default async function AddOrderPage() {
  let arrQuoteLookup: LookupDTO[] = [];
  let arrAccountLookup: LookupDTO[] = [];
  let arrUserLookup: LookupDTO[] = [];
  let arrIncotermLookup: LookupDTO[] = [];
  let arrTermLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrTaxLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  let arrCountryLookup: LookupDTO[] = [];
  const dtoOrder: OrderDTO = { ...ORDER };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: QUOTE_LOOKUP,
      variables: { full: false }
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
      query: GET_USER_MY_PROFILE
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
    if (results[0]?.data?.geQuoteLookup) {
      arrQuoteLookup = results[0].data.geQuoteLookup;
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
    if (results[5]?.data?.getUserMyProfile) {
      dtoUser = results[5].data.getUserMyProfile;
      dtoOrder.sales_person_id = dtoUser.id;
      dtoOrder.sales_person_name = dtoUser.user_name;
      console.log('hello9', JSON.stringify(dtoOrder));
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
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddOrder
      dtoOrder={dtoOrder}
      arrQuoteLookup={arrQuoteLookup}
      arrAccountLookup={arrAccountLookup}
      arrUserLookup={arrUserLookup}
      arrIncotermLookup={arrIncotermLookup}
      arrTermLookup={arrTermLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrTaxLookup={arrTaxLookup}
      arrCountryLookup={arrCountryLookup}
    ></ClientAddOrder>
  );
}
