import { memo } from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import eq from 'lodash/eq';
import useTheme from '@mui/material/styles/useTheme';

interface MyTabsProps extends TabsProps {
  children: React.ReactNode;
  value: number;
  onChange(event: React.SyntheticEvent<Element, Event>, newValue: number): void;
}

const MyTabs = ({ ...props }: MyTabsProps) => {
  const theme = useTheme();
//  console.log('MyTabs rendered');
  return (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      sx={{
        mb: 3,
        '& a': {
          minHeight: 'auto',
          minWidth: 10,
          py: 1.5,
          px: 1,
          mr: 2.25,
          color: theme.palette.grey[600],
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        '& a.Mui-selected': {
          color: theme.palette.primary.main
        },
        '& .MuiTabs-indicator': {
          bottom: 2
        },
        '& a > svg': {
          marginBottom: '0px !important',
          mr: 1.25
        }
      }}
      {...props}
      onChange={props.onChange}
    />
  );
};

export default memo(MyTabs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
