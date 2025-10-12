'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './stu-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const bannerImages = ['/ModulesImgs/student.png', '/ModulesImgs/admsMng1.png', '/ModulesImgs/admsMng2.png'];

const ClientStuMgmt = () => {
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

  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';
  const videoSrc1 = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';

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
        {/* <div className="about-banner">
          <img src="/ModulesImgs/admsMng.png" alt="Admission Management" className="about-banner-img" />
        </div> */}
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
                    <div className="section-heading">STUDENT MANAGEMENT</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Student Management System</span> is a comprehensive digital
                  platform designed to efficiently manage every aspect of a student’s academic journey — from admission to performance
                  tracking. It serves as the central hub for students, teachers, and administrators to interact, share information,
                  and monitor progress in real time.
                  <br></br>
                  This system streamlines all student-related operations such as course enrollment, attendance, examinations,
                  and fee management. It ensures that every student’s record is organized, accessible, and up to date, helping
                  institutions maintain accuracy and transparency in academic administration.
                </MyCardContent>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">KEY BENEFITS OF STUDENT MANAGEMENT SYSTEM</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> <strong>Centralized Student Information</strong> – All student records stored in one secure platform.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Improved Academic Management</strong> – Easy tracking of courses, performance, and progress.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Time-Saving Automation</strong> – Attendance, reports, and results are automatically managed.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Smart Performance Tracking</strong> – Students can monitor marks, quizzes, and progress.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Enhanced Communication</strong> – Instant notifications for exams, assignments, and updates.
                      </li>
                      <li>
                        <span>&#10003;</span> <strong>Transparent Fee Management</strong> – Clear view of fees, payments, fines, and discounts.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> <strong>Better Student Engagement</strong> – Interactive dashboards, digital materials, and online tests.
                      </li>
                    </ul>
                  </MyCardContent>
       
               </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                   <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Add New Students</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                </MyGrid>

                <MyCardContent className="card-text">
                The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add New Students</span> feature in a Student Management System allows administrators to efficiently register new students
                 into the platform. Using this functionality, the admin can enter essential personal details such as the student’s full name,
                  date of birth, contact information, and address, along with academic information like course enrollment, batch, 
                  admission date, and student ID. Additionally, the system enables uploading of relevant documents, including photos, 
                  ID proofs, or certificates. Administrators can also create or assign login credentials for the student, giving them
                   secure access to their personalized dashboard. Once the information is saved, the student record is stored in the 
                   system, ensuring organized and accurate record-keeping. This feature not only streamlines the enrollment process
                    but also facilitates easy communication, course assignment, and access to learning resources, thereby enhancing overall
                     administrative efficiency and student experience.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading"> Student Courses</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyCardContent className="card-text">
               The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>My Courses</span> section in the Student Dashboard
               provides students with a comprehensive view of all the courses available to them. It is typically divided into Enrolled
                Courses and Free Courses. Enrolled Courses are those that the student has officially registered for, either through
                 the institution or paid subscriptions. These courses provide full access to study materials, assignments, quizzes,
                  tests, and progress tracking. On the other hand, Free Courses are accessible without formal enrollment or payment
                   and serve as a way for students to explore new topics or skill areas. Each course, whether enrolled or free,
                    displays its name, duration, instructor, and current progress. Students can click on a course to access detailed
                     content, including lessons, quizzes, and additional resources, allowing them to manage their learning efficiently
                      and track their academic development in one convenient location.  
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Study Kit</h2>
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
                The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Study Kit</span> is a dedicated learning resource in the Student Dashboard
                 that helps students access all essential study materials in one place. It includes <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Code Insights</span>,
                 which provide programming examples, practical exercises, and coding demonstrations to strengthen hands-on skills. The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Notes Insights </span>section
                 offers summarized notes, key concepts, and important references to make revision faster and easier. Additionally, <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Videos Insights</span> presents tutorials
                , demonstrations, and recorded lectures, allowing students to learn visually and understand complex topics more effectively. Together, these features of the Study Kit provide a structured, interactive, and comprehensive
                 approach to learning, enabling students to improve their knowledge and skills efficiently.
                </MyCardContent>
                 <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Study Tests</h2>
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
                The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Skill Tests</span> section in the Student Dashboard
                 is designed to help students assess their understanding of course material and measure their learning progress
                 . It provides a variety of quizzes, tests, and assessments aligned with the topics covered in enrolled courses.
                  Each test evaluates different skills, including theoretical knowledge, practical problem-solving, and 
                  application-based learning. Students can attempt these tests within a set duration, and the system provides 
                  instant feedback or scores upon completion. This helps students identify their strengths and areas for improvement,
                   enabling focused learning. Skill Tests also allow educators to track performance, monitor progress, and ensure that
                    students are mastering the concepts effectively.
                </MyCardContent>
                 <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Payment & Fees</h2>
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
                The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment & Fees</span> section in the Student 
                Dashboard provides students with a complete overview of their financial status within the institution. It
                 displays information about paid fees, showing all completed transactions along with dates, amounts, and 
                 receipts for transparency. At the same time, it highlights any due payments, including outstanding amounts,
                  deadlines, fines, or discounts, helping students stay aware of pending fees. This section allows students 
                  to track their financial obligations efficiently and ensures that they can make timely payments, thereby 
                  avoiding any disruptions in course access or academic activities.
                </MyCardContent>
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

export default memo(ClientStuMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
