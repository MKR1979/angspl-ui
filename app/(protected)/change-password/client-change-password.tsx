'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useChangePassword from './useChangePassword';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyButton from '@/app/custom-components/MyButton';
import MyTypography from '@/app/custom-components/MyTypography';

const ClientChangePassword = () => {
  const { state, onInputChange, onOldPasswordBlur, onPasswordBlur, onConfirmPasswordBlur, onSaveClick, onCancelClick } =
    useChangePassword();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                autoComplete="new-password"
                type="password"
                label="Old Password"
                name="old_password"
                value={state.old_password}
                onChange={onInputChange}
                onBlur={onOldPasswordBlur}
                error={state.errorMessages.old_password ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.old_password}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                autoComplete="new-password"
                type="password"
                label="Password"
                name="password"
                value={state.password}
                onChange={onInputChange}
                onBlur={onPasswordBlur}
                error={state.errorMessages.password ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.password}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                autoComplete="new-password"
                type="password"
                label="Confirm Password"
                name="confirm_password"
                value={state.confirm_password}
                onChange={onInputChange}
                onBlur={onConfirmPasswordBlur}
                error={state.errorMessages.confirm_password ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.confirm_password}</MyTypography>
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
    </>
  );
};

export default memo(ClientChangePassword, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
