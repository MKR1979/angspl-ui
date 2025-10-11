'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './fee-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const bannerImages = ['/paymentMngImgs/pay1.jpg', '/paymentMngImgs/pay3.png', '/paymentMngImgs/pay5.png'];

const ClientFeeMgmt = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/paymentMngImgs/scehdule pay.webp",
    "/paymentMngImgs/collect pay.webp",
    "/paymentMngImgs/receipts 1.webp",
    "/paymentMngImgs/receipts 2.webp",
    "/paymentMngImgs/fee heads.webp",
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
                    <div className="section-heading">Payment Management System</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment Management</span> is a system used
                  to schedule, collect, and monitor all types of payments made by students or employees. It helps institutions
                  manage fees efficiently by keeping track payment frequency, total amount, and due dates. Through this module,
                  users can schedule payments, generate receipts, and view payments histories-ensuring transparency and accuracy
                  in all financial transactions
                </MyCardContent>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">Key highlights </div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span>  Allows scheduling of payments based on course, student, or department.
                      </li>
                      <li>
                        <span>&#10003;</span> Tracks payment frequency such as monthly, Quarterly, or Yearly.
                      </li>
                      <li>
                        <span>&#10003;</span> Displays detailed payment information including total and net amount.
                      </li>
                      <li>
                        <span>&#10003;</span> Enables generations of receipts and payment reports.
                      </li>
                      <li>
                        <span>&#10003;</span> Help maintain transparency and accuracy in financial records.
                      </li>
                      <li>
                        <span>&#10003;</span> Reduces manual work through automated payment scheduling.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Provides easy access to payment history for both admin and users.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Accessing the application</h2>
                  <h3 className="section-subheading">Login</h3>
                  <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                    <MyCardContent className="list-text">
                      <ul className="benefits-list">
                        <li style={{ margin: 0, padding: 0 }}>
                          <span>➤</span>Go to the home page and log in.
                        </li>
                        <li style={{ marginBottom: '5px', padding: 0 }}>
                          <span>➤  Password:</span>Password (Please contact your administrator to obtain the password. You will have the option to change it after logging in
                        </li>
                      </ul>
                      <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                        <div className="book-container">
                          {/* Heading overlay on book background */}
                          <h2 className="book-heading">How It Works Section</h2>

                          <div className="book">
                            {images.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`page-${index}`}
                                className={`page ${index === current ? "active" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      </MyGrid>
                    </MyCardContent>
                  </MyGrid>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <h2 className="section-subheading">payment management</h2>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span>  After sign-in, the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>admin dashboard</span>opens automatically.
                      </li>
                      <li>
                        <span>&#10003;</span> From the left-side menu, click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>payment management system.</span>
                      </li>
                      <li>
                        <span>&#10003;</span> Under payement, select <span style={{ fontWeight: 'bold', color: '#334D6E' }}>schedule fee .</span>
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> The payment management dashboard will open, showing a list of <span style={{ fontWeight: 'bold', color: '#334D6E' }}>schedule payment.</span>
                      </li>
                    </ul>
                  </MyCardContent>
                  <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
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
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <h2 className="section-subheading">Schedule payment </h2>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span>  Click on <span style={{ fontWeight: 'bold', color: '#334D6E' }}>schedule payment.</span>
                      </li>
                      <li>
                        <span>&#10003;</span> Under schedule payment , select <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add payment.</span>
                      </li>
                      <li>
                        <span>&#10003;</span> select <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+add</span> create New <span style={{ fontWeight: 'bold', color: '#334D6E' }}>
                          Payment Information.</span>
                      </li>
                      <li>
                        <span>&#10003;</span> Select your course, student name, payment frequency and total amount then
                        <br /> click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>save</span>
                        button to add your <span style={{ fontWeight: 'bold', color: '#334D6E' }}>payment information.</span>
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>save</span>
                        to create the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>schedule payment.</span>
                      </li>
                    </ul>
                  </MyCardContent>
                  <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                    <div className="responsive-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                        title="How to Add New Students | Step-by-Step Guide"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <h2 className="section-subheading">Collect Payment  </h2>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click on Collect Payment.
                      </li>
                      <li>
                        <span>&#10003;</span> Under opayment management select Collect Pay.
                      </li>
                      <li>
                        <span>&#10003;</span> The collect payment dashboard will open, showing a list of Collect Payment.
                      </li>
                      <li>
                        <span>&#10003;</span> Select add to create New Add Fee Collection.
                      </li>
                      <li>
                        <span>&#10003;</span>Select your course, student name, payment frequency and total amount then click save button to add your Add Fee Collection.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click save to create the Payment Collection.
                      </li>
                    </ul>
                  </MyCardContent>
                  <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                    <div className="responsive-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                        title="How to Add New Students | Step-by-Step Guide"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyGrid
                  size={{ xs: 12, sm: 12 }}
                  sx={{
                    textAlign: 'left',
                    margin: 0,
                    paddingX: { xs: '16px', sm: '24px', md: '10px' },
                  }}
                >
                  <MyCardContent className="list-text">
                    <h2 className="section-subheading">Payment Management</h2>

                    {/* Receipts Section */}
                    <h3 className="section-subheading" style={{ marginTop: '20px' }}>
                      Receipts
                    </h3>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click on <strong>Receipts</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> Under <strong>Payment Management</strong>, select
                        <strong> Receipts</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> The <strong>Receipts Dashboard</strong> will open,
                        displaying a list of all receipts.
                      </li>
                      <li>
                        <span>&#10003;</span> To verify a receipt, click on the{' '}
                        <strong>Student Name hyperlink</strong> and review the details.
                      </li>
                    </ul>

                    {/* Fees Head Section */}
                    <h3 className="section-subheading" style={{ marginTop: '20px' }}>
                      Fees Head
                    </h3>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click on <strong>Fees Head</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> Under <strong>Payment Management</strong>, select
                        <strong> Fees Head</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> The <strong>Fees Head Dashboard</strong> will open,
                        showing a list of all Fee Heads.
                      </li>
                      <li>
                        <span>&#10003;</span> Select your <strong>Course Name</strong>,{' '}
                        <strong>Category</strong>, <strong>Code</strong>, and{' '}
                        <strong>Status</strong>, then mark <strong>Is Mandatory</strong> if
                        required.
                      </li>
                      <li>
                        <span>&#10003;</span> Click <strong>Save</strong> to create the Fees Head.
                      </li>
                    </ul>
                  </MyCardContent>

                  <MyGrid
                    size={{ xs: 12, md: 12 }}
                    sx={{ maxWidth: '1210px', margin: '0 auto' }}
                  >
                    <div className="responsive-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc1)}?rel=0`}
                        title="Payment Management | Receipts and Fees Head Guide"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyGrid
                  size={{ xs: 12, sm: 12 }}
                  sx={{
                    textAlign: 'left',
                    margin: 0,
                    paddingX: { xs: '16px', sm: '24px', md: '10px' },
                  }}
                >
                  <MyCardContent className="list-text">
                    <h2 className="section-subheading">Edit Exam</h2>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click on <strong>Edit Exam</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> You can verify the exam details by clicking on the{' '}
                        <strong>Student Name hyperlink</strong> and reviewing all information.
                      </li>
                      <li>
                        <span>&#10003;</span> Click on <strong>Edit</strong> to modify the exam
                        status from <strong>“Active”</strong> to <strong>“Verified”</strong>, and
                        then click on <strong>Save</strong>.
                      </li>
                    </ul>

                    <h2 className="section-subheading" style={{ marginTop: '20px' }}>
                      Edit Add Fees Payment
                    </h2>
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Click on <strong>Edit Add Fees Payment</strong>.
                      </li>
                      <li>
                        <span>&#10003;</span> You can verify the payment details by clicking on
                        the <strong>Student Name hyperlink</strong> and reviewing all related
                        information.
                      </li>
                      <li>
                        <span>&#10003;</span> Click on <strong>Edit</strong> to change the status
                        from <strong>“Active”</strong> to <strong>“Verified”</strong>, and then
                        click on <strong>Save</strong>.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>

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

export default memo(ClientFeeMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
