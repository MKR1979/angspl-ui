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
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import * as gConstants from '../../constants/constants';
interface SuccessMessageProps {
  course: string;
  price: number;
}
const ClientPrograms: React.FC<SuccessMessageProps> = ({ course, price }) => {
const { state, onInputChange, onMobileNoChange, onFirstNameBlur,onLastNameBlur, onSaveClick,onPhoneNoBlur,onEMailIdBlur } = usePrograms();
  
  return (
    <MyCard className="mycard">
      <MyBox>
        <MyGrid size={{ xs: 12 }}>
        <MyTypography
          sx={{ width: '100%', display: 'grid', justifyContent: 'center' }}
          component="h1"
          variant="h6"
          gutterBottom
        >
        Payment Details <p>Course Name:- {course}</p>         
        </MyTypography>
          <MyGrid container spacing={2} sx={{ p: '20px' }}>
            <MyGrid size={{ xs: 12 }}>
              <MyTextField
                autoFocus
                label="First Name"
                name="first_name"
                value={state.dtoPaymentDetails.first_name}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                  pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
                }}
                onBlur={ onFirstNameBlur}
                error={!!state.errorMessages.first_name}
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
                  maxLength: gConstants.LAST_NAME_LENGTH, // Restricts input to two characters
                  pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
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
              value={state.dtoPaymentDetails.email}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onEMailIdBlur}
              error={!!state.errorMessages.email}
            />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.email}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyPhoneNumber
                label="Phone no #"
                onChange={onMobileNoChange}
                value={state.dtoPaymentDetails.mobile_no}
                onBlur={onPhoneNoBlur}
                error={!!state.errorMessages.mobile_no}
              />
              <MyTypography className="error">{state.errorMessages.mobile_no}</MyTypography>
            </MyGrid>
            <div>
              <img src="pay-methods-branding.png" width="160px" alt="Payment Methods" />
              <button onClick={(e) => onSaveClick(e, price,course)} className="pay-now-button">
                Pay Now ₹{price}
              </button>
            </div>
          </MyGrid>
        </MyGrid>
      </MyBox>
    </MyCard>
  );
};

export default memo(ClientPrograms, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // ✅ Prevent unnecessary re-renders
});
