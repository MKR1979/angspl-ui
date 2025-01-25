import { memo } from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import eq from 'lodash/eq';

interface MyTooltipProps extends TooltipProps {}

const MyTooltip = ({ ...props }: MyTooltipProps) => {
  console.log('MyTooltip rendered');
  return <Tooltip {...props} />;
};

export default memo(MyTooltip, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
