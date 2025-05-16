import MyTypography from '@/app/custom-components/MyTypography';
import { Metadata } from 'next';
import MyBox from '@/app/custom-components/MyBox';
import { COMPANY } from '.././constants/constants';

export const metadata: Metadata = {
  title: 'Terms'
};

export const revalidate = 0;

export default async function ThankyouPage() {
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
          Terms and Conditions
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
          1. Introduction
        </MyTypography>
        <MyTypography variant="body1">
          Welcome to [{COMPANY}] (we, our, or us). These Terms and Conditions govern your use of our website and services, including online courses and internship programs. By accessing our website, you agree to comply with these terms.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          2. Services Offered
        </MyTypography>
        <MyTypography variant="body1">
          We provide online courses in cloud computing, DevOps, web development, AI, data science, mobile app development, and full-stack software development. We also conduct internship programs for B.Tech (CS), MCA, and M.Sc (IT) students.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          3. User Registration
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Users must provide accurate personal details during registration.</li>
          <li>Account credentials must be kept confidential.</li>
          <li>We reserve the right to suspend accounts if we detect misuse.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          4. Payments & Refunds
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Course fees must be paid in full before access is granted.</li>
          <li>Refund requests will be processed as per our refund policy.</li>
          <li>Internships may have separate fee structures, which will be communicated at enrollment.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          5. Intellectual Property
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>All course content, materials, and branding are owned by us and cannot be copied, shared, or resold without permission.</li>
          <li>Unauthorized distribution of content may lead to legal action.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          6. Code of Conduct
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Users must maintain respectful communication on our platform.</li>
          <li>Any fraudulent activity or misuse will result in a permanent ban.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          7. Termination of Services
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>We reserve the right to suspend or terminate access to users violating our terms.</li>
          <li>If our services are discontinued, we will notify users in advance.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          8. Disclaimer of Warranties
        </MyTypography>
        <MyTypography variant="body1">
          Our courses and internships are provided as is without any guarantees regarding job placement or certification recognition by third parties.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          9. Limitation of Liability
        </MyTypography>
        <MyTypography variant="body1">
          We are not responsible for any losses, damages, or disruptions resulting from service use or technical issues.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          10. Governing Law
        </MyTypography>
        <MyTypography variant="body1">
          These terms are governed by the laws of [ jurisdiction of the Government of India], and any disputes shall be resolved in the courts of [Bhopal, MP, India].
        </MyTypography>
    </MyBox>
  );
}