import { memo } from 'react';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import eq from 'lodash/eq';
interface MyTimePickerProps extends TimePickerProps<Date> {
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MyTimePicker = ({ ...props }: MyTimePickerProps) => {
  console.log('MyTimePicker rendered');
  return (
    <TimePicker
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

export default memo(MyTimePicker, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
