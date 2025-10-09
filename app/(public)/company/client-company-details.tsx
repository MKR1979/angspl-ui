'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCompany from './useCompany';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../constants/constants';
import { Box } from '@mui/material';
import './company.css';

const ClientCompany = () => {
  const {
    state,
    onInputChange,
    onNormalizedInputChange,
    onCodeChange,
    onCompanyNameBlur,
    onStatusBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onCompanyStatusChange,
    onDomainNameBlur,
    onSaveClick,
    // onClearClick,
    // onCancelClick,
    setOpen1,
    setClose1,
    onPhoneNoChange,
    // saving
  } = useCompany();

  return (
    // <MyCard>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        p: 2
      }}
    >
      <MyCard
        sx={{
          width: '65%',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 3,
          p: 3
        }}
      >
        <MyCardContent>
          <MyTypography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              color: '#334D6E',
              mb: 3,
              letterSpacing: '0.5px'
            }}
          >
            Company Information
          </MyTypography>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Company Name"
                name="company_name"
                value={state.dtoCompany.company_name}
                onChange={onInputChange}
                placeholder='Enter Company Name'
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
                placeholder='Enter Company Code'
                inputProps={{
                  maxLength: 8,
                  pattern: '^[A-Z0-9]+$'
                }}
                onBlur={onCompanyCodeBlur}
                error={state.errorMessages.company_code ? true : false}
              />
              <MyTypography className="error">{state.errorMessages.company_code}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Domain Name"
                name="domain_name"
                value={state.dtoCompany.domain_name}
                onChange={onInputChange}
                placeholder='Enter Domain Name'
                inputProps={{
                  maxLength: gConstants.COMPANY_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onDomainNameBlur}
                error={state.errorMessages.domain_name ? true : false}
              />
              <MyTypography className="error">{state.errorMessages.domain_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Email"
                name="email"
                value={state.dtoCompany.email}
                onChange={onNormalizedInputChange}
                placeholder='Enter Company Email'
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onEmailBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error">{state.errorMessages.email}</MyTypography>
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
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ text: state.dtoCompany.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCompanyStausLookup}
                onChange={onCompanyStatusChange}
                onBlur={onStatusBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStatusBlur}
                    error={state.errorMessages.status ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Address"
                name="address"
                value={state.dtoCompany.address}
                onChange={onInputChange}
                onBlur={onAddressBlur}
                placeholder='Enter Company Address'
                error={state.errorMessages.address ? true : false}
                multiline
                minRows={2}
                maxRows={4}
                fullWidth
              />
              <MyTypography className="error">{state.errorMessages.address}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyCardActions>
              <img src="pay-methods-branding.png" width="160px" alt="Payment Methods" />
          <MyButton onClick={onSaveClick}>Pay Now</MyButton>
        </MyCardActions>
      </MyCard>
    </Box>
  );
};

export default memo(ClientCompany, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
