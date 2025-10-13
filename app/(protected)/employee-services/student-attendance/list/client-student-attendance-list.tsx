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
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';

import useStudentAttendanceList from './useStudentAttendanceList';
import StudentAttendanceDTO from '@/app/types/StudentAttendanceDTO';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/CheckCircle';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MyDateTimePicker from '@/app/custom-components/MyDateTimePicker';
import MyPresenceSelectCell from '@/app/custom-components/MyPresenceSelectCell';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrStudentAttendanceDTO: StudentAttendanceDTO[];
  total_records: number;
};


const ClientStudentAttendanceList = ({ arrStudentAttendanceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    setClose3,
    setOpen3,
    onPresenceBlur,
    onPresenceChange,
    onUserNameChange,
    onMarkAttendance,
    onSaveDraftClick,
    showSaveButton,
    onDateTimeChange,
    onCourseNameChange
  } = useStudentAttendanceList({ arrStudentAttendanceDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, minWidth: 150 },
    { field: 'learner_id', headerName: 'Student Id', flex: 1, minWidth: 150 },
    { field: 'learner_name', headerName: 'Student Name', flex: 1, minWidth: 150 },
    {
      field: 'attendance_time',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      renderCell: (row) => {
        if (!row.value) return '';
        const formattedDate = dayjs(row.value).tz(customerTimezone).format('DD-MM-YYYY');
        if (formattedDate === '12/31/1899') return '';
        return dayjs(row.value).tz(customerTimezone).format('DD-MM-YYYY');
      }
    },
    {
      field: 'course_name',
      headerName: 'Classes',
      flex: 1,
      minWidth: 150,
    },
    // {
    //   field: 'presence',
    //   headerName: 'Presence',
    //   flex: 1,
    //   minWidth: 150,
    //   editable: true,
    // },
        {
      field: 'presence',
      headerName: 'Attendance Type',
      flex: 1,
      minWidth: 150,
      editable: true,
      renderEditCell: (params) => <MyPresenceSelectCell {...params} />, // 👈 use dropdown
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
      minWidth: 150,
      editable: true,
      // renderEditCell: (params) => <MyPresenceSelectCell {...params} />
    }

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

            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDateTimePicker
                label="Date & Time"
                onChange={onDateTimeChange}
                value={
                  dayjs(state.dtoStudentAttendance.attendance_time).format('DD/MM/YYYY hh:mm a') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoStudentAttendance.attendance_time).toDate()
                }
                // onBlur={onDateTimeBlur}
                error={!!state.errorMessages.attendance_time}
                shouldDisableDate={(date) => {
                  const today = dayjs().startOf('day');
                  const oneMonthAgo = dayjs().subtract(1, 'month').startOf('day');
                  return dayjs(date).isBefore(oneMonthAgo) || dayjs(date).isAfter(today);
                }}
              />
              <MyTypography className="error">{state.errorMessages.attendance_time}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoStudentAttendance.course_id === null
                    ? { id: 'ALL', text: 'All Courses' }
                    : { id: state.dtoStudentAttendance.course_id, text: state.dtoStudentAttendance.course_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCourseLookup}
                onChange={onCourseNameChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Classes"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.course_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoStudentAttendance.user_id === null
                    ? { id: 'ALL', text: 'All Students' }
                    : { id: state.dtoStudentAttendance.user_id, text: state.dtoStudentAttendance.user_name }
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
                    label="Students"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.user_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoStudentAttendance.presence }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrPresenceLookup}
                onChange={onPresenceChange}
                onBlur={onPresenceBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Presence Status"
                    placeholder='Select Presence'
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onPresenceBlur}
                    error={state.errorMessages.presence ? true : false}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.presence}</MyTypography>
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
              rows={state.arrStudentAttendanceDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              onFilterModelChange={onFilterModelChange}
              showSearch = {false}
              //  slots={{ toolbar: () => null }} 
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientStudentAttendanceList, eq);
