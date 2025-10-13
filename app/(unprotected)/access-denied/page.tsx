'use client';

import MyTypography from '@/app/custom-components/MyTypography';
import Image from 'next/image';

export default function AccessRestrictedClient() {
  return (
    <div style={{ marginTop: '100px', width: '100%', textAlign: 'center' }}>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-md w-full relative mx-auto">
        <Image
          src="/common/access-denied.webp"
          alt="Access Restricted"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'red' }}>
          Access to this page is restricted
        </h1>
        <p style={{ marginTop: '10px', color: '#555' }}>
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
      <MyTypography
        className="already-msg2"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', size: '12px', mt: 4 }} >
        <a
          onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
          ← Go Back
        </a>
      </MyTypography>
    </div>
  );
}
