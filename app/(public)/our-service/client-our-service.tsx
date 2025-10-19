// 'use client';
// import React, { memo, useState } from 'react';
// import eq from 'lodash/eq';
// import MyGrid from '@/app/custom-components/MyGrid';
// import MyBox from '@/app/custom-components/MyBox';
// import MyCard from '@/app/custom-components/MyCard';
// import MyCardContent from '@/app/custom-components/MyCardContent';
// import { CardHeader } from '@mui/material';
// import './services.css';
// import Footer from '@/app/custom-components/my-footer/MyFooter';

// const ClientOurService = () => {
//   return (
//     <div style={{ width: '100%', paddingTop: '0px' }}>
//       <MyBox>
//         <MyCard>
//           <MyCardContent>
//             <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}></MyBox>
//             <MyBox sx={{ marginTop: '10px', position: 'relative', zIndex: 2, width: '80%', marginLeft: '10%' }}>
//               <MyGrid container spacing={2} alignItems="stretch">
//                 <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
//                   <MyCard
//                     elevation={3}
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       transition: 'transform 0.3s ease',
//                       boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                     onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   >
//                     <CardHeader
//                       title={
//                         <>
//                           <img
//                             src="/web.png" // replace with your icon path
//                             alt="Mobile App"
//                             style={{
//                               width: '64px',
//                               display: 'flex',
//                               height: '64px',
//                               borderRadius: '50%',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         </>
//                       }
//                     />
//                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Web Development</span>
//                     <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
//                       We craft fast, responsive, and scalable websites tailored to your business goals. Our team specializes in modern tech
//                       like React, Next.js, Node.js, and more to ensure a seamless user experience and strong backend performance.
//                     </div>
//                   </MyCard>
//                 </MyGrid>
//                 <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
//                   <MyCard
//                     elevation={3}
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       transition: 'transform 0.3s ease',
//                       boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                     onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   >
//                     <CardHeader
//                       title={
//                         <>
//                           <img
//                             src="/mobile2.png" // replace with your icon path
//                             alt="Mobile App"
//                             style={{
//                               width: '64px',
//                               display: 'flex',
//                               height: '64px',
//                               borderRadius: '50%',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         </>
//                       }
//                     />
//                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Mobile App Development</span>
//                     <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
//                       We build high-performance mobile apps for iOS and Android using cutting-edge technologies. Whether its a startup idea
//                       or an enterprise solution, we deliver smooth, scalable, and user-friendly mobile experiences.
//                     </div>
//                   </MyCard>
//                 </MyGrid>
//                 <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
//                   <MyCard
//                     elevation={3}
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       transition: 'transform 0.3s ease',
//                       boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                     onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   >
//                     <CardHeader
//                       title={
//                         <>
//                           <img
//                             src="/ui.png" // replace with your icon path
//                             alt="Mobile App"
//                             style={{
//                               width: '64px',
//                               display: 'flex',
//                               height: '64px',
//                               borderRadius: '50%',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         </>
//                       }
//                     />
//                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>UI/UX Design</span>
//                     <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
//                       We design beautiful, intuitive interfaces that enhance user engagement and drive results. Our UX process is focused on
//                       understanding your users to deliver seamless digital experiences.
//                     </div>
//                   </MyCard>
//                 </MyGrid>
//                 <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
//                   <MyCard
//                     elevation={3}
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       transition: 'transform 0.3s ease',
//                       boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                     onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   >
//                     <CardHeader
//                       title={
//                         <>
//                           <img
//                             src="/seo3.png" // replace with your icon path
//                             alt="Mobile App"
//                             style={{
//                               width: '64px',
//                               display: 'flex',
//                               height: '64px',
//                               borderRadius: '50%',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         </>
//                       }
//                     />
//                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>SEO Optimization</span>
//                     <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
//                       Boost your website’s visibility and attract more organic traffic with our expert SEO strategies. From keyword research
//                       to on-page and technical SEO, we help you rank higher and convert better.
//                     </div>
//                   </MyCard>
//                 </MyGrid>
//               </MyGrid>
//             </MyBox>
//           </MyCardContent>
//         </MyCard>
//       </MyBox>
//     <Footer />
//     </div>
//   );
// };
// export default memo(ClientOurService, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Don't re-render!
// });

