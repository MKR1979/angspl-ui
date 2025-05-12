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

const ClientAffiliate = () => {
  const {
    state,
    onPasswordBlur,
    onUserNameBlur,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onInputChange,
    onCountryNameChange,
    onStateNameChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onPhoneNoChange,
    onPhoneNoBlur,
    onSaveClick
  } = useAffiliate();

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
        Affiliate with Adhyayan and earn a huge recurring commission.
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
              autoFocus
              label="First Name"
              name="first_name"
              value={state.dtoAffiliate.first_name}
              onChange={onInputChange}
              onBlur={onFirstNameBlur}
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
              onBlur={onLastNameBlur}
              error={state.errorMessages.last_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="E-Mail"
              name="email"
              value={state.dtoAffiliate.email}
              onChange={onInputChange}
              onBlur={onEMailIdBlur}
              error={state.errorMessages.email ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyPhoneNumber
              label="Mobile #"
              onChange={onPhoneNoChange}
              value={state.dtoAffiliate.phone_no}
              onBlur={onPhoneNoBlur}
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
              onChange={onInputChange}
              onBlur={onUserNameBlur}
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
              onChange={onInputChange}
              onBlur={onPasswordBlur}
              error={state.errorMessages.password ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.password}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12 }}>
            <MyTextField
              label="address"
              name="address"
              value={state.dtoAffiliate.address}
              onChange={onInputChange}
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
              onChange={onCountryNameChange}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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
            <MyTypography className="error"> {state.errorMessages.country_id}</MyTypography>
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
              onChange={onStateNameChange}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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
            <MyTypography className="error"> {state.errorMessages.state_id}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Zip code"
              name="zip_code"
              value={state.dtoAffiliate.zip_code}
              onChange={onInputChange}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
          </MyGrid>

          {/* Submit Button */}
          <MyCardActions sx={{ justifyContent: 'center', width: '100%' }}>
            <MyButton
              onClick={onSaveClick}
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
              Submit
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
            <h4>Who can join the Adhyayan Affiliate Program?</h4>
            <br></br>
            <MyGrid container spacing={4} sx={{ justifyContent: 'center' }}>
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
