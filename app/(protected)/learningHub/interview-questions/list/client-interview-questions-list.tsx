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
import useInterviewQuestionsList from './useInterviewQuestionsList';
import InterviewQuestionsDTO from '@/app/types/InterviewQuestionsDTO';
import * as gConstants from '../../../../constants/constants';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  arrInterviewQuestionsDTO: InterviewQuestionsDTO[];
  total_records: number;
};
const ClientInterviewQuestionsList = ({ arrInterviewQuestionsDTO, total_records }: Props) => {
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
  } = useInterviewQuestionsList({ arrInterviewQuestionsDTO, total_records });

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 150,
      renderCell: useCallback(
        (params: GridRenderCellParams) =>
          findPermission(userPermissions, 164) ? (
            <MyLink href={`/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/view/` + params.row.id}>{params.row.title}</MyLink>
          ) : (
            <span>{params.row.title}</span>
          ),
        [userPermissions]
        // <MyLink href={`/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/view/` + params.row.id}>{params.row.title}</MyLink>,
        // []
      )
    },
    {
      field: 'course_name',
      headerName: 'Course name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const notesData = params.row.description?.code;
        // Convert object to string if it's an object
        const displayData =
          typeof notesData === 'string'
            ? notesData
            : notesData
              ? JSON.stringify(notesData, null, 2)
              : '';

        return <span style={{ whiteSpace: 'pre-wrap' }}>{displayData}</span>;
      }
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
              rows={state.arrInterviewQuestionsDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              handleContextMenu={handleContextMenu}
              onAddClick={onAddClick}
              showAddButton={findPermission(userPermissions, 161)}
              onDeleteClick={onDeleteAllClick}
              showDeleteButton={state.arrSelectedId.length > 0 && findPermission(userPermissions, 162)}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowDoubleClick={onRowDoubleClick}
            />
          </div>
          {(findPermission(userPermissions, 163) || findPermission(userPermissions, 162)) && (
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
              {findPermission(userPermissions, 163) && (
                <MyMenuItem onClick={onEditClick}>
                  <MyEditIcon />
                  Edit
                </MyMenuItem>
              )}
              {findPermission(userPermissions, 162) && (
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
          title="Confirm Code Project Removal"
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
          title="Confirm Code Project Removal"
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

export default memo(ClientInterviewQuestionsList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
