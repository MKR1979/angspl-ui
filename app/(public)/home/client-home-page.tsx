'use client';
import styles from './homePage.module.css';
import MyBox from '../../custom-components/MyBox';
import MyCard from '../../custom-components/MyCard';
import MyCardContent from '../../custom-components/MyCardContent';
import MyGrid from '../../custom-components/MyGrid';
import { useSelector } from '../../store';
import { CardHeader, IconButton } from '@mui/material';
import MyApiIcon from '@/app/custom-components/MyApiIcon';
import MyCheckCircleIcon from '@/app/custom-components/MyCheckCircleIcon';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import { Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import { useState, useRef, useEffect, useCallback } from 'react';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// import MyTypography from '@/app/custom-components/MyTypography';

export default function ClientHomePage() {
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);

  const rollingConfig = siteConfig.find((c) => c.key === 'ROLLING_HOME_ADHYAYAN') as any;
  let categories: { name: string; icon: string }[] = [];

  if (rollingConfig?.business_config?.business_config) {
    try {
      const rawConfig = rollingConfig.business_config.business_config;
      try {
        categories = JSON.parse(rawConfig);
      } catch {
        categories = new Function(`return ${rawConfig}`)();
      }
    } catch (err) {
      console.error('Failed to parse business_config:', err);
    }
  }

  // *** this is used to test the rolling lines in home page on local host ****
  //   const categories = [
  //   { name: 'School ERP', icon: '/imgPrograms/rolling/tech/schlERP.webp' },
  //   { name: 'College ERP', icon: '/imgPrograms/rolling/tech/OnlineAttendance.webp' },
  //   { name: 'Institute ERP', icon: '/imgPrograms/rolling/tech/online_exam.webp' },
  //   { name: 'LMS', icon: '/imgPrograms/rolling/tech/LMS.webp' },
  //   { name: 'Online Exams', icon: '/imgPrograms/rolling/tech/onlineExams.webp' },
  //   { name: 'Payment Management', icon: '/imgPrograms/rolling/tech/admission.webp' },
  //   { name: 'Shop Anywhere', icon: '/imgPrograms/rolling/tech/shopAnywhere.webp' },
  //   { name: 'Clinic Portal', icon: '/imgPrograms/rolling/tech/clinicPortal.webp' },
  //   { name: 'Stock Management', icon: '/imgPrograms/rolling/tech/StockManagement.webp' },
  //   { name: 'Affiliate Programs', icon: '/imgPrograms/rolling/tech/imgAffiliate.webp' },
  //   { name: 'Billing Management', icon: '/imgPrograms/rolling/tech/billingMgmt.webp' },
  // ];

  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const demos = [
    {
      name: 'School Demo',
      url: 'https://adhyayan.school',
      icon: <SchoolIcon fontSize="small" />
    },
    {
      name: 'College Demo',
      url: 'https://adhyayan.college',
      icon: <AccountBalanceIcon fontSize="small" />
    },
    {
      name: 'Institute Demo',
      url: 'https://adhyayan.online',
      icon: <BusinessIcon fontSize="small" />
    }
  ];
  const bannerImages = [
    '/home-page/home2.webp',
    '/home-page/home5.webp',   
    '/home-page/home7.webp',
    '/home-page/home3.webp',
    '/home-page/home6.webp'
  ];
  const buttonColors = ['#3c77efff','#FFD700',  '#FF7F32', '#098d8aff', '#ed5d70ff'];
const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonColor, setButtonColor] = useState(buttonColors[0]);
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionRef1 = useRef<HTMLDivElement>(null);

  const bannerTopicMap = [
    { page: 'home', ref: sectionRef },
    { page: 'home', ref: sectionRef1 },
    { page: 'our-service', id: 'section2' },
    { page: 'our-service', id: 'section3' },
    { page: 'our-service', id: 'section4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setButtonColor(buttonColors[currentIndex]);
  }, [currentIndex]);

    // Slider controls
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, []);

  const handleStartClick = useCallback(() => {
    const topic = bannerTopicMap[currentIndex];

    if (topic.page === 'home' && topic.ref?.current) {
      const y = topic.ref.current.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (topic.page === 'our-service') {
      router.push(`/our-service#${topic.id}`);
    }
  }, [currentIndex, router]);


  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div style={{ width: '100%', padding: '0px' }}>
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            whiteSpace: 'nowrap'
          }}
        >
          <h2 className="rolling-header">{companyInfo.company_name}</h2>
        </div>
        <div>
