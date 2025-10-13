'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useFeeCollectionList from './useFeeCollectionList';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTypography from '@/app/custom-components/MyTypography';
import MyMenu from '@/app/custom-components/MyMenu';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import * as Constants from '../../../constants/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrFeeCollectionDTO: FeeCollectionDTO[];
  total_records: number;
};
const ClientCollectionList = ({ arrFeeCollectionDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onAddClick,
    onSortChange,
    handleContextMenu,
    onFilterModelChange,
    onUserNameChange,
    onFromDateChange,
    onToDateChange,
    onCourseNameChange,
    toggleDialog,
    DeleteSelected,
    onDeleteSingleClose,
    DeleteSingle,
    onDeleteClick,
    onContextMenu,
    handleClose,
    onDeleteAllClick,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2
  } = useFeeCollectionList({ arrFeeCollectionDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

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
          findPermission(userPermissions, 79) ? (
            <MyLink href={`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/view/` + params.row.id}>{params.row.course_name}</MyLink>
          ) : (
            <span>{params.row.course_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'student_name',
      headerName: 'Student Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'payment_date',
      headerName: 'Payment Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('MM/DD/YYYY');

        if (formattedDate === '12/31/1899') return '';

        return dayjs(params.value).tz(customerTimezone).format('DD-MM-YYYY');
      }
    },
    {
      field: 'payment_mode',
      headerName: 'Payment Mode',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'fee_amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 150
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
        <MyBox sx={{ mb: '5px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 4 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoFeeCollection.course_id === null
                    ? { id: 'ALL', text: 'All Courses' }
                    : { id: state.dtoFeeCollection.course_id, text: state.dtoFeeCollection.course_name }
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
                    label="Course"
                    placeholder="Select Class..."
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
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoFeeCollection.learner_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoFeeCollection.learner_id, text: state.dtoFeeCollection.student_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Student"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={state.errorMessages.student_name ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.student_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.5 }}>
              <MyDatePicker
                label="From Date"
                onChange={onFromDateChange}
                value={
                  dayjs(state.dtoFeeCollection.from_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? dayjs().subtract(1, 'month').toDate()
                    : dayjs(state.dtoFeeCollection.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.5 }}>
              <MyDatePicker
                label="To Date"
                onChange={onToDateChange}
                value={
                  dayjs(state.dtoFeeCollection.to_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoFeeCollection.to_date).toDate()
                }
                  minDate={
                  state.dtoFeeCollection.from_date && dayjs(state.dtoFeeCollection.from_date).isValid()
                    ? dayjs(state.dtoFeeCollection.from_date).toDate()
                    : undefined
                }
                maxDate={dayjs().toDate()}
              />
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
              rows={state.arrFeeCollectionDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              onDeleteClick={onDeleteAllClick}
              showAddButton={findPermission(userPermissions, 76)}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
          <MyMenu
            open={state.contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              state.contextMenu !== null
                ? {
                  top: state.contextMenu.mouseY,
                  left: state.contextMenu.mouseX
                }
                : undefined
            }
            slotProps={{
              root: {
                onContextMenu: onContextMenu
              }
            }}
          >
            <MyMenuItem onClick={onDeleteClick}>
              <MyClearIcon />
              Delete
            </MyMenuItem>
          </MyMenu>
        </MyCardContent>
      </MyCard>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm course Removal"
          onNoClick={toggleDialog}
          onYesClick={DeleteSelected}
          onClose={toggleDialog}
        >
          <MyTypography variant="body1"> Are you sure you want to delete this item? This cannot be undone.</MyTypography>
        </MyConfirmDialog>
      )}
      {state.visibleDialog1.visibility && (
        <MyConfirmDialog
          open={state.visibleDialog1.visibility}
          title="Confirm course Removal"
          onNoClick={onDeleteSingleClose}
          onYesClick={DeleteSingle}
          onClose={onDeleteSingleClose}
        >
          <MyTypography variant="body1">Are you sure you want to delete this item? This cannot be undone.</MyTypography>
        </MyConfirmDialog>
      )}
    </>
  );
};

export default memo(ClientCollectionList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});