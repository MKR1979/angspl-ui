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
import MyPrintIcon from '@/app/custom-components/MyPrintIcon';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import useAdmissionList from './useAdmissionList'
import AdmissionDTO from '@/app/types/AdmissionDTO';

type Props = {
  arrAdmissionDTO: AdmissionDTO[];
  total_records: number;
};
const ClientAdmissionList = ({ arrAdmissionDTO, total_records }: Props) => {
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
    handlePrint,
    onDeleteSingleClose
  } = useAdmissionList({ arrAdmissionDTO, total_records });
 
    const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/admissions/view/' + params.row.id}>{params.row.course_name}</MyLink>,
        []
      )
    },
    {
      field: 'admission_date',
      headerName: 'Admission Date',
      flex: 1
    },    
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 1
    },
    {
      field: 'phone_no',
      headerName: 'Phone no',
      flex: 1
    },
    {
      field: 'dob',
      headerName: 'DOB',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1
    },
    {
      field: 'city_name',
      headerName: 'City Name',
      flex: 1
    },
    {
      field: 'country_name',
      headerName: 'Country Name',
      flex: 1
    },
  ];
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyDataGrid
            apiRef={apiRef}
            rowSelectionModel={state.arrSelectedId}
            initialStateModel={state.initialState}
            sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
            onSortModelChange={onSortChange}
            onRowSelectionModelChange={onCheckChange}
            rows={state.arrAdmissionDTO}
            rowCount={state.total_records}
            columns={columns}
            loading={state.isLoading}
            handleContextMenu={handleContextMenu}
            onAddClick={onAddClick}
            showAddButton={true}
            onDeleteClick={onDeleteAllClick}
            showDeleteButton={state.arrSelectedId.length > 0}
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
            <MyMenuItem onClick={handlePrint}>
              <MyPrintIcon />
              Print
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

export default memo(ClientAdmissionList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
