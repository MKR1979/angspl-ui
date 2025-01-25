'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewTask from './useViewTask';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import TaskDTO from '@/app/types/TaskDTO';
import { getLocalTime, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';

type Props = {
  dtoTask: TaskDTO;
};

const ClientViewTask = ({ dtoTask }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewTask({ dtoTask });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Subject:</MyTypography>
              <MyTypography>{state.dtoTask.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Status:</MyTypography>
              <MyTypography>{state.dtoTask.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Start Date:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoTask.start_date)).format('MM/DD/YYYY')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Due Date:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoTask.due_date)).format('MM/DD/YYYY')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related To:</MyTypography>
              <MyTypography>{state.dtoTask.parent_type}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related To Option:</MyTypography>
              <MyTypography>{state.dtoTask.parent_type_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Contact Name:</MyTypography>
              <MyTypography>{state.dtoTask.contact_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Priority:</MyTypography>
              <MyTypography>{state.dtoTask.priority}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Description:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoTask.description)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoTask.assigned_to_user_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoTask.created_by_user_name}
          createdAt={state.dtoTask.created_at}
          modifiedBy={state.dtoTask.modified_by_user_name}
          modifiedAt={state.dtoTask.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewTask, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