// 'use client';
// import React, { memo } from 'react';
// import eq from 'lodash/eq';
// import { Box, Grid, Typography } from '@mui/material';
// import Footer from '@/app/custom-components/my-footer/MyFooter';
// import {
//   Web,
//   PhoneIphone,
//   DesignServices,
//   Search,
//   Cloud,
//   Storage,
//   Memory,
//   Build,
//   DeveloperMode,
//   Security,
//   Wifi,
//   Insights,
// } from '@mui/icons-material';
// import './services.css'; // make sure your feature-card CSS is here

// const services = [
//   { title: 'Web Development', description: 'Responsive websites with React, Next.js, Node.js.', icon: <Web sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Mobile App Development', description: 'High-performance iOS & Android apps.', icon: <PhoneIphone sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'UI/UX Design', description: 'Intuitive interfaces to boost engagement.', icon: <DesignServices sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'SEO Optimization', description: 'Increase rankings & organic traffic.', icon: <Search sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'AI / ML Services', description: 'Predictive analytics & intelligent automation.', icon: <Memory sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Cloud Services', description: 'AWS, Azure & scalable cloud infrastructure.', icon: <Cloud sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Data Services', description: 'Database design, analytics & pipelines.', icon: <Storage sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'DevOps Practices', description: 'CI/CD, containerization & IaC.', icon: <Build sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Web App Development', description: 'Robust & scalable web applications.', icon: <DeveloperMode sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Cybersecurity & Zero Trust', description: 'Secure applications with zero-trust architecture.', icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'IoT with AI & 5G', description: 'Connected devices with intelligent automation.', icon: <Wifi sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'AI-Powered BI', description: 'Smart dashboards & insights for business decisions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'GreenTech / Sustainable IT', description: 'Eco-friendly and energy-efficient IT solutions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> }
// ];

// const ClientOurService = () => {
//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Box sx={{ width: '100%', py: 3 }}>
//         <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
//           Our Services
//         </Typography>

//         {/* Center container with left-right margins */}
//         <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
//           <Grid container spacing={3} justifyContent="center" alignItems="stretch">
//             {services.map((service, idx) => (
//               <Grid key={idx} item xs={12} sm={6} md={3}>
//                 <div className="feature-card">
//                   <div className="feature-icon">{service.icon}</div>
//                   <h3 className="feature-title">{service.title}</h3>
//                   <p className="feature-desc">{service.description}</p>
//                 </div>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>

//       <Footer />
//     </Box>
//   );
// };

// export default memo(ClientOurService, (prevProps, nextProps) => eq(prevProps, nextProps));

// 'use client';
// import React, { memo } from 'react';
// import eq from 'lodash/eq';
// import { Box, Grid, Card, Typography } from '@mui/material';
// import Footer from '@/app/custom-components/my-footer/MyFooter';
// import {
//   Web,
//   PhoneIphone,
//   DesignServices,
//   Search,
//   Cloud,
//   Storage,
//   Memory,
//   Build,
//   DeveloperMode,
//   Security,
//   Wifi,
//   Insights,
// } from '@mui/icons-material';

