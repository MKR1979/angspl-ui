'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewReferral from './useViewReferral';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import ReferralDTO from '@/app/types/ReferralDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoReferral: ReferralDTO;
};

const ClientViewReferral = ({ dtoReferral }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewReferral({ dtoReferral });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Referral Date:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoReferral.referral_date ? dayjs.utc(state.dtoReferral.referral_date).format('DD-MM-YYYY hh:mm A') : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Referral Company Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.referral_company_name}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Contact Person:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.contact_person}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.mobile_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Address:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Product Interest:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.product_interest}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.status}</MyTypography>
              </MyBox>
            </MyGrid>
            {state.dtoReferral.status === 'Completed' && (
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography variant="subtitle1">Received Amount:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoReferral.received_amount}</MyTypography>
                </MyBox>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Referred By:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.referred_by_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Requirements:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoReferral.requirement}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoReferral.created_by_user_name}
          createdAt={state.dtoReferral.created_at}
          modifiedBy={state.dtoReferral.modified_by_user_name}
          modifiedAt={state.dtoReferral.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 207) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewReferral, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
