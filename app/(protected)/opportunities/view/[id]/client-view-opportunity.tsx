'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewOpportunity from './useViewOpportunity';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import OpportunityDTO from '@/app/types/OpportunityDTO';
import { getLocalTime, numberFormat, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';

type Props = {
  dtoOpportunity: OpportunityDTO;
};

const ClientViewOpportunity = ({ dtoOpportunity }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewOpportunity({ dtoOpportunity });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Opportunity Name:</MyTypography>
              <MyTypography>{state.dtoOpportunity.opportunity_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Account Name:</MyTypography>
              <MyTypography>{state.dtoOpportunity.account_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Currency:</MyTypography>
              <MyTypography>{state.dtoOpportunity.currency_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Amount:</MyTypography>
              <MyTypography>{numberFormat(state.dtoOpportunity.amount, 2)}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Expected Close Date:</MyTypography>
              <MyTypography>{dayjs(getLocalTime(state.dtoOpportunity.expected_close_date)).format('MM/DD/YYYY')}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Stage:</MyTypography>
              <MyTypography>{state.dtoOpportunity.stage_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Opportunity Type:</MyTypography>
              <MyTypography>{state.dtoOpportunity.opportunity_type_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Probability(%):</MyTypography>
              <MyTypography>{state.dtoOpportunity.probability}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Lead Source:</MyTypography>
              <MyTypography>{state.dtoOpportunity.lead_source_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Next Step:</MyTypography>
              <MyTypography>{state.dtoOpportunity.next_step}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Description:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoOpportunity.description)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoOpportunity.assigned_to_user_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoOpportunity.created_by_user_name}
          createdAt={state.dtoOpportunity.created_at}
          modifiedBy={state.dtoOpportunity.modified_by_user_name}
          modifiedAt={state.dtoOpportunity.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewOpportunity, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
