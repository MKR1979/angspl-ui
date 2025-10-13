import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType } from '../../../../common/Configuration';
import TrackPresenceDTO, { TRACK_PRESENCE } from '@/app/types/TrackPresenceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_PRESENCE_SUMMARY } from '@/app/graphql/Attendance';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { arrTrackPresenceReportType } from '@/app/common/Configuration';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  user_id: number | null;
  name: string | null;
  entry_type: string | null;
  attendance_time: string | null;
  report_type: string | null;
};

type AttendanceStatsType = {
  complete: number;
  incomplete: number;
  absent: number;
  total: number;
};

type StateType = {
  open1: boolean;
  open2: boolean;
  arrUserLookup: LookupDTO[];
  isLoading: boolean;
  dtoTrackPresence: TrackPresenceDTO;
  arrTrackPresenceDTO: TrackPresenceDTO[];
  arrTrackPresenceReportTypeLookup: LookupDTO[];
  attendanceStats: AttendanceStatsType;
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
  arrTrackPresenceDTO: TrackPresenceDTO[];
  total_records: number;
};
const useDailyAttendanceList = ({ arrTrackPresenceDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    device_id: null,
    name: null,
    entry_type: null,
    attendance_time: null,
    report_type: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoTrackPresence: TRACK_PRESENCE,
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    isLoading: false,
    arrTrackPresenceDTO: arrTrackPresenceDTO,
    arrTrackPresenceReportTypeLookup: arrTrackPresenceReportType,
    attendanceStats: {
      complete: 0,
      incomplete: 0,
      absent: 0,
      total: 0
    },
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
    breadcrumbsItems: [{ label: 'Track Presence' }]
  });

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };
  const showSnackbar = useSnackbar();
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getPresenceSummary] = useLazyQuery(GET_PRESENCE_SUMMARY, { fetchPolicy: 'network-only' });

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
      let arrTrackPresenceDTO: TrackPresenceDTO[] = [];

      const { error, data } = await getPresenceSummary({
        variables: {
          from_date: state.dtoTrackPresence.from_date,
          to_date: state.dtoTrackPresence.from_date,
          user_id: state.dtoTrackPresence.user_id !== -1 ? state.dtoTrackPresence.user_id : null,
          report_type: state.dtoTrackPresence.report_type || 'All'
        }
      });

      let complete = 0; // <-- NEW
      let incomplete = 0; // <-- NEW
      let absent = 0;

      if (!error && Array.isArray(data.getPresenceSummary)) {
        arrTrackPresenceDTO = data.getPresenceSummary.map((item: TrackPresenceDTO, index: number) => {
          // ✅ Count based on report_type
          const reportType = item.report_type?.toLowerCase();
          if (reportType === 'present') complete++;
          else if (reportType === 'incomplete') incomplete++;
          else if (reportType === 'absent') absent++;

          return {
            ...item,
            id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
          };
        });
      }

      // ✅ Update stats in state
      setState({
        arrTrackPresenceDTO,
        isLoading: false,
        arrSelectedId: [],
        attendanceStats: {
          complete,
          incomplete,
          absent,
          total: arrTrackPresenceDTO.length
        }
      } as unknown as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getPresenceSummary, state.dtoTrackPresence]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const toggleDialog = useCallback(async (): Promise<void> => {
    setState({ visibleDialog: !state.visibleDialog } as StateType);
  }, [state.visibleDialog]);

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
        dtoTrackPresence: {
          ...state.dtoTrackPresence,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoTrackPresence]
  );

  const onReportTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoTrackPresence: {
          ...state.dtoTrackPresence,
          report_type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoTrackPresence]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoTrackPresence: { ...state.dtoTrackPresence, from_date: value } } as StateType);
    },
    [state.dtoTrackPresence]
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

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

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

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  return {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    toggleDialog,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onUserNameChange,
    onFromDateChange,
    onReportTypeChange
  };
};

export default useDailyAttendanceList;
