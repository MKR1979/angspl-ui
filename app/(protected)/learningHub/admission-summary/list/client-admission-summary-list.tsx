'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useAdmSummaryList from './useAdmissionSummaryList';
import AdmissionReportDTO from '@/app/types/AdmissionReportDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '@/app/store';
import { findPermission } from '../../../../common/utility-permission';
import * as gConstants from '@/app/constants/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrAdmissionReportDTO: AdmissionReportDTO[];
  total_records: number;
};
const ClientAdmSummaryList = ({ arrAdmissionReportDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onSortChange,
    onUserNameChange,
    handleContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    onToDateChange,
    onFromDateChange,
    onCourseNameChange
  } = useAdmSummaryList({ arrAdmissionReportDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 24) ? (
            <MyLink
              href={{
                pathname: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-summary/view/${params.row.id}`,
                query: {
                  companyType: companyInfo.company_type
                }
              }}
            >
              {params.row.course_name}
            </MyLink>
          ) : (
            <span>{params.row.course_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'admission_date',
      headerName: 'Admission Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('MM/DD/YYYY');
        if (formattedDate === '12/31/1899') return '';
        return dayjs(params.value).tz(customerTimezone).format('DD-MM-YYYY');
      }
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'phone_no',
      headerName: 'Phone No',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('MM/DD/YYYY');
        if (formattedDate === '12/31/1899') return '';
        return dayjs(params.value).tz(customerTimezone).format('DD-MM-YYYY');
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDatePicker
                label="From Date"
                onChange={onFromDateChange}
                value={
                  dayjs(state.dtoAdmissionReport.from_date).format('YYYY-MM-DD') === '1899/12/31'
                    ? null
                    : dayjs(state.dtoAdmissionReport.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDatePicker
                label="To Date"
                onChange={onToDateChange}
                value={
                  dayjs(state.dtoAdmissionReport.to_date).format('YYYY-MM-DD') === '1899-12-31'
                    ? null
                    : dayjs(state.dtoAdmissionReport.to_date).toDate()
                }
                minDate={
                  state.dtoAdmissionReport.from_date && dayjs(state.dtoAdmissionReport.from_date).isValid()
                    ? dayjs(state.dtoAdmissionReport.from_date).toDate()
                    : undefined
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoAdmissionReport.user_id === null
                    ? { id: 'ALL', text: 'All Students' }
                    : { id: state.dtoAdmissionReport.user_id, text: state.dtoAdmissionReport.user_name }
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
                    label="Student"
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
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoAdmissionReport.course_id === null
                    ? { id: 'ALL', text: 'All Classes' }
                    : { id: state.dtoAdmissionReport.course_id, text: state.dtoAdmissionReport.course_name }
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
          </MyGrid>
        </MyBox>
      </MyLocalizationProvider>
      <MyCard>
        <MyCardContent sx={{ overflowX: 'auto' }}>
          <div style={{ minWidth: `${columns.length * 150}px` }}>
            <MyDataGrid
              apiRef={apiRef}
              rowSelectionModel={state.arrSelectedId}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              onRowSelectionModelChange={onCheckChange}
              rows={state.arrAdmissionReportDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              // showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 22)}
              showExportButton={false}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientAdmSummaryList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
