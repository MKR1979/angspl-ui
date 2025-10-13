import { memo } from 'react';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import eq from 'lodash/eq';

interface MyCardMediaProps extends CardMediaProps {}

const MyCardMedia = ({ children, ...props }: MyCardMediaProps) => {
  // console.log('MyCardMedia rendered');
  return <CardMedia {...props}> {children}</CardMedia>;
};

export default memo(MyCardMedia, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
