'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewMeeting from './useViewMeeting';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MeetingDTO from '@/app/types/MeetingDTO';
import { getLocalTime, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';

type Props = {
  dtoMeeting: MeetingDTO;
};

const ClientViewMeeting = ({ dtoMeeting }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewMeeting({ dtoMeeting });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Subject:</MyTypography>
              <MyTypography>{state.dtoMeeting.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Start Date:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoMeeting.start_date_time)).format('MM/DD/YYYY hh:mm a')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">End Date:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoMeeting.end_date_time)).format('MM/DD/YYYY hh:mm a')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Location:</MyTypography>
              <MyTypography>{state.dtoMeeting.location_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Reminder:</MyTypography>
              <MyTypography>{state.dtoMeeting.reminder}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related To Option:</MyTypography>
              <MyTypography>{state.dtoMeeting.parent_type_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoMeeting.assigned_to_user_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Status:</MyTypography>
              <MyTypography>{state.dtoMeeting.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Description:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoMeeting.description)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoMeeting.created_by_user_name}
          createdAt={state.dtoMeeting.created_at}
          modifiedBy={state.dtoMeeting.modified_by_user_name}
          modifiedAt={state.dtoMeeting.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewMeeting, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
