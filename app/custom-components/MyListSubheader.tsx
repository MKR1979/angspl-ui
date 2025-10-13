import { memo } from 'react';
import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader';
import eq from 'lodash/eq';

interface MyListSubheaderProps extends ListSubheaderProps {
  href?: string;
}

const MyListSubheader = ({ children, ...props }: MyListSubheaderProps) => {
//  console.log('MyListSubheader rendered');
  return <ListSubheader {...props}> {children}</ListSubheader>;
};

export default memo(MyListSubheader, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
