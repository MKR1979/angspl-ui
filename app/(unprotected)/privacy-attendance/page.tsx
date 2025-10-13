import MyTypography from '@/app/custom-components/MyTypography';
import { Metadata } from 'next';
import MyBox from '@/app/custom-components/MyBox';

export const metadata: Metadata = {
  title: 'Privacy Policy'
};

export const revalidate = 0;

export default async function PrivacyPage() {
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
        This Privacy Policy outlines how we collect, use, and protect data in the Attendance and Admin Dashboard modules. Our goal is to protect user privacy while maintaining operational efficiency and compliance.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        2. Information We Collect
      </MyTypography>
      <MyTypography variant="body1">
        We are committed to collecting only the data necessary for attendance tracking and system administration:
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>
          <strong>Employee Data:</strong> Includes name, user ID, attendance timestamps, general location (if enabled), device info, and any voluntary remarks.
        </li>
        <li>
          <strong>Admin Data:</strong> Includes name, login activity, and actions performed within the admin dashboard.
        </li>
        <li>
          <strong>Technical Data:</strong> May include anonymized or non-personally identifiable device metadata (e.g., browser type, system logs) for troubleshooting and security.
        </li>
      </ul>
      <MyTypography variant="body1" sx={{ mt: 1 }}>
        <strong>Note:</strong> We do <u>not</u> collect or store personally identifiable device information such as IMEI numbers, MAC addresses, or hardware fingerprints.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        3. Purpose of Collection
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>To track attendance and working hours accurately.</li>
        <li>To generate compliance reports.</li>
        <li>To ensure security through audit trails and access logs.</li>
        <li>To allow admins to manage workforce operations effectively.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        4. Data Access & Sharing
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>Only authorized HR or admin personnel can view or manage employee data.</li>
        <li>We do not sell or rent personal data to third parties.</li>
        <li>Data may be shared with regulatory authorities if legally required.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        5. Data Security
      </MyTypography>
      <MyTypography variant="body1">
        We implement strict security measures including encryption, access control, and monitoring to protect your data. Despite our efforts, no system is 100% secure.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        6. Data Retention
      </MyTypography>
      <MyTypography variant="body1">
        Attendance and log data is retained for a period as required by company policy and legal standards.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        7. Employee Rights
      </MyTypography>
      <ul style={{ paddingLeft: '20px' }}>
        <li>Request to view or correct attendance records.</li>
        <li>Request deletion of data, subject to HR policy.</li>
        <li>Report misuse or unauthorized access through official channels.</li>
      </ul>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        8. Updates to Policy
      </MyTypography>
      <MyTypography variant="body1">
        We may revise this Privacy Policy periodically. IT and admins will be informed of major changes through internal communication.
      </MyTypography>

      <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        9. Contact Information
      </MyTypography>
      <MyTypography variant="body1">
        For any privacy-related concerns, please reach out to us at <strong>info@adhyayan.online</strong>.
      </MyTypography>
    </MyBox>
  );
}
