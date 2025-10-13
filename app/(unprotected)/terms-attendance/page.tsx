import MyBox from '@/app/custom-components/MyBox';
import MyTypography from '@/app/custom-components/MyTypography';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use'
};

export const revalidate = 0;

export default async function TermsOfUsePage() {
  return (
    <>
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
          Terms of Use
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
          1. Scope
        </MyTypography>
        <MyTypography variant="body1">
          These Terms of Use govern your access to and use of the Employee Attendance Module and the Admin Dashboard provided by the company.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          2. Authorized Use
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Employees may use the platform to mark attendance using their assigned credentials or devices.</li>
          <li>Admins may access, manage, and report on attendance records in accordance with their access level.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          3. Restrictions
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Do not share login credentials with others.</li>
          <li>Do not tamper with attendance records or use automation to manipulate entries.</li>
          <li>Unauthorized access or misuse may result in disciplinary action.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          4. Admin Responsibilities
        </MyTypography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Ensure confidentiality and integrity of employee attendance records.</li>
          <li>Limit access to authorized users only.</li>
          <li>Review logs and monitor activity regularly for anomalies.</li>
        </ul>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          5. Termination & Suspension
        </MyTypography>
        <MyTypography variant="body1">
          Violation of these terms may lead to temporary or permanent suspension of system access, disciplinary action, or legal proceedings where applicable.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          6. Data Ownership
        </MyTypography>
        <MyTypography variant="body1">
          All attendance data is the intellectual property of the employer and may only be used for internal HR and compliance purposes.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          7. Acceptance
        </MyTypography>
        <MyTypography variant="body1">
          By accessing or using the Attendance and Admin Modules, you agree to abide by these Terms of Use.
        </MyTypography>

        <MyTypography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          8. Contact
        </MyTypography>
        <MyTypography variant="body1">
          For questions or support related to these terms, please contact <strong>info@adhyayan.online</strong>.
        </MyTypography>
      </MyBox>
    </>
  );
}
