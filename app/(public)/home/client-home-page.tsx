'use client';
import styles from './homePage.module.css';
import MyBox from '../../custom-components/MyBox';
import MyCard from '../../custom-components/MyCard';
import MyCardContent from '../../custom-components/MyCardContent';
import MyGrid from '../../custom-components/MyGrid';
import { useSelector } from '../../store';
import { CardHeader } from '@mui/material';
import MyApiIcon from '@/app/custom-components/MyApiIcon';
import MyCheckCircleIcon from '@/app/custom-components/MyCheckCircleIcon';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import { Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import { useState, useRef, useEffect } from "react";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

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
      console.error("Failed to parse business_config:", err);
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
      name: "School Demo",
      url: "https://adhyayan.school",
      icon: <SchoolIcon fontSize="small" />,
    },
    {
      name: "College Demo",
      url: "https://adhyayan.college",
      icon: <AccountBalanceIcon fontSize="small" />,
    },
    {
      name: "Institute Demo",
      url: "https://adhyayan.online",
      icon: <BusinessIcon fontSize="small" />,
    },
  ];

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
            whiteSpace: 'nowrap',
          }}
        >
          <h2 className="rolling-header">{companyInfo.company_name}</h2>
        </div>

        <MyBox
          sx={{
            backgroundImage: 'url(/home-page/homePage.webp)',
            display: 'block',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            position: 'relative',
            height: { xs: 140, sm: 200, md: 270 },
          }}
        ></MyBox>
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
                <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      avatar={<MyApiIcon></MyApiIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Welcome to {companyInfo.company_name}</span>}
                      sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      At {companyInfo.company_name}, we are committed to driving digital transformation by delivering
                      innovative, scalable, and industry-focused technology solutions. Our expertise spans ERP, CRM,
                      AI-powered automation, e-learning, billing systems, cloud solutions, and cybersecurity—helping businesses
                      optimize operations, enhance customer engagement, and accelerate growth.
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
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Customer Engagement And Sales Performance</span>}
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
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Revolutionizing Education with Digital Solutions</span>}
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
                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Innovative Solutions for a Digital-First Future</span>}
                        sx={{ height: '40px', backgroundColor: 'rgb(238, 242, 246)' }}
                      />
                      <MyCardContent>
                        At {companyInfo.company_name}, we donot just build software—we create impact. Whether you are a startup, a large enterprise, or an educational institution, we provide customized, high-performance solutions designed to help you stay ahead in the digital era.
                      </MyCardContent>
                    </MyCard>
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
            position: "fixed",
            bottom: { xs: 165, sm: 90 },
            right: { xs: 15, sm: 20 },
            borderRadius: "50px",
            bgcolor: "#FFD700",
            color: "#334D6E",
            boxShadow: 3,
            px: { xs: 1, sm: 1.5 },
            py: { xs: 1, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1 },
            fontSize: { xs: 10, sm: 12 },
            zIndex: 2000,
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
            position: "fixed",
            bottom: { xs: 20, sm: 30 },
            right: { xs: 15, sm: 25 },
            bgcolor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: { xs: 160, sm: 190 },
            zIndex: 2100,
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#334D6E",
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
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
                bgcolor: "#FFD700",
                color: "#334D6E",
                borderRadius: "50px",
                fontSize: { xs: 10, sm: 12 },
                mb: 1,
                textTransform: "none",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "#FFCC00",
                  boxShadow: 2,
                },
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
