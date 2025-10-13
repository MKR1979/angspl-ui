'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCompanyEntry from './useCompanyDomainEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import './company-domain.css';
import * as Constants from '../constants/constants';
import LookupDTO from '@/app/types/LookupDTO';

type CompanyEntryProps = {
  dtoCompanyDomain: CompanyDomainDTO;
  arrCompanyLookup: LookupDTO[];
};

const CompanyDomainEntry = (props: CompanyEntryProps) => {
  const {
    state,
    onPlainInputChange,
     onCompanyNameBlur,
    onCompanyNameChange,
    onStatusBlur,
    onDomainNameBlur,
    onCompanyDomainStatusChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onLogoUrlBlur,
    onLogoHeightBlur,
    onLogoWidthBlur,
    saving
  } = useCompanyEntry(props);
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoCompanyDomain.company_id,
                text: state.dtoCompanyDomain.company_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCompanyLookup}
              onChange={onCompanyNameChange}
              filterOptions={(options, state) => {
                // searchable lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Company"
                  placeholder="Select company name..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCompanyNameBlur}
                  error={state.errorMessages.company_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.company_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Domain Name"
              name="domain_name"
              value={state.dtoCompanyDomain.domain_name}
              onChange={onPlainInputChange}
              inputProps={{
                maxLength: Constants.DOMAIN_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onDomainNameBlur}
              error={state.errorMessages.domain_name ? true : false}
              placeholder='Company Domain Name...'
            />
            <MyTypography className="error">{state.errorMessages.domain_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Logo Url"
              name="logo_url"
              value={state.dtoCompanyDomain.logo_url}
              onChange={onPlainInputChange}
              onBlur={onLogoUrlBlur}
              error={state.errorMessages.logo_url ? true : false}
              placeholder='Provide logo Url...'
            />
            <MyTypography className="error"> {state.errorMessages.logo_url}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Logo Height"
              name="logo_height"
              value={state.dtoCompanyDomain.logo_height === 0 ? '' : state.dtoCompanyDomain.logo_height}
              onChange={onPlainInputChange}
              onBlur={onLogoHeightBlur}
              error={state.errorMessages.logo_height ? true : false}
              placeholder={state.dtoCompanyDomain.logo_height === 0 ? 'Provide logo height...' : ''}
            />
            <MyTypography className="error"> {state.errorMessages.logo_height}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Logo Width"
              name="logo_width"
              value={state.dtoCompanyDomain.logo_width === 0 ? '' : state.dtoCompanyDomain.logo_width}
              onChange={onPlainInputChange}
              onBlur={onLogoWidthBlur}
              error={state.errorMessages.logo_width ? true : false}
              placeholder={state.dtoCompanyDomain.logo_width === 0 ? 'Provide logo width...' : ''}
            />
            <MyTypography className="error"> {state.errorMessages.logo_width}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoCompanyDomain.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCompanyDomainStatusLookup}
              onChange={onCompanyDomainStatusChange}
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
                  placeholder="Select Active/ In-active"
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
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CompanyDomainEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
