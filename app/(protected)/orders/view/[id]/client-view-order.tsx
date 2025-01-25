'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewOrder from './useViewOrder';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import OrderDTO from '@/app/types/OrderDTO';
import { getLocalTime, numberFormat, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';

type Props = {
  dtoOrder: OrderDTO;
};

const ClientViewOrder = ({ dtoOrder }: Props) => {
  const { apiRef, state, paginationModel, setPaginationModel, onEditClick, onCancelClick, handleTabChange } = useViewOrder({ dtoOrder });
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
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
        (value: any) => (value ? state.dtoOrder.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoOrder.currency_symbol]
      )
    },
    {
      field: 'discount_amount',
      headerName: 'Discount Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoOrder.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoOrder.currency_symbol]
      )
    },
    {
      field: 'tax_amount',
      headerName: 'Tax Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoOrder.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoOrder.currency_symbol]
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: useCallback(
        (value: any) => (value ? state.dtoOrder.currency_symbol + numberFormat(Number(value), 2) : ''),
        [state.dtoOrder.currency_symbol]
      )
    },
    {
      field: 'lead_time',
      headerName: 'Lead Time',
      flex: 1
    }
  ];
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
            <MyTab icon={<MyHistoryIcon />} label="Billing Address" />
            <MyTab icon={<MyHistoryIcon />} label="Shipping Address" />
          </MyTabs>
          <MyTabPanel value={state.tabIndex} index={0}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Order #:</MyTypography>
                <MyTypography>{state.dtoOrder.order_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Order Date:</MyTypography>
                <MyTypography>
                  {dayjs(getLocalTime(state.dtoOrder.order_date)).format('MM/DD/YYYY') == '12/31/1899'
                    ? ''
                    : dayjs(getLocalTime(state.dtoOrder.order_date)).format('MM/DD/YYYY')}
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Customer:</MyTypography>
                <MyTypography>{state.dtoOrder.customer_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Sales Person:</MyTypography>
                <MyTypography>{state.dtoOrder.sales_person_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Contact Person:</MyTypography>
                <MyTypography>{state.dtoOrder.contact_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Due Date:</MyTypography>
                <MyTypography>
                  {dayjs(getLocalTime(state.dtoOrder.due_date)).format('MM/DD/YYYY') == '12/31/1899'
                    ? ''
                    : dayjs(getLocalTime(state.dtoOrder.due_date)).format('MM/DD/YYYY')}
                </MyTypography>
              </MyGrid>

              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Customer Ref #:</MyTypography>
                <MyTypography>{state.dtoOrder.customer_ref_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Incoterm:</MyTypography>
                <MyTypography>{state.dtoOrder.incoterm_description}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Terms:</MyTypography>
                <MyTypography>{state.dtoOrder.term_description}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Currency Name:</MyTypography>
                <MyTypography>{state.dtoOrder.currency_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Status:</MyTypography>
                <MyTypography>{state.dtoOrder.status}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Notes:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoOrder.notes)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12 }}>
                <MyDataGrid
                  apiRef={apiRef}
                  checkboxSelection={false}
                  initialStateModel={state.initialState}
                  rows={state.items.filter((item) => item.deleted == false)}
                  columns={columns}
                  rowCount={state.items.filter((item) => item.deleted == false).length}
                  showAddButton={false}
                  showDeleteButton={false}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  getRowId={(row) => row.item_no}
                />
              </MyGrid>
              <MyGrid size={{ xs: 0, sm: 6 }}></MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyGrid container spacing={2}>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Total Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.total_amount, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Discount Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.discount_amount, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Sub Total Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.sub_total_amount, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Tax Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.tax_amount, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Shipping Charges:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.shipping_charges, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Shipping Tax Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.shipping_tax_amount, 2)}
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 9 }} sx={{ textAlign: 'right' }}>
                    <MyTypography variant="subtitle2">Grand Total Amount:</MyTypography>
                  </MyGrid>
                  <MyGrid size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'right' }}>
                    {state.dtoOrder.currency_symbol + numberFormat(state.dtoOrder.grand_total_amount, 2)}
                  </MyGrid>
                </MyGrid>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={1}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Address:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoOrder.billing_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoOrder.billing_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoOrder.billing_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoOrder.billing_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoOrder.billing_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={2}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Address:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoOrder.shipping_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoOrder.shipping_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoOrder.shipping_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoOrder.shipping_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoOrder.shipping_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoOrder.created_by_user_name}
          createdAt={state.dtoOrder.created_at}
          modifiedBy={state.dtoOrder.modified_by_user_name}
          modifiedAt={state.dtoOrder.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewOrder, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
