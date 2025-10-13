'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyMenu from '@/app/custom-components/MyMenu';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import useUserDeviceList from './useUserDeviceList';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import * as Constants from '../../../constants/constants';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  arrUserDeviceDTO: UserDeviceDTO[];
  total_records: number;
};
const ClientUserDeviceList = ({ arrUserDeviceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onEditClick,
    onSortChange,
    toggleDialog,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    onRowDoubleClick,
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteClick,
    DeleteSingle,
    onDeleteAllClick,
    DeleteSelected,
    onDeleteSingleClose
  } = useUserDeviceList({ arrUserDeviceDTO, total_records });

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
          findPermission(userPermissions, 184) ? (
            <MyLink href={`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/view/` + params.row.id}>{params.row.name}</MyLink>
          ) : (
            <span>{params.row.name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'device_info',
      headerName: 'Device Info',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150
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
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoUserDevice.user_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoUserDevice.user_id, text: state.dtoUserDevice.name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                filterOptions={(options, state) => {
                  // searchable lookup
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
                    dayjs(state.dtoUserDevice.from_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoUserDevice.from_date).toDate()
                  }
                  maxDate={dayjs().toDate()}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="To Date"
                  onChange={onToDateChange}
                  value={
                    dayjs(state.dtoUserDevice.to_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoUserDevice.to_date).toDate()
                  }
                  minDate={
                    state.dtoUserDevice.from_date && dayjs(state.dtoUserDevice.from_date).isValid()
                      ? dayjs(state.dtoUserDevice.from_date).toDate()
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
          <div style={{ minWidth: `${columns.length * 150}px` }}>
            <MyDataGrid
              apiRef={apiRef}
              rowSelectionModel={state.arrSelectedId}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              onRowSelectionModelChange={onCheckChange}
              rows={state.arrUserDeviceDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 182)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 183) || findPermission(userPermissions, 182)) && (
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
              {findPermission(userPermissions, 183) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 182) && (
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
          title="Confirm User Device Removal"
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
          title="Confirm User Device Removal"
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

export default memo(ClientUserDeviceList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
