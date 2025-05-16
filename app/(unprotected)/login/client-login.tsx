'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyButton from '@/app/custom-components/MyButton';
import MyStack from '@/app/custom-components/MyStack';
import useLogin from './useLogin';
import MyBox from '@/app/custom-components/MyBox';
import MyLogo from '@/app/custom-components/MyLogo';
import './login.css';
import MyCard from '@/app/custom-components/MyCard';
import * as gConstants from '../../constants/constants';
const ClientLogin = () => {
  const { state, onInputChange, onUserNameBlur, onPasswordBlur, onLoginClick, matchDownSM } = useLogin();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      onLoginClick(event);
    }
  };
  return (
    <MyCard className='mycard'>
    <MyBox>
      <MyGrid container sx={{ marginTop:'10px', justifyContent: 'center', alignItems: 'center' }}>
        <MyGrid sx={{ width: 350, m: { xs: 1, sm: 0 }, mb: 0 }}>
          <MyGrid container spacing={2} alignItems="center" justifyContent="center">
            <MyGrid>
              <MyLogo />
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyGrid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                <MyGrid>
                  <MyStack alignItems="center" justifyContent="center" spacing={1}>
                    <MyTypography
                      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                      component="h1"
                      variant="h6"
                      gutterBottom
                    >
                      Welcome !
                    </MyTypography>
                  </MyStack>
                </MyGrid>
              </MyGrid>
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyGrid container spacing={2} sx={{ p: '20px' }}>
                <MyGrid size={{ xs: 12 }}>
                  <MyTextField
                    autoFocus
                    label="Username"
                    name="user_name"
                    autoComplete="new-password"
                    value={state.dtoUser.user_name}
                    onChange={onInputChange}
                    inputProps={{
                      maxLength: gConstants.USER_NAME_LENGTH, // Restricts input to two characters
                      pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
                    }}
                    onBlur={onUserNameBlur}
                    error={state.errorMessages.user_name ? true : false}
                  />
                  <MyTypography className="error" sx={{ textAlign: 'left' }}>
                    {state.errorMessages.user_name}
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTextField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={state.dtoUser.password}
                    onChange={onInputChange}
                    inputProps={{
                      maxLength: gConstants.PASSWORD_MAX_LENGTH, // Restricts input to two characters
                      pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
                    }}
                    onBlur={onPasswordBlur}
                    onKeyDown={handleKeyDown}
                    error={state.errorMessages.password ? true : false}
                  />
                  <MyTypography className="error" sx={{ textAlign: 'left' }}>
                    {state.errorMessages.password}
                  </MyTypography>
                </MyGrid>
               <p className='already-msg2'><a href="/forgot-password">Forgot Password</a></p>
                <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
                  <MyButton onClick={onLoginClick} fullWidth>
                    Sign in
                  </MyButton>
                </MyGrid>
                <p className='already-msg'> Do not have an account? <a href="/sign-up">Sign Up</a></p>
               <p className='already-msg2'>By proceeding, you agree to the <a href="/terms">Terms of use</a> and  <a href="/privacy-policy">Privacy Policy</a>
               </p>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyGrid>
    </MyBox>
    </MyCard>
  );
};

export default memo(ClientLogin, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
