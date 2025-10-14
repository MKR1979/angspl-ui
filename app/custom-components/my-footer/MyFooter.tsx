'use client'; 

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSelector } from '@/app/store';
import styles from './myFooter.module.css'; // Import the CSS module

const Footer: React.FC = () => {
  const { companyInfo } = useSelector((state) => state.globalState);

  return (
    <Box className={styles.footer}>
      <Box className={styles['footer-container']}>
        {/* Left */}
        <Box className={styles['footer-left']}>
          <Typography variant="body2">
            © 2025 {companyInfo.company_name}. All rights reserved.
          </Typography>
        </Box>

        {/* Center */}
        <Box className={styles['footer-center']}>
          <Link href="/terms" underline="hover" className={styles['footer-link']}>
            Terms of Use
          </Link>
          <span className={styles.divider}>|</span>
          <Link href="/privacy-policy" underline="hover" className={styles['footer-link']}>
            Privacy Policy
          </Link>
        </Box>

        {/* Right */}
        <Box className={styles['footer-right']}>
          <Link href="https://www.facebook.com" target="_blank" rel="noopener">
            <FacebookIcon sx={{ fontSize: 34, color: '#1877F2' }} />
          </Link>
          <Link href="https://www.twitter.com" target="_blank" rel="noopener">
            <TwitterIcon sx={{ fontSize: 34, color: '#1DA1F2' }} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener">
            <InstagramIcon sx={{ fontSize: 34, color: '#E1306C' }} />
          </Link>
          <Link href="https://www.youtube.com/@adhyayan.online" target="_blank" rel="noopener">
            <YouTubeIcon sx={{ fontSize: 34, color: '#FF0000' }} />
          </Link>
          <Link href="https://www.linkedin.com/in/adhyayan-solution-6b2012379/" target="_blank" rel="noopener">
            <LinkedInIcon sx={{ fontSize: 34, color: '#0A66C2' }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
