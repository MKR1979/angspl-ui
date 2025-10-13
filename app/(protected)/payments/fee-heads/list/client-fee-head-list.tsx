'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useFeeHeadList from './useFeeHeadList';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import MyTypography from '@/app/custom-components/MyTypography';
import MyMenu from '@/app/custom-components/MyMenu';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import * as Constants from '../../../constants/constants';

type Props = {
  arrFeeHeadDTO: FeeHeadDTO[];
  total_records: number;
};
const ClientFeeHeadList = ({ arrFeeHeadDTO, total_records }: Props) => {
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
    toggleDialog,
    DeleteSelected,
    onDeleteSingleClose,
    DeleteSingle,
    onDeleteClick,
    onEditClick,
    onContextMenu,
    handleClose,
    onDeleteAllClick,
    onRowDoubleClick,
  } = useFeeHeadList({ arrFeeHeadDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 79) ? (
            <MyLink href={`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/view/` + params.row.id}>{params.row.name}</MyLink>
          ) : (
            <span>{params.row.name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'category_name',
      headerName: 'Category Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'base_amount',
      headerName: 'Base Amount',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150
    },
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
              rows={state.arrFeeHeadDTO}
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
              onRowDoubleClick={onRowDoubleClick}
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

export default memo(ClientFeeHeadList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
