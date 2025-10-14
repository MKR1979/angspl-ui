'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './course-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MyTypography from '@/app/custom-components/MyTypography';

const bannerImages = ['/coursemngImgs/course8.jpg', '/coursemngImgs/course7.jpg'];

const ClientCourseMgmt = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

    const images = ['/coursemngImgs/course.webp',  '/coursemngImgs/courses.PNG', '/coursemngImgs/courses1.jpg', '/coursemngImgs/courses3.webp.jpg'];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change page every 4 seconds
    return () => clearInterval(interval);
  }, []);
  console.log('test',clearInterval)
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';
  // const videoSrc1 = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';

  return (
    <>
      <div>
        <div className="about-banner">
          <img src={bannerImages[currentIndex]} alt="Admission Management" className="about-banner-img" />

          {/* Arrows */}
          <IconButton className="banner-arrow left" onClick={goToPrev}>
            <ArrowBackIos />
          </IconButton>
          <IconButton className="banner-arrow right" onClick={goToNext}>
            <ArrowForwardIos />
          </IconButton>
        </div>
        <MyBox
          sx={{
            width: { xs: '100%', sm: '76%' },
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <MyCardContent>
              <MyGrid container justifyContent="center" spacing={2}>
                <MyGrid container justifyContent="center">
                  <MyGrid size={{ xs: 12, sm: 12 }} textAlign="center">
                    <div className="section-heading">COURSE MANAGEMENT SYSTEM</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyGrid className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Course Module</span> is a key component
                  of the educational management system, designed to facilitate the creation, management, and administration
                  of courses offered by an institution. This module ensures that course information is captured in a
                  structured manner, enabling efficient enrollment, tracking, and documentation processes.
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">KEY HIGHLIGHT</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> <strong> Easy Course Creation </strong> – Add and manage courses with all essential details.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Paid/Free Courses</strong> – Toggle Is Paid with price input.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Document Uploads</strong> – Upload thumbnails and course files..
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Mandatory Documents</strong> – Select required documents for admission.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Status Control</strong> – Activate or deactivate courses easily.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>User-Friendly UI</strong> – Simple form with Save, Clear, and Cancel options.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Validation Rules</strong> – Ensures proper input and unique course code.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> <strong>Supports Admissions</strong> – Links course details with student enrollment.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <MyTypography
                    sx={{
                      fontSize: '24px',
                      textAlign: 'center',
                      marginTop: '5px',
                      marginBottom: '5px',
                      color: '#465063',
                      fontFamily: 'serif',
                      fontWeight: 'bold'
                    }}
                  >
                    How It Works Section
                  </MyTypography>
                  <div className="book-container">
                    <div className="book">
                      {images.map((src, index) => (
                        <img key={index} src={src} alt={`page-${index}`} className={`page ${index === current ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> After sign-in, the home dashboard opens automatically.
                      </li>
                      <li>
                        <span>&#10003;</span> From the left-side menu, click on accademics.
                      </li>
                      <li>
                        <span>&#10003;</span> Under accademics, select courses.
                      </li>
                     <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> The course dashboard will open, showing a list of existing courses.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">COURSES</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyGrid className="card-text">
                  To add a new course, begin by clicking on the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Add Course </span>
                  option. You will be prompted to enter the necessary details for the course, including
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Course Name, Course Code, Duration, </span>
                  and
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Course Type. </span>
                  It is important to ensure that all details are accurate and reflect the structure of the course you are creating.

                  In addition to the basic information, you can upload any relevant files, such as syllabus documents, reference materials, or course guidelines. This ensures that all necessary resources are linked with the course from the start.

                  Once all fields are filled and files uploaded, click on the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Save </span>
                  button to successfully create the course. The newly added course will now appear in the course list, where it can be assigned to students, edited for updates, or managed further as needed.
                </MyGrid>
                {/* <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Review Admissions</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>

                <MyCardContent className="card-text">
                  The Review Admission feature enables administrators to efficiently manage and monitor the entire admission process within
                  the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>School Management System</span>. Once logged in, administrators
                  can access the Academics section to view all admission entries in real time. The module allows filtering admissions based
                  on various criteria such as class, admission date, and academic session, providing quick access to relevant records.
                  <br />
                  Administrators can review each applicant’s complete admission details, including personal information, submitted
                  documents, fee payment status, and other related data. This feature streamlines the admission verification process,
                  ensuring transparency and accuracy. By centralizing admission review operations, it eliminates manual checks and enhances
                  decision-making efficiency for school staff and management.
                </MyCardContent> */}
              </MyGrid>
            </MyCardContent>
          </MyCard>
        </MyBox>       
          <div className="container">
            <div className="vertical_center">
              <p>
                © Copyright {new Date().getFullYear()} {COMPANY}, All rights reserved.
              </p>
              <div className="vertical_center">
                ||
                <a href="/terms">Terms of use</a>||
                <a href="/privacy-policy">Privacy Policy</a>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default memo(ClientCourseMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});