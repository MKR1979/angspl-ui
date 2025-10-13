'use client';
import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import { useDispatch } from 'react-redux';
import { GET_COMPANY_INFO_BY_DOMAIN } from '../graphql/Company';
import { setCompanyInfo } from '../store/slices/globalState';
import type CompanyDTO from '../types/CompanyDTO';
import { GET_SITE_CONFIG_By_COMPANY } from '../graphql/SiteConfig';
import { setSiteConfig } from '../store/slices/siteConfigState';
 
export const useCompanyInfo = (customHostName: string) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [fetchCompanyInfo] = useLazyQuery(GET_COMPANY_INFO_BY_DOMAIN, { fetchPolicy: 'network-only' });
  const [getSiteConfigByCompanyId] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY, { fetchPolicy: 'network-only' });
 
  const getSiteConfig = useCallback(async (company_id:number) => {
    if (!company_id) return;
 
    try {
      const { data } = await getSiteConfigByCompanyId({
        variables: { company_id: company_id },
      });
 
      if (data?.getSiteConfigByCompanyId) {
        dispatch(setSiteConfig(data.getSiteConfigByCompanyId));
      }
    } catch (error) {
      console.error('Error fetching site config:', error);
    }
  }, [dispatch, getSiteConfigByCompanyId]);
 
  const getCompanyInfo = useCallback(async (): Promise<CompanyDTO | null> => {
    try {
      const { data } = await fetchCompanyInfo({ variables: { domain_name: customHostName } });
 
      const company = data?.getCompanyInfoByDomain;
 
      if (!company || company.status !== 'Active') {
        router.push('/company-inactive');
        return null;
      }
 
      dispatch(setCompanyInfo(company));
      await getSiteConfig(company.company_id);
 
      return company as CompanyDTO;
    } catch (error) {
      console.error('Error fetching company info:', error);
      router.push('/system-alert');
      return null;
    }
  }, [customHostName, dispatch, fetchCompanyInfo, router, getSiteConfig]);
 
  return { getCompanyInfo };
};