
// import React, { memo } from 'react';
// import eq from 'lodash/eq';
// import MyImage from './MyImage';

// type MyLogoProps = {
//   src?: string;
//   name?: string; // optional alt text
//   width?: number;
//   height?: number;
// };

// const MyLogo: React.FC<MyLogoProps> = ({
//   src='/logo.png',
//   name = 'logo',
//   width = 196,
//   height = 50,
// }) => {
//   return <MyImage src={src} width={width} height={height} alt={name} />;
// };

// export default memo(MyLogo, (prevProps, nextProps) => eq(prevProps, nextProps));

import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyImage from './MyImage';

type MyLogoProps = {
  src?: string;             // Optional custom logo URL
//  companyName?: string;     // Optional company name for dynamic logo
  hostName?: string;        // Optional host name for dynamic logo
  name?: string;            // Alt text
  width?: number;
  height?: number;
};

const MyLogo: React.FC<MyLogoProps> = ({
  src,
  //companyName,
  hostName,
  name = 'logo',
  width = 196,
  height = 50,
}) => {
  // Determine logo src dynamically
  let logoSrc = src; // if src prop is passed, use it

  if (!logoSrc) {
    // Choose logo based on companyName or hostName
    if (hostName === 'vision.adhyayan.college') {
    //  if (hostName === 'localhost') {
      logoSrc = '/companies-logo/visionCollegeLogo.png';
    } else {
      logoSrc = '/logo.png'; // default logo
    }
  }

  return <MyImage src={logoSrc} width={width} height={height} alt={name} priority />;
};

// Use memo for performance (avoids unnecessary re-renders)
export default memo(MyLogo, (prevProps, nextProps) => eq(prevProps, nextProps));
