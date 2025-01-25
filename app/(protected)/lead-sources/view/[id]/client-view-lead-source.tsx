'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewLeadSource from './useViewLeadSource';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import LeadSourceDTO from '@/app/types/LeadSourceDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoLeadSource: LeadSourceDTO;
};

const ClientViewLeadSource = ({ dtoLeadSource }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewLeadSource({ dtoLeadSource });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Lead Source Name:</MyTypography>
              <MyTypography>{state.dtoLeadSource.lead_source_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoLeadSource.created_by_user_name}
          createdAt={state.dtoLeadSource.created_at}
          modifiedBy={state.dtoLeadSource.modified_by_user_name}
          modifiedAt={state.dtoLeadSource.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewLeadSource, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
