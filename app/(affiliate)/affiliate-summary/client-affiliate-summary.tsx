'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import useAffiliateSummary from './useAffiliateSummary';
import { Stack, Typography, Divider } from '@mui/material';
import { CurrencyRupee, People, Percent, PendingActions, CalendarToday } from '@mui/icons-material';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyGrid from '@/app/custom-components/MyGrid';
import AffiliateDTO from '@/app/types/AffiliateDTO';

type Props = {
  dtoAffiliate: AffiliateDTO;
};

const formatCurrency = (value: number | null | undefined) => (value != null ? `₹${value.toLocaleString('en-IN')}` : 'N/A');

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | null }) => (
  <Stack
    spacing={0.5}
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: '#fafafa',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      height: '100%'
    }}
  >
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
    <Typography variant="h6" fontWeight={600}>
      {value ?? 'N/A'}
    </Typography>
  </Stack>
);

const ClientViewSummary = ({ dtoAffiliate }: Props) => {
  const { state } = useAffiliateSummary({ dtoAffiliate });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems} />

      <MyCard sx={{ p: 1, backgroundColor: '#fff' }}>
        <MyCardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Your Referral Summary
          </Typography>

          {/* Key Metrics */}
          <MyGrid container spacing={3}>
            <MyGrid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                icon={<People fontSize="small" color="primary" />}
                label="Total Referrals"
                value={state.dtoAffiliate.total_referrals}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                icon={<CurrencyRupee fontSize="small" color="success" />}
                label="Total Earnings"
                value={formatCurrency(state.dtoAffiliate.total_earning)}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                icon={<Percent fontSize="small" color="warning" />}
                label="Conversion Rate"
                value={`${state.dtoAffiliate.conversion_rate ?? 0}%`}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                icon={<PendingActions fontSize="small" color="secondary" />}
                label="Pending Payout"
                value={formatCurrency(state.dtoAffiliate.pending_payout)}
              />
            </MyGrid>
          </MyGrid>

          {/* Divider */}
          <Divider sx={{ mt: 3 }} />

          {/* Payment Info */}
          <Typography variant="h5" sx={{ mb: 1, mt: 1, fontWeight: 'bold' }} gutterBottom>
            Payment Info
          </Typography>
          <MyGrid container spacing={4}>
            <MyGrid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                icon={<CalendarToday fontSize="small" color="secondary" />}
                label="Last Payment Date"
                value={state.dtoAffiliate.last_payment_date ? new Date(state.dtoAffiliate.last_payment_date).toLocaleDateString() : 'N/A'}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                icon={<CurrencyRupee fontSize="small" color="info" />}
                label="Last Payment Amount"
                value={formatCurrency(state.dtoAffiliate.last_payment_amount)}
              />
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                icon={<CurrencyRupee fontSize="small" color="info" />}
                label="Incentive Given"
                value={formatCurrency(state.dtoAffiliate.incentive_given)}
              />
            </MyGrid>
          </MyGrid>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientViewSummary, (prevProps, nextProps) => eq(prevProps, nextProps));
