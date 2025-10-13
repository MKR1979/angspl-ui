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
import AdmissionDTO from '@/app/types/AdmissionTechDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { DELETE_ADMISSION_TECH, GET_ADMISSION_TECH_LIST } from '@/app/graphql/AdmissionTech';
import { dispatch, useSelector } from '../../../../store';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../../constants/messages-constants';
import * as gConstants from '../../../../constants/constants';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  isLoading: boolean;
  arrAdmissionDTO: AdmissionDTO[];
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
  arrAdmissionDTO: AdmissionDTO[];
  total_records: number;
};
const useAdmissionList = ({ arrAdmissionDTO, total_records }: Props) => {
  const router = useRouter();
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    arrAdmissionDTO: arrAdmissionDTO,
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
    breadcrumbsItems: [{ label: 'Admission' }]
  });
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const reducer = (State = INITIAL_STATE, action: StateType): StateType => {
    return { ...State, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getAdmissionTechList] = useLazyQuery(GET_ADMISSION_TECH_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text || '',
      sort_field: state.sort_field || '',
      sort_direction: state.sort_direction || '',
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize
    }
  });

  const [deleteAdmissionTech] = useMutation(DELETE_ADMISSION_TECH, {});

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrAdmissionDTO: AdmissionDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getAdmissionTechList();
      if (!error && data) {
        arrAdmissionDTO = data.getAdmissionTechList.admissionTechs.map((item: AdmissionDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getAdmissionTechList.total_records;
      }
      setState({
        arrAdmissionDTO: arrAdmissionDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAdmissionTechList]);

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
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/edit/` + params.row.id);
    },
    [router]
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/edit/` + state.selectedRow);
    },
    [router, state.selectedRow]
  );

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      dispatch(setIsEditMode(false));
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/add`);
    },
    [router]
  );

  const onDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog1(state.selectedRow);
      await handleClose();
    },
    [toggleDialog1, handleClose, state.selectedRow]
  );

  const handlePrint = () => {
    if (state.arrSelectedId.length === 0) {
      alert('Please select a row to print.');
      return;
    }

    const selectedId = state.arrSelectedId?.[0];
    if (!selectedId) {
      alert('Please select a row to print.');
      return;
    }

    const selectedData = state.arrAdmissionDTO.find((row) => row.id?.toString() === selectedId.toString());

    if (!selectedData) {
      alert('Selected data not found.');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
        <title>Admission Details</title>
            <style>
            @media print {
              body {
                font-size: 17px;
                margin: 10mm;
              }
              .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 20px;
              }
              h1 {
                font-size: 23px;
                text-align: center;
                grid-column: span 2;
                margin-bottom: 20px;
              }
              .form-group {
                display: flex;
                margin-bottom: 4px;
              }
              .form-label {
                font-weight: bold;
                width: 120px;
              }
              .form-value {
                flex: 1;
              }
              .section-title {
                font-size: 18px;
                font-weight: bold;
                grid-column: span 2;
                margin-top: 15px;
                margin-bottom: 10px;
                border-top: 1px solid #ccc;
                padding-top: 6px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Admission Details</h1>
  
            <div class="form-group"><div class="form-label">ID:</div><div class="form-value">${selectedData.id}</div></div>
            <div class="form-group"><div class="form-label">Course:</div><div class="form-value">${selectedData.course_name}</div></div>
            <div class="form-group"><div class="form-label">Date:</div><div class="form-value">${selectedData.admission_date}</div></div>
  
            <div class="section-title">Personal Info</div>
            <div class="form-group"><div class="form-label">First Name:</div><div class="form-value">${selectedData.first_name}</div></div>
            <div class="form-group"><div class="form-label">Last Name:</div><div class="form-value">${selectedData.last_name}</div></div>
            <div class="form-group"><div class="form-label">Email:</div><div class="form-value">${selectedData.email}</div></div>
            <div class="form-group"><div class="form-label">Phone:</div><div class="form-value">${selectedData.phone_no}</div></div>
            <div class="form-group"><div class="form-label">DOB:</div><div class="form-value">${selectedData.dob}</div></div>
            <div class="form-group"><div class="form-label">Gender:</div><div class="form-value">${selectedData.gender}</div></div>
            <div class="form-group"><div class="form-label">Address:</div><div class="form-value">${selectedData.address}</div></div>
            <div class="form-group"><div class="form-label">City:</div><div class="form-value">${selectedData.city_name}</div></div>
            <div class="form-group"><div class="form-label">State:</div><div class="form-value">${selectedData.state_name}</div></div>
            <div class="form-group"><div class="form-label">Country:</div><div class="form-value">${selectedData.country_name}</div></div>
            <div class="form-group"><div class="form-label">Zip:</div><div class="form-value">${selectedData.zip_code}</div></div>
  
            <div class="section-title">Education</div>
            <div class="form-group"><div class="form-label">10th School:</div><div class="form-value">${selectedData.highschoolname}</div></div>
            <div class="form-group"><div class="form-label">10th %:</div><div class="form-value">${selectedData.highschoolpercentage}</div></div>
            <div class="form-group"><div class="form-label">12th School:</div><div class="form-value">${selectedData.highersschoolname}</div></div>
            <div class="form-group"><div class="form-label">12th %:</div><div class="form-value">${selectedData.highersschoolpercentage}</div></div>
            <div class="form-group"><div class="form-label">Graduation:</div><div class="form-value">${selectedData.graduationname}</div></div>
            <div class="form-group"><div class="form-label">Grad %:</div><div class="form-value">${selectedData.graduationpercentage}</div></div>
  
            <div class="section-title">Documents</div>
            <div class="form-group"><div class="form-label">10th Proof:</div><div class="form-value">${selectedData.tenthproof}</div></div>
            <div class="form-group"><div class="form-label">12th Proof:</div><div class="form-value">${selectedData.twelthproof}</div></div>
            <div class="form-group"><div class="form-label">Grad Proof:</div><div class="form-value">${selectedData.graduationproof}</div></div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const DeleteSingle = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const params = [Number(state.visibleDialog1.id)];
        const { data } = await deleteAdmissionTech({
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
    [deleteAdmissionTech, getData, state.visibleDialog1.id, toggleDialog1]
  );

  const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
    setState({ arrSelectedId: model as string[] } as StateType);
  }, []);

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
        const { data } = await deleteAdmissionTech({
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
    [deleteAdmissionTech, getData, state.arrSelectedId, toggleDialog]
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
    isEditMode,
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
    handlePrint,
    onDeleteSingleClose
  };
};

export default useAdmissionList;
