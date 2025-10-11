'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import useCompany from './useCompany';
import MyTypography from '@/app/custom-components/MyTypography';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyGrid from '@/app/custom-components/MyGrid';
import * as gConstants from '../../constants/constants';
import { Card } from '@mui/material';
import './company.css';
import MyBox from '@/app/custom-components/MyBox';
import MyButton from '@/app/custom-components/MyButton';
import MyStack from '@/app/custom-components/MyStack';

interface ClientCompanyProps {
  company_type: string;
  plan_type: string;
  payment_type: string;
  payment_amount: number;
}

const ClientCompany = ({ company_type, plan_type, payment_type, payment_amount }: ClientCompanyProps) => {
  const {
    state,
    onInputChange,
    onNormalizedInputChange,
    onCodeChange,
    onCompanyNameBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onDomainPrefixBlur,
    onSaveClick,
    onPhoneNoChange,
    onDomainPrefixChange,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft
  } = useCompany();

  const formatTime = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return '--:--';
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const placeholderPrefix = '******';
  const suffix = (() => {
    switch (company_type?.toLowerCase()) {
      case 'school':
        return `${placeholderPrefix}.adhyayan.school`;
      case 'college':
        return `${placeholderPrefix}.adhyayan.college`;
      case 'institute':
        return `${placeholderPrefix}.adhyayan.online`;
      default:
        return `${placeholderPrefix}.adhyayan.online`;
    }
  })();

  const fullDomain = state.dtoCompany.domain_name && state.dtoCompany.domain_name.trim() !== '' ? state.dtoCompany.domain_name : suffix;

  return (
    <Card variant="outlined" sx={{ p: 1, borderRadius: 2, marginTop: 2, border: 'none' }}>
      <MyBox sx={{ width: { xs: '100%', sm: '65%' }, margin: '0 auto' }}>
        <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '0.1rem 1rem' }}>
          <MyGrid size={{ xs: 12 }}>
            <MyBox sx={{ textAlign: 'center' }}>
              <div className="admission-form-header">
                <h2
                  style={{
                    color: '#2c3e50'
                  }}
                >
                  Company Information
                </h2>
              </div>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Email"
              name="email"
              value={state.dtoCompany.email}
              onChange={onNormalizedInputChange}
              placeholder="Enter Company Email"
              inputProps={{
                maxLength: gConstants.EMAIL_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onEmailBlur}
              error={state.errorMessages.email ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.email}</MyTypography>
          </MyGrid>
          {/* OTP Section */}
          {!state.otpVerified && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              {!state.otpSent && (
                <MyButton
                  onClick={onSendOtpClick}
                  disabled={!state.dtoCompany.email || state.sendingOtp}
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
                    value={state.dtoCompany.email_otp}
                    onChange={onInputChange}
                    inputProps={{ maxLength: 6 }}
                    error={!!state.errorMessages.email_otp}
                  />
                  <MyTypography className="error">{state.errorMessages.email_otp}</MyTypography>

                  <MyStack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {/* Verify OTP Button */}
                    <MyButton
                      onClick={onVerifyOtpClick}
                      disabled={state.verifyingOtp}
                      sx={{
                        textTransform: 'none',
                        fontSize: '11px',
                        padding: '3px 7px',
                        minHeight: '26px', // controls height
                        lineHeight: 1
                      }}
                    >
                      {state.verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                    </MyButton>

                    {/* Resend OTP Button */}
                    <MyButton
                      onClick={onResendOtpClick}
                      disabled={state.resendingOtp || timeLeft > 0}
                      sx={{
                        textTransform: 'none',
                        fontSize: '11px',
                        padding: '3px 7px',
                        minHeight: '26px', // controls height
                        lineHeight: 1
                      }}
                    >
                      {state.resendingOtp ? 'Resending...' : 'Resend OTP'}
                    </MyButton>

                    {/* Resend Timer Text */}
                    {state.otpSent && (
                      <MyTypography
                        variant="body2"
                        sx={{
                          color: '#1b6105ff',
                          fontWeight: 500,
                          fontSize: '12px',
                          ml: 1
                        }}
                      >
                        Resend Otp: {timeLeft === null ? '(No Time Limit)' : formatTime(timeLeft)}
                      </MyTypography>
                    )}
                  </MyStack>
                </>
              )}
              {state.otpVerified && <MyTypography sx={{ color: 'green', mt: 1 }}>OTP Verified Successfully!</MyTypography>}
            </MyGrid>
          )}

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Company Name"
              name="company_name"
              value={state.dtoCompany.company_name}
              onChange={onInputChange}
              placeholder="Enter Company Name"
              inputProps={{
                maxLength: gConstants.COMPANY_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onCompanyNameBlur}
              error={state.errorMessages.company_name ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.company_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Company Code"
              name="company_code"
              value={state.dtoCompany.company_code}
              onChange={onCodeChange}
              placeholder="Enter Company Code"
              inputProps={{
                maxLength: gConstants.CODE_LENGTH,
                pattern: '^[A-Z0-9]+$'
              }}
              onBlur={onCompanyCodeBlur}
              error={state.errorMessages.company_code ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.company_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyPhoneNumber
              label="Phone #"
              onChange={onPhoneNoChange}
              value={state.dtoCompany.phone_no}
              onBlur={onPhoneNoBlur}
              error={state.errorMessages.phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Domain Name"
              name="domain_prefix"
              value={state.dtoCompany.domain_prefix}
              onChange={onDomainPrefixChange(company_type)}
              placeholder="Enter Domain Name"
              inputProps={{
                maxLength: gConstants.PHONE_NO_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onDomainPrefixBlur}
              error={state.errorMessages.domain_prefix ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.domain_prefix}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Full Domain Name"
              name="domain_name"
              // value={state.dtoCompany.domain_name}
              value={fullDomain}
              placeholder="Your Domain Name Here"
              InputProps={{
                readOnly: true
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyTextField
              label="Address"
              name="address"
              value={state.dtoCompany.address}
              onChange={onInputChange}
              onBlur={onAddressBlur}
              placeholder="Enter Company Address"
              error={state.errorMessages.address ? true : false}
              multiline
              minRows={1}
              maxRows={4}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.address}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Company Type"
              name="company_type"
              value={company_type}
              InputProps={{
                readOnly: true
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Plan Type"
              name="plan_type"
              value={plan_type}
              InputProps={{
                readOnly: true
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Payment Type"
              name="payment_type"
              value={payment_type}
              InputProps={{
                readOnly: true
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Amount"
              name="amount"
              value={payment_amount}
              InputProps={{
                readOnly: true
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <div>
              <img src="pay-methods-branding.png" width="160px" alt="Payment Methods" />
              <button onClick={(e) => onSaveClick(e, company_type, payment_amount)} className="pay-now-button">
                Pay Now ₹{payment_amount}
              </button>
            </div>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </Card>
  );
};

export default memo(ClientCompany, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
