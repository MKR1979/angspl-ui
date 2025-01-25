'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useTargetEntry from './useTargetEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import TargetDTO from '@/app/types/TargetDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import LookupDTO from '@/app/types/LookupDTO';

type TargetEntryProps = {
  dtoTarget: TargetDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const TargetEntry = (props: TargetEntryProps) => {
  const {
    state,
    onInputChange,
    onPrimaryStateNameChange,
    onPrimaryCountryNameChange,
    onOtherStateNameChange,
    onOtherCountryNameChange,
    onAssignedToNameChange,
    onFirstNameBlur,
    onLastNameBlur,
    onWebsiteBlur,
    onEMailBlur,
    onAssignedToNameBlur,
    onAccountNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen7,
    setClose7,
    handleTabChange
  } = useTargetEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyTabs value={state.tabIndex} onChange={handleTabChange}>
          <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
          <MyTab icon={<MyHistoryIcon />} label="Primary Address" />
          <MyTab icon={<MyHistoryIcon />} label="Other Address" />
        </MyTabs>
        <MyTabPanel value={state.tabIndex} index={0}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="First Name"
                name="first_name"
                value={state.dtoTarget.first_name}
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
                value={state.dtoTarget.last_name}
                onChange={onInputChange}
                onBlur={onLastNameBlur}
                error={state.errorMessages.last_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Job Title" name="job_title_name" value={state.dtoTarget.job_title_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Department" name="department_name" value={state.dtoTarget.department_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Account Name"
                name="account_name"
                value={state.dtoTarget.account_name}
                onChange={onInputChange}
                onBlur={onAccountNameBlur}
                error={state.errorMessages.account_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.account_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Office Phone #"
                name="office_phone_no"
                value={state.dtoTarget.office_phone_no}
                onChange={onInputChange}
                //onBlur={onEMailBlur}
                //error={state.errorMessages.email ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.email}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Mobile #" name="mobile_no" value={state.dtoTarget.mobile_no} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Fax #" name="fax_no" value={state.dtoTarget.fax_no} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Website"
                name="website"
                value={state.dtoTarget.website}
                onChange={onInputChange}
                onBlur={onWebsiteBlur}
                error={state.errorMessages.website ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.website}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="E-Mail"
                name="email"
                value={state.dtoTarget.email}
                onChange={onInputChange}
                onBlur={onEMailBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoTarget.description}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoTarget.assigned_to, text: state.dtoTarget.assigned_to_user_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAssignedToLookup}
                onChange={onAssignedToNameChange}
                onBlur={onAssignedToNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Assigned To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAssignedToNameBlur}
                    error={state.errorMessages.assigned_to ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.assigned_to}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Referred By" name="referred_by" value={state.dtoTarget.referred_by} onChange={onInputChange} />
            </MyGrid>
          </MyGrid>
        </MyTabPanel>
        <MyTabPanel value={state.tabIndex} index={1}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={3}
                label="Address"
                name="primary_address"
                value={state.dtoTarget.primary_address}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="City" name="primary_city_name" value={state.dtoTarget.primary_city_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoTarget.primary_state_id, text: state.dtoTarget.primary_state_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrPrimaryStateLookup}
                onChange={onPrimaryStateNameChange}
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
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoTarget.primary_country_id, text: state.dtoTarget.primary_country_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCountryLookup}
                onChange={onPrimaryCountryNameChange}
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
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Zip Code" name="primary_zip_code" value={state.dtoTarget.primary_zip_code} onChange={onInputChange} />
            </MyGrid>
          </MyGrid>
        </MyTabPanel>
        <MyTabPanel value={state.tabIndex} index={2}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={3}
                label="Address"
                name="other_address"
                value={state.dtoTarget.other_address}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="City" name="other_city_name" value={state.dtoTarget.other_city_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoTarget.other_state_id, text: state.dtoTarget.other_state_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrOtherStateLookup}
                onChange={onOtherStateNameChange}
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
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open7}
                onOpen={setOpen7}
                onClose={setClose7}
                value={{ id: state.dtoTarget.other_country_id, text: state.dtoTarget.other_country_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCountryLookup}
                onChange={onOtherCountryNameChange}
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
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Zip Code" name="other_zip_code" value={state.dtoTarget.other_zip_code} onChange={onInputChange} />
            </MyGrid>
          </MyGrid>
        </MyTabPanel>
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

export default memo(TargetEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
