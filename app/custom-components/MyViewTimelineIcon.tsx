import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyViewTimelineIconProps extends SvgIconProps {}
const MyViewTimelineIcon = ({ ...props }: MyViewTimelineIconProps) => {
  console.log('MyViewTimelineIcon render');
  return <ViewTimelineIcon {...props}></ViewTimelineIcon>;
};
export default memo(MyViewTimelineIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