<MyBox
  sx={{
    backgroundImage: `url(${bannerImages[currentIndex]})`,
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    position: 'relative',
    height: { xs: 140, sm: 200, md: 500 },
  }}
>
  {/* Button inside the image */}
  <a
    href="#start"
    style={{
      position: 'absolute',
      bottom: '39px',
      left: '118px',
      padding: '8px 52px',
      backgroundColor: 'white',
      color: buttonColor,
      textDecoration: 'none',
      fontSize: '22px',
      borderRadius: '8px',
      border: `2px solid ${buttonColor}`,
      transition: 'all 0.3s ease',
      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      const t = e.currentTarget as HTMLAnchorElement;
      t.style.cssText += `
        background-color: ${buttonColor};
        color: white;
        transform: scale(1.1);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
      `;
    }}
    onMouseLeave={(e) => {
      const t = e.currentTarget as HTMLAnchorElement;
      t.style.cssText += `
        background-color: white;
        color: ${buttonColor};
        transform: scale(1);
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.15);
      `;
    }}
    onClick={handleStartClick}
    className="start-btn"
  >
    Start Now
  </a>

  {/* Slider Controls */}
  {bannerImages.length > 1 && (
    <>
      <IconButton
        className="banner-arrow left"
        onClick={goToPrev}
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
      <IconButton
        className="banner-arrow right"
        onClick={goToNext}
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
    </>
  )}
</MyBox>

{/* Add this CSS (responsive tweak) */}
<style>
  {`
    @media (max-width: 600px) {
      .start-btn {
        bottom: 1px !important;
        padding: 2px 10px !important;
        left: 80px !important;
         font-size: 5px !important;
      }
    }
  `}
     {`
     @media (max-width: 768px) {
    .start-btn {
      bottom: 5px !important;
      left: 50%;
      transform: translateX(-50%) !important;
      padding: 5px 20px !important;
      font-size: 14px !important;
    }
  `}
  
