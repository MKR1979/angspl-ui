import { IconBrandTelegram } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBrandTelegramProps extends IconProps {}
const MyIconBrandTelegram = ({ ...props }: MyIconBrandTelegramProps) => {
  //console.log('My render');
  return <IconBrandTelegram {...props}></IconBrandTelegram>;
};
export default memo(MyIconBrandTelegram, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
