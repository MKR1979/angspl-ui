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
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { COMPANY_DOMAIN_LIST, DELETE_COMPANY_DOMAIN } from '@/app/graphql/CompanyDomain';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../constants/messages-constants';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  isLoading: boolean;
  arrCompanyDomainDTO: CompanyDomainDTO[];
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
};

type Props = {
  arrCompanyDomainDTO: CompanyDomainDTO[];
  total_records: number;
};
const useCompanyDomainList = ({ arrCompanyDomainDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    arrCompanyDomainDTO: arrCompanyDomainDTO,
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
    breadcrumbsItems: [{ label: 'Company Domain' }]
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

  const [getCompanyDomainList] = useLazyQuery(COMPANY_DOMAIN_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize
    }
  });

  const [deleteCompanyDomain] = useMutation(DELETE_COMPANY_DOMAIN, {});

  const getCompanyDomainData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrCompanyDomainDTO: CompanyDomainDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getCompanyDomainList();
      if (!error && data) {
        arrCompanyDomainDTO = data.getCompanyDomainList.companyDomains.map((item: CompanyDomainDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getCompanyDomainList.total_records;
      }
      setState({ arrCompanyDomainDTO: arrCompanyDomainDTO, total_records: total_records, isLoading: false, arrSelectedId: [] as string[] } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCompanyDomainList]);

  useEffect(() => {
    getCompanyDomainData();
  }, [getCompanyDomainData, state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

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
      router.push('/company-domains/edit/' + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push('/company-domains/edit/' + state.selectedRow);
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
        const { data } = await deleteCompanyDomain({
          variables: {
            ids: params
          }
        });
        await toggleDialog1('');
        if (data) {
          getCompanyDomainData();
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_RECORD, 'success');
        } else {
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_FAILED, 'error');
        }
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [deleteCompanyDomain, getCompanyDomainData, state.visibleDialog1.id, toggleDialog1]
  );

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push('/company-domains/add');
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
        const { data } = await deleteCompanyDomain({
          variables: {
            ids: state.arrSelectedId
          }
        });
        await toggleDialog();
        if (data) {
          getCompanyDomainData();
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_RECORD, 'success');
        } else {
          showSnackbar(gMessageConstants.SNACKBAR_DELETE_FAILED, 'error');
        }
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [deleteCompanyDomain, getCompanyDomainData, state.arrSelectedId, toggleDialog]
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
    onDeleteSingleClose
  };
};

export default useCompanyDomainList;
