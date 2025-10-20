'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBox from '@/app/custom-components/MyBox';
import { IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './demoTech.css';
import { useDemoTech } from './useDemoTech';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ClientDemoTech = () => {
  const { bannerImages,
    currentIndex,
    goToNext,
    goToPrev,
    getYouTubeVideoId,
    handleModuleClick,
    moduleRefs
  } = useDemoTech();

  const videoSrc = 'https://youtu.be/DJ72Ir6YgHg?si=njWTcWnXg5YO00oH';

  const modules = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Academic Management',
      description: 'Organize subjects, classes, timetables, grading, and learning resources efficiently.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Academic Management</strong> module is designed to streamline every aspect of your institute’s academic operations.
            From creating subjects and assigning teachers to scheduling classes, this module ensures that academic workflows are seamless
            and efficient. AI-driven suggestions help optimize class schedules, teacher assignments, and syllabus coverage for maximum efficiency.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and manage subjects, classes, and sections with ease.</li>
            <li>Set up academic calendars and manage exam schedules, with AI-assisted alerts for potential timetable conflicts.</li>
            <li>Assign teachers to classes and track their workload efficiently, with smart workload balancing suggestions.</li>
            <li>Grade management: record, update, and analyze student performance. AI insights highlight trends and at-risk students.</li>
            <li>Generate timetables automatically or manually, ensuring no clashes and optimized utilization of classrooms.</li>
            <li>Monitor attendance trends and manage syllabus coverage, with predictive analytics to identify students needing extra support.</li>
          </ul>

          <h3>Learning Management System (LMS) Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li><strong>Study Notes Module:</strong> Provide students with downloadable and interactive study notes for all subjects.</li>
            <li><strong>Video Content:</strong> Upload and share video lectures, tutorials, and demonstrations directly with students.</li>
            <li><strong>Online Exams:</strong> Conduct quizzes, mid-terms, and final exams online and automatically evaluate student performance, with AI-assisted grading analysis.</li>
            <li><strong>Performance Graphs:</strong> Visualize student progress over time with dashboards enhanced by AI insights for targeted interventions.</li>
            <li><strong>Paid & Free Courses:</strong> Offer additional courses either for free or on a subscription basis, directly integrated within the LMS, with AI recommendations for students based on their performance.</li>
          </ul>

          <p>
            This module empowers teachers, administrators, and management to stay on top of academic planning while also providing
            students with a comprehensive learning platform. By integrating study materials, video content, online evaluations, and
            courses, the LMS ensures both teaching and learning are efficient, engaging, and measurable.
          </p>

          <p>
            With detailed reports, predictive analytics, and AI-driven insights, educators can identify strengths and weaknesses in student performance, helping them
            make data-driven decisions for academic improvement.
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
      description: 'Manage student, teacher, and staff data securely along with attendance tracking.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Student & Staff Records</strong> module is a comprehensive solution for maintaining and organizing all the data of
            students, teachers, and staff members. It provides a secure, centralized database that ensures easy access, efficient
            management, and accurate tracking of every individual associated with your institute. AI-powered insights help detect patterns
            and anomalies in records for proactive management.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Maintain detailed student profiles with personal, academic, and medical information.</li>
            <li>Track staff qualifications, experience, subjects taught, and attendance records.</li>
            <li>Upload and manage documents, certificates, photographs, and ID cards securely.</li>
            <li>Search, filter, and sort records quickly with AI-assisted suggestions for faster retrieval.</li>
            <li>Integrate with timetables, attendance, and grading systems for holistic insights.</li>
            <li>Automated alerts for missing or incomplete data entries, helping staff stay on top of critical updates.</li>
            <li>Generate printable student and staff reports for administrative needs with predictive trend highlights.</li>
          </ul>

          <h3>Attendance Management System:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li><strong>Employee & Student Attendance:</strong> Maintain accurate attendance records for all staff and students.</li>
            <li><strong>Location-Based Attendance:</strong> Users can mark attendance only within the campus, ensuring authenticity.</li>
            <li><strong>Track Presence & Absence:</strong> Monitor daily attendance, late arrivals, and absences in real-time.</li>
            <li><strong>Attendance Analytics:</strong> AI-assisted dashboards highlight trends, patterns, and potential issues in attendance.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual paperwork, eliminates data duplication, improves accessibility, and ensures compliance
            with institute policies. AI-driven insights enable administrators and teachers to identify anomalies and act proactively,
            ensuring smooth operational management.
          </p>

          <p>
            <strong>Use Cases:</strong> Quickly find student details during parent-teacher meetings, track staff workload, maintain health
            records, manage transfers, and ensure smooth communication between teachers, students, and management. Attendance data and
            AI-based trends help analyze student participation and staff punctuality effectively.
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

          <p>
            With this module, your institute can build a robust digital ecosystem that ensures all student and staff information,
            including attendance and other critical records, is organized, secure, and easily accessible whenever needed. AI-powered
            insights provide proactive alerts and help in trend analysis, making management more effective and informed.
          </p>
        </div>
      )
    },
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Fees & Finance',
      description: 'Simplify payments, generate receipts, track dues, and manage finances transparently.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Fees & Finance</strong> module streamlines all financial operations of the institute, from student fee collection to
            expense tracking, ensuring accurate, transparent, and timely financial management.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Automate fee collection for multiple fee types, including tuition, transport, lab, and extracurricular fees.</li>
            <li>Generate digital receipts instantly for payments made online or offline.</li>
            <li>Track due balances, late fees, and send automated reminders to parents to prevent delays.</li>
            <li>Maintain records of expenses, budgets, and financial transactions to ensure transparency.</li>
            <li>Generate monthly, quarterly, and yearly financial reports for auditing and decision-making.</li>
            <li>Integrate with student records to link fees with specific students, classes, or programs.</li>
            <li>Support multiple payment methods, including cash, card, bank transfer, and online payment gateways.</li>
            <li>Seamless integration with payment gateways for smooth, secure, and transparent transactions.</li>
            <li>Robust fee management system allowing easy tracking of paid fees, due fees, late fees, and fee history.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual accounting errors, ensures timely fee collection, improves cash flow, and provides
            real-time visibility into the institutes financial health. Both management and parents can track and manage all financial
            transactions effortlessly.
          </p>

          <p>
            <strong>Use Cases:</strong> Issue fee reminders, generate online receipts instantly, monitor outstanding balances, track
            late fees, manage scholarships or discounts, prepare financial statements for audits, and plan budgets for the next
            academic year.
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

          <p>
            With this module, the institute can ensure smooth financial operations, enhance transparency with parents, reduce the workload
            of finance staff, and have complete control over all fee-related activities.
          </p>
        </div>
      )
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Reports & Analytics',
      description: 'Gain insights into student performance and institute efficiency.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Reports & Analytics</strong> module transforms institute data into meaningful insights, helping administrators and
            teachers make data-driven decisions for academic excellence and operational efficiency.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Generate detailed performance reports for students, classes, and subjects with automated trend analysis.</li>
            <li>Visual dashboards for attendance trends, academic progress, fee collection, and staff performance.</li>
            <li>Smart suggestions for identifying students needing additional support and optimizing class schedules.</li>
            <li>Customizable analytics to monitor learning outcomes, exam results, and financial health.</li>
            <li>Track trends over time to predict areas requiring intervention or improvement.</li>
            <li>Export reports in multiple formats such as PDF, Excel, or CSV for management review, audits, or parent communication.</li>
            <li>Integrate with other modules like Academic Management, Fees & Finance, and Attendance for a holistic operational overview.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Enables institutes to make proactive, data-backed decisions, improve student outcomes, and optimize
            administrative efficiency. With automated insights, administrators can quickly identify patterns and take timely action.
          </p>

          <p>
            <strong>Use Cases:</strong> Monitor student performance trends, detect early warning signs for struggling students, evaluate
            teaching effectiveness, analyze fee collection patterns, and generate actionable management reports.
          </p>

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
            With the Reports & Analytics module, your institute can move beyond simple record-keeping to intelligent, actionable insights.
            Automated trend detection and predictive suggestions help streamline operations and support continuous improvement.
          </p>
        </div>
      )
    },
    {
      icon: <HowToRegIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Admission & Enrollment Management',
      description: 'Digitize your institute’s admission process with AI-assisted applicant tracking and document verification.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Admission & Enrollment Management</strong> module automates the entire admission process — from inquiry to enrollment.
            Prospective learners can apply online, upload documents, and track application status in real-time. Administrators can review, shortlist,
            and approve applicants using a unified dashboard with AI recommendations.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Online admission form with customizable fields and validation rules.</li>
            <li>Document upload, verification, and digital signature support.</li>
            <li>AI identifies incomplete or duplicate applications automatically.</li>
            <li>Integrated communication for interview scheduling and result updates.</li>
            <li>Auto-generate enrollment numbers and learner profiles after approval.</li>
            <li>Track conversion rates and admission trends using AI-driven analytics.</li>
            <li>Generate admission letters, ID cards, and welcome emails instantly.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual workload, minimizes errors, and enhances applicant experience with transparency and speed.
            AI insights help forecast enrollment numbers and improve strategic planning.
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
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#334D6E' }} />,
      title: 'Examination & Result Management',
      description: 'Digitize exam creation, grading, and result publishing with AI-based insights.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Examination & Result Management</strong> module simplifies the entire examination lifecycle — from question setup to result
            publication. Instructors can easily create exams, manage evaluations, and publish results online. AI detects grading inconsistencies and
            predicts learner performance trends to help improve learning outcomes.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Create and schedule examinations for courses or batches with flexible patterns (MCQ, descriptive, practical).</li>
            <li>Auto-calculate marks and generate grades based on predefined rubrics or custom evaluation schemes.</li>
            <li>AI-based performance analysis identifies top performers, weak areas, and subject trends.</li>
            <li>Generate report cards automatically with learner photos, grades, and instructor remarks.</li>
            <li>Instant result publishing for learners and administrators via web and mobile apps.</li>
            <li>Generate summary and comparative performance reports across batches and terms.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Saves time, improves transparency, and provides data-driven insights for instructors and administrators.
            Learners can track progress and review performance online.
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
      description: 'Connect instructors, learners, and administrators through instant, AI-powered communication tools.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Communication & Notification System</strong> enhances collaboration within educational institutes. Real-time notifications
            keep everyone informed about announcements, assignments, and events. AI-powered alerts ensure messages are delivered at the right time
            to the right audience.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Send instant announcements via mobile app, SMS, and email.</li>
            <li>In-app chat between instructors, learners, and staff with moderation control.</li>
            <li>AI prioritizes urgent messages like exam changes, assignment deadlines, or schedule updates.</li>
            <li>Customizable notification templates for events, workshops, and important dates.</li>
            <li>Meeting reminders and automated summaries for administrative updates.</li>
            <li>Analytics dashboard showing message delivery and engagement rates.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Improves communication transparency, boosts engagement, and ensures no important update is missed.
            AI-based delivery optimization improves response timing and participation.
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
      description: 'Streamline attendance tracking with location-based verification, bulk marking, and detailed learner records.',
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p>
            The <strong>Attendance Management</strong> module enables accurate and hassle-free attendance tracking for instructors and learners.
            Location-based verification ensures attendance is marked only on institute premises. Supervisors can mark attendance for multiple
            learners at once, and instructors can monitor attendance records efficiently.
          </p>

          <h3>Key Features:</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Location-based attendance marking to ensure authenticity and compliance with institute policies.</li>
            <li>Bulk attendance marking for supervisors — mark multiple learners or staff with same or different details in one action.</li>
            <li>Instructor dashboards to track individual and batch-wise attendance records easily.</li>
            <li>Automated alerts for low attendance or missing entries for learners and staff.</li>
            <li>Integration with academic records for performance and eligibility tracking.</li>
            <li>Detailed reporting and analytics for administrators to monitor attendance trends by course or batch.</li>
          </ul>

          <p>
            <strong>Benefits:</strong> Reduces manual effort, ensures attendance authenticity, and provides transparent reporting.
            Instructors, supervisors, and administrators can track attendance efficiently, enhancing accountability and compliance.
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
        <div className="about-banner">
          <img src={bannerImages[currentIndex]} alt="institute Management Demo" className="about-banner-img" />
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
        <MyBox
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
        </MyBox>
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
                  <div className="section-heading">LEARNING MANAGEMENT SYSTEM</div>
                  <div className="section-underline">
                    <div></div>
                    <div></div>
                  </div>
                  <p className="card-text">
                    Discover how our <strong>Learning Management Software</strong> simplifies daily operations for institutes. From managing admissions to
                    tracking performance, everything is unified under one digital platform, with <strong>Intelligent insights</strong> and <strong>AI-driven</strong> analytics
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
                    title="Learning Management System Demo"
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
        href="https://adhyayan.online"
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

export default memo(ClientDemoTech, (prevProps, nextProps) => eq(prevProps, nextProps));
