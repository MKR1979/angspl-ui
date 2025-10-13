import { memo } from 'react';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import eq from 'lodash/eq';

interface MyCardHeaderProps extends CardHeaderProps {}
const MyCardHeader = ({ ...props }: MyCardHeaderProps) => {
  // console.log('MyCardHeader rendered');
  return <CardHeader sx={{ m: 1, p: 1 }} {...props}></CardHeader>;
};

export default memo(MyCardHeader, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