// const services = [
//   { title: 'Web Development', description: 'Responsive websites with React, Next.js, Node.js.', icon: <Web sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Mobile App Development', description: 'High-performance iOS & Android apps.', icon: <PhoneIphone sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'UI/UX Design', description: 'Intuitive interfaces to boost engagement.', icon: <DesignServices sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'SEO Optimization', description: 'Increase rankings & organic traffic.', icon: <Search sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'AI / ML Services', description: 'Predictive analytics & intelligent automation.', icon: <Memory sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Cloud Services', description: 'AWS, Azure & scalable cloud infrastructure.', icon: <Cloud sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Data Services', description: 'Database design, analytics & pipelines.', icon: <Storage sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'DevOps Practices', description: 'CI/CD, containerization & IaC.', icon: <Build sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Web App Development', description: 'Robust & scalable web applications.', icon: <DeveloperMode sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'Cybersecurity & Zero Trust', description: 'Secure applications with zero-trust architecture.', icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'IoT with AI & 5G', description: 'Connected devices with intelligent automation.', icon: <Wifi sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'AI-Powered BI', description: 'Smart dashboards & insights for business decisions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> },
//   { title: 'GreenTech / Sustainable IT', description: 'Eco-friendly and energy-efficient IT solutions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> }
// ];

// const ClientOurService = () => {
//   return (
//     <Box
//   sx={{
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//   }}
// >
//   <Box sx={{ width: '100%', py: 3 }}>
//     <Typography
//       variant="h4"
//       align="center"
//       sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}
//     >
//       Our Services
//     </Typography>

//     {/* Centered container with max width */}
//     <Box sx={{ maxWidth: '80%', mx: 'auto',  }}>
//       <Grid container spacing={3} justifyContent="center">
//         {services.map((service, idx) => (
//           <Grid key={idx} item xs={12} sm={6} md={3}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 backgroundColor: '#f5f5f5', //'#e0e0e0',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 px: 2,
//                 py: 3,
//                 borderRadius: 3,
//                 boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-8px)',
//                   boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
//                 },
//               }}
//             >
//               {service.icon}
//               <Typography
//                 variant="h6"
//                 sx={{ mt: 1.5, fontWeight: 'bold', color: '#333' }}
//               >
//                 {service.title}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ mt: 0.5, color: '#555', fontSize: '0.875rem' }}
//               >
//                 {service.description}
//               </Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   </Box>

//   <Footer />
// </Box>

//   );
// };

// export default memo(ClientOurService, (prevProps, nextProps) => eq(prevProps, nextProps));

// 'use client';
// import React, { memo } from 'react';
// import eq from 'lodash/eq';
// import { Box, Grid, Typography } from '@mui/material';
// import Footer from '@/app/custom-components/my-footer/MyFooter';
// import {
//   Web,
//   PhoneIphone,
//   DesignServices,
//   Search,
//   Cloud,
//   Storage,
//   Memory,
//   Build,
//   DeveloperMode,
//   Security,
//   Wifi,
//   Insights,
// } from '@mui/icons-material';
// import './services.css'; // make sure your feature-card CSS is here
// import MyCard from '@/app/custom-components/MyCard';

// const services = [
// { title: 'Web Development',  icon: <Web sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'Mobile App Development', icon: <PhoneIphone sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'UI/UX Design',  icon: <DesignServices sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'SEO Optimization', icon: <Search sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'AI / ML Services',  icon: <Memory sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'Cloud Services', icon: <Cloud sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'Data Services',  icon: <Storage sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'DevOps Practices',  icon: <Build sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'Web App Development',  icon: <DeveloperMode sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'Cybersecurity & Zero Trust',  icon: <Security sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'IoT with AI & 5G',  icon: <Wifi sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'AI-Powered BI',  icon: <Insights sx={{ fontSize: 100, color: '#757575' }} /> },
// { title: 'GreenTech / Sustainable IT',  icon: <Insights sx={{ fontSize: 100, color: '#757575' }} /> }
// ];

// const ClientOurService = () => {
//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'  }}>
//       <Box sx={{ width: '100%', py: 4, }}>
//         <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
//           Our Services
//         </Typography>

//         {/* Center container with left-right margins */}
//         <MyCard sx={{ backgroundColor:'rgb(238, 242, 246)' }}>
//         <Box >
//           <Grid container spacing={3} justifyContent="center" alignItems="stretch">
//             {services.map((service, idx) => (
//               <Grid key={idx} item xs={12} sm={6} md={3}>
//                 <div className="feature-card">
//                   <div className="feature-icon">{service.icon}</div>
//                   <h3 className="feature-title">{service.title}</h3>
//                   {/* <p className="feature-desc">{service.description}</p> */}
//                 </div>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//         </MyCard>
//       </Box>

