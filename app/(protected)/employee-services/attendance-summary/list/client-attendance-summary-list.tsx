'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import { GridColDef } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCard from '@/app/custom-components/MyCard';
import useAttendanceSummaryList from './useAttendanceSummaryList';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  arrAttendanceDTO: AttendanceDTO[];
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

const ClientAttendanceSummaryList = ({ arrAttendanceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    onFilterModelChange,
    setClose1,
    setOpen1,
    onUserNameChange,
    onFromDateChange,
    onToDateChange
  } = useAttendanceSummaryList({ arrAttendanceDTO, total_records });

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
      //   const dateOnly = iso.slice(0, 10);
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
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
      minWidth: 150
    }
  ];

  return (
    <>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoAttendance.user_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoAttendance.user_id, text: state.dtoAttendance.user_name }
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
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="From Date"
                  onChange={onFromDateChange}
                  value={
                    dayjs(state.dtoAttendance.from_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoAttendance.from_date).toDate()
                  }
                  maxDate={dayjs().toDate()}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="To Date"
                  onChange={onToDateChange}
                  value={
                    dayjs(state.dtoAttendance.to_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoAttendance.to_date).toDate()
                  }
                  minDate={
                    state.dtoAttendance.from_date && dayjs(state.dtoAttendance.from_date).isValid()
                      ? dayjs(state.dtoAttendance.from_date).toDate()
                      : undefined
                  }
                  maxDate={dayjs().toDate()}
                />
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
              rows={state.arrAttendanceDTO}
              rowCount={state.total_records}
              columns={columns}
              showSearch={false}
              loading={state.isLoading}
              showExportButton={findPermission(userPermissions, 201)}
              onFilterModelChange={onFilterModelChange}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientAttendanceSummaryList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
