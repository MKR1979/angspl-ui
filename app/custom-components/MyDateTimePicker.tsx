import { memo } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import eq from 'lodash/eq';
import { DateTimePickerProps } from '@mui/x-date-pickers';
interface MyDateTimePickerProps extends DateTimePickerProps<Date> {
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
const MyDateTimePicker = (props: MyDateTimePickerProps) => {
  console.log('MyDateTimePicker rendered');
  return (
    <DateTimePicker
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

export default memo(MyDateTimePicker, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
