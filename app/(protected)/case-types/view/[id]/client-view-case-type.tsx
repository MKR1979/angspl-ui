'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCaseType from './useViewCaseType';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import CaseTypeDTO from '@/app/types/CaseTypeDTO';

type Props = {
  dtoCaseType: CaseTypeDTO;
};

const ClientViewCaseType = ({ dtoCaseType }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCaseType({ dtoCaseType });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Case Type Name:</MyTypography>
              <MyTypography>{state.dtoCaseType.case_type_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider></MyDivider>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCaseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
