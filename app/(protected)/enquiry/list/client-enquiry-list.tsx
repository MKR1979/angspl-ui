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
import useEnquiryList from './useEnquiryList';
import ContactPointDTO from '@/app/types/ContactUsDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import EmailIcon from '@mui/icons-material/Email';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';
import MyButton from '@/app/custom-components/MyButton';

type Props = {
  arrContactPointDTO: ContactPointDTO[];
  total_records: number;
};
const ClientEnquiryList = ({ arrContactPointDTO, total_records }: Props) => {
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
    setClose1,
    setOpen1,
    setOpen2,
    setClose2,
    onToDateChange,
    onFromDateChange,
    onDeleteSingleClose,
    onEnquiryCategoryChange,
    onEmailTemplateNameBlur,
    onEmailTemplateNameChange,
    onSendEmail
  } = useEnquiryList({ arrContactPointDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const enquiryCategoryOptions = [{ id: -1, text: 'All' }, ...state.arrEnquiryCategoryType];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'contact_name',
      headerName: 'Contact Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 69) ? (
            <MyLink href={`/enquiry/view/` + params.row.id}>{params.row.contact_name}</MyLink>
          ) : (
            <span>{params.row.contact_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'subject',
      headerName: 'Subject',
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
      field: 'phone_no',
      headerName: 'Phone No',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'category_name',
      headerName: 'Category',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'can_contacted',
      headerName: 'Can Contacted',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (params.value ? 'Yes' : 'No')
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <MyBreadcrumbs items={state.breadcrumbsItems} />
        {findPermission(userPermissions, 131) && (
          <MyButton
            onClick={onSendEmail}
            startIcon={<EmailIcon />}
            disabled={state.arrSelectedId.length === 0}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              backgroundColor: state.arrSelectedId.length > 0 ? 'primary.main' : 'grey.300',
              color: state.arrSelectedId.length > 0 ? 'white' : 'grey.600',
              minWidth: { xs: '100px', sm: '170px' },
              fontSize: { xs: '0.60rem', sm: '0.800rem' },
              padding: { xs: '3px 6px', sm: '4px 8px' },
              mt: { xs: 4, sm: 4 },
              ':hover': {
                backgroundColor: state.arrSelectedId.length > 0 ? 'primary.dark' : 'grey.300'
              }
            }}
          >
            Send Email
          </MyButton>
        )}
      </div>

      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                // value={
                //   state.dtoContactPoint.category_name ? { text: state.dtoContactPoint.category_name } : state.arrEnquiryCategoryType[-1]
                // }
                value={enquiryCategoryOptions.find((item) => item.text === (state.dtoContactPoint.category_name || 'All')) || null}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrEnquiryCategoryType}
                onChange={onEnquiryCategoryChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Category Type"
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
                  dayjs(state.dtoContactPoint.from_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoContactPoint.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyDatePicker
                label="To Date"
                onChange={onToDateChange}
                value={
                  dayjs(state.dtoContactPoint.to_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoContactPoint.to_date).toDate()
                }
                minDate={
                  state.dtoContactPoint.from_date && dayjs(state.dtoContactPoint.from_date).isValid()
                    ? dayjs(state.dtoContactPoint.from_date).toDate()
                    : undefined
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{
                  id: state.dtoContactPoint.email_template_id,
                  text: state.dtoContactPoint.email_template_name || ""
                }}
                getOptionLabel={(option: any) => option?.text || ""}
                firstitem={{ id: 0, text: "" }}
                options={state.arrEmailTemplateLookup?.filter((o: any) => o && o.text) || []}
                onChange={onEmailTemplateNameChange}
                onBlur={onEmailTemplateNameBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) =>
                    option?.text?.toLowerCase().includes(searchTerm)
                  );
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="E-Mail Template"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={!!state.errorMessages.email_template_name}
                  />
                )}
              />
              <MyTypography className="error">
                {state.errorMessages.email_template_name}
              </MyTypography>
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
              rows={state.arrContactPointDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 67)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
          {findPermission(userPermissions, 67) && (
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
              {findPermission(userPermissions, 67) && (
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
          title="Confirm Enquiry Removal"
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
          title="Confirm Enquiry Removal"
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

export default memo(ClientEnquiryList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
