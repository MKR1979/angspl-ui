'use client';
import useCodeInsight from './useCodeInsight';
import './code-insight.css';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
interface ClientCodeProjectProps {
  courseId?: number;
  courseName?: string;
}

const CodeInsightPage: React.FC<ClientCodeProjectProps> = (props) => {
  const {
    currentProgram,
    state,
    goToNext,
    courseId,
    goToPrev,
    isPrevDisabled,
    isNextDisabled,
    handleDownloadPdf,
    onCourseChange,
    setOpen1,
    setClose1,
    handleCopy,
    copied
  } = useCodeInsight(props);

  if (!currentProgram) return <p>Loading...</p>;
  return (
    <>
      <MyGrid container spacing={2} >
        <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}  >
          <MyAutocomplete sx={{ maxWidth: 500, minWidth: 300, marginBottom: '10px', }}
            open={state.open1}
            onOpen={courseId ? undefined : setOpen1}
            onClose={courseId ? undefined : setClose1}
            value={state.arrCourseLookup.find((opt) => opt.id === (courseId ?? state.dtoCodeProject.course_id)) ?? { id: 0, text: '' }}
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

        <MyGrid size={{ xs: 12, sm: 6 }} className="code-insight-title1" sx={{ fontSize: '16px', fontWeight: 500 }} >
          Title:- {currentProgram?.title}
        </MyGrid>
      </MyGrid>

      <div className="code-insight-container1">
        <div className="code-insight-details1">
          <div className="code-container1">
            <button className="copy-button1" onClick={handleCopy}>
              📋Copy
            </button>
            {copied && <p className="copied-message show1">Copied!</p>}
            <button className="pdf-button1" onClick={handleDownloadPdf}>
              📄 PDF
            </button>
            <pre className="code-insight-code1"> {currentProgram.source_code?.code || ''}</pre>
          </div>
        </div>
        <div className="button-container1">
          <button className="prev-button1" onClick={goToPrev} disabled={isPrevDisabled}>
            Prev
          </button>
          <button className="next-button1" onClick={goToNext} disabled={isNextDisabled}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CodeInsightPage;
