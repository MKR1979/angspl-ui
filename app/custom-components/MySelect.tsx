import { memo } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import eq from 'lodash/eq';

type MySelectProps = SelectProps & {
  dataSource: any[];
  valueField?: string;
  displayField?: string;
};

const MySelect = ({ dataSource, valueField, displayField, ...others }: MySelectProps) => {
  console.log('MySelect rendered');
  return (
    <Select
      size="small"
      fullWidth
      MenuProps={{
        style: { zIndex: 350010 },
        PaperProps: { sx: { maxHeight: 300 } }
      }}
      {...others}
    >
      {valueField &&
        displayField &&
        dataSource.map((item) => (
          <MenuItem key={item[valueField]} value={item[valueField]}>
            {item[displayField]}
          </MenuItem>
        ))}
      {!valueField &&
        !displayField &&
        dataSource.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
    </Select>
  );
};

export default memo(MySelect, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
