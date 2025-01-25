'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import OrderEntry from '../order-entry';
import useAddOrder from './useAddOrder';
import OrderDTO from '@/app/types/OrderDTO';
import LookupDTO from '@/app/types/LookupDTO';
type Props = {
  dtoOrder: OrderDTO;
  arrQuoteLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};
const ClientAddOrder = ({
  dtoOrder,
  arrQuoteLookup,
  arrAccountLookup,
  arrUserLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const { state } = useAddOrder();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <OrderEntry
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
    </>
  );
};

export default memo(ClientAddOrder, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
