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
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import AdmissionTechDTO from '@/app/types/AdmissionTechDTO';
import * as gConstants from '../../../constants/constants';
import MyCardActions from '@/app/custom-components/MyCardActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import { ClearIcon } from '@mui/x-date-pickers';
import { useSelector } from '../../../store';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type AdmissionReviewEntryProps = {
  dtoAdmission: AdmissionTechDTO;
};

const AdmissionReviewEntry = (props: AdmissionReviewEntryProps) => {
  const {
    state,
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
    onInputNameChange,
    onNormalizedInputChange,
    onDobChange,
    onAdmissionDateChange,
    onAdmissionDateBlur,
    onGenderChange,
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
    onPhoneNoBlur,
    onSaveClick,
    onCancelClick,
    onAdmissionStatusChange,
    // onPaymentModeChange,
    // onPaymentModeBlur,
    saving,
    onAadhaarNoBlur,
    onSamagraIdBlur,
    onPenNoBlur,
    onAadhaarNoChange,
    onSamagraIdChange,
    onPenNoChange,
    onFatherPhoneNoBlur,
    onMotherPhoneNoBlur,
    onMotherNameBlur,
    onFatherNameBlur,
    onMotherOccupationBlur,
    onZipCodeChange,
    onFatherOccupationBlur,
    onZipCodeBlur,
    onClearClick,
    onUndertakingChange,
    onLookupIdNameChange, onAddressBlur
  } = useAdmissionReviewEntry(props);

  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  const requiredDocs = [
    ...(state.dtoCourse.is10threq ? [{ label: 'High School Marksheet', name: 'high_school_marksheet' }] : []),
    ...(state.dtoCourse.is12threq ? [{ label: 'Intermediate Marksheet', name: 'intermediate_marksheet' }] : []),
    ...(state.dtoCourse.isgradreq ? [{ label: 'Under Graduation Marksheet', name: 'ug_marksheet' }] : []),
    ...(state.dtoCourse.isphotoidreq ? [{ label: 'Photo', name: 'photo' }] : []),
    ...(state.dtoCourse.is_aadhar_req ? [{ label: 'Aadhaar Card', name: 'aadhaar_card' }] : []),
    ...(state.dtoCourse.is_birth_certi_req ? [{ label: 'Birth Certificate', name: 'birth_certificate' }] : []),
    ...(state.dtoCourse.is_samagraid_req ? [{ label: 'Samagra Id', name: 'samagra_id' }] : []),
    ...(state.dtoCourse.is_tc_req ? [{ label: 'Transfer Certificate', name: 'transfer_certificate' }] : []),
    ...(state.dtoCourse.prev_class_marksheet ? [{ label: 'Previous Class Marksheet', name: 'prev_class_marksheet' }] : [])
  ];

  return (
    <>
      <MyLocalizationProvider>
        <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '0.1rem 1rem' }}>
          <MyGrid size={{ xs: 12 }}>
            <MyBox sx={{ textAlign: 'center' }}>
              <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '25px', color: '#204a76' }} >
                {isEditMode ? 'Verify Admission' : 'Admission'}
              </MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', mt: 0 }}>
              Student Personal Details
            </MyTypography>
          </MyGrid>
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
              onChange={onLookupIdNameChange('course')}
              onBlur={onCourseIdBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course"
                  placeholder="Select Class..."
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.course_id ? true : false}
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
                dayjs(state.dtoAdmission.admission_date).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                  ? null
                  : dayjs(state.dtoAdmission.admission_date).tz(customerTimezone).toDate()
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
            <MyTextField
              label="First Name"
              name="first_name"
              value={state.dtoAdmission.first_name}
              onChange={onInputNameChange}
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
              value={state.dtoAdmission.last_name}
              onChange={onInputNameChange}
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
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyDatePicker
              label="Date Of Birth"
              onChange={onDobChange}
              value={
                dayjs(state.dtoAdmission.dob).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                  ? null
                  : dayjs(state.dtoAdmission.dob).tz(customerTimezone).toDate()
              }
              onBlur={onDobBlur}
              minDate={dayjs(gConstants.DATE_OF_BIRTH2).toDate()}                 // earliest allowed date
              maxDate={dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
            error={!!state.errorMessages.dob}
            // shouldDisableDate={(date) => {
            //   const lessThanTwoYears = dayjs(date).isAfter(dayjs().subtract(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR));
            //   const before1950 = dayjs(date).isBefore(dayjs(gConstants.DATE_OF_BIRTH2));
            //   return lessThanTwoYears || before1950;
            // }}
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
              filterOptions={(options) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
              Contact Details
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Address"
              name="address"
              value={state.dtoAdmission.address}
              placeholder="Enter Your Address"
              onChange={onInputNameChange}
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
              value={{
                id: state.dtoAdmission.country_id,
                text: state.dtoAdmission.country_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCountryLookup}
              onChange={onLookupIdNameChange('country')}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Country"
                  placeholder="Select Country Name"
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
              onChange={onLookupIdNameChange('state')}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="State"
                  placeholder="Select State Name"
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
              label="City Name"
              name="city_name"
              value={state.dtoAdmission.city_name}
              onChange={onInputNameChange}
              onBlur={onCityNameBlur}
              placeholder="Enter City Name"
              inputProps={{
                maxLength: gConstants.SCHOOL_NAME_LENGTH
              }}
              error={state.errorMessages.city_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.city_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyTextField
              label="Zip code"
              name="zip_code"
              value={state.dtoAdmission.zip_code}
              onChange={onZipCodeChange}
              onBlur={onZipCodeBlur}
              placeholder="Enter 6-digit Zip code"
              inputProps={{
                maxLength: gConstants.ZIP_CODE_LENGTH,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              error={state.errorMessages.zip_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.zip_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyTextField
              label="E-Mail"
              name="email"
              value={state.dtoAdmission.email}
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
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyPhoneNumber
              label="Mobile #"
              onChange={onPhoneNoChange('phone_no')}
              placeholder="Enter 10-Digit Mobile Number"
              value={state.dtoAdmission.phone_no}
              onBlur={onPhoneNoBlur}
              error={state.errorMessages.phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.phone_no}</MyTypography>
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
              value={state.dtoAdmission.father_name}
              onChange={onInputNameChange}
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
              label="Father Occupation"
              name="father_occupation"
              value={state.dtoAdmission.father_occupation}
              onChange={onInputNameChange}
              placeholder="Enter Occupation"
              inputProps={{
                maxLength: gConstants.OCCUPATION_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onFatherOccupationBlur}
              error={state.errorMessages.father_occupation ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.father_occupation}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyPhoneNumber
              label="Father Phone No."
              onChange={onPhoneNoChange('father_phone_no')}
              value={state.dtoAdmission.father_phone_no}
              onBlur={onFatherPhoneNoBlur}
              error={state.errorMessages.father_phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.father_phone_no}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Mother Name"
              name="mother_name"
              value={state.dtoAdmission.mother_name}
              onChange={onInputNameChange}
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
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Mother Occupation"
              name="mother_occupation"
              value={state.dtoAdmission.mother_occupation}
              onChange={onInputNameChange}
              placeholder="Enter Occupation"
              inputProps={{
                maxLength: gConstants.OCCUPATION_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onMotherOccupationBlur}
              error={state.errorMessages.mother_occupation ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.mother_occupation}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyPhoneNumber
              label="Mother Phone Number"
              onChange={onPhoneNoChange('mother_phone_no')}
              value={state.dtoAdmission.mother_phone_no}
              onBlur={onMotherPhoneNoBlur}
              error={state.errorMessages.mother_phone_no ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.mother_phone_no}</MyTypography>
          </MyGrid>
          {(state.dtoCourse.is10threq || state.dtoCourse.is12threq || state.dtoCourse.isgradreq) && (
            <>
              <MyGrid size={{ xs: 12 }}>
                <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
                  Educational Details
                </MyTypography>
              </MyGrid>
              {state.dtoCourse.is10threq && (
                <>
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="High School Name(10th)"
                      name="highschoolname"
                      value={state.dtoAdmission.highschoolname}
                      onChange={onInputNameChange}
                      inputProps={{
                        maxLength: gConstants.SCHOOL_NAME_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
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
                        maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
                      }}
                      error={state.errorMessages.highschoolpercentage ? true : false}
                    />
                    <MyTypography className="error"> {state.errorMessages.highschoolpercentage}</MyTypography>
                  </MyGrid>
                </>
              )}

              {state.dtoCourse.is12threq && (
                <>
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Higher Secondary School Name(12th)"
                      name="highersschoolname"
                      value={state.dtoAdmission.highersschoolname}
                      onChange={onInputNameChange}
                      inputProps={{
                        maxLength: gConstants.SCHOOL_NAME_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
                      }}
                      error={state.errorMessages.highersschoolname ? true : false}
                    />
                    <MyTypography className="error"> {state.errorMessages.highersschoolname}</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Higher Secondary School Percentage"
                      name="highersschoolpercentage"
                      value={state.dtoAdmission.highersschoolpercentage}
                      onChange={onInputChange}
                      inputProps={{
                        maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
                      }}
                      error={!!state.errorMessages.highersschoolpercentage}
                    />
                    <MyTypography className="error"> {state.errorMessages.highersschoolpercentage}</MyTypography>
                  </MyGrid>
                </>
              )}
              {state.dtoCourse.isgradreq && (
                <>
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Graduation School/University"
                      name="graduationname"
                      value={state.dtoAdmission.graduationname}
                      onChange={onInputNameChange}
                      inputProps={{
                        maxLength: gConstants.SCHOOL_NAME_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
                      }}
                      error={state.errorMessages.graduationname ? true : false}
                    />
                    <MyTypography className="error"> {state.errorMessages.graduationname}</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Graduation Percentage"
                      name="graduationpercentage"
                      value={state.dtoAdmission.graduationpercentage}
                      onChange={onInputChange}
                      inputProps={{
                        maxLength: gConstants.PERCENTAGE_MAX_LENGTH,
                        pattern: '^[A-Za-z]{1,2}$'
                      }}
                      error={state.errorMessages.graduationpercentage ? true : false}
                    />
                    <MyTypography className="error"> {state.errorMessages.graduationpercentage}</MyTypography>
                  </MyGrid>
                </>
              )}
            </>
          )}
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '2px solid #999999', pb: 0, mb: 0 }}>
              Any Other Information
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyTextField
              label="Aadhaar Number"
              name="aadhaar_no"
              value={state.dtoAdmission.aadhaar_no}
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
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyTextField
              label="Samagra ID"
              name="samagra_id"
              value={state.dtoAdmission.samagra_id}
              onChange={onSamagraIdChange}
              onBlur={onSamagraIdBlur}
              placeholder="Enter 9-digit Samagra Id"
              inputProps={{
                maxLength: gConstants.SAMAGRA_ID_LENGTH,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              error={!!state.errorMessages.samagra_id}
            />
            <MyTypography className="error">{state.errorMessages.samagra_id}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4 }}>
            <MyTextField
              label="PEN No"
              name="pen_no"
              value={state.dtoAdmission.pen_no}
              onChange={onPenNoChange}
              onBlur={onPenNoBlur}
              placeholder="Enter 11-digit PEN No"
              inputProps={{
                maxLength: gConstants.PEN_NO_LENGTH,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              error={!!state.errorMessages.pen_no}
            />
            <MyTypography className="error">{state.errorMessages.pen_no}</MyTypography>
          </MyGrid>{' '}
          {requiredDocs.length > 0 && (
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

              {requiredDocs.map((doc, index) => (
                <MyGrid size={{ xs: 12, sm: 6 }} key={index}>
                  <MyTextField
                    type="file"
                    id={`Document_image_${doc.name}`}
                    label={doc.label}
                    name="files"
                    onChange={(e) => handleDocumentUpload(e, doc.name as keyof AdmissionTechDTO)}
                    slotProps={{ inputLabel: { shrink: true } }}
                    fullWidth
                  />
                </MyGrid>
              ))}
            </MyGrid>
          )}
          {isEditMode && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
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
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
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
                checked={state.dtoAdmission.undertaking === 'Yes'}
                onChange={(e) => onUndertakingChange(e.target.checked)}
              />
              I agree to the below undertaking.
            </label>
          </MyGrid>{' '}
          <MyGrid size={{ xs: 12 }}>
            <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Undertaking/Declaration:
            </MyTypography>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>I fully understand that submitting this application form does not in any way guarantee admission to the institute.</li>
              <li>
                I agree that admission will be subject to availability of seats, fulfillment of eligibility criteria (if any), and
                submission of all required documents/fees.
              </li>
              <li>
                I certify that the personal details, academic information, and contact details provided in this form are true and correct. I
                shall not request any alteration in these details once submitted.
              </li>
              <li>
                I undertake that all information and documents submitted are genuine and not misleading. I understand that providing false
                or incomplete details may result in cancellation of my admission at any stage of the course.
              </li>
              <li>
                I agree to abide by all academic, administrative, disciplinary, and behavioral rules and regulations of the institute.
              </li>
            </ul>

            <MyTypography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
              Instructions:
            </MyTypography>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>
                Admission/Registration for a particular batch/session is <strong>non-transferable</strong> to any other batch, session, or
                to another student.
              </li>
              <li>
                Submission of the application form or payment of registration fee does not guarantee admission. Admission will depend on
                seat availability and institute’s policies.
              </li>
              <li>
                Applicants must attach/submit copies of their academic mark sheets, ID proof, and photographs as required by the institute.
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
      </MyLocalizationProvider>
    </>
  );
};

export default memo(AdmissionReviewEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
