'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useAccountEntry from './useAccountEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import AccountDTO from '@/app/types/AccountDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import LookupDTO from '@/app/types/LookupDTO';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';

type AccountEntryProps = {
  dtoAccount: AccountDTO;
  arrCountryLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrAccountTypeLookup: LookupDTO[];
  arrIndustryLookup: LookupDTO[];
};

const AccountEntry = (props: AccountEntryProps) => {
  const {
    state,
    onInputChange,
    onPhoneNoChange,
    onBillingStateNameChange,
    onBillingCountryNameChange,
    onShippingStateNameChange,
    onShippingCountryNameChange,
    onAssignedToNameChange,
    onAccountTypeNameChange,
    onIndustryNameChange,
    onAccountNameBlur,
    onWebsiteBlur,
    onEMailBlur,
    onPhoneNoBlur,
    // onBillingAddressBlur,
    // onBillingCityNameBlur,
    // onBillingStateNameBlur,
    // onBillingCountryNameBlur,
    // onBillingZipCodeBlur,
    // onShippingAddressBlur,
    // onShippingCityNameBlur,
    // onShippingStateNameBlur,
    // onShippingCountryNameBlur,
    // onShippingZipCodeBlur,
    onAssignedToNameBlur,
    onAccountTypeNameBlur,
    onIndustryNameBlur,
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
    handleTabChange,
    onCopyClick
  } = useAccountEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyTabs value={state.tabIndex} onChange={handleTabChange}>
          <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
          <MyTab icon={<MyHistoryIcon />} label="Billing Address" />
          <MyTab icon={<MyHistoryIcon />} label="Shipping Address" />
        </MyTabs>
        <MyTabPanel value={state.tabIndex} index={0}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Account Name"
                name="account_name"
                value={state.dtoAccount.account_name}
                onChange={onInputChange}
                onBlur={onAccountNameBlur}
                error={state.errorMessages.account_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.account_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Website"
                name="website"
                value={state.dtoAccount.website}
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
                value={state.dtoAccount.email}
                onChange={onInputChange}
                onBlur={onEMailBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              {/* <MyTextField label="Phone #" name="phone_no" value={state.dtoAccount.phone_no} onChange={onInputChange} /> */}
              <MyPhoneNumber label="Phone #" onChange={onPhoneNoChange} value={state.dtoAccount.phone_no} onBlur={onPhoneNoBlur} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Fax #" name="fax_no" value={state.dtoAccount.fax_no} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoAccount.assigned_to, text: state.dtoAccount.assigned_to_user_name }}
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
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoAccount.account_type_id, text: state.dtoAccount.account_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAccountTypeLookup}
                onChange={onAccountTypeNameChange}
                onBlur={onAccountTypeNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Account Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAccountTypeNameBlur}
                    error={state.errorMessages.account_type_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.account_type_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open7}
                onOpen={setOpen7}
                onClose={setClose7}
                value={{ id: state.dtoAccount.industry_id, text: state.dtoAccount.industry_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrIndustryLookup}
                onChange={onIndustryNameChange}
                onBlur={onIndustryNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Industry"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onIndustryNameBlur}
                    error={state.errorMessages.industry_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.industry_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Annual Revenue" name="annual_revenue" value={state.dtoAccount.annual_revenue} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Head Count" name="head_count" value={state.dtoAccount.head_count} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoAccount.description}
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
                name="billing_address"
                value={state.dtoAccount.billing_address}
                onChange={onInputChange}
                //onBlur={onBillingAddressBlur}
                //error={state.errorMessages.billing_address ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.billing_address}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="City"
                name="billing_city_name"
                value={state.dtoAccount.billing_city_name}
                onChange={onInputChange}
                //onBlur={onBillingCityNameBlur}
                //error={state.errorMessages.billing_city_name ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.billing_city_name}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoAccount.billing_state_id, text: state.dtoAccount.billing_state_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrBillingStateLookup}
                onChange={onBillingStateNameChange}
                //={onBillingStateNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="State"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onBillingStateNameBlur}
                    //error={state.errorMessages.billing_state_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.billing_state_id}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoAccount.billing_country_id, text: state.dtoAccount.billing_country_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCountryLookup}
                onChange={onBillingCountryNameChange}
                //onBlur={onBillingCountryNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Country"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onBillingCountryNameBlur}
                    //error={state.errorMessages.billing_country_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.billing_country_id}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Zip Code"
                name="billing_zip_code"
                value={state.dtoAccount.billing_zip_code}
                onChange={onInputChange}
                //onBlur={onBillingZipCodeBlur}
                //={state.errorMessages.billing_zip_code ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.billing_zip_code}</MyTypography> */}
            </MyGrid>
          </MyGrid>
        </MyTabPanel>
        <MyTabPanel value={state.tabIndex} index={2}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyButton onClick={onCopyClick}>Copy from Billing Address</MyButton>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={3}
                label="Address"
                name="shipping_address"
                value={state.dtoAccount.shipping_address}
                onChange={onInputChange}
                //onBlur={onShippingAddressBlur}
                //error={state.errorMessages.shipping_address ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.shipping_address}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="City"
                name="shipping_city_name"
                value={state.dtoAccount.shipping_city_name}
                onChange={onInputChange}
                //onBlur={onShippingCityNameBlur}
                //error={state.errorMessages.shipping_city_name ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.shipping_city_name}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoAccount.shipping_state_id, text: state.dtoAccount.shipping_state_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrShippingStateLookup}
                onChange={onShippingStateNameChange}
                //onBlur={onShippingStateNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="State"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onShippingStateNameBlur}
                    //error={state.errorMessages.shipping_state_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.shipping_state_id}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoAccount.shipping_country_id, text: state.dtoAccount.shipping_country_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCountryLookup}
                onChange={onShippingCountryNameChange}
                //onBlur={onShippingCountryNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Country"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onShippingCountryNameBlur}
                    //error={state.errorMessages.shipping_country_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.shipping_country_id}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Zip Code"
                name="shipping_zip_code"
                value={state.dtoAccount.shipping_zip_code}
                onChange={onInputChange}
                //onBlur={onShippingZipCodeBlur}
                //error={state.errorMessages.shipping_zip_code ? true : false}
              />
              {/* <MyTypography className="error"> {state.errorMessages.shipping_zip_code}</MyTypography> */}
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

export default memo(AccountEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
