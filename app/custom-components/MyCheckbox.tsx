import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import eq from 'lodash/eq';
import { memo } from 'react';
interface MyCheckboxProps extends CheckboxProps {
  label?: string;
}

const MyCheckbox = ({ ...props }: MyCheckboxProps) => {
  console.log('MyCheckbox rendered');
  return <FormControlLabel control={<Checkbox {...props} />} label={props.label} />;
};

export default memo(MyCheckbox, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
