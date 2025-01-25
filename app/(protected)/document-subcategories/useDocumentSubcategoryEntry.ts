import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DocumentSubcategoryDTO, { DOCUMENT_SUBCATEGORY } from '@/app/types/DocumentSubcategoryDTO';
import {
  ADD_DOCUMENT_SUBCATEGORY,
  UPDATE_DOCUMENT_SUBCATEGORY,
  GET_DOCUMENT_SUBCATEGORY,
  GET_DOCUMENT_SUBCATEGORY_DOCUMENT_SUBCATEGORY_NAME_EXIST
} from '@/app/graphql/DocumentSubcategory';
import LookupDTO from '@/app/types/LookupDTO';
import { DOCUMENT_CATEGORY_LOOKUP } from '@/app/graphql/DocumentCategory';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  document_subcategory_name: string | null;
  document_category_id: string | null;
};

type StateType = {
  dtoDocumentSubcategory: DocumentSubcategoryDTO;
  arrDocumentCategoryLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoDocumentSubcategory: DocumentSubcategoryDTO;
  arrDocumentCategoryLookup: LookupDTO[];
};

const useDocumentSubcategoryEntry = ({ dtoDocumentSubcategory, arrDocumentCategoryLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    document_subcategory_name: null,
    document_category_id: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentSubcategory: dtoDocumentSubcategory,
    arrDocumentCategoryLookup: arrDocumentCategoryLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addDocumentSubcategory] = useMutation(ADD_DOCUMENT_SUBCATEGORY, {});

  const [updateDocumentSubcategory] = useMutation(UPDATE_DOCUMENT_SUBCATEGORY, {});

  const [getDocumentSubcategory] = useLazyQuery(GET_DOCUMENT_SUBCATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentCategoryLookup] = useLazyQuery(DOCUMENT_CATEGORY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getDocumentSubcategoryDocumentSubcategoryNameExist] = useLazyQuery(GET_DOCUMENT_SUBCATEGORY_DOCUMENT_SUBCATEGORY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentSubcategory: DocumentSubcategoryDTO = DOCUMENT_SUBCATEGORY;
    const { error, data } = await getDocumentSubcategory({
      variables: {
        id: state.dtoDocumentSubcategory.id
      }
    });
    if (!error && data?.getDocumentSubcategory) {
      dtoDocumentSubcategory = data.getDocumentSubcategory;
    }
    setState({ dtoDocumentSubcategory: dtoDocumentSubcategory } as StateType);
  }, [getDocumentSubcategory, state.dtoDocumentSubcategory.id]);

  const getData1 = useCallback(async (): Promise<void> => {
    let arrDocumentCategoryLookup: LookupDTO[] = [];
    const { error, data } = await getDocumentCategoryLookup();
    if (!error && data?.getDocumentCategoryLookup) {
      arrDocumentCategoryLookup = data.getDocumentCategoryLookup;
    }
    setState({ arrDocumentCategoryLookup: arrDocumentCategoryLookup } as StateType);
  }, [getDocumentCategoryLookup]);

  const IsDocumentSubcategoryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getDocumentSubcategoryDocumentSubcategoryNameExist({
      variables: {
        id: state.dtoDocumentSubcategory.id,
        document_category_id: state.dtoDocumentSubcategory.document_category_id,
        document_subcategory_name: state.dtoDocumentSubcategory.document_subcategory_name
      }
    });
    if (!error && data?.getDocumentSubcategoryDocumentSubcategoryNameExist) {
      exist = data.getDocumentSubcategoryDocumentSubcategoryNameExist;
    }
    return exist;
  }, [
    getDocumentSubcategoryDocumentSubcategoryNameExist,
    state.dtoDocumentSubcategory.id,
    state.dtoDocumentSubcategory.document_category_id,
    state.dtoDocumentSubcategory.document_subcategory_name
  ]);

  useEffect(() => {
    if (state.dtoDocumentSubcategory.id > 0) {
      getData();
    }
    getData1();
  }, [state.dtoDocumentSubcategory.id, getData, getData1]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoDocumentSubcategory: {
          ...state.dtoDocumentSubcategory,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoDocumentSubcategory]
  );

  const onDocumentCategoryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDocumentSubcategory: {
          ...state.dtoDocumentSubcategory,
          document_category_id: (value as LookupDTO).id,
          document_category_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoDocumentSubcategory]
  );

  const validateDocumentSubcategoryName = useCallback(async () => {
    if (state.dtoDocumentSubcategory.document_subcategory_name.trim() === '') {
      return 'Document Subcategory Name is required';
    }
    if (await IsDocumentSubcategoryNameExist()) {
      return 'Document Subcategory Name already exists';
    } else {
      return null;
    }
  }, [state.dtoDocumentSubcategory.document_subcategory_name, IsDocumentSubcategoryNameExist]);

  const onDocumentSubcategoryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const document_subcategory_name = await validateDocumentSubcategoryName();
      setState({ errorMessages: { ...state.errorMessages, document_subcategory_name: document_subcategory_name } } as StateType);
    }, [validateDocumentSubcategoryName, state.errorMessages]);

  const validateDocumentCategoryName = useCallback(async () => {
    if (state.dtoDocumentSubcategory.document_category_id === 0) {
      return 'Document Category is required';
    } else {
      return null;
    }
  }, [state.dtoDocumentSubcategory.document_category_id]);

  const onDocumentCategoryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const document_category_id = await validateDocumentCategoryName();
      setState({ errorMessages: { ...state.errorMessages, document_category_id: document_category_id } } as StateType);
    }, [validateDocumentCategoryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.document_subcategory_name = await validateDocumentSubcategoryName();
    if (errorMessages.document_subcategory_name) {
      isFormValid = false;
    }
    errorMessages.document_category_id = await validateDocumentCategoryName();
    if (errorMessages.document_category_id) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateDocumentSubcategoryName, validateDocumentCategoryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoDocumentSubcategory.id === 0) {
            const { data } = await addDocumentSubcategory({
              variables: {
                document_subcategory_name: state.dtoDocumentSubcategory.document_subcategory_name,
                document_category_id: state.dtoDocumentSubcategory.document_category_id
              }
            });
            if (data?.addDocumentSubcategory) {
              toast.success('record saved successfully');
              router.push('/document-subcategories/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateDocumentSubcategory({
              variables: {
                id: state.dtoDocumentSubcategory.id,
                document_subcategory_name: state.dtoDocumentSubcategory.document_subcategory_name,
                document_category_id: state.dtoDocumentSubcategory.document_category_id
              }
            });
            if (data?.updateDocumentSubcategory) {
              toast.success('record saved successfully');
              router.push('/document-subcategories/list');
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
    [validateForm, addDocumentSubcategory, state.dtoDocumentSubcategory, router, updateDocumentSubcategory]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-subcategories/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onDocumentCategoryNameChange,
    onDocumentSubcategoryNameBlur,
    onDocumentCategoryNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useDocumentSubcategoryEntry;
