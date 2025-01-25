import { IconAdjustmentsAlt } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconAdjustmentsAltProps extends IconProps {}
const MyIconAdjustmentsAlt = ({ ...props }: MyIconAdjustmentsAltProps) => {
  console.log('My render');
  return <IconAdjustmentsAlt {...props}></IconAdjustmentsAlt>;
};
export default memo(MyIconAdjustmentsAlt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
