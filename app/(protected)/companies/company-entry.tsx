'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCompanyEntry from './useCompanyEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CompanyDTO from '@/app/types/CompanyDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import './company.css';
import * as Constants from '../constants/constants';
import * as gConstants from '../../constants/constants';

type CountryEntryProps = {
  dtoCompany: CompanyDTO;
};

const CompanyEntry = (props: CountryEntryProps) => {
  const {
    state,
    onInputChange,
    onNormalizedInputChange,
    onCodeChange,
    onCompanyNameBlur,
    onCompanyTypeBlur,
    onStatusBlur,
    onEmailBlur,
    onPhoneNoBlur,
    onCompanyCodeBlur,
    onAddressBlur,
    onCompanyStatusChange,
    onCompanyTypeChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onPhoneNoChange,
    saving
  } = useCompanyEntry(props);
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Company Name"
              name="company_name"
              value={state.dtoCompany.company_name}
              onChange={onInputChange}
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
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                   pattern: '^[A-Z0-9]+$'
              }}
              onBlur={onCompanyCodeBlur}
              error={state.errorMessages.company_code ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.company_code}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoCompany.company_type }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCompanyTypeLookup}
              onChange={onCompanyTypeChange}
              onBlur={onCompanyTypeBlur}
              filterOptions={(options, state) => {        // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Company Type"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCompanyTypeBlur}
                  error={state.errorMessages.company_type ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.company_type}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Email"
              name="email"
              value={state.dtoCompany.email}
              onChange={onNormalizedInputChange}
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
              filterOptions={(options, state) => {        // searchable Lookup
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
      <MyDivider></MyDivider>
      <MyCardActions>
        {/* <MyButton onClick={onSaveClick}>Save</MyButton> */}
         <MyButton onClick={onSaveClick} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CompanyEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
