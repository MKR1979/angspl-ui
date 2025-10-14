'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './attendance-mgmt.css';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MyTypography from '@/app/custom-components/MyTypography';

const bannerImages = ['/ModulesImgs/attendance1.jpg', '/attendanceImgs/attendance3.jpg'];
const ClientAboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ['/ModulesImgs/login.png', '/ModulesImgs/emp.png', '/ModulesImgs/emp2.png', '/ModulesImgs/student.png'];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change page every 4 seconds
    return () => clearInterval(interval);
  }, []);

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
                <MyGrid className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance Management System</span> enables
                  employees to mark their attendance only when they are physically present within the designated office or campus premises.
                  This system uses the geolocation of the users device to validate their proximity to the registered office location.
                  Employees can conveniently use their own smartphones or devices to mark their attendance through a secure web or mobile
                  interface.
                </MyGrid>
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
                      <li style={{ marginBottom: '5px', padding: 0 }}>
                        <span>&#10003;</span> Helps organizations maintain accurate, location-verified attendance records.
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
                <MyGrid className="card-text">
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Employee Attendance:</span> Employees log in securely to the
                  Location-Based Attendance system via web or mobile. The system detects their current GPS location and verifies whether
                  they are within the approved office or campus area. If inside the allowed range, the Mark Attendancebutton becomes active.
                  The system records ocation coordinates, device ID, IP address, and timestamp, ensuring attendance is secure, accurate, and
                  location-verified.
                  <br />
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Student Attendance:</span> Students log in through the same secure
                  portal. The system automatically verifies their GPS location within the campus. Only when they are inside the allowed zone
                  does the check-in/check-out option become active. Attendance is recorded along with device details and timestamp ,
                  ensuring transparency and eliminating proxy entries.
                  <br />
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Bulk Attendance:</span> Admins can mark attendance for multiple
                  employees or students at once. After verifying the entries, they can lock the attendance records to prevent edits. Each
                  entry captures essential details such as GPS coordinates, device ID, IP address, and timestamp, making the process
                  time-efficient, accurate, and secure.
                </MyGrid>
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
                <MyGrid className="card-text">
                  Employee Dashboard in the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span>{' '}
                  allows employees to mark their attendance quickly and securely. After logging in, the system automatically detects the
                  employee’s GPS location and verifies whether they are within the approved office or campus area. If they are within the
                  allowed range, the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>“Mark Attendance”</span> button becomes active
                  for check-in or check-out. The system records important details such as{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>location coordinates, device ID, IP address, and timestamp</span>{' '}
                  in real time. This ensures that attendance is marked only from authorized locations, maintaining{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>accuracy, transparency, and accountability</span> for the
                  organization.
                </MyGrid>
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
                <MyGrid className="card-text">
                  This video explains how students can efficiently mark their attendance using the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span> Once logged in to the
                  system through a web or mobile device, the student’s current GPS location is automatically detected and verified against
                  the registered campus area. Only when the student is within the allowed zone does the system activate the
                  check-in/check-out option.
                  <br />
                  The attendance is then securely recorded along with device ID, IP address, location coordinates, and timestamp. This
                  ensures that attendance is accurate, location-verified, and eliminates the possibility of proxy marking, helping
                  educational institutions maintain transparency and accountability.
                </MyGrid>
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
                <MyGrid className="card-text">
                  This video demonstrates how bulk attendance is managed using the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Location-Based Attendance system</span>. Initially, attendance for
                  multiple employees or students can be marked simultaneously through the dashboard, ensuring location verification for
                  every entry. Once reviewed, the admin can{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>lock the attendance records</span> to prevent any further
                  modifications. Each record captures essential details such as device ID, GPS coordinates, IP address, and timestamp. This
                  approach saves time, streamlines attendance management, and maintains{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>accurate and secure records</span> for the organization or
                  institution.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Review Attendance</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyGrid className="card-text">
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Review Attendance</span> allows administrators to efficiently
                  manage and monitor attendance records of all users. Through this module, the admin can view detailed attendance data,
                  verify the authenticity of each entry, and make necessary edits to maintain accuracy. The system provides filters for
                  date, time in, and time out, enabling quick review and correction of records. This ensures that attendance data remains
                  transparent, accurate, and fully verified under administrative supervision.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Attendance Report</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyGrid className="card-text">
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Attendance Report</span> provides a comprehensive overview of
                  attendance data in multiple formats to help administrators and users analyze presence and performance effectively. The
                  module offers three key report types:
                  <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                    <MyCardContent className="list-text">
                      <ul className="benefits-list">
                        <li style={{ margin: 0, padding: 0 }}>
                          <span>&#10003;</span> <strong>Time Log Report</strong> – Displays detailed check-in and check-out records of each
                          user, allowing accurate tracking of daily working hours and time patterns.
                        </li>
                        <li>
                          <span>&#10003;</span> <strong>Day-wise Attendance</strong> – Shows attendance data categorized by date, making it
                          easy to review who was present, absent, or on leave for a particular day.
                        </li>
                        <li style={{ margin: 0, padding: 0 }}>
                          <span>&#10003;</span>
                          <strong>Presence Overview</strong> – Offers a summarized view of overall attendance trends, highlighting total
                          present days, absences, and attendance percentage for better performance insights.
                        </li>
                      </ul>
                    </MyCardContent>
                  </MyGrid>
                  Together, these reports enable institutions to maintain transparent, well-organized, and easily accessible attendance
                  records.
                </MyGrid>
              </MyGrid>
            </MyCardContent>
          </MyCard>
        </MyBox>
        <Footer />
      </div>
    </>
  );
};

export default memo(ClientAboutUs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
