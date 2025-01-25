import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ProductCategoryDTO from '@/app/types/ProductCategoryDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_PRODUCT_CATEGORY } from '@/app/graphql/ProductCategory';
type StateType = {
  dtoProductCategory: ProductCategoryDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoProductCategory: ProductCategoryDTO;
};

const useViewProductCategory = ({ dtoProductCategory }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoProductCategory: dtoProductCategory,
    breadcrumbsItems: [{ label: 'Product Categories', href: '/product-categories/list' }, { label: 'View Product Category' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getProductCategory] = useLazyQuery(GET_PRODUCT_CATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoProductCategory: ProductCategoryDTO = {} as ProductCategoryDTO;
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

  useEffect(() => {
    if (state.dtoProductCategory.id > 0) {
      getData();
    }
  }, [state.dtoProductCategory.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/product-categories/edit/' + state.dtoProductCategory.id);
    },
    [router, state.dtoProductCategory.id]
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
    onEditClick,
    onCancelClick
  };
};

export default useViewProductCategory;
