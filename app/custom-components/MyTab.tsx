import { memo } from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import eq from 'lodash/eq';

interface MyTabProps extends TabProps {
  icon?: React.ReactElement;
  label: string;
}

const MyTab = ({ ...props }: MyTabProps) => {
  console.log('MyTab rendered');
  return <Tab style={{ width: 'auto' }} {...props} />;
};

export default memo(MyTab, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
