'use client';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import MyTypography from '@/app/custom-components/MyTypography';

const ErrorPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 90 }} />
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'red', fontSize: '2.5rem' }}>
          Something went wrong!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Please try again later, or{' '}
          <Link href="https://www.adhyayan.online/contact-us" target="_blank" rel="noopener noreferrer" underline="hover">
            get in touch
          </Link>{' '}
          with us. 😕
        </Typography>
        <MyTypography
          className="already-msg2"
          component="div"
          sx={{ display: 'flex', position: 'relative', top: '-40px', justifyContent: 'center', width: '100%', size: '12px', mt: 4 }} >
          <a
            onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
            ← Go Back
          </a>
        </MyTypography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
