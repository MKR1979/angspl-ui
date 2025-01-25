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
import toast from 'react-hot-toast';
import { SortDirectionType, ContextMenuType, defaultPageSize, getLocalTime } from '../../../common/Configuration';
import QuoteDTO from '@/app/types/QuoteDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import {
  QUOTE_LIST,
  DELETE_QUOTE,
  GET_QUOTE_DATE_WISE_COUNT,
  GET_QUOTE_OPEN_COUNT,
  GET_QUOTE_WON_COUNT,
  GET_QUOTE_LOST_COUNT
} from '@/app/graphql/Quote';
import dayjs from 'dayjs';

type visibleDialog1Type = { id: number; visibility: boolean };

type StateType = {
  isLoading: boolean;
  arrQuoteDTO: QuoteDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  selectedRow: number;
  arrSelectedId: string[];
  contextMenu: ContextMenuType | null;
  initialState: GridInitialState;
  totalDatewise: any;
  totalOpen: number;
  totalWon: number;
  totalLost: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  arrQuoteDTO: QuoteDTO[];
  total_records: number;
  totalDatewise: any;
  totalOpen: number;
  totalWon: number;
  totalLost: number;
};
const useQuoteList = ({ arrQuoteDTO, total_records, totalDatewise, totalOpen, totalWon, totalLost }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    arrQuoteDTO: arrQuoteDTO,
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: 0, visibility: false },
    selectedRow: 0,
    arrSelectedId: [],
    contextMenu: null,
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    totalDatewise: totalDatewise,
    totalOpen: totalOpen,
    totalWon: totalWon,
    totalLost: totalLost,
    breadcrumbsItems: [{ label: 'Quotes' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getQuoteList] = useLazyQuery(QUOTE_LIST, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize
    }
  });

  const [deleteQuote] = useMutation(DELETE_QUOTE, {});

  const getData = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrQuoteDTO: QuoteDTO[] = [];
    let total_records: number = 0;
    const { error, data } = await getQuoteList();
    if (!error && data?.getQuoteList?.quotes) {
      arrQuoteDTO = data.getQuoteList.quotes.map((item: QuoteDTO) => {
        return { ...item, id: parseInt(item.id.toString()) };
      });
      if (data?.getQuoteList?.total_records) {
        total_records = data.getQuoteList.total_records;
      }
    }
    setState({
      arrQuoteDTO: arrQuoteDTO,
      total_records: total_records,
      isLoading: false,
      arrSelectedId: [] as string[]
    } as StateType);
  }, [getQuoteList]);

  useEffect(() => {
    getData();
    getTotalQuotesDatewise();
    totalQuotesOpenCount();
    totalQuotesWonCount();
    totalQuotesLostCount();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const toggleDialog = useCallback(async (): Promise<void> => {
    setState({ visibleDialog: !state.visibleDialog } as StateType);
  }, [state.visibleDialog]);

  const toggleDialog1 = useCallback(
    async (id: number): Promise<void> => {
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
      setState({
        selectedRow: Number(event.currentTarget.getAttribute('data-id')),
        contextMenu: state.contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
      } as StateType);
    },
    [state.contextMenu]
  );

  const onRowDoubleClick: GridEventListener<'rowDoubleClick'> = useCallback(
    async (
      params // GridRowParams
      //event, // MuiEvent<React.MouseEvent<HTMLElement>>
      //details // GridCallbackDetails
    ) => {
      router.push('/quotes/edit/' + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push('/quotes/edit/' + state.selectedRow);
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
        const { data } = await deleteQuote({
          variables: {
            ids: params
          }
        });
        await toggleDialog1(0);
        if (data?.deleteQuote) {
          getData();
          getTotalQuotesDatewise();
          totalQuotesOpenCount();
          totalQuotesWonCount();
          totalQuotesLostCount();
          toast.success('record(s) deleted successfully');
        } else {
          toast.error('Error occured while deleting record(s)');
        }
      } catch {
        toast.error('Error occured while deleting record(s)');
      }
    },
    [deleteQuote, getData, state.visibleDialog1.id, toggleDialog1]
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
      router.push('/quotes/add');
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
        const { data } = await deleteQuote({
          variables: {
            ids: state.arrSelectedId
          }
        });
        await toggleDialog();
        if (data?.deleteQuote) {
          getData();
          getTotalQuotesDatewise();
          totalQuotesOpenCount();
          totalQuotesWonCount();
          totalQuotesLostCount();
          toast.success('record(s) deleted successfully');
        } else {
          toast.error('Error occured while deleting record(s)');
        }
      } catch {
        toast.error('Error occured while deleting record(s)');
      }
    },
    [deleteQuote, getData, state.arrSelectedId, toggleDialog]
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
    toggleDialog1(0);
  }, [toggleDialog1]);

  const getTotalQuotesDatewise = useCallback(async (): Promise<void> => {
    const totalDatewise: any[] = await totalQuotesDateWiseCount();
    setState({ totalDatewise: totalDatewise } as StateType);
  }, []);

  const [getQuoteThisMonthDatewiseCount] = useLazyQuery(GET_QUOTE_DATE_WISE_COUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const totalQuotesDateWiseCount = useCallback(async (): Promise<any> => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const { data, error } = await getQuoteThisMonthDatewiseCount({
      variables: {
        from_date: firstDay,
        to_date: lastDay
      }
    });
    if (error || !data?.getQuoteThisMonthDatewiseCount) {
      return [];
    }
    let total = 0;
    const xAxisData = [];
    const yAxisData = [];
    for (let i = 0; i < data.getQuoteThisMonthDatewiseCount.length; i++) {
      xAxisData.push(dayjs(getLocalTime(data.getQuoteThisMonthDatewiseCount[i].quote_date)));
      yAxisData.push(data.getQuoteThisMonthDatewiseCount[i].total);
      total += data.getQuoteThisMonthDatewiseCount[i].total;
    }

    return { total, xAxisData, yAxisData };
  }, [getQuoteThisMonthDatewiseCount]);

  const [getQuoteOpenCount] = useLazyQuery(GET_QUOTE_OPEN_COUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const totalQuotesOpenCount = useCallback(async (): Promise<any> => {
    const { data } = await getQuoteOpenCount();
    setState({ totalOpen: data?.getQuoteOpenCount ?? 0 } as StateType);
  }, [getQuoteOpenCount]);

  const [getQuoteWonCount] = useLazyQuery(GET_QUOTE_WON_COUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const totalQuotesWonCount = useCallback(async (): Promise<any> => {
    const { data } = await getQuoteWonCount();
    setState({ totalWon: data?.getQuoteWonCount ?? 0 } as StateType);
  }, [getQuoteWonCount]);

  const [getQuoteLostCount] = useLazyQuery(GET_QUOTE_LOST_COUNT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const totalQuotesLostCount = useCallback(async (): Promise<any> => {
    const { data } = await getQuoteLostCount();
    setState({ totalLost: data?.getQuoteLostCount ?? 0 } as StateType);
  }, [getQuoteLostCount]);

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

export default useQuoteList;
