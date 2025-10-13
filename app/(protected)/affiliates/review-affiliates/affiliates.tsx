'use client';
import useAffiliateEntry from './useAffiliatesEntry';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../../constants/constants';
import { Typography, Card, Divider, InputAdornment, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyButton from '@/app/custom-components/MyButton';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import { ClearIcon } from '@mui/x-date-pickers';
import AffiliateDTO from '@/app/types/AffiliateDTO';
// import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type AffiliateEntryProps = {
  dtoAffiliate: AffiliateDTO;
};

const AffiliateEntry = (props: AffiliateEntryProps) => {
  const {
    state,
    onSaveClick,
    onClearClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    onCancelClick,
    saving,
    showPassword,
    setShowPassword,
    onInputChange,
    onPlainInputChange,
    onPhoneNoBlur,
    onPhoneNoChange,
    onEMailIdBlur,
    onNormalizedInputChange,
    onStatusChange,
    onStatusBlur,
    onFirstNameBlur,
    onLastNameBlur,
    onUserNameBlur,
    onPasswordBlur,
    onAddressBlur,
    onCityNameBlur,
    onZipCodeBlur,
    onZipCodeChange,
    onCountryNameChange,
    onStateNameChange,
    onConversionRateBlur,
    onConversionRateChange,
    onDistrictChange,
    onDistrictBlur

  } = useAffiliateEntry(props);

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="black">
        Affiliate Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <MyGrid container spacing={2}>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="First Name"
            name="first_name"
            value={state.dtoAffiliate.first_name}
            onChange={onInputChange}
            placeholder="Enter First Name"
            InputProps={{
              inputProps: { maxLength: gConstants.FIRST_NAME_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
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
            placeholder="Enter Last Name"
            InputProps={{
              inputProps: { maxLength: gConstants.LAST_NAME_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
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
            onChange={onNormalizedInputChange}
            placeholder="Enter Email"
            inputProps={{
              maxLength: gConstants.EMAIL_LENGTH,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onEMailIdBlur}
            error={state.errorMessages.email ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyPhoneNumber
            label="Phone No"
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
            onChange={onNormalizedInputChange}
            placeholder="Enter User Name"
            InputProps={{
              inputProps: { maxLength: gConstants.USER_NAME_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onBlur={onUserNameBlur}
            error={state.errorMessages.user_name ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            value={state.dtoAffiliate.password}
            onChange={onPlainInputChange}
            placeholder="Enter Password"
            // InputProps={{
            //   inputProps: { maxLength: gConstants.PASSWORD_MAX_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <LockIcon fontSize="small" />
            //     </InputAdornment>
            //   )
            // }}
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
            placeholder="Enter Address"
            inputProps={{
              maxLength: gConstants.ADDRESS_LENGTH,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onAddressBlur}
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
            placeholder="Enter City Name"
            inputProps={{
              maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
              pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
            }}
            onBlur={onCityNameBlur}
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
            filterOptions={(options, state) => {
              // searchable Lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Country"
                placeholder="Select Country Name"
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
            filterOptions={(options, state) => {
              // searchable Lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="State"
                placeholder="Select State Name"
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            )}
          />
          <MyTypography className="error"> {state.errorMessages.state_id}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyAutocomplete
            open={state.open4}
            onOpen={setOpen4}
            onClose={setClose4}
            value={{
              id: state.dtoAffiliate.district_id,
              text: state.dtoAffiliate.district_name
            }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrDistrictLookup}
            onChange={onDistrictChange}
            onBlur={onDistrictBlur}
            filterOptions={(options, state) => {
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="District"
                placeholder="Select District Name"
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
            placeholder="Enter Zip Code"
            inputProps={{
              maxLength: gConstants.ZIP_CODE_LENGTH,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onZipCodeBlur}
            error={state.errorMessages.zip_code ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Conversion Rate"
            name="conversion_rate"
            value={state.dtoAffiliate.conversion_rate || ''}
            onChange={onConversionRateChange('conversion_rate')}
            placeholder="Enter Conversion Rate"
            inputProps={{
              maxLength: gConstants.ZIP_CODE_LENGTH,
              inputMode: 'numeric', // mobile numeric keypad
              pattern: '[0-9]*'
            }}
            onBlur={onConversionRateBlur}
            error={state.errorMessages.conversion_rate ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.conversion_rate}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyAutocomplete
            open={state.open3}
            onOpen={setOpen3}
            onClose={setClose3}
            value={{ text: state.dtoAffiliate?.status }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrAffiliateStatusLookup}
            onChange={onStatusChange}
            onBlur={onStatusBlur}
            filterOptions={(options, state) => {
              // searchable lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Status"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!state.errorMessages.status ? true : false}
                placeholder="e.g. Select Accepted/ Rejected"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentTurnedInIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <MyTypography className="error">{state.errorMessages.status}</MyTypography>
        </MyGrid>
      </MyGrid>

      <MyDivider sx={{ my: 2 }} />

      <MyCardActions>
        <>
          <MyButton onClick={onSaveClick} startIcon={<AssignmentTurnedInIcon />} disabled={saving}>
            {saving ? 'Submitting...' : 'Submit'}
          </MyButton>
          <MyButton onClick={onClearClick} startIcon={<ClearIcon />}>
            Clear
          </MyButton>
          <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
            Close
          </MyButton>
        </>
      </MyCardActions>
    </Card>
  );
};

export default memo(AffiliateEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
