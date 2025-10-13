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
import useQuizList from './useQuizList';
import QuizDTO from '@/app/types/QuizDTO';
import * as gConstants from '../../../../constants/constants';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  arrQuizDTO: QuizDTO[];
  total_records: number;
};
const ClientQuizList = ({ arrQuizDTO, total_records }: Props) => {
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
  } = useQuizList({ arrQuizDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'quiz_name',
      headerName: 'Quiz Name',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 119) ? (
            <MyLink href={`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/view/` + params.row.id}>{params.row.quiz_name}</MyLink>
          ) : (
            <span>{params.row.quiz_name}</span>
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
      field: 'quiz_code',
      headerName: 'Quiz Code',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'exam_duration',
      headerName: 'Duration',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => `${params.value} Min${params.value !== 1 ? 's.' : '.'}`
    },
    {
      field: 'quiz_type',
      headerName: 'Quiz Type',
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
              rows={state.arrQuizDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 116)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 117)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 118) || findPermission(userPermissions, 117)) && (
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
              {findPermission(userPermissions, 118) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 117) && (
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
          title="Confirm State Removal"
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
          title="Confirm State Removal"
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

export default memo(ClientQuizList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
