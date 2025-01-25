'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewIncoterm from './useViewIncoterm';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import IncotermDTO from '@/app/types/IncotermDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoIncoterm: IncotermDTO;
};

const ClientViewIncoterm = ({ dtoIncoterm }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewIncoterm({ dtoIncoterm });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Incoterm Code:</MyTypography>
              <MyTypography>{state.dtoIncoterm.incoterm_code}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Incoterm Description:</MyTypography>
              <MyTypography>{state.dtoIncoterm.incoterm_description}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoIncoterm.created_by_user_name}
          createdAt={state.dtoIncoterm.created_at}
          modifiedBy={state.dtoIncoterm.modified_by_user_name}
          modifiedAt={state.dtoIncoterm.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewIncoterm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
