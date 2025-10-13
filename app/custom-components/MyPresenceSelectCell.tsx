// import React from 'react';
// import { useGridApiContext } from '@mui/x-data-grid';
// import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

// const MyPresenceSelectCell = (props: any) => {
//   const { id, field, value } = props;
//   const apiRef = useGridApiContext();

//   const handleChange = (event: SelectChangeEvent) => {
//     apiRef.current.setEditCellValue({ id, field, value: event.target.value });
//   };

//   return (
//     <Select value={value || ''} onChange={handleChange} fullWidth autoFocus>
//       <MenuItem value="Present">Present</MenuItem>
//       <MenuItem value="Absent">Absent</MenuItem>
//       <MenuItem value="Leave">Leave</MenuItem>
//     </Select>
//   );
// };

// export default MyPresenceSelectCell;

import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

const MyPresenceSelectCell = (props: any) => {
  const { id, field, value } = props;
  const apiRef = useGridApiContext();

  const handleChange = (event: SelectChangeEvent) => {
    apiRef.current.setEditCellValue({ id, field, value: event.target.value });
  };

  const effectiveValue = value || 'Present'; // 👈 Default value here

  // If no value is already set, update DataGrid cell immediately
  React.useEffect(() => {
    if (!value) {
      apiRef.current.setEditCellValue({ id, field, value: 'Present' });
    }
  }, [id, field, value, apiRef]);

  return (
    <Select value={effectiveValue} onChange={handleChange} fullWidth >
      <MenuItem value="Present">Present</MenuItem>
      <MenuItem value="Absent">Absent</MenuItem>
      <MenuItem value="half-day">Half Day</MenuItem>
      <MenuItem value="On Leave">On Leave</MenuItem>
    </Select>
  );
};

export default MyPresenceSelectCell;
