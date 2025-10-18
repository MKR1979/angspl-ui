'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBox from '@/app/custom-components/MyBox';
import { IconButton, Button, Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './demoSch.css';
import { useDemoSch } from './useDemoSch';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const ClientDemoSch = () => {
  const { bannerImages, currentIndex, goToNext, goToPrev, getYouTubeVideoId, handleModuleClick, moduleRefs } = useDemoSch();
  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';
  const modules = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Academic Management',
      description: 'Organize subjects, classes, timetables, and grading efficiently with AI-assisted planning.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Academic Management</strong> module streamlines every aspect of your school’s academic operations. From creating subjects
            and assigning teachers to scheduling classes, this module ensures workflows are seamless and efficient. AI-assisted scheduling and
            predictive analytics help optimize class allocation, syllabus coverage, and teacher workloads.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and manage subjects, classes, and sections effortlessly.</li>
            <li>Set up academic calendars and exam schedules with AI detecting potential conflicts.</li>
            <li>Assign teachers to classes while AI suggests optimal workload distribution.</li>
            <li>Grade management: record, update, and analyze student performance with trend predictions.</li>
            <li>Generate timetables automatically or manually, avoiding clashes and optimizing classroom utilization.</li>
            <li>Monitor attendance trends and generate performance-based insights for teachers and students.</li>
            <li>AI-powered alerts for missed syllabus coverage or upcoming exams.</li>
          </ul>

          <p>
            This module empowers administrators, teachers, and management to stay on top of academic planning, reduce manual errors,
            and save valuable time.
          </p>

          <h3>Academic Management Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Academic Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Student & Staff Records',
      description: 'Manage student and teacher data securely in one AI-enabled central database.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Student & Staff Records</strong> module is a comprehensive solution for maintaining and organizing all data related to
            students, teachers, and staff. A secure, centralized database ensures easy access, efficient management, and accurate tracking.
            AI algorithms highlight missing information, inconsistencies, and provide predictive insights for student and staff management.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Maintain detailed student profiles including personal, academic, and medical information.</li>
            <li>Track staff qualifications, experience, subjects taught, and attendance records efficiently.</li>
            <li>Securely upload and manage documents, certificates, photographs, and ID cards.</li>
            <li>Smart AI-powered search, filter, and sort options for quick retrieval of records.</li>
            <li>Integrate with timetables, attendance, and grading systems for holistic insights.</li>
            <li>Automated alerts for incomplete or outdated data entries.</li>
            <li>Generate printable and AI-enhanced reports for administrative or academic use.</li>
          </ul>

          <h3>Attendance Management System:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li><strong>Employee & Student Attendance:</strong> Maintain accurate attendance for all staff and students.</li>
            <li><strong>Location-Based Attendance:</strong> Attendance can only be marked within school premises to ensure authenticity.</li>
            <li><strong>Track Presence & Absence:</strong> AI detects irregular patterns and highlights potential issues.</li>
            <li><strong>Attendance Analytics:</strong> Generate AI-driven dashboards for performance monitoring and compliance.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual paperwork, eliminates duplication, improves accessibility, and ensures compliance
            with school policies. AI insights enhance decision-making and proactive interventions.
          </p>

          <p>
            <strong>Use Cases:</strong> Quickly find student information during meetings, track staff workload, maintain health records,
            manage transfers, and enable smooth communication between teachers, students, and management.
          </p>

          <h3>Attendance Module Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Attendance Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <HowToRegIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Admission & Enrollment Management',
      description: 'Digitize your school admission process with AI-assisted applicant tracking and document verification.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Admission & Enrollment Management</strong> module automates the entire admission process — from inquiry to enrollment.
            Prospective students can apply online, upload documents, and track application status in real-time. Administrators can review, shortlist,
            and approve applicants using a unified dashboard with AI recommendations.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Online admission form with customizable fields and validation rules.</li>
            <li>Document upload, verification, and digital signature support.</li>
            <li>AI identifies incomplete or duplicate applications automatically.</li>
            <li>Integrated communication for interview scheduling and result updates.</li>
            <li>Auto-generate admission numbers and student profiles after approval.</li>
            <li>Track conversion rates and admission trends using AI-driven analytics.</li>
            <li>Generate admission letters, ID cards, and welcome emails instantly.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual workload, minimizes errors, and enhances applicant experience with transparency and speed.
            AI insights help forecast admission numbers and improve strategic planning.
          </p>

          <h3>Admission Management Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Admission Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Fees & Finance',
      description: 'Simplify payments, generate receipts, and monitor dues with AI insights.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Fees & Finance</strong> module simplifies all financial operations, from fee collection to expense tracking.
            AI-powered predictive analytics help anticipate late payments, optimize cash flow, and automate reminders for parents and staff.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Automate fee collection for tuition, transport, lab, and extracurricular fees.</li>
            <li>Instantly generate digital receipts for payments made online or offline.</li>
            <li>Track due balances, send automated AI-driven reminders, and prevent delays in fee collection.</li>
            <li>Maintain expense, budget, and transaction records for complete transparency.</li>
            <li>Generate monthly, quarterly, and yearly financial reports with AI insights.</li>
            <li>Integrate fees with student records for class- or program-specific tracking.</li>
            <li>Support multiple payment methods including cash, card, bank transfer, and online gateways.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces errors, ensures timely fee collection, improves financial transparency, and helps management
            make data-driven budget decisions. AI highlights anomalies and trends for proactive action.
          </p>

          <p>
            <strong>Use Cases:</strong> Issue reminders, generate receipts, monitor balances, track scholarships or discounts, and plan budgets
            effectively for the upcoming academic year.
          </p>

          <h3>Fee Management Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Fee Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Reports & Analytics',
      description: 'Gain AI-driven insights into student performance and school efficiency.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Reports & Analytics</strong> module converts school data into actionable insights. AI-driven analytics identify trends,
            predict outcomes, and provide recommendations for academic and operational excellence.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Generate detailed performance reports for students, classes, and subjects.</li>
            <li>Visual dashboards for attendance trends, academic progress, fees collected, and staff performance.</li>
            <li>Customizable analytics to monitor learning outcomes, exam results, and financial health.</li>
            <li>AI predicts trends over time to highlight areas needing intervention.</li>
            <li>Export reports in PDF, Excel, or CSV for audits, presentations, and record-keeping.</li>
            <li>Integrate with other modules like Academic Management, Fees & Finance, and Attendance for a holistic overview.</li>
            <li>Real-time AI insights support proactive decision-making and strategic planning.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Helps schools monitor performance, plan interventions, enhance transparency, and make informed
            decisions. AI-generated insights guide administrators to prioritize areas for improvement.
          </p>

          <p>
            <strong>Use Cases:</strong> Track student progress, identify struggling students, evaluate teacher effectiveness, analyze
            financial trends, prepare management reports, and implement data-driven school improvement initiatives.
          </p>

          <h3>Reports & Analytics Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Reports & Analytics Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>

          <p>
            This module enables schools to move beyond simple record-keeping, leveraging AI-powered insights for smarter, actionable,
            and continuous improvement.
          </p>
        </div>
      )
    },
    {
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Examination & Result Management',
      description: 'Digitize exam creation, grading, and result publishing with AI-based insights.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Examination & Result Management</strong> module simplifies the entire examination lifecycle — from question paper setup to result
            publication. Teachers can easily create exams, manage evaluations, and publish results online. AI detects grading inconsistencies and
            predicts student performance trends to help improve learning outcomes.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and schedule examinations for classes or groups with flexible patterns (MCQ, descriptive, practical).</li>
            <li>Auto-calculate marks and generate grades based on predefined rubrics or custom grading schemes.</li>
            <li>AI-based performance analysis identifies top performers, weak areas, and subject trends.</li>
            <li>Generate report cards automatically with student photos, grades, and teacher remarks.</li>
            <li>Instant result publishing for parents and students via web and mobile apps.</li>
            <li>Generate summary and comparative performance reports across sections and terms.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Saves time, improves transparency, and provides data-driven academic insights for teachers and administrators.
            Parents can track performance trends, and students can review progress online.
          </p>

          <h3>Exam & Result Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Examination & Result Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Communication & Notification System',
      description: 'Connect teachers, parents, and students through instant, AI-powered communication tools.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Communication & Notification System</strong> enhances collaboration between school staff, students, and parents. Real-time
            notifications keep everyone informed about announcements, assignments, and events. AI-powered smart alerts ensure messages are delivered
            at the right time to the right audience.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Send instant announcements via mobile app, SMS, and email.</li>
            <li>In-app chat between teachers, students, and parents with moderation control.</li>
            <li>AI prioritizes urgent messages like exam changes, fee deadlines, or schedule updates.</li>
            <li>Customizable notification templates for birthdays, events, and holidays.</li>
            <li>Parent-teacher meeting reminders and automated summaries.</li>
            <li>Analytics dashboard showing message delivery and engagement rates.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Improves communication transparency, boosts engagement, and ensures no important update is missed.
            AI-based delivery optimization improves message timing and response rates.
          </p>

          <h3>Communication System Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Communication & Notification Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    },
    {
      icon: <HowToRegIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Attendance Management',
      description: 'Streamline attendance tracking with location-based verification, bulk marking, and detailed student records.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Attendance Management</strong> module enables precise and hassle-free tracking of faculty and student attendance.
            Location-based verification ensures attendance can only be marked on-campus. Supervisors can mark attendance for multiple users
            in one click, and teachers can monitor student attendance records accurately over time.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Location-based attendance marking to prevent proxy attendance and ensure campus compliance.</li>
            <li>Bulk attendance marking for supervisors — mark multiple students or staff with same or different details in one action.</li>
            <li>Student attendance dashboard for teachers to track individual and class-wise attendance records easily.</li>
            <li>Automated alerts for low attendance or missing entries for students and staff.</li>
            <li>Integration with academic records for performance and eligibility tracking.</li>
            <li>Detailed reporting and analytics for administrators to monitor attendance trends by course, department.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual effort, ensures attendance authenticity, and provides transparent reporting.
            Teachers, supervisors, and administrators can track attendance efficiently, enhancing accountability and compliance.
          </p>

          <h3>Attendance Management Demo:</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
            title="Attendance Management Demo"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: '1rem', borderRadius: '8px' }}
          ></iframe>
        </div>
      )
    }
  ];


  return (
    <>
      <div>
        {/* === HERO SECTION === */}
        <div className="about-banner">
          <img src={bannerImages[currentIndex]} alt="School Management Demo" className="about-banner-img" />
          {bannerImages.length > 1 && (
            <>
              <IconButton className="banner-arrow left" onClick={goToPrev}>
                <ArrowBackIos />
              </IconButton>
              <IconButton className="banner-arrow right" onClick={goToNext}>
                <ArrowForwardIos />
              </IconButton>
            </>
          )}
        </div>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#334D6E',
            color: '#FFD700',
            py: { xs: 0, sm: 0.5 },
            textAlign: 'center',
            fontSize: { xs: 10, sm: 16 },
            fontWeight: 'bold',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          ⚡ Experience Smart AI-Powered School Management Today!
        </Box>

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
                    admissions to tracking performance, everything is unified under one digital platform, with <strong>Intelligent insights</strong> and <strong>AI-driven</strong> analytics
                    helping you make faster, data-backed decisions.
                  </p>
                </MyGrid>
              </MyGrid>
              {/* Module Boxes */}
              <MyGrid container spacing={2} justifyContent="center" alignItems="stretch">
                {modules.map((m, i) => (
                  <MyGrid key={i} size={{ xs: 12, sm: 6, md: 3 }} style={{ display: 'flex' }}>
                    <div className="feature-card" onClick={() => handleModuleClick(i)}>
                      <div className="feature-icon">{m.icon}</div>
                      <h3 className="feature-title">{m.title}</h3>
                      <p className="feature-desc">{m.description}</p>
                    </div>
                  </MyGrid>
                ))}
              </MyGrid>
              {/* SECTION: DEMO VIDEO */}
              <MyGrid size={{ xs: 12 }} textAlign="center" sx={{ marginTop: 4 }}>
                <h2 className="section-subheading">Watch the System in Action</h2>
                <div className="responsive-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                    title="School Management System Demo"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </MyGrid>
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
                    <h2 style={{ textAlign: 'center' }}>{m.title}</h2>
                    {m.content}
                  </div>
                ))}
              </div>
            </MyCardContent>
          </MyCard>
        </MyBox>
        <Footer />
      </div>
      <Button
        href="https://angspl.com/contact-us"
        target="_blank"
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: { xs: 335, sm: 615 },
          right: { xs: 10, sm: 10 },
          borderRadius: '90px',
          bgcolor: '#FFD700',
          color: '#334D6E',
          boxShadow: 3,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1, sm: 1.5 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1 },
          fontSize: { xs: 10, sm: 12 },
          textAlign: 'center',
        }}
      >
        <SchoolIcon  fontSize="small" />
        {/* <MyBox
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            lineHeight: 1.1,
            gap: { xs: 0, sm: 0.3 },
          }}
        >
          <span>Expert</span>
           <span>Demo</span>
        </MyBox> */}
        Expert Demo
      </Button>

      <Button
        href="https://adhyayan.school"
        target="_blank"
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: { xs: 165, sm: 80 },
          right: { xs: 15, sm: 20 },
          borderRadius: '50px',
          bgcolor: '#FFD700',
          color: '#334D6E',
          boxShadow: 3,
          px: { xs: 1, sm: 1.5 },
          py: { xs: 1, sm: 1.5 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1 },
          fontSize: { xs: 10, sm: 12 },
        }}
      >
        <SchoolIcon fontSize="small" />
        Live Demo
      </Button>
    </>
  );
};

export default memo(ClientDemoSch, (prevProps, nextProps) => eq(prevProps, nextProps));
