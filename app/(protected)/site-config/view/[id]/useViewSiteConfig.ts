import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_SITE_CONFIG } from '@/app/graphql/SiteConfig';
type StateType = {
  dtoSiteConfig: SiteConfigDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoSiteConfig: SiteConfigDTO;
};

const useViewSiteConfig = ({ dtoSiteConfig }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoSiteConfig: dtoSiteConfig,
    breadcrumbsItems: [{ label: 'Site Configs', href: '/site-config/list' }, { label: 'View Site Configs' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getSiteConfig] = useLazyQuery(GET_SITE_CONFIG, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoSiteConfig: SiteConfigDTO = {} as SiteConfigDTO;
    const { error, data } = await getSiteConfig({
      variables: {
        id: state.dtoSiteConfig.id
      }
    });
    if (!error && data) {
      dtoSiteConfig = data.getSiteConfig;
    }
    setState({ dtoSiteConfig: dtoSiteConfig } as StateType);
  }, [getSiteConfig, state.dtoSiteConfig.id]);

  useEffect(() => {
    if (state.dtoSiteConfig.id > 0) {
      getData();
    }
  }, [state.dtoSiteConfig.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/site-config/edit/' + state.dtoSiteConfig.id);
    },
    [router, state.dtoSiteConfig.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/site-config/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewSiteConfig;
