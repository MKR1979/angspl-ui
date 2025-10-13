import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import ContactPointDTO from '@/app/types/ContactUsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ENQUIRY } from '@/app/graphql/ContactUs';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoContactPoint: ContactPointDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoContactPoint: ContactPointDTO;
};

const useViewEnquiry = ({ dtoContactPoint }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoContactPoint: dtoContactPoint,
    breadcrumbsItems: [{ label: 'Review Enquiry', href: `/enquiry/list` }, { label: 'View Enquiry' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setEnquiry] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getEnquiry] = useLazyQuery(GET_ENQUIRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoContactPoint: ContactPointDTO = {} as ContactPointDTO;
      const { error, data } = await getEnquiry({
        variables: {
          id: state.dtoContactPoint.id
        }
      });
      if (!error && data) {
        dtoContactPoint = data.getEnquiry;
      }
      setEnquiry({ dtoContactPoint: dtoContactPoint } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEnquiry, state.dtoContactPoint.id]);

  useEffect(() => {
    if (state.dtoContactPoint.id > 0) {
      getData();
    }
  }, [state.dtoContactPoint.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/enquiry/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick,
  };
};

export default useViewEnquiry;
