import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import EmailDTO from '@/app/types/EmailDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_EMAIL } from '@/app/graphql/Email';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoEmail: EmailDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoEmail: EmailDTO;
};

const useViewEmail = ({ dtoEmail }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoEmail: dtoEmail,
    breadcrumbsItems: [{ label: 'Review Email', href: `/email/list` }, { label: 'View Email' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setEmail] = useReducer(reducer, INITIAL_STATE);

  const [getEmail] = useLazyQuery(GET_EMAIL, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEmail: EmailDTO = {} as EmailDTO;
      const { error, data } = await getEmail({
        variables: {
          id: state.dtoEmail.id
        }
      });
      if (!error && data) {
        dtoEmail = data.getEmail;
      }
      setEmail({ dtoEmail: dtoEmail } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmail, state.dtoEmail.id]);

  useEffect(() => {
    if (state.dtoEmail.id > 0) {
      getData();
    }
  }, [state.dtoEmail.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/email/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick,
  };
};

export default useViewEmail;
