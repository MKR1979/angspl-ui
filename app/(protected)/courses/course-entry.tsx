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
import * as gConstants from '../../constants/constants';

type CourseEntryProps = {
  dtoCourse: CourseDTO;
};

const CourseEntry = (props: CourseEntryProps) => {
  const {
    state,
    onInputChange,
    UploadImage1,
    onCourseNameBlur,
    onDurationBlur,
    onStatusBlur,
    onCategoryBlur,
    onCourseCodeBlur,
    onCourseStatusChange,
    onCourseCategoryChange,
    UploadImage,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  } = useCourseEntry(props);
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Course Name"
              name="course_name"
              value={state.dtoCourse.course_name}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.COURSE_NAME_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onCourseNameBlur}
              error={state.errorMessages.course_name ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Course Code"
              name="course_code"
              value={state.dtoCourse.course_code}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.CODE_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onCourseCodeBlur}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Price"
              name="price"
              value={isNaN(state.dtoCourse.price) ? '' : Number(state.dtoCourse.price)}
              onChange={onInputChange}
              error={state.errorMessages.price ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.price}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Duration"
              name="duration"
              value={state.dtoCourse.duration}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.DURATION_LENGTH, // Restricts input to two characters
                pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
              }}
              onBlur={onDurationBlur}
              error={state.errorMessages.duration ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.duration}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoCourse.category }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseCategoryLookup}
              onChange={onCourseCategoryChange}
              onBlur={onCategoryBlur}
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Category"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCategoryBlur}
                  error={state.errorMessages.category ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.category}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              type="file"
              id="Course_image"
              label="Thumbnail"
              name="files"
              onChange={UploadImage}
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
              label="Documents path"
              name="files"
              onChange={UploadImage1}
              inputProps={{
                accept: '.jpg, .jpeg, .png'
              }}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
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
              filterOptions={(
                options // to remove the empty selectable string in the lookup
              ) => options.filter((option: any) => option.text && option.text.trim() !== '')}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
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
          <div className="isPaiddiv">
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="is_paid"
                  checked={state.dtoCourse.is_paid}
                  onChange={onInputChange}
                  className="accent-blue-600 w-5 h-5"
                />
                <span className="text-gray-800 ml-2">Is Paid</span>
              </label>
            </MyGrid>
          </div>

          {/* Only show checkbox if course name is filled */}
          {state.dtoCourse?.course_name && (
            <div className="document-selector">
              <h2 className="text-xl font-semibold">Select Mandatory Documents</h2>
              <div className="checkbox-list space-y-2">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="is10threq"
                    checked={state.dtoCourse.is10threq}
                    onChange={onInputChange}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="text-gray-800 ml-2">10th Marksheet</span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="is12threq"
                    checked={state.dtoCourse.is12threq}
                    onChange={onInputChange}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="text-gray-800 ml-2">12th Marksheet</span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isgradreq"
                    checked={state.dtoCourse.isgradreq}
                    onChange={onInputChange}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="text-gray-800 ml-2">Graduation Certificate</span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="ispgreq"
                    checked={state.dtoCourse.ispgreq}
                    onChange={onInputChange}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="text-gray-800 ml-2">Post Graduation Certificate</span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="isphotoidreq"
                    checked={state.dtoCourse.isphotoidreq}
                    onChange={onInputChange}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="text-gray-800 ml-2">Photo ID</span>
                </label>
              </div>
            </div>
          )}
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick}>Save</MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CourseEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
