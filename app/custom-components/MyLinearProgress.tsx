import { ReactElement, memo } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import eq from 'lodash/eq';

interface MyLinearProgressProps extends LinearProgressProps {
  primary?: string | ReactElement;
}

const MyLinearProgress = ({ ...props }: MyLinearProgressProps) => {
  //console.log('MyLinearProgress rendered');
  return <LinearProgress {...props} sx={{ height: '15px', ...props.sx }}></LinearProgress>;
};

export default memo(MyLinearProgress, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
