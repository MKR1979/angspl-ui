import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  useGridApiRef,
  GridInitialState,
} from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../../common/Configuration';
import FeeCollectionDTO, { FEE_COLLECTION } from '@/app/types/FeeCollectionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_FEE_COLLECTION_REVIEW_LIST, DELETE_FEE_COLLECTION } from '@/app/graphql/FeeCollection';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { USER_LOOKUP } from '@/app/graphql/User';
import { useSelector } from '../../../../store';
import * as Constants from '../../../constants/constants';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type visibleDialog1Type = { id: string; visibility: boolean };

type ErrorMessageType = {
  course_id: string | null;
  course_name: string | null;
  learner_id: string | null;
  student_name: string | null;
};

type StateType = {
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  arrUserLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  arrFeeCollectionDTO: FeeCollectionDTO[];
  dtoFeeCollection: FeeCollectionDTO;
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
  arrFeeCollectionDTO: FeeCollectionDTO[];
  total_records: number;
};
const useFeeCollectionList = ({ arrFeeCollectionDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    learner_id: null,
    student_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    open1: false,
    open2: false,
    arrUserLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    arrFeeCollectionDTO: arrFeeCollectionDTO,
    dtoFeeCollection: FEE_COLLECTION,
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    arrSelectedId: [],
    contextMenu: null,
    errorMessages: { ...ERROR_MESSAGES },
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Collect Pay' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [deleteFeeCollection] = useMutation(DELETE_FEE_COLLECTION, {});
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const { companyInfo } = useSelector((state) => state.globalState);
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const getUserData = useCallback(async (): Promise<void> => {
    let arrUserLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup({
      variables: {
        type_name: gMessageConstants.STUDENT_TYPE_NAME
      }
    });
    if (!error && data?.getUserLookup) {
      arrUserLookup = data.getUserLookup;
    }
    setState({ arrUserLookup: arrUserLookup } as StateType);
  }, [getUserLookup]);

  const getCourseData = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup({
      variables: {
        group_name: companyInfo.company_type
      }
    });
    if (!error && data?.getCourseLookup) {
      arrCourseLookup = data.getCourseLookup;
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup, companyInfo.company_type]);

  useEffect(() => {
    getUserData();
    getCourseData();
  }, []);

  const [getFeeCollectionReviewList] = useLazyQuery(GET_FEE_COLLECTION_REVIEW_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoFeeCollection.from_date,
      to_date: state.dtoFeeCollection.to_date,
      learner_id: state.dtoFeeCollection.learner_id,
      course_id: state.dtoFeeCollection.course_id
    }
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrFeeCollectionDTO: FeeCollectionDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getFeeCollectionReviewList({
        variables: {
          from_date: state.dtoFeeCollection.from_date,
          to_date: state.dtoFeeCollection.to_date,
          course_id: state.dtoFeeCollection.course_id !== -1 ? state.dtoFeeCollection.course_id : null,
          user_id: state.dtoFeeCollection.learner_id !== -1 ? state.dtoFeeCollection.learner_id : null
        }
      });
      if (!error && data) {
        arrFeeCollectionDTO = data.getFeeCollectionReviewList.feeCollections.map((item: FeeCollectionDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getFeeCollectionReviewList.total_records;
      }
      setState({
        arrFeeCollectionDTO: arrFeeCollectionDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [
    getFeeCollectionReviewList,
    state.dtoFeeCollection.from_date,
    state.dtoFeeCollection.to_date,
    state.dtoFeeCollection.learner_id,
    state.dtoFeeCollection.course_id
  ]);

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
        const { data } = await deleteFeeCollection({
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
    [deleteFeeCollection, getData, state.visibleDialog1.id, toggleDialog1]
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

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
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

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          student_name: (value as LookupDTO).text,
          learner_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          course_name: (value as LookupDTO).text,
          course_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoFeeCollection: { ...state.dtoFeeCollection, from_date: value } } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoFeeCollection: { ...state.dtoFeeCollection, to_date: value } } as StateType);
    },
    [state.dtoFeeCollection]
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
        const { data } = await deleteFeeCollection({
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
    [deleteFeeCollection, getData, state.arrSelectedId, toggleDialog]
  );

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/add`);
    },
    [router]
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

  const onDeleteSingleClose = useCallback(async () => {
    toggleDialog1('');
  }, [toggleDialog1]);

  return {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onAddClick,
    onSortChange,
    toggleDialog,
    handleContextMenu,
    onFilterModelChange,
    onUserNameChange,
    onFromDateChange,
    onToDateChange,
    onCourseNameChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    DeleteSelected,
    onDeleteSingleClose,
    DeleteSingle,
    onDeleteClick,
    onContextMenu,
    handleClose,
    onDeleteAllClick
  };
};

export default useFeeCollectionList;
