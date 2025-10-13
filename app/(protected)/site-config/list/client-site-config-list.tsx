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
import useSiteConfigList from './useSiteConfigList';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';

type Props = {
  arrSiteConfigDTO: SiteConfigDTO[];
  total_records: number;
};
const ClientSiteConfigList = ({ arrSiteConfigDTO, total_records }: Props) => {
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
    setClose1,
    setOpen1,
    onCompanyNameChange
  } = useSiteConfigList({ arrSiteConfigDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'key',
      headerName: 'Key',
      flex: 2,
      minWidth: 200,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 149) ? (
            <MyLink href={`/site-config/view/${params.row.id}?company_id=${params.row.company_id}`}>{params.row.key}</MyLink>
          ) : (
            <span>{params.row.key}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'value',
      headerName: 'Value',
      flex: 0.5,
      minWidth: 150
    },
    {
      field: 'company_name',
      headerName: 'Company Name',
      flex: 1.5,
      minWidth: 150
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.5,
      minWidth: 150
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
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
                //value={{ id: state.dtoSiteConfig.company_id, text: state.dtoSiteConfig.company_name }}
                value={
                  state.dtoSiteConfig.company_id === null
                    ? { id: 'ALL', text: 'All Companies' }
                    : { id: state.dtoSiteConfig.company_id, text: state.dtoSiteConfig.company_name }
                }
                getOptionLabel={(option: any) => option.text || ''}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCompanyLookup}
                onChange={onCompanyNameChange}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => <MyTextField {...params} label="Company" slotProps={{ inputLabel: { shrink: true } }} />}
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
              rows={state.arrSiteConfigDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 146)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 147)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 148) || findPermission(userPermissions, 147)) && (
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
              {findPermission(userPermissions, 148) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 147) && (
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
          title="Confirm SiteConfig Removal"
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
          title="Confirm SiteConfig Removal"
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

export default memo(ClientSiteConfigList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
