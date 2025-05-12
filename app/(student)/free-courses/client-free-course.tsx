'use client';
import { useState } from 'react';
import './freecourses.css';
import useFreeCoursesEntry from './usefreeCourseEntry';
import CourseAllDTO from '@/app/types/CourseAllDTO';
import MyIconSearch from '@/app/custom-components/MyIconSearch';

const ClientFreeCourses = () => {
  const { state, onSaveClick, onClickCodeInsightsFree } = useFreeCoursesEntry();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = (state.arrCourseListAll ?? [])
    .filter((item: CourseAllDTO) => !item.is_paid)
    .filter(
      (item: CourseAllDTO) =>
        item.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                <div className="free-course-category">
                  <h3 className="font-semibold text-lg">📖 Course Content</h3>
                  <p className="text-gray-700">{state.dtoFreeCourses.Content}</p>
                </div>

                <div className="free-course-category">
                  <h3 className="font-semibold text-lg">📝 Notes</h3>
                  <p className="text-gray-700">{state.dtoFreeCourses.Notes}</p>
                </div>

                <div
                  className={`free-course-category`}
                  onClick={item.code_project_id ? () => onClickCodeInsightsFree(item.id, item.course_name) : undefined}
                  title={item.code_project_id ? 'Click here to check Code Insight' : ''}
                  style={{
                    cursor: item.code_project_id ? 'pointer' : 'not-allowed'
                  }}
                >
                  <h3
                    style={{
                      color: item.code_project_id ? '#2563EB' : '#1F2937',
                      fontWeight: item.code_project_id ? '700' : '600',
                      fontSize: item.code_project_id ? '1.0rem' : '0.8rem'
                    }}
                  >
                    💻 Code Insight
                  </h3>
                  <p
                    style={{
                      color: item.code_project_id ? '#2563EB' : '#6B7280',
                      fontWeight: item.code_project_id ? '700' : '400'
                    }}
                  >
                    {item.code_project_id ? 'View Code Insight' : 'Not Available'}
                  </p>
                </div>
                <div
                  className={`free-course-category`}
                  onClick={() => onSaveClick(item.quiz_id, item.quiz_name)}
                  title={item.quiz_id ? 'Click here to see exam' : ''}
                  style={{
                    cursor: item.quiz_id ? 'pointer' : 'not-allowed'
                  }}
                >
                  <h3
                    style={{
                      color: item.quiz_id ? '#2563EB' : '#1F2937',
                      fontWeight: item.quiz_id ? '700' : '600',
                      fontSize: item.quiz_id ? '1.0rem' : '0.8rem'
                    }}
                  >
                    📝 Exam Quiz
                  </h3>
                  <p
                    style={{
                      color: item.quiz_id ? '#2563EB' : '#6B7280',
                      fontWeight: item.quiz_id ? '700' : '400'
                    }}
                  >
                    {item.quiz_id ? item.quiz_name || 'Attempt Quiz' : 'Not Available'}
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
