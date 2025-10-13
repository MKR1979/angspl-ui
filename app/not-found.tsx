'use client';
import React from 'react';
import MyBox from './custom-components/MyBox';
import MyTypography from './custom-components/MyTypography';
import MyButton from './custom-components/MyButton';
import MyLink from './custom-components/MyLink';
import { useSelector } from './store';
import { DPS_COMPANY_ID } from './constants/constants';

export default function Error() {
  const { companyInfo } = useSelector((state) => state.globalState);

  // Determine redirect path based on company ID
  const homePath = companyInfo?.company_id === DPS_COMPANY_ID ? '/login' : '/';

  return (
    <MyBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <MyTypography variant="h1" sx={{ color: 'white' }}>
        404
      </MyTypography>
      <MyTypography variant="h6" sx={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </MyTypography>
      
      <MyLink href={homePath}>
        <MyButton variant="contained">Go to home page</MyButton>
      </MyLink>
    </MyBox>
  );
}
