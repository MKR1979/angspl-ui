import { memo } from 'react';
import CardActions, { CardActionsProps } from '@mui/material/CardActions';
import eq from 'lodash/eq';

interface MyCardActionsProps extends CardActionsProps {}
const MyCardActions = ({ ...props }: MyCardActionsProps) => {
  // console.log('MyCardActions rendered');
  return <CardActions {...props}></CardActions>;
};

export default memo(MyCardActions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
