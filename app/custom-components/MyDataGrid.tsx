import { memo, useCallback } from 'react';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  DataGridProps,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarProps,
  gridPageCountSelector,
  GridPagination,
  useGridSelector,
  useGridApiContext
} from '@mui/x-data-grid';

import { defaultPageSize, density, pageSizes } from '../common/Configuration';
import MyGrid from './MyGrid';
import MyAddIcon from './MyAddIcon';
import MyClearIcon from './MyClearIcon';
import MyButton from './MyButton';
import useTheme from '@mui/material/styles/useTheme';
import eq from 'lodash/eq';
import MyMuiPagination from './MyMuiPagination';

interface MyDataGridProps extends DataGridProps {
  rowCount?: number;
  handleContextMenu?(e: React.MouseEvent): void;
  onChangePage?(e: React.ChangeEvent<unknown>, page: number): void;
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showDeleteButton?: boolean;
  showExportButton?: boolean; // ✅ NEW
   showSearch?: boolean; // 👈 new
  initialStateModel?: any;
  filterModel1?: any;
  toolbar?: boolean;
}

interface MyToolbarProps extends GridToolbarProps {
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showExportButton?: boolean; // ✅ NEW
  showSearch?: boolean; // 👈 new
}

const GridToolbarAddButton = memo((props: any) => (
  <MyButton variant="text" startIcon={<MyAddIcon />} title="Add" onClick={props.onAddClick}>
    Add
  </MyButton>
));
GridToolbarAddButton.displayName = 'GridToolbarAddButton';

const GridToolbarDeleteButton = memo((props: any) => (
  <MyButton variant="text" startIcon={<MyClearIcon />} title="Delete" color="error" onClick={props.onDeleteClick}>
    Delete
  </MyButton>
));
GridToolbarDeleteButton.displayName = 'GridToolbarDeleteButton';

const CustomToolbar = memo((props: MyToolbarProps) => {
  const { showAddButton, showDeleteButton, showExportButton, showSearch, onAddClick, onDeleteClick } = props;

  return (
  <MyGrid container spacing={1}>
    <MyGrid size={{ xs: 12, md: 5 }}>
      {showAddButton && <GridToolbarAddButton onAddClick={onAddClick} />}
      {showDeleteButton && <GridToolbarDeleteButton onDeleteClick={onDeleteClick} />}
      <GridToolbarColumnsButton />
      {showExportButton && <GridToolbarExport />} {/* ✅ Added */}
    </MyGrid>

    <MyGrid size={{ xs: 12, md: 7 }}>
      {showSearch && <GridToolbarQuickFilter />} {/* 👈 only show if true */}
    </MyGrid>
  </MyGrid>
);
});
CustomToolbar.displayName = 'CustomToolbar';

const Pagination = memo(({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <MyMuiPagination
      color="primary"
      className={className}
      count={pageCount}
      showFirstButton
      showLastButton
      page={page + 1}
      onChange={useCallback((event: any, newPage: number) => onPageChange(event as any, newPage - 1), [onPageChange])}
    />
  );
});
Pagination.displayName = 'Pagination';

const CustomPagination = memo((props: any) => <GridPagination ActionsComponent={Pagination} {...props} />);
CustomPagination.displayName = 'CustomPagination';

const MyDataGrid = ({
  showAddButton = false,
  showDeleteButton = false,
  showExportButton = false,
   showSearch = true, // 👈 default true
  initialStateModel,
  toolbar = true,
  ...props
}: MyDataGridProps) => {
  const theme = useTheme();

  return (
    <DataGrid
      checkboxSelection
      disableRowSelectionOnClick
      density={density}
      pageSizeOptions={pageSizes}
      pagination
      paginationMode="server"
      filterMode="server"
      slots={{
        toolbar: toolbar ? CustomToolbar : null,
        pagination: CustomPagination
      }}
      slotProps={{
        toolbar: {
          showAddButton,
          showDeleteButton,
          showExportButton,
          showSearch, // 👈 pass down
          onAddClick: props.onAddClick,
          onDeleteClick: props.onDeleteClick
        } as MyToolbarProps,
        row: {
          onContextMenu: props.handleContextMenu,
          style: { cursor: 'context-menu' }
        }
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: defaultPageSize } },
        ...initialStateModel
      }}
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? 'white' : '#212946',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.secondary.light : '#181e34',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
          }
        }
      }}
      {...props}
    />
  );
};

export default memo(MyDataGrid, (prevProps, nextProps) => eq(prevProps, nextProps));



// import { memo, useCallback } from 'react';
// import { TablePaginationProps } from '@mui/material/TablePagination';
// import {
//   DataGrid,
//   DataGridProps,
//   GridToolbarColumnsButton,
//   GridToolbarExport,
//   GridToolbarQuickFilter,
//   GridToolbarProps,
//   gridPageCountSelector,
//   GridPagination,
//   useGridSelector,
//   useGridApiContext
// } from '@mui/x-data-grid';

