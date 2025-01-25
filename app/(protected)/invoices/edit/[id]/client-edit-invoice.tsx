'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import InvoiceEntry from '../../invoice-entry';
import useEditInvoice from './useEditInvoice';
import InvoiceDTO from '@/app/types/InvoiceDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoInvoice: InvoiceDTO;
  arrAccountLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};

const ClientEditInvoice = ({
  dtoInvoice,
  arrAccountLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const { state } = useEditInvoice();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <InvoiceEntry
        dtoInvoice={dtoInvoice}
        arrAccountLookup={arrAccountLookup}
        arrIncotermLookup={arrIncotermLookup}
        arrTermLookup={arrTermLookup}
        arrCurrencyLookup={arrCurrencyLookup}
        arrTaxLookup={arrTaxLookup}
        arrCountryLookup={arrCountryLookup}
      />
    </>
  );
};

export default memo(ClientEditInvoice, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
