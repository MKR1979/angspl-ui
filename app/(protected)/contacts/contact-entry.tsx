'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useContactEntry from './useContactEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import ContactDTO from '@/app/types/ContactDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import LookupDTO from '@/app/types/LookupDTO';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';

type ContactEntryProps = {
  dtoContact: ContactDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrContactLookup: LookupDTO[];
  arrAccountLookup: LookupDTO[];
};

const ContactEntry = (props: ContactEntryProps) => {
  const {
    state,
    onInputChange,
    onMobileNoChange,
    onPrimaryStateNameChange,
    onPrimaryCountryNameChange,
    onOtherStateNameChange,
    onOtherCountryNameChange,
    onAssignedToNameChange,
    onLeadSourceNameChange,
    onReportsToNameChange,
    onAccountNameChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailBlur,
    onMobileNoBlur,
    onAssignedToNameBlur,
    onLeadSourceNameBlur,
    onAccountNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen7,
    setClose7,
    setOpen8,
    setClose8,
    handleTabChange
  } = useContactEntry(props);

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
                value={state.dtoContact.first_name}
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
                value={state.dtoContact.last_name}
                onChange={onInputChange}
                onBlur={onLastNameBlur}
                error={state.errorMessages.last_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Office Phone #"
                name="office_phone_no"
                value={state.dtoContact.office_phone_no}
                onChange={onInputChange}
                //onBlur={onEMailBlur}
                //error={state.errorMessages.email ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.email}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              {/* <MyTextField label="Mobile #" name="mobile_no" value={state.dtoContact.mobile_no} onChange={onInputChange} /> */}
              <MyPhoneNumber label="Mobile #" onChange={onMobileNoChange} value={state.dtoContact.mobile_no} onBlur={onMobileNoBlur} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="E-Mail"
                name="email"
                value={state.dtoContact.email}
                onChange={onInputChange}
                onBlur={onEMailBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Fax #" name="fax_no" value={state.dtoContact.fax_no} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Job Title" name="job_title_name" value={state.dtoContact.job_title_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Department" name="department_name" value={state.dtoContact.department_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoContact.account_id, text: state.dtoContact.account_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAccountLookup}
                onChange={onAccountNameChange}
                onBlur={onAccountNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Account Name"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAccountNameBlur}
                    error={state.errorMessages.account_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.account_id}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoContact.assigned_to, text: state.dtoContact.assigned_to_user_name }}
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
              <MyAutocomplete
                open={state.open7}
                onOpen={setOpen7}
                onClose={setClose7}
                value={{ id: state.dtoContact.lead_source_id, text: state.dtoContact.lead_source_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrLeadSourceLookup}
                onChange={onLeadSourceNameChange}
                onBlur={onLeadSourceNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Lead Source"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onLeadSourceNameBlur}
                    error={state.errorMessages.lead_source_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.lead_source_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open8}
                onOpen={setOpen8}
                onClose={setClose8}
                value={{
                  id: state.dtoContact.reports_to,
                  text: state.dtoContact.reports_to_name
                }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrContactLookup}
                onChange={onReportsToNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Reports To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoContact.description}
                onChange={onInputChange}
              />
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
                value={state.dtoContact.primary_address}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="City" name="primary_city_name" value={state.dtoContact.primary_city_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoContact.primary_state_id, text: state.dtoContact.primary_state_name }}
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
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoContact.primary_country_id, text: state.dtoContact.primary_country_name }}
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
              <MyTextField label="Zip Code" name="primary_zip_code" value={state.dtoContact.primary_zip_code} onChange={onInputChange} />
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
                value={state.dtoContact.other_address}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="City" name="other_city_name" value={state.dtoContact.other_city_name} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoContact.other_state_id, text: state.dtoContact.other_state_name }}
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
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoContact.other_country_id, text: state.dtoContact.other_country_name }}
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
              <MyTextField label="Zip Code" name="other_zip_code" value={state.dtoContact.other_zip_code} onChange={onInputChange} />
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

export default memo(ContactEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
