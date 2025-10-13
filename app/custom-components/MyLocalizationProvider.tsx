import { memo } from 'react';
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import eq from 'lodash/eq';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface MyLocalizationProviderProps extends LocalizationProviderProps<Date, ILocale | undefined> {
  dateAdapter?: any;
}

const MyLocalizationProvider = ({ ...props }: MyLocalizationProviderProps) => {
//  console.log('MyLocalizationProvider rendered');
  return <LocalizationProvider dateAdapter={AdapterDateFns} {...props} />;
};

export default memo(MyLocalizationProvider, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
