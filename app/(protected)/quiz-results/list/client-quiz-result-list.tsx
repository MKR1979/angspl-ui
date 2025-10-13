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
import MyClearIcon from '@/app/custom-components/MyClearIcon';
import useResultList from './useQuizResultList';
import QuizDataDTO from '@/app/types/QuizDataDTO';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import MyTextField from '@/app/custom-components/MyTextField';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';

type Props = {
  arrQuizDataDTO: QuizDataDTO[];
  total_records: number;
};
const ClientResultList = ({ arrQuizDataDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onDeleteClick,
    onDeleteAllClick,
    onSortChange,
    toggleDialog,
    DeleteSingle,
    DeleteSelected,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteSingleClose
  } = useResultList({ arrQuizDataDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'user_name',
      headerName: 'Student Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 74) ? (
            <MyLink href={`/quiz-results/view/` + params.row.id}>{params.row.user_name}</MyLink>
          ) : (
            <span>{params.row.user_name}</span>
          ),
        [userPermissions]
      )
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'quiz_name',
      headerName: 'Quiz Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'quiz_code',
      headerName: 'Quiz Code',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'exam_duration',
      headerName: 'Exam Duration',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <span>{params.value} min</span>
    },
    {
      field: 'total_questions',
      headerName: 'Total Questions',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'attempted_questions',
      headerName: 'Attempted Questions',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'unattempted_questions',
      headerName: 'Non-attempted Questions',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'correct_answers',
      headerName: 'Correct Answers',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'wrong_answers',
      headerName: 'Wrong Answers',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <span>{params.value} %</span>
    },
    {
      field: 'time_taken_seconds',
      headerName: 'Total Time Taken',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const totalSeconds = params.value || 0;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes} min ${seconds} sec`;
      }
    },
    {
      field: 'passed',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <span>{params.value ? 'Pass' : 'Fail'}</span>
    }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>

      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={
                  state.dtoQuizData.user_id === null
                    ? { id: 'ALL', text: 'All Users' }
                    : { id: state.dtoQuizData.user_id, text: state.dtoQuizData.user_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                filterOptions={(options, state) => {
                  // searchable lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Students"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="From Date"
                  onChange={onFromDateChange}
                  value={
                    dayjs(state.dtoQuizData.from_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoQuizData.from_date).toDate()
                  }
                  maxDate={dayjs().toDate()} // ✅ Prevent selecting future dates
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDatePicker
                  label="To Date"
                  onChange={onToDateChange}
                  value={
                    dayjs(state.dtoQuizData.to_date).format('yyyy-mm-dd') === '12/31/1899'
                      ? null
                      : dayjs(state.dtoQuizData.to_date).toDate()
                  }
                  minDate={
                    state.dtoQuizData.from_date && dayjs(state.dtoQuizData.from_date).isValid()
                      ? dayjs(state.dtoQuizData.from_date).toDate()
                      : undefined
                  }
                  maxDate={dayjs().toDate()}
                />
              </MyGrid>
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
              rows={state.arrQuizDataDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 72)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
          {findPermission(userPermissions, 72) && (
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
              {findPermission(userPermissions, 72) && (
                <MyMenuItem onClick={onDeleteClick}>
                  <MyClearIcon />
                  Delete
                </MyMenuItem>
              )}
            </MyMenu>
          )}
        </MyCardContent>
      </MyCard>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm Referral Removal"
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
          title="Confirm Referral Removal"
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

export default memo(ClientResultList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
