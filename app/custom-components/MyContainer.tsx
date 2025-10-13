import { memo } from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import eq from 'lodash/eq';

interface MyContainerProps extends ContainerProps {}

const MyContainer = ({ children, ...props }: MyContainerProps) => {
  // console.log('MyContainer rendered');
  return <Container {...props}> {children}</Container>;
};

export default memo(MyContainer, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
