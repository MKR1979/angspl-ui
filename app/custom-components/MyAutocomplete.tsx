import { memo } from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import eq from 'lodash/eq';
import LookupDTO from '../types/LookupDTO';

interface MyAutocompleteProps extends AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined> {
  firstitem?: LookupDTO;
}

const MyAutocomplete = (props: MyAutocompleteProps) => {
  console.log('MyAutocomplete rendered');
  console.log('test', props.options);
  const options = [...props.options];
  if (props.firstitem) {
    options.unshift(props.firstitem);
  }
  return <Autocomplete disableClearable size="small" forcePopupIcon fullWidth {...props} options={options} />;
};

export default memo(MyAutocomplete, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
