'use client';
import { useState } from 'react';
import './freecourses.css';
import useFreeCoursesEntry from './usefreeCourseEntry';
import CourseAllDTO from '@/app/types/CourseAllDTO';
import MyIconSearch from '@/app/custom-components/MyIconSearch';

const ClientFreeCourses = () => {
  const { state, onClickVideoeInsightsFree, onClickCodeInsightsFree, onClickNotesInsightsFree, onClickExamQuizFree } = useFreeCoursesEntry();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = (state.arrCourseListAll ?? [])
    .filter((item: CourseAllDTO) => !item.is_paid)
    .filter(
      (item: CourseAllDTO) =>
        (item.course_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.course_code ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.course_type_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {state.isLoading && <div className="loading-spinner"></div>}
      <div className="search-wrapper">
        <span className="search-icon">
          <MyIconSearch />
        </span>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="free-course-container">
        {filteredCourses.map((item: CourseAllDTO) => (
          <div key={item.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
            <div className="free-course-boxes">
              <h2 className="free-course-name">{item.course_name}</h2>
              <p className="free-course-data">
                {item.course_code} | {item.duration} | {item.price}
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div
                  className="free-course-category"
                  onClick={item.is_video ? () => onClickVideoeInsightsFree(item.id) : undefined}
                  title={item.is_video ? 'Click here to check Video Insight' : 'Video Insight not available'}
                  style={{
                    cursor: item.is_video ? 'pointer' : 'not-allowed',
                    opacity: item.is_video ? 1 : 0.6
                  }}
                >
                  <h3
                  // style={{
                  //   color: item.is_video ? '#2563EB' : '#6B7280',
                  //   fontWeight: '700',
                  //   fontSize: '1.0rem'
                  // }}
                  >
                    💻 Video Insight
                  </h3>
                  <p
                    style={{
                      color: item.is_video ? '#2563EB' : '#6B7280',
                      fontWeight: '700'
                    }}
                  >
                    {item.is_video ? 'View Video Insight' : 'Video Insight Not Available'}
                  </p>
                </div>

                <div className="free-course-category">
                  <h3 className="font-semibold text-lg">📖 Course Content</h3>
                  <p className="text-gray-700">{state.dtoFreeCourses.Content}</p>
                </div>
                <div
                  className="free-course-category"
                  onClick={item.is_notes ? () => onClickNotesInsightsFree(item.id) : undefined}
                  title={item.is_notes ? 'Click here to check Notes Insight' : 'Notes Insight not available'}
                  style={{
                    cursor: item.is_notes ? 'pointer' : 'not-allowed',
                    opacity: item.is_notes ? 1 : 0.6
                  }}
                >
                  <h3
                  // style={{
                  //   color: item.is_notes ? '#2563EB' : '#6B7280',
                  //   fontWeight: '700',
                  //   fontSize: '1.0rem'
                  // }}
                  >
                    📝 Notes Insight
                  </h3>
                  <p
                    style={{
                      color: item.is_notes ? '#2563EB' : '#6B7280',
                      fontWeight: '700'
                    }}
                  >
                    {item.is_notes ? 'View Notes Insight' : 'Notes Insight Not Available'}
                  </p>
                </div>
                <div
                  className="free-course-category"
                  onClick={item.is_code_project ? () => onClickCodeInsightsFree(item.id) : undefined}
                  title={item.is_code_project ? 'Click here to check Code Insight' : 'Code Insight not available'}
                  style={{
                    cursor: item.is_code_project ? 'pointer' : 'not-allowed',
                    opacity: item.is_code_project ? 1 : 0.6
                  }}
                >
                  <h3
                  // style={{
                  //   color: item.is_code_project ? '#2563EB' : '#6B7280',
                  //   fontWeight: '700',
                  //   fontSize: '1.0rem'
                  // }}
                  >
                    💻 Code Insight
                  </h3>
                  <p
                    style={{
                      color: item.is_code_project ? '#2563EB' : '#6B7280',
                      fontWeight: '700'
                    }}
                  >
                    {item.is_code_project ? 'View Code Insight' : 'Code Insight Not Available'}
                  </p>
                </div>
                <div
                  className="free-course-category"
                  onClick={item.is_exam ? () => onClickExamQuizFree(item.id) : undefined}
                  title={item.is_exam ? 'Click here to check Exam Quiz' : 'Exam Quiz not available'}
                  style={{
                    cursor: item.is_exam ? 'pointer' : 'not-allowed',
                    opacity: item.is_exam ? 1 : 0.6
                  }}
                >
                  <h3 >  📝 Exam Quiz </h3>
                  <p
                    style={{
                      color: item.is_notes ? '#2563EB' : '#6B7280',
                      fontWeight: '700'
                    }}
                  >
                    {item.is_exam ? 'View Exam Quiz' : 'Exam Quiz Not Available'}
                  </p>
                </div>

                <div className="free-course-category">
                  <h3 className="font-semibold text-lg">📄 Sample Questions File</h3>
                  <a href={`/pdfs/${state.dtoFreeCourses.Sample_Questions_File}`} target="_blank" className="text-blue-500 underline">
                    Download Sample Questions PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!state.isLoading && filteredCourses.length === 0 && <p>No Courses found</p>}
    </div>
  );
};

export default ClientFreeCourses;
