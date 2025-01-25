import React from 'react';
import MyBox from './custom-components/MyBox';
import MyTypography from './custom-components/MyTypography';
import MyButton from './custom-components/MyButton';
import MyLink from './custom-components/MyLink';

export default function Error() {
  return (
    <MyBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh'
        //backgroundColor: 'rgb(238, 242, 246)',
      }}
    >
      <MyTypography variant="h1" style={{ color: 'whiteq' }}>
        404
      </MyTypography>
      <MyTypography variant="h6" style={{ color: 'whiteq' }}>
        The page you’re looking for doesn’t exist.
      </MyTypography>
      <MyLink href="/">
        <MyButton variant="contained">Go to home page</MyButton>
      </MyLink>
    </MyBox>
  );
}
