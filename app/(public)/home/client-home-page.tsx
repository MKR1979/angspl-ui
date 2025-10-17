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
import MyTypography from '@/app/custom-components/MyTypography';

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
    '/home-page/home2.jpg',
    '/home-page/home3.jpg',
    '/home-page/home7.jpg',
    '/home-page/home5.jpg',
    '/home-page/home6.jpg'
  ];
  const buttonColors = ['#3c77efff', '#098d8aff', '#FF7F32', '#FFD700', '#ed5d70ff'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonColor, setButtonColor] = useState(buttonColors[currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    // Update button color whenever the image changes
    setButtonColor(buttonColors[currentIndex]);

    return () => clearInterval(interval);
  }, [currentIndex, bannerImages.length, buttonColors]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  }, [bannerImages.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, [bannerImages.length]);

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

        {/* <MyBox
          sx={{
            backgroundImage: 'url(/home-page/home1.jpg)',
            display: 'block',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            position: 'relative',
            height: { xs: 140, sm: 200, md: 500 },
          }}
        ></MyBox> */}
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
              height: { xs: 140, sm: 200, md: 500 }
            }}
          >
            {/* Button inside the image */}
            <a
              href="#start"
              style={{
                position: 'absolute',
                bottom: '39px',
                left: '118px',
                padding: '8px 52px', // Increased padding for larger button
                backgroundColor: 'white',
                color: buttonColor,
                textDecoration: 'none',
                fontSize: '22px', // Larger font size
                // fontWeight: 'bold',
                borderRadius: '8px', // Slightly bigger border radius for a more rounded button
                border: `2px solid ${buttonColor}`,
                transition: 'all 0.3s ease',
                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)', // Stronger shadow for larger button
                cursor: 'pointer'
              }}
              // Hover effect (you can use external CSS for this)
              onMouseOver={(e) => {
                e.target.style.backgroundColor = buttonColor;
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = buttonColor;
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0px 6px 18px rgba(0, 0, 0, 0.15)';
              }}
            >
              Start Now
            </a>

            {/* Slider Controls (Previous & Next Buttons) */}
            {bannerImages.length > 1 && (
              <>
                <IconButton
                  className="banner-arrow left"
                  onClick={goToPrev}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white'
                  }}
                >
                  <ArrowBackIos />
                </IconButton>
                <IconButton
                  className="banner-arrow right"
                  onClick={goToNext}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white'
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            )}
          </MyBox>
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
              <MyCardContent >
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
                {/* <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      avatar={<MyApiIcon></MyApiIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Welcome to {companyInfo.company_name}</span>}
                      sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      At {companyInfo.company_name}, we are committed to driving digital transformation by delivering innovative, scalable,
                      and industry-focused technology solutions. Our expertise spans ERP, CRM, AI-powered automation, e-learning, billing
                      systems, cloud solutions, and cybersecurity—helping businesses optimize operations, enhance customer engagement, and
                      accelerate growth.
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid container spacing={2} alignItems="stretch">
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Streamlined Business Operations</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Automate workflows with ERP solutions tailored for enterprises, colleges, and universities.</li>
                          <li>Simplify stock & inventory management with real-time tracking.</li>
                          <li>Enhance billing & payment processing with secure, automated invoicing.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={
                          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Customer Engagement And Sales Performance</span>
                        }
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Intelligent CRM solutions for tracking leads, customer interactions, and sales pipelines.</li>
                          <li>Data-driven insights for upselling and cross-selling opportunities.</li>
                          <li>Automated follow-ups and appointment scheduling, freeing up sales teams for high-value tasks.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={
                          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Revolutionizing Education with Digital Solutions</span>
                        }
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>AI-powered admission systems that cut manual work by 80% and boost enrollments.</li>
                          <li>E-learning platforms for seamless digital education.</li>
                          <li>College & university ERP for efficient administration and student management.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}> Data-Driven Decision Making And Analytics</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Gain real-time insights into customer behavior, market trends, and business performance.</li>
                          <li>AI-powered analytics & predictive modeling for proactive decision-making.</li>
                          <li>Secure and centralized data storage, ensuring seamless collaboration across departments.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Cybersecurity And Compliance</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Protect critical business data with cutting-edge security solutions.</li>
                          <li>Ensure regulatory compliance with secure document management.</li>
                          <li>Prevent fraud and cyber threats with advanced risk monitoring tools.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Scalable And Future-Ready Solutions</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Cloud-based architecture that grows with your business.</li>
                          <li>Integration with ERP, CRM, marketing, and helpdesk platforms for a seamless experience.</li>
                          <li>AI-driven automation for smarter business processes and customer interactions.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Scalability for Business Growth</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li>Adapts to growing customer bases and evolving business needs.</li>
                          <li>Integrates with other tools like ERP systems, marketing platforms, or helpdesk software.</li>
                          <li>Supports advanced features like AI-driven nalytics and predictive modeling as the business expands.</li>
                        </ul>
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <MyCard
                      elevation={0}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <CardHeader
                        avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                        title={
                          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Innovative Solutions for a Digital-First Future</span>
                        }
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        At {companyInfo.company_name}, we donot just build software—we create impact. Whether you are a startup, a large
                        enterprise, or an educational institution, we provide customized, high-performance solutions designed to help you
                        stay ahead in the digital era.
                      </MyCardContent>
                    </MyCard>
                  </MyGrid>
                </MyGrid> */}


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
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',
      },
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
        py: 1,
      }}
    />
    <MyCardContent sx={{ fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
      At {companyInfo.company_name}, we are committed to driving digital transformation by delivering innovative,
      scalable, and industry-focused technology solutions. Our expertise spans ERP, CRM, AI-powered automation,
      e-learning, billing systems, cloud solutions, and cybersecurity—helping businesses optimize operations,
      enhance customer engagement, and accelerate growth.
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
        'Enhance billing & payment processing with secure, automated invoicing.',
      ],
    },
    {
      title: 'Enhanced Customer Engagement and Sales Performance',
      points: [
        'Intelligent CRM solutions for tracking leads, customer interactions, and sales pipelines.',
        'Data-driven insights for upselling and cross-selling opportunities.',
        'Automated follow-ups and appointment scheduling, freeing up sales teams for high-value tasks.',
      ],
    },
    {
      title: 'Revolutionizing Education with Digital Solutions',
      points: [
        'AI-powered admission systems that cut manual work by 80% and boost enrollments.',
        'E-learning platforms for seamless digital education.',
        'College & university ERP for efficient administration and student management.',
      ],
    },
    {
      title: 'Data-Driven Decision Making and Analytics',
      points: [
        'Gain real-time insights into customer behavior, market trends, and business performance.',
        'AI-powered analytics & predictive modeling for proactive decision-making.',
        'Secure and centralized data storage for seamless collaboration.',
      ],
    },
    {
      title: 'Cybersecurity and Compliance',
      points: [
        'Protect critical business data with cutting-edge security solutions.',
        'Ensure regulatory compliance with secure document management.',
        'Prevent fraud and cyber threats with advanced risk monitoring tools.',
      ],
    },
    {
      title: 'Scalable and Future-Ready Solutions',
      points: [
        'Cloud-based architecture that grows with your business.',
        'Integration with ERP, CRM, and helpdesk platforms.',
        'AI-driven automation for smarter business processes.',
      ],
    },
    {
      title: 'Scalability for Business Growth',
      points: [
        'Adapts to growing customer bases and evolving business needs.',
        'Integrates with marketing and helpdesk tools.',
        'Supports AI-driven analytics and predictive modeling.',
      ],
    },
    {
      title: 'Innovative Solutions for a Digital-First Future',
      description: `At ${companyInfo.company_name}, we don’t just build software—we create impact. 
      Whether you are a startup, large enterprise, or educational institution, 
      we deliver high-performance solutions designed to keep you ahead in the digital era.`,
    },
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
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <CardHeader
          avatar={<MyCheckCircleIcon sx={{ color: '#00bcd4' }} />}
          title={
            <Typography sx={{ fontSize: '17px', fontWeight: 600, color: '#1a237e' }}>
              {card.title}
            </Typography>
          }
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
            <Typography sx={{ fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
              {card.description}
            </Typography>
          )}
        </MyCardContent>
      </MyCard>
    </MyGrid>
  ))}
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
