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
import useReferralList from './useReviewReferralList';
import ReferralDTO from '@/app/types/ReferralDTO';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import * as Constants from '../../../constants/constants';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

type Props = {
  arrReferralDTO: ReferralDTO[];
  total_records: number;
};
const ClientReferralList = ({ arrReferralDTO, total_records }: Props) => {
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
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteSingleClose,
    VerifySelected
  } = useReferralList({ arrReferralDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'referral_company_name',
      headerName: 'Company Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 208) ? (
            <MyLink href={`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/view/` + params.row.id}>
              {params.row.referral_company_name}
            </MyLink>
          ) : (
            <span>{params.row.referral_company_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'referral_date',
      headerName: 'Referral Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const dt = dayjs.utc(params.row.referral_date); // do NOT convert to local
        return <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{dt.format('DD-MM-YYYY hh:mma')}</MyTypography>;
      }
    },
    {
      field: 'contact_person',
      headerName: 'Contact Person',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'mobile_no',
      headerName: 'Phone No.',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'product_interest',
      headerName: 'Product Interest',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'requirement',
      headerName: 'Requirement',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'referred_by_combined',
      headerName: 'Referred By',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const name = params.row.referred_by_name || '';
        const id = params.row.referred_by || '';
        return `${name} (${id})`;
      }
    },
    {
      field: 'received_amount',
      headerName: 'Received Amount',
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
      {/* <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <MyBreadcrumbs items={state.breadcrumbsItems} />
        {findPermission(userPermissions, 210) && (
          <MyButton
            onClick={VerifySelected}
            disabled={state.arrSelectedId.length === 0}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              backgroundColor: state.arrSelectedId.length > 0 ? 'primary.main' : 'grey.300',
              color: state.arrSelectedId.length > 0 ? 'white' : 'grey.600',
              minWidth: { xs: '100px', sm: '130px' },
              fontSize: { xs: '0.60rem', sm: '0.800rem' },
              padding: { xs: '6px 12px', sm: '7px 14px' },
              mt: { xs: 4, sm: 4 },
              ':hover': {
                backgroundColor: state.arrSelectedId.length > 0 ? 'primary.dark' : 'grey.300'
              }
            }}
          >
            MARK VERIFIED
          </MyButton>
        )}
      </div>

      <MyLocalizationProvider>
        <MyBox sx={{ mb: '5px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoReferral.user_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoReferral.user_id, text: state.dtoReferral.user_name }
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
                    label="Affiliates"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDatePicker
                label="From Date"
                onChange={onFromDateChange}
                value={
                  dayjs(state.dtoReferral.from_date).format('YYYY-MM-DD') === '1899-12-31'
                    ? null
                    : dayjs(state.dtoReferral.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDatePicker
                label="To Date"
                onChange={onToDateChange}
                value={
                  //dayjs(state.dtoReferral.to_date).format('yyyy-mm-dd') === '12/31/1899'
                  dayjs(state.dtoReferral.to_date).format('YYYY-MM-DD') === '1899-12-31'
                    ? null
                    : dayjs(state.dtoReferral.to_date).toDate()
                }
                minDate={
                  state.dtoReferral.from_date && dayjs(state.dtoReferral.from_date).isValid()
                    ? dayjs(state.dtoReferral.from_date).toDate()
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
              rows={state.arrReferralDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 205)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 206)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 207) || findPermission(userPermissions, 206)) && (
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
              {findPermission(userPermissions, 207) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 206) && (
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
          title="Confirm Referral Removal"
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
          title="Confirm Referral Removal"
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

export default memo(ClientReferralList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
