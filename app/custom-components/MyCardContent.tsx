import { memo } from 'react';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import eq from 'lodash/eq';

interface MyCardContentProps extends CardContentProps {}
const MyCardContent = ({ ...props }: MyCardContentProps) => {
  console.log('MyCardContent rendered');
  return <CardContent sx={{ m: 1, p: 1 }} {...props}></CardContent>;
};

export default memo(MyCardContent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
