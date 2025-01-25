import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyImage from './MyImage';

const MyLogo = () => {
  return <MyImage src="/logo.png" width={196} height={50} alt="logo" />;
};

export default memo(MyLogo, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
