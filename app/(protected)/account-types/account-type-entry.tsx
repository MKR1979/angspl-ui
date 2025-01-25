'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useAccountTypeEntry from './useAccountTypeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import AccountTypeDTO from '@/app/types/AccountTypeDTO';

type AccountTypeEntryProps = {
  dtoAccountType: AccountTypeDTO;
};

const AccountTypeEntry = (props: AccountTypeEntryProps) => {
  const { state, onInputChange, onAccountTypeNameBlur, onSaveClick, onCancelClick } = useAccountTypeEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Account Type Name"
              name="account_type_name"
              value={state.dtoAccountType.account_type_name}
              onChange={onInputChange}
              onBlur={onAccountTypeNameBlur}
              error={state.errorMessages.account_type_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.account_type_name}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(AccountTypeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
