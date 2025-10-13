import { useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../../common/Configuration';
import BulkAttendanceDTO, { BULK_ATTENDANCE } from '@/app/types/BulkAttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_ATTENDANCE_BULK, LOCK_ATTENDANCE_BULK } from '@/app/graphql/BulkAttendance';
import { useSnackbar } from '../../../../../custom-components/SnackbarProvider';
import { USER_LOOKUP } from '@/app/graphql/User';
import * as gMessageConstants from '../../../../../constants/messages-constants';


interface Props {
  arrlockAttendanceDTO: BulkAttendanceDTO[];
  total_records: number;
}

interface visibleDialog1Type {
  id: string;
  visibility: boolean;
}

type ErrorMessageType = {
  user_id: number | null;
  user_name: Date | null;
  from_date: Date | null;
  to_date: Date | null;
  time: string | null;
  time_in: Date | null;
  time_out: Date | null;
  device_id: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_office: number | null;
  is_on_campus: boolean | null;
  device_info: string | null;
  ip_address: string | null;
  remarks: string | null;
  is_locked: boolean | null;
  isSelected: boolean | null;
};

interface StateType {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  arrlockAttendanceDTO: BulkAttendanceDTO[];
  arrUserLookup: LookupDTO[];
  dtoBulkAttendance: BulkAttendanceDTO;
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
  userMap: Record<number, string>;
  errorMessages: ErrorMessageType;
}

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  user_id: null,
  user_name: null,
  from_date: null,
  to_date: null,
  time: null,
  time_in: null,
  time_out: null,
  device_id: null,
  latitude: null,
  longitude: null,
  distance_from_office: null,
  is_on_campus: null,
  device_info: null,
  ip_address: null,
  remarks: null,
  is_locked: null,
  isSelected: null
} as ErrorMessageType);

const useLockAttendanceList = ({ arrlockAttendanceDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();

  const INITIAL_STATE: StateType = {
    user_id: 0,
    dtoBulkAttendance: { ...BULK_ATTENDANCE },
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    isLoading: false,
    arrlockAttendanceDTO: arrlockAttendanceDTO,
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
      pagination: {
        paginationModel: { pageSize: 100, page: 0 }
      },
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Lock Attendance' }],
    userMap: {}
  };

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  const [getAttendanceBulk] = useLazyQuery(GET_ATTENDANCE_BULK, { fetchPolicy: 'network-only' });
  const [lockAttendanceBulk] = useMutation(LOCK_ATTENDANCE_BULK, {});

  const getUserList = useCallback(async (): Promise<void> => {
    try {
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
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrAttendanceDTO: BulkAttendanceDTO[] = [];

      const { error, data } = await getAttendanceBulk({
        variables: {
          from_date: state.dtoBulkAttendance.from_date,
          to_date: state.dtoBulkAttendance.to_date,
          user_id: state.dtoBulkAttendance.user_id !== -1 ? state.dtoBulkAttendance.user_id : null,
          source_flag: state.dtoBulkAttendance.source_flag || 'LOCK'
        }
      });

      if (!error && Array.isArray(data.getAttendanceBulk)) {
        arrAttendanceDTO = data.getAttendanceBulk.map((item: BulkAttendanceDTO, index: number) => ({
          ...item,
          id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
        }));
      }

      setState({
        arrlockAttendanceDTO: arrAttendanceDTO,
        isLoading: false,
        arrSelectedId: []
      } as unknown as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceBulk, state.dtoBulkAttendance]);

  useEffect(() => {
    getData();
  }, [getData]);

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
        dtoBulkAttendance: {
          ...state.dtoBulkAttendance,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoBulkAttendance]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, from_date: value } } as StateType);
    },
    [state.dtoBulkAttendance]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, to_date: value } } as StateType);
    },
    [state.dtoBulkAttendance]
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

  const lockAttendance = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const { data } = await lockAttendanceBulk({
        variables: {
          // ids: state.arrSelectedId,
          ids: selectedUserIds,
          from_date: state.dtoBulkAttendance.from_date,
          to_date: state.dtoBulkAttendance.to_date
        }
      });

      if (data?.lockAttendanceBulk === true) {
        showSnackbar('Attendance Locked Successfully', 'success');
        getData();
      } else {
        showSnackbar('Error in Locking Attendance.', 'error');
      }

    },
    [lockAttendanceBulk, getData, state.arrSelectedId, state.dtoBulkAttendance.attendance_time]
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
    onCheckChange: (model: GridRowSelectionModel) => {
      setState({ arrSelectedId: model as string[] } as StateType); // keep your original logic

      const selectedUserIds = Array.from(
        new Set(
          state.arrlockAttendanceDTO
            .filter(row => model.includes(row.id))
            .map(row => row.user_id)
            .filter((id): id is number => id !== null) // remove nulls, ensure numbers
        )
      );

      setSelectedUserIds(selectedUserIds); // ✅ as number[]
    },
    paginationModel,
    setPaginationModel,
    onSortChange,
    toggleDialog,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteSingleClose,
    lockAttendance
  };
};

export default useLockAttendanceList;
