import { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@/app/store';
import { SiteConfig } from '@/app/store/slices/siteConfigState';
import { GET_SITE_CONFIG_By_COMPANY_TYPE } from '@/app/graphql/SiteConfig';
import SiteConfigDTO, { SITE_CONFIG } from '../../../types/SiteConfigDTO';
import { useLazyQuery } from '@apollo/client';
// import { RootState } from '@/app/store';
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
  //const companyInfo = useSelector((state: RootState) => state.globalState.companyInfo);

  const getSiteConfig = useCallback(async () => {
    try {
      const { data } = await getSiteConfigByCompanyType({
        variables: { company_type: "Institute" },
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
        // 🔹 Remove CUSTOMER_HOME_IMAGE_URL and CUSTOMER_ABT_US_IMAGE
        const filteredConfig = updatedConfig.filter(
          (item: any) =>
            item.key !== "CUSTOMER_HOME_IMAGE_URL" &&
            item.key !== "CUSTOMER_ABT_US_IMAGE"
        );

        // 🔹 Update state
        setState({
          originalSiteConfig: fetchedConfig,
          newCompanyConfig: filteredConfig,
        });
      }
    } catch (error) {
      console.error("Error fetching site config:", error);
    }
  }, [getSiteConfigByCompanyType]);

  useEffect(() => {
    getSiteConfig();
  }, [getSiteConfig]);

  useEffect(() => {
    console.log('original site config :-', state.originalSiteConfig);
    console.log('copied site config :-', state.newCompanyConfig);
  }, [state.newCompanyConfig]);

  const handleFeatureToggle = useCallback(
    (featureName: string, isSelected: boolean, planType: 'monthly' | 'annual') => {
      console.log(`🔄 handleFeatureToggle | Feature: ${featureName}, Selected: ${isSelected}, Plan: ${planType}`);
      // Feature → related config mapping
      const featureConfigMap: Record<string, string[]> = {
        'Dynamic Web Application': [
          'ENABLE_HOME',
          'ENABLE_PROGRAMS',
          'ENABLE_PUB_ADMISSION',
          'ENABLE_ABOUT_US',
          'ENABLE_PRODUCTS',
          'ENABLE_CONTACT_US',
          'ENABLE_PUB_AFFILIATES',
          'ENABLE_LOGIN',
          'ENABLE_SIGNUP',
          'ENABLE_PUBLIC_PRICING',
          'ENABLE_PRICING_TECH',
          'ENABLE_PRICING_MSME',
          'ENABLE_PRICING_SCH',
          'ENABLE_PRICING_CLG',
          'ENABLE_PUB_DEMO',
          'ENABLE_DEMO_CLG',
          'ENABLE_DEMO_SCH',
          'ENABLE_DEMO_TECH',
          'ENABLE_PUB_MODULES',
          'ENABLE_ADMISSION_MNG',
          'ENABLE_STUDENT_MNG',
          'ENABLE_FEE_MNG',
          'ENABLE_ATTENDANCE_MNG',
          'ENABLE_ACADEMIC_MNG',
          'ENABLE_AFFILIATE_MNG',
          'ENABLE_COURSE_MNG',
          'ENABLE_EXAMINATION_MNG',
          'ENABLE_PUBLIC_PRODUCTS',
          'ENABLE_PUBLIC_SERVICES',
          'ENABLE_PUBLIC_TECHNOLOGY',
          'ENABLE_PUBLIC_DEMO',
          'ENABLE_DEMO_SCHOOL',
          'ENABLE_DEMO_COLLEGE',
          'ENABLE_DEMO_INSTITUTE'
        ],

        'Communication': [
          'ENABLE_COMMUNICATIONS',
          'ENABLE_ENGAGEMENTS',
          'ENABLE_MEETINGS',
          'ENABLE_EMAILS',
          'ENABLE_EMAIL_TEMPLATES',
        ],

        'Affiliate Management': [
          'ENABLE_REVIEW_AFFILIATES',
          'ENABLE_AFFILIATES',
          'ENABLE_REFERRALS',
        ],

        'Examination Management': [
          'ENABLE_ONLINE_EXAMS',
          'ENABLE_QUIZZES',
          'ENABLE_QUIZ_QUESTIONS',
          'ENABLE_QUESTION_OPTIONS',
          'ENABLE_IMPORT_QUIZZES',
          'ENABLE_QUIZ_RESULTS',
          'ENABLE_TEST_QUIZZES'

        ],
        'Attendance Management': [
          'ENABLE_ATTENDANCE_SUMMARY',
          'ENABLE_MARK_ATTENDANCE',
          'ENABLE_LOCK_ATTENDANCE',
          'ENABLE_STUDENT_ATTENDANCE',
          'ENABLE_REVIEW_ATTENDANCE',
          'ENABLE_USER_DEVICE',
          'ENABLE_TRACK_PRESENCE',
          'ENABLE_DAILY_ATTENDANCE',
          'ENABLE_MANUAL_ATTENDANCE',
          'ENABLE_ATTENDANCE_REPORT',
          'ENABLE_EMP_DASHBOARD',
          'ENABLE_ATTENDANCE',
        ],
        'Admission Management': [
          'ENABLE_PUB_ADMISSION',
          'ENABLE_ADMISSIONS',
          'ADMISSION_SUMMARY',
          'ENABLE_MAIN_ADMISSION',
          'ENABLE_ENROLLMENT',
          'ENABLE_ADMISSION_SCH',
          'ENABLE_ADMISSION_CLG',
          'ENABLE_ONLINE_ADMISSIONS',
        ],
        'Payment Management': [
          'ENABLE_PAYMENTS',
          'ENABLE_PAYMENTS_COLLECTION',
          'ENABLE_PAYMENTS_RECEIPT',
          'ENABLE_PAYMENTS_MANAGEMENT',
          'ENABLE_FEE_HEAD',
          'ENABLE_FEE_PAYMENT',
        ],
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