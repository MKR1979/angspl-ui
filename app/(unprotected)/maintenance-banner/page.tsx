'use client';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build'; // wrench/maintenance icon

const MaintenanceBannerPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 12 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <BuildIcon color="warning" sx={{ fontSize: 100 }} />
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ color: 'primary.main', fontSize: '2rem' }}
        >
          We’re Under Maintenance
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ fontSize: '1.1rem', mt: 1, color: 'text.secondary' }}
        >
          Our website is currently undergoing scheduled maintenance. <br />
          We’ll be back online very soon!
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ mt: 2, fontStyle: 'italic', color: 'text.disabled' }}
        >
          Thank you for your patience.
        </Typography>
      </Box>
    </Container>
  );
};
export default MaintenanceBannerPage;


// 'use client';
// import React from 'react';
// import { Typography, Container, Paper } from '@mui/material';
// import ConstructionIcon from '@mui/icons-material/Construction';

// const MaintenanceBannerPage: React.FC = () => {
//   return (
//     <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 12 }}>
//       <Paper
//         elevation={6}
//         sx={{
//           p: 5,
//           borderRadius: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 3,
//           background: 'linear-gradient(135deg, #f9f9f9, #ffffff)',
//         }}
//       >
//         <ConstructionIcon sx={{ fontSize: 80, color: '#f57c00' }} />
        
//         <Typography variant="h4" fontWeight="bold" sx={{ color: '#333' }}>
//           We’ll Be Back Soon!
//         </Typography>

//         <Typography variant="body1" sx={{ fontSize: '1rem', color: '#666' }}>
//           Our website is currently undergoing scheduled maintenance.  
//           We’re working hard to improve your experience and will be back online shortly.
//         </Typography>

//         <Typography variant="body2" sx={{ mt: 2, color: '#999' }}>
//           Thank you for your patience and understanding.
//         </Typography>
//       </Paper>
//     </Container>
//   );
// };

// export default MaintenanceBannerPage;
