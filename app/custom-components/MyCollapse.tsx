import { memo } from 'react';
import Collapse, { CollapseProps } from '@mui/material/Collapse';
import eq from 'lodash/eq';

interface MyCollapseProps extends CollapseProps {}

const MyCollapse = ({ children, ...props }: MyCollapseProps) => {
  // console.log('MyCollapse rendered');
  return <Collapse {...props}> {children}</Collapse>;
};

export default memo(MyCollapse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
