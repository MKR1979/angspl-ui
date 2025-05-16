'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCodeProjectEntry from './useCodeProjectEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CodeProjectDTO from '@/app/types/CodeProjectDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import * as gConstants from '../../constants/constants';

type CodeProjectEntryProps = {
  dtoCodeProject: CodeProjectDTO;
  arrCourseLookup: LookupDTO[];
};

const CodeProjectEntry = (props: CodeProjectEntryProps) => {
  const {
    state,
    onInputChange,
    onCourseChange,
    onStatusBlur,
    onTitleBlur,
    onCourseBlur,
    onCodeProjectStatusChange,
    onDescriptionBlur,
    onSourceCodeBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
  } = useCodeProjectEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoCodeProject.course_id,
                text: state.dtoCodeProject.course_name,
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onCourseChange}
              filterOptions={(options) => // to remove the empty selectable string in the lookup
                options.filter((option: any) => option.text && option.text.trim() !== '')
              }
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  onBlur={onCourseBlur}
                  error={state.errorMessages.course_name ? true : false}
                />
              )}
              
            />
            <MyTypography className="error">
              {state.errorMessages.course_name}
            </MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Title"
                name="title"
                value={state.dtoCodeProject.title}
                onChange={onInputChange}
                inputProps={{
                maxLength:  gConstants.CODE_PROJECT_TITLE_LENGTH, 
                pattern: "^[A-Za-z]{1,2}$", 
                }}
                onBlur={onTitleBlur}
                error={state.errorMessages.title ? true : false}
                />
              <MyTypography className="error"> {state.errorMessages.title}</MyTypography>
            </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Description"
              name="description"
              value={state.dtoCodeProject.description}
              onChange={onInputChange}
              onBlur={onDescriptionBlur}
              error={state.errorMessages.description ? true : false}
              multiline
              minRows={1} // Minimum height
              maxRows={4} // Optional: limit max expansion
              fullWidth
            />
            <MyTypography className="error">
              {state.errorMessages.description}
            </MyTypography>
          </MyGrid>
        
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoCodeProject.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseStatusLookup}
              onChange={onCodeProjectStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options) =>   // to remove the empty selectable string in the lookup
                options.filter((option: any) => option.text && option.text.trim() !== '')
              }
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error">
              {state.errorMessages.status}
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Source Code"
              name="source_code"
              value={state.dtoCodeProject.source_code}
              onChange={onInputChange}
              onBlur={onSourceCodeBlur}
              error={state.errorMessages.source_code ? true : false}
              multiline
              minRows={2} // Minimum height
              maxRows={10} // Optional: limit max expansion
              fullWidth
            />
            <MyTypography className="error">
              {state.errorMessages.source_code}
            </MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>

      <MyDivider />

      <MyCardActions>
        <MyButton onClick={onSaveClick}>Save</MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(CodeProjectEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});