'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyButton from '@/app/custom-components/MyButton';
import MyStack from '@/app/custom-components/MyStack';
import useSignUp from './useSignUpEntry';
import MyBox from '@/app/custom-components/MyBox';
import './sign-up.css';
import MyCard from '@/app/custom-components/MyCard';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import * as gConstants from '../../constants/constants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const ClientSignUp = () => {
  const {
    state,
    onInputChange,
    onPlainInputChange,
    onMobileNoChange,
    onMobileNoBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    onEMailIdBlur,
    onFirstNameBlur,
    onLastNameBlur,
    saving,
    onNormalizedInputChange,
    onSaveClick,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft
  } = useSignUp();

  const formatTime = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return '--:--';
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <MyCard className="mycard">
      <MyBox>
        <MyGrid size={{ xs: 12 }}>
          <MyStack alignItems="center" justifyContent="center" spacing={1}>
            <MyTypography sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} component="h1" variant="h6" gutterBottom>
              Create Account
            </MyTypography>
          </MyStack>
        </MyGrid>

        <MyGrid size={{ xs: 12 }}>
          <MyGrid container spacing={2} sx={{ p: '20px' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="First Name"
                name="first_name"
                value={state.dtoSignUp.first_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.FIRST_NAME_LENGTH
                }}
                onBlur={onFirstNameBlur}
                error={!!state.errorMessages.first_name}
              />
              <MyTypography className="error">{state.errorMessages.first_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Last Name"
                name="last_name"
                value={state.dtoSignUp.last_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.LAST_NAME_LENGTH
                }}
                onBlur={onLastNameBlur}
                error={!!state.errorMessages.last_name}
              />
              <MyTypography className="error">{state.errorMessages.last_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="Email"
                name="email"
                autoComplete="new-password"
                value={state.dtoSignUp.email}
                onChange={onNormalizedInputChange}
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH
                }}
                onBlur={onEMailIdBlur}
                error={!!state.errorMessages.email}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.email}
              </MyTypography>
            </MyGrid>

            {/* OTP Section */}
            <MyGrid size={{ xs: 12 }}>
              {!state.otpSent && (
                <MyButton
                  onClick={onSendOtpClick}
                  disabled={!state.dtoSignUp.email || state.sendingOtp}
                  sx={{ textTransform: 'none', mb: 1 }}
                  fullWidth
                >
                  {state.sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                </MyButton>
              )}

              {state.otpSent && !state.otpVerified && (
                <>
                  <MyTextField
                    label="Enter OTP"
                    name="email_otp"
                    value={state.dtoSignUp.email_otp}
                    onChange={onPlainInputChange}
                    inputProps={{ maxLength: 6 }}
                    error={!!state.errorMessages.email_otp}
                  />
                  <MyTypography className="error">{state.errorMessages.email_otp}</MyTypography>

                  <MyStack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <MyButton onClick={onVerifyOtpClick} disabled={state.verifyingOtp} sx={{ textTransform: 'none' }}>
                      {state.verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                    </MyButton>
                    <MyButton onClick={onResendOtpClick} disabled={state.resendingOtp || timeLeft > 0} sx={{ textTransform: 'none' }}>
                      {state.resendingOtp ? 'Resending...' : 'Resend OTP'}
                    </MyButton>
                  </MyStack>
                  {state.otpSent ? (
                    <div className="quiz-timer-box">
                      <MyTypography variant="subtitle1" style={{ color: '#1b6105ff', fontWeight: 500, marginTop: '0' }}>
                        Resend Otp: {timeLeft === null ? '(No Time Limit)' : formatTime(timeLeft)}
                      </MyTypography>
                    </div>
                  ) : null}
                </>
              )}

              {state.otpVerified && <MyTypography sx={{ color: 'green', mt: 1 }}>OTP Verified Successfully!</MyTypography>}
            </MyGrid>

            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={state.dtoSignUp.password}
                onChange={onPlainInputChange}
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
                inputProps={{
                  maxLength: gConstants.PASSWORD_LENGTH
                }}
                onBlur={onPasswordBlur}
                error={!!state.errorMessages.password}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.password}
              </MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12 }}>
              <MyPhoneNumber
                label="Mobile #"
                onChange={onMobileNoChange}
                value={state.dtoSignUp.mobile_no}
                onBlur={onMobileNoBlur}
                error={!!state.errorMessages.mobile_no}
              />
              <MyTypography className="error">{state.errorMessages.mobile_no}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
              <MyButton onClick={onSaveClick} disabled={saving || !state.otpVerified} sx={{ textTransform: 'none' }} fullWidth>
                {saving ? 'Creating...' : 'Create Account'}
              </MyButton>
              <p className="already-msg">
                Already have an account? <a href="/login">Log in</a>
              </p>
            </MyGrid>

            <p className="latter"> OR </p>

            {/* <MyBox style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
              <a href="https://accounts.google.com/o/oauth2/auth?" className="google-button">
                <div className="google-logo">
                  <img
                    className="button-logo"
                    src="https://assets.getpostman.com/common-share/google-logo-icon-sign-in.svg"
                    width="12"
                    height="12"
                    alt="Google Logo"
                  />
                  <span className="button-text">Sign up with Google</span>
                </div>
              </a>

              <a href="https://www.facebook.com/v17.0/dialog/oauth?" className="facebook-button">
                <div className="facebook-logo">
                  <img
                    className="button-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    width="12"
                    height="12"
                    alt="Facebook Logo"
                  />
                  <span className="button-text">Sign up with Facebook</span>
                </div>
              </a>
            </MyBox> */}
            <MyBox style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
              <a href={gConstants.GOOGLE_AUTH_URL} className="google-button">
                <div className="google-logo">
                  <img className="button-logo" src="https://assets.getpostman.com/common-share/google-logo-icon-sign-in.svg" width="12" height="12" alt="Google Logo" />
                  <span className="button-text">Sign up with Google</span>
                </div>
              </a>

              <a href="https://www.facebook.com/v17.0/dialog/oauth?" className="facebook-button">
                <div className="facebook-logo">
                  <img className="button-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width="12" height="12" alt="Facebook Logo" />
                  <span className="button-text">Sign up with Facebook</span>
                </div>
              </a>
            </MyBox>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientSignUp, (prevProps, nextProps) => eq(prevProps, nextProps));
