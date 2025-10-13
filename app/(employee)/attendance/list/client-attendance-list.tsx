'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useAttendanceList from './useAttendanceList';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import MyTypography from '@/app/custom-components/MyTypography';
import MyButton from '@/app/custom-components/MyButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';

type Props = {
  arrAttendanceDTO: AttendanceDTO[];
  total_records: number;
};
const ClientAttendanceList = ({ arrAttendanceDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onAddClick,
    onSortChange,
    onFilterModelChange,
    goToPreviousWeek,
    goToNextWeek,
    isCurrentWeek
  } = useAttendanceList({ arrAttendanceDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'name',
      headerName: ' Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 14) ? (
            <MyLink href={'/attendance/view/' + params.row.id}>{params.row.name}</MyLink>
          ) : (
            <span>{params.row.name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'attendance_time',
      headerName: 'Date & Time',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const dt = dayjs.utc(params.row.attendance_time); // do NOT convert to local
        return <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{dt.format('YYYY-MM-DD hh:mma')}</MyTypography>;
      }
    },
    {
      field: 'entry_type',
      headerName: 'Entry Type',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
      minWidth: 150
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
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
                rows={state.arrAttendanceDTO || []}
                rowCount={state.total_records}
                columns={columns}
                loading={state.isLoading}
                onAddClick={onAddClick}
                showAddButton={findPermission(userPermissions, 11)}
                onFilterModelChange={onFilterModelChange}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <MyButton disabled={!state.hasPrevData} onClick={goToPreviousWeek} startIcon={<ArrowBackIcon />}>
              Previous
            </MyButton>
            <MyButton onClick={goToNextWeek} endIcon={<ArrowForwardIcon />} disabled={isCurrentWeek()}>
              Next
            </MyButton>
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientAttendanceList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
