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
import useAdmissionReviewEntry from './useAdmissionReviewEntry';
import { getLocalTime } from '@/app/common/Configuration';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import AdmissionDTO from '@/app/types/AdmissionDTO';
import * as gConstants from '../../constants/constants';

type AdmissionReviewEntryProps = {
  dtoAdmission: AdmissionDTO;
};

const AdmissionReviewEntry = (props: AdmissionReviewEntryProps) => {
  const {
    state,
    is10threq,
    is12threq,
    isgradreq,
    isEditMode,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onCityNameBlur,
    onStatusBlur,
    onGenderBlur,
    onCourseIdBlur,
    onInputChange,
    onDobChange,
    onAdmissionDateChange,
    onAdmissionDateBlur,
    onCountryIdBlur,
    onGenderChange,
    onCountryNameChange,
    onStateNameChange,
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
    onPhoneNoChange,
    handleDocumentUpload,
    onCourseNameChange,
    onPhoneNoBlur,
    onSaveClick,
    onCancelClick,
    onAdmissionStatusChange
  } = useAdmissionReviewEntry(props);

  return (
    <>
      <MyLocalizationProvider>
        <div>
        <MyTypography sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '30px', fontWeight: 'bold' }}>
          {isEditMode ? 'Verify Admission' : 'Admission'}
        </MyTypography>
          <MyBox sx={{ width: '60%', marginLeft: '20%' }}>
            <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open4}
                  onOpen={setOpen4}
                  onClose={setClose4}
                  value={{
                    id: state.dtoAdmission.course_id,
                    text: state.dtoAdmission.course_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCourseLookup}
                  onChange={onCourseNameChange}
                  onBlur={onCourseIdBlur}
                  filterOptions={(
                    options // to remove the empty selectable string in the lookup
                  ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Course"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.course_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="Admission Date"
                  onChange={onAdmissionDateChange}
                  value={
                    dayjs(getLocalTime(state.dtoAdmission.dob)).format('MM/DD/YYYY') === '12/31/1899'
                      ? null
                      : dayjs(getLocalTime(state.dtoAdmission.dob)).toDate()
                  }
                  onBlur={onAdmissionDateBlur}
                  error={!!state.errorMessages.admission_date}
                  shouldDisableDate={(date) => {
                    const currentDate = dayjs(); // Today
                    const oneMonthLater = dayjs().add(gConstants.ADMISSION_MONTH_NUM, gConstants.ADMISSION_DATE_MONTH); // One month ahead
                    const selected = dayjs(date); // Wrap incoming date

                    return selected.isBefore(currentDate, 'day') || selected.isAfter(oneMonthLater, 'day');
                  }}
                />
                <MyTypography className="error">{state.errorMessages.admission_date}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="First Name"
                  name="first_name"
                  value={state.dtoAdmission.first_name}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
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
                  value={state.dtoAdmission.last_name}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.LAST_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  onBlur={onLastNameBlur}
                  error={state.errorMessages.last_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="Date Of Birth"
                  onChange={onDobChange}
                  value={
                    dayjs(getLocalTime(state.dtoAdmission.dob)).format('MM/DD/YYYY') === '12/31/1899'
                      ? null
                      : dayjs(getLocalTime(state.dtoAdmission.dob)).toDate()
                  }
                  onBlur={onDobBlur}
                  error={!!state.errorMessages.dob}
                  shouldDisableDate={(date) => {
                    const lessThanFiveYears = dayjs(date).isAfter(dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR));

                    const before1950 = dayjs(date).isBefore(dayjs(gConstants.DATE_OF_BIRTH2));
                    return lessThanFiveYears || before1950;
                  }}
                />
                <MyTypography className="error">{state.errorMessages.dob}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{ text: state.dtoAdmission.gender }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrGenderTypeLookup}
                  onChange={onGenderChange}
                  onBlur={onGenderBlur}
                  filterOptions={(
                    options // to remove the empty selectable string in the lookup
                  ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Gender"
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
                  value={state.dtoAdmission.email}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                    pattern: '^[a-zA-Z0-9]{1,2}$' // Allows only letters (a-z, A-Z) and numbers (0-9), up to two characters
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
                  value={state.dtoAdmission.phone_no}
                  onBlur={onPhoneNoBlur}
                  error={state.errorMessages.phone_no ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Address"
                  name="address"
                  value={state.dtoAdmission.address}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.ADDRESS_LENGTH, // Restricts input to two characters
                    pattern: '^[a-zA-Z0-9]{1,2}$' // Allows only letters (a-z, A-Z) and numbers (0-9), up to two characters
                  }}
                  error={state.errorMessages.address ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="City Name"
                  name="city_name"
                  value={state.dtoAdmission.city_name}
                  onChange={onInputChange}
                  onBlur={onCityNameBlur}
                  error={state.errorMessages.city_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open2}
                  onOpen={setOpen2}
                  onClose={setClose2}
                  value={{
                    id: state.dtoAdmission.country_id,
                    text: state.dtoAdmission.country_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCountryLookup}
                  onChange={onCountryNameChange}
                  onBlur={onCountryIdBlur}
                  filterOptions={(
                    options // to remove the empty selectable string in the lookup
                  ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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
                <MyTypography className="error"> {state.errorMessages.country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{
                    id: state.dtoAdmission.state_id,
                    text: state.dtoAdmission.state_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrStateLookup}
                  onChange={onStateNameChange}
                  filterOptions={(
                    options // to remove the empty selectable string in the lookup
                  ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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
                <MyTypography className="error"> {state.errorMessages.state_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Zip code"
                  name="zip_code"
                  value={state.dtoAdmission.zip_code}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.ZIP_CODE_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  error={state.errorMessages.zip_code ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="High School Name(10th)"
                  name="highschoolname"
                  value={state.dtoAdmission.highschoolname}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.SCHOOL_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  error={state.errorMessages.highschoolname ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.highschoolname}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="High School Percentage"
                  name="highschoolpercentage"
                  value={state.dtoAdmission.highschoolpercentage}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: 2, // Restricts input to two characters
                    inputMode: 'numeric' // Allows only up to two digits
                  }}
                  error={state.errorMessages.highschoolpercentage ? true : false}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Higher Secondary School Name(12th)"
                  name="highersschoolname"
                  value={state.dtoAdmission.highersschoolname}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.SCHOOL_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  error={state.errorMessages.highersschoolname ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.highersschoolname}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Higher Secondary School Percentage"
                  name="highersschoolpercentage"
                  value={isNaN(state.dtoAdmission.highersschoolpercentage) ? '' : String(state.dtoAdmission.highersschoolpercentage)}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: 2,
                    inputMode: 'numeric'
                  }}
                  error={!!state.errorMessages.highersschoolpercentage}
                />
              </MyGrid>
              {isgradreq && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Graduation School/University"
                    name="graduationname"
                    value={state.dtoAdmission.graduationname}
                    onChange={onInputChange}
                    inputProps={{
                      maxLength: gConstants.SCHOOL_NAME_LENGTH, // Restricts input to two characters
                      pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                    }}
                    error={state.errorMessages.graduationname ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.graduationname}</MyTypography>
                </MyGrid>
              )}
              {isgradreq && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Graduation Percentage"
                    name="graduationpercentage"
                    value={state.dtoAdmission.graduationpercentage}
                    onChange={onInputChange}
                    inputProps={{
                      maxLength: 2, // Restricts input to two characters
                      inputMode: 'numeric' // Allows only up to two digits
                    }}
                    error={state.errorMessages.graduationpercentage ? true : false}
                  />
                </MyGrid>
              )}
              {is10threq && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    type="file"
                    id="Document_image"
                    label="10th Proof Document (Optional)"
                    name="files"
                    onChange={(e) => handleDocumentUpload(e, 'tenthproof')}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </MyGrid>
              )}

              {is12threq && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    type="file"
                    id="Document_image"
                    label="12th Proof Document (Optional)"
                    name="files"
                    onChange={(e) => handleDocumentUpload(e, 'twelthproof')}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </MyGrid>
              )}

              {isgradreq && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    type="file"
                    id="Document_image"
                    label="Graduation Proof Document (Optional)"
                    name="files"
                    onChange={(e) => handleDocumentUpload(e, 'graduationproof')}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </MyGrid>
              )}
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
              {isEditMode && (
                <MyGrid size={{ xs: 12 }}>
                  <MyAutocomplete
                    open={state.open5}
                    onOpen={setOpen5}
                    onClose={setClose5}
                    value={{ text: state.dtoAdmission.status }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrAdmissionStatusLookup}
                    onChange={onAdmissionStatusChange}
                    onBlur={onStatusBlur}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Status"
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
              )}

              <MyButton
                onClick={onSaveClick}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  width: '205px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                {' '}
                Submit
              </MyButton>
              <MyButton
                sx={{
                  backgroundColor: 'white',
                  color: '#1976d2',
                  border: '1px solid rgb(23, 114, 206)',
                  fontWeight: 'bold',
                  width: '202px',
                  textTransform: 'none'
                }}
                onClick={onCancelClick}
              >
                Cancel
              </MyButton>
            </MyGrid>
          </MyBox>
        </div>
      </MyLocalizationProvider>
    </>
  );
};

export default memo(AdmissionReviewEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
