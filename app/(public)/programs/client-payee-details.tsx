'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import usePrograms from './usePrograms';
import MyBox from '@/app/custom-components/MyBox';
import './payee-details.css';
import MyCard from '@/app/custom-components/MyCard';
import MyButton from '@/app/custom-components/MyButton';
import MyStack from '@/app/custom-components/MyStack';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import * as gConstants from '../../constants/constants';

interface SuccessMessageProps {
  course: string;
  course_id: number;
  price: number;
}
const ClientPrograms: React.FC<SuccessMessageProps> = ({ course, course_id, price }) => {
  const {
    state,
    timeLeft, isDataExist,
    onInputChange,
    onPlainInputChange,
    onNormalizedInputChange,
    onMobileNoChange,
    onFirstNameBlur,
    onLastNameBlur,
    onSaveClick,
    onPhoneNoBlur,
    onEMailIdBlur,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick
  } = usePrograms();

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
        <MyGrid
          size={{ xs: 12 }}
          sx={{
            display: 'flex',
            flexDirection: 'column'
            //minHeight: '80vh' // makes it stretch full screen
          }}
        >
          <MyTypography
            sx={{ width: '100%', display: 'grid', justifyContent: 'center', marginTop: '7px' }}
            component="h1"
            variant="h6"
            gutterBottom
          >
            Payment Details <p>Course Name:- {course}</p>
          </MyTypography>
          <MyGrid container spacing={2} sx={{ p: '20px' }}>
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="Email"
                name="email"
                autoComplete="new-password"
                value={state.dtoPaymentDetails.email}
                onChange={onNormalizedInputChange}
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
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
                  disabled={!state.dtoPaymentDetails.email || state.sendingOtp}
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
                    value={state.dtoPaymentDetails.email_otp}
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
                label="First Name"
                name="first_name"
                value={state.dtoPaymentDetails.first_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.FIRST_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onFirstNameBlur}
                error={!!state.errorMessages.first_name}
                InputProps={{ readOnly: isDataExist }}
              />
              <MyTypography className="error">{state.errorMessages.first_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="Last Name"
                name="last_name"
                value={state.dtoPaymentDetails.last_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.LAST_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onLastNameBlur}
                error={!!state.errorMessages.last_name}
                InputProps={{ readOnly: isDataExist }}
              />
              <MyTypography className="error">{state.errorMessages.last_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyPhoneNumber
                label="Phone no #"
                onChange={onMobileNoChange}
                value={state.dtoPaymentDetails.mobile_no}
                onBlur={onPhoneNoBlur}
                error={!!state.errorMessages.mobile_no}
                InputProps={{ readOnly: isDataExist }}
              />
              <MyTypography className="error">{state.errorMessages.mobile_no}</MyTypography>
            </MyGrid>
            <div>
              <img src="/common/PaymentIcons.webp" width="160px" alt="Payment Methods" />
              <button onClick={(e) => onSaveClick(e, price, course, course_id)} className="pay-now-button" disabled={!state.otpVerified || price <= 0} >
                Pay Now ₹{price}
              </button>
              {price <= 0 && (
                <MyTypography color="error">
                  No payable amount available to pay.
                </MyTypography>
              )}
            </div>
            <MyTypography
              className="already-msg2"
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                size: '12px',
                mt: 4
              }}
            >
              <a href="/programs"> ← Go Back</a>
            </MyTypography>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientPrograms, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
