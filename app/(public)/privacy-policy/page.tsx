"use client"; 
import MyBox from '@/app/custom-components/MyBox';
import MyTypography from '@/app/custom-components/MyTypography';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <MyBox
      sx={{
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        marginLeft: '25%'
      }}
    >
      <MyTypography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        Privacy Policy
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        1. Introduction
      </MyTypography>
      <MyTypography variant="body1">
        We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        2. Information We Collect
      </MyTypography>
      <MyTypography variant="body1">
        <strong>Personal Information:</strong> Name, email, phone number, payment details, and academic qualifications.
      </MyTypography>
      <MyTypography variant="body1">
        <strong>Technical Data:</strong> IP address, browser type, and usage data collected via cookies.
      </MyTypography>
      <MyTypography variant="body1">
        <strong>Payment Data:</strong> We use third-party payment gateways, and we do not store card details.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        3. How We Use Your Information
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>To provide and improve our courses and internship programs.</li>
        <li>To process payments and manage user accounts.</li>
        <li>To communicate updates, offers, and important notices on technologies courses.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        4. Data Security
      </MyTypography>
      <MyTypography variant="body1">
        We implement strong security measures to protect user data. However, we cannot guarantee absolute security due to evolving cyber threats.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        5. Data Sharing & Third Parties
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>We do not sell or rent user data.</li>
        <li>Third-party services (e.g., payment gateways, analytics tools) may have access to limited user data.</li>
        <li>Legal compliance may require us to share data with government authorities.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        6. Cookies & Tracking
      </MyTypography>
      <MyTypography variant="body1">
        We use cookies to enhance the user experience. Users can manage cookie settings through their browser.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        7. User Rights
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>Users can access, update, or delete their data upon request.</li>
        <li>Users can opt out of promotional emails.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        8. Changes to This Policy
      </MyTypography>
      <MyTypography variant="body1">
        We reserve the right to modify this Privacy Policy. Changes will be posted on our website.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        9. Contact Us
      </MyTypography>
      <MyTypography variant="body1" sx={{ mb: 4 }}>
        For any privacy concerns, contact us at <strong>info@adhyayan.online</strong>.
      </MyTypography>

     <MyTypography
        className="already-msg2"
        component="div"
        sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', size: '12px', mt: 4 }} >
        <a
          onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
       ← Go Back
        </a>
      </MyTypography>
    </MyBox>
  );
};

export default PrivacyPolicy;
