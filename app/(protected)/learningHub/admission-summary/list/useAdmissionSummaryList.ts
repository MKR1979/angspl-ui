import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../common/Configuration';
import AdmissionReportDTO, { ADMISSION_REPORT } from '@/app/types/AdmissionReportDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { GET_ADMISSION_SUMMARY_LIST } from '@/app/graphql/AdmissionReport';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSelector } from '@/app/store';
import { USER_LOOKUP } from '@/app/graphql/User';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  course_id: number | null;
  user_id: number | null;
};

type StateType = {
  course_id: number;
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  arrAdmissionReportDTO: AdmissionReportDTO[];
  arrUserLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  dtoAdmissionReport: AdmissionReportDTO;
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
  arrAdmissionReportDTO: AdmissionReportDTO[];
  total_records: number;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  course_id: null,
  user_id: null
} as ErrorMessageType);

const useAdmSummaryList = ({ arrAdmissionReportDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    course_id: 0,
    user_id: 0,
    dtoAdmissionReport: ADMISSION_REPORT,
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    isLoading: false,
    arrAdmissionReportDTO: arrAdmissionReportDTO,
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
    breadcrumbsItems: [{ label: 'Admission Summary' }]
  });

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };
  const { companyInfo } = useSelector((state) => state.globalState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  const [getAdmissionSummaryList] = useLazyQuery(GET_ADMISSION_SUMMARY_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoAdmissionReport.from_date,
      to_date: state.dtoAdmissionReport.to_date,
      user_id: state.dtoAdmissionReport.user_id,
      course_id: state.dtoAdmissionReport.course_id,
      source_flag: companyInfo.company_type
    }
  });

  const getUserList = useCallback(async (): Promise<void> => {
    let arrUserLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup({
      variables: {
        type_name: gMessageConstants.STUDENT_TYPE_NAME
      }
    });
    if (!error && data?.getUserLookup) {
      arrUserLookup = [{ id: -1, text: 'All Users' }, ...data.getUserLookup];
    }
    setState({ arrUserLookup: arrUserLookup } as StateType);
  }, [getUserLookup]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const getCourseList = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
    if (!error && data?.getCourseLookup) {
      arrCourseLookup = [{ id: -1, text: 'All Course' }, ...data.getCourseLookup];
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  useEffect(() => {
    getCourseList();
    getUserList();
  }, [getCourseList, getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrAdmissionReportDTO: AdmissionReportDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getAdmissionSummaryList({
        variables: {
          source_flag: companyInfo.company_type,
          from_date: state.dtoAdmissionReport.from_date,
          to_date: state.dtoAdmissionReport.to_date,
          user_id: state.dtoAdmissionReport.user_id !== -1 ? state.dtoAdmissionReport.user_id : null,
          course_id: state.dtoAdmissionReport.course_id !== -1 ? state.dtoAdmissionReport.course_id : null
        }
      });
      if (!error && data) {
        arrAdmissionReportDTO = data.getAdmissionSummaryList.admissionSummaries.map((item: AdmissionReportDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getAdmissionSummaryList.total_records;
      }
      setState({
        arrAdmissionReportDTO: arrAdmissionReportDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [
    getAdmissionSummaryList,
    state.dtoAdmissionReport.course_id,
    state.dtoAdmissionReport.user_id,
    companyInfo.company_type,
    state.dtoAdmissionReport.from_date,
    state.dtoAdmissionReport.to_date
  ]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel, state.course_id, state.user_id]);

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

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAdmissionReport: {
          ...state.dtoAdmissionReport,
          course_name: (value as LookupDTO).text,
          course_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoAdmissionReport]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAdmissionReport: {
          ...state.dtoAdmissionReport,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoAdmissionReport]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmissionReport: { ...state.dtoAdmissionReport, from_date: value } } as StateType);
    },
    [state.dtoAdmissionReport]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmissionReport: { ...state.dtoAdmissionReport, to_date: value } } as StateType);
    },
    [state.dtoAdmissionReport]
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
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  return {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onSortChange,
    handleContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    onToDateChange,
    onFromDateChange,
    onCourseNameChange,
    onDeleteSingleClose,
    onUserNameChange
  };
};

export default useAdmSummaryList;
