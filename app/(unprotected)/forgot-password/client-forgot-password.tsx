'use client';
import React, { useState, memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyButton from '@/app/custom-components/MyButton';
import MyStack from '@/app/custom-components/MyStack';
import useForgotPassword from './useForgotPassword';
import MyBox from '@/app/custom-components/MyBox';
import './forgot-password.css';
import MyCard from '@/app/custom-components/MyCard';
import * as gConstants from '../../constants/constants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const ClientForgotPassword = () => {
  const {
    state,
    onInputChange,
    onUserNameBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    showPassword1,
    setShowPassword1,
    onEMailIdBlur,
    onSaveClick,
    onConfirmPasswordBlur,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft
  } = useForgotPassword();
  const [selectedOption] = useState('email');

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
              Forgot Password
            </MyTypography>
          </MyStack>
        </MyGrid>
        <MyGrid size={{ xs: 12 }}>
          <MyGrid container spacing={2} sx={{ px: '40px', py: '20px' }}>
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label={selectedOption === 'email' ? 'Email' : 'user_name'}
                name={selectedOption}
                autoComplete="new-password"
                value={selectedOption === 'email' ? state.dtoForgotPassword.email : state.dtoForgotPassword.user_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={selectedOption === 'email' ? onEMailIdBlur : onUserNameBlur}
                error={selectedOption === 'email' ? !!state.errorMessages.email : !!state.errorMessages.user_name}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {selectedOption === 'email' ? state.errorMessages.email : state.errorMessages.user_name}
              </MyTypography>
            </MyGrid>

            {/* OTP Section */}
            <MyGrid size={{ xs: 12 }}>
              {!state.otpSent && (
                <MyButton
                  onClick={onSendOtpClick}
                  disabled={!state.dtoForgotPassword.email || state.sendingOtp}
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
                    value={state.dtoForgotPassword.email_otp}
                    onChange={onInputChange}
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

            {/* Password Field */}
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="New Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={state.dtoForgotPassword.password}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.PASSWORD_LENGTH,
                  minLength: gConstants.PASSWORD_MIN_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
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
                onBlur={onPasswordBlur}
                disabled={!state.otpVerified}
                error={state.errorMessages.password ? true : false}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.password}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="Confirm Password"
                name="confirm_password"
                type={showPassword1 ? 'text' : 'password'}
                autoComplete="new-password"
                value={state.dtoForgotPassword.confirm_password}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.PASSWORD_MAX_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
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
                onBlur={onConfirmPasswordBlur}
                disabled={!state.otpVerified}
                error={Boolean(state.errorMessages.confirm_password)}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.confirm_password}
              </MyTypography>
            </MyGrid>

            {/* Submit Button */}
            <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
              <MyButton onClick={onSaveClick} sx={{ textTransform: 'none' }} fullWidth disabled={!state.otpVerified}>
                Submit
              </MyButton>
            </MyGrid>
            <MyTypography
              className="already-msg2"
              component="div"
              sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', size: '12px', mt: 4 }} >
              {/* <a href="/ "> Back to Home</a> */}
              <a
                onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
                ← Go Back
              </a>
            </MyTypography>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientForgotPassword, (prevProps, nextProps) => eq(prevProps, nextProps));
