'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import './affiliate-mgmt.css';
import { COMPANY } from '../../constants/constants';
import MyBox from '@/app/custom-components/MyBox';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const bannerImages = ['/affiliateImgs/aff4.jpg', '/affiliateImgs/aff8.jpg', '/affiliateImgs/aff10.jpg'];

const ClientAffiliateMgmt = () => {
    const images = [
    "/affiliateImgs/aff.PNG",
    "/affiliateImgs/aff1.PNG",
    "/affiliateImgs/aff2.PNG",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change page every 4 seconds
    return () => clearInterval(interval);
  }, []);

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
                    <div className="section-heading">AFFILIATE MANAGEMENT</div>
                    <div className="section-underline">
                      <div></div>
                      <div></div>
                    </div>
                  </MyGrid>
                </MyGrid>
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliate Management System</span> is a powerful
                  platform designed to manage and track affiliate partnerships effectively. It enables organizations to promote
                  their courses, products, or services through registered affiliates who earn commissions based on successful
                  referrals or sales. This system automates the entire affiliate process — from registration, referral tracking,
                  and commission calculation to payment management — ensuring transparency and efficiency. Administrators can
                  monitor affiliate performance, view reports, and manage payouts, while affiliates can access personalized
                  dashboards to track their earnings, referral links, and progress. By integrating automation and real-time
                  analytics, the Affiliate Management System helps institutions or businesses expand their reach, increase
                  enrollments, and build strong marketing networks with minimal manual effort.
                </MyCardContent>
                <MyGrid size={{ xs: 12, sm: 12 }} textAlign="left">
                  <div className="section-heading1">BENEFITS OF ONLINE ADMISSION / ENROLLMENT</div>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }} sx={{ textAlign: 'left', margin: 0, paddingX: { xs: '16px', sm: '24px', md: '10px' } }}>
                  <MyCardContent className="list-text">
                    <ul className="benefits-list">
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Helps increase student enrollments and reach new audiences.
                      </li>
                      <li>
                        <span>&#10003;</span> Provides a cost-effective way to promote courses or services.
                      </li>
                      <li>
                        <span>&#10003;</span> Tracks referrals, clicks, and conversions automatically.
                      </li>
                      <li>
                        <span>&#10003;</span> Gives real-time performance reports for each affiliate.
                      </li>
                      <li>
                        <span>&#10003;</span> Simplifies commission calculation and payout management.
                      </li>
                      <li>
                        <span>&#10003;</span> Improves brand visibility through affiliate promotions.
                      </li>
                      <li style={{ margin: 0, padding: 0 }}>
                        <span>&#10003;</span> Saves time by reducing manual tracking and calculations.
                      </li>
                    </ul>
                  </MyCardContent>
                </MyGrid>
                {/* <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Online affiliate</h2>
                  <div className="responsive-image">
                    <img src="/ModulesImgs/admForm.png" alt="Admission Form" />
                  </div>
                </MyGrid> */}
                  <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                        <div className="book-container">
                          {/* Heading overlay on book background */}
                          <h2 className="book-heading">Online affiliate</h2>

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
                <MyCardContent className="card-text">
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Online Affiliate</span> feature allows users to
                  register as affiliates and manage their referrals directly through the platform. To get started, click on
                  the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliate</span> option and fill in the affiliate
                  registration form with the required details, then click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Submit</span> to
                  create your affiliate account. Once registered, go to the home page, log in, and click on the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliate</span> option
                  under the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliate Dashboard</span>. You will be redirected to <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Your Referrals List</span>, where
                  you can view and manage all your referrals. To add a new referral, click on the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+ADD</span> button, fill in the necessary details, and click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Submit</span> to
                  create the referral entry. This process allows affiliates to efficiently register, manage, and track their referrals online, ensuring proper record-keeping and smooth commission tracking.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Affiliate Dashboard</h2>
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
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Affiliate Dashboard </span> provides affiliates
                  with a complete overview of their performance, earnings, and referral activities in one place.
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliate Summary</span> section
                  displays key statistics such as total referrals, successful conversions, total earnings, and
                  active campaigns — helping affiliates quickly understand their overall progress.
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Your Referral Summary</span> section
                  gives detailed insights into every referral made, including referral links, the number of users
                  who joined or purchased through those links, and the current status of each referral. Lastly,
                  the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Payment Info</span> section shows all
                  commission-related details, such as earned amount, pending payments, payout history, and payment
                  dates, ensuring full financial transparency. Together, these sections allow affiliates to track
                  their activities, analyze performance, and manage their earnings efficiently through a single,
                  user-friendly dashboard.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Affiliate Referrals</h2>
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
                  The  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Affiliate Referrals</span> section in
                  the Affiliate Dashboard provides detailed information about all users or customers who joined or purchased
                  through an affiliate’s referral link. It displays each referral’s name, registration or purchase date,
                  status (such as pending, completed, or approved), and any commission earned from that referral. This
                  section helps affiliates track the effectiveness of their promotional efforts, see which referrals
                  converted successfully, and identify opportunities to increase engagement. By offering a clear and
                  organized view of all referral activities, this feature ensures transparency and allows affiliates
                  to monitor and maximize their earnings efficiently.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Review Affiliates</h2>
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
                  The  <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Review Affiliates </span> section allows
                  administrators to manage and monitor affiliates efficiently. To add new affiliates, click on <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+Add Affiliates</span>,
                  fill in the required details such as name, contact information, and commission structure, and then
                  click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Submit</span> to create the affiliate account. Once added, you are redirected to the Your <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliates List</span> page,
                  where all created affiliates are displayed for review. To calculate payments, select the desired users
                  and specify the  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>From Date</span> and  <span style={{ fontWeight: 'bold', color: '#334D6E' }}>To Date </span>for the payment period. After selecting the appropriate rows,
                  click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>“Calculate Payment”</span> to generate commission details for the selected affiliates. This process ensures
                  accurate tracking, timely payouts, and streamlined management of all affiliate activities.
                </MyCardContent>
                <MyGrid size={{ xs: 12, md: 12 }} sx={{ maxWidth: '1210px', margin: '0 auto' }}>
                  <h2 className="section-subheading">Referrals</h2>
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
                  The <span style={{ fontWeight: 'bold', color: '#334D6E' }}> Referrals </span> section
                  allows administrators or affiliates to add and manage referral records efficiently.
                  To add a new referral, click on <span style={{ fontWeight: 'bold', color: '#334D6E' }}>+Add Referrals</span>,
                  fill in the required details such as the referral’s name, contact information, and related affiliate,
                  and then click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Submit</span> to create the
                  referral entry. After submission, you are redirected to the Your <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Affiliates List</span> page
                  within the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>Review Referrals</span> section,
                  where all added referrals are displayed for review. To verify referrals, select the desired users,
                  specify the <span style={{ fontWeight: 'bold', color: '#334D6E' }}>From Date</span> and <span style={{ fontWeight: 'bold', color: '#334D6E' }}>To Date</span> for
                  the relevant period, select the appropriate rows, and click <span style={{ fontWeight: 'bold', color: '#334D6E' }}>“Mark Verified”</span>. This process ensures that all referra
                  l records are properly tracked, verified, and managed for accurate reporting and commission calculation.
                </MyCardContent>

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

export default memo(ClientAffiliateMgmt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
