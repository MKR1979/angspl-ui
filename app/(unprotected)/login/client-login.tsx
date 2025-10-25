'use client';
import React, { memo, useEffect, useState } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const ClientLogin = () => {
  const {
    state,
    companyInfo,
    showPassword,
    setShowPassword,
    onInputChange,
    onUserNameBlur,
    onNormalizedInputChange,
    onPasswordBlur,
    onLoginClick,
    matchDownSM,
    loading
  } = useLogin();

  // Hydration safe mount check
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !loading) {
      onLoginClick(event);
    }
  };

  const formatUrl = (url: string) =>
    url && (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <MyCard className="mycard">
      <MyBox>
        <MyGrid container sx={{ marginTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <MyGrid sx={{ width: 350, m: { xs: 1, sm: 0 }, mb: 0 }}>
            <MyGrid container spacing={2} alignItems="center" justifyContent="center">
              <MyGrid>
                <MyLogo
                  src={companyInfo?.logo_url || '/default-logo.png'}
                  height={companyInfo?.logo_height || 60}
                  width={companyInfo?.logo_width || 120}
                />
              </MyGrid>

              <MyGrid size={{ xs: 12 }}>
                <MyGrid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <MyGrid>
                    <MyStack alignItems="center" justifyContent="center" spacing={1}>
                      <MyTypography
                        sx={{ width: '100%', display: 'flex', textAlign: 'center' }}
                        component="h1"
                        variant="h6"
                        gutterBottom
                      >
                        Welcome {companyInfo?.company_name || 'User'}!
                      </MyTypography>
                    </MyStack>
                  </MyGrid>
                </MyGrid>
              </MyGrid>

              <MyGrid size={{ xs: 12 }}>
                <MyGrid container spacing={2} sx={{ p: '20px' }}>
                  <MyGrid size={{ xs: 12 }}>
                    <MyTextField
                      label="Username"
                      name="user_name"
                      autoComplete="new-password"
                      value={state.dtoUser.user_name || ''}
                      onChange={onNormalizedInputChange}
                      onBlur={onUserNameBlur}
                      error={!!state.errorMessages.user_name}
                    />
                    <MyTypography className="error" sx={{ textAlign: 'left' }}>
                      {state.errorMessages.user_name}
                    </MyTypography>
                  </MyGrid>

                  <MyGrid size={{ xs: 12 }}>
                    <MyTextField
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={state.dtoUser.password || ''}
                      onChange={onInputChange}
                      onBlur={onPasswordBlur}
                      onKeyDown={handleKeyDown}
                      error={!!state.errorMessages.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <MyTypography className="error" sx={{ textAlign: 'left' }}>
                      {state.errorMessages.password}
                    </MyTypography>
                  </MyGrid>

                  <MyGrid size={{ xs: 12 }}>
                    <MyTypography className="already-msg2" sx={{ fontSize: '0.70rem', textAlign: 'right' }}>
                      <a href="/forgot-password">Forgot Password</a>
                    </MyTypography>
                  </MyGrid>

                  <MyButton
                    onClick={onLoginClick}
                    fullWidth
                    disableRipple
                    sx={{ pointerEvents: loading ? 'none' : 'auto' }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign in'}
                  </MyButton>

                  <MyGrid size={{ xs: 12 }}>
                    {companyInfo?.company_id === gConstants.DPS_COMPANY_ID ? (
                      <>
                        <MyTypography className="already-msg2" sx={{ fontSize: '0.75rem', textAlign: 'right' }}>
                          Need help?{' '}
                          <a href="/help/user-manual.pdf" target="_blank" rel="noopener noreferrer">
                            Read User Manual
                          </a>
                        </MyTypography>
                        <MyTypography className="already-msg2" sx={{ fontSize: '0.75rem' }}>
                          By continuing, you accept <a href="/terms-attendance">Terms of use</a> and{' '}
                          <a href="/privacy-attendance">Privacy Policy</a>
                        </MyTypography>
                        <br />
                        <MyTypography className="already-msg" sx={{ fontSize: '0.75rem' }}>
                          powered by <a href={formatUrl(gConstants.SITE_URL_ANGSPL)}>Adhyayan NextGen Solutions Pvt Ltd</a>
                        </MyTypography>
                      </>
                    ) : (
                      <>
                        <MyTypography className="already-msg">
                          Do not have an account? <a href="/sign-up">Sign Up</a>
                        </MyTypography>
                        <MyTypography className="already-msg2">
                          By proceeding, you agree to the <a href="/terms">Terms of use</a> and{' '}
                          <a href="/privacy-policy">Privacy Policy </a>
                        </MyTypography>
                        <MyTypography
                          className="already-msg2"
                          component="div"
                          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 6 }}
                        >
                          <Link href="/" passHref>
                            Back to Home
                          </Link>
                        </MyTypography>
                      </>
                    )}
                  </MyGrid>
                </MyGrid>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientLogin, (prevProps, nextProps) => eq(prevProps, nextProps));
