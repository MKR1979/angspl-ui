'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyTimePicker from '@/app/custom-components/MyTimePicker';
import useBulkAttendanceList from './useBulkAttendanceList';
import BulkAttendanceDTO from '@/app/types/BulkAttendanceDTO';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/CheckCircle';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrBulkAttendanceDTO: BulkAttendanceDTO[];
  total_records: number;
};

const formatTo12Hour = (time24: string | null | undefined): string => {
  if (!time24 || !/\d{2}:\d{2}:\d{2}/.test(time24)) return '';
  const [h, m, s] = time24.split(':');
  const date = new Date();
  date.setHours(+h, +m, +s);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
};

const ClientBulkAttendanceList = ({ arrBulkAttendanceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    handleContextMenu,
    onFilterModelChange,
    // onRowDoubleClick,
    onToDateChange,
    setClose1,
    setOpen1,
    onUserNameChange,
    onTimeOutChange,
    onFromDateChange,
    onTimeInChange,
    onMarkAttendance,
    onSaveDraftClick,
    onTimeBlur,
    showSaveButton
  } = useBulkAttendanceList({ arrBulkAttendanceDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, minWidth: 150 },
    { field: 'user_id', headerName: 'User Id', flex: 1, minWidth: 150 },
    { field: 'user_name', headerName: 'User Name', flex: 1, minWidth: 150 },
    {
      field: 'attendance_time',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      // renderCell: ({ row }) => {
      //   const date = row.attendance_time ? new Date(row.attendance_time).toISOString().slice(0, 10) : '';
      //   return <MyTypography>{date}</MyTypography>;
      // }
      renderCell: (row) => {
        if (!row.value) return '';
        const formattedDate = dayjs(row.value).tz(customerTimezone).format('MM/DD/YYYY');
        if (formattedDate === '12/31/1899') return '';
        return dayjs(row.value).tz(customerTimezone).format('DD-MM-YYYY');
      }
    },
    {
      field: 'time_in',
      headerName: 'Time In',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => <MyTypography>{formatTo12Hour(row.time_in)}</MyTypography>
    },
    {
      field: 'time_out',
      headerName: 'Time Out',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => <MyTypography>{formatTo12Hour(row.time_out)}</MyTypography>
    },
    {
      field: 'total_hours',
      headerName: 'Total Hours',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        const { total_hours, time_in, time_out } = row;
        if (total_hours && !total_hours.includes('NaN')) {
          return <span>{total_hours}</span>;
        }
        const hasTimeInOrOut = Boolean(time_in || time_out);
        return <span>{hasTimeInOrOut ? 'Not Calculated' : ''}</span>;
      }
    },
    { field: 'remarks', headerName: 'Remarks', flex: 1, minWidth: 150 }
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <MyBreadcrumbs items={state.breadcrumbsItems} />
        {findPermission(userPermissions, 18) && !showSaveButton && (
          <MyButton
            onClick={onSaveDraftClick}
            disabled={state.arrSelectedId.length === 0}
            startIcon={<SaveIcon />}
            variant="contained"
            color="info"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              backgroundColor: state.arrSelectedId.length > 0 ? 'primary.main' : 'grey.300',
              color: state.arrSelectedId.length > 0 ? 'white' : 'grey.600',
              minWidth: { xs: '100px', sm: '120px' },
              fontSize: { xs: '0.60rem', sm: '0.800rem' },
              padding: { xs: '3px 6px', sm: '4px 8px' },
              mt: { xs: 4, sm: 4 },
              mr: '4px',
              ':hover': {
                backgroundColor: state.arrSelectedId.length > 0 ? 'primary.dark' : 'grey.300'
              }
            }}
          >
            Save Draft
          </MyButton>
        )}


        {findPermission(userPermissions, 17) && showSaveButton && (
          <MyButton
            onClick={() => onMarkAttendance(false)}
            disabled={state.arrSelectedId.length === 0}
            startIcon={<CheckIcon />}
            variant="contained"
            color="success"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              backgroundColor: state.arrSelectedId.length > 0 ? 'primary.main' : 'grey.300',
              color: state.arrSelectedId.length > 0 ? 'white' : 'grey.600',
              minWidth: { xs: '100px', sm: '120px' },
              fontSize: { xs: '0.60rem', sm: '0.800rem' },
              padding: { xs: '3px 6px', sm: '4px 8px' },
              mt: { xs: 4, sm: 4 },
              ':hover': {
                backgroundColor: state.arrSelectedId.length > 0 ? 'primary.dark' : 'grey.300'
              }
            }}
          >
            Save
          </MyButton>
        )}
      </div>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: 2 }}>
          <MyGrid container spacing={2} sx={{ border: '3px solid #eef2f6', p: 2 }}>
            <MyGrid size={{ xs: 12, sm: 15 }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 6, sm: 2 }}>
                  <MyDatePicker
                    label="From Date"
                    onChange={onFromDateChange}
                    value={
                      dayjs(state.dtoBulkAttendance.from_date).format('yyyy-mm-dd') === '12/31/1899'
                        ? null
                        : dayjs(state.dtoBulkAttendance.from_date).toDate()
                    }
                    maxDate={dayjs().toDate()}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 6, sm: 2 }}>
                  <MyDatePicker
                    label="To Date"
                    onChange={onToDateChange}
                    value={
                      dayjs(state.dtoBulkAttendance.to_date).format('yyyy-mm-dd') === '12/31/1899'
                        ? null
                        : dayjs(state.dtoBulkAttendance.to_date).toDate()
                    }
                    minDate={
                      state.dtoBulkAttendance.from_date && dayjs(state.dtoBulkAttendance.from_date).isValid()
                        ? dayjs(state.dtoBulkAttendance.from_date).toDate()
                        : undefined
                    }
                    maxDate={dayjs().toDate()}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 6, sm: 2 }}>
                  <MyTimePicker
                    label="Time In"
                    value={state.dtoBulkAttendance.time_in ? dayjs(state.dtoBulkAttendance.time_in).toDate() : null}
                    onChange={onTimeInChange}
                    onBlur={onTimeBlur}
                    // maxTime={dayjs().toDate()}
                    // ampm={true}
                    error={state.errorMessages.time_in ? true : false}
                  />
                  <MyTypography className="error">{state.errorMessages.time_in}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 6, sm: 2 }}>
                  <MyTimePicker
                    label="Time Out"
                    value={state.dtoBulkAttendance.time_out ? dayjs(state.dtoBulkAttendance.time_out).toDate() : null}
                    onChange={onTimeOutChange}
                    onBlur={onTimeBlur}
                    // maxTime={dayjs().toDate()}
                    error={state.errorMessages.time_out ? true : false}
                  />
                  <MyTypography className="error">{state.errorMessages.time_out}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 6, sm: 4 }}>
                  <MyAutocomplete
                    open={state.open1}
                    onOpen={setOpen1}
                    onClose={setClose1}
                    value={
                      state.dtoBulkAttendance.user_id === null
                        ? { id: 'ALL', text: 'All Users' }
                        : { id: state.dtoBulkAttendance.user_id, text: state.dtoBulkAttendance.user_name }
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
              rows={state.arrBulkAttendanceDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onFilterModelChange={onFilterModelChange}
              // onRowDoubleClick={onRowDoubleClick}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientBulkAttendanceList, eq);
