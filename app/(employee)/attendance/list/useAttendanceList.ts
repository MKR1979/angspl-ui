import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../common/Configuration';
import AttendanceDTO from '@/app/types/AttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { ATTENDANCE_LIST } from '@/app/graphql/Attendance';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  isLoading: boolean;
  originalArrAttendanceDTO: AttendanceDTO[];
  arrAttendanceDTO: AttendanceDTO[];
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
  dtoAttendance: {
    from_date: string;
    to_date: string;
  };
  hasPrevData: boolean;
};

type Props = {
  arrAttendanceDTO: AttendanceDTO[];
  total_records: number;
};

const useAttendanceList = ({ arrAttendanceDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();

  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  const getStartOfCurrentWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  };

  const getEndOfWeek = (start: Date, includeSunday: boolean = false): Date => {
    const end = new Date(start);
    end.setDate(end.getDate() + (includeSunday ? 6 : 5));
    return end;
  };

  const startOfWeek = getStartOfCurrentWeek();
  const endOfWeek = getEndOfWeek(startOfWeek, true);

  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    originalArrAttendanceDTO: arrAttendanceDTO,
    arrAttendanceDTO: [],
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    arrSelectedId: [],
    contextMenu: null,
    dtoAttendance: {
      from_date: formatDate(startOfWeek),
      to_date: formatDate(endOfWeek)
    },
    hasPrevData: true,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Attendances' }]
  });

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [weekStartDate, setWeekStartDate] = useState<Date>(startOfWeek);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getAttendanceList] = useLazyQuery(ATTENDANCE_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize
    }
  });

  const filterAttendanceByWeek = (start: Date, end: Date): AttendanceDTO[] => {
    const startUTC = new Date(start);
    startUTC.setHours(0, 0, 0, 0);
    const endUTC = new Date(end);
    endUTC.setHours(23, 59, 59, 999);
    return state.originalArrAttendanceDTO.filter((item) => {
      const itemDate = new Date(item.attendance_time); // use attendance_time if it's in ISO format
      return itemDate >= startUTC && itemDate <= endUTC;
    });
  };

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true });
      let fetchedData: AttendanceDTO[] = [];
      let totalRecords = 0;

      const { error, data } = await getAttendanceList();
      if (!error && data) {
        fetchedData = data.getAttendanceList.attendances.map((item: AttendanceDTO) => ({
          ...item,
          id: parseInt(item.id.toString())
        }));
        totalRecords = data.getAttendanceList.total_records;
      }
      const filteredWeekData = filterAttendanceByWeek(startOfWeek, endOfWeek);
      setState({
        originalArrAttendanceDTO: fetchedData,
        arrAttendanceDTO: filteredWeekData,
        total_records: totalRecords,
        isLoading: false,
        arrSelectedId: []
      });
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceList]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

  const hasPreviousWeekData = (start: Date): boolean => {
    return state.originalArrAttendanceDTO.some((item) => {
      const itemDate = new Date(item.attendance_time);
      return itemDate < start;
    });
  };

  const goToPreviousWeek = () => {
    const prev = new Date(weekStartDate);
    prev.setDate(prev.getDate() - 7);
    const end = getEndOfWeek(prev, true);
    setWeekStartDate(prev);

    const filtered = filterAttendanceByWeek(prev, end);
    setState({
      dtoAttendance: {
        from_date: formatDate(prev),
        to_date: formatDate(end)
      },
      arrAttendanceDTO: filtered,
      hasPrevData: hasPreviousWeekData(prev)
    });
  };

  const goToNextWeek = () => {
    const next = new Date(weekStartDate);
    next.setDate(next.getDate() + 7);
    const end = getEndOfWeek(next, true);
    setWeekStartDate(next);

    const filtered = filterAttendanceByWeek(next, end);
    setState({
      dtoAttendance: {
        from_date: formatDate(next),
        to_date: formatDate(end)
      },
      arrAttendanceDTO: filtered,
      hasPrevData: hasPreviousWeekData(next)
    });
  };

  const isCurrentWeek = () => {
    const currentWeek = getStartOfCurrentWeek();
    return weekStartDate.toDateString() === currentWeek.toDateString();
  };

  const onSortChange = useCallback(
    (model: GridSortModel): void => {
      if (model.length > 0) {
        setState({
          sort_field: model[0].field,
          sort_direction: model[0].sort?.toString() as SortDirectionType
        });
      } else {
        setState({ sort_field: state.sort_field, sort_direction: 'asc' });
      }
    },
    [state.sort_field]
  );

  const onCheckChange = useCallback((model: GridRowSelectionModel): void => {
    setState({ arrSelectedId: model as string[] });
  }, []);

  const onAddClick = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault();
      router.push('/attendance/add');
    },
    [router]
  );

  const onFilterModelChange = useCallback((newFilterModel: GridFilterModel): void => {
    let filterText = '';
    if (newFilterModel.quickFilterValues) {
      filterText = newFilterModel.quickFilterValues[0] ?? '';
    }
    setState({ filter_text: filterText });
  }, []);

  return {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onAddClick,
    onSortChange,
    onFilterModelChange,
    goToPreviousWeek,
    goToNextWeek,
    isCurrentWeek,
    getEndOfWeek
  };
};

export default useAttendanceList;
