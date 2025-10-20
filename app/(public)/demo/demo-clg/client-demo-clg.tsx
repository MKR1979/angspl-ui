'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBox from '@/app/custom-components/MyBox';
import { IconButton, Button, Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './demoClg.css';
import { useDemoClg } from './useDemoClg';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ClientDemoClg = () => {
  const { bannerImages, currentIndex, goToNext, goToPrev, getYouTubeVideoId, handleModuleClick, moduleRefs } = useDemoClg();
  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';
  const modules = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Academic Management',
      description: 'Organize subjects, classes, timetables, and grading efficiently.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Academic Management</strong> module is designed to streamline every aspect of your college’s academic operations.
            From creating subjects and assigning teachers to scheduling classes, this module ensures academic workflows are seamless and
            efficient. AI-assisted suggestions help optimize class schedules, teacher assignments, and syllabus coverage for better learning outcomes.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and manage subjects, classes, and sections with ease.</li>
            <li>Set up academic calendars and manage exam schedules, with AI-based alerts for potential timetable conflicts.</li>
            <li>Assign teachers to classes and track workloads efficiently, with smart AI-assisted workload balancing suggestions.</li>
            <li>Grade management: record, update, and analyze student performance, while AI identifies trends and highlights students needing extra attention.</li>
            <li>Generate timetables automatically or manually, ensuring no clashes and optimized classroom utilization.</li>
          </ul>

          <p>
            This module empowers teachers, administrators, and management to stay on top of academic planning, reducing manual errors and saving time.
          </p>

          <p>
            You can also monitor attendance trends, manage syllabus coverage, and generate performance reports enriched with AI-driven insights
            to support informed academic decisions.
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
      title: 'Student And Staff Records',
      description: 'Manage student and teacher data securely in one central database.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Student & Staff Records</strong> modules are comprehensive solution for maintaining and organizing all data related to
            students, teachers, and staff members. It provides a secure, centralized database for easy access, efficient management,
            and accurate tracking of every individual associated with your college. AI analytics help detect inconsistencies or gaps in data entries for improved data quality.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Maintain detailed student profiles with personal, academic, and medical information.</li>
            <li>Track staff qualifications, experience, subjects taught, and attendance records efficiently.</li>
            <li>Upload and manage documents, certificates, photographs, and ID cards securely.</li>
            <li>Search, filter, and sort records for quick retrieval, powered by AI-assisted smart search recommendations.</li>
            <li>Integrate with timetables, attendance, and grading systems for holistic insights.</li>
            <li>Automated alerts for missing or incomplete data entries.</li>
            <li>Generate printable student and staff reports for administrative needs, enriched with AI-generated performance insights.</li>
          </ul>

          <h3>Attendance Management System:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li><strong>Employee & Student Attendance:</strong> Maintain accurate attendance records for all staff and students.</li>
            <li><strong>Location-Based Attendance:</strong> Users can mark attendance only within campus premises, ensuring authenticity.</li>
            <li><strong>Track Presence & Absence:</strong> Monitor daily attendance, late arrivals, and absences in real-time, with AI detecting irregular patterns.</li>
            <li><strong>Attendance Analytics:</strong> Generate AI-driven dashboards and reports for performance tracking and policy compliance.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual paperwork, eliminates data duplication, improves accessibility, and ensures compliance
            with college policies. Administrators, teachers, and staff can work seamlessly with up-to-date information enhanced with predictive insights.
          </p>

          <p>
            <strong>Use Cases:</strong> Quickly find student details during parent-teacher meetings, track staff workload, maintain health
            records, manage transfers, and ensure smooth communication. Attendance data can also be analyzed by AI to identify trends and improve punctuality.
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
      description: 'Automate college admissions with AI-assisted application tracking and document verification.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Admission & Enrollment Management</strong> module streamlines college admissions — from application submission to enrollment.
            Prospective students can apply online, upload required documents, and track their application status. Administration can review, shortlist,
            and approve applicants using AI-supported recommendations.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Online application forms with customizable fields for courses, departments, and programs.</li>
            <li>Secure document upload, verification, and digital signature support.</li>
            <li>AI identifies incomplete, duplicate, or mismatched applications automatically.</li>
            <li>Integrated notifications for interviews, seat allotment, or application status updates.</li>
            <li>Automatic enrollment numbers, student profiles, and ID generation after approval.</li>
            <li>Track application trends, conversion rates, and admission analytics with AI insights.</li>
            <li>Generate admission letters, welcome emails, and orientation schedules instantly.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual effort, enhances transparency, and improves the student admission experience. AI-driven insights support strategic planning and enrollment forecasting.
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
      description: 'Simplify payments, generate receipts, and monitor due balances easily.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Fees & Finance</strong> module streamlines all financial operations of the college, from student fee collection to
            expense tracking, ensuring accurate, transparent, and timely financial management. AI algorithms help predict upcoming dues and optimize fee collection strategies.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Automate fee collection for multiple fee types, including tuition, transport, lab, and extracurricular fees.</li>
            <li>Generate digital receipts instantly for payments made online or offline.</li>
            <li>Track due balances, send automated reminders to parents, and prevent delays in fee collection, enhanced with AI-based prediction of late payments.</li>
            <li>Maintain records of expenses, budgets, and financial transactions to ensure transparency.</li>
            <li>Generate monthly, quarterly, and yearly financial reports for auditing and decision-making.</li>
            <li>Integrate with student records to link fees with specific students, classes, or programs.</li>
            <li>Support multiple payment methods, including cash, card, bank transfer, and online payment gateways.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual accounting errors, ensures timely fee collection, improves cash flow, and provides
            real-time visibility into the college’s financial health. AI insights highlight fee trends and anomalies for better decision-making.
          </p>

          <p>
            <strong>Use Cases:</strong> Issue fee reminders, generate receipts for parents, monitor outstanding balances, track scholarships
            or discounts, prepare financial statements for audits, and plan budgets for the next academic year.
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
      description: 'Gain insights into student performance and college efficiency.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Reports & Analytics</strong> module transforms college data into actionable insights, allowing administrators and
            teachers to make data-driven decisions for academic excellence and operational efficiency. AI-powered analytics highlight key trends and help forecast outcomes.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Generate detailed performance reports for students, classes, and subjects.</li>
            <li>Visual dashboards for attendance trends, academic progress, fees collected, and staff performance.</li>
            <li>Customizable analytics to monitor learning outcomes, exam results, and financial health.</li>
            <li>Track trends over time to identify areas of improvement or intervention, enhanced with AI-based predictive insights.</li>
            <li>Export reports in multiple formats such as PDF, Excel, or CSV for presentations, audits, and record-keeping.</li>
            <li>Integrate with other modules like Academic Management, Fees & Finance, and Attendance for a holistic view.</li>
            <li>Real-time insights for proactive decision-making and strategic planning.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Helps colleges measure performance, plan interventions, enhance transparency, and make informed
            decisions that improve student outcomes and operational efficiency. AI-based suggestions assist in identifying students or areas needing special attention.
          </p>

          <p>
            <strong>Use Cases:</strong> Monitor student progress, identify struggling students, evaluate teacher effectiveness, analyze fee
            collection trends, prepare management reports, and drive data-backed improvement initiatives.
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
        </div>
      )
    },
    {
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Examination & Result Management',
      description: 'Streamline college exams, grading, and result publishing with AI-powered insights.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Examination & Result Management</strong> module simplifies the entire examination lifecycle in colleges — from question
            paper setup to result publication. Faculty can create exams for courses, manage evaluations, and release results online.
            AI detects grading inconsistencies and predicts student performance trends, assisting in better academic planning.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and schedule exams for different courses, departments, or semesters with flexible formats (MCQ, descriptive, lab practicals).</li>
            <li>Automated calculation of marks, GPA/CGPA generation, and transcript creation based on predefined rubrics.</li>
            <li>AI-driven performance analysis identifies top performers, weak areas, and course trends.</li>
            <li>Generate digital report cards and transcripts with student details, grades, and faculty remarks.</li>
            <li>Instant result publishing to students, faculty, and administrative dashboards.</li>
            <li>Comparative analysis of results across semesters, courses, and departments.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual workload, improves transparency, and provides actionable academic insights. Students can
            track their performance, and faculty can identify areas needing attention.
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
      description: 'Facilitate instant AI-powered communication between faculty, students, and administration.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Communication & Notification System</strong> ensures smooth interaction across the college ecosystem. Real-time
            notifications keep students, faculty, and staff informed about announcements, deadlines, and events. AI optimizes delivery to
            maximize engagement.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Send instant notifications via web portal, mobile app, email, or SMS.</li>
            <li>In-app chat between students, faculty, and departments with moderation controls.</li>
            <li>AI prioritizes urgent notifications like exam changes, submission deadlines, or schedule updates.</li>
            <li>Customizable templates for academic alerts, events, and college announcements.</li>
            <li>Automated meeting reminders for faculty-student consultations or departmental meetings.</li>
            <li>Analytics dashboard for message delivery rates and engagement metrics.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Enhances communication transparency, boosts participation, and ensures important updates reach the right audience. AI improves response rates and timing.
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
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
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
            <li>Detailed reporting and analytics for administrators to monitor attendance trends by course, department, or semester.</li>
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
          <img src={bannerImages[currentIndex]} alt="College Management Demo" className="about-banner-img" />
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
          ⚡ Experience Smart AI-Powered College Management Today!
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
                  <div className="section-heading">COLLEGE MANAGEMENT SYSTEM</div>
                  <div className="section-underline">
                    <div></div>
                    <div></div>
                  </div>
                  <p className="card-text">
                    Discover how our <strong>College Management Software</strong> simplifies daily operations for colleges. From managing
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
                    title="College Management System Demo"
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
                    {/* <h2>{m.title}</h2> */}
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
          bottom: { xs: 300, sm: 615 },
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
        Expert Demo
         </Button>
      <Button
        href="https://adhyayan.college"
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

export default memo(ClientDemoClg, (prevProps, nextProps) => eq(prevProps, nextProps));
