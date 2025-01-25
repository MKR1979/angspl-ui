import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ProductDTO, { PRODUCT } from '@/app/types/ProductDTO';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
  GET_PRODUCT_PRODUCT_NAME_EXIST,
  GET_PRODUCT_PART_NUMBER_EXIST,
  GET_PRODUCT_PRICE_ALL
} from '@/app/graphql/Product';
//import { SelectChangeEvent } from '@mui/material/Select';
import { PRODUCT_CATEGORY_LOOKUP } from '@/app/graphql/ProductCategory';
import LookupDTO from '@/app/types/LookupDTO';
import { defaultPageSize, regExUrl, SortDirectionType } from '@/app/common/Configuration';
import { CURRENCY_LOOKUP } from '@/app/graphql/Currency';
import ProductPriceDTO from '@/app/types/ProductPriceDTO';
import { GridInitialState, GridSortModel, useGridApiRef } from '@mui/x-data-grid';
import { UNIT_LOOKUP } from '@/app/graphql/Unit';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  product_name: string | null;
  part_number: string | null;
  unit_id: string | null;
  product_category_id: string | null;
  product_type: string | null;
  url: string | null;
  currency_id: string | null;
};

type StateType = {
  dtoProduct: ProductDTO;
  arrUnitLookup: LookupDTO[];
  arrProductCategoryLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  isLoading: boolean;
  arrProductPrice: ProductPriceDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  initialState: GridInitialState;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoProduct: ProductDTO;
  arrUnitLookup: LookupDTO[];
  arrProductCategoryLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
};

