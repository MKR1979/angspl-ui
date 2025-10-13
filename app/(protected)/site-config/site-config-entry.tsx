'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useSiteConfigEntry from './useSiteConfigEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
import * as gConstants from '../../constants/constants';
import * as Constants from '../constants/constants'
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';

type SiteConfigEntryProps = {
  dtoSiteConfig: SiteConfigDTO;
  arrCompanyLookup: LookupDTO[];
};

const SiteConfigEntry = (props: SiteConfigEntryProps) => {
  const {
    state,
    onInputChange,
    onKeyBlur,
    onStatusBlur,
    onDescriptionBlur,
    onSiteConfigStatusChange,
    onSiteConfigTypeChange,
    onTypeBlur,
    onValueBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onCompanyNameChange,
    onCompanyNameBlur,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onBusinessConfigBlur,
    saving
  } = useSiteConfigEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
                    <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{
                id: state.dtoSiteConfig.company_id,
                text: state.dtoSiteConfig.company_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCompanyLookup ?? []}
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
              label="Key"
              name="key"
              value={state.dtoSiteConfig.key}
              onChange={onInputChange}
              placeholder="Site config Key name ..."
              inputProps={{
                maxLength: gConstants.FULL_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onKeyBlur}
              error={state.errorMessages.key ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.key}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Value"
              name="value"
              value={state.dtoSiteConfig.value}
              onChange={onInputChange}
              placeholder="Site config Value..."
              inputProps={{
                maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onValueBlur}
              error={state.errorMessages.value ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.value}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Description"
              name="description"
              value={state.dtoSiteConfig.description}
              onChange={onInputChange}
              placeholder="Site config Description..."
              inputProps={{
                maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onDescriptionBlur}
              error={state.errorMessages.description ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.description}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoSiteConfig.type }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrSiteConfigTypeLookup}
              onChange={onSiteConfigTypeChange}
              onBlur={onTypeBlur}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Type"
                  placeholder="Select Type..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onTypeBlur}
                  error={state.errorMessages.type ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.type}</MyTypography>
          </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoSiteConfig.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrSiteConfigStatusLookup}
              onChange={onSiteConfigStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  placeholder="Select status..."
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
          {state.dtoSiteConfig.type === Constants.SITE_CONFIG_TYPE_JSON && (
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyTextField
              label="Business Config"
              name="business_config"
              value={state.dtoSiteConfig.business_config}
              onChange={onInputChange}
              onBlur={onBusinessConfigBlur}
              error={state.errorMessages.business_config ? true : false}
              multiline
              minRows={1}
              maxRows={10}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.business_config}</MyTypography>
          </MyGrid>
          )}         
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

export default memo(SiteConfigEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
