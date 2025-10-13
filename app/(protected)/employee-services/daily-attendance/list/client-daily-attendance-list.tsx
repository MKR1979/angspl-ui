'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import { GridColDef } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCard from '@/app/custom-components/MyCard';
import useDailyAttendanceList from './useDailyAttendanceList';
import TrackPresenceDTO from '@/app/types/TrackPresenceDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import * as gConstants from '../../../constants/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  arrTrackPresenceDTO: TrackPresenceDTO[];
  total_records: number;
};

const formatTo12HourWithSeconds = (time24: string | null | undefined): string => {
  if (!time24 || !/^\d{2}:\d{2}:\d{2}$/.test(time24)) {
    return '';
  }
  const [hours, minutes, seconds] = time24.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
  if (isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

const ClientDailyAttendanceList = ({ arrTrackPresenceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setOpen2,
    setClose2,
    onUserNameChange,
    onFromDateChange,
    onReportTypeChange
  } = useDailyAttendanceList({ arrTrackPresenceDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'user_name',
      headerName: ' UserName',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'attendance_time',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      // renderCell: (params) => {
      //   const raw = params.row.attendance_time;
      //   if (!raw) return '';
      //   const dateObj = new Date(raw);
      //   if (isNaN(dateObj.getTime())) return '';
      //   const iso = dateObj.toISOString();
      //   const dateOnly = iso.slice(0, 10); // gets 'YYYY-MM-DD'
      //   return <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{dateOnly}</MyTypography>;
      // }
      renderCell: (params) => {
        const dt = dayjs.utc(params.row.attendance_time);
        return <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{dt.format('DD-MM-YYYY')}</MyTypography>;
      }
    },
    {
      field: 'time_in',
      headerName: 'Time In',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {formatTo12HourWithSeconds(params.row.time_in)}
        </MyTypography>
      )
    },
    {
      field: 'time_out',
      headerName: 'Time Out',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {formatTo12HourWithSeconds(params.row.time_out)}
        </MyTypography>
      )
    },
    {
      field: 'total_hours',
      headerName: 'Total Hours',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const value = params.value;
        return value ? <span>{value} Hrs</span> : null;
      }
    },
    {
      field: 'report_type',
      headerName: 'Type',
      flex: 1,
      minWidth: 150
    }
  ];

  return (
    <>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '5px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 4 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoTrackPresence.user_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoTrackPresence.user_id, text: state.dtoTrackPresence.user_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Users"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.user_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 4 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoTrackPresence.report_type
                    ? { text: state.dtoTrackPresence.report_type }
                    : state.arrTrackPresenceReportTypeLookup[0]
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrTrackPresenceReportTypeLookup}
                onChange={onReportTypeChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Report Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.report_type}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 4 }}>
              <MyDatePicker
                label="Date"
                onChange={onFromDateChange}
                value={
                  dayjs(state.dtoTrackPresence.from_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoTrackPresence.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
                minDate={dayjs(gConstants.MIN_ALLOWED_DATE_DPS).toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12 }}>
              <MyGrid container spacing={2}>
                {[
                  { label: 'Incomplete', value: state.attendanceStats.incomplete, color: '#FFA726' },
                  { label: 'Present', value: state.attendanceStats.complete, color: '#66BB6A' },
                  { label: 'Absent', value: state.attendanceStats.absent, color: '#EF5350' },
                  { label: 'Total', value: state.attendanceStats.total, color: '#42A5F5' }
                ].map((stat, index) => (
                  <MyGrid key={index} size={{ xs: 6, sm: 3 }}>
                    <MyBox
                      sx={{
                        backgroundColor: stat.color,
                        color: '#fff',
                        borderRadius: 2,
                        padding: 1,
                        textAlign: 'center',
                        boxShadow: 1
                      }}
                    >
                      <MyTypography variant="subtitle1">
                        {stat.label} Attendance : {stat.value}
                      </MyTypography>
                    </MyBox>
                  </MyGrid>
                ))}
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyBox>
      </MyLocalizationProvider>
      <MyCard>
        <MyCardContent sx={{ overflowX: 'auto' }}>
          <style>{`.MuiDataGrid-footerContainer { display: none !important; }`}</style>
          <div style={{ minWidth: `${columns.length * 150}px` }}>
            <MyDataGrid
              apiRef={apiRef}
              rowSelectionModel={state.arrSelectedId}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              onRowSelectionModelChange={onCheckChange}
              rows={state.arrTrackPresenceDTO}
              rowCount={state.total_records}
              columns={columns}
              showSearch={false}
              loading={state.isLoading}
              showExportButton={findPermission(userPermissions, 202)}
              onFilterModelChange={onFilterModelChange}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientDailyAttendanceList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
