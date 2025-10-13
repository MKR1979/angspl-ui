import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import EmailTemplateDTO from '@/app/types/EmailTemplateDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_EMAIL_TEMPLATE } from '@/app/graphql/EmailTemplate';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoEmailTemplate: EmailTemplateDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoEmailTemplate: EmailTemplateDTO;
};

const useViewEmailTemplate = ({ dtoEmailTemplate }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoEmailTemplate: dtoEmailTemplate,
    breadcrumbsItems: [{ label: 'Email Templates', href: '/email-templates/list' }, { label: 'View Email Templates' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
const showSnackbar = useSnackbar();
  const [getEmailTemplate] = useLazyQuery(GET_EMAIL_TEMPLATE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
    let dtoEmailTemplate: EmailTemplateDTO = {} as EmailTemplateDTO;
    const { error, data } = await getEmailTemplate({
      variables: {
        id: state.dtoEmailTemplate.id
      }
    });
    if (!error && data) {
      dtoEmailTemplate = data.getEmailTemplate;
    }
    setState({ dtoEmailTemplate: dtoEmailTemplate } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmailTemplate, state.dtoEmailTemplate.id]);

  useEffect(() => {
    if (state.dtoEmailTemplate.id > 0) {
      getData();
    }
  }, [state.dtoEmailTemplate.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/email-templates/edit/' + state.dtoEmailTemplate.id);
    },
    [router, state.dtoEmailTemplate.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/email-templates/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewEmailTemplate;
