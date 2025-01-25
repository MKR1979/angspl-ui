import { memo } from 'react';
import ButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';
import eq from 'lodash/eq';

interface MyButtonGroupProps extends ButtonGroupProps {}

const MyButtonGroup = ({ children, ...props }: MyButtonGroupProps) => {
  console.log('MyButtonGroup rendered');
  return <ButtonGroup {...props}> {children}</ButtonGroup>;
};

export default memo(MyButtonGroup, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
