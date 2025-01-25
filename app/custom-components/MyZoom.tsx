import { memo } from 'react';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import eq from 'lodash/eq';

interface MyZoomProps extends ZoomProps {}

const MyZoom = ({ ...props }: MyZoomProps) => {
  console.log('MyZoom rendered');
  return <Zoom {...props} />;
};

export default memo(MyZoom, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
