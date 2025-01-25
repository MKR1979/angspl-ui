import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ProductCategoryDTO, { PRODUCT_CATEGORY } from '@/app/types/ProductCategoryDTO';
import {
  ADD_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_PRODUCT_CATEGORY_NAME_EXIST
} from '@/app/graphql/ProductCategory';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  product_category_name: string | null;
};

type StateType = {
  dtoProductCategory: ProductCategoryDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoProductCategory: ProductCategoryDTO;
};

const useProductCategoryEntry = ({ dtoProductCategory }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    product_category_name: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoProductCategory: dtoProductCategory,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addProductCategory] = useMutation(ADD_PRODUCT_CATEGORY, {});

  const [updateProductCategory] = useMutation(UPDATE_PRODUCT_CATEGORY, {});

  const [getProductCategory] = useLazyQuery(GET_PRODUCT_CATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductCategoryProductCategoryNameExist] = useLazyQuery(GET_PRODUCT_CATEGORY_PRODUCT_CATEGORY_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoProductCategory: ProductCategoryDTO = PRODUCT_CATEGORY;
    const { error, data } = await getProductCategory({
      variables: {
        id: state.dtoProductCategory.id
      }
    });
    if (!error && data?.getProductCategory) {
      dtoProductCategory = data.getProductCategory;
    }
    setState({ dtoProductCategory: dtoProductCategory } as StateType);
  }, [getProductCategory, state.dtoProductCategory.id]);

  const IsProductCategoryNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getProductCategoryProductCategoryNameExist({
      variables: {
        id: state.dtoProductCategory.id,
        product_category_name: state.dtoProductCategory.product_category_name
      }
    });
    if (!error && data?.getProductCategoryProductCategoryNameExist) {
      exist = data.getProductCategoryProductCategoryNameExist;
    }
    return exist;
  }, [getProductCategoryProductCategoryNameExist, state.dtoProductCategory.id, state.dtoProductCategory.product_category_name]);

  useEffect(() => {
    if (state.dtoProductCategory.id > 0) {
      getData();
    }
  }, [state.dtoProductCategory.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoProductCategory: {
          ...state.dtoProductCategory,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoProductCategory]
  );

  const validateProductCategoryName = useCallback(async () => {
    if (state.dtoProductCategory.product_category_name.trim() === '') {
      return 'Product Category Name is required';
    }
    if (await IsProductCategoryNameExist()) {
      return 'Product Category Name already exists';
    } else {
      return null;
    }
  }, [state.dtoProductCategory.product_category_name, IsProductCategoryNameExist]);

  const onProductCategoryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const product_category_name = await validateProductCategoryName();
      setState({ errorMessages: { ...state.errorMessages, product_category_name: product_category_name } } as StateType);
    }, [validateProductCategoryName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.product_category_name = await validateProductCategoryName();
    if (errorMessages.product_category_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateProductCategoryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoProductCategory.id === 0) {
            const { data } = await addProductCategory({
              variables: {
                product_category_name: state.dtoProductCategory.product_category_name
              }
            });
            if (data?.addProductCategory) {
              toast.success('record saved successfully');
              router.push('/product-categories/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateProductCategory({
              variables: {
                id: state.dtoProductCategory.id,
                product_category_name: state.dtoProductCategory.product_category_name
              }
            });
            if (data?.updateProductCategory) {
              toast.success('record saved successfully');
              router.push('/product-categories/list');
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
    [validateForm, addProductCategory, state.dtoProductCategory, router, updateProductCategory]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/product-categories/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onProductCategoryNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useProductCategoryEntry;
