'use client';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // better icon for "coming soon"

const ComingSoonPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 12 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <HourglassEmptyIcon color="primary" sx={{ fontSize: 100 }} />
        
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ color: 'primary.main', fontSize: '2rem' }}
        >
          Coming Soon
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ fontSize: '1.1rem', mt: 1, color: 'text.secondary' }}
        >
          We&apos;re working hard to launch our new website. <br />
          Stay tuned for something amazing!
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ mt: 2, fontStyle: 'italic', color: 'text.disabled' }}
        >
          We appreciate your interest and support.
        </Typography>
      </Box>
    </Container>
  );
};

export default ComingSoonPage;
