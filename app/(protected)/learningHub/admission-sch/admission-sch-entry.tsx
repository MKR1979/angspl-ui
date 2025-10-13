'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyTextField from '@/app/custom-components/MyTextField';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import useAdmissionSchEntry from './useAdmissionSchEntry';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import AdmissionSchoolDTO from '@/app/types/AdmissionSchDTO';
import * as gConstants from '../../../constants/constants';
import MyCardActions from '@/app/custom-components/MyCardActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { getAcademicSession } from '@/app/common/currentSession';
import CancelIcon from '@mui/icons-material/Cancel';
import { ClearIcon } from '@mui/x-date-pickers';
import { useSelector } from '../../../store';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type AdmissionSchEntryProps = {
  dtoAdmissionSchool: AdmissionSchoolDTO;
};

const AdmissionSchEntry = (props: AdmissionSchEntryProps) => {
  const {
    state,
    saving, isEditMode,
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
    setOpen9,
    setClose9,
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen13,
    setClose13,
    setOpen14,
    setClose14,
    setOpen15,
    setClose15,
    setOpen16,
    setClose16,
    setOpen17,
    setClose17,
    setOpen18,
    setClose18,
    setOpen19,
    setClose19,
    onPassingYearChange,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onMotherNameBlur,
    onFatherNameBlur,
    onAddressBlur,
    onCourseNameBlur,
    onCategoryBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onCityNameBlur,
    onZipCodeBlur,
    onBloodGrpBlur,
    onEduBoardBlur,
    onBoardingTypeBlur,
    onCurrentSchoolBlur,
    onFPhoneNoBlur,
    onFatherEMailIdBlur,
    onMPhoneNoBlur,
    onMotherEMailIdBlur,
    onMAadhaarNoChange,
    onFAadhaarNoChange,
    onStuAadhaarNoChange,
    onSamagraIdNumChange,
    onPenNoBlur,
    onPenNoChange,
    onFamilySamagraIdChange,
    onClearClick,
    onZipCodeChange,
    onFamilySamagraIdBlur,
    onStatusBlur,
    onUndertakingChange,
    onStreamBlur,
    onLookupValueChange,
    onLookupIdNameChange,
    onStuAadhaarNoBlur,
    onFAadhaarNoBlur,
    onMAadhaarNoBlur, onAdmissionDateChange, onAdmissionDateBlur, onNormalizedInputChange
  } = useAdmissionSchEntry(props);

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
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';
  return (
    <>
      <MyLocalizationProvider>
        <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '0.1rem 1rem' }}>
          <MyGrid size={{ xs: 12 }}>
            <MyBox sx={{ textAlign: 'center' }}>
              <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '21px', color: '#204a76' }}
                style={{
                  color: '#fff',
                  backgroundColor: '#429bc4ff',
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '4px'
                }}>
                Registration Form {getAcademicSession()}
              </MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999' }}>
              Student Personal Details
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoAdmissionSchool.course_id,
                text: state.dtoAdmissionSchool.course_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onLookupIdNameChange('course')}
              onBlur={onCourseNameBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Grade"
                  placeholder="Select Grade..."
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
          {state.dtoCourse.course_type_name === gConstants.COURSE_TYPE_NAME_FOR_STREAM && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open17}
                onOpen={setOpen17}
                onClose={setClose17}
                value={{ text: state.dtoAdmissionSchool.stream }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrStreamTypeLookup}
                onChange={onLookupValueChange('stream')}
                onBlur={onStreamBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Stream"
                    placeholder="Only for grade XI / XII"
                    sx={blackBorderSx}
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={state.errorMessages.stream ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.stream}</MyTypography>
            </MyGrid>
          )}
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyDatePicker
              label="Admission Date"
              onChange={onAdmissionDateChange}
              value={
                dayjs(state.dtoAdmissionSchool.admission_date).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                  ? null
                  : dayjs(state.dtoAdmissionSchool.admission_date).tz(customerTimezone).toDate()
              }
              onBlur={onAdmissionDateBlur}
              minDate={dayjs().subtract(gConstants.ADMISSION_DATE_TILL_DAYS, 'day').toDate()}   // sirf pichle 7 din
              maxDate={dayjs().toDate()}
            // error={!!state.errorMessages.admission_date}
            // shouldDisableDate={(date) => {
            //   const today = dayjs().tz(customerTimezone);
            //   const oneWeekAgo = today.subtract(gConstants.ADMISSION_DATE_TILL_DAYS, 'day');
            //   const selected = dayjs(date).tz(customerTimezone);
            //   return selected.isBefore(oneWeekAgo, 'day') || selected.isAfter(today, 'day');
            // }}
            />
            {/* <MyTypography className="error">{state.errorMessages.admission_date}</MyTypography> */}
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoAdmissionSchool.gender }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrGenderTypeLookup}
              onChange={onLookupValueChange('gender')}
              filterOptions={(options, state) => {
                // searchable Lookup
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
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="First Name"
              name="first_name"
              value={state.dtoAdmissionSchool.first_name}
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
              value={state.dtoAdmissionSchool.last_name}
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
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Father Name"
              name="father_name"
              value={state.dtoAdmissionSchool.father_name}
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
              label="Mother Name"
              name="mother_name"
              value={state.dtoAdmissionSchool.mother_name}
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
            <MyDatePicker
              label="Date Of Birth"
              onChange={onDobChange}
              value={
                dayjs(state.dtoAdmissionSchool.dob).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                  ? null
                  : dayjs(state.dtoAdmissionSchool.dob).tz(customerTimezone).toDate()
              }
              onBlur={onDobBlur}
              minDate={dayjs(gConstants.DATE_OF_BIRTH2).toDate()}                 // earliest allowed date
              maxDate={dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
              // sx={blackBorderSx}
              error={!!state.errorMessages.dob}
            />
            <MyTypography className="error">{state.errorMessages.dob}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoAdmissionSchool.category }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCategoryTypeLookup}
              onChange={onLookupValueChange('category')}
              onBlur={onCategoryBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
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
              label="Address"
              name="address"
              value={state.dtoAdmissionSchool.address}
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
                id: state.dtoAdmissionSchool.country_id,
                text: state.dtoAdmissionSchool.country_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCountryLookup}
              onChange={onLookupIdNameChange('country')}
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
                id: state.dtoAdmissionSchool.state_id,
                text: state.dtoAdmissionSchool.state_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStateLookup}
              onChange={onLookupIdNameChange('state')}
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
            <MyTextField
              label="City Name"
              name="city_name"
              value={state.dtoAdmissionSchool.city_name}
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
              value={state.dtoAdmissionSchool.zip_code || ''}
              onChange={onZipCodeChange}
              onBlur={onZipCodeBlur}
              placeholder="Enter 6-digit Zip code"
              inputProps={{
                maxLength: gConstants.ZIP_CODE_LENGTH,
                inputMode: 'numeric', // mobile numeric keypad
                pattern: '[0-9]*'
              }}
              sx={blackBorderSx}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="E-Mail"
              name="email"
              value={state.dtoAdmissionSchool.email}
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
              value={state.dtoAdmissionSchool.phone_no}
              onBlur={onPhoneNoBlur}
              sx={blackBorderSx}
              error={state.errorMessages.phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
              Additional Details
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open6}
              onOpen={setOpen6}
              onClose={setClose6}
              value={{ text: state.dtoAdmissionSchool.religion }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrReligionTypeLookup}
              onChange={onLookupValueChange('religion')}
              filterOptions={(options, state) => {
                // searchable Lookup
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
              open={state.open7}
              onOpen={setOpen7}
              onClose={setClose7}
              value={{ text: state.dtoAdmissionSchool.blood_group }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrBloodGrpTypeLookup}
              onChange={onLookupValueChange('blood_group')}
              onBlur={onBloodGrpBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
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
              value={{ text: state.dtoAdmissionSchool.boarder_day_scholar }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrSchoolBoardingTypeLookup}
              onChange={onLookupValueChange('boarder_day_scholar')}
              onBlur={onBoardingTypeBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Boarders / Day Scholars"
                  placeholder="Select Scholars Type..."
                  sx={blackBorderSx}
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.boarder_day_scholar ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.boarder_day_scholar}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Previous School Name"
              name="current_school"
              value={state.dtoAdmissionSchool.current_school}
              onChange={onInputChange}
              onBlur={onCurrentSchoolBlur}
              placeholder="Enter Previous School"
              inputProps={{
                maxLength: gConstants.ADDRESS_LENGTH,
                pattern: '^[a-zA-Z0-9]{1,2}$'
              }}
              sx={blackBorderSx}
              error={state.errorMessages.current_school ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.current_school}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open9}
              onOpen={setOpen9}
              onClose={setClose9}
              value={{ text: state.dtoAdmissionSchool.current_board }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrEduBoardTypeLookup}
              onChange={onLookupValueChange('current_board')}
              onBlur={onEduBoardBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Previous School Board"
                  placeholder="Select Board..."
                  sx={blackBorderSx}
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.current_board ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.current_board}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open10}
              onOpen={setOpen10}
              onClose={setClose10}
              value={{ text: state.dtoAdmissionSchool.medium }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrMediumTypeLookup}
              onChange={onLookupValueChange('medium')}
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
              label="Father Qualification"
              name="father_qualification"
              value={state.dtoAdmissionSchool.father_qualification}
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
              value={state.dtoAdmissionSchool.father_occupation}
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
              value={state.dtoAdmissionSchool.father_organisation}
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
              value={state.dtoAdmissionSchool.father_designation}
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
              value={state.dtoAdmissionSchool.father_email}
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
              value={state.dtoAdmissionSchool.father_phone_no}
              onBlur={onFPhoneNoBlur}
              sx={blackBorderSx}
              error={state.errorMessages.father_phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.father_phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Mother Qualification"
              name="mother_qualification"
              value={state.dtoAdmissionSchool.mother_qualification}
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
              value={state.dtoAdmissionSchool.mother_occupation}
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
              value={state.dtoAdmissionSchool.mother_organisation}
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
              value={state.dtoAdmissionSchool.mother_designation}
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
              value={state.dtoAdmissionSchool.mother_email}
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
              value={state.dtoAdmissionSchool.mother_phone_no}
              onBlur={onMPhoneNoBlur}
              sx={blackBorderSx}
              error={state.errorMessages.mother_phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.mother_phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Student Aadhaar Number"
              name="student_aadhaar_no"
              value={state.dtoAdmissionSchool.student_aadhaar_no}
              onChange={onStuAadhaarNoChange}
              placeholder="Student's Aadhaar No..."
              onBlur={onStuAadhaarNoBlur}
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
              label="Father Aadhaar Number"
              name="father_aadhaar_no"
              value={state.dtoAdmissionSchool.father_aadhaar_no}
              onChange={onFAadhaarNoChange}
              placeholder="Father's Aadhaar No..."
              onBlur={onFAadhaarNoBlur}
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
              label="Mother Aadhaar Number"
              name="mother_aadhaar_no"
              value={state.dtoAdmissionSchool.mother_aadhaar_no}
              onChange={onMAadhaarNoChange}
              placeholder="Mother's Aadhaar No..."
              onBlur={onMAadhaarNoBlur}
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
              label="Samagra ID No.(Student)"
              name="samagra_id_no"
              value={state.dtoAdmissionSchool.samagra_id_no}
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
              value={{ text: state.dtoAdmissionSchool.staff_child }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStuMasterTypeLookup}
              onChange={onLookupValueChange('staff_child')}
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
              label="Sibling in School"
              name="sibling_in_school"
              value={state.dtoAdmissionSchool.sibling_in_school}
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
              label="Parents Ex School"
              name="parents_ex_school"
              value={state.dtoAdmissionSchool.parents_ex_school}
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
              value={state.dtoAdmissionSchool.guardian_name}
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
              value={state.dtoAdmissionSchool.guardian_phone_no}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
              Undertaking Agreement
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open13}
              onOpen={setOpen13}
              onClose={setClose13}
              value={{ text: state.dtoAdmissionSchool.iii_language }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrIIILanTypeLookup}
              onChange={onLookupValueChange('iii_language')}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="III language (for grade IV to VIII)"
                  placeholder="Only for grade IV to VIII"
                  sx={blackBorderSx}
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open14}
              onOpen={setOpen14}
              onClose={setClose14}
              value={{ text: state.dtoAdmissionSchool.transport_facility }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStuMasterTypeLookup}
              onChange={onLookupValueChange('transport_facility')}
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
          {state.dtoAdmissionSchool.transport_facility === 'Yes' && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open19}
                onOpen={setOpen19}
                onClose={setClose19}
                value={{ text: state.dtoAdmissionSchool.transport_route }}
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
              open={state.open15}
              onOpen={setOpen15}
              onClose={setClose15}
              value={{ text: state.dtoAdmissionSchool.mess_facility }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrStuMasterTypeLookup}
              onChange={onLookupValueChange('mess_facility')}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Mess Facility"
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
            <MyAutocomplete
              open={state.open16}
              onOpen={setOpen16}
              onClose={setClose16}
              value={{ text: state.dtoAdmissionSchool.ii_language }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrIILanTypeLookup}
              onChange={onLookupValueChange('ii_language')}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="II Language (for grade IX)"
                  placeholder="Only for grade IX"
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
              label="Family Samagra Id"
              name="family_samagra_id"
              value={state.dtoAdmissionSchool.family_samagra_id}
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
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Student PEN No"
              name="student_pen_no"
              value={state.dtoAdmissionSchool.student_pen_no}
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
          </MyGrid>{' '}
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
              ...(state.dtoCourse.is_birth_certi_req ? [{ label: 'Birth Certificate', name: 'birth_certificate' }] : []),
              { label: 'Other Certificate (eg. sports)', name: 'other_certificate' },
              { label: 'Father Aadhaar', name: 'father_aadhaar' },
              { label: 'Mother Aadhaar', name: 'mother_aadhaar' },
              ...(state.dtoCourse.is_samagraid_req ? [{ label: 'Samagra Id', name: 'samagra_id' }] : []),
              ...(state.dtoCourse.is_tc_req ? [{ label: 'Transfer Certificate', name: 'transfer_certificate' }] : []),
              ...(state.dtoCourse.prev_class_marksheet ? [{ label: 'Previous Class Marksheet', name: 'prev_class_marksheet' }] : []),
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
                  onChange={(e) => handleDocumentUpload(e, doc.name as keyof AdmissionSchoolDTO)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
              </MyGrid>
            ))}
          </MyGrid>
          {isEditMode && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open18}
                onOpen={setOpen18}
                onClose={setClose18}
                value={{ text: state.dtoAdmissionSchool.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAdmissionStatusLookup}
                onChange={onLookupValueChange('status')}
                onBlur={onStatusBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    placeholder="Select Admission Status"
                    sx={blackBorderSx}
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={!!state.errorMessages.status}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.status}</MyTypography>
            </MyGrid>
          )}
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', mb: 2 }}>
              Undertaking Agreement
            </MyTypography>
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '4px' }}>
                <input
                  type="checkbox"
                  style={{ transform: 'scale(1.5)' }}
                  checked={state.dtoAdmissionSchool.undertaking === 'Yes'}
                  onChange={(e) => onUndertakingChange(e.target.checked)}
                />
                I agree to the below undertaking.
              </label>
            </MyGrid>

            <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 1 }}>
              Undertaking/Declaration:
            </MyTypography>
            {/* <ul> */}
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>
                I fully understand that the school, on accepting the registration of my ward, is not in any way bound to grant admission. I
                also understand that the decision of the school authorities regarding admission will be final and binding on me.
              </li>
              <li>I fully understand that xxxxx xxxxx School, Bhopal has the right to offer admission based on vacancy of seats.</li>
              <li>
                I hereby certify that the Date of Birth and spelling of name of my ward given in this form are true and correct and I shall
                not make any request for change.
              </li>
              <li>
                I undertake that the information / documents submitted in this form are true and correct and not misleading and no relevant
                information has been concealed. I understand that false or misleading information or withholding correct information may
                disqualify my ward for admission/education at this school.
              </li>
            </ul>

            <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
              Instructions:
            </MyTypography>
            {/* <ul> */}
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>
                Registration once completed for a particular year is <strong>non-transferable</strong> to any other year or to any other
                child.
              </li>
              <li>Issue of Registration Form does not Guarantee Admission.</li>
              <li>Please attach attested copy of Municipal Birth Certificate.</li>
              <li>Please attach copy of the attested Mark Sheet of previous class examination.</li>
              <li>Attach copy of certificates for proficiency in Games, Co-curricular / outstanding achievements. (If any)</li>
              <li>Incomplete registration form will not be accepted. It is mandatory to attach all enclosures as stated above.</li>
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
      </MyLocalizationProvider>
    </>
  );
};

export default memo(AdmissionSchEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
