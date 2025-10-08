'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './exam-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const bannerImages = ['/ModulesImgs/admsMng.png', '/ModulesImgs/admsMng1.png', '/ModulesImgs/admsMng2.png'];

const ClientExamMgmt = () => {
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
                    <div className="section-heading">EXAMINATION MANAGEMENT</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>School Admission Management System</span> is a digital platform
                  designed to simplify and streamline the entire student admission process. It helps school efficiently manage applications,
                  registration, document submission, and free payments in an organized and transparent manner. This system reduces manual
                  paperwork and errors by providing an automated process both administrators and parents. Parents can conveniently fill out
                  admission form, upload necessary documents, and track application status online, while schools can manage student data
                  securely through a central database. With features like real-time notification, data validation, and secure record
                  management, data validation, and secure record management, the school admission management system ensures a hassle-free
                  experience for application and smooth operations for the school administration.
                </MyCardContent>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">BENEFITS OF ONLINE ADMISSION / ENROLLMENT</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Fill Application form from Anywhere and Anytime.
                      </li>
                      <li>
                        <span>&#10003;</span> No need to stand in long queues.
                      </li>
                      <li>
                        <span>&#10003;</span> Cost savings for the institutes.
                      </li>
                      <li>
                        <span>&#10003;</span>Reducing the unwanted data.
                      </li>
                      <li>
                        <span>&#10003;</span> Eliminates the need for extra staff to manage applicants.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> No longer requirement of printing & storing the forms separately.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Admission Form</h2>
                  <div className="responsive-image">
                    <img src="/ModulesImgs/admForm.png" alt="Admission Form" />
                  </div>
                </MyGrid>

                <MyCardContent className="card-text">
                  The online admission and student enrollment process in schools can be tedious, involving managing and analyzing inquiries,
                  planning marketing strategies, and creating and handling student records. Verifying student data and generating merit
                  lists for various admission rounds based on seat availability, while maintaining effective communication with parents and
                  students throughout the process, consumes a lot of time. Manual handling of paperwork and documents often leads to errors.
                  <br />
                  Our <span style={{ fontWeight: 'bold', color: '#334D6E' }}> School Management Software</span> is designed to streamline
                  all activities involved in student enrollment by combining them into a cloud-based platform. The main objective of this
                  system is to help school staff efficiently enroll students and maintain accurate records. It enables administrators to
                  simplify and automate the online admission process by managing and verifying student entries, documents, images,
                  certificates.
                </MyCardContent>
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
                <MyCardContent className="card-text">
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> School Management Software</span> helps schools automate and
                  simplify routine activities such as curriculum management, attendance tracking, administrative tasks, information
                  handling, fee management, and assignments. This robust, cloud-based, and time-tested educational ERP system offers
                  advanced modules that empower teachers and educators to digitize the daily operations of educational institutions.
                  Designed to efficiently manage and record administrative work,
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>School Management Software</span> includes all essential modules
                  for tracking student records, admissions, fees, timetable planning, and other critical school processes, enabling seamless
                  management for both teachers and staff.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
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
                </MyCardContent>
              </MyGrid>
            </MyCardContent>
          </MyCard>

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
        </MyBox>
      </div>
    </>
  );
};

export default memo(ClientExamMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
