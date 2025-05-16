'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useVideoUploadEntry from './useVideoUploadsEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
import LookupDTO from '@/app/types/LookupDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../constants/constants';

type VideoUploadsEntryProps = {
  dtoVideoUploads: VideoUploadsDTO;
  arrCourseLookup: LookupDTO[];
};

const VideoUploadsEntry = (props: VideoUploadsEntryProps) => {
  const {
    state,
    onInputChange,
    onTitleBlur,
    onStatusBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onVideoSourceBlur,
    onStatusChange,
    onCourseNameChange,
    onCourseBlur,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  } = useVideoUploadEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoVideoUploads.course_id,
                text: state.dtoVideoUploads.course_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onCourseNameChange}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase(); // lookup also works as search bar
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              onInputChange={(event, newInputValue) => {
                console.log('User input:', newInputValue);
              }} // code ends here for using lookup as search bar.
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCourseBlur}
                  error={state.errorMessages.course_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Title"
              name="title"
              value={state.dtoVideoUploads.title}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.VIDEO_TITLE_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              onBlur={onTitleBlur}
              error={state.errorMessages.title ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.title}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Video Url"
              name="video_url"
              value={state.dtoVideoUploads.video_source}
              onChange={onInputChange}
              onBlur={onVideoSourceBlur}
              error={state.errorMessages.title ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.video_source}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Description"
              name="description"
              value={state.dtoVideoUploads.description}
              onChange={onInputChange}
              error={state.errorMessages.description ? true : false}
              multiline
              minRows={1}
              maxRows={4}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.description}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Tags"
              name="tags"
              value={state.dtoVideoUploads.tags}
              onChange={onInputChange}
              inputProps={{
                maxLength: gConstants.VIDEO_TAGS_LENGTH,
                pattern: '^[A-Za-z]{1,2}$'
              }}
              error={state.errorMessages.tags ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.tags}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoVideoUploads.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrVideoUploadsStatusLookup}
              onChange={onStatusChange}
              filterOptions={(options) => options.filter((option: any) => option.text && option.text.trim() !== '')}
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

export default memo(VideoUploadsEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
