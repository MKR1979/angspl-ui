import { useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  useGridApiRef,
  GridInitialState
} from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, defaultPageSize, regExEMail } from '../../../common/Configuration';
import SendEmailDTO, { SEND_EMAILS } from '@/app/types/SendEmailDTO';
import { ROLE_LOOKUP } from '@/app/graphql/Role';
import { TYPE_LOOKUP } from '@/app/graphql/Type';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { USER_LIST } from '@/app/graphql/User';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import { useSelector } from '../../../store/';
import LookupDTO from '@/app/types/LookupDTO';
import { EMAIL_TEMPLATE_LOOKUP, GET_EMAIL_TEMPLATE } from '@/app/graphql/EmailTemplate';
import { ADD_EMAIL } from '@/app/graphql/Email';


type visibleDialog1Type = { id: string; visibility: boolean };

type Props = {
  arrSendEmailDTO: SendEmailDTO[];
  total_records: number;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  email: null,
  mobile_no: null,
  user_name: null,
  status: null,
  email_template_name: null,
  external_emails: null,
  role_id: null,
  role_name: null,
  type_id: null,
  type_name: null
});

type StateType = {
  isLoading: boolean;
  dtoSendEmail: SendEmailDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrSendEmailDTO: SendEmailDTO[];
  arrRoleLookup: LookupDTO[];
  arrTypeLookup: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
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
  email: string | null;
  mobile_no: string | null;
  user_name: string | null;
  status: string | null;
  email_template_name: string | null;
  external_emails: string | null;
  role_id: number | null;
  role_name: string | null;
  type_id: number | null;
  type_name: string | null;
};

