import { memo } from 'react';
import MuiPhoneNumber, { MuiPhoneNumberProps } from 'mui-phone-number';
import eq from 'lodash/eq';

type MyPhoneNumberProps = MuiPhoneNumberProps & {};

const MyPhoneNumber = ({ ...props }: MyPhoneNumberProps) => {
// console.log('MyPhoneNumber rendered');
  return <MuiPhoneNumber InputLabelProps={{ shrink: true }} size="small" variant="outlined" fullWidth defaultCountry={'in'} {...props} />;
};

export default memo(MyPhoneNumber, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
