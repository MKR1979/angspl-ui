import { useCallback, useEffect, useReducer } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType } from '../../../../common/Configuration';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ATTENDANCE_SUMMARY } from '@/app/graphql/Attendance';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

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
  open1: boolean;
  arrUserLookup: LookupDTO[];
  isLoading: boolean;
  dtoAttendance: AttendanceDTO;
  arrAttendanceDTO: AttendanceDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
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
const useAttendanceSummaryList = ({ arrAttendanceDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();

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

  const INITIAL_STATE: StateType = Object.freeze({
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
    breadcrumbsItems: [{ label: 'Attendances' }]
  });

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getAttendanceSummary] = useLazyQuery(GET_ATTENDANCE_SUMMARY, { fetchPolicy: 'network-only' });
  const showSnackbar = useSnackbar();

  const getUserList = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup({
        variables: {
          type_name: gMessageConstants.EMPLOYEE_TYPE_NAME
        }
      });
      if (!error && data?.getUserLookup) {
        arrUserLookup = [{ id: -1, text: 'All Users' }, ...data.getUserLookup];
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
      let arrAttendanceDTO: AttendanceDTO[] = [];

      const { error, data } = await getAttendanceSummary({
        variables: {
          from_date: state.dtoAttendance.from_date,
          to_date: state.dtoAttendance.to_date,
          user_id: state.dtoAttendance.user_id !== -1 ? state.dtoAttendance.user_id : null
        }
      });

      if (!error && Array.isArray(data.getAttendanceSummary)) {
        arrAttendanceDTO = data.getAttendanceSummary.map((item: AttendanceDTO, index: number) => ({
          ...item,
          id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
        }));
      }
      setState({
        arrAttendanceDTO,
        isLoading: false,
        arrSelectedId: []
      } as unknown as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceSummary, state.dtoAttendance]);

  useEffect(() => {
    getData();
  }, [getData]);

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
        dtoAttendance: {
          ...state.dtoAttendance,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
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

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

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

  return {
    state,
    apiRef,
    onCheckChange,
    onSortChange,
    toggleDialog,
    onFilterModelChange,
    setOpen1,
    setClose1,
    onUserNameChange,
    onFromDateChange,
    onToDateChange
  };
};

export default useAttendanceSummaryList;
