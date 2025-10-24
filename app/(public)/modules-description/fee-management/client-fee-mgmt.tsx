'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './fee-mgmt.css';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MyTypography from '@/app/custom-components/MyTypography';

const bannerImages = ['/paymentMngImgs/pay3.webp', '/paymentMngImgs/pay5.webp'];

const ClientFeeMgmt = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/paymentMngImgs/scehdule pay.webp',
    '/paymentMngImgs/collect pay.webp',
    '/paymentMngImgs/receipts 1.webp',
    '/paymentMngImgs/receipts 2.webp',
    '/paymentMngImgs/fee heads.webp'
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

  const videoSrc = 'https://youtu.be/W85SvzdXOLk';
  const videoSrc1 = 'https://youtu.be/nhn4f3m5wVE';
  const videoSrc2 = 'https://youtu.be/MsNU7foHAkU';
  const videoSrc3 = 'https://youtu.be/Q5sxvQNTT0A';
  return (
    <>
      <div>
        <div className="about-banner">
          <img src={bannerImages[currentIndex]} alt="Admission Management" className="about-banner-img" />

          {/* Arrows */}
          <IconButton className="banner-arrow left" onClick={goToPrev}
          style={{
          position: 'absolute',
          left: '2px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'black',
        }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton className="banner-arrow right" onClick={goToNext}
          style={{
          position: 'absolute',
          right: '2px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'black',
        }}
          >
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
                    <div className="section-heading">PAYMENT MANAGEMENT SYSTEM</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyGrid className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment Management</span> is a system used to schedule,
                  collect, and monitor all types of payments made by students or employees. It helps institutions manage fees efficiently by
                  keeping track payment frequency, total amount, and due dates. Through this module, users can schedule payments, generate
                  receipts, and view payments histories-ensuring transparency and accuracy in all financial transactions
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">Key highlights </div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Allows scheduling of payments based on course, student, or department.
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
                  <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                    <h2 className="section-subheading">Accessing the application</h2>
                    <h3 className="section-subheading">Login</h3>
                    <MyGrid className="list-text">
                      <ul className="benefits-list">
                        <li style={{ margin: 0, padding: 0 }}>
                          <span>➤</span>Go to the home page and log in.
                        </li>
                        <li style={{ marginBottom: '5px', padding: 0 }}>
                          <span>➤ Password:</span>Password (Please contact your administrator to obtain the password. You will have the
                          option to change it after logging in
                        </li>
                      </ul>
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
                  </MyGrid>
                </MyGrid>
                <MyGrid className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment Management</span> module allows administrators to
                  efficiently handle scheduled fees. After signing in, the admin dashboard opens automatically. From the left-side menu,
                  click on <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment Management System</span>, then select Schedule Fee
                  under the payment section. The payment management dashboard will appear, displaying a comprehensive list of{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>scheduled payments</span> for easy monitoring and management.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Schedule payment </h2>
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
                  To create a <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Scheduled Payment</span>, first click on{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Schedule Payment</span> in the Payment Management module. Under
                  this section, select <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add Payment</span> to begin adding a new
                  entry. Click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+ Add</span> to create new payment information, where
                  you will provide details such as the course, student name, payment frequency, and total amount. Once all the necessary
                  information is filled in, click the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> button to add the
                  payment information. Finally, click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> again to confirm
                  and create the scheduled payment, ensuring that it is successfully added to the system for future tracking.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Collect Payment</h2>
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
                  To <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Collect Payment</span>, first click on{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Collect Payment</span> in the Payment Management module. Under this
                  section, select <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Collect Pay</span> to open the Collect Payment
                  dashboard, which shows a list of all existing payment collections. To add a new collection, click{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Add</span> to create new fee collection information. Enter details
                  such as the course, student name, payment frequency, and total amount. Once all the information is filled in, click the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> button to add the fee collection. Finally, click{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> again to confirm and create the payment collection,
                  ensuring it is properly recorded in the system for tracking and reporting.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Receipts</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc2)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyGrid className="card-text">
                  To manage <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Receipts</span>, first click on{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Receipts</span> in the Payment Management module. This will open
                  the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Receipts Dashboard</span>, which displays a list of all recorded
                  receipts. To verify a particular receipt, click on the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Student Name</span> hyperlink associated with that entry, and
                  review the receipt details thoroughly. This ensures that all payment records are accurate and properly documented for
                  future reference and reporting.
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Fee Head</h2>
                  <div className="responsive-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoSrc3)}?rel=0`}
                      title="How to Add New Students | Step-by-Step Guide"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </MyGrid>
                <MyGrid className="card-text">
                  To manage <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Fees Head</span>, first click on{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Fees Head</span> under the Payment Management module. This will
                  open the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Fees Head Dashboard</span>, displaying a list of all
                  existing fee heads. To create a new Fees Head, select the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Course Name</span>, provide the
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Category</span> and{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Code</span>, set the{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Status</span>, and mark{' '}
                  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Is Mandatory</span> if required. Once all information is filled in
                  correctly, click the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Save</span> button to add the new Fees Head,
                  ensuring it is properly recorded for future fee management and collection.
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

export default memo(ClientFeeMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
