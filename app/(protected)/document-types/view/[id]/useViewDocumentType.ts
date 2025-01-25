import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DocumentTypeDTO from '@/app/types/DocumentTypeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DOCUMENT_TYPE } from '@/app/graphql/DocumentType';
type StateType = {
  dtoDocumentType: DocumentTypeDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDocumentType: DocumentTypeDTO;
};

const useViewDocumentType = ({ dtoDocumentType }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocumentType: dtoDocumentType,
    breadcrumbsItems: [{ label: 'Document Types', href: '/document-types/list' }, { label: 'View Document Type' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getDocumentType] = useLazyQuery(GET_DOCUMENT_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocumentType: DocumentTypeDTO = {} as DocumentTypeDTO;
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

  useEffect(() => {
    if (state.dtoDocumentType.id > 0) {
      getData();
    }
  }, [state.dtoDocumentType.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/document-types/edit/' + state.dtoDocumentType.id);
    },
    [router, state.dtoDocumentType.id]
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
    onEditClick,
    onCancelClick
  };
};

export default useViewDocumentType;
