import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CountryDTO from '@/app/types/CountryDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_COUNTRY } from '@/app/graphql/Country';
type StateType = {
  dtoCountry: CountryDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCountry: CountryDTO;
};

const useViewCountry = ({ dtoCountry }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCountry: dtoCountry,
    breadcrumbsItems: [{ label: 'Country', href: '/countries/list' }, { label: 'View Country' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getCountry] = useLazyQuery(GET_COUNTRY, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCountry: CountryDTO = {} as CountryDTO;
    const { error, data } = await getCountry({
      variables: {
        id: state.dtoCountry.id
      }
    });
    if (!error && data) {
      dtoCountry = data.getCountry;
    }
    setState({ dtoCountry: dtoCountry } as StateType);
  }, [getCountry, state.dtoCountry.id]);

  useEffect(() => {
    if (state.dtoCountry.id > 0) {
      getData();
    }
  }, [state.dtoCountry.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/countries/edit/' + state.dtoCountry.id);
    },
    [router, state.dtoCountry.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/countries/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCountry;
