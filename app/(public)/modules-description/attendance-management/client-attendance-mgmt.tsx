'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './attendance-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const bannerImages = ['/ModulesImgs/admsMng.png', '/ModulesImgs/admsMng1.png', '/ModulesImgs/admsMng2.png'];
const howItWorksImages = [
  '/attendanceImgs/attendance-emp3.png',
  '/attendanceImgs/attendance-emp4.png',
  '/attendanceImgs/attendance-emp45.png',
];

const ClientAboutUs = () => {
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

  const [hiwIndex, setHiwIndex] = useState(0); // hiw = How It Works

  useEffect(() => {
    const interval = setInterval(() => {
      setHiwIndex((prev) => (prev + 1) % howItWorksImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToHiwPrev = () => {
    setHiwIndex((prev) => (prev === 0 ? howItWorksImages.length - 1 : prev - 1));
  };

  const goToHiwNext = () => {
    setHiwIndex((prev) => (prev + 1) % howItWorksImages.length);
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
                    <div className="section-heading">ATTENDANCE MANAGEMENT</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance Management System</span> enables employees to mark their attendance only when
                  they are physically present within the designated office or campus premises.
                  This system uses the geolocation of the user's device to validate their proximity to the registered office location.
                  Employees can conveniently use their own smartphones or devices to mark their attendance through
                  a secure web or mobile interface.
                </MyCardContent>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">Key Benefits of Location-Based Attendance</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Attendance can be marked only within the allowed distance from the office/campus.
                      </li>
                      <li>
                        <span>&#10003;</span> Supports real-time check-in and check-out from personal devices.
                      </li>
                      <li>
                        <span>&#10003;</span> Ensures accurate attendance by verifying user location and device ID.
                      </li>
                      <li>
                        <span>&#10003;</span>Reduces proxy or buddy punching, improving accountability.
                      </li>
                      <li>
                        <span>&#10003;</span>Automates attendance reporting and simplifies payroll processing.
                      </li>
                      <li>
                        <span>&#10003;</span>Supports multiple locations or branches without manual tracking.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Helps organizations maintain accurate, location-verified attendance records.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                {/* <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">How It Works Section</h2>
                  <div className="responsive-image">
                    <img src="/attendanceImgs/attendance-emp3.png" alt="Admission Form" />
                  </div>
                </MyGrid> */}

                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">How It Works Section</h2>

                  <div className="responsive-image">
                    <img
                      src={howItWorksImages[hiwIndex]}
                      alt="How It Works"
                      className="about-banner-img"
                    />

                    {/* Arrows */}
                    <IconButton className="banner-arrow left" onClick={goToHiwPrev}>
                      <ArrowBackIos />
                    </IconButton>
                    <IconButton className="banner-arrow right" onClick={goToHiwNext}>
                      <ArrowForwardIos />
                    </IconButton>
                  </div>
                </MyGrid>


                <MyCardContent className="card-text">
                  Users log in securely using their registered credentials on the web or mobile app.
                  The system verifies their identity through their unique device ID and IP address
                  before granting access. Once logged in, users can view their attendance dashboard,
                  check previous records, and prepare to mark their attendance within the allowed location range.
                  {/* <br />
                  Our <span style={{ fontWeight: 'bold', color: '#334D6E' }}> School Management Software</span> is designed to streamline
                  all activities involved in student enrollment by combining them into a cloud-based platform. The main objective of this
                  system is to help school staff efficiently enroll students and maintain accurate records. It enables administrators to
                  simplify and automate the online admission process by managing and verifying student entries, documents, images,
                  certificates. */}
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">How Employees Mark Attendance</h2>
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
                  Employee Dashboard in the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span> allows employees to mark their attendance quickly and securely.
                  After logging in, the system automatically detects the employee’s GPS location and verifies whether they are within the approved office or campus area.
                  If they are within the allowed range, the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>“Mark Attendance”</span> button becomes active for check-in or check-out.
                  The system records important details such as <span style={{ fontWeight: 'bold', color: '#334D6E' }}>location coordinates, device ID, IP address, and timestamp</span> in real time.
                  This ensures that attendance is marked only from authorized locations, maintaining <span style={{ fontWeight: 'bold', color: '#334D6E' }}>accuracy, transparency, and accountability</span> for the organization.

                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">How Students Mark Attendance</h2>
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
                  This video explains how students can efficiently mark their attendance using the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span> Once
                  logged in to the system through a web or mobile device, the student’s current GPS location is automatically detected and verified against the registered campus area.
                  Only when the student is within the allowed zone does the system activate the check-in/check-out option.
                  <br />
                  The attendance is then securely recorded along with device ID, IP address, location coordinates, and timestamp. This ensures that attendance is accurate, location-verified,
                  and eliminates the possibility of proxy marking, helping educational institutions maintain transparency and accountability.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">How Bulk Attendance Works</h2>
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
                  This video demonstrates how bulk attendance is managed using the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span>.
                  Initially, attendance for multiple employees or students can be marked simultaneously through the dashboard, ensuring location verification for every entry.
                  Once reviewed, the admin can <span style={{ fontWeight: 'bold', color: '#334D6E' }}>lock the attendance records</span> to prevent any further modifications.
                  Each record captures essential details such as device ID, GPS coordinates, IP address, and timestamp.
                  This approach saves time, streamlines attendance management, and maintains <span style={{ fontWeight: 'bold', color: '#334D6E' }}>accurate and secure records</span> for the organization or institution.

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

export default memo(ClientAboutUs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
