import { memo } from 'react';
import Card, { CardProps } from '@mui/material/Card';
import eq from 'lodash/eq';

interface MyCardProps extends CardProps {}

const MyCard = ({ children, ...props }: MyCardProps) => {
  // console.log('MyCard rendered');
  return <Card {...props}> {children}</Card>;
};

export default memo(MyCard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
