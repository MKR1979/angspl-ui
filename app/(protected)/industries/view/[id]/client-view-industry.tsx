'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewIndustry from './useViewIndustry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import IndustryDTO from '@/app/types/IndustryDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoIndustry: IndustryDTO;
};

const ClientViewIndustry = ({ dtoIndustry }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewIndustry({ dtoIndustry });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Industry Name:</MyTypography>
              <MyTypography>{state.dtoIndustry.industry_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoIndustry.created_by_user_name}
          createdAt={state.dtoIndustry.created_at}
          modifiedBy={state.dtoIndustry.modified_by_user_name}
          modifiedAt={state.dtoIndustry.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewIndustry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
