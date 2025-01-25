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

type LocationEntryProps = {
  dtoLocation: LocationDTO;
  arrCountryLookup: LookupDTO[];
};

const LocationEntry = (props: LocationEntryProps) => {
  const {
    state,
    onInputChange,
    onStateNameChange,
    onCountryNameChange,
    onLocationNameBlur,
    onAddressBlur,
    onCityNameBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onZipCodeBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
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
              error={state.errorMessages.location_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.location_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField label="Capacity" name="capacity" value={state.dtoLocation.capacity} onChange={onInputChange} />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              multiline
              rows={5}
              label="Description"
              name="description"
              value={state.dtoLocation.description}
              onChange={onInputChange}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              multiline
              rows={3}
              label="Address"
              name="address"
              value={state.dtoLocation.address}
              onChange={onInputChange}
              onBlur={onAddressBlur}
              error={state.errorMessages.address ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="City"
              name="city_name"
              value={state.dtoLocation.city_name}
              onChange={onInputChange}
              onBlur={onCityNameBlur}
              error={state.errorMessages.city_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
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
          <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
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
          <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Zip Code"
              name="zip_code"
              value={state.dtoLocation.zip_code}
              onChange={onInputChange}
              onBlur={onZipCodeBlur}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
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
