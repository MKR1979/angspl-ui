'use client';
import { useState, useEffect } from 'react';
import './programs.css';
import usePrograms from './usePrograms';
import SuccessMessage from './client-payee-details'; // Ensure this is imported
import MyIconSearch from '@/app/custom-components/MyIconSearch';
import CourseAllDTO from '@/app/types/CourseAllDTO';
const ClientPrograms = () => {
  const { state, handlePayNow, submitted, selectedCourse, selectedPrice } = usePrograms();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (state.arrCourseListAll && state.arrCourseListAll.length > 0) {
      setLoading(false);
    }
  }, [state.arrCourseListAll]);

  return (
    <>
      {submitted ? (
        <SuccessMessage course={selectedCourse} price={selectedPrice} />
      ) : loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Courses...</p>
        </div>
      ) : (
        <div className="programs-container">
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

          <div className="course-categories-container">
            {(state.arrCourseListAll ?? [])
              .filter((item: CourseAllDTO) => item.is_paid)
              .map(
                (course) =>
                  course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) && ( // Apply search filter here
                    <div key={course.course_code} className="course-category">
                      <img
                        src={course?.logo_url && course.logo_url.trim() !== '' ? course.logo_url : '/default-image.png'}
                        alt={course?.course_name || 'Course Image'}
                        className="course-image"
                      />
                      <h3 className="course-category-header">{course?.course_name}</h3>
                      <p className="course-price">₹{course?.price}</p>
                      <ul className="course-items-list">
                        {(course as any)?.items?.map((item: string) => (
                          <li key={item} className="course-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => handlePayNow(course?.course_name, course?.price)} className="enroll-button">
                        Enroll Now
                      </button>
                    </div>
                  )
              )}
          </div>
          {state.arrCourseListAll.every((course) => !course.course_name.toLowerCase().includes(searchQuery.toLowerCase())) && (
            <p>No courses found</p>
          )}
        </div>
      )}
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh; /* Full viewport height */
          width: 100vw; /* Full viewport width */
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999; /* Ensure it's above all other elements */
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid transparent;
          border-top: 6px solid #007bff;
          border-radius: 50%;
          animation:
            spin 1s linear infinite,
            glow 1.5s ease-in-out infinite alternate;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
          }
          100% {
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
          }
        }

        .loading-text {
          font-size: 18px;
          font-weight: bold;
          color: #007bff;
          margin-top: 10px;
          animation: fadeInOut 1.5s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ClientPrograms;
