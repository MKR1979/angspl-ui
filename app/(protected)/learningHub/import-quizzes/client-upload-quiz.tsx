'use client';
import useUploadQuiz from './useUploadQuiz';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import QuizDTO from '@/app/types/QuizDTO';
import * as Constants from '../../constants/constants';
import MyButton from '@/app/custom-components/MyButton';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import Tooltip from '@/app/custom-components/MyTooltip';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';

type ImportQuizEntryProps = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
};

const ClientUploadQuiz = (props: ImportQuizEntryProps) => {
  const {
    handleFileUpload,
    uploadStatus,
    uploadStatusType,
    handleUploadClick,
    onQuizNameBlur,
    onInputChange,
    onCodeChange,
    onCourseBlur,
    onCourseNameChange,
    onQuizStatusChange,
    onQuizStatusBlur,
    onQuizTypeBlur,
    onQuizTypeChange,
    onQuizCodeBlur,
    onExamDurationChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    state,
    onClearClick
  } = useUploadQuiz(props);
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{
                  id: state.dtoQuiz.course_id,
                  text: state.dtoQuiz.course_name
                }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCourseLookup}
                onChange={onCourseNameChange}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Course"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onCourseBlur}
                    placeholder="Select Course"
                    error={state.errorMessages.course_name ? true : false}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Quiz Name"
                name="quiz_name"
                value={state.dtoQuiz.quiz_name}
                onChange={onInputChange}
                placeholder="Enter Exam Name"
                inputProps={{
                  maxLength: Constants.QUIZ_NAME_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                onBlur={onQuizNameBlur}
                error={state.errorMessages.quiz_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.quiz_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Quiz Code"
                name="quiz_code"
                value={state.dtoQuiz.quiz_code}
                onChange={onCodeChange}
                onBlur={onQuizCodeBlur}
                placeholder="Enter Exam Code"
                inputProps={{
                  maxLength: Constants.CODE_LENGTH,
                  pattern: '^[A-Z0-9]+$'
                }}
                error={state.errorMessages.quiz_code ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.quiz_code}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ text: state.dtoQuiz.quiz_type }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrQuizTypeLookup}
                onChange={onQuizTypeChange}
                onBlur={onQuizTypeBlur}
                filterOptions={(options, state) => {
                  // searchable lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Quiz Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onQuizTypeBlur}
                    placeholder="eg. practice / Graded exam"
                    error={state.errorMessages.quiz_type ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.quiz_type}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Exam Duration"
                name="exam_duration"
                value={state.dtoQuiz.exam_duration || ''}
                //value={state.dtoQuiz.exam_duration === 0 ? '' : state.dtoQuiz.exam_duration}
                onChange={onExamDurationChange}
                placeholder="Enter value in minutes"
                inputProps={{
                  maxLength: Constants.EXAM_DURATION_LENGTH,
                  pattern: '^[A-Za-z]{1,2}$'
                }}
                error={state.errorMessages.exam_duration ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.exam_duration}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoQuiz.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrQuizStatusLookup}
                onChange={onQuizStatusChange}
                onBlur={onQuizStatusBlur}
                filterOptions={(options, state) => {
                  // searchable lookup
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
                    onBlur={onQuizStatusBlur}
                    placeholder="eg. Active, In-active"
                    error={state.errorMessages.status ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <input type="file" accept=".csv,.json,.docx,.pdf" onChange={handleFileUpload} />
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color:
                    uploadStatusType === 'success'
                      ? 'green'
                      : uploadStatusType === 'warning'
                        ? 'orange'
                        : uploadStatusType === 'error'
                          ? 'red'
                          : 'inherit'
                }}
              >
                {uploadStatus}
              </p>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider sx={{ my: 1 }}></MyDivider>
        <MyCardActions>
          {findPermission(userPermissions, 81) && <MyButton onClick={handleUploadClick}>Upload</MyButton>}
          <MyButton onClick={onClearClick}>Clear</MyButton>
        </MyCardActions>
        <MyGrid size={{ xs: 12 }}>
          <MyTypography className="already-msg" sx={{
            fontSize: '14px',
            margin: '5px',
            textAlign: { xs: 'center', md: 'left' }, // mobile -> center, laptop -> left
          }}>
            Please refer to the supported file formats before uploading:&nbsp;
            <Tooltip title="Download sample Word format">
              <a href="/data/ImportQuizFormatWord.docx">Word Format</a>
            </Tooltip>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Tooltip title="View sample JSON format">
              <a href="/data/ImportQuizFormatJson.json" target="_blank" rel="noopener noreferrer">
                JSON Format
              </a>
            </Tooltip>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Tooltip title="Download sample CSV format">
              <a href="/data/ImportQuizFormatCSV.csv">CSV Format</a>
            </Tooltip>
          </MyTypography>
        </MyGrid>
      </MyCard>
    </>
  );
};

export default ClientUploadQuiz;
