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

const ClientLogin = () => {
  const { state, onInputChange, onUserNameBlur, onPasswordBlur, onLoginClick, matchDownSM } = useLogin();
  return (
    <MyBox sx={{ minHeight: '100vh' }}>
      <MyGrid container sx={{ minHeight: 'calc(100vh - 68px)', justifyContent: 'center', alignItems: 'center' }}>
        <MyGrid sx={{ width: 350, m: { xs: 1, sm: 0 }, mb: 0 }}>
          <MyGrid container spacing={2} alignItems="center" justifyContent="center">
            <MyGrid sx={{ mb: 3 }}>
              <MyLogo />
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyGrid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                <MyGrid>
                  <MyStack alignItems="center" justifyContent="center" spacing={1}>
                    <MyTypography
                      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                      component="h1"
                      variant="h4"
                      gutterBottom
                    >
                      Sign in
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
                    onBlur={onPasswordBlur}
                    error={state.errorMessages.password ? true : false}
                  />
                  <MyTypography className="error" sx={{ textAlign: 'left' }}>
                    {state.errorMessages.password}
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
                  <MyButton onClick={onLoginClick} fullWidth>
                    Sign in
                  </MyButton>
                </MyGrid>
                {/* <MyGrid size={{ xs: 12 }}>
                  Don&#39;t have an account?
                  <MyLink href="/signup">Sign Up</MyLink>
                </MyGrid> */}
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyGrid>
    </MyBox>
  );
};

export default memo(ClientLogin, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
