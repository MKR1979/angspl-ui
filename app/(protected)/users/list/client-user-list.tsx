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
import useUserList from './useUserList';
import UserDTO from '@/app/types/UserDTO';
import MyAvatar from '@/app/custom-components/MyAvatar';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission'; 

type Props = {
  arrUserDTO: UserDTO[];
  total_records: number;
};
const ClientUserList = ({ arrUserDTO, total_records }: Props) => {
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
  } = useUserList({ arrUserDTO, total_records });
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 32,
        height: 32,
        fontSize: 14
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'image_url',
      headerName: 'Photo',
      flex: 1,
      minWidth: 100,
      width: 50,
      sortable: false,
      renderCell: useCallback(
        (params: GridRenderCellParams) => (
          <MyAvatar
            {...stringAvatar(params.row.first_name + ' ' + params.row.last_name)}
            src={process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + params.row.image_url}
          ></MyAvatar>
        ),
        [stringAvatar]
      )
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 194) ? (
            <MyLink href={`/users/view/${params.row.id}`}>{params.row.first_name}</MyLink>
          ) : (
            <span>{params.row.first_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'user_name',
      headerName: 'Username',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'email',
      headerName: 'E-Mail',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'mobile_no',
      headerName: 'Mobile #',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'role_name',
      headerName: 'Role',
      flex: 1,
      minWidth: 150
    },
        {
      field: 'type_name',
      headerName: 'Type',
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
          {/* <div style={{ minWidth: 800 }}> */}
          <div style={{ minWidth: `${columns.length * 150}px` }}>
            <MyDataGrid
              apiRef={apiRef}
              rowSelectionModel={state.arrSelectedId}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              onRowSelectionModelChange={onCheckChange}
              rows={state.arrUserDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 191)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 192)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 193) || findPermission(userPermissions, 192)) && (
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
            {findPermission(userPermissions, 193) && (
              <MyMenuItem onClick={onEditClick}>
                <MyEditIcon />
                Edit
              </MyMenuItem>
            )}

            {findPermission(userPermissions, 192) && (
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
          title="Confirm User Removal"
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
          title="Confirm User Removal"
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

export default memo(ClientUserList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
