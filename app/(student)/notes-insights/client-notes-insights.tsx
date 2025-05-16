'use client';
// import React, { useState } from 'react';
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
    onCourseBlur,
    handleDownloadPdf,
    onCourseChange,
    setOpen1,
    setClose1,
    handleCopy,
    copied
  } = useNotesInsights(props);

  if (!currentProgram) return <p>Loading...</p>;
  return (
    <>
      <div className="quiz-container">
        <div className="course-tabs-wrapper">
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              className="custom-autocomplete"
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
              onInputChange={(event, newInputValue) => {
                console.log('User input:', newInputValue);
              }}
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
        </div>
      </div>

      <div className="notes-insight-container">
        <h4>Course Name:- {currentProgram.course_name}</h4>
        <h4 className="notes-insight-title">Title:- {currentProgram ? currentProgram.title : 'Loading...'}</h4>
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
