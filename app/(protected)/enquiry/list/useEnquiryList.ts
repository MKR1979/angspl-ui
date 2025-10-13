import { useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize } from '../../../common/Configuration';
import ContactPointDTO, { CONTACT_US } from '@/app/types/ContactUsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_ENQUIRY_REVIEW_LIST, DELETE_ENQUIRY } from '@/app/graphql/ContactUs';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { arrEnquiryCategoryType } from '@/app/common/Configuration';
import { EMAIL_TEMPLATE_LOOKUP, GET_EMAIL_TEMPLATE } from '@/app/graphql/EmailTemplate';
import { ADD_EMAIL } from '@/app/graphql/Email';
import { useSelector } from '../../../store/';

type visibleDialog1Type = { id: string; visibility: boolean };

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  email_template_name: null,
});

type StateType = {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  arrContactPointDTO: ContactPointDTO[];
  arrEnquiryCategoryType: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
  dtoContactPoint: ContactPointDTO;
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

type ErrorMessageType = {
  email_template_name: string | null;
};

type Props = {
  arrContactPointDTO: ContactPointDTO[];
  total_records: number;
};

const useEnquiryList = ({ arrContactPointDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    user_id: 0,
    dtoContactPoint: CONTACT_US,
    errorMessages: { ...ERROR_MESSAGES },
    arrEnquiryCategoryType: arrEnquiryCategoryType,
    arrEmailTemplateLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    isLoading: false,
    arrContactPointDTO: arrContactPointDTO,
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
    breadcrumbsItems: [{ label: 'Review Enquiries' }]
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

  const [getEnquiryReviewList] = useLazyQuery(GET_ENQUIRY_REVIEW_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      from_date: state.dtoContactPoint.from_date,
      to_date: state.dtoContactPoint.to_date,
      category_name: state.dtoContactPoint.category_name
    }
  });

  const [getEmailTemplateLookup] = useLazyQuery(EMAIL_TEMPLATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getEmailTemplate] = useLazyQuery(GET_EMAIL_TEMPLATE, { fetchPolicy: 'network-only' });
  const [deleteEnquiry] = useMutation(DELETE_ENQUIRY, {});
  const [addEmail] = useMutation(ADD_EMAIL, {});
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const MAIL_CONFIG = {
    smtpHost: siteConfig.find((c) => c.key === 'SMTP_HOST')?.value ?? '',
    smtpPort: Number(siteConfig.find((c) => c.key === 'SMTP_PORT')?.value ?? ''),
    smtpUser: siteConfig.find((c) => c.key === 'SMTP_USER')?.value ?? '',
    smtpPassword: siteConfig.find((c) => c.key === 'SMTP_PASSWORD')?.value ?? '',
    secure: siteConfig.find((c) => c.key === 'SMTP_SECURE')?.value?.toLowerCase() === 'true',
    fromAddress: siteConfig.find((c) => c.key === 'SMTP_FROM')?.value ?? '',
    resendOtpTime: Number(siteConfig.find((c) => c.key === 'RESEND_OTP_TIME')?.value ?? '')
  };
  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrContactPointDTO: ContactPointDTO[] = [];
      let total_records: number = 0;
      const { error, data } = await getEnquiryReviewList({
        variables: {
          from_date: state.dtoContactPoint.from_date,
          to_date: state.dtoContactPoint.to_date,
          category_name: state.dtoContactPoint.category_name || 'All'
        }
      });
      if (!error && data) {
        arrContactPointDTO = data.getEnquiryReviewList.enquiries.map((item: ContactPointDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getEnquiryReviewList.total_records;
      }
      setState({
        arrContactPointDTO: arrContactPointDTO,
        total_records: total_records,
        isLoading: false,
        arrSelectedId: [] as string[]
      } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEnquiryReviewList, state.dtoContactPoint.category_name, state.dtoContactPoint.from_date, state.dtoContactPoint.to_date]);

  useEffect(() => {
    getData();
  }, [getData, state.filter_text, state.sort_field, state.sort_direction, paginationModel, state.user_id]);

  const getEmailTemplateData = useCallback(async (): Promise<void> => {
    try {
      const { error, data } = await getEmailTemplate({
        variables: {
          id: state.dtoContactPoint.email_template_id,
        }
      });

      if (!error && data?.getEmailTemplate) {
        setState({
          ...state,
          dtoContactPoint: {
            ...state.dtoContactPoint,
            email_template_body: data.getEmailTemplate.email_template_body,
            email_template_sub: data.getEmailTemplate.email_template_sub,
            email_template_name: data.getEmailTemplate.email_template_name,
          }
        });
      }
    } catch (err) {
      console.error('Error loading email template:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplate, state]);

  // useEffect runs when email_template_id is available
  useEffect(() => {
    if (state.dtoContactPoint.email_template_id) {
      getEmailTemplateData();
    }
  }, [state.dtoContactPoint.email_template_id, getEmailTemplateData]);

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

  const getEmailTemplates = useCallback(async (): Promise<void> => {
    try {
      let arrEmailTemplateLookup: LookupDTO[] = [];
      const { error, data } = await getEmailTemplateLookup({
        variables: {
          type_name: gMessageConstants.EMPLOYEE_TYPE_NAME
        }
      });
      if (!error && data?.getEmailTemplateLookup) {
        arrEmailTemplateLookup = [
          { id: -1, text: 'All Users' }, // <-- Inject All option here
          ...data.getEmailTemplateLookup
        ];
      }
      setState({ arrEmailTemplateLookup: arrEmailTemplateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplateLookup]);

  useEffect(() => {
    getEmailTemplates();
  }, [getEmailTemplates]);

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

  const onEnquiryCategoryChange = useCallback(
    async (_event: any, value: unknown) => {
      const selected = value as LookupDTO;
      setState({
        ...state,
        dtoContactPoint: {
          ...state.dtoContactPoint,
          category_name: selected?.text || 'All'
        }
      });
    },
    [state]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoContactPoint: { ...state.dtoContactPoint, from_date: value } } as StateType);
    },
    [state.dtoContactPoint]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoContactPoint: { ...state.dtoContactPoint, to_date: value } } as StateType);
    },
    [state.dtoContactPoint]
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
        const { data } = await deleteEnquiry({
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
    [deleteEnquiry, getData, state.visibleDialog1.id, toggleDialog1]
  );

  // const onCheckChange = useCallback(async (model: GridRowSelectionModel): Promise<void> => {
  //   setState({ arrSelectedId: model as string[] } as StateType);
  // }, []);

  const onEmailTemplateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          email_template_id: (value as LookupDTO).id,
          email_template_name: (value as LookupDTO).text
        }
      } as StateType);

    },
    [state.dtoContactPoint]
  );

  const validateEmailTemplate = useCallback(async () => {
    if (state.dtoContactPoint.email_template_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoContactPoint.email_template_name]);

  const onEmailTemplateNameBlur = useCallback(async () => {
    const email_template_name = await validateEmailTemplate();
    setState({ errorMessages: { ...state.errorMessages, email_template_name: email_template_name } } as StateType);
  }, [validateEmailTemplate, state.errorMessages]);


  const onDeleteAllClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog();
    },
    [toggleDialog]
  );

  const onCheckChange = useCallback(
    (model: GridRowSelectionModel): void => {
      const selectedUserIds = Array.from(
        new Set(
          state.arrContactPointDTO
            .filter(row => model.includes(row.id))
            .map(row => row.email)
            .filter((id): id is string => id !== null)
        )
      );

      setState({ ...state, arrSelectedId: model as string[] } as StateType);

      setSelectedUserEmails(selectedUserIds);
    },
    [state, setState, setSelectedUserEmails]
  );

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.email_template_name = await validateEmailTemplate();
    if (errorMessages.email_template_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateEmailTemplate]);


  const onSendEmail = useCallback(async () => {
    try {
      if (await validateForm()) {
        const { data } = await addEmail({
          variables: {
            addEmailInput: {
              to_address: selectedUserEmails.join(', '),
              subject: state.dtoContactPoint.email_template_sub,
              body: state.dtoContactPoint.email_template_body,
              template_name: state.dtoContactPoint.email_template_name,
              attachment_path: '',
              status: '',
              retry_count: 0,
              email_source: 'contact us'
            },
            emailConfigInput: {
              smtpHost: MAIL_CONFIG.smtpHost,
              smtpPort: MAIL_CONFIG.smtpPort,
              smtpUser: MAIL_CONFIG.smtpUser,
              smtpPassword: MAIL_CONFIG.smtpPassword,
              secure: MAIL_CONFIG.secure,
              fromAddress: MAIL_CONFIG.fromAddress
            }
          }
        });

        if (data) {
          showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
          getData();
        }
      }
    } catch (error: any) {
      console.error('❌ Error while sending email:', error);
    }
  }, [addEmail, selectedUserEmails, state.dtoContactPoint, MAIL_CONFIG]);

  const DeleteSelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const { data } = await deleteEnquiry({
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
    [deleteEnquiry, getData, state.arrSelectedId, toggleDialog]
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
    onDeleteClick,
    onDeleteAllClick,
    onSortChange,
    toggleDialog,
    DeleteSingle,
    DeleteSelected,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    setClose1,
    setOpen1,
    setOpen2,
    setClose2,
    onToDateChange,
    onFromDateChange,
    onEnquiryCategoryChange,
    onDeleteSingleClose,
    onEmailTemplateNameBlur,
    onEmailTemplateNameChange,
    onSendEmail
  };
};

export default useEnquiryList;
