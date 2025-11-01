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
        // 🔹 Update state
        setState({
          originalSiteConfig: fetchedConfig,
          newCompanyConfig: updatedConfig,
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
        'Admin Dashboard': [
          'ENABLE_DASHBOARD',
          'ENABLE_COURSE',
          'ENABLE_COURSE_TYPE',
          'ENABLE_ADMISSIONS',
          'ENABLE_USER',
          'ENABLE_ROLES',
          'ENABLE_STUDY_KIT',
          'ENABLE_ONLINE_EXAMS',
          'ENABLE_QUIZZES',
          'ENABLE_QUIZ_QUESTIONS',
          'ENABLE_QUESTION_OPTIONS',
          'ENABLE_IMPORT_QUIZZES',
          'ENABLE_CODE_PROJECTS',
          'ENABLE_VIDEO_UPLOADS',
          'ENABLE_STUDY_NOTES',
          'ENABLE_INTERVIEW_QUESTIONS',
          'ENABLE_REFERRALS',
          'ENABLE_COMPANIES',
          'ENABLE_EMAILS',
          'ENABLE_EMAIL_TEMPLATES',
          'ENABLE_LOCATIONS',
          'ENABLE_EVENTS',
          'ENABLE_COMPAIGNS',
          'ENABLE_SURVEYS',
          'ENABLE_COUNTRIES',
          'ENABLE_CURRENCIES',
          'ENABLE_STATES',
          'ENABLE_DISTRICTS',
          'ENABLE_ATTENDANCE_SUMMARY',
          'ENABLE_MARK_ATTENDANCE',
          'ENABLE_LOCK_ATTENDANCE',
          'ENABLE_STUDENT_ATTENDANCE',
          'ENABLE_REVIEW_ATTENDANCE',
          'ENABLE_USER_DEVICE',
          'ENABLE_SITE_CONFIGS',
          'ENABLE_AFFILIATES',
          'ENABLE_STUDENTS',
          'ENABLE_REVIEW_AFFILIATES',
          'ENABLE_EMP_PORT',
          'ENABLE_QUIZ_RESULTS',
          'ENABLE_TRACK_PRESENCE',
          'ENABLE_DAILY_ATTENDANCE',
          'ENABLE_MANUAL_ATTENDANCE',
          'ENABLE_COMPANY_DOMAIN',
          'ENABLE_ATTENDANCE_REPORT',
          'ADMISSION_SUMMARY',
          'ENABLE_MAIN_ADMISSION',
          'ENABLE_ENROLLMENT',
          'ENABLE_ENQUIRY',
          'ENABLE_MODULES',
          'ENABLE_TYPE',
          'ENABLE_OPTIONS',
          'ENABLE_USER_PERMISSION',
          'ENABLE_ROLE_PERMISSION',
          'ENABLE_EMP_MASTER',
          'ENABLE_ADMISSION_SCH',
          'ENABLE_ADMISSION_CLG',
          'ENABLE_USER_ACCESS_MANAGE',
          'ENABLE_MEETINGS',
          'ENABLE_GROUPS',
          'ENABLE_PAYMENTS',
          'ENABLE_PAYMENTS_COLLECTION',
          'ENABLE_PAYMENTS_RECEIPT',
          'ENABLE_PAYMENTS_MANAGEMENT',
          'ENABLE_ONLINE_ADMISSIONS',
          'ENABLE_COMMUNICATIONS',
          'ENABLE_ENGAGEMENTS',
          'ENABLE_GEOGRAPHY',
          'ENABLE_FEE_HEAD',
        ],
        'Student Dashboard': [
          'ENABLE_LEARNING_DASHBOARD',
          'ENABLE_COURSE_CONTENTS',
          'ENABLE_FREE_COURSE',
          'ENABLE_PAID_COURSE',
          'ENABLE_STUDY_KITS',
          'ENABLE_TEST_QUIZZES',
          'ENABLE_VIDEO_INSIGHTS',
          'ENABLE_CODE_INSIGHTS',
          'ENABLE_NOTES_INSIGHTS',
          'ENABLE_STUDENT_INFO',
          'ENABLE_FEE_PAYMENT',
          'ENABLE_HOMEWORKS',
        ],
        'Dynamic Web Application': [
          'ENABLE_PAYROLL_MODULE',
          'ALLOW_SALARY_SLIP_DOWNLOAD'
        ],
        'Online Admission': [
          'ENABLE_PUB_ADMISSION',
          'ENABLE_ADMISSIONS',
          'ADMISSION_SUMMARY',
          'ENABLE_MAIN_ADMISSION',
          'ENABLE_ENROLLMENT',
          'ENABLE_ADMISSION_SCH',
          'ENABLE_ADMISSION_CLG',
          'ENABLE_ONLINE_ADMISSIONS',
        ],
        'Fee Payment Integration': [
          'ENABLE_PAYMENTS',
          'ENABLE_PAYMENTS_COLLECTION',
          'ENABLE_PAYMENTS_RECEIPT',
          'ENABLE_PAYMENTS_MANAGEMENT',
          'ENABLE_FEE_HEAD'
        ],
        'Online Exams': [
          'ENABLE_ONLINE_EXAMS',
          'ENABLE_QUIZZES',
          'ENABLE_QUIZ_QUESTIONS',
          'ENABLE_QUESTION_OPTIONS',
          'ENABLE_IMPORT_QUIZZES',
          'ENABLE_QUIZ_RESULTS',
          'ENABLE_TEST_QUIZZES'

        ],
        'Study Materials': [
          'ENABLE_STUDY_KITS',
          'ENABLE_STUDY_KIT',
          'ENABLE_VIDEO_UPLOADS',
          'ENABLE_STUDY_NOTES',
          'ENABLE_VIDEO_INSIGHTS',
          'ENABLE_CODE_INSIGHTS',
          'ENABLE_NOTES_INSIGHTS',
          'ENABLE_INTERVIEW_QUESTIONS',

        ],
        'Faculty Management': [

        ],
        'Attendance Tracking': [
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
        'Timetable Management': [

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