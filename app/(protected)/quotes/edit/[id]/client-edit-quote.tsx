'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuoteEntry from '../../quote-entry';
import useEditQuote from './useEditQuote';
import QuoteDTO from '@/app/types/QuoteDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoQuote: QuoteDTO;
  arrAccountLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};

const ClientEditQuote = ({
  dtoQuote,
  arrAccountLookup,
  arrUserLookup,
  arrIncotermLookup,
  arrTermLookup,
  arrCurrencyLookup,
  arrTaxLookup,
  arrCountryLookup
}: Props) => {
  const { state } = useEditQuote();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuoteEntry
        dtoQuote={dtoQuote}
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

export default memo(ClientEditQuote, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
