import { memo } from 'react';
import List, { ListProps } from '@mui/material/List';
import eq from 'lodash/eq';

interface MyListProps extends ListProps {
  href?: string;
}

const MyList = ({ children, ...props }: MyListProps) => {
  console.log('MyList rendered');
  return <List {...props}> {children}</List>;
};

export default memo(MyList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
