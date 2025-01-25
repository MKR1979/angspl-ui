'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useProductEntry from './useProductEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import ProductDTO from '@/app/types/ProductDTO';
import { arrProductType, numberFormat } from '@/app/common/Configuration';
import MyImage from '@/app/custom-components/MyImage';
import LookupDTO from '@/app/types/LookupDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';

type ProductEntryProps = {
  dtoProduct: ProductDTO;
  arrUnitLookup: LookupDTO[];
  arrProductCategoryLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
};

const ProductEntry = (props: ProductEntryProps) => {
  const {
    apiRef,
    state,
    onInputChange,
    onUnitNameChange,
    onProductCategoryNameChange,
    onProductTypeChange,
    onCurrencyNameChange,
    onProductNameBlur,
    onPartNumberBlur,
    onUnitNameBlur,
    onProductCategoryNameBlur,
    onProductTypeBlur,
    onCurrencyNameBlur,
    onUrlBlur,
    onSaveClick,
    onCancelClick,
    onImageClick,
    UploadImage,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    onSortChange,
    paginationModel,
    setPaginationModel,
    processRowUpdate
  } = useProductEntry(props);
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
      editable: true,
      type: 'number',
      valueFormatter: useCallback((value: any) => (value ? numberFormat(Number(value), 2) : ''), [])
    }
  ];
  return (
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
                  onClick={onImageClick}
                  style={{ cursor: 'pointer', width: 'auto', height: 'auto' }}
                  layout="intrinsic"
                />
              </MyBox>
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*, .mp4"
                multiple
                id="product_image"
                name="file"
                onChange={UploadImage}
                style={{ display: 'none' }}
              />
            </MyGrid>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 10 }}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Product Name"
                  name="product_name"
                  value={state.dtoProduct.product_name}
                  onChange={onInputChange}
                  onBlur={onProductNameBlur}
                  error={state.errorMessages.product_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.product_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Part Number"
                  name="part_number"
                  value={state.dtoProduct.part_number}
                  onChange={onInputChange}
                  onBlur={onPartNumberBlur}
                  error={state.errorMessages.part_number ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.part_number}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open4}
                  onOpen={setOpen4}
                  onClose={setClose4}
                  value={{ id: state.dtoProduct.unit_id, text: state.dtoProduct.unit_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrUnitLookup}
                  onChange={onUnitNameChange}
                  onBlur={onUnitNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Unit"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onUnitNameBlur}
                      error={state.errorMessages.unit_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.unit_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{ id: state.dtoProduct.product_category_id, text: state.dtoProduct.product_category_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrProductCategoryLookup}
                  onChange={onProductCategoryNameChange}
                  onBlur={onProductCategoryNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Product Category Name"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onProductCategoryNameBlur}
                      error={state.errorMessages.product_category_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error">{state.errorMessages.product_category_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open2}
                  onOpen={setOpen2}
                  onClose={setClose2}
                  value={{ text: state.dtoProduct.product_type }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ text: '' }}
                  options={arrProductType}
                  onChange={onProductTypeChange}
                  onBlur={onProductTypeBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Product Type"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onProductTypeBlur}
                      error={state.errorMessages.product_type ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.product_type}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{
                    id: state.dtoProduct.currency_id,
                    text: state.dtoProduct.currency_name
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
                <MyTextField
                  label="Cost"
                  name="cost"
                  value={state.dtoProduct.cost}
                  onChange={onInputChange}
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField label="Contact" name="contact" value={state.dtoProduct.contact} onChange={onInputChange} />
              </MyGrid>

              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Url"
                  name="url"
                  placeholder="http(s)://"
                  value={state.dtoProduct.url}
                  onChange={onInputChange}
                  onBlur={onUrlBlur}
                  error={state.errorMessages.url ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.url}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Description"
                  name="description"
                  value={state.dtoProduct.description}
                  onChange={onInputChange}
                  multiline
                  rows={5}
                />
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
                  getRowId={(row) => row.currency_id}
                  processRowUpdate={processRowUpdate}
                  onProcessRowUpdateError={() => null}
                />
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(ProductEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