</style>

        </div>
        <style>
          {`
          @keyframes rollingText {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }

          .rolling-header {
            white-space: nowrap;
            overflow: hidden;
           font-size: clamp(0.8rem, 4vw, 1.5rem); 
            animation: rollingText 16s linear infinite;
          }

            @media (max-width: 600px) {
              .rolling-header {
              animation-duration: 12s;
  }
}
        `}
        </style>
        <div></div>

        <div>
          <MyBox>
            <MyCard>
              <MyCardContent>
                <div className={styles.rollingContainer}>
                  <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <Typography
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#2b3a67',
                        letterSpacing: '0.5px',
                        display: 'inline-block',
                        position: 'relative',
                        textTransform: 'capitalize',
                        '&::after': {
                          content: '""',
                          display: 'block',
                          width: '60px',
                          height: '4px',
                          backgroundColor: '#00bcd4',
                          borderRadius: '2px',
                          margin: '8px auto 0'
                        }
                      }}
                    >
                      Our Offerings
                    </Typography>
                  </Box>
                  <div className={`${styles.rollingRow} ${styles.left}`}>
                    <div className={styles.rollingContent}>
                      {categories.map((item, index) => (
                        <div key={index} className={styles.rollingItem}>
                          <img src={item.icon} alt={item.name} className={styles.iconImage} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {categories.map((item, index) => (
                        <div key={`dup-${index}`} className={styles.rollingItem}>
                          <img src={item.icon} alt={item.name} className={styles.iconImage} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${styles.rollingRow} ${styles.right}`}>
                    <div className={styles.rollingContent}>
                      {categories.map((item, index) => (
                        <div key={`right-${index}`} className={styles.rollingItem}>
                          <img src={item.icon} alt={item.name} className={styles.iconImage} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {categories.map((item, index) => (
                        <div key={`right-dup-${index}`} className={styles.rollingItem}>
                          <img src={item.icon} alt={item.name} className={styles.iconImage} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <MyGrid size={{ xs: 12 }}>
                  <MyCard
                    elevation={3}
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'linear-gradient(145deg, #f8fafc, #ffffff)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    <CardHeader
                      avatar={<MyApiIcon sx={{ color: '#00bcd4' }} />}
                      title={
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2b3a67' }}>
                          Welcome to {companyInfo.company_name}
                        </span>
                      }
                      sx={{
                        backgroundColor: '#eef2f6',
                        borderBottom: '2px solid #00bcd4',
                        py: 1
                      }}
                    />
                    <MyCardContent sx={{ fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                      At {companyInfo.company_name}, we are committed to driving digital transformation by delivering innovative, scalable,
                      and industry-focused technology solutions. Our expertise spans ERP, CRM, AI-powered automation, e-learning, billing
                      systems, cloud solutions, and cybersecurity—helping businesses optimize operations, enhance customer engagement, and
                      accelerate growth.
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid container spacing={3} sx={{ mt: 1 }}>
                  {[
                    {
                      title: 'Streamlined Business Operations',
                      points: [
                        'Automate workflows with ERP solutions tailored for enterprises, colleges, and universities.',
                        'Simplify stock & inventory management with real-time tracking.',
                        'Enhance billing & payment processing with secure, automated invoicing.'
                      ]
                    },
                    {
                      title: 'Enhanced Customer Engagement and Sales Performance',
                      points: [
                        'Intelligent CRM solutions for tracking leads, customer interactions, and sales pipelines.',
                        'Data-driven insights for upselling and cross-selling opportunities.',
                        'Automated follow-ups and appointment scheduling, freeing up sales teams for high-value tasks.'
                      ]
                    },
                    {
                      title: 'Revolutionizing Education with Digital Solutions',
                      points: [
                        'AI-powered admission systems that cut manual work by 80% and boost enrollments.',
                        'E-learning platforms for seamless digital education.',
                        'College & university ERP for efficient administration and student management.'
                      ]
                    },
                    {
                      title: 'Data-Driven Decision Making and Analytics',
                      points: [
                        'Gain real-time insights into customer behavior, market trends, and business performance.',
                        'AI-powered analytics & predictive modeling for proactive decision-making.',
                        'Secure and centralized data storage for seamless collaboration.'
                      ]
                    },
                    {
                      title: 'Cybersecurity and Compliance',
                      points: [
                        'Protect critical business data with cutting-edge security solutions.',
                        'Ensure regulatory compliance with secure document management.',
                        'Prevent fraud and cyber threats with advanced risk monitoring tools.'
                      ]
                    },
                    {
                      title: 'Scalable and Future-Ready Solutions',
                      points: [
                        'Cloud-based architecture that grows with your business.',
                        'Integration with ERP, CRM, and helpdesk platforms.',
                        'AI-driven automation for smarter business processes.'
                      ]
                    },
                    {
                      title: 'Scalability for Business Growth',
                      points: [
                        'Adapts to growing customer bases and evolving business needs.',
                        'Integrates with marketing and helpdesk tools.',
                        'Supports AI-driven analytics and predictive modeling.'
                      ]
                    },
                    {
                      title: 'Innovative Solutions for a Digital-First Future',
                      description: `At ${companyInfo.company_name}, we don’t just build software—we create impact. 
                       Whether you are a startup, large enterprise, or educational institution, 
                       we deliver high-performance solutions designed to keep you ahead in the digital era.`
                    }
                  ].map((card, index) => (
                    <MyGrid key={index} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                      <MyCard
                        elevation={1}
                        sx={{
                          flex: 1,
                          p: 2,
                          borderRadius: '14px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)'
                          }
                        }}
                      >
                        <CardHeader
                          avatar={<MyCheckCircleIcon sx={{ color: '#00bcd4' }} />}
                          title={<Typography sx={{ fontSize: '17px', fontWeight: 600, color: '#1a237e' }}>{card.title}</Typography>}
                          sx={{ pb: 0 }}
                        />
                        <MyCardContent>
                          {card.points ? (
                            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.7' }}>
                              {card.points.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          ) : (
                            <Typography sx={{ fontSize: '15px', color: '#444', lineHeight: 1.7 }}>{card.description}</Typography>
                          )}
                        </MyCardContent>
                      </MyCard>
                    </MyGrid>
                  ))}
                </MyGrid>
                <MyCard sx={{marginTop:'50px', boxShadow:'0px 3px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'rgb(238, 242, 246)'}}>
                <MyGrid container spacing={2} alignItems="stretch" ref={sectionRef1}>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
                    <MyCardContent>
                      <p
                        style={{
                          fontSize: '30px', // Adjust font size to match image style
                          fontFamily:'Sans-serif',
                          color: '#2e3a59',
                          lineHeight: '1'
                        }}
                      >
                        Your Extended Team for Global 
                        <br></br>
                        <span
                          style={{ color: '#f56b2a',  fontFamily: 'Brush Script MT, Dancing Script', fontSize: '55px' }}
                        >
                          {' '}
                          Scale & Innovation.{' '}
                        </span>
                      </p>

                      {/* Paragraph with appropriate font size and spacing */}
                      <p
                        style={{
                          fontSize: '1.1rem', // Adjust paragraph font size
                          color: '#555', // Greyish color for text
                          lineHeight: '1.8' // Increase line height for better readability
                        }}
                      >
                    If we look at the long term prospects, an enhancement in the product life cycle is the key to run any
                     successful business. Getting a one-time boost is a common goal but to increase the life cycle of the 
                     product on a long term basis is what sets us apart from other competitors in the industry. With offshore
                      software development, you get a broader perspective on managing softwares you require which further gets
                       you rid of the scarce resources and sets no boundaries for software
                      </p>
                    </MyCardContent>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/home-page/homedown1.webp" alt="Image description" style={{ width: '100%', height: '500px' }} />
                  </MyGrid>
                </MyGrid>
                </MyCard>
                <MyGrid container spacing={2} alignItems="stretch" ref={sectionRef}>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{marginTop:'10px', display: 'flex', alignItems: 'center' }}>
                    <img src="/home-page/homedown.webp" alt="Image description" style={{ width: '100%', height: 'auto' }} />
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
                    <MyCardContent>
                      <p
                        style={{
                          fontSize: '25px', // Adjust font size to match image style
                          fontFamily:'Sans-serif',
                          color: '#2e3a59',
                          lineHeight: '1'
                        }}
                      >
                        Work with the
                        <span
                          style={{ color: '#f56b2a',  fontFamily: 'Brush Script MT, Dancing Script', fontSize: '50px' }}
                        >
                          {' '}
                          Best Developers{' '}
                        </span>
                        in your
                        <span style={{ color: '#f56b2a',  fontFamily: 'Brush Script MT, Dancing Script', fontSize: '50px' }}>
                          {' '}
                          time zone
                        </span>
                      </p>

                      {/* Paragraph with appropriate font size and spacing */}
                      <p
                        style={{
                          fontSize: '1.1rem', // Adjust paragraph font size
                          color: '#555', // Greyish color for text
                          lineHeight: '1.8' // Increase line height for better readability
                        }}
                      >
                        Across varied boundaries and time zones, {companyInfo.company_name} helps you work without any hassle. For us, communication is the
                        key to resolving any issue that may arise in an agreement. We try to limit ourselves to one time zone so that it
                        becomes easier and efficient for every client involved in the agreement to segregate their requirements as per their
                        need. To omit the difference we see it as a golden opportunity to make advantage out of the time gaps between
                        different clients involved. Through proper allocated goals and work procedures, we carve out a smooth experience for
                        both the service seeker and provider.
                      </p>
                    </MyCardContent>
                  </MyGrid>
                </MyGrid>
              </MyCardContent>
            </MyCard>
          </MyBox>
        </div>
        <Footer />
      </div>
      {/* Live demo button */}
      {!open && (
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 165, sm: 120 },
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
            zIndex: 2000
          }}
        >
          <SchoolIcon fontSize="small" />
          Live Demo
        </Button>
      )}

      {/* Expanded Demo Options Box */}
      {open && (
        <Box
          ref={boxRef}
          sx={{
            position: 'fixed',
            bottom: { xs: 20, sm: 30 },
            right: { xs: 15, sm: 25 },
            bgcolor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.15)',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: { xs: 160, sm: 190 },
            zIndex: 2100,
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#334D6E',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            <LaptopChromebookIcon fontSize="small" />
            Live Demos
          </Typography>
          {demos.map((demo) => (
            <Button
              key={demo.name}
              href={demo.url}
              target="_blank"
              variant="contained"
              sx={{
                bgcolor: '#FFD700',
                color: '#334D6E',
                borderRadius: '50px',
                fontSize: { xs: 10, sm: 12 },
                mb: 1,
                textTransform: 'none',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: '#FFCC00',
                  boxShadow: 2
                }
              }}
              startIcon={demo.icon}
            >
              {demo.name}
            </Button>
          ))}
        </Box>
      )}
    </>
  );
}
