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
  activePlanName: string;
};

const usePricingMsme = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    tabIndex: 0,
    expandedRows: {},
    originalSiteConfig: [],
    newCompanyConfig: [],
    dtoSiteConfig: SITE_CONFIG,
    activePlanName: '',
  });

  const reducer = (state = INITIAL_STATE, action: Partial<StateType>): StateType => { return { ...state, ...action }; };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const router = useRouter();
  const dispatch = useDispatch();
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
          originalSiteConfig: fetchedConfig,
          newCompanyConfig: JSON.parse(JSON.stringify(fetchedConfig)),
        });
      }
    } catch (error) {
      console.error('Error fetching site config:', error);
    }
  }, [getSiteConfigByCompanyType, companyInfo.company_type]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  const handleFeatureToggle = useCallback(
    (featureName: string, isSelected: boolean, planType: 'monthly' | 'annual') => {
      console.log(`🔄 handleFeatureToggle | Feature: ${featureName}, Selected: ${isSelected}, Plan: ${planType}`);
      // Feature → related config mapping
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
        ]
      };

      const relatedKeys = featureConfigMap[featureName] || [];
      const updatedConfig = state.newCompanyConfig.map((configItem) => {
        if (relatedKeys.includes(configItem.key)) {
          return { ...configItem, value: isSelected ? 'true' : 'false' };
        }
        return configItem;
      });
      const updatedPricingConfig = updatedConfig.map((configItem: any) => {
        if (configItem.key === 'PRICING_CONFIG' && configItem.business_config?.business_config) {
          try {
            const parsedBusinessConfig = JSON.parse(configItem.business_config.business_config);
            const targetPlanKey = planType === 'monthly' ? 'monthly_plans' : 'annual_plans';
            parsedBusinessConfig[targetPlanKey] = parsedBusinessConfig[targetPlanKey].map((plan: any) => ({
              ...plan,
              features: plan.features.map((f: any) =>
                f.name === featureName ? { ...f, isSelected } : f
              ),
            }));
            return {
              ...configItem,
              business_config: {
                ...configItem.business_config,
                business_config: JSON.stringify(parsedBusinessConfig, null, 2),
              },
            };
          } catch (err) {
            console.error(' Error updating PRICING_CONFIG business_config:', err);
          }
        }
        return configItem;
      });
      setState({ newCompanyConfig: updatedPricingConfig });
    },
    [state.newCompanyConfig]
  );

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

  const goToCompanyModule = (companyType: string, planType: string, paymentType: string, amount: number, planId: number) => {
    const sanitizedConfig = state.newCompanyConfig.map((item: any) => {
      if (item.business_config?.business_config) {
        return {
          ...item,
          business_config: item.business_config.business_config,
        };
      }
      return item;
    });
    // Dispatch only the sanitized version
    dispatch(setNewCompanyConfig(sanitizedConfig));
    router.push(
      `/company?company_type=${companyType}&plan_type=${planType}&payment_type=${paymentType}&payment_amount=${amount}&plan_id=${planId}`
    );
  };

  return {
    state,
    siteConfig: state.originalSiteConfig,
    handleFeatureToggle,
    toggleRowExpansion,
    goToCompanyModule,
  };
};

export default usePricingMsme;