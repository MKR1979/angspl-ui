import MyBox from '@/app/custom-components/MyBox';
import MyTypography from '@/app/custom-components/MyTypography';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation/Refund Policy'
};

export default function CancellationRefundPolicy() {
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
        Cancellation/Refund Policy <span className="text-red-500">*</span>
      </MyTypography>
      
      <MyTypography variant="body1" sx={{ fontSize: '1.2rem', mb: 2 }}>
        We value our customers and strive to ensure transparency in our cancellation and refund process. Please read the policy carefully before making a purchase.
      </MyTypography>
      
      <MyTypography variant="h5" sx={{ fontWeight: 'bold', mt: 3 }}>
        Refund & Cancellation Terms
      </MyTypography>
      <ul style={{ paddingLeft: '20px', fontSize: '1.1rem' }}>
        <li>Requests for cancellations must be made within 7 days of purchase.</li>
        <li>Refunds will be processed within 2 to 3 business days after approval.</li>
        <li>Transaction fees, if applicable, are non-refundable.</li>
        <li>No refunds will be issued for partially used services.</li>
      </ul>
    </MyBox>
  );
}
