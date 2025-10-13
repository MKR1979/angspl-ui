'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import useEmployeeReviewEntry from './useEmployeeReviewEntry';
import { getLocalTime } from '@/app/common/Configuration';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import MyCardActions from '@/app/custom-components/MyCardActions';
import { Card } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

type EmployeeReviewEntryProps = {
  dtoEmpMaster: EmpMasterDTO;
};

const EmployeeReviewEntry = (props: EmployeeReviewEntryProps) => {
  const {
    state,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onJoiningDateBlur,
    onGenderBlur,
    onStatusBlur,
    onInputChange,
    onPanNoInputChange,
    onNormalizedInputChange,
    onDobChange,
    onJoiningDateChange,
    onGenderChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onEmployeeStatusChange,
    saving,
    onClearClick,
    onAadhaarNoBlur,
    onAadhaarNoChange,
    onMotherNameBlur,
    onFatherNameBlur,
    onEmpCodeBlur,
    onCodeChange,
    onDeptTypeBlur,
    onQualificationBlur,
    onExperienceBlur,
    onDesignationBlur,
    onSalaryBlur,
    onAddressBlur,
    onPanNoBlur,
    onExperienceChange,
    onSalaryChange,
    onMaritalStatusChange
  } = useEmployeeReviewEntry(props);

  return (
    <>
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <MyLocalizationProvider>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="First Name"
                name="first_name"
                value={state.dtoEmpMaster.first_name}
                onChange={onInputChange}
                placeholder="Enter First Name"
                inputProps={{
                  maxLength: gConstants.FIRST_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onFirstNameBlur}
                error={state.errorMessages.first_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.first_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Last Name"
                name="last_name"
                value={state.dtoEmpMaster.last_name}
                onChange={onInputChange}
                placeholder="Enter Last Name"
                inputProps={{
                  maxLength: gConstants.LAST_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onLastNameBlur}
                error={state.errorMessages.last_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
            </MyGrid>
            {/* THIS CODE WILL BE USED IN FUTURE FOR SOME OTHER FIELD
             <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="User Name"
                name="user_name"
                value={state.dtoEmpMaster.user_name}
                onChange={onPlainInputChange}
                placeholder="Enter User Name"
                inputProps={{
                  maxLength: gConstants.USER_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onUserNameBlur}
                error={state.errorMessages.user_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
            </MyGrid> */}
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Employee Code"
                name="emp_code"
                value={state.dtoEmpMaster.emp_code}
                onChange={onCodeChange}
                placeholder="Enter Employee Code"
                inputProps={{
                  maxLength: Constants.CODE_LENGTH,
                  pattern: '^[A-Z0-9]+$'
                }}
                onBlur={onEmpCodeBlur}
                error={state.errorMessages.emp_code ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.emp_code}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Joining Date"
                onChange={onJoiningDateChange}
                value={
                  dayjs(getLocalTime(state.dtoEmpMaster.joining_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoEmpMaster.joining_date)).toDate()
                }
                onBlur={onJoiningDateBlur}
                error={!!state.errorMessages.joining_date}
                shouldDisableDate={(date) => {
                  const currentDate = dayjs();
                  const oneMonthBefore = currentDate.subtract(gConstants.ADMISSION_MONTH_NUM, gConstants.ADMISSION_DATE_MONTH);
                  const oneMonthAfter = currentDate.add(gConstants.ADMISSION_MONTH_NUM, gConstants.ADMISSION_DATE_MONTH);
                  const selected = dayjs(date);

                  return selected.isBefore(oneMonthBefore, 'day') || selected.isAfter(oneMonthAfter, 'day');
                }}
              />
              <MyTypography className="error">{state.errorMessages.joining_date}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Department Type"
                name="department_type"
                value={state.dtoEmpMaster.department_type}
                onChange={onInputChange}
                placeholder="Enter Department Type"
                inputProps={{
                  maxLength: gConstants.FULL_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onDeptTypeBlur}
                error={state.errorMessages.department_type ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.department_type}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Qualification"
                name="qualification"
                value={state.dtoEmpMaster.qualification}
                onChange={onInputChange}
                placeholder="Enter Qualification"
                inputProps={{
                  maxLength: gConstants.PASSWORD_MAX_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onQualificationBlur}
                error={state.errorMessages.qualification ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.qualification}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Experience"
                name="experience"
                value={state.dtoEmpMaster.experience || ''}
                onChange={onExperienceChange}
                onBlur={onExperienceBlur}
                placeholder="Enter experience in years"
                inputProps={{
                  maxLength: gConstants.ZIP_CODE_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                error={state.errorMessages.experience ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.experience}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Designation"
                name="designation"
                value={state.dtoEmpMaster.designation}
                onChange={onInputChange}
                placeholder="Enter Designation"
                inputProps={{
                  maxLength: gConstants.USER_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onDesignationBlur}
                error={state.errorMessages.designation ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.designation}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Salary"
                name="salary"
                value={state.dtoEmpMaster.salary || ''}
                onChange={onSalaryChange}
                onBlur={onSalaryBlur}
                placeholder="Enter salary"
                inputProps={{
                  maxLength: gConstants.ZIP_CODE_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                error={state.errorMessages.salary ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.salary}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Date Of Birth"
                onChange={onDobChange}
                value={
                  !state.dtoEmpMaster.dob || dayjs(getLocalTime(state.dtoEmpMaster.dob)).isSame(dayjs('1899-12-31'))
                    ? null
                    : dayjs(getLocalTime(state.dtoEmpMaster.dob)).toDate()
                }
                onBlur={onDobBlur}
                error={!!state.errorMessages.dob}
                // shouldDisableDate={(date) => {
                //   const lessThanFiveYears = dayjs(date).isAfter(dayjs().subtract(Constants.MIN_DOB_YEAR_EMP, gConstants.DOB_YEAR));
                //   const before1950 = dayjs(date).isBefore(dayjs(gConstants.DATE_OF_BIRTH2));
                //   return lessThanFiveYears || before1950;
                // }}
                // helperText={state.errorMessages.dob}
                minDate={dayjs('1950-01-01').toDate()}                 // earliest allowed date
                maxDate={dayjs().subtract(5, 'year').toDate()}         // latest allowed date (at least 5 years old)
              />
              <MyTypography className="error">{state.errorMessages.dob}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ text: state.dtoEmpMaster.gender }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrGenderTypeLookup}
                onChange={onGenderChange}
                onBlur={onGenderBlur}
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
                label="E-Mail"
                name="email"
                value={state.dtoEmpMaster.email}
                onChange={onNormalizedInputChange}
                placeholder="Enter Email"
                inputProps={{
                  maxLength: gConstants.EMAIL_LENGTH,
                  pattern: '^[a-zA-Z0-9]{1,2}$'
                }}
                onBlur={onEMailIdBlur}
                error={state.errorMessages.email ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyPhoneNumber
                label="Phone #"
                onChange={onPhoneNoChange}
                value={state.dtoEmpMaster.phone_no}
                onBlur={onPhoneNoBlur}
                error={state.errorMessages.phone_no ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ text: state.dtoEmpMaster.marital_status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrMaritalStatusLookup}
                onChange={onMaritalStatusChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Marital Status"
                    placeholder="Select Marital Status..."
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={state.errorMessages.marital_status ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.marital_status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Father Name"
                name="father_name"
                value={state.dtoEmpMaster.father_name}
                onChange={onInputChange}
                placeholder="Enter Father Name"
                inputProps={{
                  maxLength: gConstants.FULL_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onFatherNameBlur}
                error={state.errorMessages.father_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.father_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Mother Name"
                name="mother_name"
                value={state.dtoEmpMaster.mother_name}
                onChange={onInputChange}
                placeholder="Enter Mother Name"
                inputProps={{
                  maxLength: gConstants.FULL_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onMotherNameBlur}
                error={state.errorMessages.mother_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.mother_name}</MyTypography>
            </MyGrid>
            {state.dtoEmpMaster.marital_status === Constants.MARITAL_STATUS_EMP && (
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Husband/Wife Name"
                  name="husband_wife_name"
                  value={state.dtoEmpMaster.husband_wife_name}
                  onChange={onInputChange}
                  placeholder="Enter Husband / Wife Name"
                  inputProps={{
                    maxLength: gConstants.FULL_NAME_LENGTH,
                    pattern: '^[A-Za-z]{1,2}$'
                  }}
                  error={state.errorMessages.husband_wife_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.husband_wife_name}</MyTypography>
              </MyGrid>
            )}
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Address"
                name="address"
                value={state.dtoEmpMaster.address}
                onChange={onInputChange}
                onBlur={onAddressBlur}
                placeholder="Enter Your Address"
                inputProps={{
                  maxLength: gConstants.ADDRESS_LENGTH,
                  pattern: '^[a-zA-Z0-9]{1,2}$'
                }}
                error={state.errorMessages.address ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Aadhaar Number"
                name="aadhaar_no"
                value={state.dtoEmpMaster.aadhaar_no}
                onChange={onAadhaarNoChange}
                onBlur={onAadhaarNoBlur}
                placeholder="Enter 12-digit Aadhaar"
                inputProps={{
                  maxLength: gConstants.AADHAAR_NO_LENGTH,
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
                error={!!state.errorMessages.aadhaar_no}
              />
              <MyTypography className="error">{state.errorMessages.aadhaar_no}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Pan Number"
                name="pan_card"
                value={state.dtoEmpMaster.pan_card}
                onChange={onPanNoInputChange}
                onBlur={onPanNoBlur}
                placeholder="Enter 10-digit PAN No."
                inputProps={{
                  maxLength: Constants.PAN_NO_LENGTH,
                  // pattern: '^[a-zA-Z0-9]{1,2}$'
                  pattern: '^[A-Z]{5}[0-9]{4}[A-Z]$'
                }}
                error={state.errorMessages.pan_card ? true : false}
              />
              <MyTypography className="error">{state.errorMessages.pan_card}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoEmpMaster.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrModulesStatusLookup}
                onChange={onEmployeeStatusChange}
                onBlur={onStatusBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    placeholder="Select Status..."
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStatusBlur}
                    error={!!state.errorMessages.status}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                type="file"
                id="Document_image"
                label="id Photo Proof Document (Optional)"
                name="files"
                onChange={(e) => handleDocumentUpload(e, 'photoidproof')}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                type="file"
                id="Document_image"
                label="Photo  (Optional)"
                name="files"
                onChange={(e) => handleDocumentUpload(e, 'photo')}
                slotProps={{ inputLabel: { shrink: true } }}
              />
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
      </Card>
    </>
  );
};

export default memo(EmployeeReviewEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
