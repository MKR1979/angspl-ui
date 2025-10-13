import { IconSettings } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconSettingsProps extends IconProps {}
const MyIconSettings = ({ ...props }: MyIconSettingsProps) => {
  //console.log('My render');
  return <IconSettings {...props}></IconSettings>;
};
export default memo(MyIconSettings, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
