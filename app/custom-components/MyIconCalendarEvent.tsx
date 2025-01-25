import { IconCalendarEvent } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconCalendarEventProps extends IconProps {}
const MyIconCalendarEvent = ({ ...props }: MyIconCalendarEventProps) => {
  console.log('My render');
  return <IconCalendarEvent {...props}></IconCalendarEvent>;
};
export default memo(MyIconCalendarEvent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
