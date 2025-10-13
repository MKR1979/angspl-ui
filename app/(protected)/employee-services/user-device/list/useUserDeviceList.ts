import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GridEventListener,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  useGridApiRef,
  GridInitialState
} from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../common/Configuration';
import UserDeviceDTO, { USER_DEVICE } from '@/app/types/UserDeviceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { USER_DEVICE_LIST, DELETE_USER_DEVICE } from '@/app/graphql/UserDevice';
import * as Constants from '../../../constants/constants';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  user_id: number | null;
  name: string | null;
  device_id: string | null;
  device_info: string | null;
  status: string | null;
  remark: string | null;
};

type StateType = {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  arrUserDeviceDTO: UserDeviceDTO[];
  arrUserLookup: LookupDTO[];
  dtoUserDevice: UserDeviceDTO;
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
  arrUserDeviceDTO: UserDeviceDTO[];
  total_records: number;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  user_id: null,
  name: null,
  device_id: null,
  device_info: null,
  status: null,
  remark: null
} as ErrorMessageType);

const useUserDeviceList = ({ arrUserDeviceDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    user_id: 0,
    dtoUserDevice: USER_DEVICE,
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    isLoading: false,
    arrUserDeviceDTO: arrUserDeviceDTO,
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
    breadcrumbsItems: [{ label: 'Review User Device' }]
  });

  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [deleteUserDevice] = useMutation(DELETE_USER_DEVICE, {});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  const [getUserDeviceList] = useLazyQuery(USER_DEVICE_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoUserDevice.from_date,
      to_date: state.dtoUserDevice.to_date,
      user_id: state.dtoUserDevice.user_id
    }
  });

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
      let arrUserDeviceDTO: UserDeviceDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getUserDeviceList({
        variables: {
          from_date: state.dtoUserDevice.from_date,
          to_date: state.dtoUserDevice.to_date,
          user_id: state.dtoUserDevice.user_id !== -1 ? state.dtoUserDevice.user_id : null
        }
      });
      if (!error && data) {
        arrUserDeviceDTO = data.getUserDeviceList.userDevices.map((item: UserDeviceDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getUserDeviceList.total_records;
      }
      setState({
        arrUserDeviceDTO: arrUserDeviceDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserDeviceList, state.dtoUserDevice.user_id, state.dtoUserDevice.from_date, state.dtoUserDevice.to_date]);

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
        dtoUserDevice: {
          ...state.dtoUserDevice,
          name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoUserDevice]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoUserDevice: { ...state.dtoUserDevice, from_date: value } } as StateType);
    },
    [state.dtoUserDevice]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoUserDevice: { ...state.dtoUserDevice, to_date: value } } as StateType);
    },
    [state.dtoUserDevice]
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
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/edit/` + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/edit/` + state.selectedRow);
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
        const { data } = await deleteUserDevice({
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
    [deleteUserDevice, getData, state.visibleDialog1.id, toggleDialog1]
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
        const { data } = await deleteUserDevice({
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
    [deleteUserDevice, getData, state.arrSelectedId, toggleDialog]
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
    onEditClick,
    onSortChange,
    toggleDialog,
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
    onDeleteClick,
    DeleteSingle,
    onDeleteAllClick,
    DeleteSelected,
    onDeleteSingleClose
  };
};

export default useUserDeviceList;
