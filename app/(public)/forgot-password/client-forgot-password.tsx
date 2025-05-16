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

const ClientForgotPassword = () => {
  const { state, onInputChange, onUserNameBlur, onPasswordBlur, onEMailIdBlur, onSaveClick, onConfirmPasswordBlur } = useForgotPassword();
  const [selectedOption, setSelectedOption] = useState('email');

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

        {/* Radio Buttons for Email / Username */}
        <MyGrid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2, mt: 2 }}>
          <label>
            <input
              type="radio"
              name="loginType"
              value="email"
              checked={selectedOption === 'email'}
              onChange={() => setSelectedOption('email')}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              name="loginType"
              value="user_name"
              checked={selectedOption === 'user_name'}
              onChange={() => setSelectedOption('user_name')}
            />
            Username
          </label>
        </MyGrid>

        <MyGrid size={{ xs: 12 }}>
          <MyGrid container spacing={2} sx={{ p: '20px' }}>
            {/* Dynamic Input Field for Email/Username */}
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label={selectedOption === 'email' ? 'Email' : 'user_name'}
                name={selectedOption}
                autoComplete="new-password"
                value={selectedOption === 'email' ? state.dtoForgotPassword.email : state.dtoForgotPassword.user_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                  pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                }}
                onBlur={selectedOption === 'email' ? onEMailIdBlur : onUserNameBlur}
                error={selectedOption === 'email' ? !!state.errorMessages.email : !!state.errorMessages.user_name}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {selectedOption === 'email' ? state.errorMessages.email : state.errorMessages.user_name}
              </MyTypography>
            </MyGrid>

            {/* Password Field */}
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={state.dtoForgotPassword.password}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.PASSWORD_MAX_LENGTH, // Restricts input to two characters
                  minLength: gConstants.PASSWORD_MIN_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                }}
                onBlur={onPasswordBlur}
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
                type="password"
                autoComplete="new-password"
                value={state.dtoForgotPassword.confirm_password}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.PASSWORD_MAX_LENGTH, // Restricts input to two characters
                  pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                }}
                onBlur={onConfirmPasswordBlur}
                error={Boolean(state.errorMessages.confirm_password)}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.confirm_password}
              </MyTypography>
            </MyGrid>

            {/* Submit Button */}
            <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
              <MyButton onClick={onSaveClick} sx={{ textTransform: 'none' }} fullWidth>
                Submit
              </MyButton>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientForgotPassword, (prevProps, nextProps) => eq(prevProps, nextProps));
