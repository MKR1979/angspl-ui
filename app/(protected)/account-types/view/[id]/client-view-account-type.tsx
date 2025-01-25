'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAccountType from './useViewAccountType';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import AccountTypeDTO from '@/app/types/AccountTypeDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoAccountType: AccountTypeDTO;
};

const ClientViewAccountType = ({ dtoAccountType }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewAccountType({ dtoAccountType });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Account Type Name:</MyTypography>
              <MyTypography>{state.dtoAccountType.account_type_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAccountType.created_by_user_name}
          createdAt={state.dtoAccountType.created_at}
          modifiedBy={state.dtoAccountType.modified_by_user_name}
          modifiedAt={state.dtoAccountType.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAccountType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
