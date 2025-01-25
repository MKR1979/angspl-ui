import { memo } from 'react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import eq from 'lodash/eq';

interface MyButtonBaseProps extends ButtonBaseProps {
  href?: string;
  target?: string;
}

const MyButtonBase = ({ children, ...props }: MyButtonBaseProps) => {
  console.log('MyButtonBase rendered');
  return <ButtonBase {...props}> {children}</ButtonBase>;
};

export default memo(MyButtonBase, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
