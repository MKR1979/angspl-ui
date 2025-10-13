'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useLocationEntry from './useLocationEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import LocationDTO from '@/app/types/LocationDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import * as gConstants from '../../constants/constants';
import * as Constants from '../../(protected)/constants/constants';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';

type LocationEntryProps = {
  dtoLocation: LocationDTO;
  arrCountryLookup: LookupDTO[];
};

const LocationEntry = (props: LocationEntryProps) => {
  const {
    state,
    onInputChange,
    onPlainInputChange,
    onStateNameChange,
    onCountryNameChange,
    onLocationNameBlur,
    onAddressBlur,
    onCityNameBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onZipCodeBlur,
    onZipCodeChange,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onStatusChange,
    onStatusBlur
  } = useLocationEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Location Name"
              name="location_name"
              value={state.dtoLocation.location_name}
              onChange={onInputChange}
              onBlur={onLocationNameBlur}
              inputProps={{
                maxLength: gConstants.ADDRESS_LENGTH,
                pattern: '^[a-zA-Z0-9]{1,2}$'
              }}
              error={state.errorMessages.location_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.location_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField label="Capacity"
              name="capacity"
              value={state.dtoLocation.capacity}
              onChange={onPlainInputChange}
              slotProps={{
                input: {
                  inputComponent: MyNumericFormat as any,
                  inputProps: {
                    maxLength: gConstants.FAMILY_SAMAGRA_ID_LENGTH,
                    pattern: "^[0-9]+(\\.[0-9]{1,2})?$"
                  }
                  // inputProps: { prefix: state.dtoEvent.currency_symbol },
                }
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              multiline
              rows={2}
              label="Description"
              name="description"
              value={state.dtoLocation.description}
              onChange={onInputChange}
            />
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              multiline
              rows={2}
              label="Address"
              name="address"
              value={state.dtoLocation.address}
              onChange={onInputChange}
              onBlur={onAddressBlur}
              inputProps={{
                maxLength: gConstants.ADDRESS_LENGTH,
                pattern: '^[a-zA-Z0-9]{1,2}$'
              }}
              error={state.errorMessages.address ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ id: state.dtoLocation.country_id, text: state.dtoLocation.country_name }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCountryLookup}
              onChange={onCountryNameChange}
              onBlur={onCountryNameBlur}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Country"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCountryNameBlur}
                  error={state.errorMessages.country_id ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.country_id}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ id: state.dtoLocation.state_id, text: state.dtoLocation.state_name }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStateLookup}
              onChange={onStateNameChange}
              onBlur={onStateNameBlur}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="State"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onStateNameBlur}
                  error={state.errorMessages.state_id ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.state_id}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="City"
              name="city_name"
              value={state.dtoLocation.city_name}
              onChange={onInputChange}
              onBlur={onCityNameBlur}
              inputProps={{
                maxLength: Constants.DOMAIN_NAME_LENGTH,
                inputMode: 'text',
                pattern: "[A-Za-zÀ-ÿ\\s\\-']*"
              }}
              error={state.errorMessages.city_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Zip Code"
              name="zip_code"
              value={state.dtoLocation.zip_code}
              onChange={onZipCodeChange}
              onBlur={onZipCodeBlur}
              inputProps={{
                maxLength: gConstants.ZIP_CODE_LENGTH,
                inputMode: 'numeric', // mobile numeric keypad
                pattern: '[0-9]*'
              }}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoLocation.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStatusLookup}
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
                  placeholder="Select status..."
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
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(LocationEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
