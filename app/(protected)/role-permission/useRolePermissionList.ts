import { useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../common/Configuration';
import RolePermissionDTO, { ROLE_PERMISSION } from '@/app/types/RolePermissionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { ROLE_LOOKUP } from '@/app/graphql/Role';
import { GET_ROLE_PERMISSION_ALL, ADD_ROLE_PERMISSION_ALL, ADD_OR_UPDATE_ROLE_PERMISSION } from '@/app/graphql/RolePermission';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import { MODULE_LOOKUP } from '@/app/graphql/Module';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  module_name: string | null;
};

type StateType = {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  arrRoleLookup: LookupDTO[];
  arrModuleLookup: LookupDTO[];
  dtoRolePermission: RolePermissionDTO;
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
const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  module_name: null
} as ErrorMessageType);

const useRolePermissionList = () => {
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    user_id: 0,
    dtoRolePermission: ROLE_PERMISSION,
    arrRoleLookup: [] as LookupDTO[],
    arrModuleLookup: [] as LookupDTO[],
    errorMessages: { ...ERROR_MESSAGES },
    open1: false,
    open2: false,
    isLoading: false,
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
    breadcrumbsItems: [{ label: 'Role Permission' }]
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

  const [arrRolePermissionFilter, setArrRolePermissionFilter] = useState<any>([]);
  const [getRoleLookup] = useLazyQuery(ROLE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getModuleLookup] = useLazyQuery(MODULE_LOOKUP, { fetchPolicy: 'network-only' });
  const [addRolePermissionAll] = useMutation(ADD_ROLE_PERMISSION_ALL, {});
  const [addOrUpdateRolePermission] = useMutation(ADD_OR_UPDATE_ROLE_PERMISSION, {});
  const [getRolePermissionAll] = useLazyQuery(GET_ROLE_PERMISSION_ALL, {
    fetchPolicy: 'network-only'
  });

  const getRole = useCallback(async (): Promise<void> => {
    try {
      let arrRoleLookup: LookupDTO[] = [];
      const { error, data } = await getRoleLookup();
      if (!error && data) {
        arrRoleLookup = data.getRoleLookup;
        const firstRole = arrRoleLookup[0];
        if (firstRole && !state.dtoRolePermission.role_id) {
          setState({
            arrRoleLookup: arrRoleLookup,
            dtoRolePermission: {
              ...state.dtoRolePermission,
              role_id: firstRole.id,
              role_name: firstRole.text
            }
          } as StateType);
        } else {
          setState({ arrRoleLookup: arrRoleLookup } as StateType);
        }
      }
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRoleLookup, state.dtoRolePermission]);

  const getModule = useCallback(async (): Promise<void> => {
    try {
      let arrModuleLookup: LookupDTO[] = [];
      const { error, data } = await getModuleLookup();
      if (!error && data?.getModuleLookup) {
        arrModuleLookup = [
          { id: -1, text: 'All' }, // <-- Inject All option here
          ...data.getModuleLookup
        ];
      }
      setState({ arrModuleLookup: arrModuleLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getModuleLookup]);

  useEffect(() => {
    getRole();
    getModule();
  }, [getRole, getModule]);

  const getRolePermissionData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType); // Show spinner
      let arrRolePermissionDTO1: RolePermissionDTO[] = [];
      let arrRolePermissionFilter1: any[] = [];
      const { error, data } = await getRolePermissionAll({
        variables: {
          role_id: state.dtoRolePermission.role_id ?? 1,
          module_id: state.dtoRolePermission.module_id !== -1 ? state.dtoRolePermission.module_id : null
        }
      });
      if (!error && data) {
        arrRolePermissionDTO1 = data.getRolePermissionAll.rolePermissions;
        arrRolePermissionFilter1 = arrRolePermissionDTO1.map((item) => ({
          id: item.id,
          module_name: item.module_name,
          option_id: item.option_id,
          option_name: item.option_name,
          grant: item.grant
        }));
      }
      setArrRolePermissionFilter(arrRolePermissionFilter1);
      setState({ isLoading: false } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRolePermissionAll, state.dtoRolePermission.role_id, state.dtoRolePermission.module_id]);

  useEffect(() => {
    if (state.dtoRolePermission.role_id) {
      getRolePermissionData();
    }
  }, [getRolePermissionData, state.dtoRolePermission.role_id]);

  const handleGrantCheckboxChange = async (row: any, checked: boolean) => {
    try {
      const { data } = await addOrUpdateRolePermission({
        variables: {
          id: row.id,
          role_id: state.dtoRolePermission.role_id ?? 1,
          option_id: row.option_id,
          grant: checked
        }
      });
      if (data) {
        showSnackbar(gMessageConstants.SNACKBAR_ROLE_PERMISSION_GRANT_SUCCESS, 'success');
        const updated = arrRolePermissionFilter.map((item: any) => (item.id === row.id ? { ...item, grant: checked } : item));
        setArrRolePermissionFilter(updated);
      } else {
        showSnackbar(gMessageConstants.SNACKBAR_ROLE_PERMISSION_GRANT_UNSUCCESS, 'error');
      }
    } catch (error) {
      console.log(error);
      showSnackbar(gMessageConstants.SNACKBAR_ROLE_PERMISSION_GRANT_UNSUCCESS, 'error');
    }
  };

  // Compute if all are granted
  const isAllGranted = arrRolePermissionFilter.length > 0 && arrRolePermissionFilter.every((row: any) => row.grant === true);

  const handleGrantAllChange = async () => {
    const isAllGranted = arrRolePermissionFilter.length > 0 && arrRolePermissionFilter.every((row: any) => row.grant === true);
    try {
      const { data } = await addRolePermissionAll({
        variables: {
          role_id: state.dtoRolePermission.role_id,
          module_id: state.dtoRolePermission.module_id !== -1 ? state.dtoRolePermission.module_id : null,
          grant: !isAllGranted
        }
      });
      if (data) {
        showSnackbar(gMessageConstants.SNACKBAR_ALL_ROLE_PERMISSION_GRANT_SUCCESS, 'success');
        const shouldGrant = !(arrRolePermissionFilter.length > 0 && arrRolePermissionFilter.every((row: any) => row.grant));
        const updated = arrRolePermissionFilter.map((item: any) => ({
          ...item,
          grant: shouldGrant
        }));

        setArrRolePermissionFilter(updated);
      } else {
        showSnackbar(gMessageConstants.SNACKBAR_ROLE_PERMISSION_GRANT_UNSUCCESS, 'error');
      }
    } catch (error) {
      console.log(error);
      showSnackbar(gMessageConstants.SNACKBAR_ROLE_PERMISSION_GRANT_UNSUCCESS, 'error');
    }
  };

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

  const onRoleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoRolePermission: {
          ...state.dtoRolePermission,
          role_name: (value as LookupDTO).text,
          role_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoRolePermission]
  );

  const onModuleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoRolePermission: { ...state.dtoRolePermission, module_id: (value as LookupDTO).id, module_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoRolePermission]
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
    toggleDialog,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    onRoleNameChange,
    onDeleteSingleClose,
    arrRolePermissionFilter,
    handleGrantCheckboxChange,
    isAllGranted,
    handleGrantAllChange,
    onModuleNameChange
  };
};

export default useRolePermissionList;
