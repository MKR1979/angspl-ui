import React, { FC, memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import MyCalendarIcon from './MyCalendarIcon';
import MyDashboardIcon from './MyDashboardIcon';
import eq from 'lodash/eq';

interface MyButtonProps extends ButtonProps {
  startIconText?: string;
  target?: string;
}

const MyButton: FC<MyButtonProps> = ({ startIconText, ...rest }: MyButtonProps) => {
  console.log('MyButton rendered');
  let _startIcon = undefined;
  switch (startIconText) {
    case 'CalendarMonth':
      _startIcon = <MyCalendarIcon />;
      break;
    case 'DashboardIcon':
      _startIcon = <MyDashboardIcon />;
      break;
  }

  return <Button variant="contained" size="small" startIcon={_startIcon} {...rest} />;
};

export default memo(MyButton, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
