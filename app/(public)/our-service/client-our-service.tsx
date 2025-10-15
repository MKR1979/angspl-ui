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

'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import { Box, Grid, Typography } from '@mui/material';
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
} from '@mui/icons-material';
import './services.css'; // make sure your feature-card CSS is here

const services = [
  { title: 'Web Development', description: 'Responsive websites with React, Next.js, Node.js.', icon: <Web sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'Mobile App Development', description: 'High-performance iOS & Android apps.', icon: <PhoneIphone sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'UI/UX Design', description: 'Intuitive interfaces to boost engagement.', icon: <DesignServices sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'SEO Optimization', description: 'Increase rankings & organic traffic.', icon: <Search sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'AI / ML Services', description: 'Predictive analytics & intelligent automation.', icon: <Memory sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'Cloud Services', description: 'AWS, Azure & scalable cloud infrastructure.', icon: <Cloud sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'Data Services', description: 'Database design, analytics & pipelines.', icon: <Storage sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'DevOps Practices', description: 'CI/CD, containerization & IaC.', icon: <Build sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'Web App Development', description: 'Robust & scalable web applications.', icon: <DeveloperMode sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'Cybersecurity & Zero Trust', description: 'Secure applications with zero-trust architecture.', icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'IoT with AI & 5G', description: 'Connected devices with intelligent automation.', icon: <Wifi sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'AI-Powered BI', description: 'Smart dashboards & insights for business decisions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> },
  { title: 'GreenTech / Sustainable IT', description: 'Eco-friendly and energy-efficient IT solutions.', icon: <Insights sx={{ fontSize: 40, color: '#1976d2' }} /> }
];

const ClientOurService = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', py: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
          Our Services
        </Typography>

        {/* Center container with left-right margins */}
        <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {services.map((service, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={3}>
                <div className="feature-card">
                  <div className="feature-icon">{service.icon}</div>
                  <h3 className="feature-title">{service.title}</h3>
                  <p className="feature-desc">{service.description}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default memo(ClientOurService, (prevProps, nextProps) => eq(prevProps, nextProps));


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

