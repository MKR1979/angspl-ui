import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyDirectionsBoatIconProps extends SvgIconProps {}
const MyDirectionsBoatIcon = ({ ...props }: MyDirectionsBoatIconProps) => {
  // console.log('MyDirectionBoatIcon render');
  return <DirectionsBoatIcon {...props}></DirectionsBoatIcon>;
};
export default memo(MyDirectionsBoatIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
