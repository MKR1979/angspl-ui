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
import timezone from 'dayjs/plugin/timezone';
import { Box } from '@mui/material';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoReferral: ReferralDTO;
};

const ClientViewAffiliateReferral = ({ dtoReferral }: Props) => {
  const { state, onCancelClick } = useViewReferral({ dtoReferral });
  const stepDates = state.stepDates || {};
  const steps = ['Created', 'Accepted', 'In-transit', 'Completed'];
  const currentStatus = state.dtoReferral.status ?? '';

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
                <MyTypography variant="subtitle1">Mobile No:</MyTypography>
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

        {/* Referral Tracking Progress */}
        <MyTypography variant="subtitle1" sx={{ mb: 2, mt: 2, ml: 2, fontSize: 18, fontWeight: 'bold' }}>
          Referral Tracking Progress:
        </MyTypography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, position: 'relative' }}>
          {steps.map((step, index) => {
            const currentIndex = steps.indexOf(currentStatus);
            const isCompleted = index <= currentIndex;
            return (
              <Box key={index} sx={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                {/* Line to next step */}
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '16px',
                      left: '50%',
                      width: '100%',
                      height: 6,
                      backgroundColor: index < currentIndex ? '#1976d2' : '#e0e0e0',
                      zIndex: 1
                    }}
                  />
                )}
                {/* Step Circle */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#1976d2' : '#fff',
                    border: `3px solid ${isCompleted ? '#1976d2' : '#BDBDBD'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    zIndex: 2,
                    position: 'relative'
                  }}
                >
                  {isCompleted ? (
                    <Box
                      component="span"
                      sx={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        lineHeight: 1
                      }}
                    >
                      ✓
                    </Box>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: '#BDBDBD'
                      }}
                    />
                  )}
                </Box>
                {/* Label */}
                <Box sx={{ mt: 1 }}>
                  {/* Step Label */}
                  <Box>
                    <MyTypography variant="caption" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {step}
                    </MyTypography>
                  </Box>
                  {/* Date/Time on a new line */}
                  <Box>
                    {isCompleted && stepDates[step] ? (
                      <MyTypography variant="caption" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {dayjs.utc(stepDates[step]).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mm A')}
                      </MyTypography>
                    ) : (
                      <MyTypography variant="caption" sx={{ fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic', color: 'gray' }}>
                        Under Processing...
                      </MyTypography>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <MyCardActions>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAffiliateReferral, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
