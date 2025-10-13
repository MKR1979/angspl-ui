import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
  GridEventListener,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  useGridApiRef,
  GridInitialState
} from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../common/Configuration';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { ATTENDANCE_REVIEW_LIST, DELETE_ATTENDANCE, VERIFY_ATTENDANCE } from '@/app/graphql/Attendance';
import * as Constants from '../../../../(protected)/constants/constants';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  user_id: number | null;
  device_id: string | null;
  name: string | null;
  entry_type: string | null;
  attendance_time: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_office: number | null;
  is_on_campus: boolean | null;
  device_info: string | null;
  ip_address: string | null;
  remarks: string | null;
};

type StateType = {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  arrAttendanceDTO: AttendanceDTO[];
  arrUserLookup: LookupDTO[];
  dtoAttendance: AttendanceDTO;
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  selectedRow: string;
  arrSelectedId: string[];
  contextMenu: ContextMenuType | null;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
  errorMessages: ErrorMessageType;
};

type Props = {
  arrAttendanceDTO: AttendanceDTO[];
  total_records: number;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  user_id: null,
  device_id: null,
  name: null,
  entry_type: null,
  attendance_time: null,
  latitude: null,
  longitude: null,
  distance_from_office: null,
  is_on_campus: null,
  device_info: null,
  ip_address: null,
  remarks: null
} as ErrorMessageType);

const useAttendanceList = ({ arrAttendanceDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    user_id: 0,
    dtoAttendance: ATTENDANCE,
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    isLoading: false,
    arrAttendanceDTO: arrAttendanceDTO,
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    arrSelectedId: [],
    contextMenu: null,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Review Attendance' }]
  });

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  const [getAttendanceReviewList] = useLazyQuery(ATTENDANCE_REVIEW_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoAttendance.from_date,
      to_date: state.dtoAttendance.to_date,
      user_id: state.dtoAttendance.user_id
    }
  });

  const [deleteAttendance] = useMutation(DELETE_ATTENDANCE, {});

  const [verifyAttendance] = useMutation(VERIFY_ATTENDANCE, {});

  const getUserList = useCallback(async (): Promise<void> => {
    let arrUserLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup({
      variables: {
        type_name: gMessageConstants.EMPLOYEE_TYPE_NAME
      }
    });
    if (!error && data?.getUserLookup) {
      arrUserLookup = [
        { id: -1, text: 'All Users' }, // <-- Inject All option here
        ...data.getUserLookup
      ];
    }
    setState({ arrUserLookup: arrUserLookup } as StateType);
  }, [getUserLookup]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrAttendanceDTO: AttendanceDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getAttendanceReviewList({
        variables: {
          from_date: state.dtoAttendance.from_date,
          to_date: state.dtoAttendance.to_date,
          user_id: state.dtoAttendance.user_id !== -1 ? state.dtoAttendance.user_id : null
        }
      });
      if (!error && data) {
        arrAttendanceDTO = data.getAttendanceReviewList.attendances.map((item: AttendanceDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getAttendanceReviewList.total_records;
      }
      setState({
        arrAttendanceDTO: arrAttendanceDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceReviewList, state.dtoAttendance.user_id, state.dtoAttendance.from_date, state.dtoAttendance.to_date]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel, state.user_id]);

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const toggleDialog = useCallback(async (): Promise<void> => {
    setState({ visibleDialog: !state.visibleDialog } as StateType);
  }, [state.visibleDialog]);

  const toggleDialog1 = useCallback(
    async (id: string): Promise<void> => {
      setState({ visibleDialog1: { id: id, visibility: !state.visibleDialog1.visibility } } as StateType);
    },
    [state.visibleDialog1.visibility]
  );

  const onSortChange = useCallback(
    async (model: GridSortModel): Promise<void> => {
      if (model.length > 0) {
        setState({ sort_field: model[0].field, sort_direction: model[0].sort?.toString() as SortDirectionType } as StateType);
      } else {
        setState({ sort_field: state.sort_field, sort_direction: 'asc' } as StateType);
      }
    },
    [state.sort_field]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAttendance: {
          ...state.dtoAttendance,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
      // getData();
    },
    [state.dtoAttendance]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAttendance: { ...state.dtoAttendance, from_date: value } } as StateType);
    },
    [state.dtoAttendance]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAttendance: { ...state.dtoAttendance, to_date: value } } as StateType);
    },
    [state.dtoAttendance]
  );

  const handleContextMenu = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      setState({
        selectedRow: event.currentTarget.getAttribute('data-id') as string,
        contextMenu: state.contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
      } as StateType);
    },
    [state.contextMenu]
  );

  const onRowDoubleClick: GridEventListener<'rowDoubleClick'> = useCallback(
    async (params) => {
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/edit/` + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/edit/` + state.selectedRow);
    },
    [router, state.selectedRow]
  );

  const onDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog1(state.selectedRow);
      await handleClose();
    },
    [toggleDialog1, handleClose, state.selectedRow]
  );

  const DeleteSingle = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const params = [Number(state.visibleDialog1.id)];
        const { data } = await deleteAttendance({
          variables: {
            ids: params
          }
        });
        await toggleDialog1('');
        if (data) {
          getData();
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_RECORD, 'success');
        } else {
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_FAILED, 'error');
        }
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [deleteAttendance, getData, state.visibleDialog1.id, toggleDialog1]
  );

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

  const onDeleteAllClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog();
    },
    [toggleDialog]
  );

  const DeleteSelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const { data } = await deleteAttendance({
          variables: {
            ids: state.arrSelectedId
          }
        });
        await toggleDialog();
        if (data) {
          getData();
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_RECORD, 'success');
        } else {
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_FAILED, 'error');
        }
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [deleteAttendance, getData, state.arrSelectedId, toggleDialog]
  );

  const VerifySelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const { data } = await verifyAttendance({
        variables: {
          ids: state.arrSelectedId
        }
      });
      if (data) {
        getData();
        showSnackbar(gMessageConstants.SNACKBAR_VERIFY_RECORD, 'success');
      } else {
        showSnackbar(gMessageConstants.SNACKBAR_VERIFY_FAILED, 'error');
      }
    },
    [verifyAttendance, getData, state.arrSelectedId, toggleDialog]
  );

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
  );

  const onFilterModelChange = useCallback(async (newFilterModel: GridFilterModel): Promise<void> => {
    let filterText = '';
    if (newFilterModel.quickFilterValues) {
      filterText = newFilterModel.quickFilterValues[0] ?? '';
    }
    setState({ filter_text: filterText } as StateType);
  }, []);

  const onDeleteSingleClose = useCallback(async () => {
    toggleDialog1('');
  }, [toggleDialog1]);

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onDeleteClick,
    onEditClick,
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
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteSingleClose,
    VerifySelected
  };
};

export default useAttendanceList;
