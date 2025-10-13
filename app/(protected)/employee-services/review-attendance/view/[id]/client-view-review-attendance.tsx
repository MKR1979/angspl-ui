'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAttendance from './useViewReviewAttendance';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoAttendance: AttendanceDTO;
};

const ClientViewAttendance = ({ dtoAttendance }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAttendance({ dtoAttendance });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Date & Time:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoAttendance.attendance_time
                    ? dayjs.utc(state.dtoAttendance.attendance_time).format('DD-MM-YYYY hh:mm A')
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAttendance.name}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Entry Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAttendance.entry_type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Remark:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAttendance.remarks}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Is Verified:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoAttendance.is_verified ? 'Verified' : 'Not Verified'}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAttendance.created_by_user_name}
          createdAt={state.dtoAttendance.created_at}
          modifiedBy={state.dtoAttendance.modified_by_user_name}
          modifiedAt={state.dtoAttendance.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 133) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAttendance, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
