import { ForwardedRef, forwardRef, memo } from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import eq from 'lodash/eq';

interface MyChipProps extends ChipProps {
  chipcolor?: string;
}

const MyChip = forwardRef(({ ...props }: MyChipProps, ref: ForwardedRef<unknown>) => {
  // console.log('MyChip rendered');
  return <Chip ref={ref as any} {...props} />;
});
MyChip.displayName = 'MyChip';
export default memo(MyChip, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
