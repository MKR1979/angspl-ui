'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import MyTypography from '@/app/custom-components/MyTypography';

export default function ThankyouClient() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  let message = 'Thank you for your message. We will get back to you soon!😊';
  if (source === 'affiliate') {
    message = 'Thank you for joining our affiliate program! We’ll contact you shortly.🚀';
  }

  return (
    <div style={{ marginTop: '100px', width: '100%', textAlign: 'center' }}>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-md w-full relative">
        <Image src="/common/congratulation.webp" alt="Congratulations" width={120} height={120} className="mx-auto mb-4" />
        <h1 style={{ fontSize: '50px', color: ' #FF8C00' }}>Congratulations!</h1>
        <p>
          <strong>{message}</strong>
        </p>
      </div>
      <MyTypography
        className="already-msg2"
        component="div"
        sx={{
          display: 'flex', justifyContent: 'center',
          position: 'relative', top: '-25px', width: '100%', size: '12px', mt: 4
        }} >
        {/* <a href="/ "> Back to Home</a> */}
        <a
          onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
          ← Go Back
        </a>
      </MyTypography>
    </div>
  );
}
