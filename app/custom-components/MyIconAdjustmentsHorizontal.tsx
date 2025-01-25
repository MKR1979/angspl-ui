import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { ForwardedRef, forwardRef, memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconAdjustmentsHorizontalProps extends IconProps {}
const MyIconAdjustmentsHorizontal = forwardRef(({ ...props }: MyIconAdjustmentsHorizontalProps, ref: ForwardedRef<SVGSVGElement>) => {
  //const MyIconAdjustmentsHorizontal = ({ ...props }: MyIconAdjustmentsHorizontalProps) => {
  console.log('My render');
  return <IconAdjustmentsHorizontal ref={ref as unknown as any} {...props} />;
});
MyIconAdjustmentsHorizontal.displayName = 'MyIconAdjustmentsHorizontal';
export default memo(MyIconAdjustmentsHorizontal, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
