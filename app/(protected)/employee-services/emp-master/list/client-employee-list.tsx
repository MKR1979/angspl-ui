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
import useEmployeeList from './useEmployeeList';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import * as Constants from '../../../constants/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
dayjs.extend(utc);

type Props = {
  arrEmpMasterDTO: EmpMasterDTO[];
  total_records: number;
};
const ClientEmployeeList = ({ arrEmpMasterDTO, total_records }: Props) => {
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
    onDeleteSingleClose
  } = useEmployeeList({ arrEmpMasterDTO, total_records });

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
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 217) ? (
            <MyLink href={`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/view/` + params.row.id}>{params.row.first_name}</MyLink>
          ) : (
            <span>{params.row.first_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'joining_date',
      headerName: 'Joining Date',
      flex: 1,
      minWidth: 150,
      // renderCell: (params: GridRenderCellParams) => {
      //   if (!params.value) return '';
      //   const date = new Date(params.value);
      //   return date.toISOString().split('T')[0];
      // }
      renderCell: (params: GridRenderCellParams) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('DD/MM/YYYY');
        if (formattedDate === '31/12/1899') return '';
        return formattedDate;
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'phone_no',
      headerName: 'Phone no',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'dob',
      headerName: 'Date Of Birth',
      flex: 1,
      minWidth: 150,
      // renderCell: (params: GridRenderCellParams) => {
      //   if (!params.value) return '';
      //   const date = new Date(params.value);
      //   return date.toISOString().split('T')[0];
      // }
      renderCell: (params: GridRenderCellParams) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('DD/MM/YYYY');
        if (formattedDate === '31/12/1899') return '';
        return formattedDate;
      }
    },
    {
      field: 'department_type',
      headerName: 'Department Type',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'experience',
      headerName: 'Experience',
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
              rows={state.arrEmpMasterDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 214)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 215)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 216) || findPermission(userPermissions, 215)) && (
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
              {findPermission(userPermissions, 216) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 215) && (
                <MyMenuItem onClick={onDeleteClick}>
                  <MyClearIcon />
                  Delete
                </MyMenuItem>
              )}
            </MyMenu>
          )}
        </MyCardContent>
      </MyCard>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm admission Removal"
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
          title="Confirm admission Removal"
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

export default memo(ClientEmployeeList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
