import { memo } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import eq from 'lodash/eq';

interface MySwitchProps extends SwitchProps {}

const MySwitch = ({ ...props }: MySwitchProps) => {
//  console.log('MySwitch rendered');
  return <Switch {...props}> </Switch>;
};

export default memo(MySwitch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
