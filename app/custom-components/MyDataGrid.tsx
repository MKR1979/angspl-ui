import { memo, useCallback } from 'react';
import { TablePaginationProps } from '@mui/material/TablePagination';

import {
  DataGrid,
  DataGridProps,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarProps,
  gridPageCountSelector,
  GridPagination,
  useGridSelector,
  useGridApiContext
  //GridToolbarContainer
} from '@mui/x-data-grid';
import { defaultPageSize, density, pageSizes } from '../common/Configuration';
//import {} from '@mui/material';
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
  customToolbar?: any;
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showDeleteButton?: boolean;
  initialStateModel?: any;
  filterModel1?: any;
  toolbar?: boolean;
}

interface MyToolbarProps extends GridToolbarProps {
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showDeleteButton?: boolean;
  toolbar?: boolean;
}

const GridToolbarAddButton = memo(
  function (props: any) {
    console.log('GridToolbarAddButton rendered');
    return (
      <MyButton variant="text" startIcon={<MyAddIcon />} title="Add" onClick={props.onAddClick}>
        Add
      </MyButton>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
GridToolbarAddButton.displayName = 'GridToolbarAddButton';

const GridToolbarDeleteButton = memo(
  function (props: any) {
    console.log('GridToolbarDeleteButton rendered');
    return (
      <MyButton variant="text" startIcon={<MyClearIcon />} title="Delete" color="error" onClick={props.onDeleteClick}>
        Delete
      </MyButton>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
GridToolbarDeleteButton.displayName = 'GridToolbarDeleteButton';

const CustomToolbar = memo(
  function ({ showAddButton = false, showDeleteButton = false, ...props }: MyToolbarProps) {
    console.log('CustomToolbar rendered');
    return (
      // <GridToolbarContainer>
      <MyGrid container>
        <MyGrid size={{ xs: 12, md: 9, lg: 9 }}>
          {showAddButton && <GridToolbarAddButton onAddClick={props.onAddClick} />}
          {showDeleteButton && <GridToolbarDeleteButton onDeleteClick={props.onDeleteClick} />}
          <GridToolbarColumnsButton slotProps={{ button: { sx: { color: 'primary' } } }} />
        </MyGrid>
        <MyGrid size={{ xs: 12, md: 3, lg: 3 }}>
          <GridToolbarQuickFilter />
        </MyGrid>
      </MyGrid>
      // </GridToolbarContainer>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
CustomToolbar.displayName = 'CustomToolbar';

const Pagination = memo(
  function ({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    console.log('Pagination rendered');
    return (
      <MyMuiPagination
        color="standard"
        className={className}
        count={pageCount}
        showFirstButton
        showLastButton
        page={page + 1}
        onChange={useCallback(
          (event: any, newPage: number) => {
            onPageChange(event as any, newPage - 1);
          },
          [onPageChange]
        )}
      />
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
Pagination.displayName = 'Pagination';

const CustomPagination = memo(
  function (props: any) {
    console.log('CustomPagination rendered');
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
CustomPagination.displayName = 'CustomPagination';

const MyDataGrid = ({ showAddButton = false, showDeleteButton = false, initialStateModel, toolbar = true, ...props }: MyDataGridProps) => {
  const theme = useTheme();
  console.log('MyDataGrid rendered');

  return (
    <DataGrid
      checkboxSelection
      disableRowSelectionOnClick
      density={density}
      slots={{
        toolbar: toolbar ? CustomToolbar : null,
        pagination: CustomPagination
      }}
      pageSizeOptions={pageSizes}
      pagination
      paginationMode="server"
      filterMode="server"
      slotProps={{
        toolbar: {
          showAddButton: showAddButton,
          showDeleteButton: showDeleteButton,
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

export default memo(MyDataGrid, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
