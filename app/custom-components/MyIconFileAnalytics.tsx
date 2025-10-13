import { IconFileAnalytics } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconFileAnalyticsProps extends IconProps {}
const MyIconFileAnalytics = ({ ...props }: MyIconFileAnalyticsProps) => {
 // console.log('My render');
  return <IconFileAnalytics {...props}></IconFileAnalytics>;
};
export default memo(MyIconFileAnalytics, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
