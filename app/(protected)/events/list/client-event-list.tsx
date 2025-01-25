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
import useEventList from './useEventList';
import EventDTO from '@/app/types/EventDTO';
import { getLocalTime, numberFormat } from '@/app/common/Configuration';
import dayjs from 'dayjs';
import MyButton from '@/app/custom-components/MyButton';

type Props = {
  arrEventDTO: EventDTO[];
  total_records: number;
};
const ClientEventList = ({ arrEventDTO, total_records }: Props) => {
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
    onCalendarViewClick
  } = useEventList({ arrEventDTO, total_records });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'event_name',
      headerName: 'Event Name',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/events/view/' + params.row.id}>{params.row.event_name}</MyLink>,
        []
      )
    },
    {
      field: 'start_date_time',
      headerName: 'Start Time',
      flex: 1,
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY hh:mm a'),
        []
      )
    },
    {
      field: 'end_date_time',
      headerName: 'End Time',
      flex: 1,
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY hh:mm a'),
        []
      )
    },
    {
      field: 'location_name',
      headerName: 'Location',
      flex: 1
    },
    {
      field: 'budget',
      headerName: 'Budget',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      valueFormatter: useCallback((value: any, row: any) => (value ? row.currency_symbol + numberFormat(Number(value), 2) : ''), [])
    },
    {
      field: 'assigned_to_user_name',
      headerName: 'Assigned To',
      flex: 1
    }
  ];

  return (
    <>
      <MyBreadcrumbs
        items={state.breadcrumbsItems}
        secondary={<MyButton onClick={onCalendarViewClick}>Calendar View</MyButton>}
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
            rows={state.arrEventDTO}
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
          title="Confirm Event Removal"
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
          title="Confirm Event Removal"
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

export default memo(ClientEventList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
