'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewProduct from './useViewProduct';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import ProductDTO from '@/app/types/ProductDTO';
import accounting from 'accounting';
import MyImage from '@/app/custom-components/MyImage';
import { numberFormat, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { GridColDef } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';

type Props = {
  dtoProduct: ProductDTO;
};

const ClientViewProduct = ({ dtoProduct }: Props) => {
  const { apiRef, state, onEditClick, onCancelClick, paginationModel, setPaginationModel, onSortChange } = useViewProduct({ dtoProduct });
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'currency_name',
      headerName: 'Currency Name',
      flex: 1
    },
    {
      field: 'currency_symbol',
      headerName: 'Currency Symbol',
      flex: 1
    },
    {
      field: 'unit_price',
      headerName: 'Unit Price',
      headerAlign: 'right',
      align: 'right',
      type: 'number',
      valueFormatter: useCallback((value: any) => (value ? numberFormat(Number(value), 2) : ''), [])
    }
  ];
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 2 }}>
              <MyGrid size={{ xs: 12, sm: 12 }}>
                <MyBox sx={{ width: '175px' }}>
                  <MyImage
                    src={
                      state.dtoProduct.product_image.trim() == ''
                        ? '/default-image.avif'
                        : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoProduct.product_image
                    }
                    width={800}
                    height={800}
                    alt="image"
                    layout="intrinsic"
                  />
                </MyBox>
              </MyGrid>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 10 }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Product Name:</MyTypography>
                  <MyTypography>{state.dtoProduct.product_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Part Number:</MyTypography>
                  <MyTypography>{state.dtoProduct.part_number}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Product Category Name:</MyTypography>
                  <MyTypography>{state.dtoProduct.product_category_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Product Type:</MyTypography>
                  <MyTypography>{state.dtoProduct.product_type}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Currency Name:</MyTypography>
                  <MyTypography>{state.dtoProduct.currency_name + '(' + state.dtoProduct.currency_symbol + ')'}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Cost:</MyTypography>
                  <MyTypography>{accounting.toFixed(state.dtoProduct.cost, 2)}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Contact:</MyTypography>
                  <MyTypography>{state.dtoProduct.contact}</MyTypography>
                </MyGrid>

                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Url:</MyTypography>
                  <MyTypography>{state.dtoProduct.url}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Description:</MyTypography>
                  <MyTypography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: textToHTML(state.dtoProduct.description)
                      }}
                    ></div>
                  </MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12 }}>
                  <MyDataGrid
                    apiRef={apiRef}
                    checkboxSelection={false}
                    initialStateModel={state.initialState}
                    sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
                    onSortModelChange={onSortChange}
                    rows={state.arrProductPrice}
                    rowCount={state.total_records}
                    columns={columns}
                    loading={state.isLoading}
                    showAddButton={false}
                    showDeleteButton={false}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                  />
                </MyGrid>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoProduct.created_by_user_name}
          createdAt={state.dtoProduct.created_at}
          modifiedBy={state.dtoProduct.modified_by_user_name}
          modifiedAt={state.dtoProduct.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewProduct, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
