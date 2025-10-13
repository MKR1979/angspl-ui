'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyMenu from '@/app/custom-components/MyMenu';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import useEnrollmentList from './useEnrollmentList';
import EnrollmentDTO from '@/app/types/EnrollmentDTO';
import { useSelector } from '../../../store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrEnrollmentDTO: EnrollmentDTO[];
  total_records: number;
};
const ClientEnrollmentList = ({ arrEnrollmentDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onDeleteClick,
    onEditClick,
    onAddClick,
    onDeleteAllClick,
    onSortChange,
    toggleDialog,
    DeleteSingle,
    DeleteSelected,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    onRowDoubleClick,
    onDeleteSingleClose,
    // onCalendarViewClick
  } = useEnrollmentList({ arrEnrollmentDTO, total_records });

    const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'user_name',
      headerName: 'User Name',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/enrollments/view/' + params.row.id}>{params.row.user_name}</MyLink>,
        []
      )
    },
    {
      field: 'enrollment_date',
      headerName: 'Start Date',
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
      field: 'end_date',
      headerName: 'End Date',
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
      field: 'course_name',
      headerName: 'Course',
      flex: 1
    },
    {
      field: 'paid_amount',
      headerName: 'Paid Amount',
      flex: 1,
      //valueFormatter: useCallback((value: any, row: any) => (value ? row.paid_amount + numberFormat(Number(value), 2) : ''), [])
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
  ];

  return (
    <>
      <MyBreadcrumbs
        items={state.breadcrumbsItems}
      ></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyDataGrid
            apiRef={apiRef}
            rowSelectionModel={state.arrSelectedId}
            initialStateModel={state.initialState}
            sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
            onSortModelChange={onSortChange}
            onRowSelectionModelChange={onCheckChange}
            rows={state.arrEnrollmentDTO}
            rowCount={state.total_records}
            columns={columns}
            loading={state.isLoading}
            handleContextMenu={handleContextMenu}
            onAddClick={onAddClick}
            showAddButton={true}
            onDeleteClick={onDeleteAllClick}
            showDeleteButton={state.arrSelectedId.length > 0}
            showExportButton={true}
            onFilterModelChange={onFilterModelChange}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowDoubleClick={onRowDoubleClick}
          />

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
            <MyMenuItem onClick={onEditClick}>
              <MyEditIcon />
              Edit
            </MyMenuItem>
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
          title="Confirm Enrollment Removal"
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
          title="Confirm Enrollment Removal"
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

export default memo(ClientEnrollmentList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
