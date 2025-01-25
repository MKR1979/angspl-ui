import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import DocumentDTO from '@/app/types/DocumentDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DOCUMENT } from '@/app/graphql/Document';
type StateType = {
  dtoDocument: DocumentDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoDocument: DocumentDTO;
};

const useViewDocument = ({ dtoDocument }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoDocument: dtoDocument,
    breadcrumbsItems: [{ label: 'Documents', href: '/documents/list' }, { label: 'View Document' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getDocument] = useLazyQuery(GET_DOCUMENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoDocument: DocumentDTO = {} as DocumentDTO;
    const { error, data } = await getDocument({
      variables: {
        id: state.dtoDocument.id
      }
    });
    if (!error && data?.getDocument) {
      dtoDocument = data.getDocument;
    }
    setState({ dtoDocument: dtoDocument } as StateType);
  }, [getDocument, state.dtoDocument.id]);

  useEffect(() => {
    if (state.dtoDocument.id > 0) {
      getData();
    }
  }, [state.dtoDocument.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/documents/edit/' + state.dtoDocument.id);
    },
    [router, state.dtoDocument.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/documents/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewDocument;
