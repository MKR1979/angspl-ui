'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EventEntry from '../../event-entry';
import useEditEvent from './useEditEvent';
import EventDTO from '@/app/types/EventDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoEvent: EventDTO;
  arrCurrencyLookup: LookupDTO[];
  arrLocationLookup: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const ClientEditEvent = ({ dtoEvent, arrCurrencyLookup, arrLocationLookup, arrEmailTemplateLookup, arrAssignedToLookup }: Props) => {
  const { state } = useEditEvent();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EventEntry
        dtoEvent={dtoEvent}
        arrCurrencyLookup={arrCurrencyLookup}
        arrLocationLookup={arrLocationLookup}
        arrEmailTemplateLookup={arrEmailTemplateLookup}
        arrAssignedToLookup={arrAssignedToLookup}
      />
    </>
  );
};

export default memo(ClientEditEvent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
