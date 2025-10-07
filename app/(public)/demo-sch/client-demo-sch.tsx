'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBox from '@/app/custom-components/MyBox';
import { IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './demoSch.css';
import { COMPANY } from '../constants/constants';
import { useDemoSch } from './useDemoSch';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';

const ClientDemoSch = () => {
  const {
    bannerImages,
    currentIndex,
    goToNext,
    goToPrev,
    getYouTubeVideoId,
    testimonials,
    // activeModule,
    handleModuleClick,
    // setActiveModule,
    // detailRef,
    moduleRefs
  } = useDemoSch();

  //   const modules = useMemo(
  //     () => [
  //       {
  //         icon: <SchoolIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
  //         title: 'Academic Management',
  //         description: 'Organize subjects, classes, timetables, and grading efficiently.'
  //       },
  //       {
  //         icon: <GroupIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
  //         title: 'Student & Staff Records',
  //         description: 'Manage student and teacher data securely in one central database.'
  //       },
  //       {
  //         icon: <ReceiptLongIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
  //         title: 'Fees & Finance',
  //         description: 'Simplify payments, generate receipts, and monitor due balances easily.'
  //       },
  //       {
  //         icon: <TimelineIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
  //         title: 'Reports & Analytics',
  //         description: 'Gain insights into student performance and school efficiency.'
  //       }
  //     ],
  //     []
  //   );

  const modules = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Academic Management',
      //   content: (
      //     <>
      //       <p>This module allows you to organize subjects, classes, and timetables.</p>
      //       <p>Track grading efficiently and manage academic calendars.</p>
      //       <iframe
      //         width="100%"
      //         height="315"
      //         src="https://www.youtube.com/embed/DJ72Ir6YgHg?rel=0"
      //         title="Academic Demo"
      //         frameBorder="0"
      //         allowFullScreen
      //       ></iframe>
      //     </>
      //   ),
      content: (
        <div style={{ lineHeight: 1.6 }}>
          {/* <h2>Academic Management</h2> */}
          <p>
            The <strong>Academic Management</strong> module is designed to streamline every aspect of your schools academic operations. From
            creating subjects and assigning teachers to scheduling classes, this module ensures that academic workflows are seamless and
            efficient.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and manage subjects, classes, and sections with ease.</li>
            <li>Set up academic calendars and manage exam schedules.</li>
            <li>Assign teachers to classes and track their workload.</li>
            <li>Grade management: record, update, and analyze student performance.</li>
            <li>Generate timetables automatically or manually, ensuring no clashes.</li>
          </ul>

          <p>
            This module empowers teachers, administrators, and management to stay on top of academic planning, reducing manual errors and
            saving time.
          </p>

          <p>
            You can also monitor attendance trends, manage syllabus coverage, and generate reports to make informed decisions for academic
            improvement.
          </p>

          {/* Optional: demo video */}
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/DJ72Ir6YgHg?rel=0"
            title="Academic Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>

          {/* Optional: image */}
          <img src="/ModulesImgs/admsMng.png" alt="Academic Dashboard" style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }} />
        </div>
      )
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Student & Staff Records',
      content: (
        <>
          <p>Securely manage all student and teacher data in one database.</p>
          <p>Upload photos, documents, and maintain records efficiently.</p>
          <img src="/ModulesImgs/admsMng.png" alt="Students" style={{ width: '100%', marginTop: 10 }} />
        </>
      )
    },
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Fees & Finance',
      content: (
        <>
          <p>Simplify payments and generate receipts automatically.</p>
          <p>Track due balances and monitor financial reports.</p>
        </>
      )
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Reports & Analytics',
      content: (
        <>
          <p>Gain insights into student performance and school efficiency.</p>
          <p>Custom dashboards and analytics to make informed decisions.</p>
        </>
      )
    }
  ];

  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';

  return (
    <>
      <div>
        {/* === HERO SECTION === */}
        <div className="about-banner">
          <img src={bannerImages[currentIndex]} alt="School Management Demo" className="about-banner-img" />
          <IconButton className="banner-arrow left" onClick={goToPrev}>
            <ArrowBackIos />
          </IconButton>
          <IconButton className="banner-arrow right" onClick={goToNext}>
            <ArrowForwardIos />
          </IconButton>
          <div className="hero-content">
            <h1 className="hero-title">Empower Your School with Smart Management</h1>
            <p className="hero-subtitle">Manage admissions, attendance, fees, and communication – all from one powerful dashboard.</p>
          </div>
        </div>

        {/* === CONTENT BODY === */}
        <MyBox
          sx={{
            width: { xs: '100%', sm: '80%' },
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <MyCard elevation={0} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <MyCardContent>
              {/* SECTION: INTRO */}
              <MyGrid container justifyContent="center" spacing={2}>
                <MyGrid size={{ xs: 12 }} textAlign="center">
                  <div className="section-heading">SCHOOL MANAGEMENT SYSTEM</div>
                  <div className="section-underline">
                    <div></div>
                    <div></div>
                  </div>
                  <p className="card-text">
                    Discover how our <strong>School Management Software</strong> simplifies daily operations for schools. From managing
                    admissions to tracking performance, everything is unified under one digital platform.
                  </p>
                </MyGrid>
              </MyGrid>

              {/* Module Boxes */}
              <MyGrid container spacing={2} justifyContent="center">
                {modules.map((m, i) => (
                  <MyGrid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                    <div className="feature-card" onClick={() => handleModuleClick(i)}>
                      <div className="feature-icon">{m.icon}</div>
                      <h3 className="feature-title">{m.title}</h3>
                      {/* <p className="feature-desc">{m.description}</p> */}
                    </div>
                  </MyGrid>
                ))}
              </MyGrid>

               {/* SECTION: DEMO VIDEO */}
              <MyGrid size={{ xs: 12 }} textAlign="center" sx={{ marginTop: 4 }}>
                <h2 className="section-subheading">Watch the System in Action</h2>
                <div className="responsive-video">
                  <iframe
                    // src="https://www.youtube.com/embed/DJ72Ir6YgHg?rel=0"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                    title="School Management System Demo"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </MyGrid>

              {/* SECTION: TESTIMONIALS */}
              <MyGrid size={{ xs: 12 }} textAlign="center" sx={{ marginTop: 4 }}>
                <h2 className="section-subheading">What Our Clients Say</h2>
                <div className="testimonial-grid">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="testimonial-card">
                      <p className="testimonial-text">“{t.text}”</p>
                      <h4 className="testimonial-name">
                        — {t.name}, {t.school}
                      </h4>
                    </div>
                  ))}
                </div>
              </MyGrid>

              {/* DETAILED MODULE INFO */}
              {/* {activeModule !== null && (
                <div ref={detailRef} className="module-detail">
                  <h2>{modules[activeModule].title}</h2>
                  <p>{modules[activeModule].description}</p>
                  <Button variant="contained" color="primary" onClick={() => setActiveModule(null)}>
                    Close
                  </Button>
                </div>
              )} */}
              {/* Detailed Content Section */}
              <div className="module-details-section">
                {modules.map((m, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) moduleRefs.current[i] = el;
                    }}
                    className="module-detail"
                  >
                    <h2>{m.title}</h2>
                    {m.content} {/* Render full JSX content here */}
                  </div>
                ))}
              </div>

              {/* SECTION: CALL TO ACTION */}
              <div className="cta-section">
                <h2>Ready to Transform Your School?</h2>
                <p>Schedule a personalized demo and see the difference.</p>
                <Button variant="contained" color="success" sx={{ borderRadius: 3, px: 4, py: 1.2 }}>
                  Schedule Free Demo
                </Button>
              </div>
            </MyCardContent>
          </MyCard>

          {/* FOOTER */}
          <div className="container">
            <div className="vertical_center">
              <p>
                © {new Date().getFullYear()} {COMPANY}, All rights reserved.
              </p>
              <div className="vertical_center">
                || <a href="/terms">Terms of use</a> || <a href="/privacy-policy">Privacy Policy</a>
              </div>
            </div>
          </div>
        </MyBox>
      </div>
    </>
  );
};

export default memo(ClientDemoSch, (prevProps, nextProps) => eq(prevProps, nextProps));