const useUserList = ({ arrSendEmailDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();
  const INITIAL_STATE: StateType = Object.freeze({
    isLoading: false,
    dtoSendEmail: { ...SEND_EMAILS },
    open1: false,
    open2: false,
    open3: false,
    arrSendEmailDTO: arrSendEmailDTO,
    errorMessages: { ...ERROR_MESSAGES },
    arrRoleLookup: [] as LookupDTO[],
    arrTypeLookup: [] as LookupDTO[],
    arrEmailTemplateLookup: [] as LookupDTO[],
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
    breadcrumbsItems: [{ label: 'Notification' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
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
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });
  const [getEmailTemplateLookup] = useLazyQuery(EMAIL_TEMPLATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getUserList] = useLazyQuery(USER_LIST, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      type_id: state.dtoSendEmail.type_id,
      role_id: state.dtoSendEmail.role_id
    }
  });
  const [isSending, setIsSending] = useState(false);
  const [getRoleLookup] = useLazyQuery(ROLE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getTypeLookup] = useLazyQuery(TYPE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getEmailTemplate] = useLazyQuery(GET_EMAIL_TEMPLATE, { fetchPolicy: 'network-only' });
  const [addEmail] = useMutation(ADD_EMAIL, {});
  const [isExternalEmail, setIsExternalEmail] = useState(false);
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);


  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrSendEmailDTO: SendEmailDTO[] = [];

      const { error, data } = await getUserList({
        variables: {
          type_id: state.dtoSendEmail.type_id !== -1 ? state.dtoSendEmail.type_id : null,
          role_id: state.dtoSendEmail.role_id !== -1 ? state.dtoSendEmail.role_id : null,
        }
      });

      if (!error && data) {
        arrSendEmailDTO = data.getUserList.users.map((item: SendEmailDTO) => {
          return { ...item, id: parseInt(item.id.toString()) };
        });
        total_records = data.getUserList.total_records;
      }
      setState({ arrSendEmailDTO: arrSendEmailDTO, total_records: total_records, isLoading: false, arrSelectedId: [] as string[] } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserList, state.dtoSendEmail.type_id, state.dtoSendEmail.role_id]);

  useEffect(() => {
    getData();
  }, [getData]);


  const getRoleData = useCallback(async (type_id: number): Promise<void> => {
    try {
      let arrRoleLookup: LookupDTO[] = [];
      const { error, data } = await getRoleLookup({
        variables: {
          type_id: type_id
        }
      });
      if (!error && data?.getRoleLookup) {
        arrRoleLookup = [
          { id: -1, text: 'All Roles' }, // <-- Inject All option here
          ...data.getRoleLookup
        ];
      }
      setState({ arrRoleLookup: arrRoleLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getRoleLookup]);

  // useEffect(() => {
  //   getData1();
  // }, [getData1]);

  const getUserType = useCallback(async (): Promise<void> => {
    try {
      let arrTypeLookup: LookupDTO[] = [];
      const { error, data } = await getTypeLookup({
        variables: {
          type_name: gMessageConstants.EMPLOYEE_TYPE_NAME
        }
      });
      if (!error && data?.getTypeLookup) {
        arrTypeLookup = [
          { id: -1, text: 'All Types' }, // <-- Inject All option here
          ...data.getTypeLookup
        ];
      }
      setState({ arrTypeLookup: arrTypeLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getTypeLookup]);

  useEffect(() => {
    getUserType();
  }, [getUserType]);

  const getData2 = useCallback(async (): Promise<void> => {
    try {
      let arrEmailTemplateLookup: LookupDTO[] = [];
      const { error, data } = await getEmailTemplateLookup();
      if (!error && data?.getEmailTemplateLookup) {
        arrEmailTemplateLookup = data.getEmailTemplateLookup;
      }
      setState({ arrEmailTemplateLookup: arrEmailTemplateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplateLookup]);

  useEffect(() => {
    getData2();
  }, [getData2]);

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  // const toggleDialog = useCallback(async (): Promise<void> => {
  //   setState({ visibleDialog: !state.visibleDialog } as StateType);
  // }, [state.visibleDialog]);

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

  const getEmailTemplateData = useCallback(async (selectedId: number): Promise<void> => {
    try {
      const { error, data } = await getEmailTemplate({
        variables: {
          id: selectedId
        }
      });
      if (!error && data?.getEmailTemplate) {
        const dtoSendEmail: SendEmailDTO = {
          ...data.getEmailTemplate
        };
        setState({ dtoSendEmail } as StateType);
      }
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplate, state.dtoSendEmail.email_template_id]);

  const onEmailTemplateNameChange = useCallback(
    async (event: any, value: any) => {
      setState({
        dtoSendEmail: {
          ...state.dtoSendEmail,
          email_template_id: (value as LookupDTO).id,
          email_template_name: (value as LookupDTO).text
        }
      } as StateType);
      getEmailTemplateData(Number(value?.id));
    },
    [state.dtoSendEmail]
  );

  const validateEmailTemplate = useCallback(async () => {
    if (state.dtoSendEmail.email_template_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoSendEmail.email_template_name]);

  const onEmailTemplateNameBlur = useCallback(async () => {
    const email_template_name = await validateEmailTemplate();
    setState({ errorMessages: { ...state.errorMessages, email_template_name: email_template_name } } as StateType);
  }, [validateEmailTemplate, state.errorMessages]);

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose]
  );

const validateEMailId = useCallback(async (): Promise<string | null> => {
  const email = state.dtoSendEmail.external_emails?.trim() ?? ''; // ✅ fallback to empty string
  if (email === '') {
    return gMessageConstants.REQUIRED_FIELD;
  }
  if (!regExEMail.test(email)) {
    return gMessageConstants.INVALID;
  }
  return null; // valid
}, [state.dtoSendEmail.external_emails]);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
 const checked: boolean = event.target.checked;
  console.log('Checkbox checked:', checked); 

  // Do something with the new value
  if (checked) {
     setIsExternalEmail(checked);
  } else {
    setIsExternalEmail(checked);  }

  // Don't rely on isExternalEmail here — it’s stale
};

const onEmailNameBlur = useCallback(async () => {
  if (isExternalEmail) {
    const external_emails = await validateEMailId();
    setState({
      errorMessages: { ...state.errorMessages, external_emails: external_emails }
    } as StateType);
  } else {
    // clear error when checkbox is unchecked
    setState({
      errorMessages: { ...state.errorMessages, external_emails: null }
    } as StateType);
  }
}, [validateEMailId, state.errorMessages, isExternalEmail]);


 const validateForm = useCallback(async () => {
  let isFormValid = true;
  const errorMessages: ErrorMessageType = {} as ErrorMessageType;

  errorMessages.email_template_name = await validateEmailTemplate();
  if (errorMessages.email_template_name) {
    isFormValid = false;
  }

  if (isExternalEmail) { // ✅ only validate external emails if checkbox checked
    errorMessages.external_emails = await validateEMailId();
    if (errorMessages.external_emails) {
      isFormValid = false;
    }
  } else {
    errorMessages.external_emails = null;
  }

  setState({ errorMessages: errorMessages } as StateType);
  return isFormValid;
}, [validateEmailTemplate, validateEMailId, isExternalEmail]);


  const onCheckChange = useCallback(
    (model: GridRowSelectionModel): void => {
      const selectedUserIds = Array.from(
        new Set(
          state.arrSendEmailDTO
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

  const onSendEmail = useCallback(async () => {
    try {
          setIsSending(true); // 🔹 disable button while sending

      if (await validateForm()) {

        const externalEmails = state.dtoSendEmail.external_emails?.trim();
        const allEmails = [...selectedUserEmails,
        ...(externalEmails ? externalEmails.split(',').map(email => email.trim()) : [])];
        const uniqueEmails = Array.from(new Set(allEmails));

        const { data } = await addEmail({
          variables: {
            addEmailInput: {
              to_address: uniqueEmails.join(', '),
              subject: state.dtoSendEmail.email_template_sub,
              body: state.dtoSendEmail.email_template_body,
              template_name: state.dtoSendEmail.email_template_name,
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
          showSnackbar(gMessageConstants.SNACKBAR_SEND_EMAIL, 'success');
          getData();

          // 🔹 Clear external email field
          setState({
            ...state,
            dtoSendEmail: {
              ...state.dtoSendEmail,
              external_emails: ''
            }
          });
        }
      }
    } catch (error: any) {
      console.error('❌ Error while sending email:', error);
    } finally {
      setIsSending(false); // 🔹 Re-enable button and reset text
    }
  }, [addEmail, selectedUserEmails, state, MAIL_CONFIG]);


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
  const onRoleNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoSendEmail: { ...state.dtoSendEmail, role_id: (value as LookupDTO).id, role_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoSendEmail]
  );

  const onTypeChange = useCallback(
    async (event: any, value: any) => {
      setState({
        dtoSendEmail: { ...state.dtoSendEmail, type_id: (value as LookupDTO).id, type_name: (value as LookupDTO).text }
      } as StateType);
      getRoleData(value.id);
    },
    [state.dtoSendEmail]
  );

  const onExternalEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value.replace(/\s+/g, '').toLowerCase();

    // Update only if the value has changed to avoid unnecessary renders
    if (state.dtoSendEmail.external_emails !== updatedValue) {
      setState({
        dtoSendEmail: {
          ...state.dtoSendEmail,
          external_emails: updatedValue,
        }
      } as StateType);
    }
  };

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

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);

  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onSortChange,
    // handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    onSendEmail,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onTypeChange,
    onRoleNameChange,
    onEmailTemplateNameBlur,
    onEmailTemplateNameChange,
    handleCheckbox, // ✅ added
    isExternalEmail,    // ✅ added
    isSending,
    onEmailNameBlur,
    onExternalEmailChange
  };
};

export default useUserList;
