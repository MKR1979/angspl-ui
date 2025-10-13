'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewFeeCollection from './useViewFeeCollection';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSelector } from '@/app/store';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoFeeCollection: FeeCollectionDTO;
};

const ClientViewFeeCollection = ({ dtoFeeCollection }: Props) => {
  const { state, onCancelClick } = useViewFeeCollection({ dtoFeeCollection });
  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Student Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.student_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Payment Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoFeeCollection?.payment_date &&
                  dayjs(state.dtoFeeCollection.payment_date).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoFeeCollection.payment_date).tz(customerTimezone).format('DD/MM/YYYY') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Payment Mode :</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.payment_mode}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoFeeCollection.payment_mode?.toLowerCase() === 'cheque' && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Cheque No.:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoFeeCollection.cheque_number}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Fee Head:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.fee_head}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Fee Amount:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.fee_amount}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Remarks:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.remarks}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeCollection.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoFeeCollection.created_by_user_name}
          createdAt={state.dtoFeeCollection.created_at}
          modifiedBy={state.dtoFeeCollection.modified_by_user_name}
          modifiedAt={state.dtoFeeCollection.modified_at}
        />
        <MyCardActions>
          <MyButton onClick={onCancelClick} startIcon={<CancelIcon/>}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewFeeCollection, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