//       <Footer />
//     </Box>
//   );
// };

// export default memo(ClientOurService, (prevProps, nextProps) => eq(prevProps, nextProps));

'use client';
import React, { memo, useCallback, useEffect, useState } from 'react';
import eq from 'lodash/eq';
import { Grid, IconButton, Typography } from '@mui/material';
import Footer from '@/app/custom-components/my-footer/MyFooter';
import {
  Web,
  PhoneIphone,
  DesignServices,
  Search,
  Cloud,
  Storage,
  Memory,
  Build,
  DeveloperMode,
  Security,
  Wifi,
  Insights,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';
import './services.css'; // Ensure your feature-card CSS is here
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyGrid from '@/app/custom-components/MyGrid';
import { useSelector } from '../../store';
import { usePathname } from 'next/navigation';

const services = [
  { title: 'Web Development', icon: <Web sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'Mobile App Development', icon: <PhoneIphone sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'UI/UX Design', icon: <DesignServices sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'SEO Optimization', icon: <Search sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'AI / ML Services', icon: <Memory sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'Cloud Services', icon: <Cloud sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'Data Services', icon: <Storage sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'DevOps Practices', icon: <Build sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'Web App Development', icon: <DeveloperMode sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'Cybersecurity & Zero Trust', icon: <Security sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'IoT with AI & 5G', icon: <Wifi sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> },
  { title: 'AI-Powered BI', icon: <Insights sx={{ fontSize: 100, color: '#757575', '&:hover': { color: '#f56b2a' } }} /> }
];

const services1 = [
  { title: 'Full Stack Engineer', image: '/home-page/ser4.jpg' },
  { title: 'Technology Analyst', image: '/home-page/ser5.png' },
  { title: 'Technical Architect', image: '/home-page/tec-art.png' },
  { title: 'Cloud Expert', image: '/home-page/cloud.webp' },
  { title: 'DevOps Engineer', image: '/home-page/devops.jpg' },
  { title: 'AI Engineer', image: '/home-page/ai2.jpg' },
];

const ClientOurService = () => {
  const { companyInfo } = useSelector((state: { globalState: any }) => state.globalState);
    const bannerImages = ['/home-page/ser.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  }, [bannerImages.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, [bannerImages.length]);

  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    const timeout = setTimeout(scrollToHash, 100); // Give time for content to render

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (

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

       <div className="services-section">
      <Typography 
        variant="h4" 
        className="services-heading"
      >
        Out Source Best <span className="highlight-word">Talents</span>
      </Typography>
      <p style={{ fontSize: '20px' }}>We are your partner for building amazing distributed teams, providing end-to-end solutions to achieve every goal, and helping you drive your digital transformation.</p>
      <div className="services-container">
        {services1.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-icon" />
            <h3 className="service-title">{service.title}</h3>
          </div>
        ))}
        
      </div>
      {/* <p style={{ fontSize: '20px', textAlign:'center' }}>And Other Talent</p> */}
    </div>
        
    <MyCard sx={{
      mt: 3,
      height: 'auto',
      maxWidth: '1520px',
      backgroundColor: 'rgb(238, 242, 246)',
      margin: 'auto',
      padding: '20px'
    }}>
      <Typography variant="h4" marginLeft={10} sx={{ mb: 2, fontFamily: 'sans-serif' }}>
        Our <span style={{ color: '#f56b2a', fontSize: '50px', fontFamily: 'Brush Script MT, Dancing Script' }}>Expertise</span>
      </Typography>
      <Grid container spacing={1} justifyContent="center" alignItems="stretch">
        {services.map((service, idx) => (
          <Grid
            key={idx}
            item
            xs={6}   // Full-width on mobile
            sm={6}    // 2 items per row on tablets
            md={3}    // 4 items per row on desktops
            lg={2}    // 6 items per row on larger screens
            mb={3}
          >
            <div className="feature-icon" style={{ textAlign: 'center', padding: '10px' }}>
              {service.icon}
            </div>
            <Typography align="center" sx={{ color: '#333', padding: '10px' }}>
              {service.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </MyCard>

            <div style={{ marginTop: '10px' }} id="section4">
        {/* Header Typography */}
        <Typography variant="h4" marginLeft={20} sx={{ mb: 1, fontFamily: 'sans-serif' }}>
          Our <span style={{ color: '#f56b2a', fontSize: '60px', fontFamily: 'Brush Script MT, Dancing Script' }}>service</span>
        </Typography>
        <div className="card-container">
          <div className="card">
            <img src="/home-page/ai-auto.jpg" alt="ML/DL Icon" className="card-image" />
            <h3 className="card-title">AI & Automation</h3>
            <p className="card-description">Transform your business with intelligent solutions powered by Artificial Intelligence and Machine Learning.
            We design custom models for automation, decision support, and predictive insights — enabling smarter operations and faster innovation.
            Our expertise spans NLP, computer vision, generative AI, and workflow automation, all built for scalability and security.</p>
          </div>

          <div className="card">
            <img src="/home-page/cloud-dev.png" alt="NLP Icon" className="card-image" />
            <h3 className="card-title">Cloud & DevOps</h3>
            <p className="card-description">Empower your infrastructure with cloud-native architecture and DevOps automation.
            We specialize in AWS, Azure, and GCP to help you migrate, optimize, and maintain high-performance cloud environments.
            With CI/CD pipelines, containerization (Docker, Kubernetes), and monitoring frameworks, we ensure seamless delivery, resilience, and agility.</p>
          </div>
           <div className="card">
            <img src="/home-page/mobile.png" alt="Hyperparameter Tuning Icon" className="card-image" />
            <h3 className="card-title">Mobile App Development</h3>
            <p className="card-description">Create engaging digital experiences that connect your customers anytime, anywhere.
            We build cross-platform and native mobile apps using React Native, Flutter, and Kotlin, ensuring intuitive interfaces, speed, and reliability.
            From concept to deployment, every app we build reflects innovation, usability, and business alignment.</p>
          </div>
          <div className="card">
            <img src="/home-page/data-ans.png" alt="Online Learning Icon" className="card-image" />
            <h3 className="card-title">Data Analytics</h3>
            <p className="card-description">Turn data into a competitive advantage.
             We help organizations collect, clean, visualize, and interpret data for informed decisions and measurable growth.
             Our analytics stack integrates with AI and cloud systems to deliver real-time insights through dashboards, KPIs, and predictive models.</p>
          </div>
          <div className="card">
            <img src="/home-page/on-team.webp" alt="Hyperparameter Tuning Icon" className="card-image" />
            <h3 className="card-title">On-Demand Tech Team</h3>
            <p className="card-description">Accelerate your projects with the right technical talent.
            Through our Build Resource Model, we provide flexible, on-demand resource teams across technologies and domains.
            You define the requirement — we assemble the right mix of developers, cloud engineers, and AI experts to deliver results faster and smarter.</p>
          </div>
          <div className="card">
            <img src="/home-page/hiring.png" alt="Online Learning Icon" className="card-image" />
            <h3 className="card-title">Top-Tier Engineering Talent Hiring</h3>
            <p className="card-description">Gain access to a dedicated network of elite developers and engineers.
             Our talent pool combines technical depth with professional discipline — ensuring clean code, innovation, and on-time delivery.
             Whether you need dedicated resources or project-based hiring, we help you build reliable, high-performing tech teams.</p>
          </div>
            <div className="card">
            <img src="/home-page/out-dev.webp" alt="Online Learning Icon" className="card-image" />
            <h3 className="card-title">Smart Outsourcing Solutions</h3>
            <p className="card-description">Focus on growth while we handle your development needs.
            We provide remote and offshore development teams skilled in full-stack, cloud, and AI technologies — enabling cost efficiency without compromising quality.
              Our flexible engagement models ensure smooth collaboration, transparency, and results.</p>
          </div>
        </div>
      </div>
      <MyGrid container spacing={1} alignItems="stretch" className="card-container" id="section3">
        <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/home-page/ser1.png" alt="Image description" style={{ marginLeft: '20px',width: '100%', height: 'auto' }} />
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
          <MyCardContent>
            <p
              style={{
                fontSize: '25px', // Adjust font size to match image style
                fontFamily: 'Sans-serif',
                lineHeight: '1'
              }}
            >
              Hire the Top Programmer at an
              <span style={{ color: '#f56b2a', fontFamily: 'Brush Script MT, Dancing Script', fontSize: '50px' }}>
                {' '}
                Unbeatable Price
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
              In today’s competitive digital world, hiring the right programmer can make or break your project. At{' '}
              {companyInfo.company_name}, we help you hire top-tier developers who combine expertise, innovation, and efficiency—without
              breaking your budget. Our programmers are handpicked for their technical excellence, problem-solving skills, and proven track
              record in delivering high-quality solutions on time. Whether you need a web developer, mobile app expert, or full-stack
              engineer, we connect you with the best talent at an unbeatable price, ensuring you get maximum value, faster delivery, and
              long-term success—all while keeping costs optimized.
            </p>
          </MyCardContent>
        </MyGrid>
      </MyGrid>

      <div style={{ marginTop: '10px' }}>
        {/* Header Typography */}
        <Typography variant="h4" marginLeft={20} sx={{ mb: 1, fontFamily: 'sans-serif' }} id="section2">
          Next-Gen AI <span style={{ color: '#f56b2a', fontSize: '60px', fontFamily: 'Brush Script MT, Dancing Script' }}>Solution</span>
        </Typography>
        <div className="card-container">
          <div className="card">
            <img src="/home-page/machine.jpg" alt="ML/DL Icon" className="card-image" />
            <h3 className="card-title">ML & DL Engineering</h3>
            <p className="card-description">We design and deploy intelligent systems using advanced Machine Learning and Deep Learning techniques.
                  From predictive analytics to computer vision, we transform raw data into actionable insights and automation.</p>
          </div>
          <div className="card">
            <img src="/home-page/npl.webp" alt="NLP Icon" className="card-image" />
            <h3 className="card-title">NLP Intelligence</h3>
            <p className="card-description">Empower your apps with Natural Language Processing that understands, interprets, and generates human language.
              Perfect for chatbots, voice assistants, document analysis, and content automation.</p>
          </div>

          <div className="card">
            <img src="/home-page/modal1.webp" alt="Hyperparameter Tuning Icon" className="card-image" />
            <h3 className="card-title">Model Optimization</h3>
            <p className="card-description">Enhance your AI performance with Hyperparameter Tuning and AutoML.
            We optimize training workflows for better accuracy, faster learning, and scalable results.</p>
          </div>
          <div className="card">
            <img src="/home-page/adaptive.webp" alt="Online Learning Icon" className="card-image" />
            <h3 className="card-title">Adaptive Learning</h3>
            <p className="card-description">Keep your models continuously updated through Online and Incremental Learning.
             Your AI evolves with new data—staying accurate, adaptive, and future-ready.</p>
          </div>
          <div className="card">
            <img src="/home-page/transfer.webp" alt="Hyperparameter Tuning Icon" className="card-image" />
            <h3 className="card-title">Transfer Learning</h3>
            <p className="card-description">Accelerate AI development by leveraging pre-trained models fine-tuned for your domain.
              Reduce time, cost, and data requirements while achieving enterprise-grade performance.</p>
          </div>
          <div className="card">
            <img src="/home-page/ger-ai.webp" alt="Online Learning Icon" className="card-image" />
            <h3 className="card-title">Generative AI</h3>
            <p className="card-description">Create intelligent, original content using the power of Generative AI.
              We build text, image, and code generation systems tailored to your business needs.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(ClientOurService, (prevProps, nextProps) => eq(prevProps, nextProps));
