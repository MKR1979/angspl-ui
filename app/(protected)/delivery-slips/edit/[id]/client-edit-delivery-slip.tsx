'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import DeliverySlipEntry from '../../delivery-slip-entry';
import useEditDeliverySlip from './useEditDeliverySlip';
import DeliverySlipDTO from '@/app/types/DeliverySlipDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoDeliverySlip: DeliverySlipDTO;
  arrAccountLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};

const ClientEditDeliverySlip = ({
  dtoDeliverySlip,
  arrAccountLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const { state } = useEditDeliverySlip();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <DeliverySlipEntry
        dtoDeliverySlip={dtoDeliverySlip}
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

export default memo(ClientEditDeliverySlip, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
