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
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../common/Configuration';
import UserPermissionDTO, { USER_PERMISSION } from '@/app/types/UserPermissionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { USER_PERMISSION_LIST, DELETE_USER_PERMISSION } from '@/app/graphql/UserPermission';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../constants/messages-constants';
import LookupDTO from '@/app/types/LookupDTO';
import { MODULE_LOOKUP } from '@/app/graphql/Module';
import { USER_LOOKUP } from '@/app/graphql/User';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  user_name: string | null;
  module_name: string | null;
};

type StateType = {
  isLoading: boolean;
  arrUserPermissionDTO: UserPermissionDTO[];
  dtoUserPermission: UserPermissionDTO;
  arrUserLookup: LookupDTO[];
  arrModuleLookup: LookupDTO[];
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
  open1: boolean;
  open2: boolean;
};

type Props = {
  arrUserPermissionDTO: UserPermissionDTO[];
  total_records: number;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  user_name: null,
  module_name: null
} as ErrorMessageType);

const useUserPermissionList = ({ arrUserPermissionDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    arrUserPermissionDTO: arrUserPermissionDTO,
    total_records: total_records,
    errorMessages: { ...ERROR_MESSAGES },
    dtoUserPermission: USER_PERMISSION,
    arrUserLookup: [] as LookupDTO[],
    arrModuleLookup: [] as LookupDTO[],
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    arrSelectedId: [],
    contextMenu: null,
    open1: false,
    open2: false,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'User Permission' }]
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

  const [getUserPermissionList] = useLazyQuery(USER_PERMISSION_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      user_id: state.dtoUserPermission.user_id,
      module_id: state.dtoUserPermission.module_id
    }
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [getModuleLookup] = useLazyQuery(MODULE_LOOKUP, { fetchPolicy: 'network-only' });
  const [deleteUserPermission] = useMutation(DELETE_USER_PERMISSION, {});

  const getModule = useCallback(async (): Promise<void> => {
    try {
      let arrModuleLookup: LookupDTO[] = [];
      const { error, data } = await getModuleLookup();
      if (!error && data?.getModuleLookup) {
        arrModuleLookup = [{ id: -1, text: 'All' }, ...data.getModuleLookup];
      }
      setState({ arrModuleLookup: arrModuleLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getModuleLookup]);

  const getUserList = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup();
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
    getModule();
  }, [getUserList, getModule]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrUserPermissionDTO: UserPermissionDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getUserPermissionList({
        variables: {
          user_id: state.dtoUserPermission.user_id !== -1 ? state.dtoUserPermission.user_id : null,
          module_id: state.dtoUserPermission.module_id !== -1 ? state.dtoUserPermission.module_id : null
        }
      });
      if (!error && data) {
        arrUserPermissionDTO = data.getUserPermissionList.user_permissions.map((item: UserPermissionDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getUserPermissionList.total_records;
      }
      setState({
        arrUserPermissionDTO: arrUserPermissionDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserPermissionList, state.dtoUserPermission.user_id, state.dtoUserPermission.module_id]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

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
      router.push(`/user-permission/edit/` + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/user-permission/edit/` + state.selectedRow);
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
        const { data } = await deleteUserPermission({
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
    [deleteUserPermission, getData, state.visibleDialog1.id, toggleDialog1]
  );

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

  const onModuleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserPermission: { ...state.dtoUserPermission, module_id: (value as LookupDTO).id, module_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoUserPermission]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserPermission: {
          ...state.dtoUserPermission,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
      // getData();
    },
    [state.dtoUserPermission]
  );

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/user-permission/add`);
    },
    [router]
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
        const { data } = await deleteUserPermission({
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
    [deleteUserPermission, getData, state.arrSelectedId, toggleDialog]
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

  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
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
    onDeleteSingleClose,
    onUserNameChange,
    onModuleNameChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  };
};

export default useUserPermissionList;
