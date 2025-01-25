import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ContactDTO from '@/app/types/ContactDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_CONTACT } from '@/app/graphql/Contact';
type StateType = {
  dtoContact: ContactDTO;
  tabIndex: number;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoContact: ContactDTO;
};

const useViewContact = ({ dtoContact }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoContact: dtoContact,
    tabIndex: 0,
    breadcrumbsItems: [{ label: 'Contacts', href: '/contacts/list' }, { label: 'View Contact' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getContact] = useLazyQuery(GET_CONTACT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoContact: ContactDTO = {} as ContactDTO;
    const { error, data } = await getContact({
      variables: {
        id: state.dtoContact.id
      }
    });
    if (!error && data?.getContact) {
      dtoContact = data.getContact;
    }
    setState({ dtoContact: dtoContact } as StateType);
  }, [getContact, state.dtoContact.id]);

  useEffect(() => {
    if (state.dtoContact.id > 0) {
      getData();
    }
  }, [state.dtoContact.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/contacts/edit/' + state.dtoContact.id);
    },
    [router, state.dtoContact.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/contacts/list');
    },
    [router]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    onEditClick,
    onCancelClick,
    handleTabChange
  };
};

export default useViewContact;
