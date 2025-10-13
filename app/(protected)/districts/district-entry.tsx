'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useDistrictEntry from './useDistrictEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import DistrictDTO from '@/app/types/DistrictDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type DistrictEntryProps = {
  dtoDistrict: DistrictDTO;
};

const DistrictEntry = (props: DistrictEntryProps) => {
  const {
    state,
    onInputChange,
    onCodeChange,
    onStateNameBlur,
    onCountryNameBlur,
    onDistrictNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onLookupValueChange,
    saving,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onStatusChange,
    onStatusBlur,
  } = useDistrictEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoDistrict.country_id,
                text: state.dtoDistrict.country_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCountryLookup}
              onChange={onLookupValueChange('country')}
              onBlur={onCountryNameBlur}
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
            <MyTypography className="error"> {state.errorMessages.country_id}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoDistrict.state_id,
                text: state.dtoDistrict.state_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStateLookup}
              onChange={onLookupValueChange('state')}
              onBlur={onStateNameBlur}
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
            <MyTextField
              label="District Name"
              name="district_name"
              value={state.dtoDistrict.district_name}
              onChange={onInputChange}
              onBlur={onDistrictNameBlur}
              inputProps={{
                maxLength: 30,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              error={state.errorMessages.district_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.district_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="District Code"
              name="district_code"
              value={state.dtoDistrict.district_code}
              onChange={onCodeChange}
              inputProps={{
                maxLength: 10,
                pattern: '^[A-Z0-9]+$'
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoDistrict.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCommonStatusLookup}
              onChange={onStatusChange}
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
                  placeholder='Select status...'
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.status}</MyTypography>
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

export default memo(DistrictEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
