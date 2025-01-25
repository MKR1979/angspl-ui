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
import useQuoteList from './useQuoteList';
import QuoteDTO from '@/app/types/QuoteDTO';
import dayjs from 'dayjs';
import { getLocalTime, numberFormat } from '@/app/common/Configuration';
import MyGrid from '@/app/custom-components/MyGrid';
import MySparkLineChart from '@/app/custom-components/MySparkLineChart';

type Props = {
  arrQuoteDTO: QuoteDTO[];
  total_records: number;
  totalDatewise: any;
  totalOpen: number;
  totalWon: number;
  totalLost: number;
};
const ClientQuoteList = ({ arrQuoteDTO, total_records, totalDatewise, totalOpen, totalWon, totalLost }: Props) => {
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
  } = useQuoteList({ arrQuoteDTO, total_records, totalDatewise, totalOpen, totalWon, totalLost });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'quote_no',
      headerName: 'Quote #',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/quotes/view/' + params.row.id}>{params.row.quote_no}</MyLink>,
        []
      )
    },
    {
      field: 'quote_date',
      headerName: 'Quote Date',
      flex: 1,
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY'),
        []
      )
    },
    {
      field: 'customer_name',
      headerName: 'Customer',
      flex: 1
    },
    {
      field: 'expires_on',
      headerName: 'Expires On',
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY'),
        []
      )
    },
    {
      field: 'grand_total_amount',
      headerName: 'Amount',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      valueFormatter: useCallback((value: any, row: any) => (value ? row.currency_symbol + numberFormat(Number(value), 2) : ''), [])
    },
    {
      field: 'sales_person_name',
      headerName: 'Sales Person',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    }
  ];

  const cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '135px'
  };

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2} sx={{ paddingBottom: 2 }}>
            <MyGrid size={{ xs: 12, sm: 2.4 }}>
              <MyCard style={cardStyle} sx={{ backgroundColor: 'rgb(160, 60, 160)', color: '#fff', borderRadius: 2 }}>
                <MyCardContent>
                  <MyTypography variant="h5">{state.totalDatewise.total}</MyTypography>
                  <MyTypography>Quoted (This Month)</MyTypography>
                  <MySparkLineChart
                    data={state.totalDatewise.yAxisData}
                    xAxis={{
                      scaleType: 'time',
                      data: state.totalDatewise.xAxisData,
                      valueFormatter: (value) => value.format('MM/DD/YYYY')
                    }}
                    height={50}
                    showTooltip
                    showHighlight
                    colors={['red']}
                  ></MySparkLineChart>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.4 }}>
              <MyCard style={cardStyle} sx={{ backgroundColor: 'rgb(0, 0, 255)', color: '#fff', borderRadius: 2 }}>
                <MyCardContent>
                  <MyTypography variant="h5">{state.totalOpen}</MyTypography> <MyTypography>Open Quotes </MyTypography>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.4 }}>
              <MyCard style={cardStyle} sx={{ backgroundColor: 'rgb(60, 179, 113)', color: '#fff', borderRadius: 2 }}>
                <MyCardContent>
                  <MyTypography variant="h5">{state.totalWon}</MyTypography> <MyTypography>Won Quotes </MyTypography>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.4 }}>
              <MyCard style={cardStyle} sx={{ backgroundColor: 'rgb(255, 0, 0)', color: '#fff', borderRadius: 2 }}>
                <MyCardContent>
                  <MyTypography variant="h5">{state.totalLost}</MyTypography> <MyTypography>Lost Quotes </MyTypography>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.4 }}>
              <MyCard style={cardStyle} sx={{ backgroundColor: 'rgb(106, 90, 205)', color: '#fff', borderRadius: 2 }}>
                <MyCardContent>
                  <MyTypography variant="h5">
                    {(state.totalWon + state.totalLost === 0 ? 0 : (state.totalWon * 100) / (state.totalWon + state.totalLost)).toFixed(2) +
                      '%'}
                  </MyTypography>{' '}
                  <MyTypography>Win Rate </MyTypography>
                </MyCardContent>
              </MyCard>
            </MyGrid>
          </MyGrid>
          <MyDataGrid
            apiRef={apiRef}
            rowSelectionModel={state.arrSelectedId}
            initialStateModel={state.initialState}
            sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
            onSortModelChange={onSortChange}
            onRowSelectionModelChange={onCheckChange}
            rows={state.arrQuoteDTO}
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
          title="Confirm Quote Removal"
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
          title="Confirm Quote Removal"
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

export default memo(ClientQuoteList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
