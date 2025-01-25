import { memo } from 'react';
import MyBox from './MyBox';
import eq from 'lodash/eq';

interface MyTabPanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
  [key: string]: any;
}

const MyTabPanel = ({ children, value, index, ...other }: MyTabPanelProps) => {
  console.log('MyTabPanel rendered');
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <MyBox sx={{ p: 0 }}>{children}</MyBox>}
    </div>
  );
};

export default memo(MyTabPanel, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