// import { defaultPageSize, density, pageSizes } from '../common/Configuration';
// import MyGrid from './MyGrid';
// import MyAddIcon from './MyAddIcon';
// import MyClearIcon from './MyClearIcon';
// import MyButton from './MyButton';
// import useTheme from '@mui/material/styles/useTheme';
// import eq from 'lodash/eq';
// import MyMuiPagination from './MyMuiPagination';

// interface MyDataGridProps extends DataGridProps {
//   rowCount?: number;
//   handleContextMenu?(e: React.MouseEvent): void;
//   onChangePage?(e: React.ChangeEvent<unknown>, page: number): void;
//   onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
//   showAddButton?: boolean;
//   onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
//   showDeleteButton?: boolean;
//   showExportButton?: boolean; // ✅ NEW
//   initialStateModel?: any;
//   filterModel1?: any;
//   toolbar?: boolean;
// }

// interface MyToolbarProps extends GridToolbarProps {
//   onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
//   onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
//   showAddButton?: boolean;
//   showDeleteButton?: boolean;
//   showExportButton?: boolean; // ✅ NEW
// }

// const GridToolbarAddButton = memo((props: any) => (
//   <MyButton variant="text" startIcon={<MyAddIcon />} title="Add" onClick={props.onAddClick}>
//     Add
//   </MyButton>
// ));
// GridToolbarAddButton.displayName = 'GridToolbarAddButton';

// const GridToolbarDeleteButton = memo((props: any) => (
//   <MyButton variant="text" startIcon={<MyClearIcon />} title="Delete" color="error" onClick={props.onDeleteClick}>
//     Delete
//   </MyButton>
// ));
// GridToolbarDeleteButton.displayName = 'GridToolbarDeleteButton';

// const CustomToolbar = memo((props: MyToolbarProps) => {
//   const { showAddButton, showDeleteButton, showExportButton, onAddClick, onDeleteClick } = props;

//   return (
//     <MyGrid container spacing={1}>
//       <MyGrid size={{ xs: 12, md: 5 }}>
//         {showAddButton && <GridToolbarAddButton onAddClick={onAddClick} />}
//         {showDeleteButton && <GridToolbarDeleteButton onDeleteClick={onDeleteClick} />}
//         <GridToolbarColumnsButton />
//         {showExportButton && <GridToolbarExport />} {/* ✅ Added */}
//       </MyGrid>
//       <MyGrid size={{ xs: 12, md: 7 }}>
//         <GridToolbarQuickFilter />
//       </MyGrid>
//     </MyGrid>
//   );
// });
// CustomToolbar.displayName = 'CustomToolbar';

// const Pagination = memo(({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
//   const apiRef = useGridApiContext();
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);
//   return (
//     <MyMuiPagination
//       color="primary"
//       className={className}
//       count={pageCount}
//       showFirstButton
//       showLastButton
//       page={page + 1}
//       onChange={useCallback((event: any, newPage: number) => onPageChange(event as any, newPage - 1), [onPageChange])}
//     />
//   );
// });
// Pagination.displayName = 'Pagination';

// const CustomPagination = memo((props: any) => <GridPagination ActionsComponent={Pagination} {...props} />);
// CustomPagination.displayName = 'CustomPagination';

// const MyDataGrid = ({
//   showAddButton = false,
//   showDeleteButton = false,
//   showExportButton = false,
//   initialStateModel,
//   toolbar = true,
//   ...props
// }: MyDataGridProps) => {
//   const theme = useTheme();

//   return (
//     <DataGrid
//       checkboxSelection
//       disableRowSelectionOnClick
//       density={density}
//       pageSizeOptions={pageSizes}
//       pagination
//       paginationMode="server"
//       filterMode="server"
//       slots={{
//         toolbar: toolbar ? CustomToolbar : null,
//         pagination: CustomPagination
//       }}
//       slotProps={{
//         toolbar: {
//           showAddButton,
//           showDeleteButton,
//           showExportButton,
//           onAddClick: props.onAddClick,
//           onDeleteClick: props.onDeleteClick
//         } as MyToolbarProps,
//         row: {
//           onContextMenu: props.handleContextMenu,
//           style: { cursor: 'context-menu' }
//         }
//       }}
//       initialState={{
//         pagination: { paginationModel: { pageSize: defaultPageSize } },
//         ...initialStateModel
//       }}
//       sx={{
//         backgroundColor: theme.palette.mode === 'light' ? 'white' : '#212946',
//         '& .MuiDataGrid-columnHeaders': {
//           backgroundColor: theme.palette.mode === 'light' ? theme.palette.secondary.light : '#181e34',
//           '& .MuiDataGrid-columnHeaderTitle': {
//             fontWeight: 'bold'
//           }
//         }
//       }}
//       {...props}
//     />
//   );
// };

// export default memo(MyDataGrid, (prevProps, nextProps) => eq(prevProps, nextProps));
