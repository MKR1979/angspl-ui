import { memo } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import eq from 'lodash/eq';
import { DateTimePickerProps } from '@mui/x-date-pickers';
import { useSelector } from '../store';
interface MyDateTimePickerProps extends DateTimePickerProps<Date> {
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  minDate?: Date;
  maxDate?: Date;
}
const MyDateTimePicker = (props: MyDateTimePickerProps) => {
  const { siteConfig } = useSelector((state) => state.siteConfigState);

  const dateTimeFormatConfig = siteConfig.find(
    (c: any) => c.key === 'DATE_TIME_FORMAT_DDMMYYYY_HHMM' 
  );
  const dateTimeFormat = dateTimeFormatConfig?.value || 'dd/MM/yyyy hh:mm a';

  return (
    <DateTimePicker
    format={dateTimeFormat}
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




