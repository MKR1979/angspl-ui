import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DocumentCategoryDTO, { DOCUMENT_CATEGORY } from '@/app/types/DocumentCategoryDTO';
import {
  ADD_DOCUMENT_CATEGORY,
  UPDATE_DOCUMENT_CATEGORY,
  GET_DOCUMENT_CATEGORY,
  GET_DOCUMENT_CATEGORY_DOCUMENT_CATEGORY_NAME_EXIST
} from '@/app/graphql/DocumentCategory';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  document_category_name: string | null;
};

type StateType = {
  dtoDocumentCategory: DocumentCategoryDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoDocumentCategory: DocumentCategoryDTO;
};

const useDocumentCategoryEntry = ({ dtoDocumentCategory }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    document_category_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentCategory: dtoDocumentCategory,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addDocumentCategory] = useMutation(ADD_DOCUMENT_CATEGORY, {});

  const [updateDocumentCategory] = useMutation(UPDATE_DOCUMENT_CATEGORY, {});

  const [getDocumentCategory] = useLazyQuery(GET_DOCUMENT_CATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentCategoryDocumentCategoryNameExist] = useLazyQuery(GET_DOCUMENT_CATEGORY_DOCUMENT_CATEGORY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentCategory: DocumentCategoryDTO = DOCUMENT_CATEGORY;
    const { error, data } = await getDocumentCategory({
      variables: {
        id: state.dtoDocumentCategory.id
      }
    });
    if (!error && data?.getDocumentCategory) {
      dtoDocumentCategory = data.getDocumentCategory;
    }
    setState({ dtoDocumentCategory: dtoDocumentCategory } as StateType);
  }, [getDocumentCategory, state.dtoDocumentCategory.id]);

  const IsDocumentCategoryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getDocumentCategoryDocumentCategoryNameExist({
      variables: {
        id: state.dtoDocumentCategory.id,
        document_category_name: state.dtoDocumentCategory.document_category_name
      }
    });
    if (!error && data?.getDocumentCategoryDocumentCategoryNameExist) {
      exist = data.getDocumentCategoryDocumentCategoryNameExist;
    }
    return exist;
  }, [getDocumentCategoryDocumentCategoryNameExist, state.dtoDocumentCategory.id, state.dtoDocumentCategory.document_category_name]);

  useEffect(() => {
    if (state.dtoDocumentCategory.id > 0) {
      getData();
    }
  }, [state.dtoDocumentCategory.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoDocumentCategory: {
          ...state.dtoDocumentCategory,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoDocumentCategory]
  );

  const validateDocumentCategoryName = useCallback(async () => {
    if (state.dtoDocumentCategory.document_category_name.trim() === '') {
      return 'Document Category Name is required';
    }
    if (await IsDocumentCategoryNameExist()) {
      return 'Document Category Name already exists';
    } else {
      return null;
    }
  }, [state.dtoDocumentCategory.document_category_name, IsDocumentCategoryNameExist]);

  const onDocumentCategoryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const document_category_name = await validateDocumentCategoryName();
      setState({ errorMessages: { ...state.errorMessages, document_category_name: document_category_name } } as StateType);
    }, [validateDocumentCategoryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.document_category_name = await validateDocumentCategoryName();
    if (errorMessages.document_category_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateDocumentCategoryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoDocumentCategory.id === 0) {
            const { data } = await addDocumentCategory({
              variables: {
                document_category_name: state.dtoDocumentCategory.document_category_name
              }
            });
            if (data?.addDocumentCategory) {
              toast.success('record saved successfully');
              router.push('/document-categories/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateDocumentCategory({
              variables: {
                id: state.dtoDocumentCategory.id,
                document_category_name: state.dtoDocumentCategory.document_category_name
              }
            });
            if (data?.updateDocumentCategory) {
              toast.success('record saved successfully');
              router.push('/document-categories/list');
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
    [validateForm, addDocumentCategory, state.dtoDocumentCategory, router, updateDocumentCategory]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-categories/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onDocumentCategoryNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useDocumentCategoryEntry;
