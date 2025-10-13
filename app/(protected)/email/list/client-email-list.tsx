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
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import useEmailList from './useEmailList';
import EmailDTO from '@/app/types/EmailDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  arrEmailDTO: EmailDTO[];
  total_records: number;
};
const ClientEmailList = ({ arrEmailDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onDeleteClick,
    onDeleteAllClick,
    onSortChange,
    toggleDialog,
    DeleteSingle,
    DeleteSelected,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    onToDateChange,
    onFromDateChange,
    onDeleteSingleClose,
  } = useEmailList({ arrEmailDTO, total_records });

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
      field: 'to_address',
      headerName: 'Recipient Email',
      flex: 1,
      minWidth: 250,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 225) ? (
            <MyLink href={`/email/view/` + params.row.id}>{params.row.to_address}</MyLink>
          ) : (
            <span>{params.row.to_address}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'subject',
      headerName: 'Email Subject',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'body',
      headerName: 'Template Body',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'template_name',
      headerName: 'Template Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'sent_at',
      headerName: 'Sent On',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (!params.value) return '';
        const formattedDate = dayjs(params.value).tz(customerTimezone).format('DD-MM-YYYY hh:mm A');
        if (formattedDate === '12/31/1899') return '';
        return dayjs(params.value).tz(customerTimezone).format('DD-MM-YYYY hh:mm A');
      }
    },
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>

      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="From Date"
                  onChange={onFromDateChange}
                  value={
                    dayjs(state.dtoEmail.from_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoEmail.from_date).toDate()
                  }
                  maxDate={dayjs().toDate()}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="To Date"
                  onChange={onToDateChange}
                  value={
                    dayjs(state.dtoEmail.to_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoEmail.to_date).toDate()
                  }
                  minDate={
                    state.dtoEmail.from_date && dayjs(state.dtoEmail.from_date).isValid()
                      ? dayjs(state.dtoEmail.from_date).toDate()
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
              rows={state.arrEmailDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 224)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
          {findPermission(userPermissions, 224) && (
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
          )}
        </MyCardContent>
      </MyCard>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm Email Removal"
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
          title="Confirm Email Removal"
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

export default memo(ClientEmailList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
