import { memo } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import eq from 'lodash/eq';

interface MyIconButtonProps extends IconButtonProps {}

const MyIconButton = ({ children, ...props }: MyIconButtonProps) => {
  //console.log('MyIconButton rendered');
  return <IconButton {...props}> {children}</IconButton>;
};

export default memo(MyIconButton, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
