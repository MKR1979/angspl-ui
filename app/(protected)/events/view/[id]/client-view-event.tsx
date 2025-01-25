'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEvent from './useViewEvent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import EventDTO from '@/app/types/EventDTO';
import { getLocalTime, numberFormat, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';

type Props = {
  dtoEvent: EventDTO;
};

const ClientViewEvent = ({ dtoEvent }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewEvent({ dtoEvent });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Event Name:</MyTypography>
              <MyTypography>{state.dtoEvent.event_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Start Time:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoEvent.start_date_time)).format('MM/DD/YYYY hh:mm a')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">End Time:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoEvent.end_date_time)).format('MM/DD/YYYY hh:mm a')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Currency:</MyTypography>
              <MyTypography>{state.dtoEvent.currency_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Budget:</MyTypography>
              <MyTypography>{state.dtoEvent.currency_symbol + numberFormat(state.dtoEvent.budget, 2)}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">E-Mail Template:</MyTypography>
              <MyTypography>{state.dtoEvent.email_template_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoEvent.assigned_to_user_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Description:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoEvent.description)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoEvent.created_by_user_name}
          createdAt={state.dtoEvent.created_at}
          modifiedBy={state.dtoEvent.modified_by_user_name}
          modifiedAt={state.dtoEvent.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEvent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
