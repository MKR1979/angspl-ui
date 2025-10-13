'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyLink from '@/app/custom-components/MyLink';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import usePaymentList from './usePaymentReceiptList';
import ReceiptDTO from '@/app/types/ReceiptDTO';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import dayjs from 'dayjs';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTypography from '@/app/custom-components/MyTypography';
import * as Constants from '../../../constants/constants';

type Props = {
  arrReceiptDTO: ReceiptDTO[];
  total_records: number;
};
const ClientCollectionList = ({ arrReceiptDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onSortChange,
    handleContextMenu,
    onFilterModelChange,
    onUserNameChange,
    onFromDateChange,
    onToDateChange,
    onCourseNameChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2
  } = usePaymentList({ arrReceiptDTO, total_records });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 79) ? (
            <MyLink href={`/${Constants.ADMIN_PAYMENT_MODULES}/payment-receipt/view/` + params.row.id}>{params.row.course_name}</MyLink>
          ) : (
            <span>{params.row.course_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'student_name',
      headerName: 'Student Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'payment_date',
      headerName: 'Payment Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (!params.value) return '';
        return String(params.value).split('T')[0];
      }
    },
    {
      field: 'payment_mode',
      headerName: 'Payment Mode',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'fee_amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 150
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '5px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 4 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoReceipt.course_id === null
                    ? { id: 'ALL', text: 'All Courses' }
                    : { id: state.dtoReceipt.course_id, text: state.dtoReceipt.course_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCourseLookup}
                onChange={onCourseNameChange}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Course"
                    placeholder="Select Class..."
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.course_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 3 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoReceipt.learner_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoReceipt.learner_id, text: state.dtoReceipt.student_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Student"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={state.errorMessages.student_name ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.student_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.5 }}>
              <MyDatePicker
                label="From Date"
                onChange={onFromDateChange}
                value={
                  dayjs(state.dtoReceipt.from_date).format('yyyy-mm-dd') === '12/31/1899'
                    ? dayjs().subtract(1, 'month').toDate()
                    : dayjs(state.dtoReceipt.from_date).toDate()
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 2.5 }}>
              <MyDatePicker
                label="To Date"
                onChange={onToDateChange}
                value={
                  dayjs(state.dtoReceipt.to_date).format('yyyy-mm-dd') === '12/31/1899' ? null : dayjs(state.dtoReceipt.to_date).toDate()
                }
                minDate={
                  state.dtoReceipt.from_date && dayjs(state.dtoReceipt.from_date).isValid()
                    ? dayjs(state.dtoReceipt.from_date).toDate()
                    : undefined
                }
                maxDate={dayjs().toDate()}
              />
            </MyGrid>
          </MyGrid>
        </MyBox>
      </MyLocalizationProvider>
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
              rows={state.arrReceiptDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
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

export default memo(ClientCollectionList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
