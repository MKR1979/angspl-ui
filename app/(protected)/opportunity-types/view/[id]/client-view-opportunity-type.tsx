'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewOpportunityType from './useViewOpportunityType';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import OpportunityTypeDTO from '@/app/types/OpportunityTypeDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoOpportunityType: OpportunityTypeDTO;
};

const ClientViewOpportunityType = ({ dtoOpportunityType }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewOpportunityType({ dtoOpportunityType });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Opportunity Type Name:</MyTypography>
              <MyTypography>{state.dtoOpportunityType.opportunity_type_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoOpportunityType.created_by_user_name}
          createdAt={state.dtoOpportunityType.created_at}
          modifiedBy={state.dtoOpportunityType.modified_by_user_name}
          modifiedAt={state.dtoOpportunityType.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewOpportunityType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
