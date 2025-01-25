'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCase from './useViewCase';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import CaseDTO from '@/app/types/CaseDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoCase: CaseDTO;
};

const ClientViewCase = ({ dtoCase }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCase({ dtoCase });
  console.log('Hellooooo', state.dtoCase);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Case Number:</MyTypography>
              <MyTypography>{state.dtoCase.case_number}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Case Description:</MyTypography>
              <MyTypography>{state.dtoCase.case_description}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Account Name:</MyTypography>
              <MyTypography>{state.dtoCase.account_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Priority:</MyTypography>
              <MyTypography>{state.dtoCase.priority}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">State:</MyTypography>
              <MyTypography>{state.dtoCase.state}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Status:</MyTypography>
              <MyTypography>{state.dtoCase.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Subject:</MyTypography>
              <MyTypography>{state.dtoCase.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Resolutions:</MyTypography>
              <MyTypography>{state.dtoCase.resolution}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Case Type:</MyTypography>
              <MyTypography>{state.dtoCase.case_type_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoCase.assigned_to_user_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCase.created_by_user_name}
          createdAt={state.dtoCase.created_at}
          modifiedBy={state.dtoCase.modified_by_user_name}
          modifiedAt={state.dtoCase.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCase, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
