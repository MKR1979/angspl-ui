import { Metadata } from 'next';
import ClientAddInvoice from './client-add-invoice';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import InvoiceDTO, { INVOICE } from '@/app/types/InvoiceDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Add Invoice'
};

export const revalidate = 0;

export default async function AddInvoicePage() {
  let arrAccountLookup: LookupDTO[] = [];
  let arrIncotermLookup: LookupDTO[] = [];
  let arrTermLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrTaxLookup: LookupDTO[] = [];
  let arrCountryLookup: LookupDTO[] = [];
  const dtoInvoice: InvoiceDTO = { ...INVOICE };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result1 = apolloClient.query({
      query: INCOTERM_LOOKUP
    });
    const result2 = apolloClient.query({
      query: TERM_LOOKUP
    });
    const result3 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result4 = apolloClient.query({
      query: TAX_LOOKUP
    });
    const result5 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5]);

    if (results[0]?.data?.getAccountLookup) {
      arrAccountLookup = results[0].data.getAccountLookup;
    }
    if (results[1]?.data?.getIncotermLookup) {
      arrIncotermLookup = results[1].data.getIncotermLookup;
    }
    if (results[2]?.data?.getTermLookup) {
      arrTermLookup = results[2].data.getTermLookup;
    }
    if (results[3]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[3].data.getCurrencyLookup;
    }
    if (results[4]?.data?.getTaxLookup) {
      arrTaxLookup = results[4].data.getTaxLookup;
    }
    if (results[5]?.data?.getCountryLookup) {
      arrCountryLookup = results[5].data.getCountryLookup;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return (
    <ClientAddInvoice
      dtoInvoice={dtoInvoice}
      arrAccountLookup={arrAccountLookup}
      arrIncotermLookup={arrIncotermLookup}
      arrTermLookup={arrTermLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrTaxLookup={arrTaxLookup}
      arrCountryLookup={arrCountryLookup}
    ></ClientAddInvoice>
  );
}
