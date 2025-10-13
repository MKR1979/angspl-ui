import { memo } from 'react';
import NumericInput, { NumericInputProps } from 'material-ui-numeric-input';
import eq from 'lodash/eq';

interface MyNumericInputProps extends NumericInputProps {}

const MyNumericInput = ({ ...props }: MyNumericInputProps) => {
//  console.log('MyNumericInput rendered');
  return <NumericInput size="small" InputLabelProps={{ shrink: true }} fullWidth {...props} />;
};

export default memo(MyNumericInput, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
