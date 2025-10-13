'use client';
import React, { memo } from 'react';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyTextField from '@/app/custom-components/MyTextField';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import useAdmissionDesk from './useAdmCollege';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import SuccessMessageAdmDesk from './SuccessMessageAdmDesk';
import * as gConstants from '../../../constants/constants';
import { Card } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyCardActions from '@/app/custom-components/MyCardActions';
import AdmissionClgDTO from '@/app/types/AdmissionClgDTO';
import MyCheckbox from '@/app/custom-components/MyCheckbox';
import { getAcademicSession } from '@/app/common/currentSession';
import { ClearIcon } from '@mui/x-date-pickers';
import { eq } from 'lodash';
import { useSelector } from '../../../store';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const ClientAdmCollege = () => {
  const {
    submitted,
    admissionNumber,
    state,
    saving,
    isSameAddress,
    studentId,
    onStudentSamagraIdBlur,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onGenderBlur,
    onInputChange,
    onPlainInputChange,
    onDobChange,
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
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen14,
    setClose14,
    setOpen17,
    setClose17,
    setOpen19,
    setClose19,
    setOpen20,
    setClose20,
    setOpen21,
    setClose21,
    setOpen22,
    setClose22,
    setOpen23,
    setClose23,
    setOpen24,
    setClose24,
    setOpen25,
    setClose25,
    setOpen26,
    setClose26,
    setOpen27,
    setClose27,
    setOpen28,
    setClose28,
    setOpen29,
    setClose29,
    setOpen30,
    setClose30,
    setOpen31,
    setClose31,
    setOpen32,
    setClose32,
    setOpen33,
    setClose33,
    setOpen34,
    setClose34,
    setOpen37,
    setClose37,
    setOpen35,
    setClose35,
    setOpen36,
    setClose36,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onMotherNameBlur,
    onFatherNameBlur,
    onAddressBlur,
    onCourseNameBlur,
    onUgCourseNameBlur,
    onCategoryBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onLookupValueChange,
    onCourseNameChange,
    onCityNameBlur,
    onZipCodeBlur,
    onFPhoneNoBlur,
    onFatherEMailIdBlur,
    onMPhoneNoBlur,
    onMotherEMailIdBlur,
    onMAadhaarNoBlur,
    onFAadhaarNoBlur,
    onStuAadhaarNoBlur,
    onAadhaarNoChange,
    onSamagraIdNumChange,
    onPenNoBlur,
    onPenNoChange,
    onFamilySamagraIdChange,
    onClearClick,
    onZipCodeChange,
    onFamilySamagraIdBlur,
    onCourseTypeBlur,
    onXBoardBlur,
    onXIIBoardBlur,
    onXIIYearBlur,
    onXYearBlur,
    onXIIPercentageBlur,
    onXPercentageBlur,
    onUgCollegeBlur,
    onUgUniversityBlur,
    onUgPassingYearBlur,
    onPgCgpaBlur,
    onUgCgpaBlur,
    onPgPassingYearBlur,
    onPgCourseNameBlur,
    onPgUniversityBlur,
    onPgCollegeBlur,
    onPassingYearChange,
    onDistrictNameBlur,
    onCorrAddressBlur,
    onCorrStateBlur,
    onCorrDistrictBlur,
    onCorrCityBlur,
    onCorrZipCodeBlur,
    onCorrCountryBlur,
    handleCheckboxChange,
    onIntermediateStreamBlur,
    onXiiRollNoBlur,
    onXRollNoBlur,
    onPgRegNoBlur,
    onCorrZipCodeChange,
    onUgRegNoBlur,
    onDiplomaCollegeBlur,
    onDiplomaUniversityBlur,
    onDiplomaRegNoBlur,
    onDiplomaCourseNameBlur,
    onDiplomaPassingYearBlur,
    onDiplomaCgpaBlur,
    onScholarshipTypeBlur,
    onPercentageChange,
    onEntryTypeBlur,
    onCgpaChange,
    onUndertakingChange,
    onAdmissionDateChange,
    onAdmissionDateBlur,
    onNormalizedInputChange
  } = useAdmissionDesk();

  const blackBorderSx = {
    '& .MuiInputLabel-root': {
      color: 'black'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#999999'
      },
      '&:hover fieldset': {
        borderColor: '#999999'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#999999'
      }
    }
  };

  const primaryEmail = state.dtoAdmissionClg.email || state.dtoAdmissionClg.father_email || state.dtoAdmissionClg.mother_email || '';
  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';
  const globalRegFee = parseFloat(siteConfig.find((c: { key: string }) => c.key === 'GLOBAL_REG_FEE')?.value ?? '0');
  const isGlobalRegFeeEnable =
    (siteConfig.find((c: { key: string }) => c.key === 'GLOBAL_REG_FEE_ENABLE')?.value ?? 'false').toLowerCase() === 'true';

  return (
    <>
      {submitted ? (
        <SuccessMessageAdmDesk
          name={`${state.dtoAdmissionClg.first_name} ${state.dtoAdmissionClg.last_name}`}
          user_id={studentId ?? 0}
          course_id={state.dtoAdmissionClg.course_id}
          course={state.dtoAdmissionClg.course_name}
          father_name={state.dtoAdmissionClg.father_name}
          mother_name={state.dtoAdmissionClg.mother_name}
          dob={state.dtoAdmissionClg.dob}
          category={state.dtoAdmissionClg.category}
          phone_no={state.dtoAdmissionClg.phone_no}
          email={primaryEmail}
          admissionNumber={admissionNumber}
          current_session={getAcademicSession()}
          payable_amount={isGlobalRegFeeEnable ? globalRegFee : state.dtoCourse.reg_fee}
        />
      ) : (
        <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <MyLocalizationProvider>
            <MyBox sx={{ width: { xs: '100%', sm: '65%' }, margin: '0 auto' }}>
              <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
                <MyGrid size={{ xs: 12 }}>
                  <MyBox sx={{ textAlign: 'center' }}>
                    <div className="admission-form-header">
                      {/* <img src="/companies-logo/visionCollegeLogo.png" alt="School Logo" className="school-logo" /> */}
                      <h2 style={{
                        color: '#fff',
                        backgroundColor: '#429bc4ff',
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '4px'
                      }}>Admission Form {getAcademicSession()}</h2>
                    </div>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999' }}>
                    Personal Details
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="First Name"
                    name="first_name"
                    value={state.dtoAdmissionClg.first_name}
                    onChange={onInputChange}
                    placeholder="Enter First Name"
                    inputProps={{
                      maxLength: gConstants.FIRST_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onFirstNameBlur}
                    error={state.errorMessages.first_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.first_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Last Name"
                    name="last_name"
                    value={state.dtoAdmissionClg.last_name}
                    onChange={onInputChange}
                    placeholder="Enter Last Name"
                    inputProps={{
                      maxLength: gConstants.LAST_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onLastNameBlur}
                    error={state.errorMessages.last_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 4 }}>
                  <MyAutocomplete
                    open={state.open2}
                    onOpen={setOpen2}
                    onClose={setClose2}
                    value={{ text: state.dtoAdmissionClg.gender }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrGenderTypeLookup}
                    onChange={onPassingYearChange('gender')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Gender"
                        placeholder="Select Gender..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        onBlur={onGenderBlur}
                        error={state.errorMessages.gender ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.gender}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 4 }}>
                  <MyDatePicker
                    label="Date Of Birth"
                    onChange={onDobChange}
                    value={
                      dayjs(state.dtoAdmissionClg.dob).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                        ? null
                        : dayjs(state.dtoAdmissionClg.dob).tz(customerTimezone).toDate()
                    }
                    onBlur={onDobBlur}
                    minDate={dayjs(gConstants.DATE_OF_BIRTH2).toDate()}                 // earliest allowed date
                    maxDate={dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
                    // sx={blackBorderSx}
                    error={!!state.errorMessages.dob}
                  // shouldDisableDate={(date) => {
                  //   const lessThanFiveYears = dayjs(date).isAfter(dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR));

                  //   const before1950 = dayjs(date).isBefore(dayjs(gConstants.DATE_OF_BIRTH2));
                  //   return lessThanFiveYears || before1950;
                  // }}
                  />
                  <MyTypography className="error">{state.errorMessages.dob}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 4 }}>
                  <MyAutocomplete
                    open={state.open3}
                    onOpen={setOpen3}
                    onClose={setClose3}
                    value={{ text: state.dtoAdmissionClg.category }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCategoryTypeLookup}
                    onChange={onPassingYearChange('category')}
                    onBlur={onCategoryBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Category"
                        placeholder="Select Category..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.category ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.category}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Contact Details
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="E-Mail"
                    name="email"
                    value={state.dtoAdmissionClg.email}
                    onChange={onNormalizedInputChange}
                    placeholder="Enter Email"
                    inputProps={{
                      maxLength: gConstants.EMAIL_LENGTH,
                      pattern: '^[a-zA-Z0-9]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onEMailIdBlur}
                    error={state.errorMessages.email ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyPhoneNumber
                    label="Mobile #"
                    onChange={onPhoneNoChange('phone_no')}
                    placeholder="Enter 10-Digit Mobile Number"
                    value={state.dtoAdmissionClg.phone_no}
                    onBlur={onPhoneNoBlur}
                    sx={blackBorderSx}
                    error={state.errorMessages.phone_no ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    <u>Permanent Address:</u>
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Address"
                    name="address"
                    value={state.dtoAdmissionClg.address}
                    onChange={onInputChange}
                    onBlur={onAddressBlur}
                    placeholder="Enter Your Address"
                    inputProps={{
                      maxLength: gConstants.ADDRESS_LENGTH,
                      pattern: '^[a-zA-Z0-9]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.address ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open4}
                    onOpen={setOpen4}
                    onClose={setClose4}
                    value={{
                      id: state.dtoAdmissionClg.country_id,
                      text: state.dtoAdmissionClg.country_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCountryLookup}
                    onChange={onLookupValueChange('country')}
                    onBlur={onCountryNameBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Country"
                        placeholder="Select Country Name"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.country_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.country_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open5}
                    onOpen={setOpen5}
                    onClose={setClose5}
                    value={{
                      id: state.dtoAdmissionClg.state_id,
                      text: state.dtoAdmissionClg.state_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrStateLookup}
                    onChange={onLookupValueChange('state')}
                    onBlur={onStateNameBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="State"
                        placeholder="Select State Name"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.state_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.state_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open28}
                    onOpen={setOpen28}
                    onClose={setClose28}
                    value={{
                      id: state.dtoAdmissionClg.district_id,
                      text: state.dtoAdmissionClg.district_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrDistrictLookup}
                    onChange={onLookupValueChange('district')}
                    onBlur={onDistrictNameBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="District"
                        placeholder="Select District"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.district_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.district_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="City Name"
                    name="city_name"
                    value={state.dtoAdmissionClg.city_name}
                    onChange={onInputChange}
                    onBlur={onCityNameBlur}
                    placeholder="Enter City Name"
                    inputProps={{
                      maxLength: gConstants.SCHOOL_NAME_LENGTH
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.city_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Zip code"
                    name="zip_code"
                    value={state.dtoAdmissionClg.zip_code || ''}
                    onChange={onZipCodeChange}
                    onBlur={onZipCodeBlur}
                    placeholder="Enter 6-digit Zip code"
                    inputProps={{
                      maxLength: gConstants.ZIP_CODE_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.zip_code ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyBox sx={{ display: 'flex', alignItems: 'center' }}>
                    <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mr: 1 }}>
                      <u>Correspondence Address:</u>
                    </MyTypography>
                    <MyTypography variant="body2" sx={{ ml: 1 }}>
                      Same as Permanent Address
                    </MyTypography>
                    <MyCheckbox sx={{ ml: 1 }} checked={isSameAddress} onChange={handleCheckboxChange} />
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Address"
                    name="corr_address"
                    value={state.dtoAdmissionClg.corr_address}
                    onChange={onInputChange}
                    onBlur={onCorrAddressBlur}
                    placeholder="Enter Address"
                    inputProps={{
                      maxLength: gConstants.ADDRESS_LENGTH,
                      pattern: '^[a-zA-Z0-9]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.corr_address ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_address}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open29}
                    onOpen={setOpen29}
                    onClose={setClose29}
                    value={{
                      id: state.dtoAdmissionClg.corr_country_id,
                      text: state.dtoAdmissionClg.corr_country_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCountryLookup}
                    onChange={onLookupValueChange('corr_country')}
                    onBlur={onCorrCountryBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Country"
                        placeholder="Select Country"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.corr_country_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_country_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open30}
                    onOpen={setOpen30}
                    onClose={setClose30}
                    value={{
                      id: state.dtoAdmissionClg.corr_state_id,
                      text: state.dtoAdmissionClg.corr_state_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCorrStateLookup}
                    onChange={onLookupValueChange('corr_state')}
                    onBlur={onCorrStateBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="State"
                        placeholder="Select State"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.corr_state_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_state_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open31}
                    onOpen={setOpen31}
                    onClose={setClose31}
                    value={{
                      id: state.dtoAdmissionClg.corr_district_id,
                      text: state.dtoAdmissionClg.corr_district_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCorrDistrictLookup}
                    onChange={onLookupValueChange('corr_district')}
                    onBlur={onCorrDistrictBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="District"
                        placeholder="Select District"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.corr_district_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_district_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="City Name"
                    name="corr_city_name"
                    value={state.dtoAdmissionClg.corr_city_name}
                    onChange={onInputChange}
                    onBlur={onCorrCityBlur}
                    placeholder="Enter City"
                    sx={blackBorderSx}
                    error={state.errorMessages.corr_city_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_city_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Zip code"
                    name="corr_zip_code"
                    value={state.dtoAdmissionClg.corr_zip_code || ''}
                    onChange={onCorrZipCodeChange}
                    onBlur={onCorrZipCodeBlur}
                    placeholder="Enter 6-digit Zip code"
                    inputProps={{
                      maxLength: gConstants.ZIP_CODE_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.corr_zip_code ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.corr_zip_code}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Admission Details
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyDatePicker
                    label="Admission Date"
                    onChange={onAdmissionDateChange}
                    value={
                      dayjs(state.dtoAdmissionClg.admission_date).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                        ? null
                        : dayjs(state.dtoAdmissionClg.admission_date).tz(customerTimezone).toDate()
                    }
                    onBlur={onAdmissionDateBlur}
                    minDate={dayjs().subtract(gConstants.ADMISSION_DATE_TILL_DAYS, 'day').toDate()}   // sirf pichle 7 din
                    maxDate={dayjs().toDate()}
                    error={!!state.errorMessages.admission_date}
                  // shouldDisableDate={(date) => {
                  //   const today = dayjs().tz(customerTimezone);
                  //   const oneWeekAgo = today.subtract(gConstants.ADMISSION_DATE_TILL_DAYS, 'day');
                  //   const selected = dayjs(date).tz(customerTimezone);
                  //   return selected.isBefore(oneWeekAgo, 'day') || selected.isAfter(today, 'day');
                  // }}
                  />
                  <MyTypography className="error">{state.errorMessages.admission_date}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyAutocomplete
                    open={state.open19}
                    onOpen={setOpen19}
                    onClose={setClose19}
                    value={{
                      id: state.dtoAdmissionClg.course_type_id,
                      text: state.dtoAdmissionClg.course_type_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCourseTypeLookup}
                    onChange={onLookupValueChange('course_type')}
                    onBlur={onCourseTypeBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Course Type"
                        placeholder="Select Course Type..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.course_type_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.course_type_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyAutocomplete
                    open={state.open1}
                    onOpen={setOpen1}
                    onClose={setClose1}
                    value={{
                      id: state.dtoAdmissionClg.course_id,
                      text: state.dtoAdmissionClg.course_name
                    }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCourseLookup}
                    onChange={onCourseNameChange}
                    onBlur={onCourseNameBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Course"
                        placeholder="Select Course..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.course_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.course_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyAutocomplete
                    open={state.open32}
                    onOpen={setOpen32}
                    onClose={setClose32}
                    value={{ text: state.dtoAdmissionClg.entry_type }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrEntryTypeLookup}
                    onChange={onPassingYearChange('entry_type')}
                    onBlur={onEntryTypeBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Entry Type"
                        placeholder="Select Entry Type..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.entry_type ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.entry_type}</MyTypography>
                </MyGrid>{' '}
                {state.dtoCourse.is10threq && (
                  <>
                    <MyGrid size={{ xs: 12 }}>
                      <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        <u>Educational Details (School):</u>
                      </MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open20}
                        onOpen={setOpen20}
                        onClose={setClose20}
                        value={{ text: state.dtoAdmissionClg.high_school_board }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduBoardTypeLookup}
                        onChange={onPassingYearChange('high_school_board')}
                        onBlur={onXBoardBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="High School Board"
                            placeholder="Select Board..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.high_school_board ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.high_school_board}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 3 }}>
                      <MyAutocomplete
                        open={state.open22}
                        onOpen={setOpen22}
                        onClose={setClose22}
                        value={{ text: state.dtoAdmissionClg.high_school_year }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduPassingYear}
                        onChange={onPassingYearChange('high_school_year')}
                        onBlur={onXYearBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="High School Year"
                            placeholder="Select Year..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.high_school_year ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.high_school_year}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 2.5 }}>
                      <MyTextField
                        label="High School Roll No"
                        name="high_school_roll_no"
                        value={state.dtoAdmissionClg.high_school_roll_no}
                        onChange={onPlainInputChange}
                        onBlur={onXRollNoBlur}
                        inputProps={{
                          maxLength: gConstants.ROLL_NO_LENGTH,
                          pattern: '^[A-Za-z]{1,2}$'
                        }}
                        placeholder="Enter Roll No"
                        sx={blackBorderSx}
                        error={state.errorMessages.high_school_roll_no ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.high_school_roll_no}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 2.5 }}>
                      <MyTextField
                        label="High School Percentage"
                        name="high_school_percentage"
                        value={state.dtoAdmissionClg.high_school_percentage || ''}
                        onChange={onPercentageChange('high_school_percentage')}
                        placeholder="Enter 10th %"
                        inputProps={{
                          maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        sx={blackBorderSx}
                        onBlur={onXPercentageBlur}
                        error={state.errorMessages.high_school_percentage ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.high_school_percentage}</MyTypography>
                    </MyGrid>
                  </>
                )}
                {state.dtoCourse.is12threq && (
                  <>
                    {!state.dtoCourse.is10threq && (
                      <MyGrid size={{ xs: 12 }}>
                        <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                          <u>Educational Details (School):</u>
                        </MyTypography>
                      </MyGrid>
                    )}
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open21}
                        onOpen={setOpen21}
                        onClose={setClose21}
                        value={{ text: state.dtoAdmissionClg.intermediate_board }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduBoardTypeLookup}
                        onChange={onPassingYearChange('intermediate_board')}
                        onBlur={onXIIBoardBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Intermediate Board"
                            placeholder="Select Board..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.intermediate_board ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.intermediate_board}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 3 }}>
                      <MyAutocomplete
                        open={state.open23}
                        onOpen={setOpen23}
                        onClose={setClose23}
                        // value={state.dtoAdmissionClg.intermediate_year}
                        value={{ text: state.dtoAdmissionClg.intermediate_year }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduPassingYear}
                        onChange={onPassingYearChange('intermediate_year')}
                        onBlur={onXIIYearBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Intermediate Year"
                            placeholder="Select Year..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.intermediate_year ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.intermediate_year}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 2.5 }}>
                      <MyTextField
                        label="Intermediate Roll No"
                        name="intermediate_roll_no"
                        value={state.dtoAdmissionClg.intermediate_roll_no}
                        onChange={onPlainInputChange}
                        onBlur={onXiiRollNoBlur}
                        placeholder="Enter Roll No"
                        inputProps={{
                          maxLength: gConstants.ROLL_NO_LENGTH,
                          pattern: '^[A-Za-z]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.intermediate_roll_no ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.intermediate_roll_no}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 2.5 }}>
                      <MyTextField
                        label="Intermediate Percentage"
                        name="intermediate_percentage"
                        value={state.dtoAdmissionClg.intermediate_percentage || ''}
                        onChange={onPercentageChange('intermediate_percentage')}
                        placeholder="Enter 12th %"
                        sx={blackBorderSx}
                        inputProps={{
                          maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        onBlur={onXIIPercentageBlur}
                        error={state.errorMessages.intermediate_percentage ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.intermediate_percentage}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open17}
                        onOpen={setOpen17}
                        onClose={setClose17}
                        value={{ text: state.dtoAdmissionClg.intermediate_stream }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrStreamTypeLookup}
                        onChange={onPassingYearChange('intermediate_stream')}
                        onBlur={onIntermediateStreamBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Intermediate Stream"
                            placeholder="Select Stream"
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.intermediate_stream ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.intermediate_stream}</MyTypography>
                    </MyGrid>
                  </>
                )}
                {state.dtoCourse.isdiplomareq && (
                  <>
                    <MyGrid size={{ xs: 12 }}>
                      <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        <u>Educational Details (Diploma):</u>
                      </MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Diploma College"
                        name="diploma_college"
                        value={state.dtoAdmissionClg.diploma_college}
                        onChange={onInputChange}
                        onBlur={onDiplomaCollegeBlur}
                        placeholder="Enter College Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.diploma_college ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_college}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Diploma University"
                        name="diploma_university"
                        value={state.dtoAdmissionClg.diploma_university}
                        onChange={onInputChange}
                        onBlur={onDiplomaUniversityBlur}
                        placeholder="Enter University Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.diploma_university ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_university}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Registration / Enrollment No."
                        name="diploma_registration_no"
                        value={state.dtoAdmissionClg.diploma_registration_no}
                        onChange={onPlainInputChange}
                        onBlur={onDiplomaRegNoBlur}
                        inputProps={{
                          maxLength: gConstants.ROLL_NO_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        placeholder="Diploma Reg./Enroll No."
                        sx={blackBorderSx}
                        error={state.errorMessages.diploma_registration_no ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_registration_no}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open33}
                        onOpen={setOpen33}
                        onClose={setClose33}
                        value={{
                          id: state.dtoAdmissionClg.diploma_course_id,
                          text: state.dtoAdmissionClg.diploma_course_name
                        }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrCourseLookup}
                        onChange={onLookupValueChange('diploma_course')}
                        onBlur={onDiplomaCourseNameBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Diploma Course"
                            placeholder="Select Diploma Course..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.diploma_course_name ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_course_name}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open34}
                        onOpen={setOpen34}
                        onClose={setClose34}
                        value={{ text: state.dtoAdmissionClg.diploma_passing_year }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduPassingYear}
                        onChange={onPassingYearChange('diploma_passing_year')}
                        onBlur={onDiplomaPassingYearBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="Diploma Passing Year"
                            placeholder="Select Year..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.diploma_passing_year ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_passing_year}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Diploma CGPA"
                        name="diploma_cgpa"
                        value={state.dtoAdmissionClg.diploma_cgpa || ''}
                        onChange={onCgpaChange('diploma_cgpa')}
                        placeholder="Enter CGPA"
                        inputProps={{
                          maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        onBlur={onDiplomaCgpaBlur}
                        sx={blackBorderSx}
                        error={state.errorMessages.diploma_cgpa ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.diploma_cgpa}</MyTypography>
                    </MyGrid>
                  </>
                )}
                {state.dtoCourse.isgradreq && (
                  <>
                    <MyGrid size={{ xs: 12 }}>
                      <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        <u>Educational Details (Graduation):</u>
                      </MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="UG College"
                        name="ug_college"
                        value={state.dtoAdmissionClg.ug_college}
                        onChange={onInputChange}
                        onBlur={onUgCollegeBlur}
                        placeholder="Enter College Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.ug_college ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_college}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="UG University"
                        name="ug_university"
                        value={state.dtoAdmissionClg.ug_university}
                        onChange={onInputChange}
                        onBlur={onUgUniversityBlur}
                        placeholder="Enter University Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.ug_university ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_university}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Registration / Enrollment No."
                        name="ug_registration_no"
                        value={state.dtoAdmissionClg.ug_registration_no}
                        onChange={onPlainInputChange}
                        onBlur={onUgRegNoBlur}
                        inputProps={{
                          maxLength: gConstants.ROLL_NO_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        placeholder="UG Reg./Enroll No."
                        sx={blackBorderSx}
                        error={state.errorMessages.ug_registration_no ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_registration_no}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open24}
                        onOpen={setOpen24}
                        onClose={setClose24}
                        value={{
                          id: state.dtoAdmissionClg.ug_course_id,
                          text: state.dtoAdmissionClg.ug_course_name
                        }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrCourseLookup}
                        onChange={onLookupValueChange('ug_course')}
                        onBlur={onUgCourseNameBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="UG Course"
                            placeholder="Select UG Course..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.ug_course_name ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_course_name}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open25}
                        onOpen={setOpen25}
                        onClose={setClose25}
                        value={{ text: state.dtoAdmissionClg.ug_passing_year }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduPassingYear}
                        onChange={onPassingYearChange('ug_passing_year')}
                        onBlur={onUgPassingYearBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="UG Passing Year"
                            placeholder="Select Year..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.ug_passing_year ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_passing_year}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="UG CGPA"
                        name="ug_cgpa"
                        value={state.dtoAdmissionClg.ug_cgpa || ''}
                        onChange={onCgpaChange('ug_cgpa')}
                        placeholder="Enter CGPA"
                        inputProps={{
                          maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        onBlur={onUgCgpaBlur}
                        sx={blackBorderSx}
                        error={state.errorMessages.ug_cgpa ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.ug_cgpa}</MyTypography>
                    </MyGrid>
                  </>
                )}
                {state.dtoCourse.ispgreq && (
                  <>
                    <MyGrid size={{ xs: 12 }}>
                      <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        <u>Educational Details (Post Graduation):</u>
                      </MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="PG College"
                        name="pg_college"
                        value={state.dtoAdmissionClg.pg_college}
                        onChange={onInputChange}
                        onBlur={onPgCollegeBlur}
                        placeholder="Enter College Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.pg_college ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_college}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="PG University"
                        name="pg_university"
                        value={state.dtoAdmissionClg.pg_university}
                        onChange={onInputChange}
                        onBlur={onPgUniversityBlur}
                        placeholder="Enter University Name"
                        inputProps={{
                          maxLength: gConstants.PASSWORD_MAX_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        sx={blackBorderSx}
                        error={state.errorMessages.pg_university ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_university}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="Registration / Enrollment No."
                        name="pg_registration_no"
                        value={state.dtoAdmissionClg.pg_registration_no}
                        onChange={onPlainInputChange}
                        onBlur={onPgRegNoBlur}
                        inputProps={{
                          maxLength: gConstants.ROLL_NO_LENGTH,
                          pattern: '^[a-zA-Z0-9]{1,2}$'
                        }}
                        placeholder="PG Reg./Enroll No."
                        sx={blackBorderSx}
                        error={state.errorMessages.pg_registration_no ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_registration_no}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open26}
                        onOpen={setOpen26}
                        onClose={setClose26}
                        value={{
                          id: state.dtoAdmissionClg.pg_course_id,
                          text: state.dtoAdmissionClg.pg_course_name
                        }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrCourseLookup}
                        onChange={onLookupValueChange('pg_course')}
                        onBlur={onPgCourseNameBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="PG Course"
                            placeholder="Select Course..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.pg_course_name ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_course_name}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyAutocomplete
                        open={state.open27}
                        onOpen={setOpen27}
                        onClose={setClose27}
                        value={{ text: state.dtoAdmissionClg.pg_passing_year }}
                        getOptionLabel={(option: any) => option.text}
                        firstitem={{ id: 0, text: '' }}
                        options={state.arrEduPassingYear}
                        onChange={onPassingYearChange('pg_passing_year')}
                        onBlur={onPgPassingYearBlur}
                        filterOptions={(options, state) => {
                          const searchTerm = state.inputValue.toLowerCase();
                          return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                        }}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            label="PG Passing Year"
                            placeholder="Select Year..."
                            sx={blackBorderSx}
                            slotProps={{
                              inputLabel: { shrink: true }
                            }}
                            error={state.errorMessages.pg_passing_year ? true : false}
                          />
                        )}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_passing_year}</MyTypography>
                    </MyGrid>
                    <MyGrid size={{ xs: 12, sm: 4 }}>
                      <MyTextField
                        label="PG CGPA"
                        name="pg_cgpa"
                        value={state.dtoAdmissionClg.pg_cgpa || ''}
                        onChange={onCgpaChange('pg_cgpa')}
                        placeholder="Enter CGPA"
                        inputProps={{
                          maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        sx={blackBorderSx}
                        onBlur={onPgCgpaBlur}
                        error={state.errorMessages.pg_cgpa ? true : false}
                      />
                      <MyTypography className="error"> {state.errorMessages.pg_cgpa}</MyTypography>
                    </MyGrid>
                  </>
                )}
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Additional Details
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Student Aadhaar Number"
                    name="student_aadhaar_no"
                    value={state.dtoAdmissionClg.student_aadhaar_no}
                    onChange={onAadhaarNoChange('student_aadhaar_no')}
                    onBlur={onStuAadhaarNoBlur}
                    placeholder="Student's Aadhaar No..."
                    inputProps={{
                      maxLength: gConstants.AADHAAR_NO_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.student_aadhaar_no}
                  />
                  <MyTypography className="error">{state.errorMessages.student_aadhaar_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Samagra ID No.(Student)"
                    name="samagra_id_no"
                    value={state.dtoAdmissionClg.samagra_id_no}
                    onChange={onSamagraIdNumChange}
                    placeholder="Student's Samagra Id"
                    onBlur={onStudentSamagraIdBlur}
                    inputProps={{
                      maxLength: gConstants.SAMAGRA_ID_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.samagra_id_no}
                  />
                  <MyTypography className="error">{state.errorMessages.samagra_id_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Student PEN No"
                    name="student_pen_no"
                    value={state.dtoAdmissionClg.student_pen_no}
                    onChange={onPenNoChange}
                    onBlur={onPenNoBlur}
                    placeholder="Enter 11-digit PEN No"
                    inputProps={{
                      maxLength: gConstants.PEN_NO_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.student_pen_no}
                  />
                  <MyTypography className="error">{state.errorMessages.student_pen_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open6}
                    onOpen={setOpen6}
                    onClose={setClose6}
                    value={{ text: state.dtoAdmissionClg.religion }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrReligionTypeLookup}
                    onChange={onPassingYearChange('religion')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Religion"
                        placeholder="Select Religion..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.religion ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.religion}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open14}
                    onOpen={setOpen14}
                    onClose={setClose14}
                    value={{ text: state.dtoAdmissionClg.transport_facility }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrStuMasterTypeLookup}
                    onChange={onPassingYearChange('transport_facility')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Transport Facility"
                        placeholder="Select YES/NO..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                      />
                    )}
                  />
                </MyGrid>
                {state.dtoAdmissionClg.transport_facility === 'Yes' && (
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyAutocomplete
                      open={state.open35}
                      onOpen={setOpen35}
                      onClose={setClose35}
                      value={{ text: state.dtoAdmissionClg.transport_route }}
                      getOptionLabel={(option: any) => option.text}
                      firstitem={{ id: 0, text: '' }}
                      options={state.arrRouteTypeLookup}
                      onChange={onPassingYearChange('transport_route')}
                      filterOptions={(options, state) => {
                        const searchTerm = state.inputValue.toLowerCase();
                        return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                      }}
                      renderInput={(params) => (
                        <MyTextField
                          {...params}
                          label="Transport Route"
                          placeholder="Select Route"
                          sx={blackBorderSx}
                          slotProps={{
                            inputLabel: { shrink: true }
                          }}
                        />
                      )}
                    />
                  </MyGrid>
                )}
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open36}
                    onOpen={setOpen36}
                    onClose={setClose36}
                    value={{ text: state.dtoAdmissionClg.hostel_facility }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrStuMasterTypeLookup}
                    onChange={onPassingYearChange('hostel_facility')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Hostel Facility"
                        placeholder="Select YES/NO..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                      />
                    )}
                  />
                </MyGrid>
                {state.dtoAdmissionClg.hostel_facility === 'Yes' && (
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyAutocomplete
                      open={state.open37}
                      onOpen={setOpen37}
                      onClose={setClose37}
                      value={{ text: state.dtoAdmissionClg.hostel_occupancy }}
                      getOptionLabel={(option: any) => option.text}
                      firstitem={{ id: 0, text: '' }}
                      options={state.arrHostelTypeLookup}
                      onChange={onPassingYearChange('hostel_occupancy')}
                      filterOptions={(options, state) => {
                        const searchTerm = state.inputValue.toLowerCase();
                        return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                      }}
                      renderInput={(params) => (
                        <MyTextField
                          {...params}
                          label="Hostel Occupancy Type"
                          placeholder="Select Type"
                          sx={blackBorderSx}
                          slotProps={{
                            inputLabel: { shrink: true }
                          }}
                        />
                      )}
                    />
                  </MyGrid>
                )}
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open7}
                    onOpen={setOpen7}
                    onClose={setClose7}
                    value={{ text: state.dtoAdmissionClg.blood_group }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrBloodGrpTypeLookup}
                    onChange={onPassingYearChange('blood_group')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Blood Group"
                        placeholder="Select Blood Group..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.blood_group ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.blood_group}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open8}
                    onOpen={setOpen8}
                    onClose={setClose8}
                    value={{ text: state.dtoAdmissionClg.scholarship_student }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrStuMasterTypeLookup}
                    onChange={onPassingYearChange('scholarship_student')}
                    onBlur={onScholarshipTypeBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Is Scholarship Student"
                        placeholder="Select Yes/No"
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.scholarship_student ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.scholarship_student}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open10}
                    onOpen={setOpen10}
                    onClose={setClose10}
                    value={{ text: state.dtoAdmissionClg.medium }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrMediumTypeLookup}
                    onChange={onPassingYearChange('medium')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Medium"
                        placeholder="Select Medium..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.medium ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.medium}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Parents Details
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Name"
                    name="father_name"
                    value={state.dtoAdmissionClg.father_name}
                    onChange={onInputChange}
                    placeholder="Enter Father Name"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onFatherNameBlur}
                    error={state.errorMessages.father_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Qualification"
                    name="father_qualification"
                    value={state.dtoAdmissionClg.father_qualification}
                    onChange={onInputChange}
                    placeholder="Enter Father Qualification"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.father_qualification ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_qualification}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Occupation"
                    name="father_occupation"
                    value={state.dtoAdmissionClg.father_occupation}
                    onChange={onInputChange}
                    placeholder="Enter Father Occupation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.father_occupation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_occupation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Organisation"
                    name="father_organisation"
                    value={state.dtoAdmissionClg.father_organisation}
                    onChange={onInputChange}
                    placeholder="Enter Father Organisation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.father_organisation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_organisation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Designation"
                    name="father_designation"
                    value={state.dtoAdmissionClg.father_designation}
                    onChange={onInputChange}
                    placeholder="Enter Father Designation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.father_designation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_designation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father E-Mail"
                    name="father_email"
                    value={state.dtoAdmissionClg.father_email}
                    onChange={onNormalizedInputChange}
                    placeholder="Enter Father Email"
                    inputProps={{
                      maxLength: gConstants.EMAIL_LENGTH,
                      pattern: '^[a-zA-Z0-9]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onFatherEMailIdBlur}
                    error={state.errorMessages.father_email ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyPhoneNumber
                    label="Father Phone No"
                    onChange={onPhoneNoChange('father_phone_no')}
                    value={state.dtoAdmissionClg.father_phone_no}
                    onBlur={onFPhoneNoBlur}
                    sx={blackBorderSx}
                    error={state.errorMessages.father_phone_no ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.father_phone_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Father Aadhaar Number"
                    name="father_aadhaar_no"
                    value={state.dtoAdmissionClg.father_aadhaar_no}
                    onChange={onAadhaarNoChange('father_aadhaar_no')}
                    onBlur={onFAadhaarNoBlur}
                    placeholder="Father's Aadhaar No..."
                    inputProps={{
                      maxLength: gConstants.AADHAAR_NO_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.father_aadhaar_no}
                  />
                  <MyTypography className="error">{state.errorMessages.father_aadhaar_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Name"
                    name="mother_name"
                    value={state.dtoAdmissionClg.mother_name}
                    onChange={onInputChange}
                    placeholder="Enter Mother Name"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onMotherNameBlur}
                    error={state.errorMessages.mother_name ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Qualification"
                    name="mother_qualification"
                    value={state.dtoAdmissionClg.mother_qualification}
                    onChange={onInputChange}
                    placeholder="Enter Mother Qualification"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.mother_qualification ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_qualification}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Occupation"
                    name="mother_occupation"
                    value={state.dtoAdmissionClg.mother_occupation}
                    onChange={onInputChange}
                    placeholder="Enter Mother Occupation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.mother_occupation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_occupation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Organisation"
                    name="mother_organisation"
                    value={state.dtoAdmissionClg.mother_organisation}
                    onChange={onInputChange}
                    placeholder="Enter Mother Organisation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.mother_organisation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_organisation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Designation"
                    name="mother_designation"
                    value={state.dtoAdmissionClg.mother_designation}
                    onChange={onInputChange}
                    placeholder="Enter Mother Designation"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    error={state.errorMessages.mother_designation ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_designation}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother E-Mail"
                    name="mother_email"
                    value={state.dtoAdmissionClg.mother_email}
                    onChange={onNormalizedInputChange}
                    placeholder="Enter Mother Email"
                    inputProps={{
                      maxLength: gConstants.EMAIL_LENGTH,
                      pattern: '^[a-zA-Z0-9]{1,2}$'
                    }}
                    sx={blackBorderSx}
                    onBlur={onMotherEMailIdBlur}
                    error={state.errorMessages.mother_email ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyPhoneNumber
                    label="Mother Phone No"
                    onChange={onPhoneNoChange('mother_phone_no')}
                    value={state.dtoAdmissionClg.mother_phone_no}
                    onBlur={onMPhoneNoBlur}
                    sx={blackBorderSx}
                    error={state.errorMessages.mother_phone_no ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.mother_phone_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Mother Aadhaar Number"
                    name="mother_aadhaar_no"
                    value={state.dtoAdmissionClg.mother_aadhaar_no}
                    onChange={onAadhaarNoChange('mother_aadhaar_no')}
                    onBlur={onMAadhaarNoBlur}
                    placeholder="Mother's Aadhaar No..."
                    inputProps={{
                      maxLength: gConstants.AADHAAR_NO_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.mother_aadhaar_no}
                  />
                  <MyTypography className="error">{state.errorMessages.mother_aadhaar_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Family Samagra Id"
                    name="family_samagra_id"
                    value={state.dtoAdmissionClg.family_samagra_id}
                    onChange={onFamilySamagraIdChange}
                    onBlur={onFamilySamagraIdBlur}
                    placeholder="Family Samagra Id"
                    inputProps={{
                      maxLength: gConstants.FAMILY_SAMAGRA_ID_LENGTH,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    sx={blackBorderSx}
                    error={!!state.errorMessages.family_samagra_id}
                  />
                  <MyTypography className="error">{state.errorMessages.family_samagra_id}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Any Other Information
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open11}
                    onOpen={setOpen11}
                    onClose={setClose11}
                    value={{ text: state.dtoAdmissionClg.staff_child }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrStuMasterTypeLookup}
                    onChange={onPassingYearChange('staff_child')}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Staff Child"
                        placeholder="Select YES/NO..."
                        sx={blackBorderSx}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                      />
                    )}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Sibling in College"
                    name="sibling_in_college"
                    value={state.dtoAdmissionClg.sibling_in_college}
                    onChange={onPlainInputChange}
                    placeholder="Enter Sibling Enroll. No."
                    sx={blackBorderSx}
                    inputProps={{
                      maxLength: gConstants.ROLL_NO_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Parents Ex College"
                    name="parents_ex_college"
                    value={state.dtoAdmissionClg.parents_ex_college}
                    onChange={onPlainInputChange}
                    placeholder="Enter Parent's Enroll. No."
                    inputProps={{
                      maxLength: gConstants.ROLL_NO_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Guardian Name"
                    name="guardian_name"
                    value={state.dtoAdmissionClg.guardian_name}
                    onChange={onInputChange}
                    placeholder="Enter Guardian Name"
                    inputProps={{
                      maxLength: gConstants.FULL_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    sx={blackBorderSx}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyPhoneNumber
                    label="Contact No"
                    onChange={onPhoneNoChange('guardian_phone_no')}
                    value={state.dtoAdmissionClg.guardian_phone_no}
                  />
                </MyGrid>
                <MyGrid container spacing={2}>
                  <MyGrid size={{ xs: 12 }}>
                    <MyTypography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderBottom: '2px solid #999999',
                        pb: 0,
                        mb: 1,
                        textAlign: 'left'
                      }}
                    >
                      Upload Documents
                    </MyTypography>
                  </MyGrid>
                  {[
                    ...(state.dtoCourse.isphotoidreq ? [{ label: 'Photo', name: 'photo' }] : []),
                    ...(state.dtoCourse.is_aadhar_req ? [{ label: 'Aadhaar Card', name: 'aadhaar_card' }] : []),
                    ...(state.dtoCourse.is_samagraid_req ? [{ label: 'Samagra Id', name: 'samagra_id' }] : []),
                    ...(state.dtoCourse.is_tc_req ? [{ label: 'Transfer Certificate', name: 'transfer_certificate' }] : []),
                    ...(state.dtoCourse.is10threq ? [{ label: 'High School Marksheet', name: 'high_school_marksheet' }] : []),
                    ...(state.dtoCourse.is12threq ? [{ label: 'Intermediate Marksheet', name: 'intermediate_marksheet' }] : []),
                    ...(state.dtoCourse.isdiplomareq ? [{ label: 'Diploma Marksheet', name: 'diploma_marksheet' }] : []),
                    ...(state.dtoCourse.isgradreq ? [{ label: 'Under Graduation Marksheet', name: 'ug_marksheet' }] : []),
                    ...(state.dtoCourse.ispgreq ? [{ label: 'Post Graduation Marksheet', name: 'pg_marksheet' }] : [])
                  ].map((doc, index) => (
                    <MyGrid size={{ xs: 12, sm: 6 }} key={index}>
                      <MyTextField
                        type="file"
                        id={`Document_image_${doc.name}`}
                        label={doc.label}
                        name="files"
                        sx={blackBorderSx}
                        onChange={(e) => handleDocumentUpload(e, doc.name as keyof AdmissionClgDTO)}
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                      />
                    </MyGrid>
                  ))}
                  {(state.dtoCourse.isphotoidreq ||
                    state.dtoCourse.is_aadhar_req ||
                    state.dtoCourse.is_samagraid_req ||
                    state.dtoCourse.is_tc_req ||
                    state.dtoCourse.is10threq ||
                    state.dtoCourse.is12threq ||
                    state.dtoCourse.isdiplomareq ||
                    state.dtoCourse.isgradreq ||
                    state.dtoCourse.ispgreq) && (
                      <MyGrid size={{ xs: 12 }}>
                        <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                          <u>Other Documents (Optional):</u>
                        </MyTypography>
                      </MyGrid>
                    )}
                  {[
                    { label: 'Other Certificate (eg. sports)', name: 'other_certificate' },
                    { label: 'Father Aadhaar', name: 'father_aadhaar' },
                    { label: 'Mother Aadhaar', name: 'mother_aadhaar' },
                    { label: 'Anti-Ragging Certificate', name: 'anti_ragging' },
                    { label: 'Student Undertaking Certificate', name: 'student_undertaking' },
                    { label: 'Parents Undertaking Certificate', name: 'parents_undertaking' },
                    { label: 'Father Photograph', name: 'father_photo' },
                    { label: 'Mother Photograph', name: 'mother_photo' }
                  ].map((doc, index) => (
                    <MyGrid size={{ xs: 12, sm: 6 }} key={index}>
                      <MyTextField
                        type="file"
                        id={`Document_image_${doc.name}`}
                        label={doc.label}
                        name="files"
                        sx={blackBorderSx}
                        onChange={(e) => handleDocumentUpload(e, doc.name as keyof AdmissionClgDTO)}
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                      />
                    </MyGrid>
                  ))}
                </MyGrid>
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                    Undertaking Agreement
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '4px' }}>
                    <input
                      type="checkbox"
                      style={{ transform: 'scale(1.5)' }}
                      checked={state.dtoAdmissionClg.undertaking === 'Yes'}
                      onChange={(e) => onUndertakingChange(e.target.checked)}
                    />
                    I agree to the below undertaking.
                  </label>
                </MyGrid>{' '}
                <MyGrid size={{ xs: 12 }}>
                  <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Undertaking/Declaration:
                  </MyTypography>
                  {/* <ul> */}
                  <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                    <li>
                      I fully understand that submission of this application form does not in any way guarantee admission to the college. I
                      also agree that the decision of the college authorities regarding admission will be final and binding on me.
                    </li>
                    <li>
                      I am aware that admission will be offered strictly subject to availability of seats, fulfillment of eligibility
                      criteria, and submission of all required documents.
                    </li>
                    <li>
                      I hereby certify that the Date of Birth, academic records, and personal details provided in this form are true and
                      correct. I shall not request any alteration in these details once submitted.
                    </li>
                    <li>
                      I undertake that the information / documents submitted are authentic and not misleading. I understand that submission
                      of false or misleading information, or concealment of relevant details, may result in cancellation of admission at any
                      stage of my studies at this college.
                    </li>
                  </ul>

                  <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                    Instructions:
                  </MyTypography>
                  {/* <ul> */}
                  <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                    <li>
                      Admission / Registration for a particular academic year is <strong>non-transferable</strong> to any other year or to
                      another student.
                    </li>
                    <li>
                      Submission of the application form or payment of registration fee does not guarantee admission. Admission will be
                      based on merit, eligibility criteria, and availability of seats.
                    </li>
                    <li>
                      Applicants must attach attested copies of their mark sheets, transfer certificate / migration certificate, and other
                      relevant academic records.
                    </li>
                    <li>
                      Certificates for achievements in sports, cultural activities, or other co-curricular fields (if any) should be
                      attached along with the form.
                    </li>
                    <li>Incomplete application forms or forms without the mandatory enclosures will not be considered.</li>
                  </ul>
                </MyGrid>
                <MyCardActions>
                  <MyButton onClick={onSaveClick} startIcon={<AssignmentTurnedInIcon />} disabled={saving}>
                    {saving ? 'Saving...' : 'Submit'}
                  </MyButton>
                  <MyButton onClick={onClearClick} startIcon={<ClearIcon />}>
                    Clear
                  </MyButton>
                  <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
                    Cancel
                  </MyButton>
                </MyCardActions>
              </MyGrid>
            </MyBox>
          </MyLocalizationProvider>
        </Card>
      )}
    </>
  );
};

export default memo(ClientAdmCollege, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
