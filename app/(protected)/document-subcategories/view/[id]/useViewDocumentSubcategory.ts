import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DocumentSubcategoryDTO from '@/app/types/DocumentSubcategoryDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DOCUMENT_SUBCATEGORY } from '@/app/graphql/DocumentSubcategory';
type StateType = {
  dtoDocumentSubcategory: DocumentSubcategoryDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDocumentSubcategory: DocumentSubcategoryDTO;
};

const useViewDocumentSubcategory = ({ dtoDocumentSubcategory }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentSubcategory: dtoDocumentSubcategory,
    breadcrumbsItems: [{ label: 'Document Subcategories', href: '/document-subcategories/list' }, { label: 'View Document Subcategory' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getDocumentSubcategory] = useLazyQuery(GET_DOCUMENT_SUBCATEGORY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentSubcategory: DocumentSubcategoryDTO = {} as DocumentSubcategoryDTO;
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

  useEffect(() => {
    if (state.dtoDocumentSubcategory.id > 0) {
      getData();
    }
  }, [state.dtoDocumentSubcategory.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-subcategories/edit/' + state.dtoDocumentSubcategory.id);
    },
    [router, state.dtoDocumentSubcategory.id]
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
    onEditClick,
    onCancelClick
  };
};

export default useViewDocumentSubcategory;
