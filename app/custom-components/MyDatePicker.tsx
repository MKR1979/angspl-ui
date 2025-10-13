// import { memo } from 'react';
// import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
// import eq from 'lodash/eq';
// import { useSelector } from '../store';


// interface MyDatePickerProps extends DatePickerProps<Date> {
//   error?: boolean;
//   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
// }
// const MyDatePicker = (props: MyDatePickerProps) => {
//   const { siteConfig } = useSelector((state) => state.siteConfigState);
//   const dateFormatConfig = siteConfig.find(
//     (c: any) => c.key === 'DATE_FORMAT_DDMMYYYY'
//   );


//   const dateFormat = dateFormatConfig?.value || 'dd/MM/yyyy';
//   return (
//     <DatePicker
//       views={['year', 'month', 'day']}
//       format= {dateFormat}
//       slotProps={{
//         textField: {
//           InputLabelProps: { shrink: true },
//           size: 'small',
//           variant: 'outlined',
//           fullWidth: true,
//           onBlur: props.onBlur,
//           error: props.error
//         }
//       }}
//       {...props}
//     />
//   );
// };

// export default memo(MyDatePicker, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); 
// });

import { memo } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import eq from 'lodash/eq';
import { useSelector } from '../store';


interface MyDatePickerProps extends DatePickerProps<Date> {
  error?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  minDate?: Date;
  maxDate?: Date;
}
const MyDatePicker = (props: MyDatePickerProps) => {
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const dateFormatConfig = siteConfig.find(
    (c: any) => c.key === 'DATE_FORMAT_DDMMYYYY'
  );


  const dateFormat = dateFormatConfig?.value || 'dd/MM/yyyy';
  return (
    <DatePicker
      views={['year', 'month', 'day']}
      format={dateFormat}
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
  return eq(prevProps, nextProps);
});