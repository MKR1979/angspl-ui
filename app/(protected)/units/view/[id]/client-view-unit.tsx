'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewUnit from './useViewUnit';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import UnitDTO from '@/app/types/UnitDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoUnit: UnitDTO;
};

const ClientViewUnit = ({ dtoUnit }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewUnit({ dtoUnit });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Unit Name:</MyTypography>
              <MyTypography>{state.dtoUnit.unit_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Unit Code:</MyTypography>
              <MyTypography>{state.dtoUnit.unit_code}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoUnit.created_by_user_name}
          createdAt={state.dtoUnit.created_at}
          modifiedBy={state.dtoUnit.modified_by_user_name}
          modifiedAt={state.dtoUnit.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUnit, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
