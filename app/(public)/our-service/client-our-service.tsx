'use client';
import React, { memo, useState } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import { CardHeader } from '@mui/material';
// import AddIcon from "@mui/icons-material/Add";
import MyTypography from '@/app/custom-components/MyTypography';
import MyDivider from '@/app/custom-components/MyDivider';
import MyIconButton from '@/app/custom-components/MyIconButton';
import { Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { COMPANY } from '.././constants/constants';
import './services.css';

const ClientOurService = () => {
  const items = [
    {
      id: 1,
      title: 'adhyayan.online',
      description:
        " Your Digital Partner for Learning Programming, adhyayan.online is a modern and interactive online learning platform designed to help you master programming from the ground up. Whether you're a beginner or looking to enhance your skills, we offer well-structured courses, quizzes, hands-on projects, and video tutorials for programming languages like React.js,Node.Js, JavaScript, C++, and Java.With content available in both English and Hindi, adhyayan.online makes coding accessible, engaging, and practical for everyone."
    },
    {
      id: 2,
      title: 'aitm.academy',
      description:
        " Your Digital Partner for Learning Programming aitm.academy is a modern and interactive online learning platform designed to help you master programming from the ground up. Whether you're a beginner or looking to enhance your skills, we offer well-structured courses, quizzes, hands-on projects, and video tutorials in popular languages like React.js,Node.Js, JavaScript, C++, and Java.With content available in both English and Hindi, aitm.academy makes coding accessible, engaging, and practical for everyone."
    },
    { id: 4, title: 'Admission' },
    { id: 5, title: 'Admin Dashboard' },
    { id: 6, title: 'Student Dashboard' },
    { id: 7, title: 'Payment Collections' },
    { id: 8, title: 'Location Based Attendance' }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyBox
              sx={{
                backgroundImage: 'url("/services.png3.png")',
                backgroundSize: 'cover',
                backgroundPosition: { xs: 'top', sm: 'center' }, // adjust position for small screens
                backgroundRepeat: 'no-repeat',
                minHeight: { xs: '150px', sm: '350px', md: '400px' }, // responsive height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingX: 2,
                position: 'relative',
                zIndex: 1
              }}
            ></MyBox>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}></MyBox>
            <MyBox sx={{ marginTop: '-80px', position: 'relative', zIndex: 2, width: '80%', marginLeft: '10%' }}>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={
                        <>
                          <img
                            src="/web.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Web Development</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We craft fast, responsive, and scalable websites tailored to your business goals. Our team specializes in modern tech
                      like React, Next.js, Node.js, and more to ensure a seamless user experience and strong backend performance.
                    </div>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={
                        <>
                          <img
                            src="/mobile2.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Mobile App Development</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We build high-performance mobile apps for iOS and Android using cutting-edge technologies. Whether its a startup idea
                      or an enterprise solution, we deliver smooth, scalable, and user-friendly mobile experiences.
                    </div>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={
                        <>
                          <img
                            src="/ui.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>UI/UX Design</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We design beautiful, intuitive interfaces that enhance user engagement and drive results. Our UX process is focused on
                      understanding your users to deliver seamless digital experiences.
                    </div>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={
                        <>
                          <img
                            src="/seo3.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>SEO Optimization</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      Boost your website’s visibility and attract more organic traffic with our expert SEO strategies. From keyword research
                      to on-page and technical SEO, we help you rank higher and convert better.
                    </div>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyBox>
          </MyCardContent>
          <MyBox sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <MyTypography variant="overline" sx={{ fontSize: '12px', color: 'gray', letterSpacing: 1 }}>
              PRODUCTS AND PLATFORMS
            </MyTypography>

            <MyBox sx={{ borderLeft: '4px solid #007ac1', pl: 2, mt: 1 }}>
              <MyTypography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.5, mb: 3 }}>
                Create a more adaptive organization with our expertise, ecosystem, and solutions.
              </MyTypography>
            </MyBox>

            {items.map((item, index) => (
              <MyBox key={item.id}>
                <MyBox
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2
                  }}
                >
                  <MyBox sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MyTypography variant="h5" sx={{ color: '#007ac1', fontWeight: 'bold', width: '50px' }}>
                      {String(item.id).padStart(2, '0')}.
                    </MyTypography>
                    <MyTypography variant="h6">{item.title}</MyTypography>
                  </MyBox>

                  <MyIconButton
                    sx={{
                      border: '1px solid black',
                      borderRadius: '50%',
                      width: 36,
                      height: 36
                    }}
                    onClick={() => toggleOpen(index)}
                  >
                    {openIndex === index ? <RemoveIcon /> : <AddIcon />}
                  </MyIconButton>
                </MyBox>
                <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                  <MyBox sx={{ px: 7, pb: 2 }}>
                    <MyTypography variant="body2" sx={{ color: 'gray' }}>
                      {item.description}
                    </MyTypography>
                  </MyBox>
                  {openIndex === index && (
                    <MyBox sx={{ pl: 9, pb: 2 }}>
                      <a
                        href="https://adhyayan.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: 'bold', textDecoration: 'none', color: '#007ac1' }}
                      >
                        Click Here ➙
                      </a>
                    </MyBox>
                  )}
                </Collapse>

                <MyDivider />
              </MyBox>
            ))}
          </MyBox>
        </MyCard>
      </MyBox>
      <div className="container">
        <div className="vertical_center">
          <p>© Copyright 2025 {COMPANY}, All rights reserved.</p>
          <div className="vertical_center">
            ||
            <a href="/terms">Terms of use</a>||
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClientOurService, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
