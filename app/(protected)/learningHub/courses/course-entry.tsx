'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCourseEntry from './useCourseEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CourseDTO from '@/app/types/CourseDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import './course.css';
import * as Constants from '../../../(protected)/constants/constants';
import * as gConstants from '@/app/constants/constants';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import { useSelector } from '../../../store';

type CourseEntryProps = {
  dtoCourse: CourseDTO;
};

const CourseEntry = (props: CourseEntryProps) => {
  const {
    state,
    onInputChange,
    onCodeChange,
    handleDocumentUpload,
    onRegAmountChange,
    onCourseNameBlur,
    onDurationBlur,
    onStatusBlur,
    onCourseTypeBlur,
    onCourseCodeBlur,
    onCourseStatusChange,
    onCourseTypeChange,
    onRegFeeBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onPriceBlur,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onDurationUnitBlur,
    onDurationUnitChange,
    saving
  } = useCourseEntry(props);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const currencySymbol = siteConfig.find((c) => c.key === 'ENABLE_DEFAULT_CURRENCY')?.value ?? '$';
  const { companyInfo } = useSelector((state) => state.globalState);
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontSize: '1rem', borderBottom: '2px solid #999999', mt: 0 }}>
              Course Information
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4.5 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoCourse.course_type_name }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseTypeLookup}
              onChange={onCourseTypeChange}
              onBlur={onCourseTypeBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course Category"
                  placeholder="Select course type"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCourseTypeBlur}
                  error={state.errorMessages.course_type_name ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.course_type_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 5.5 }}>
            <MyTextField
              label="Course Title"
              name="course_name"
              value={state.dtoCourse.course_name}
              onChange={onInputChange}
              placeholder="Enter course name"
              inputProps={{
                maxLength: Constants.COURSE_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onCourseNameBlur}
              error={state.errorMessages.course_name ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 2 }}>
            <MyTextField
              label="Course Code"
              name="course_code"
              value={state.dtoCourse.course_code}
              onChange={onCodeChange}
              placeholder="Enter course code"
              inputProps={{
                maxLength: Constants.CODE_LENGTH,
                pattern: '^[A-Z0-9]+$'
              }}
              onBlur={onCourseCodeBlur}
            />
            <MyTypography className="error">{state.errorMessages.course_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4.5 }}>
            <MyTextField
              label="Duration (in Months/Years)"
              name="duration"
              value={state.dtoCourse.duration}
              onChange={onInputChange}
              placeholder="Enter course duration"
              slotProps={{
                input: {
                  inputComponent: MyNumericFormat as any,
                  inputProps: {
                    maxLength: Constants.COURSE_DURATION_LENGTH,
                    pattern: '^[A-Z0-9]+$'
                  }
                }
              }}
              onBlur={onDurationBlur}
            />
            <MyTypography className="error">{state.errorMessages.duration}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 3 }}>
            <MyAutocomplete
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoCourse.duration_unit }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrDurationUnitLookup}
              onChange={onDurationUnitChange}
              onBlur={onDurationUnitBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Duration Unit"
                  placeholder="Select Month/Year"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.duration_unit ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.duration_unit}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4.5 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoCourse.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseStausLookup}
              onChange={onCourseStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course Status"
                  placeholder="Select course status"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontSize: '1rem', borderBottom: '2px solid #999999', mt: 0 }}>
              Pricing
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 4.5 }}>
            <MyTextField
              label="Admission/Registration Fee"
              name="registration_fee"
              value={isNaN(state.dtoCourse.reg_fee) ? '' : Number(state.dtoCourse.reg_fee)}
              onChange={onRegAmountChange}
              onBlur={onRegFeeBlur}
              placeholder="Enter Registration Fee"
              slotProps={{
                input: {
                  inputComponent: MyNumericFormat as any,
                  inputProps: {
                    maxLength: gConstants.SAMAGRA_ID_LENGTH,
                    pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
                    prefix: currencySymbol
                  }
                }
              }}
              error={state.errorMessages.reg_fee ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.reg_fee}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="is_paid"
                checked={state.dtoCourse.is_paid}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Paid Course
            </label>
          </MyGrid>
          {state.dtoCourse.is_paid && (
            <MyGrid size={{ xs: 12, sm: 4.5 }}>
              <MyTextField
                label="Course Fee"
                name="price"
                value={isNaN(state.dtoCourse.price) ? '' : Number(state.dtoCourse.price)}
                onChange={onInputChange}
                onBlur={onPriceBlur}
                placeholder="Enter course price"
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any,
                    inputProps: {
                      maxLength: gConstants.PEN_NO_LENGTH,
                      pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
                      prefix: currencySymbol
                    }
                  }
                }}
                error={state.errorMessages.price ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.price}</MyTypography>
            </MyGrid>
          )}
          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontSize: '1rem', borderBottom: '2px solid #999999', mt: 0 }}>
              Supporting Documents
            </MyTypography>
          </MyGrid>
          {companyInfo?.company_type === Constants.COMPANY_TYPE_COLLEGE && (
            <>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="is10threq"
                    checked={state.dtoCourse.is10threq}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;10th
                </label>
              </MyGrid>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="is12threq"
                    checked={state.dtoCourse.is12threq}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;12th
                </label>
              </MyGrid>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isdiplomareq"
                    checked={state.dtoCourse.isdiplomareq}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;Diploma
                </label>
              </MyGrid>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isgradreq"
                    checked={state.dtoCourse.isgradreq}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;Graduation
                </label>
              </MyGrid>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="ispgreq"
                    checked={state.dtoCourse.ispgreq}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;Post Graduation
                </label>
              </MyGrid>
            </>
          )}
          {companyInfo?.company_type === Constants.COMPANY_TYPE_SCHOOL && (
            <>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="prev_class_marksheet"
                    checked={state.dtoCourse.prev_class_marksheet}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;Previous Class Marksheet
                </label>
              </MyGrid>
              <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="is_birth_certi_req"
                    checked={state.dtoCourse.is_birth_certi_req}
                    onChange={onInputChange}
                    style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
                  />
                  &nbsp;Birth Certificate
                </label>
              </MyGrid>
            </>
          )}

          <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="isphotoidreq"
                checked={state.dtoCourse.isphotoidreq}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Photo ID
            </label>
          </MyGrid>
          <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="is_aadhar_req"
                checked={state.dtoCourse.is_aadhar_req}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Aadhar Card
            </label>
          </MyGrid>
          <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="is_tc_req"
                checked={state.dtoCourse.is_tc_req}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Transfer Certificate
            </label>
          </MyGrid>
          <MyGrid size={{ xs: 6, sm: 3 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="is_samagraid_req"
                checked={state.dtoCourse.is_samagraid_req}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Samagra ID
            </label>
          </MyGrid>

          <MyGrid size={{ xs: 12 }} sx={{ mt: '-10px' }}>
            <MyTypography variant="h6" sx={{ fontSize: '1rem', borderBottom: '2px solid #999999', mt: 0 }}>
              Course Documents
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              type="file"
              id="Course_image"
              label="Course Thumbnail"
              name="files"
              // onChange={UploadImage}
              // onChange={(e) => handleDocumentUpload(e, doc.name as keyof CourseDTO)}
              onChange={(e) => handleDocumentUpload(e, 'thumbnail')}
              inputProps={{
                accept: '.jpg, .jpeg, .png'
              }}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              type="file"
              id="Course_image"
              label="Course Documents"
              name="files"
              // onChange={UploadImage1}
              onChange={(e) => handleDocumentUpload(e, 'documents_path')}
              inputProps={{
                accept: '.jpg, .jpeg, .png'
              }}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CourseEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
