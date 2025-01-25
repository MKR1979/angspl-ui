import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DocumentDTO, { DOCUMENT } from '@/app/types/DocumentDTO';
import {
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  GET_DOCUMENT,
  UPLOAD_DOCUMENT_FILE,
  //GET_DOCUMENT_DOCUMENT_NAME_EXIST,
  DOCUMENT_LOOKUP
} from '@/app/graphql/Document';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';
import LookupDTO from '@/app/types/LookupDTO';
import { arrDocumentStatus, getLocalTime } from '@/app/common/Configuration';
import { DOCUMENT_TYPE_LOOKUP } from '@/app/graphql/DocumentType';
import { DOCUMENT_SUBCATEGORY_LOOKUP } from '@/app/graphql/DocumentSubcategory';
import { USER_LOOKUP } from '@/app/graphql/User';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  document_name: string | null;
  revision: string | null;
  assigned_to: string | null;
  publish_date: string | null;
  file_name: string | null;
  status: string | null;
};

type StateType = {
  dtoDocument: DocumentDTO;
  arrDocumentTypeLookup: LookupDTO[];
  arrDocumentCategoryLookup: LookupDTO[];
  arrDocumentSubcategoryLookup: LookupDTO[];
  arrDocumentLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
  arrDocumentStatusLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open5: boolean;
  open6: boolean;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoDocument: DocumentDTO;
  arrDocumentTypeLookup: LookupDTO[];
  arrDocumentCategoryLookup: LookupDTO[];
  arrDocumentLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const useDocumentEntry = ({
  dtoDocument,
  arrDocumentTypeLookup,
  arrDocumentCategoryLookup,
  arrDocumentLookup,
  arrAssignedToLookup
}: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    document_name: null,
    revision: null,
    publish_date: null,
    file_name: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocument: dtoDocument,
    arrDocumentTypeLookup: arrDocumentTypeLookup,
    arrDocumentCategoryLookup: arrDocumentCategoryLookup,
    arrDocumentSubcategoryLookup: [],
    arrDocumentLookup: arrDocumentLookup,
    arrAssignedToLookup: arrAssignedToLookup,
    arrDocumentStatusLookup: arrDocumentStatus,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addDocument] = useMutation(ADD_DOCUMENT, {});

  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {});

  const [getDocumentCategoryLookup] = useLazyQuery(DOCUMENT_CATEGORY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentTypeLookup] = useLazyQuery(DOCUMENT_TYPE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentSubcategoryLookup] = useLazyQuery(DOCUMENT_SUBCATEGORY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentLookup] = useLazyQuery(DOCUMENT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocument] = useLazyQuery(GET_DOCUMENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  // const [getDocumentDocumentNameExist] = useLazyQuery(GET_DOCUMENT_DOCUMENT_NAME_EXIST, {
  //   fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  // });

  // const IsDocumentNameExist = useCallback(async (): Promise<boolean> => {
  //   let exist: boolean = false;
  //   const { error, data } = await getDocumentDocumentNameExist({
  //     variables: {
  //       id: state.dtoDocument.id,
  //       document_name: state.dtoDocument.document_name
  //     }
  //   });
  //   if (!error && data) {
  //     exist = data.getDocumentDocumentNameExist;
  //   }
  //   return exist;
  // }, [getDocumentDocumentNameExist, state.dtoDocument.id, state.dtoDocument.document_name]);

  const [singleUpload] = useMutation(UPLOAD_DOCUMENT_FILE, {});

  const getData1 = useCallback(async (): Promise<void> => {
    let arrDocumentCategoryLookup: LookupDTO[] = [];
    const { error, data } = await getDocumentCategoryLookup();
    if (!error && data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = data.getDocumentCategoryLookup;
    }
    setState({ arrDocumentCategoryLookup: arrDocumentCategoryLookup } as StateType);
  }, [getDocumentCategoryLookup]);

  const getData2 = useCallback(async (): Promise<void> => {
    let arrDocumentTypeLookup: LookupDTO[] = [];
    const { error, data } = await getDocumentTypeLookup();
    if (!error && data?.getDocumentTypeLookup) {
      arrDocumentTypeLookup = data.getDocumentTypeLookup;
    }
    setState({ arrDocumentTypeLookup: arrDocumentTypeLookup } as StateType);
  }, [getDocumentTypeLookup]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrDocumentSubcategoryLookup: LookupDTO[] = [];
    const { error, data } = await getDocumentSubcategoryLookup({
      variables: {
        document_category_id: state.dtoDocument.document_category_id
      }
    });
    if (!error && data?.getDocumentSubcategoryLookup) {
      arrDocumentSubcategoryLookup = data.getDocumentSubcategoryLookup;
    }
    setState({ arrDocumentSubcategoryLookup: arrDocumentSubcategoryLookup } as StateType);
  }, [getDocumentSubcategoryLookup, state.dtoDocument.document_category_id]);

  const getData4 = useCallback(async (): Promise<void> => {
    let arrAssignedToLookup: LookupDTO[] = [];
    const { error, data } = await getUserLookup();
    if (!error && data?.getUserLookup) {
      arrAssignedToLookup = data.getUserLookup;
    }
    setState({ arrAssignedToLookup: arrAssignedToLookup } as StateType);
  }, [getUserLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrDocumentLookup: LookupDTO[] = [];
    const { error, data } = await getDocumentLookup();
    if (!error && data?.getDocumentLookup) {
      arrDocumentLookup = data.getDocumentLookup;
    }
    setState({ arrDocumentLookup: arrDocumentLookup } as StateType);
  }, [getDocumentLookup]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocument: DocumentDTO = DOCUMENT;
    const { error, data } = await getDocument({
      variables: {
        id: state.dtoDocument.id
      }
    });
    if (!error && data?.getDocument) {
      dtoDocument = data.getDocument;
    }
    setState({ dtoDocument: dtoDocument } as StateType);
  }, [getDocument, state.dtoDocument.id]);

  useEffect(() => {
    getData1();
    getData2();
    getData4();
    getData5();
    if (state.dtoDocument.id > 0) {
      getData();
    }
  }, [getData1, getData2, getData4, getData5, state.dtoDocument.id, getData]);

  useEffect(() => {
    getData3();
  }, [getData3, state.dtoDocument.document_category_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'revision':
          setState({
            dtoDocument: {
              ...state.dtoDocument,
              [event.target.name]: Number(event.target.value)
            }
          } as StateType);
          break;
        case 'is_template':
          setState({
            dtoDocument: {
              ...state.dtoDocument,
              [event.target.name]: event.target.checked
            }
          } as StateType);
          break;
        default:
          setState({
            dtoDocument: {
              ...state.dtoDocument,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoDocument]
  );

  const onDocumentTypeNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: { ...state.dtoDocument, document_type_id: (value as LookupDTO).id, document_type_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoDocument]
  );

  const onPublishDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoDocument: { ...state.dtoDocument, publish_date: value } } as StateType);
    },
    [state.dtoDocument]
  );

  const onExpirationDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoDocument: { ...state.dtoDocument, expiration_date: value } } as StateType);
    },
    [state.dtoDocument]
  );
  const onDocumentCategoryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: {
          ...state.dtoDocument,
          document_category_id: (value as LookupDTO).id,
          document_category_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoDocument]
  );
  const onDocumentSubcategoryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: {
          ...state.dtoDocument,
          document_subcategory_id: (value as LookupDTO).id,
          document_subcategory_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoDocument]
  );
  const onRelatedDocumentNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: {
          ...state.dtoDocument,
          related_document_id: (value as LookupDTO).id,
          related_document_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoDocument]
  );

  const onAssignedToNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: { ...state.dtoDocument, assigned_to: (value as LookupDTO).id, assigned_to_user_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoDocument]
  );

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocument: { ...state.dtoDocument, status: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoDocument]
  );

  const validateDocumentName = useCallback(async () => {
    if (state.dtoDocument.document_name.trim() === '') {
      return 'Document Name is required';
      // } else if (await IsDocumentNameExist()) {
      //   return 'Document Name already exists';
    } else {
      return null;
    }
  }, [state.dtoDocument.document_name]);

  const onDocumentNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const document_name = await validateDocumentName();
      setState({ errorMessages: { ...state.errorMessages, document_name: document_name } } as StateType);
    }, [validateDocumentName, state.errorMessages]);

  const validateRevision = useCallback(async () => {
    if (state.dtoDocument.revision === 0) {
      return 'Revision is required';
    } else {
      return null;
    }
  }, [state.dtoDocument.revision]);

  const onRevisionBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const revision = await validateRevision();
      setState({ errorMessages: { ...state.errorMessages, revision: revision } } as StateType);
    }, [validateRevision, state.errorMessages]);

  const validatePublishDate = useCallback(async () => {
    if (
      state.dtoDocument.publish_date == null ||
      dayjs(getLocalTime(state.dtoDocument.publish_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return 'Publish Date is required';
    } else {
      return null;
    }
  }, [state.dtoDocument.publish_date]);

  const onPublishDateBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const publish_date = await validatePublishDate();
      setState({ errorMessages: { ...state.errorMessages, publish_date: publish_date } } as StateType);
    }, [validatePublishDate, state.errorMessages]);

  const validateFileName = useCallback(async () => {
    if (state.dtoDocument.file_name.trim() === '') {
      return 'File Name is required';
    } else {
      return null;
    }
  }, [state.dtoDocument.file_name]);

  const validateAssignedTo = useCallback(async () => {
    if (state.dtoDocument.assigned_to === 0) {
      return 'Assigned To is required';
    } else {
      return null;
    }
  }, [state.dtoDocument.assigned_to]);

  const onAssignedToNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const assigned_to = await validateAssignedTo();
      setState({ errorMessages: { ...state.errorMessages, assigned_to: assigned_to } } as StateType);
    }, [validateAssignedTo, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoDocument.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoDocument.status]);

  const onStatusBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.document_name = await validateDocumentName();
    if (errorMessages.document_name) {
      isFormValid = false;
    }
    errorMessages.revision = await validateRevision();
    if (errorMessages.revision) {
      isFormValid = false;
    }
    errorMessages.publish_date = await validatePublishDate();
    if (errorMessages.publish_date) {
      isFormValid = false;
    }
    errorMessages.file_name = await validateFileName();
    if (errorMessages.file_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.assigned_to = await validateAssignedTo();
    if (errorMessages.assigned_to) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateDocumentName, validateRevision, validatePublishDate, validateFileName, validateStatus, validateAssignedTo]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoDocument.id === 0) {
            const { data } = await addDocument({
              variables: {
                document_name: state.dtoDocument.document_name,
                revision: state.dtoDocument.revision,
                document_type_id: state.dtoDocument.document_type_id,
                is_template: state.dtoDocument.is_template,
                publish_date: state.dtoDocument.publish_date,
                expiration_date: state.dtoDocument.expiration_date,
                document_category_id: state.dtoDocument.document_category_id,
                document_subcategory_id: state.dtoDocument.document_subcategory_id,
                description: state.dtoDocument.description,
                related_document_id: state.dtoDocument.related_document_id,
                related_document_revision: state.dtoDocument.related_document_revision,
                assigned_to: state.dtoDocument.assigned_to,
                file_name: state.dtoDocument.file_name,
                status: state.dtoDocument.status
              }
            });
            if (data?.addDocument) {
              toast.success('record saved successfully');
              router.push('/documents/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateDocument({
              variables: {
                id: state.dtoDocument.id,
                document_name: state.dtoDocument.document_name,
                revision: state.dtoDocument.revision,
                document_type_id: state.dtoDocument.document_type_id,
                is_template: state.dtoDocument.is_template,
                publish_date: state.dtoDocument.publish_date,
                expiration_date: state.dtoDocument.expiration_date,
                document_category_id: state.dtoDocument.document_category_id,
                document_subcategory_id: state.dtoDocument.document_subcategory_id,
                description: state.dtoDocument.description,
                related_document_id: state.dtoDocument.related_document_id,
                related_document_revision: state.dtoDocument.related_document_revision,
                assigned_to: state.dtoDocument.assigned_to,
                file_name: state.dtoDocument.file_name,
                status: state.dtoDocument.status
              }
            });
            if (data?.updateDocument) {
              toast.success('record saved successfully');
              router.push('/documents/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addDocument, state.dtoDocument, router, updateDocument]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/documents/list');
    },
    [router]
  );

  const UploadFile = useCallback(async () => {
    const files = (document.getElementById('file_name') as any)!.files;
    if (files.length == 0) {
      return;
    }
    const { data } = await singleUpload({
      variables: {
        files: files
      }
    });
    if (data?.singleUpload) {
      setState({
        dtoDocument: { ...state.dtoDocument, file_name: data.singleUpload[0].filename },
        errorMessages: { ...state.errorMessages, file_name: null }
      } as StateType);
    }
  }, [singleUpload, state.dtoDocument, state.errorMessages]);

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

  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);

  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);

  const setOpen5 = useCallback(async (): Promise<void> => {
    setState({ open5: true } as StateType);
  }, []);

  const setClose5 = useCallback(async (): Promise<void> => {
    setState({ open5: false } as StateType);
  }, []);

  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onDocumentTypeNameChange,
    onPublishDateChange,
    onExpirationDateChange,
    onDocumentCategoryNameChange,
    onDocumentSubcategoryNameChange,
    onRelatedDocumentNameChange,
    onAssignedToNameChange,
    onStatusChange,
    onDocumentNameBlur,
    onRevisionBlur,
    onPublishDateBlur,
    onAssignedToNameBlur,
    onStatusBlur,
    onSaveClick,
    onCancelClick,
    UploadFile,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6
  };
};

export default useDocumentEntry;
