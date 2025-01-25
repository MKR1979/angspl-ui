'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import ProvisionalInvoiceEntry from '../provisional-invoice-entry';
import useAddProvisionalInvoice from './useAddProvisionalInvoice';
import ProvisionalInvoiceDTO from '@/app/types/ProvisionalInvoiceDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoProvisionalInvoice: ProvisionalInvoiceDTO;
  arrOrderLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};
const ClientAddProvisionalInvoice = ({
  dtoProvisionalInvoice,
  arrOrderLookup,
  arrAccountLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const { state } = useAddProvisionalInvoice();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <ProvisionalInvoiceEntry
        dtoProvisionalInvoice={dtoProvisionalInvoice}
        arrOrderLookup={arrOrderLookup}
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

export default memo(ClientAddProvisionalInvoice, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
