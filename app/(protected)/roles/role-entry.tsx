'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useRoleEntry from './useRoleEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import RoleDTO from '@/app/types/RoleDTO';

type RoleEntryProps = {
  dtoRole: RoleDTO;
};

const RoleEntry = (props: RoleEntryProps) => {
  const { state, onInputChange, onRoleNameBlur, onSaveClick, onCancelClick } = useRoleEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Role Name"
              name="role_name"
              value={state.dtoRole.role_name}
              onChange={onInputChange}
              onBlur={onRoleNameBlur}
              error={state.errorMessages.role_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.role_name}</MyTypography>
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

export default memo(RoleEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
