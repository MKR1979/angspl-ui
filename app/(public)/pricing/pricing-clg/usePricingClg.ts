import { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { GET_SITE_CONFIG_By_COMPANY_TYPE } from '@/app/graphql/SiteConfig';
import { RootState } from '@/app/store';
import { useSelector } from '@/app/store';
import { SiteConfig } from '@/app/store/slices/siteConfigState';
import { useLazyQuery } from '@apollo/client';

type StateType = {
  originalSiteConfig: SiteConfig[];
  tabIndex: number;
  expandedRows: Record<string, boolean>;
};

const usePricingClg = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    originalSiteConfig: [],
    tabIndex: 0,
    expandedRows: {}
  });
  
  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const router = useRouter();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getSiteConfigByCompanyType] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY_TYPE, { fetchPolicy: 'network-only' });
  const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);

  const getSiteConfig = useCallback(async () => {
    try {
      const { data } = await getSiteConfigByCompanyType({
        variables: { company_type: "Institute" },
      });
      if (data?.getSiteConfigByCompanyType?.length > 0) {
        const fetchedConfig = data.getSiteConfigByCompanyType;
        setState({
          originalSiteConfig: fetchedConfig
        });
      }
    } catch (error) {
      console.error('❌ Error fetching site config:', error);
    }
  }, [getSiteConfigByCompanyType, companyInfo.company_type]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  const toggleRowExpansion = useCallback(
    (rowKey: string) => {
      const currentExpanded = state.expandedRows?.[rowKey] ?? false;
      const updatedExpandedRows = {
        ...state.expandedRows,
        [rowKey]: !currentExpanded
      };
      setState({
        ...state,
        expandedRows: updatedExpandedRows
      });
    },
    [state]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  const goToCompanyModule = (companyType: string, planType: string, paymentType: string, amount: number) => {
    router.push(`/company?company_type=${companyType}&plan_type=${planType}&payment_type=${paymentType}&payment_amount=${amount}`);
  };

  return {
    state,
    siteConfig: state.originalSiteConfig,
    goToCompanyModule,
    handleTabChange,
    toggleRowExpansion
  };
};

export default usePricingClg;
