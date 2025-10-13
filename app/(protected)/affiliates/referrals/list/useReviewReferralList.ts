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
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../common/Configuration';
import ReferralDTO, { REFERRAL } from '@/app/types/ReferralDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { REFERRAL_REVIEW_LIST, DELETE_REFERRAL, VERIFY_REFERRAL } from '@/app/graphql/Referral';
import * as Constants from '../../../constants/constants';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import { dispatch, useSelector } from '../../../../store/';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  arrReferralDTO: ReferralDTO[];
  arrUserLookup: LookupDTO[];
  dtoReferral: ReferralDTO;
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
  arrReferralDTO: ReferralDTO[];
  total_records: number;
};

const useReferralList = ({ arrReferralDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    user_id: 0,
    dtoReferral: REFERRAL,
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    isLoading: false,
    arrReferralDTO: arrReferralDTO,
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
    breadcrumbsItems: [{ label: 'Review Referrals' }]
  });

  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });

  const [getReferralReviewList] = useLazyQuery(REFERRAL_REVIEW_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoReferral.from_date,
      to_date: state.dtoReferral.to_date,
      user_id: state.dtoReferral.user_id
    }
  });

  const [deleteReferral] = useMutation(DELETE_REFERRAL, {});
  const [verifyReferral] = useMutation(VERIFY_REFERRAL, {});
  const showSnackbar = useSnackbar();
  const getUserList = useCallback(async (): Promise<void> => {
    let arrUserLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup({
      variables: {
        type_name: gMessageConstants.AFFILIATE_TYPE_NAME
      }
    });
    if (!error && data?.getUserLookup) {
      arrUserLookup = [
        { id: -1, text: 'All Users' },
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
      let arrReferralDTO: ReferralDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getReferralReviewList({
        variables: {
          from_date: state.dtoReferral.from_date,
          to_date: state.dtoReferral.to_date,
          user_id: state.dtoReferral.user_id !== -1 ? state.dtoReferral.user_id : null
        }
      });
      if (!error && data) {
        arrReferralDTO = data.getReferralReviewList.referrals.map((item: ReferralDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getReferralReviewList.total_records;
      }
      setState({
        arrReferralDTO: arrReferralDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getReferralReviewList, state.dtoReferral.user_id, state.dtoReferral.from_date, state.dtoReferral.to_date]);

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
        dtoReferral: {
          ...state.dtoReferral,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoReferral]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoReferral: { ...state.dtoReferral, from_date: value } } as StateType);
    },
    [state.dtoReferral]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoReferral: { ...state.dtoReferral, to_date: value } } as StateType);
    },
    [state.dtoReferral]
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
      dispatch(setIsEditMode(true));
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/edit/` + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/edit/` + state.selectedRow);
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
        const { data } = await deleteReferral({
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
    [deleteReferral, getData, state.visibleDialog1.id, toggleDialog1]
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
      dispatch(setIsEditMode(false));
      router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/add`);
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
        const { data } = await deleteReferral({
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
    [deleteReferral, getData, state.arrSelectedId, toggleDialog]
  );

  const VerifySelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      const { data } = await verifyReferral({
        variables: {
          ids: state.arrSelectedId
        }
      });
      if (data) {
        getData();
        showSnackbar(gMessageConstants.SNACKBAR_VERIFY_RECORD, 'success');
      } else {
        showSnackbar(gMessageConstants.SNACKBAR_VERIFY_FAILED, 'error');
      }
    },
    [verifyReferral, getData, state.arrSelectedId, toggleDialog]
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
    setClose1,
    setOpen1,
    onToDateChange,
    onFromDateChange,
    onUserNameChange,
    onDeleteSingleClose,
    VerifySelected,
    isEditMode
  };
};

export default useReferralList;
