import React, { FC, memo } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { SvgIconProps } from '@mui/material';
import _ from 'lodash';

interface MyInboxIconProps extends SvgIconProps {}

const MyInboxIcon: FC<MyInboxIconProps> = ({ children, ...rest }: MyInboxIconProps) => {
  return <InboxIcon {...rest}>{children}</InboxIcon>;
};

export default memo(MyInboxIcon, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps); // Don't re-render!
});
