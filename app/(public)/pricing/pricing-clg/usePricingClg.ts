import { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { GET_SITE_CONFIG_By_COMPANY_TYPE } from '@/app/graphql/SiteConfig';
import { dispatch } from '@/app/store';
import { SiteConfig } from '@/app/store/slices/siteConfigState';
import { useLazyQuery } from '@apollo/client';
import { setNewCompanyConfig } from '../../../store/slices/siteConfigState';

type StateType = {
  originalSiteConfig: SiteConfig[];
  // newCompanyConfig: SiteConfig[];
  tabIndex: number;
  expandedRows: Record<string, boolean>;
};

const usePricingClg = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    originalSiteConfig: [],
    // newCompanyConfig: [],
    tabIndex: 0,
    expandedRows: {}
  });

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const router = useRouter();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getSiteConfigByCompanyType] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY_TYPE, { fetchPolicy: 'network-only' });

  const getSiteConfig = useCallback(async () => {
    try {
      const { data } = await getSiteConfigByCompanyType({
        variables: { company_type: "college" },
      });
      if (data?.getSiteConfigByCompanyType?.length > 0) {
        const fetchedConfig = data.getSiteConfigByCompanyType;
        // 🔹 Deep clone
        const clonedConfig = structuredClone(fetchedConfig);
        const customerHome = {
          customerHomeImage: String(clonedConfig.find((c: any) => c.key === 'CUSTOMER_HOME_IMAGE_URL')?.value ?? ''),
        };
        const customerAbout = {
          customerAboutImage: String(clonedConfig.find((c: any) => c.key === 'CUSTOMER_ABT_US_IMAGE')?.value ?? ''),
        };
        // 🔹 Replace target keys in cloned config
        const updatedConfig = clonedConfig.map((item: any) => {
          if (item.key === "HOME_IMAGE" && customerHome.customerHomeImage) {
            return { ...item, value: customerHome.customerHomeImage };
          }
          if (item.key === "ABT_US_IMAGE" && customerAbout.customerAboutImage) {
            return { ...item, value: customerAbout.customerAboutImage };
          }
          return item;
        });
        // removing extra business_config from site config
        const sanitizedConfig = updatedConfig.map((item: any) => {
          if (item.business_config?.business_config) {
            return {
              ...item,
              business_config: item.business_config.business_config,
            };
          }
          return item;
        });
        setState({
          originalSiteConfig: fetchedConfig,
          // newCompanyConfig: updatedConfig,
        });
        dispatch(setNewCompanyConfig(sanitizedConfig));
      }
    } catch (error) {
      console.error("Error fetching site config:", error);
    }
  }, [getSiteConfigByCompanyType]);

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
