// pages/system-renew.tsx or app/system-renew/page.tsx
'use client';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ErrorPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 90 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: 'red', fontSize: '1.6rem' }}>
          Please contact your administrator
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          Access will be restored after the service is renewed. Please try again later.    
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
