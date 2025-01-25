'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewTerm from './useViewTerm';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import TermDTO from '@/app/types/TermDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoTerm: TermDTO;
};

const ClientViewTerm = ({ dtoTerm }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewTerm({ dtoTerm });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Term Code:</MyTypography>
              <MyTypography>{state.dtoTerm.term_code}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Term Description:</MyTypography>
              <MyTypography>{state.dtoTerm.term_description}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoTerm.created_by_user_name}
          createdAt={state.dtoTerm.created_at}
          modifiedBy={state.dtoTerm.modified_by_user_name}
          modifiedAt={state.dtoTerm.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewTerm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
