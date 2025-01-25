import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DocumentCategoryDTO from '@/app/types/DocumentCategoryDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DOCUMENT_CATEGORY } from '@/app/graphql/DocumentCategory';
type StateType = {
  dtoDocumentCategory: DocumentCategoryDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDocumentCategory: DocumentCategoryDTO;
};

const useViewDocumentCategory = ({ dtoDocumentCategory }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentCategory: dtoDocumentCategory,
    breadcrumbsItems: [{ label: 'Document Categories', href: '/document-categories/list' }, { label: 'View Document Category' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getDocumentCategory] = useLazyQuery(GET_DOCUMENT_CATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentCategory: DocumentCategoryDTO = {} as DocumentCategoryDTO;
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

  useEffect(() => {
    if (state.dtoDocumentCategory.id > 0) {
      getData();
    }
  }, [state.dtoDocumentCategory.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-categories/edit/' + state.dtoDocumentCategory.id);
    },
    [router, state.dtoDocumentCategory.id]
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
    onEditClick,
    onCancelClick
  };
};

export default useViewDocumentCategory;
