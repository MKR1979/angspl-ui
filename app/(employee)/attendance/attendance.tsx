'use client';
import useAttendanceEntry from './useAttendanceEntry';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import * as gConstants from '../../constants/constants';
import { Box, Typography, CircularProgress, Alert,  Card, Divider,InputAdornment, } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyButton from '@/app/custom-components/MyButton';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';


type AttendanceEntryProps = {
  dtoAttendance: AttendanceDTO;
};

const AttendanceEntry = (props: AttendanceEntryProps) => {
  const {
    state,saving,error,
    loading,
    formData,
    handleMarkAttendance,
    handleChange,
    setOpen1,
    setClose1,
    onTypeBlur,
    onTypeChange,
    onCancelClick,
    //getLocation
  } = useAttendanceEntry(props);

  return (
<Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
  <Typography variant="h6" gutterBottom color="black">
    Mark Your Attendance
  </Typography>
  <Divider sx={{ mb: 3 }} />

  <MyGrid container spacing={2}>
    <MyGrid size={{ xs: 12, sm: 6 }}>
      <MyTextField
        label="Date & Time"
        name="timestamp"
        type="datetime-local"
        value={formData.attendance_time}
        //onChange={handleChange}
        fullWidth
        required
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </MyGrid>
    <MyGrid size={{ xs: 12, sm: 6 }}>
      <MyAutocomplete
        open={state.open1}
        onOpen={setOpen1}
        onClose={setClose1}
        value={{ text: state.dtoAttendance.entry_type }}
        getOptionLabel={(option: any) => option.text}
        firstitem={{ id: 0, text: '' }}
        options={state.arrAttendanceTypeLookup}
        onChange={onTypeChange}
        filterOptions={(options, state) => {        // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
        renderInput={(params) => (
          <MyTextField
            {...params}
            label="Entry Type"
            slotProps={{ inputLabel: { shrink: true } }}
            onBlur={onTypeBlur}
            error={!!state.errorMessages.entry_type}
            placeholder="e.g. Select IN, OUT"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentTurnedInIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <MyTypography className="error">{state.errorMessages.entry_type}</MyTypography>
    </MyGrid>

    <MyGrid size={{ xs: 12, sm: 6 }}>
      <MyTextField
        label="Remarks"
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
        fullWidth
        placeholder="e.g. Mark Remark"
        inputProps={{ maxLength: gConstants.ATTENDANCE_REMARK_LENGTH }}
      />
    </MyGrid>
       <MyGrid size={{ xs: 12, sm: 6 }}>
      <MyTextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </MyGrid>
  </MyGrid>

  <MyDivider sx={{ my: 2 }} />

  <MyCardActions>
    {loading ? (
      <CircularProgress />
    ) : (
      <>
        <MyButton
          onClick={handleMarkAttendance}
          startIcon={<AssignmentTurnedInIcon />}
          disabled={saving}
        >
          {saving ? 'Submitting...' : 'Submit'}
        </MyButton>
        {/* <MyButton onClick={() => getLocation()} disabled={loading}>
  {loading ? "Fetching location..." : "Retry Location"}
</MyButton> */}
        <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
          Close
        </MyButton>
      </>
    )}
  </MyCardActions>

  {error && (
    <Box mt={2}>
      <Alert severity="error">{error}</Alert>
    </Box>
  )}
</Card>


  );
};

export default memo(AttendanceEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