const useProductEntry = ({ dtoProduct, arrUnitLookup, arrProductCategoryLookup, arrCurrencyLookup }: Props) => {
  const apiRef = useGridApiRef();
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    product_name: null,
    part_number: null,
    unit_id: null,
    product_category_id: null,
    product_type: null,
    url: null,
    currency_id: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoProduct: dtoProduct,
    arrUnitLookup: arrUnitLookup,
    arrProductCategoryLookup: arrProductCategoryLookup,
    arrCurrencyLookup: arrCurrencyLookup,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    isLoading: false,
    arrProductPrice: [],
    total_records: 0,
    filter_text: '',
    sort_field: 'currency_name',
    sort_direction: 'asc',
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [addProduct] = useMutation(ADD_PRODUCT, {});

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {});

  const [getUnitLookup] = useLazyQuery(UNIT_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductCategoryLookup] = useLazyQuery(PRODUCT_CATEGORY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCurrencyLookup] = useLazyQuery(CURRENCY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductProductNameExist] = useLazyQuery(GET_PRODUCT_PRODUCT_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductPartNumberExist] = useLazyQuery(GET_PRODUCT_PART_NUMBER_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductPriceAll] = useLazyQuery(GET_PRODUCT_PRICE_ALL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const IsProductNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getProductProductNameExist({
      variables: {
        id: state.dtoProduct.id,
        product_name: state.dtoProduct.product_name
      }
    });
    if (!error && data?.getProductProductNameExist) {
      exist = data.getProductProductNameExist;
    }
    return exist;
  }, [getProductProductNameExist, state.dtoProduct.id, state.dtoProduct.product_name]);

  const IsPartNumberExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getProductPartNumberExist({
      variables: {
        id: state.dtoProduct.id,
        part_number: state.dtoProduct.part_number
      }
    });
    if (!error && data?.getProductPartNumberExist) {
      exist = data.getProductPartNumberExist;
    }
    return exist;
  }, [getProductPartNumberExist, state.dtoProduct.id, state.dtoProduct.part_number]);

  const [singleUpload] = useMutation(UPLOAD_PRODUCT_IMAGE, {});

  const getData4 = useCallback(async (): Promise<void> => {
    let arrUnitLookup: LookupDTO[] = [];
    const { error, data } = await getUnitLookup();
    if (!error && data?.getUnitLookup) {
      arrUnitLookup = data.getUnitLookup;
    }
    setState({ arrUnitLookup: arrUnitLookup } as StateType);
  }, [getUnitLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
    let arrProductCategoryLookup: LookupDTO[] = [];
    const { error, data } = await getProductCategoryLookup();
    if (!error && data?.getProductCategoryLookup) {
      arrProductCategoryLookup = data.getProductCategoryLookup;
    }
    setState({ arrProductCategoryLookup: arrProductCategoryLookup } as StateType);
  }, [getProductCategoryLookup]);

  const getData2 = useCallback(async (): Promise<void> => {
    let arrCurrencyLookup: LookupDTO[] = [];
    const { error, data } = await getCurrencyLookup();
    if (!error && data?.getCurrencyLookup) {
      arrCurrencyLookup = data.getCurrencyLookup;
    }
    setState({ arrCurrencyLookup: arrCurrencyLookup } as StateType);
  }, [getCurrencyLookup]);

  const getData3 = useCallback(async (): Promise<void> => {
    let arrProductPrice: ProductPriceDTO[] = [];
    const { error, data } = await getProductPriceAll({
      variables: {
        product_id: state.dtoProduct.id
      }
    });
    if (!error && data?.getProductPriceAll) {
      arrProductPrice = data.getProductPriceAll;
    }
    setState({ arrProductPrice: arrProductPrice } as StateType);
  }, [getProductPriceAll, state.dtoProduct.id]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoProduct: ProductDTO = PRODUCT;
    const { error, data } = await getProduct({
      variables: {
        id: state.dtoProduct.id
      }
    });
    if (!error && data?.getProduct) {
      dtoProduct = data.getProduct;
    }
    setState({ dtoProduct: dtoProduct } as StateType);
  }, [getProduct, state.dtoProduct.id]);

  useEffect(() => {
    getData1();
    getData2();
    getData3();
    getData4();
    if (state.dtoProduct.id > 0) {
      getData();
    }
  }, [getData1, getData2, getData3, getData4, state.dtoProduct.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'cost':
          setState({
            dtoProduct: {
              ...state.dtoProduct,
              [event.target.name]: Number(parseFloat(event.target.value))
            }
          } as StateType);
          break;
        default:
          setState({
            dtoProduct: {
              ...state.dtoProduct,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoProduct]
  );

  const onUnitNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoProduct: { ...state.dtoProduct, unit_id: (value as LookupDTO).id, unit_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoProduct]
  );

  const onProductCategoryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoProduct: { ...state.dtoProduct, product_category_id: (value as LookupDTO).id, product_category_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoProduct]
  );

  const onProductTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoProduct: { ...state.dtoProduct, product_type: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoProduct]
  );

  const onCurrencyNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoProduct: { ...state.dtoProduct, currency_id: (value as LookupDTO).id, currency_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoProduct]
  );

  const validateProductName = useCallback(async () => {
    if (state.dtoProduct.product_name.trim() === '') {
      return 'Product Name is required';
    }
    if (await IsProductNameExist()) {
      return 'Product Name already exists';
    } else {
      return null;
    }
  }, [state.dtoProduct.product_name, IsProductNameExist]);

  const onProductNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const product_name = await validateProductName();
      setState({ errorMessages: { ...state.errorMessages, product_name: product_name } } as StateType);
    }, [validateProductName, state.errorMessages]);

  const validatePartNumber = useCallback(async () => {
    if (state.dtoProduct.part_number.trim() != '' && (await IsPartNumberExist())) {
      return 'Part Number already exists';
    } else {
      return null;
    }
  }, [state.dtoProduct.part_number, IsPartNumberExist]);

  const onPartNumberBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const part_number = await validatePartNumber();
      setState({ errorMessages: { ...state.errorMessages, part_number: part_number } } as StateType);
    }, [validatePartNumber, state.errorMessages]);

  const validateUnitName = useCallback(async () => {
    if (state.dtoProduct.unit_id == 0) {
      return 'Unit Name is required';
    } else {
      return null;
    }
  }, [state.dtoProduct.unit_id]);

  const onUnitNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const unit_id = await validateUnitName();
      setState({ errorMessages: { ...state.errorMessages, unit_id: unit_id } } as StateType);
    }, [validateUnitName, state.errorMessages]);

  const validateProductCategoryName = useCallback(async () => {
    if (state.dtoProduct.product_category_id === 0) {
      return 'Product Category Name is required';
    } else {
      return null;
    }
  }, [state.dtoProduct.product_category_id]);

  const onProductCategoryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const product_category_id = await validateProductCategoryName();
      setState({ errorMessages: { ...state.errorMessages, product_category_id: product_category_id } } as StateType);
    }, [validateProductCategoryName, state.errorMessages]);

  const validateProductType = useCallback(async () => {
    if (state.dtoProduct.product_type.trim() === '') {
      return 'Product Type is required';
    } else {
      return null;
    }
  }, [state.dtoProduct.product_type]);

  const onProductTypeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const product_type = await validateProductType();
      setState({ errorMessages: { ...state.errorMessages, product_type: product_type } } as StateType);
    }, [validateProductType, state.errorMessages]);

  const validateCurrencyName = useCallback(async () => {
    if (state.dtoProduct.currency_id === 0) {
      return 'Currency Name is required';
    } else {
      return null;
    }
  }, [state.dtoProduct.currency_id]);

  const onCurrencyNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const currency_id = await validateCurrencyName();
      setState({ errorMessages: { ...state.errorMessages, currency_id: currency_id } } as StateType);
    }, [validateCurrencyName, state.errorMessages]);

  const validateUrl = useCallback(async () => {
    if (state.dtoProduct.url.trim() != '' && !state.dtoProduct.url.trim().match(regExUrl)) {
      return 'Invalid Url';
    } else {
      return null;
    }
  }, [state.dtoProduct.url]);

  const onUrlBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const url = await validateUrl();
      setState({ errorMessages: { ...state.errorMessages, url: url } } as StateType);
    }, [validateUrl, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.product_name = await validateProductName();
    if (errorMessages.product_name) {
      isFormValid = false;
    }
    errorMessages.part_number = await validatePartNumber();
    if (errorMessages.part_number) {
      isFormValid = false;
    }
    errorMessages.unit_id = await validateUnitName();
    if (errorMessages.unit_id) {
      isFormValid = false;
    }
    errorMessages.product_category_id = await validateProductCategoryName();
    if (errorMessages.product_category_id) {
      isFormValid = false;
    }
    errorMessages.product_type = await validateProductType();
    if (errorMessages.product_type) {
      isFormValid = false;
    }
    errorMessages.url = await validateUrl();
    if (errorMessages.url) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateProductName, validatePartNumber, validateUnitName, validateProductCategoryName, validateProductType, validateUrl]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoProduct.id === 0) {
            const { data } = await addProduct({
              variables: {
                product_name: state.dtoProduct.product_name,
                part_number: state.dtoProduct.part_number,
                unit_id: state.dtoProduct.unit_id,
                product_category_id: state.dtoProduct.product_category_id,
                product_type: state.dtoProduct.product_type,
                currency_id: state.dtoProduct.currency_id,
                cost: state.dtoProduct.cost,
                contact: state.dtoProduct.contact,
                url: state.dtoProduct.url,
                description: state.dtoProduct.description,
                product_image: state.dtoProduct.product_image,
                items: state.arrProductPrice.map((item) => {
                  return { id: item.id, currency_id: item.currency_id, unit_price: item.unit_price };
                })
              }
            });
            if (data?.addProduct) {
              toast.success('record saved successfully');
              router.push('/products/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateProduct({
              variables: {
                id: state.dtoProduct.id,
                product_name: state.dtoProduct.product_name,
                part_number: state.dtoProduct.part_number,
                unit_id: state.dtoProduct.unit_id,
                product_category_id: state.dtoProduct.product_category_id,
                product_type: state.dtoProduct.product_type,
                currency_id: state.dtoProduct.currency_id,
                cost: state.dtoProduct.cost,
                contact: state.dtoProduct.contact,
                url: state.dtoProduct.url,
                description: state.dtoProduct.description,
                product_image: state.dtoProduct.product_image,
                items: state.arrProductPrice.map((item) => {
                  return { id: item.id, currency_id: item.currency_id, unit_price: item.unit_price };
                })
              }
            });
            if (data?.updateProduct) {
              toast.success('record saved successfully');
              router.push('/products/list');
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
    [validateForm, addProduct, state.dtoProduct, state.arrProductPrice, router, updateProduct]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/products/list');
    },
    [router]
  );

  const onImageClick = useCallback(async () => {
    document.getElementById('product_image')!.click();
  }, []);

  const UploadImage = useCallback(async () => {
    const files = (document.getElementById('product_image') as any)!.files;
    console.log(files);
    if (files.length == 0) {
      return;
    }
    const { data } = await singleUpload({
      variables: {
        files: files
      }
    });
    if (data?.singleUpload) {
      setState({ dtoProduct: { ...state.dtoProduct, product_image: data.singleUpload[0].filename } } as StateType);
    }
  }, [singleUpload, state.dtoProduct]);

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
  const processRowUpdate = useCallback(
    async (updatedRow: any) => {
      const arrProductPrice = [...state.arrProductPrice].map((item) => {
        return { ...item };
      });
      for (let i = 0; i < arrProductPrice.length; i++) {
        if (arrProductPrice[i].currency_id == updatedRow.currency_id) {
          arrProductPrice[i].unit_price = Number(updatedRow.unit_price);
          break;
        }
      }
      setState({ arrProductPrice: arrProductPrice } as StateType);
    },
    [state.arrProductPrice]
  );

  return {
    apiRef,
    state,
    onInputChange,
    onUnitNameChange,
    onProductCategoryNameChange,
    onProductTypeChange,
    onCurrencyNameChange,
    onProductNameBlur,
    onPartNumberBlur,
    onUnitNameBlur,
    onProductCategoryNameBlur,
    onProductTypeBlur,
    onCurrencyNameBlur,
    onUrlBlur,
    onSaveClick,
    onCancelClick,
    onImageClick,
    UploadImage,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    onSortChange,
    paginationModel,
    setPaginationModel,
    processRowUpdate
  };
};

export default useProductEntry;
