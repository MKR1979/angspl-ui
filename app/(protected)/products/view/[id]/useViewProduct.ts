import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ProductDTO, { PRODUCT } from '@/app/types/ProductDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_PRODUCT, GET_PRODUCT_PRICE_ALL } from '@/app/graphql/Product';
import ProductPriceDTO from '@/app/types/ProductPriceDTO';
import { defaultPageSize, SortDirectionType } from '@/app/common/Configuration';
import { GridInitialState, GridSortModel, useGridApiRef } from '@mui/x-data-grid';
type StateType = {
  dtoProduct: ProductDTO;
  isLoading: boolean;
  arrProductPrice: ProductPriceDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoProduct: ProductDTO;
};

const useViewProduct = ({ dtoProduct }: Props) => {
  const apiRef = useGridApiRef();
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoProduct: dtoProduct,
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
    breadcrumbsItems: [{ label: 'Products', href: '/products/list' }, { label: 'View Product' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getProductPriceAll] = useLazyQuery(GET_PRODUCT_PRICE_ALL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

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

  const getData2 = useCallback(async (): Promise<void> => {
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

  useEffect(() => {
    if (state.dtoProduct.id > 0) {
      getData();
      getData2();
    }
  }, [state.dtoProduct.id, getData, getData2]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/products/edit/' + state.dtoProduct.id);
    },
    [router, state.dtoProduct.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/products/list');
    },
    [router]
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

  return {
    apiRef,
    state,
    onEditClick,
    onCancelClick,
    paginationModel,
    setPaginationModel,
    onSortChange
  };
};

export default useViewProduct;
