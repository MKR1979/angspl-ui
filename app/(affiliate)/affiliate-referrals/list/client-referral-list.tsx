'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useReferralList from './useReferralList';
import ReferralDTO from '@/app/types/ReferralDTO';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';
import MyTypography from '@/app/custom-components/MyTypography';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

type Props = {
  arrReferralDTO: ReferralDTO[];
  total_records: number;
};
const ClientAttendanceList = ({ arrReferralDTO, total_records }: Props) => {
  const { state, apiRef, paginationModel, setPaginationModel, onCheckChange, onAddClick, onSortChange, onFilterModelChange } =
    useReferralList({ arrReferralDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'referral_company_name',
      headerName: 'Referral Company Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 9) ? (
            <MyLink href={'/affiliate-referrals/view/' + params.row.id}>{params.row.referral_company_name}</MyLink>
          ) : (
            <span>{params.row.referral_company_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'referral_date',
      headerName: 'Referral Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const dt = dayjs.utc(params.row.referral_date); // do NOT convert to local
        return <MyTypography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{dt.format('DD-MM-YYYY hh:mma')}</MyTypography>;
      }
    },
    {
      field: 'contact_person',
      headerName: 'Contact Person',
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
      field: 'mobile_no',
      headerName: 'Mobile No',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'product_interest',
      headerName: 'Product Interest',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'requirement',
      headerName: 'Requirement',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
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
              rows={state.arrReferralDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 6)}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientAttendanceList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
