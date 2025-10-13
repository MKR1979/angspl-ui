'use client';
import useNotesInsights from './useNotesInsights';
import './notes-insights.css';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';

interface ClientNotesInsightProps {
  courseId?: number;
  courseName?: string;
}

const NotesInsightsPage: React.FC<ClientNotesInsightProps> = (props) => {
  const {
    currentProgram,
    state,
    goToNext,
    courseId,
    goToPrev,
    isPrevDisabled,
    isNextDisabled,
    // onCourseBlur,
    handleDownloadPdf,
    onCourseChange,
    setOpen1,
    setClose1,
    handleCopy,
    copied
  } = useNotesInsights(props);

  if (!currentProgram) return <p>Loading...</p>;
  console.log('client page course data:-',state.arrCourseLookup );
  return (
    <>
      <MyGrid container spacing={2} >
        <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}  >
          <MyAutocomplete sx={{ maxWidth: 500, minWidth: 300, marginBottom: '10px', }}
            open={state.open1}
            onOpen={courseId ? undefined : setOpen1}
            onClose={courseId ? undefined : setClose1}
            value={state.arrCourseLookup.find((opt) => opt.id === (courseId ?? state.dtoStudyNotes.course_id)) ?? { id: 0, text: '' }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrCourseLookup}
            onChange={onCourseChange}
            filterOptions={(options, state) => {
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Select Course"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                    sx: {
                      fontSize: '17px',
                      fontWeight: '500',
                      transform: 'translate(14px, -19px) scale(1)'
                    }
                  }
                }}
                error={!!state.errorMessages.course_name}
                placeholder="Select your course..."
              />
            )}
          />
          <MyTypography className="error" sx={{ fontSize: '12px' }}>  {state.errorMessages.course_name} </MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }} className="notes-insight-title1" sx={{ fontSize: '16px', fontWeight: 500 }} >
          Title:- {currentProgram?.title}
        </MyGrid>
      </MyGrid>

      <div className="notes-insight-container">
        <div className="notes-insight-details">
          <div className="notes-container">
            <button className="copy-button" onClick={handleCopy}>
              📋Copy
            </button>
            {copied && <p className="copied-message show">Copied!</p>}
            <button className="pdf-button" onClick={handleDownloadPdf}>
              📄 PDF
            </button>
            <pre className="notes-insight-code"> {currentProgram.description?.code || ''}</pre>
          </div>
        </div>
        <div className="button-container">
          <button className="prev-button" onClick={goToPrev} disabled={isPrevDisabled}>
            Prev
          </button>
          <button className="next-button" onClick={goToNext} disabled={isNextDisabled}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NotesInsightsPage;
