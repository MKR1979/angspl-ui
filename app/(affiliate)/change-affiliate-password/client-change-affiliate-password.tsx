'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useChangePassword from './useChangeAffiliatePassword';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyButton from '@/app/custom-components/MyButton';
import MyTypography from '@/app/custom-components/MyTypography';
import * as gConstants from '../../constants/constants';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ClientChangePassword = () => {
  const { state,
    onInputChange,
    onOldPasswordBlur,
    onPasswordBlur,
    onConfirmPasswordBlur,
    showPassword,
    setShowPassword,
    showPassword1,
    setShowPassword1,
     showPassword2,
    setShowPassword2,
    onSaveClick,
    onCancelClick,
    saving
  } =
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
                   type={showPassword2 ? 'text' : 'password'}
                label="Old Password"
                name="old_password"
                value={state.old_password}
                inputProps={{
                  minLength: gConstants.PASSWORD_MIN_LENGTH,
                  maxLength: gConstants.PASSWORD_LENGTH
                }}
                 InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword2(!showPassword2)} edge="end">
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    {/* sx={{ fontSize: 18 }} */}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
                 type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={state.password}
                inputProps={{
                  minLength: gConstants.PASSWORD_MIN_LENGTH,
                  maxLength: gConstants.PASSWORD_MAX_LENGTH
                }}
                 InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    {/* sx={{ fontSize: 18 }} */}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
                   type={showPassword1 ? 'text' : 'password'}
                label="Confirm Password"
                name="confirm_password"
                value={state.confirm_password}
                inputProps={{
                  minLength: gConstants.PASSWORD_MIN_LENGTH,
                  maxLength: gConstants.PASSWORD_MAX_LENGTH
                }}
               InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword1(!showPassword1)} edge="end">
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    {/* sx={{ fontSize: 18 }} */}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
          {/* <MyButton onClick={onSaveClick}>Save</MyButton> */}
          <MyButton onClick={onSaveClick} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
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
