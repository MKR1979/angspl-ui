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
import SiteConfigDTO, { SITE_CONFIG } from '@/app/types/SiteConfigDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { SITE_CONFIG_LIST, DELETE_SITE_CONFIG } from '@/app/graphql/SiteConfig';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';
import LookupDTO from '@/app/types/LookupDTO';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  isLoading: boolean;
  open1: boolean;
  arrSiteConfigDTO: SiteConfigDTO[];
  arrCompanyLookup: LookupDTO[];
  dtoSiteConfig: SiteConfigDTO;
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  selectedRow: string;
  selectedCompanyId: string;
  arrSelectedId: string[];
  contextMenu: ContextMenuType | null;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  arrSiteConfigDTO: SiteConfigDTO[];
  total_records: number;
};
const useSiteConfigList = ({ arrSiteConfigDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    open1: false,
    arrSiteConfigDTO: arrSiteConfigDTO,
    dtoSiteConfig: SITE_CONFIG,
    arrCompanyLookup: [] as LookupDTO[],
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    selectedCompanyId: '',
    arrSelectedId: [],
    contextMenu: null,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'SiteConfig' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getCompanyLookup] = useLazyQuery(COMPANY_LOOKUP, { fetchPolicy: 'network-only' });

  const [getSiteConfigList] = useLazyQuery(SITE_CONFIG_LIST, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      company_id: state.dtoSiteConfig.company_id
    }
  });

  const [deleteSiteConfig] = useMutation(DELETE_SITE_CONFIG, {});

  const getCompany = useCallback(async (): Promise<void> => {
    try {
      let arrCompanyLookup: LookupDTO[] = [];
      const { error, data } = await getCompanyLookup();
      if (!error && data?.getCompanyLookup) {
        arrCompanyLookup = [
          { id: -1, text: 'All Companies' }, // <-- Inject All option here
          ...data.getCompanyLookup
        ];
      }
      setState({ arrCompanyLookup: arrCompanyLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCompanyLookup]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrSiteConfigDTO: SiteConfigDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getSiteConfigList({
        variables: {
          company_id: state.dtoSiteConfig.company_id
        }
      });
      if (!error && data) {
        arrSiteConfigDTO = data.getSiteConfigList.siteConfigs.map((item: SiteConfigDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getSiteConfigList.total_records;
      }
      setState({
        arrSiteConfigDTO: arrSiteConfigDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getSiteConfigList, state.dtoSiteConfig.company_id]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

  const onCompanyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoSiteConfig: {
          ...state.dtoSiteConfig,
          company_name: (value as LookupDTO).text,
          company_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoSiteConfig]
  );

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
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [state.sort_field, paginationModel]
  );

  const handleContextMenu = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const rowId = event.currentTarget.getAttribute('data-id') as string;
      const row = apiRef.current.getRow(rowId);
      const companyId = row?.company_id?.toString() || '';
      setState({
        selectedRow: rowId,
        selectedCompanyId: companyId,
        contextMenu: state.contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
      } as StateType);
    },
    [state.contextMenu, apiRef]
  );

  const onRowDoubleClick: GridEventListener<'rowDoubleClick'> = useCallback(
    (params) => {
      const id = params.row.id;
      const company_id = params.row.company_id;

      router.push(`/site-config/edit/${id}?company_id=${company_id}`);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/site-config/edit/${state.selectedRow}?company_id=${state.selectedCompanyId}`);
      //router.push('/site-config/edit/' + state.selectedRow);
    },
    [router, state.selectedRow, state.selectedCompanyId]
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
        const { data } = await deleteSiteConfig({
          variables: {
            ids: params,
            company_id: Number(state.selectedCompanyId)
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
    [deleteSiteConfig, getData, state.visibleDialog1.id, toggleDialog1, state.selectedCompanyId]
  );

  const onCheckChange = useCallback(
    async (
      model: GridRowSelectionModel
      //details: GridCallbackDetails<any>
    ): Promise<void> => {
      setState({ arrSelectedId: model as string[] } as StateType);
    },
    []
  );

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push('/site-config/add');
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
        const { data } = await deleteSiteConfig({
          variables: {
            ids: state.arrSelectedId,
            company_id: Number(state.selectedCompanyId)
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
    [deleteSiteConfig, getData, state.arrSelectedId, toggleDialog, state.selectedCompanyId]
  );

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
  );

  const onFilterModelChange = useCallback(
    async (newFilterModel: GridFilterModel): Promise<void> => {
      let filterText = '';
      if (newFilterModel.quickFilterValues) {
        filterText = newFilterModel.quickFilterValues[0] ?? '';
      }
      setState({ filter_text: filterText } as StateType);
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [paginationModel]
  );

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
    setClose1,
    setOpen1,
    onCompanyNameChange
  };
};

export default useSiteConfigList;
