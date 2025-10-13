import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CompanyDomainDTO from '@/app/types/CompanyDomainDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COMPANY_DOMAIN } from '@/app/graphql/CompanyDomain';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoCompanyDomain: CompanyDomainDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCompanyDomain: CompanyDomainDTO;
};

const useViewCompanyDomain = ({ dtoCompanyDomain }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCompanyDomain: dtoCompanyDomain,
    breadcrumbsItems: [{ label: 'Company Domain', href: '/company-domains/list' }, { label: 'View Company Domain' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setCompanyDomain] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  const [getCompanyDomain] = useLazyQuery(GET_COMPANY_DOMAIN, { fetchPolicy: 'network-only' });

  const getCompanyDomainData = useCallback(async (): Promise<void> => {
    try {
      let dtoCompanyDomain: CompanyDomainDTO = {} as CompanyDomainDTO;
      const { error, data } = await getCompanyDomain({
        variables: {
          id: state.dtoCompanyDomain.id
        }
      });
      if (!error && data) {
        dtoCompanyDomain = data.getCompanyDomain;
      }
      setCompanyDomain({ dtoCompanyDomain: dtoCompanyDomain } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCompanyDomain, state.dtoCompanyDomain.id]);

  useEffect(() => {
    if (state.dtoCompanyDomain.id > 0) {
      getCompanyDomainData();
    }
  }, [state.dtoCompanyDomain.id, getCompanyDomainData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/company-domains/edit/' + state.dtoCompanyDomain.id);
    },
    [router, state.dtoCompanyDomain.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/company-domains/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCompanyDomain;
