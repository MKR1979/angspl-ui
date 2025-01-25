import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DocumentTypeDTO, { DOCUMENT_TYPE } from '@/app/types/DocumentTypeDTO';
import {
  ADD_DOCUMENT_TYPE,
  UPDATE_DOCUMENT_TYPE,
  GET_DOCUMENT_TYPE,
  GET_DOCUMENT_TYPE_DOCUMENT_TYPE_NAME_EXIST
} from '@/app/graphql/DocumentType';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  document_type_name: string | null;
};

type StateType = {
  dtoDocumentType: DocumentTypeDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoDocumentType: DocumentTypeDTO;
};

const useDocumentTypeEntry = ({ dtoDocumentType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    document_type_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentType: dtoDocumentType,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addDocumentType] = useMutation(ADD_DOCUMENT_TYPE, {});

  const [updateDocumentType] = useMutation(UPDATE_DOCUMENT_TYPE, {});

  const [getDocumentType] = useLazyQuery(GET_DOCUMENT_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentTypeDocumentTypeNameExist] = useLazyQuery(GET_DOCUMENT_TYPE_DOCUMENT_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentType: DocumentTypeDTO = DOCUMENT_TYPE;
    const { error, data } = await getDocumentType({
      variables: {
        id: state.dtoDocumentType.id
      }
    });
    if (!error && data?.getDocumentType) {
      dtoDocumentType = data.getDocumentType;
    }
    setState({ dtoDocumentType: dtoDocumentType } as StateType);
  }, [getDocumentType, state.dtoDocumentType.id]);

  const IsDocumentTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getDocumentTypeDocumentTypeNameExist({
      variables: {
        id: state.dtoDocumentType.id,
        document_type_name: state.dtoDocumentType.document_type_name
      }
    });
    if (!error && data?.getDocumentTypeDocumentTypeNameExist) {
      exist = data.getDocumentTypeDocumentTypeNameExist;
    }
    return exist;
  }, [getDocumentTypeDocumentTypeNameExist, state.dtoDocumentType.id, state.dtoDocumentType.document_type_name]);

  useEffect(() => {
    if (state.dtoDocumentType.id > 0) {
      getData();
    }
  }, [state.dtoDocumentType.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoDocumentType: {
          ...state.dtoDocumentType,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoDocumentType]
  );

  const validateDocumentTypeName = useCallback(async () => {
    if (state.dtoDocumentType.document_type_name.trim() === '') {
      return 'Document Type Name is required';
    }
    if (await IsDocumentTypeNameExist()) {
      return 'Document Type Name already exists';
    } else {
      return null;
    }
  }, [state.dtoDocumentType.document_type_name, IsDocumentTypeNameExist]);

  const onDocumentTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const document_type_name = await validateDocumentTypeName();
      setState({ errorMessages: { ...state.errorMessages, document_type_name: document_type_name } } as StateType);
    }, [validateDocumentTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.document_type_name = await validateDocumentTypeName();
    if (errorMessages.document_type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateDocumentTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoDocumentType.id === 0) {
            const { data } = await addDocumentType({
              variables: {
                document_type_name: state.dtoDocumentType.document_type_name
              }
            });
            if (data?.addDocumentType) {
              toast.success('record saved successfully');
              router.push('/document-types/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateDocumentType({
              variables: {
                id: state.dtoDocumentType.id,
                document_type_name: state.dtoDocumentType.document_type_name
              }
            });
            if (data?.updateDocumentType) {
              toast.success('record saved successfully');
              router.push('/document-types/list');
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
    [validateForm, addDocumentType, state.dtoDocumentType, router, updateDocumentType]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-types/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onDocumentTypeNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useDocumentTypeEntry;
