import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CompanyDTO from '@/app/types/CompanyDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COMPANY } from '@/app/graphql/Company';
type StateType = {
  dtoCompany: CompanyDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCompany: CompanyDTO;
};

const useViewCompany = ({ dtoCompany }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCompany: dtoCompany,
    breadcrumbsItems: [{ label: 'Company', href: '/companies/list' }, { label: 'View Company' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setCompany] = useReducer(reducer, INITIAL_STATE);

  const [getCompany] = useLazyQuery(GET_COMPANY, { fetchPolicy: 'network-only' });

  const getCompanyData = useCallback(async (): Promise<void> => {
    let dtoCompany: CompanyDTO = {} as CompanyDTO;
    const { error, data } = await getCompany({
      variables: {
        id: state.dtoCompany.id
      }
    });
    if (!error && data) {
      dtoCompany = data.getCompany;
    }
    setCompany({ dtoCompany: dtoCompany } as StateType);
  }, [getCompany, state.dtoCompany.id]);

  useEffect(() => {
    if (state.dtoCompany.id > 0) {
      getCompanyData();
    }
  }, [state.dtoCompany.id, getCompanyData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/companies/edit/' + state.dtoCompany.id);
    },
    [router, state.dtoCompany.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/companies/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCompany;
