import { Metadata } from 'next';
import ClientEditInvoice from './client-edit-invoice';
import { GET_INVOICE } from '@/app/graphql/Invoice';
import { createServerApolloClient } from '@/app/common/utility';
import InvoiceDTO, { INVOICE } from '@/app/types/InvoiceDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { ACCOUNT_LOOKUP } from '@/app/graphql/Account';
import { INCOTERM_LOOKUP } from '@/app/graphql/Incoterm';
import { TERM_LOOKUP } from '@/app/graphql/Term';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { TAX_LOOKUP } from '@/app/graphql/Tax';

export const metadata: Metadata = {
  title: 'Edit Invoice'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;
  let dtoInvoice: InvoiceDTO = INVOICE;
  let arrAccountLookup: LookupDTO[] = [];
  let arrIncotermLookup: LookupDTO[] = [];
  let arrTermLookup: LookupDTO[] = [];
  let arrCurrencyLookup: LookupDTO[] = [];
  let arrTaxLookup: LookupDTO[] = [];
  let arrCountryLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_INVOICE,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: ACCOUNT_LOOKUP
    });
    const result2 = apolloClient.query({
      query: INCOTERM_LOOKUP
    });
    const result3 = apolloClient.query({
      query: TERM_LOOKUP
    });
    const result4 = apolloClient.query({
      query: CURRENCY_LOOKUP
    });
    const result5 = apolloClient.query({
      query: TAX_LOOKUP
    });
    const result6 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const results = await Promise.all([result, result1, result2, result3, result4, result5, result6]);
    if (results[0]?.data?.getInvoice) {
      dtoInvoice = results[0].data.getInvoice;
    }
    if (results[1]?.data?.getAccountLookup) {
      arrAccountLookup = results[1].data.getAccountLookup;
    }
    if (results[2]?.data?.getIncotermLookup) {
      arrIncotermLookup = results[2].data.getIncotermLookup;
    }
    if (results[3]?.data?.getTermLookup) {
      arrTermLookup = results[3].data.getTermLookup;
    }
    if (results[4]?.data?.getCurrencyLookup) {
      arrCurrencyLookup = results[4].data.getCurrencyLookup;
    }
    if (results[5]?.data?.getTaxLookup) {
      arrTaxLookup = results[5].data.getTaxLookup;
    }
    if (results[6]?.data?.getCountryLookup) {
      arrCountryLookup = results[6].data.getCountryLookup;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return (
    <ClientEditInvoice
      dtoInvoice={dtoInvoice}
      arrAccountLookup={arrAccountLookup}
      arrIncotermLookup={arrIncotermLookup}
      arrTermLookup={arrTermLookup}
      arrCurrencyLookup={arrCurrencyLookup}
      arrTaxLookup={arrTaxLookup}
      arrCountryLookup={arrCountryLookup}
    />
  );
}
