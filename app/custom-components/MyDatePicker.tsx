import { memo } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import eq from 'lodash/eq';
interface MyDatePickerProps extends DatePickerProps<Date> {
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
const MyDatePicker = (props: MyDatePickerProps) => {
  console.log('MyDatePicker rendered');
  return (
    <DatePicker
      views={['year', 'month', 'day']}
      slotProps={{
        textField: {
          InputLabelProps: { shrink: true },
          size: 'small',
          variant: 'outlined',
          fullWidth: true,
          onBlur: props.onBlur,
          error: props.error
        }
      }}
      {...props}
    />
  );
};

export default memo(MyDatePicker, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
