'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTextField from '@/app/custom-components/MyTextField';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyCardActions from '@/app/custom-components/MyCardActions';
import useAffiliate from './useAffiliate';
import * as gConstants from '../../constants/constants';
import { useSelector } from '../../store';
import MyStack from '@/app/custom-components/MyStack';

const ClientAffiliate = () => {
  const {
    state,
    saving,
    onPasswordBlur,
    onUserNameBlur,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onInputChange,
    onPlainInputChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onPhoneNoChange,
    onNormalizedInputChange,
    onPhoneNoBlur,
    onSaveClick,
    onLookupValueChange,
    onZipCodeChange,
    onSendOtpClick,
    onVerifyOtpClick,
    onResendOtpClick,
    timeLeft
  } = useAffiliate();

  const { companyInfo } = useSelector((state) => state.globalState);

  const formatTime = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return '--:--';
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div>
      <MyTypography
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          fontSize: { xs: '24px', md: '30px' },
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Affiliate Programs
      </MyTypography>

      <MyBox
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '10px',
          fontSize: { xs: '16px', md: '20px' },
          textAlign: 'center',
          padding: '0 15px'
        }}
      >
        Affiliate with {companyInfo.company_name} and earn a huge recurring commission.
      </MyBox>

      <MyBox
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: { xs: '5px', md: '10px' }
        }}
      >
        {/* Form Container */}
        <MyGrid
          container
          spacing={2}
          sx={{
            width: { xs: '90%', sm: '80%', md: '50%' },
            border: '2px solid rgb(238, 242, 246)',
            padding: '1rem',
            margin: '0 auto'
          }}
        >
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="E-Mail"
              name="email"
              value={state.dtoAffiliate.email}
              onChange={onNormalizedInputChange}
              inputProps={{
                maxLength: gConstants.EMAIL_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onEMailIdBlur}
              error={state.errorMessages.email ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
          </MyGrid>

          {/* OTP Section */}
          {!state.otpVerified && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              {!state.otpSent && (
                <MyButton
                  onClick={onSendOtpClick}
                  disabled={!state.dtoAffiliate.email || state.sendingOtp}
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
                    value={state.dtoAffiliate.email_otp}
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
              label="First Name"
              name="first_name"
              value={state.dtoAffiliate.first_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onFirstNameBlur}
              disabled={!state.otpVerified}
              error={state.errorMessages.first_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.first_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Last Name"
              name="last_name"
              value={state.dtoAffiliate.last_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.LAST_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onLastNameBlur}
              disabled={!state.otpVerified}
              error={state.errorMessages.last_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyPhoneNumber
              label="Mobile #"
              onChange={onPhoneNoChange}
              value={state.dtoAffiliate.phone_no}
              onBlur={onPhoneNoBlur}
              disabled={!state.otpVerified}
              error={state.errorMessages.phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              autoComplete="new-password"
              label="User Name"
              name="user_name"
              value={state.dtoAffiliate.user_name}
              onChange={onNormalizedInputChange}
              inputProps={{
                maxLength: gConstants.USER_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onUserNameBlur}
              disabled={!state.otpVerified}
              error={state.errorMessages.user_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              autoComplete="new-password"
              type="password"
              label="Password"
              name="password"
              value={state.dtoAffiliate.password}
              onChange={onPlainInputChange}
              inputProps={{
                maxLength: gConstants.PASSWORD_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onPasswordBlur}
              disabled={!state.otpVerified}
              error={state.errorMessages.password ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.password}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="address"
              name="address"
              value={state.dtoAffiliate.address}
              onChange={onInputChange}
              disabled={!state.otpVerified}
              inputProps={{
                maxLength: gConstants.ADDRESS_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              error={state.errorMessages.address ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="City Name"
              name="city_name"
              value={state.dtoAffiliate.city_name}
              onChange={onInputChange}
              disabled={!state.otpVerified}
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              error={state.errorMessages.city_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoAffiliate.country_id,
                text: state.dtoAffiliate.country_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCountryLookup}
              onChange={onLookupValueChange('country')}
              disabled={!state.otpVerified}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Country"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.country_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoAffiliate.state_id,
                text: state.dtoAffiliate.state_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStateLookup}
              onChange={onLookupValueChange('state')}
              disabled={!state.otpVerified}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="State"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.state_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{
                id: state.dtoAffiliate.district_id,
                text: state.dtoAffiliate.district_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrDistrictLookup}
              onChange={onLookupValueChange('district')}
              disabled={!state.otpVerified}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="District"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.district_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Zip code"
              name="zip_code"
              value={state.dtoAffiliate.zip_code}
              onChange={onZipCodeChange}
              disabled={!state.otpVerified}
              inputProps={{
                maxLength: gConstants.ZIP_CODE_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
          </MyGrid>

          {/* Submit Button */}
          <MyCardActions sx={{ justifyContent: 'center', width: '100%' }}>
            <MyButton
              onClick={onSaveClick}
              disabled={saving}
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                width: { xs: '100%', md: '400px' },
                textTransform: 'none',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              {saving ? 'Submitting...' : 'Submit'}
            </MyButton>
          </MyCardActions>
        </MyGrid>

        {/* Affiliate Info Section */}
        <MyGrid
          container
          spacing={2}
          sx={{
            width: { xs: '90%', sm: '80%', md: '40%' },
            border: '2px solid rgb(238, 242, 246)',
            padding: '2.2rem',
            margin: '0 auto'
          }}
        >
          <MyBox sx={{ width: '100%', textAlign: 'center' }}>
            <h4>Who can join the {companyInfo.company_name} Affiliate Program?</h4>
            <br></br>
            {/* <MyGrid container spacing={4} sx={{ justifyContent: 'center' }}>
              {[
                'Digital marketing agencies',
                'Influencers',
                'Tech consultants',
                'Business coaches',
                'E-commerce web developers',
                'Content creators'
              ].map((item) => (
                <MyGrid size={{ xs: 12, sm: 6 }} key={item}>
                  <MyCard
                    elevation={0}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <MyCardContent>{item}</MyCardContent>
                  </MyCard>
                </MyGrid>
              ))}
            </MyGrid> */}
            <MyGrid container spacing={1} sx={{ justifyContent: 'center' }}>
              {[
                { label: 'Digital Agencies', img: '/imgPrograms/affiliate/Digital_Marketing.webp' },
                { label: 'Influencers', img: '/imgPrograms/affiliate/Influencers.webp' },
                { label: 'Tech consultants', img: '/imgPrograms/affiliate/Tech_consultants.webp' },
                { label: 'Business coaches', img: '/imgPrograms/affiliate/Business_coaches.webp' },
                { label: 'E-com Web Devs', img: '/imgPrograms/affiliate/Ecommerce_webdev.webp' },
                { label: 'Content creators', img: '/imgPrograms/affiliate/Content_creators.webp' },
              ].map((item) => (
                <MyGrid size={{ xs: 8, sm: 4 }} key={item.label}>
                  <MyCard
                    elevation={0}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '2px solid rgb(238, 242, 246)',
                      p: 0,
                      height: '150px', // fixed height to prevent size changes
                      justifyContent: 'center'
                    }}
                  >
                    {/* Image with fixed max size */}
                    <img
                      src={item.img}
                      alt={item.label}
                      style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        marginBottom: '12px'
                      }}
                    />

                    <MyCardContent
                      sx={{ textAlign: 'center', p: 0, fontWeight: 500 }}
                    >
                      {item.label}
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              ))}
            </MyGrid>

          </MyBox>
        </MyGrid>
      </MyBox>
    </div>
  );
};

export default memo(ClientAffiliate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
