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

const ClientSingUp = () => {
  const { state, onInputChange,onMobileNoChange, onMobileNoBlur, onPasswordBlur, onEMailIdBlur, onFirstNameBlur, onLastNameBlur, onSaveClick} = useSignUp();
  return (
    <MyCard className='mycard'>
    <MyBox >
      <MyGrid size={{ xs: 12 }}>
       <MyStack alignItems="center" justifyContent="center" spacing={1}>
         <MyTypography
           sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
           component="h1"
           variant="h6"
           gutterBottom
         > Create Account
         </MyTypography>
       </MyStack>
      </MyGrid>
      <MyGrid size={{ xs: 12 }}>
       <MyGrid container spacing={2} sx={{ p: '20px' }}>
        <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              autoFocus
              label="First Name"
              name="first_name"
              value={state.dtoSignUp.first_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onFirstNameBlur}
              error={state.errorMessages.first_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.first_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6  }}>
            <MyTextField
              label="Last Name"
              name="last_name"
              value={state.dtoSignUp.last_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.LAST_NAME_LENGTH, // Restricts input to two characters
                pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onLastNameBlur}
              error={state.errorMessages.last_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12 }}>
              <MyTextField                
                label="Email"
                name="email"
                autoComplete="new-password"
                value={state.dtoSignUp.email}
                onChange={onInputChange}
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                  pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
                }}
                onBlur={onEMailIdBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error" sx={{ textAlign: 'left' }}>
                {state.errorMessages.email}
              </MyTypography>
         </MyGrid>
         <MyGrid size={{ xs: 12 }}>
           <MyTextField
             label="Password"
             name="password"
             type="password"
             autoComplete="new-password"
             value={state.dtoSignUp.password}
             onChange={onInputChange}
             inputProps={{
              maxLength: gConstants.PASSWORD_MAX_LENGTH, // Restricts input to two characters
              pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
            }}
             onBlur={onPasswordBlur}
             error={state.errorMessages.password ? true : false}
           />
           <MyTypography className="error" sx={{ textAlign: 'left' }}>
             {state.errorMessages.password}
           </MyTypography>
         </MyGrid>

         <MyGrid size={{ xs: 12  }}>
            <MyPhoneNumber
              label="Mobile #"
              onChange={onMobileNoChange}
              value={state.dtoSignUp.mobile_no}
              onBlur={onMobileNoBlur}
              error={state.errorMessages.mobile_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.mobile_no}</MyTypography>
         </MyGrid>        
         <MyGrid size={{ xs: 12 }} sx={{ mt: 1 }}>
          <MyButton 
            onClick={onSaveClick}
            sx={{ textTransform: 'none' }} 
            fullWidth
          >
            Create Account
          </MyButton>
            <p className="already-msg">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </MyGrid>
           <p className='latter'> OR </p>         
         <MyBox style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
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
       </MyBox>
       </MyGrid>
     </MyGrid>
    </MyBox>
    </MyCard>
  );
};

export default memo(ClientSingUp, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
