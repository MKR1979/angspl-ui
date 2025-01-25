import React, { FC, memo } from 'react';
//import { MailIcon, MailIconProps } from '@mui/material/Icon';
import MailIcon from '@mui/icons-material/Mail';
import { SvgIconProps } from '@mui/material';
import _ from 'lodash';

interface MyMailIconProps extends SvgIconProps {}

const MyMailIcon: FC<MyMailIconProps> = ({ children, ...rest }: MyMailIconProps) => {
  return <MailIcon {...rest}>{children}</MailIcon>;
};

export default memo(MyMailIcon, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps); // Don't re-render!
});
