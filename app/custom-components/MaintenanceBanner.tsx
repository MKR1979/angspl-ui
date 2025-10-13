import { Box, Typography } from '@mui/material';

const MaintenanceBanner: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff3cd', 
        color: '#b71c1c', 
        py: 1,
        borderBottom: '1px solid #ffeeba',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '30px', 
      }}
    >
      <Typography
        component="div"
        sx={{
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        🚧 Scheduled Maintenance: The site will be unavailable on <b>5th Sept 2025</b> at <b>2:00 AM – 4:00 AM IST</b>. Please plan your
        work accordingly.
      </Typography>
    </Box>
  );
};

export default MaintenanceBanner;