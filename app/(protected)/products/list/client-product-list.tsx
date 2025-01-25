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
import useProductList from './useProductList';
import ProductDTO from '@/app/types/ProductDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyImage from '@/app/custom-components/MyImage';
import { numberFormat } from '@/app/common/Configuration';

type Props = {
  arrProductDTO: ProductDTO[];
  total_records: number;
};
const ClientProductList = ({ arrProductDTO, total_records }: Props) => {
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
  } = useProductList({ arrProductDTO, total_records });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'product_image',
      headerName: 'Image',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => (
          <MyLink href={'/products/view/' + params.row.id}>
            {' '}
            <MyBox sx={{ width: '175px' }}>
              <MyImage
                src={
                  params.row.product_image.trim() == ''
                    ? '/default-image.avif'
                    : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + params.row.product_image
                }
                width={800}
                height={800}
                alt="image"
                style={{ cursor: 'pointer' }}
                layout="intrinsic"
              />
            </MyBox>
          </MyLink>
        ),
        []
      )
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/products/view/' + params.row.id}>{params.row.product_name}</MyLink>,
        []
      )
    },
    {
      field: 'part_number',
      headerName: 'Part Number',
      flex: 1
    },
    {
      field: 'unit_code',
      headerName: 'Unit',
      flex: 1
    },
    {
      field: 'product_category_name',
      headerName: 'Product Category',
      flex: 1
    },
    {
      field: 'product_type',
      headerName: 'Product Type',
      flex: 1
    },
    {
      field: 'cost',
      headerName: 'Cost',
      headerAlign: 'right',
      align: 'right',
      valueGetter: useCallback((value: any, row: any) => {
        return row.currency_symbol + numberFormat(row.cost, 2);
      }, [])
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyDataGrid
            getRowHeight={() => 'auto'}
            apiRef={apiRef}
            rowSelectionModel={state.arrSelectedId}
            initialStateModel={state.initialState}
            sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
            onSortModelChange={onSortChange}
            onRowSelectionModelChange={onCheckChange}
            rows={state.arrProductDTO}
            rowCount={state.total_records}
            columns={columns}
            loading={state.isLoading}
            handleContextMenu={handleContextMenu}
            onAddClick={onAddClick}
            showAddButton={true}
            onDeleteClick={onDeleteAllClick}
            showDeleteButton={state.arrSelectedId.length > 0}
            onFilterModelChange={onFilterModelChange}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowDoubleClick={onRowDoubleClick}
          />

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
            <MyMenuItem onClick={onEditClick}>
              <MyEditIcon />
              Edit
            </MyMenuItem>
            <MyMenuItem onClick={onDeleteClick}>
              <MyClearIcon />
              Delete
            </MyMenuItem>
          </MyMenu>
        </MyCardContent>
      </MyCard>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm Product Removal"
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
          title="Confirm Product Removal"
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

export default memo(ClientProductList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
