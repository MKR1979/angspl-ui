'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useDeliverySlipEntry from './useDeliverySlipEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import DeliverySlipDTO from '@/app/types/DeliverySlipDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { arrDiscountType, arrLeadTime, arrDeliverySlipStatus, getLocalTime, numberFormat } from '@/app/common/Configuration';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyMenu from '@/app/custom-components/MyMenu';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import { GridColDef } from '@mui/x-data-grid';
import MyDialog from '@/app/custom-components/MyDialog';
import MyDialogTitle from '@/app/custom-components/MyDialogTitle';
import MyIconButton from '@/app/custom-components/MyIconButton';
import MyCloseIcon from '@/app/custom-components/MyCloseIcon';
import MyDialogContent from '@/app/custom-components/MyDialogContent';
import MyDialogActions from '@/app/custom-components/MyDialogActions';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import MyBox from '@/app/custom-components/MyBox';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';

type DeliverySlipEntryProps = {
  dtoDeliverySlip: DeliverySlipDTO;
  arrAccountLookup: LookupDTO[];
  arrIncotermLookup: LookupDTO[];
  arrTermLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrTaxLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
};

const DeliverySlipEntry = (props: DeliverySlipEntryProps) => {
  const {
    apiRef,
    paginationModel,
    setPaginationModel,
    state,
    onInputChange,
    onInputChange1,
    onCustomerNameChange,
    onContactNameChange,
    onIncotermChange,
    onTermChange,
    onCurrencyNameChange,
    onStatusChange,
    onDeliverySlipDateChange,
    onDueDateChange,
    onProductNameChange,
    onUnitNameChange,
    onDiscountTypeChange,
    onTaxChange,
    onTax1Change,
    onLeadTimeChange,
    onBillingStateNameChange,
    onBillingCountryNameChange,
    onShippingStateNameChange,
    onShippingCountryNameChange,
    onDeliverySlipDateBlur,
    onCustomerNameBlur,
    onContactNameBlur,
    onCurrencyNameBlur,
    onStatusBlur,
    onBillingAddressBlur,
    onBillingCityNameBlur,
    onBillingStateNameBlur,
    onBillingCountryNameBlur,
    onBillingZipCodeBlur,
    onShippingAddressBlur,
    onShippingCityNameBlur,
    onShippingStateNameBlur,
    onShippingCountryNameBlur,
    onShippingZipCodeBlur,
    onProductNameBlur,
    onQtyBlur,
    onPriceBlur,
    onLeadTimeBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen7,
    setClose7,
    setOpen8,
    setClose8,
    setOpen9,
    setClose9,
    setOpen10,
    setClose10,
    setOpen11,
    setClose11,
    setOpen12,
    setClose12,
    setOpen13,
    setClose13,
    setOpen14,
    setClose14,
    setOpen15,
    setClose15,
    setOpen16,
    setClose16,
    onAddClick,
    onDeleteAllClick,
    onCheckChange,
    rowDoubleClick,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onEditClick,
    onDeleteClick,
    onClosePopup,
    onClose,
    toggleDialog,
    toggleDialog1,
    DeleteSelected,
    DeleteSingle,
    onOKClick,
    handleTabChange,
    onCopyClick
  } = useDeliverySlipEntry(props);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 70
    },
    {
      field: 'item_no',
      headerName: 'Item #',
      width: 70
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      flex: 1
    },
    {
      field: 'unit_name',
      headerName: 'Unit',
      flex: 1
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      width: 80,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback((value: any) => (value ? numberFormat(Number(value), 2) : ''), [])
    },
    {
      field: 'price',
      headerName: 'Unit Price',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoDeliverySlip.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoDeliverySlip.currency_symbol]
      )
    },
    {
      field: 'discount_amount',
      headerName: 'Discount Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoDeliverySlip.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoDeliverySlip.currency_symbol]
      )
    },
    {
      field: 'tax_amount',
      headerName: 'Tax Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoDeliverySlip.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoDeliverySlip.currency_symbol]
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoDeliverySlip.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoDeliverySlip.currency_symbol]
      )
    },
    {
      field: 'lead_time',
      headerName: 'Lead Time',
      flex: 1
    }
  ];
  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
            <MyTab icon={<MyHistoryIcon />} label="Billing Address" />
            <MyTab icon={<MyHistoryIcon />} label="Shipping Address" />
          </MyTabs>
          <MyTabPanel value={state.tabIndex} index={0}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Delivery Slip #"
                  name="delivery_slip_no"
                  value={state.dtoDeliverySlip.delivery_slip_no}
                  onChange={onInputChange}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="Delivery Slip Date"
                  onChange={onDeliverySlipDateChange}
                  value={
                    dayjs(getLocalTime(state.dtoDeliverySlip.delivery_slip_date)).format('MM/DD/YYYY') === '12/31/1899'
                      ? null
                      : dayjs(getLocalTime(state.dtoDeliverySlip.delivery_slip_date)).toDate()
                  }
                  onBlur={onDeliverySlipDateBlur}
                  error={state.errorMessages.delivery_slip_date ? true : false}
                ></MyDatePicker>
                <MyTypography className="error"> {state.errorMessages.delivery_slip_date}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{ id: state.dtoDeliverySlip.customer_id, text: state.dtoDeliverySlip.customer_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrAccountLookup}
                  onChange={onCustomerNameChange}
                  onBlur={onCustomerNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Customer"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onCustomerNameBlur}
                      error={state.errorMessages.customer_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.customer_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{ id: state.dtoDeliverySlip.contact_id, text: state.dtoDeliverySlip.contact_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrContactLookup}
                  onChange={onContactNameChange}
                  onBlur={onContactNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Contact Person"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onContactNameBlur}
                      error={state.errorMessages.contact_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.contact_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="Due Date"
                  onChange={onDueDateChange}
                  value={
                    dayjs(getLocalTime(state.dtoDeliverySlip.due_date)).format('MM/DD/YYYY') === '12/31/1899'
                      ? null
                      : dayjs(getLocalTime(state.dtoDeliverySlip.due_date)).toDate()
                  }
                ></MyDatePicker>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Customer Ref #"
                  name="customer_ref_no"
                  value={state.dtoDeliverySlip.customer_ref_no}
                  onChange={onInputChange}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open4}
                  onOpen={setOpen4}
                  onClose={setClose4}
                  value={{ id: state.dtoDeliverySlip.incoterm_id, text: state.dtoDeliverySlip.incoterm_description }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrIncotermLookup}
                  onChange={onIncotermChange}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Incoterm"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open5}
                  onOpen={setOpen5}
                  onClose={setClose5}
                  value={{ id: state.dtoDeliverySlip.term_id, text: state.dtoDeliverySlip.term_description }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrTermLookup}
                  onChange={onTermChange}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Term"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open11}
                  onOpen={setOpen11}
                  onClose={setClose11}
                  value={{
                    id: state.dtoDeliverySlip.currency_id,
                    text: state.dtoDeliverySlip.currency_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCurrencyLookup}
                  onChange={onCurrencyNameChange}
                  onBlur={onCurrencyNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Currency Name"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onCurrencyNameBlur}
                      error={state.errorMessages.currency_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.currency_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open16}
                  onOpen={setOpen16}
                  onClose={setClose16}
                  value={{
                    text: state.dtoDeliverySlip.status
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ text: '' }}
                  options={arrDeliverySlipStatus}
                  onChange={onStatusChange}
                  onBlur={onStatusBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Status"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onStatusBlur}
                      error={state.errorMessages.status ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField multiline rows={5} label="Notes" name="notes" value={state.dtoDeliverySlip.notes} onChange={onInputChange} />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12 }}>
                <MyDataGrid
                  apiRef={apiRef}
                  initialStateModel={state.initialState}
                  rowSelectionModel={state.arrSelectedId}
                  rows={state.items.filter((item) => item.deleted == false)}
                  columns={columns}
                  rowCount={state.items.filter((item) => item.deleted == false).length}
                  onAddClick={onAddClick}
                  showAddButton={true}
                  onDeleteClick={onDeleteAllClick}
                  showDeleteButton={state.arrSelectedId.length > 0}
                  onRowSelectionModelChange={onCheckChange}
                  onRowDoubleClick={rowDoubleClick}
                  handleContextMenu={handleContextMenu}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  getRowId={(row) => row.item_no}
                />
                <MyMenu
                  open={state.contextMenu !== null}
                  onClose={handleClose}
                  anchorReference="anchorPosition"
                  anchorPosition={
                    state.contextMenu !== null ? { top: state.contextMenu.mouseY, left: state.contextMenu.mouseX } : undefined
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
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Total Amount"
                  value={numberFormat(state.dtoDeliverySlip.total_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Discount Amount"
                  value={numberFormat(state.dtoDeliverySlip.discount_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Sub Total Amount"
                  value={numberFormat(state.dtoDeliverySlip.sub_total_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Tax Amount"
                  value={numberFormat(state.dtoDeliverySlip.tax_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Shipping Charges"
                  name="shipping_charges"
                  value={state.dtoDeliverySlip.shipping_charges}
                  onChange={onInputChange}
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyBox sx={{ display: 'flex' }}>
                  <MyAutocomplete
                    open={state.open10}
                    onOpen={setOpen10}
                    onClose={setClose10}
                    value={{ id: state.dtoDeliverySlip.shipping_tax_id, text: state.dtoDeliverySlip.shipping_tax_description }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrTaxLookup}
                    onChange={onTax1Change}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Shipping Tax"
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                      />
                    )}
                    sx={{ mr: 1 }}
                  />
                  <MyTextField
                    label="Shipping Tax Amount"
                    value={numberFormat(state.dtoDeliverySlip.shipping_tax_amount, 2)}
                    disabled
                    slotProps={{
                      input: {
                        inputComponent: MyNumericFormat as any,
                        inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                      }
                    }}
                  />
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Grand Total Amount"
                  value={numberFormat(state.dtoDeliverySlip.grand_total_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={1}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  multiline
                  rows={3}
                  label="Address"
                  name="billing_address"
                  value={state.dtoDeliverySlip.billing_address}
                  onChange={onInputChange}
                  onBlur={onBillingAddressBlur}
                  error={state.errorMessages.billing_address ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.billing_address}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="City"
                  name="billing_city_name"
                  value={state.dtoDeliverySlip.billing_city_name}
                  onChange={onInputChange}
                  onBlur={onBillingCityNameBlur}
                  error={state.errorMessages.billing_city_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.billing_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open12}
                  onOpen={setOpen12}
                  onClose={setClose12}
                  value={{ id: state.dtoDeliverySlip.billing_state_id, text: state.dtoDeliverySlip.billing_state_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrBillingStateLookup}
                  onChange={onBillingStateNameChange}
                  onBlur={onBillingStateNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="State"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onBillingStateNameBlur}
                      error={state.errorMessages.billing_state_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.billing_state_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open13}
                  onOpen={setOpen13}
                  onClose={setClose13}
                  value={{ id: state.dtoDeliverySlip.billing_country_id, text: state.dtoDeliverySlip.billing_country_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCountryLookup}
                  onChange={onBillingCountryNameChange}
                  onBlur={onBillingCountryNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Country"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onBillingCountryNameBlur}
                      error={state.errorMessages.billing_country_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.billing_country_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Zip Code"
                  name="billing_zip_code"
                  value={state.dtoDeliverySlip.billing_zip_code}
                  onChange={onInputChange}
                  onBlur={onBillingZipCodeBlur}
                  error={state.errorMessages.billing_zip_code ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.billing_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={2}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyButton onClick={onCopyClick}>Copy from Billing Address</MyButton>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  multiline
                  rows={3}
                  label="Address"
                  name="shipping_address"
                  value={state.dtoDeliverySlip.shipping_address}
                  onChange={onInputChange}
                  onBlur={onShippingAddressBlur}
                  error={state.errorMessages.shipping_address ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.shipping_address}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="City"
                  name="shipping_city_name"
                  value={state.dtoDeliverySlip.shipping_city_name}
                  onChange={onInputChange}
                  onBlur={onShippingCityNameBlur}
                  error={state.errorMessages.shipping_city_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.shipping_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open14}
                  onOpen={setOpen14}
                  onClose={setClose14}
                  value={{ id: state.dtoDeliverySlip.shipping_state_id, text: state.dtoDeliverySlip.shipping_state_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrShippingStateLookup}
                  onChange={onShippingStateNameChange}
                  onBlur={onShippingStateNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="State"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onShippingStateNameBlur}
                      error={state.errorMessages.shipping_state_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.shipping_state_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open15}
                  onOpen={setOpen15}
                  onClose={setClose15}
                  value={{ id: state.dtoDeliverySlip.shipping_country_id, text: state.dtoDeliverySlip.shipping_country_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCountryLookup}
                  onChange={onShippingCountryNameChange}
                  onBlur={onShippingCountryNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Country"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onShippingCountryNameBlur}
                      error={state.errorMessages.shipping_country_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.shipping_country_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Zip Code"
                  name="shipping_zip_code"
                  value={state.dtoDeliverySlip.shipping_zip_code}
                  onChange={onInputChange}
                  onBlur={onShippingZipCodeBlur}
                  error={state.errorMessages.shipping_zip_code ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.shipping_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
        </MyCardContent>
        <MyDivider></MyDivider>
        <MyCardActions>
          <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
            Save
          </MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
      <MyDialog
        open={state.openPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <MyDialogTitle> {state.dtoDeliverySlipItem.item_no > 0 ? 'Edit' : 'Add'} Delivery Slip Item</MyDialogTitle>
        <MyIconButton
          aria-label="close"
          onClick={onClosePopup}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <MyCloseIcon />
        </MyIconButton>
        <MyDialogContent style={{ paddingTop: '10px', height: 'auto' }}>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoDeliverySlipItem.product_id, text: state.dtoDeliverySlipItem.product_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrProductLookup}
                onChange={onProductNameChange}
                onBlur={onProductNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Product Name"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onProductNameBlur}
                    error={state.errorMessages1.product_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages1.product_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Product Code" name="productcode" value={state.dtoDeliverySlipItem.part_number} disabled={true} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open7}
                onOpen={setOpen7}
                onClose={setClose7}
                value={{ id: state.dtoDeliverySlipItem.unit_id, text: state.dtoDeliverySlipItem.unit_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUnitLookup}
                onChange={onUnitNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Unit"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Quantity"
                name="qty"
                value={state.dtoDeliverySlipItem.qty}
                onChange={onInputChange1}
                onBlur={onQtyBlur}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any
                  }
                }}
                error={state.errorMessages1.qty ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages1.qty}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Price"
                name="price"
                value={state.dtoDeliverySlipItem.price}
                onChange={onInputChange1}
                onBlur={onPriceBlur}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any,
                    inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                  }
                }}
                error={state.errorMessages1.price ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages1.price}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyBox sx={{ display: 'flex' }}>
                <MyAutocomplete
                  open={state.open8}
                  onOpen={setOpen8}
                  onClose={setClose8}
                  value={{ text: state.dtoDeliverySlipItem.discount_type }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ text: '' }}
                  options={arrDiscountType}
                  onChange={onDiscountTypeChange}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Discount Type"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                  sx={{ mr: 1 }}
                />
                <MyTextField
                  label="Discount"
                  name="discount"
                  value={state.dtoDeliverySlipItem.discount}
                  onChange={onInputChange1}
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: {
                        prefix: state.dtoDeliverySlipItem.discount_type === 'Fixed' ? state.dtoDeliverySlip.currency_symbol : '',
                        suffix: state.dtoDeliverySlipItem.discount_type === 'Fixed' ? '' : '%'
                      }
                    }
                  }}
                  sx={{ mr: 1 }}
                />
                <MyTextField
                  label="Discount Amount"
                  value={numberFormat(state.dtoDeliverySlipItem.discount_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyBox sx={{ display: 'flex' }}>
                <MyAutocomplete
                  open={state.open9}
                  onOpen={setOpen9}
                  onClose={setClose9}
                  value={{ id: state.dtoDeliverySlipItem.tax_id, text: state.dtoDeliverySlipItem.tax_description }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrTaxLookup}
                  onChange={onTaxChange}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Tax"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                  sx={{ mr: 1 }}
                />
                <MyTextField
                  label="Tax Amount"
                  value={numberFormat(state.dtoDeliverySlipItem.tax_amount, 2)}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                    }
                  }}
                />
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Amount"
                name="amount"
                value={numberFormat(state.dtoDeliverySlipItem.amount, 2)}
                disabled={true}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any,
                    inputProps: { prefix: state.dtoDeliverySlip.currency_symbol }
                  }
                }}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                freeSolo
                disableClearable
                options={arrLeadTime}
                value={state.dtoDeliverySlipItem.lead_time}
                onChange={onLeadTimeChange}
                onBlur={onLeadTimeBlur}
                renderInput={useCallback(
                  (params) => (
                    <MyTextField
                      {...params}
                      label="Lead Time"
                      name="lead_time"
                      onChange={onInputChange1}
                      onBlur={onLeadTimeBlur}
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  ),
                  []
                )}
              />
              <MyTypography className="error">{state.errorMessages1.lead_time}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyDialogContent>
        <MyDialogActions>
          <MyButton variant="text" onClick={onClosePopup}>
            Cancel
          </MyButton>
          <MyButton onClick={onOKClick}>OK</MyButton>
        </MyDialogActions>
      </MyDialog>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm Delivery Slip Item Removal"
          onNoClick={toggleDialog}
          onYesClick={DeleteSelected}
          onClose={toggleDialog}
        >
          <MyTypography variant="body1"> Are you sure you want to delete this Delivery Slip item? This cannot be undone.</MyTypography>
        </MyConfirmDialog>
      )}
      {state.visibleDialog1.visibility && (
        <MyConfirmDialog
          open={state.visibleDialog1.visibility}
          title="Confirm Delivery Slip Item Removal"
          onNoClick={() => {
            toggleDialog1(0);
          }}
          onYesClick={DeleteSingle}
          onClose={() => {
            toggleDialog1(0);
          }}
        >
          <MyTypography variant="body1">Are you sure you want to delete this Delivery Slip item? This cannot be undone.</MyTypography>
        </MyConfirmDialog>
      )}
    </MyLocalizationProvider>
  );
};

export default memo(DeliverySlipEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
