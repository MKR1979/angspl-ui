'use client';
import useAttendanceEntry from './useReviewAttendanceEntry';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import { Box, Typography, CircularProgress, Alert, Card, Divider, InputAdornment } from '@mui/material';
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
    state,
    handleMarkAttendance,
    error,
    loading,
    setOpen1,
    setClose1,
    onTypeBlur,
    onTypeChange,
    onCancelClick,
    saving,
    onNameBlur,
    onAttendanceTimeBlur,
    onInputChange,
    onDateChange,
    onRemarkBlur,
    formatDateTimePreserveUTC
  } = useAttendanceEntry(props);

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="black">
        Edit Attendance
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <MyGrid container spacing={2}>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Date & Time"
            name="attendance_time"
            type="datetime-local"
            value={state.dtoAttendance?.attendance_time ? formatDateTimePreserveUTC(state.dtoAttendance.attendance_time) : ''}
            onChange={onDateChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onBlur={onAttendanceTimeBlur}
            error={state.errorMessages.attendance_time ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.attendance_time}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyAutocomplete
            open={state.open1}
            onOpen={setOpen1}
            onClose={setClose1}
            value={{ text: state.dtoAttendance?.entry_type }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrAttendanceTypeLookup}
            onChange={onTypeChange}
            onBlur={onTypeBlur}
            filterOptions={(options, state) => {              // searchable lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Entry Type"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!state.errorMessages.entry_type ? true : false}
                placeholder="e.g. Select IN, OUT"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentTurnedInIcon fontSize="small" />
                    </InputAdornment>
                  )
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
            value={state.dtoAttendance.remarks}
            onChange={onInputChange}
            inputProps={{
              maxLength: gConstants.ATTENDANCE_REMARK_LENGTH,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onRemarkBlur}
            error={state.errorMessages.remarks ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.remarks}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Name"
            name="name"
            value={state.dtoAttendance?.name}
            fullWidth
            InputProps={{
              inputProps: { maxLength: Constants.CODE_PROJECT_TITLE_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onBlur={onNameBlur}
            error={state.errorMessages.name ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.name}</MyTypography>
        </MyGrid>
      </MyGrid>

      <MyDivider sx={{ my: 2 }} />

      <MyCardActions>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <MyButton onClick={handleMarkAttendance} startIcon={<AssignmentTurnedInIcon />} disabled={saving}>
              {saving ? 'Submitting...' : 'Submit'}
            </MyButton>
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
  return eq(prevProps, nextProps);
});
