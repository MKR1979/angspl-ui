// import { useCallback, useReducer } from 'react';
// // import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
// import { useRouter } from 'next/navigation';
// import { useSelector } from '@/app/store';


// type StateType = {
//   // breadcrumbsItems: BreadcrumbsItem[];
//   tabIndex: number;
//   expandedRows: Record<string, boolean>;
// };

// const usePricingMsme = () => {
//   const INITIAL_STATE: StateType = Object.freeze({
//     // breadcrumbsItems: [{ label: 'Terms', href: '/terms/list' }, { label: 'Add Term' }],
//     tabIndex: 0,
//     expandedRows: {}
//   });

//   const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
//     return { ...state, ...action };
//   };
//   const router = useRouter();
//   const [state, setState] = useReducer(reducer, INITIAL_STATE);
//   const { siteConfig } = useSelector((state) => state.siteConfigState);

//   const toggleRowExpansion = useCallback(
//     (rowKey: string) => {
//       const currentExpanded = state.expandedRows?.[rowKey] ?? false;
//       const updatedExpandedRows = {
//         ...state.expandedRows,
//         [rowKey]: !currentExpanded
//       };
//       setState({
//         ...state,
//         expandedRows: updatedExpandedRows
//       });
//     },
//     [state]
//   );

//   const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
//     setState({ tabIndex: newValue } as StateType);
//   }, []);

//   const goToCompanyModule = (companyType: string, planType: string, paymentType: string, amount: number) => {
//     router.push(
//       `/company?company_type=${companyType}&plan_type=${planType}&payment_type=${paymentType}&payment_amount=${amount}`
//     );
//   };
//     //router.push(`/paymentReceipt?id=${newPaymentId}&userName=${encodeURIComponent('')}`);

//   return {
//     state,
//     siteConfig,
//     goToCompanyModule,
//     handleTabChange,
//     toggleRowExpansion
//   };
// };

// export default usePricingMsme;


import { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from '@/app/store';
import { SiteConfig } from '@/app/store/slices/siteConfigState';
import { GET_SITE_CONFIG_By_COMPANY_TYPE } from '@/app/graphql/SiteConfig';
import SiteConfigDTO, { SITE_CONFIG } from '../../../types/SiteConfigDTO';
import { useLazyQuery } from '@apollo/client';
import { RootState } from '@/app/store';
import { setNewCompanyConfig } from '../../../store/slices/siteConfigState';

type StateType = {
  tabIndex: number;
  expandedRows: Record<string, boolean>;
  originalSiteConfig: SiteConfig[];
  newCompanyConfig: SiteConfig[];
  dtoSiteConfig: SiteConfigDTO;
};

const usePricingMsme = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    tabIndex: 0,
    expandedRows: {},
    originalSiteConfig: [],
    newCompanyConfig: [],
    dtoSiteConfig: SITE_CONFIG,
  });

  // const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  //   return { ...state, ...action };
  // };

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const router = useRouter();
  const dispatch = useDispatch();
  // const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [getSiteConfigByCompanyType] = useLazyQuery(GET_SITE_CONFIG_By_COMPANY_TYPE, { fetchPolicy: 'network-only' });
  const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);

  // ✅ 1. Load Redux siteConfig into local state once
  // useEffect(() => {
  //   if (siteConfig && siteConfig.length > 0) {
  //     setState({
  //       originalSiteConfig: siteConfig,
  //       newCompanyConfig: JSON.parse(JSON.stringify(siteConfig)), // deep clone
  //     });
  //   }
  // }, [siteConfig]);

    const getSiteConfig = useCallback(async () => {
    try {
      const { data } = await getSiteConfigByCompanyType({
        variables: { company_type: "Institute" },
      });
      if (data?.getSiteConfigByCompanyType?.length > 0) {
        const fetchedConfig = data.getSiteConfigByCompanyType;
        setState({
          originalSiteConfig: fetchedConfig,
          newCompanyConfig: JSON.parse(JSON.stringify(fetchedConfig)), // deep clone
        });
      }
      console.log('✅ Site Config fetched from GraphQL:', data);
    } catch (error) {
      console.error('❌ Error fetching site config:', error);
    }
  }, [getSiteConfigByCompanyType, companyInfo.company_type]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  // ✅ 2. Handle feature selection toggle
  const handleFeatureToggle = useCallback((featureName: string, isSelected: boolean) => {
    console.log('calling handleFeatureToogle method from hook page');
    // Define all config keys related to each feature
    const featureConfigMap: Record<string, string[]> = {
      'Admin Dashboard': [
        'ENABLE_REVIEW_ATTENDANCE',
        'ENABLE_QUIZZES',
        'ENABLE_COURSE',
        'ENABLE_ROLES',
        'ENABLE_USER',
        'ENABLE_ONLINE_EXAMS',
        'ENABLE_SURVEYS',
        'ENABLE_EVENTS',
        'ENABLE_COMPAIGNS',
        'ENABLE_EMAILS',
        'ENABLE_STUDY_NOTES',
        'ENABLE_VIDEO_UPLOADS',
        'ENABLE_CODE_PROJECTS',
        'ENABLE_IMPORT_QUIZZES',
        'ENABLE_QUESTION_OPTIONS',
        'ENABLE_QUIZ_QUESTIONS',
        'ENABLE_ONLINE_EXAMS',
      ],
      'Student Dashboard': [
        'ENABLE_HOMEWORKS',
        'ENABLE_FEE_PAYMENT',
        'ENABLE_STUDENT_INFO',
        'ENABLE_NOTES_INSIGHTS',
        'ENABLE_CODE_INSIGHTS',
        'ENABLE_VIDEO_INSIGHTS'
      ],
      'Dynamic Web Application': [
        'ENABLE_PAYROLL_MODULE',
        'ALLOW_SALARY_SLIP_DOWNLOAD'
      ],
      // ✅ Add more feature → configKey mappings here
    };

    const relatedKeys = featureConfigMap[featureName] || [];
    const updatedConfig = state.newCompanyConfig.map((configItem) => {
      if (relatedKeys.includes(configItem.key)) {
        return { ...configItem, value: isSelected ? 'true' : 'false' };
      }
      return configItem;
    });
    setState({ newCompanyConfig: updatedConfig });
  }, [state.newCompanyConfig]);

  useEffect(() => {
    console.log("state.modifiedSiteConfig", state.newCompanyConfig);
  }, [state.newCompanyConfig]);

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

  const goToCompanyModule = (companyType: string, planType: string, paymentType: string, amount: number) => {
  // console.log('filtered_config in gotoCompanyModule: ', state.newCompanyConfig);
  //   dispatch(setNewCompanyConfig(state.newCompanyConfig));

  console.log('🧾 Original newCompanyConfig before sanitize:', state.newCompanyConfig);

  // 🧹 Sanitize all configs — flatten one level of nested business_config
  const sanitizedConfig = state.newCompanyConfig.map((item: any) => {
    if (item.business_config?.business_config) {
      return {
        ...item,
        business_config: item.business_config.business_config,
      };
    }
    return item;
  });

  console.log('✅ Sanitized Config before storing in Redux:', sanitizedConfig);

  // 🧭 Dispatch only the sanitized version
  dispatch(setNewCompanyConfig(sanitizedConfig));

    router.push(
      `/company?company_type=${companyType}&plan_type=${planType}&payment_type=${paymentType}&payment_amount=${amount}`
    );
  };

  return {
    state,
    // siteConfig,
    siteConfig: state.originalSiteConfig,
    handleFeatureToggle,
    toggleRowExpansion,
    goToCompanyModule,
  };
};

export default usePricingMsme;
