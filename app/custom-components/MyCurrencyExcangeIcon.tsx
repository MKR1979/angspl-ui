import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCurrencyExchangeIconProps extends SvgIconProps {}
const MyCurrencyExchangeIcon = ({ ...props }: MyCurrencyExchangeIconProps) => {
  console.log('MyCurrencyExchangeIcon render');
  return <CurrencyExchangeIcon {...props}></CurrencyExchangeIcon>;
};
export default memo(MyCurrencyExchangeIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
