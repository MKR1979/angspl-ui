'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './exam-mgmt.css';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MyTypography from '@/app/custom-components/MyTypography';

const bannerImages = ['/examination/exams.webp', '/examination/exams3.webp'];

const ClientExamMgmt = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/examination/add-exam.webp',
    '/examination/exam-ques..webp',
    '/examination/exam-result.webp',
    '/examination/import-exam.webp'
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change page every 4 seconds
    return () => clearInterval(interval);
  }, []);

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
                <MyGrid className="card-text">
                  Online exams are computer-based tests that allow students to take assessments through the internet instead of traditional
                  paper methods. They provide flexibility in time and location, support automated evaluation, and offer features like
                  instant results, question randomization, and secure monitoring. This system makes learning and examination more efficient,
                  accessible, and transparent for both students and institutions.
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1"> KEY HIGHLIGHTS OF ONLINE EXAMINATION MANAGEMENT</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Flexible: Attempt exams from anywhere.
                      </li>
                      <li>
                        <span>&#10003;</span> Quick: Instant results and auto-grading.
                      </li>
                      <li>
                        <span>&#10003;</span> Secure: safe login & random question.
                      </li>
                      <li>
                        <span>&#10003;</span>Transparent: Accurate performance reports.
                      </li>
                      <li>
                        <span>&#10003;</span> Cost-effective: save paper & resources.
                      </li>
                      <li style={{ marginBottom: '5px', padding: 0 }}>
                        <span>&#10003;</span> Easy to manage: simple exam creation & result review.
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
                        <span>&#10003;</span> After sign-in, the admin dashboard opens automatically.
                      </li>
                      <li>
                        <span>&#10003;</span> From the left-side menu, click on academics.
                      </li>
                      <li>
                        <span>&#10003;</span> Under accademics, select online exam.
                      </li>
                      <li>
                        <span>&#10003;</span>Transparent: Accurate performance reports.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> The exam dashboard will open, showing a list of existing exams.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Online Exam </h2>
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
                  To manage your online examinations, begin by clicking on the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Online Exam </span> section. Once inside, select the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add Exam</span> option. This will open the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add Exam Dashboard,</span> where you can view a list of all
                  existing exams.
                  <br />
                  To create a new exam, click on the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+ Add</span> button. You will
                  then be prompted to select important details such as the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Course, Quiz Name, Quiz Code,</span> and
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Quiz Type </span>. After entering all the required information,
                  click the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> button to finalize and create your new exam
                  entry.
                  <br />
                  Your newly created exam will now appear in the exam list, ready for further configuration or assignment to students.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Add exam</h2>
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
                  To create and manage exams, navigate to the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Add Exam </span>
                  section under the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Online Exam </span>
                  module. This section allows you to add new exams and manage existing ones. Click on the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> +Add </span>
                  button to create a new exam. Enter the required details such as
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Course Name, Quiz Name, Duration, Quiz Code, </span>
                  and
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Quiz Type. </span>
                  Once all fields are filled, click on
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Save </span>
                  to successfully add your exam. After adding, you can verify or edit the exam by selecting the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Edit Exam </span>
                  option. Click on the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> hyperlinked student name </span>
                  to review complete details. If necessary, update the status from
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Active </span>
                  to
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Verified </span>
                  and click
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Save </span>
                  to confirm your changes.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Exam Questions </h2>
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
                  To manage your exam questions, go to the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Exam Question </span>
                  section under the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Online Exam </span>
                  module. The
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Exam Question Dashboard </span>
                  will open, showing a list of all existing exam questions. To add a new question, click on the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Add </span>
                  button. Select the appropriate
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Quiz Name </span>
                  and enter the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Question </span>. Once completed, click on
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Save </span>
                  to add the exam question successfully. The newly added question will now appear in the dashboard, ready for review or
                  editing if required.
                </MyGrid>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                <h2 className="section-subheading">Import Exam </h2>
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
                To manage and import exams efficiently, navigate to the
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Import Exam </span>
                section under the
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Online Exam </span>
                module. Here, you will find the
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Import Exam Dashboard, </span>
                which displays a complete list of all exams that have already been imported. This allows you to keep track of existing exams
                and ensures there are no duplicates. To create a new imported exam, start by selecting the required
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Course Name, Quiz Name, Quiz Code, Quiz Type, </span>
                and define the
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Duration </span>
                for the quiz. It is important to ensure that all details match the intended course and assessment criteria. After entering
                the necessary information, attach the file containing the quiz questions. The system supports uploading files in the
                prescribed format, which allows multiple questions to be added at once, saving time and reducing manual entry errors. Once
                the file is selected, click on the
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Upload </span>
                button. The system will process the file, add the questions to the selected quiz, and display a confirmation message once
                the import is successful. The newly imported exam will now appear in the dashboard, ready for assignment to students or
                further editing. This feature streamlines exam creation, ensures consistency in question formatting, and provides an
                efficient way to manage large sets of exam questions.
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                <h2 className="section-subheading">Student Skill Test</h2>
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
                To take the <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Student Skill Test, </span> start by entering your
                correct <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Username </span> and{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Password </span>. Upon successful login, the{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Learning Dashboard </span> will open automatically. Navigate to the{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Skill Test </span> section to begin your exam. During the test, use
                the <span style={{ fontWeight: 'bold', color: '#334D6E' }}> NEXT </span> button to move forward to the next question, and
                the <span style={{ fontWeight: 'bold', color: '#334D6E' }}> PREV </span> button if you need to review a previous question.
                Keep an eye on the <span style={{ fontWeight: 'bold', color: '#334D6E' }}> “Time Left” </span> timer located at the
                top-right corner of the screen to manage your exam time effectively. After answering all questions, click the{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Submit </span> button. A confirmation box will appear; click{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Submit </span> again to finalize and complete your exam. Once
                submitted, you can review your <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Score </span> and view the{' '}
                <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Quiz Summary </span> for detailed insights. You also have two
                additional options: click <span style={{ fontWeight: 'bold', color: '#334D6E' }}> RESTART EXAM </span> if you want to take
                the exam again, or click <span style={{ fontWeight: 'bold', color: '#334D6E' }}> EXIT EXAM </span> to leave the exam page
                and return to the main dashboard.
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                <h2 className="section-subheading">Exam result </h2>
                <div className="responsive-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc)}?rel=0`}
                    title="How to Add New Students | Step-by-Step Guide"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                <MyCardContent className="list-text">
                  <ul className="benefits-list">
                    <li style={{ margin: 0, padding: 0 }}>
                      <span>&#10003;</span> Click on Exam Result.
                    </li>
                    <li>
                      <span>&#10003;</span> Under online exam , select Exam Result.
                    </li>
                    <li>
                      <span>&#10003;</span> The exam result dashboard will open, showing a Review of Exam Result.
                    </li>
                    <li style={{ margin: 0, padding: 0 }}>
                      <span>&#10003;</span> Select student name, from date and to date.
                    </li>
                  </ul>
                </MyCardContent>
              </MyGrid>
            </MyCardContent>
          </MyCard>
        </MyBox>
        <Footer />
      </div>
    </>
  );
};

export default memo(ClientExamMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
