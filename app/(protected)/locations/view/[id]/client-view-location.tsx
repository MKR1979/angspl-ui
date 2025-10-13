'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewLocation from './useViewLocation';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import LocationDTO from '@/app/types/LocationDTO';
import { getLocalTime, numberFormat, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyLink from '@/app/custom-components/MyLink';
import dayjs from 'dayjs';

type Props = {
  dtoLocation: LocationDTO;
};

const ClientViewLocation = ({ dtoLocation }: Props) => {
  const { state, onEditClick, onCancelClick, handleTabChange, paginationModel, setPaginationModel, onSortChange, onFilterModelChange } =
    useViewLocation({ dtoLocation });
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1
    },
    {
      field: 'event_name',
      headerName: 'Event Name',
      flex: 1,
      renderCell: useCallback(
        (params: GridRenderCellParams) => <MyLink href={'/events/view/' + params.row.id}>{params.row.event_name}</MyLink>,
        []
      )
    },
    {
      field: 'start_date_time',
      headerName: 'Start Date',
      flex: 1,
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY hh:mm a'),
        []
      )
    },
    {
      field: 'end_date_time',
      headerName: 'End Date',
      flex: 1,
      valueFormatter: useCallback(
        (value: any) =>
          dayjs(getLocalTime(value)).format('MM/DD/YYYY') == '12/31/1899' ? '' : dayjs(getLocalTime(value)).format('MM/DD/YYYY hh:mm a'),
        []
      )
    },
    {
      field: 'budget',
      headerName: 'Budget',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
      valueFormatter: useCallback((value: any, row: any) => (value ? row.currency_symbol + numberFormat(Number(value), 2) : ''), [])
    },
    {
      field: 'assigned_to_user_name',
      headerName: 'Assigned To',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'status',
      flex: 1,
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
            <MyTab icon={<MyHistoryIcon />} label="Events" />
          </MyTabs>
          <MyTabPanel value={state.tabIndex} index={0}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Location Name:</MyTypography>
                <MyTypography>{state.dtoLocation.location_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Capacity:</MyTypography>
                <MyTypography>{state.dtoLocation.capacity ? Number(state.dtoLocation.capacity) : ''}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoLocation.description)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Address:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoLocation.address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoLocation.city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoLocation.state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoLocation.country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoLocation.zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={1}>
            <MyDataGrid
              checkboxSelection={false}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              rows={state.arrEventDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </MyTabPanel>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoLocation.created_by_user_name}
          createdAt={state.dtoLocation.created_at}
          modifiedBy={state.dtoLocation.modified_by_user_name}
          modifiedAt={state.dtoLocation.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewLocation, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
