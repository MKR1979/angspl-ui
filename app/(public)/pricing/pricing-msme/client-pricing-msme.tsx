
// 'use client';
// import React, { useState, useEffect } from 'react';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Checkbox,
//   FormControlLabel,
//   CardHeader
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MyGrid from '@/app/custom-components/MyGrid';
// import MyButton from '@/app/custom-components/MyButton';
// import MyBox from '@/app/custom-components/MyBox';
// import MyCard from '@/app/custom-components/MyCard';
// import MyCardContent from '@/app/custom-components/MyCardContent';
// import MyTypography from '@/app/custom-components/MyTypography';
// import MyTab from '@/app/custom-components/MyTab';
// import MyTabs from '@/app/custom-components/MyTabs';
// import MyTabPanel from '@/app/custom-components/MyTabPanel';
// import { useRouter } from 'next/navigation';
// import usePricingMsme from './usePricingMsme';
// import * as Constants from '../../constants/constants';
// import './pricingMsme.css';

// // ---------------- TYPES ----------------
// interface Feature {
//   name: string;
//   price: number;
// }

// interface PricingPlan {
//   plan_name: string;
//   price: number;
//   features: Feature[];
// }

// interface PricingConfig {
//   monthly_plans: PricingPlan[];
//   annual_plans: PricingPlan[];
// }

// // ---------------- MAIN COMPONENT ----------------
// const ClientPricingMsme = () => {
//   const router = useRouter();
//   const { goToCompanyModule, siteConfig } = usePricingMsme();

//   const [tabIndex, setTabIndex] = useState(0);
//   const [pricingData, setPricingData] = useState<PricingConfig | null>(null);

//   // Separate states for monthly and annual
//   const [selectedFeaturesMonthly, setSelectedFeaturesMonthly] = useState<Record<string, string[]>>({});
//   const [customPricesMonthly, setCustomPricesMonthly] = useState<Record<string, number>>({});
//   const [selectedFeaturesAnnual, setSelectedFeaturesAnnual] = useState<Record<string, string[]>>({});
//   const [customPricesAnnual, setCustomPricesAnnual] = useState<Record<string, number>>({});
//   const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});

//   // ✅ Load from siteConfig → PRICING_CONFIG
//   useEffect(() => {
//     try {
//       const configItem: any = (siteConfig as any)?.find((c: any) => c.key === 'PRICING_CONFIG');
//       if (!configItem?.business_config?.business_config) return;

//       const rawConfig = configItem.business_config.business_config;
//       let parsedConfig: PricingConfig;

//       try {
//         parsedConfig = JSON.parse(rawConfig);
//       } catch {
//         parsedConfig = new Function(`return ${rawConfig}`)();
//       }

//       setPricingData(parsedConfig);

//       // ✅ Initialize monthly
//       const defaultsMonthly: Record<string, string[]> = {};
//       const defaultPricesMonthly: Record<string, number> = {};
//       parsedConfig.monthly_plans.forEach((plan) => {
//         defaultsMonthly[plan.plan_name] = plan.features.map((f) => f.name);
//         const totalPrice = plan.price + plan.features.reduce((sum, f) => sum + f.price, 0);
//         defaultPricesMonthly[plan.plan_name] = totalPrice;
//       });

//       // ✅ Initialize annual
//       const defaultsAnnual: Record<string, string[]> = {};
//       const defaultPricesAnnual: Record<string, number> = {};
//       parsedConfig.annual_plans.forEach((plan) => {
//         defaultsAnnual[plan.plan_name] = plan.features.map((f) => f.name);
//         const totalPrice = plan.price + plan.features.reduce((sum, f) => sum + f.price, 0);
//         defaultPricesAnnual[plan.plan_name] = totalPrice;
//       });

//       setSelectedFeaturesMonthly(defaultsMonthly);
//       setCustomPricesMonthly(defaultPricesMonthly);
//       setSelectedFeaturesAnnual(defaultsAnnual);
//       setCustomPricesAnnual(defaultPricesAnnual);

//       // Expand all accordions by default
//       const defaultExpanded: Record<string, boolean> = {};
//       [...parsedConfig.monthly_plans, ...parsedConfig.annual_plans].forEach(
//         (plan) => (defaultExpanded[plan.plan_name] = true)
//       );
//       setExpandedAccordions(defaultExpanded);
//     } catch (error) {
//       console.error('Error parsing PRICING_CONFIG:', error);
//     }
//   }, [siteConfig]);

//   // ✅ Toggle Accordion Open/Close
//   const handleAccordionToggle = (planTitle: string) => {
//     setExpandedAccordions({
//       ...expandedAccordions,
//       [planTitle]: !expandedAccordions[planTitle]
//     });
//   };

//   // ✅ Toggle feature selection (works for both Monthly and Annual)
//   const toggleFeature = (plan: string, feature: string, price: number) => {
//     const isAnnual = tabIndex === 1;
//     const currentPlans = isAnnual
//       ? pricingData?.annual_plans
//       : pricingData?.monthly_plans;

//     const currentSelected = isAnnual ? { ...selectedFeaturesAnnual } : { ...selectedFeaturesMonthly };
//     const currentPrices = isAnnual ? { ...customPricesAnnual } : { ...customPricesMonthly };

//     const current = currentSelected[plan] || [];
//     const basePrice = currentPlans?.find((p) => p.plan_name === plan)?.price || 0;
//     const isSelected = current.includes(feature);

//     let updatedFeatures: string[] = [];
//     let newTotal = basePrice;

//     if (isSelected) {
//       updatedFeatures = current.filter((f) => f !== feature);
//       newTotal = (currentPrices[plan] || basePrice) - price;
//     } else {
//       updatedFeatures = [...current, feature];
//       newTotal = (currentPrices[plan] || basePrice) + price;
//     }

//     if (isAnnual) {
//       setSelectedFeaturesAnnual({ ...currentSelected, [plan]: updatedFeatures });
//       setCustomPricesAnnual({ ...currentPrices, [plan]: newTotal });
//     } else {
//       setSelectedFeaturesMonthly({ ...currentSelected, [plan]: updatedFeatures });
//       setCustomPricesMonthly({ ...currentPrices, [plan]: newTotal });
//     }
//   };

//   const handleTabChange = (_: any, newValue: number) => {
//     setTabIndex(newValue);
//   };

//   if (!pricingData) {
//     return <div style={{ textAlign: 'center', padding: '20px' }}>Loading pricing...</div>;
//   }

//   // ---------------- UI ----------------
//   return (
//     <div style={{ width: '100%', paddingTop: '0px' }}>
//       <MyCardContent>
//         {/* ---------- HEADER ---------- */}
//         <MyBox
//           sx={{
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             mb: 2,
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: { xs: 2, sm: 0 },
//             position: 'relative'
//           }}
//         >
//           <MyBox
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 2,
//               position: { xs: 'static', sm: 'absolute' },
//               left: { sm: 0 },
//               justifyContent: { xs: 'center', sm: 'flex-start' },
//               width: { xs: '100%', sm: 'auto' }
//             }}
//           >
//             <MyButton
//               variant="outlined"
//               sx={{
//                 minWidth: '28px',
//                 height: '28px',
//                 borderRadius: '50%',
//                 fontSize: '1rem',
//                 padding: 0
//               }}
//               onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-tech`)}
//             >
//               <ArrowBack />
//             </MyButton>
//             <MyTypography variant="h6" sx={{ fontSize: '1rem' }}>
//               Choose the right plan for your <strong>MSME</strong>
//             </MyTypography>
//             <MyButton
//               variant="outlined"
//               sx={{
//                 minWidth: '28px',
//                 height: '28px',
//                 borderRadius: '50%',
//                 fontSize: '1rem',
//                 padding: 0
//               }}
//               onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-clg`)}
//             >
//               <ArrowForward />
//             </MyButton>
//           </MyBox>

//           {/* ---------- TABS ---------- */}
//           <MyBox
//             sx={{
//               margin: { xs: '0', sm: '0 auto' },
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: { xs: '100%', sm: 'auto' }
//             }}
//           >
//             <MyTabs value={tabIndex} onChange={handleTabChange}>
//               <MyTab label="Monthly Billing" />
//               <MyTab label="Annual Billing" />
//             </MyTabs>
//           </MyBox>
//         </MyBox>

//         {/* ---------- MONTHLY ---------- */}
//         <MyTabPanel value={tabIndex} index={0}>
//           <MyGrid container spacing={2} alignItems="stretch">
//             {pricingData.monthly_plans.map((plan) => {
//               const finalPrice = customPricesMonthly[plan.plan_name] || plan.price;
//               return (
//                 <MyGrid key={plan.plan_name} size={{ xs: 12, sm: 6, md: 3 }}>
//                   <MyCard
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       height: '100%',
//                       borderRadius: '20px',
//                       boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
//                     }}
//                   >
//                     <CardHeader
//                       title={plan.plan_name}
//                       sx={{
//                         textAlign: 'center',
//                         fontWeight: 'bold',
//                         backgroundColor: '#e2e8f0'
//                       }}
//                     />
//                     <MyCardContent sx={{ textAlign: 'center' }}>
//                       <div
//                         style={{
//                           fontSize: '22px',
//                           fontWeight: 'bold',
//                           color: '#2d3748',
//                           marginBottom: '10px'
//                         }}
//                       >
//                         ₹{finalPrice} / Month
//                       </div>

//                       <MyButton
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         onClick={() =>
//                           goToCompanyModule('MSME', plan.plan_name, 'Monthly', finalPrice)
//                         }
//                       >
//                         Buy Now
//                       </MyButton>

//                       <Accordion
//                         expanded={expandedAccordions[plan.plan_name] || false}
//                         onChange={() => handleAccordionToggle(plan.plan_name)}
//                         sx={{ mt: 2 }}
//                       >
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                           Customize Features
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           {plan.features.map((feature) => (
//                             <FormControlLabel
//                               key={feature.name}
//                               control={
//                                 <Checkbox
//                                   checked={
//                                     selectedFeaturesMonthly[plan.plan_name]?.includes(feature.name) ||
//                                     false
//                                   }
//                                   onChange={() =>
//                                     toggleFeature(plan.plan_name, feature.name, feature.price)
//                                   }
//                                 />
//                               }
//                               label={`${feature.name} (+₹${feature.price})`}
//                             />
//                           ))}
//                         </AccordionDetails>
//                       </Accordion>
//                     </MyCardContent>
//                   </MyCard>
//                 </MyGrid>
//               );
//             })}
//           </MyGrid>
//         </MyTabPanel>

//         {/* ---------- ANNUAL ---------- */}
//         <MyTabPanel value={tabIndex} index={1}>
//           <MyGrid container spacing={2} alignItems="stretch">
//             {pricingData.annual_plans.map((plan) => {
//               const finalPrice = customPricesAnnual[plan.plan_name] || plan.price;
//               return (
//                 <MyGrid key={plan.plan_name} size={{ xs: 12, sm: 6, md: 3 }}>
//                   <MyCard
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       height: '100%',
//                       borderRadius: '20px',
//                       boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
//                     }}
//                   >
//                     <CardHeader
//                       title={plan.plan_name}
//                       sx={{
//                         textAlign: 'center',
//                         fontWeight: 'bold',
//                         backgroundColor: '#edf2f7'
//                       }}
//                     />
//                     <MyCardContent sx={{ textAlign: 'center' }}>
//                       <div
//                         style={{
//                           fontSize: '22px',
//                           fontWeight: 'bold',
//                           color: '#2d3748',
//                           marginBottom: '10px'
//                         }}
//                       >
//                         ₹{finalPrice} / Year
//                       </div>

//                       <MyButton
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         onClick={() =>
//                           goToCompanyModule('MSME', plan.plan_name, 'Annual', finalPrice)
//                         }
//                       >
//                         Buy Now
//                       </MyButton>

//                       <Accordion
//                         expanded={expandedAccordions[plan.plan_name] || false}
//                         onChange={() => handleAccordionToggle(plan.plan_name)}
//                         sx={{ mt: 2 }}
//                       >
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                           Customize Features
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           {plan.features.map((feature) => (
//                             <FormControlLabel
//                               key={feature.name}
//                               control={
//                                 <Checkbox
//                                   checked={
//                                     selectedFeaturesAnnual[plan.plan_name]?.includes(feature.name) ||
//                                     false
//                                   }
//                                   onChange={() =>
//                                     toggleFeature(plan.plan_name, feature.name, feature.price)
//                                   }
//                                 />
//                               }
//                               label={`${feature.name} (+₹${feature.price})`}
//                             />
//                           ))}
//                         </AccordionDetails>
//                       </Accordion>
//                     </MyCardContent>
//                   </MyCard>
//                 </MyGrid>
//               );
//             })}
//           </MyGrid>
//         </MyTabPanel>
//       </MyCardContent>
//     </div>
//   );
// };

// export default ClientPricingMsme;



'use client';
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  CardHeader
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyTab from '@/app/custom-components/MyTab';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import { useRouter } from 'next/navigation';
import usePricingMsme from './usePricingMsme';
import * as Constants from '../../constants/constants';
import './pricingMsme.css';

// ---------------- TYPES ----------------
interface Feature {
  name: string;
  price: number;
}

interface PricingPlan {
  plan_name: string;
  price: number;
  features: Feature[];
}

interface PricingConfig {
  monthly_plans: PricingPlan[];
  annual_plans: PricingPlan[];
}

// ---------------- MAIN COMPONENT ----------------
const ClientPricingMsme = () => {
  const router = useRouter();
  const { goToCompanyModule, siteConfig, handleFeatureToggle } = usePricingMsme();
  const [tabIndex, setTabIndex] = useState(0);
  const [pricingData, setPricingData] = useState<PricingConfig | null>(null);

  // Separate states for monthly and annual tabs
  const [selectedFeaturesMonthly, setSelectedFeaturesMonthly] = useState<Record<string, string[]>>({});
  const [customPricesMonthly, setCustomPricesMonthly] = useState<Record<string, number>>({});
  const [expandedAccordionsMonthly, setExpandedAccordionsMonthly] = useState<Record<string, boolean>>({});

  const [selectedFeaturesAnnual, setSelectedFeaturesAnnual] = useState<Record<string, string[]>>({});
  const [customPricesAnnual, setCustomPricesAnnual] = useState<Record<string, number>>({});
  const [expandedAccordionsAnnual, setExpandedAccordionsAnnual] = useState<Record<string, boolean>>({});

  // ✅ Load from siteConfig → PRICING_CONFIG
  useEffect(() => {
    try {
      const configItem: any = (siteConfig as any)?.find((c: any) => c.key === 'PRICING_CONFIG');
      if (!configItem?.business_config?.business_config) return;

      const rawConfig = configItem.business_config.business_config;
      let parsedConfig: PricingConfig;

      try {
        parsedConfig = JSON.parse(rawConfig);
      } catch {
        parsedConfig = new Function(`return ${rawConfig}`)();
      }

      setPricingData(parsedConfig);

      // ✅ Initialize Monthly Defaults
      const defaultsM: Record<string, string[]> = {};
      const pricesM: Record<string, number> = {};
      const expandedM: Record<string, boolean> = {};

      parsedConfig.monthly_plans.forEach((plan) => {
        defaultsM[plan.plan_name] = plan.features.map((f) => f.name);
        pricesM[plan.plan_name] = plan.price + plan.features.reduce((sum, f) => sum + f.price, 0);
        expandedM[plan.plan_name] = true;
      });

      setSelectedFeaturesMonthly(defaultsM);
      setCustomPricesMonthly(pricesM);
      setExpandedAccordionsMonthly(expandedM);

      // ✅ Initialize Annual Defaults
      const defaultsA: Record<string, string[]> = {};
      const pricesA: Record<string, number> = {};
      const expandedA: Record<string, boolean> = {};

      parsedConfig.annual_plans.forEach((plan) => {
        defaultsA[plan.plan_name] = plan.features.map((f) => f.name);
        pricesA[plan.plan_name] = plan.price + plan.features.reduce((sum, f) => sum + f.price, 0);
        expandedA[plan.plan_name] = true;
      });

      setSelectedFeaturesAnnual(defaultsA);
      setCustomPricesAnnual(pricesA);
      setExpandedAccordionsAnnual(expandedA);
    } catch (error) {
      console.error('Error parsing PRICING_CONFIG:', error);
    }
  }, [siteConfig]);

//   useEffect(() => {
//   try {
//     const configItem: any = (siteConfig as any)?.find((c: any) => c.key === 'PRICING_CONFIG');
//     if (!configItem) return;

//     // ✅ Handle both object and string business_config
//     const rawConfig = configItem.business_config;
//     const businessConfig =
//       typeof rawConfig === 'string'
//         ? JSON.parse(rawConfig)
//         : rawConfig;

//     if (!businessConfig) return;

//     setPricingData(businessConfig);

//     // ✅ Initialize Monthly Defaults
//     const defaultsM: Record<string, string[]> = {};
//     const pricesM: Record<string, number> = {};
//     const expandedM: Record<string, boolean> = {};

//     businessConfig.monthly_plans.forEach((plan: any) => {
//       defaultsM[plan.plan_name] = plan.features.map((f: any) => f.name);
//       pricesM[plan.plan_name] = plan.price + plan.features.reduce((sum: number, f: any) => sum + f.price, 0);
//       expandedM[plan.plan_name] = true;
//     });

//     setSelectedFeaturesMonthly(defaultsM);
//     setCustomPricesMonthly(pricesM);
//     setExpandedAccordionsMonthly(expandedM);

//     // ✅ Initialize Annual Defaults
//     const defaultsA: Record<string, string[]> = {};
//     const pricesA: Record<string, number> = {};
//     const expandedA: Record<string, boolean> = {};

//     businessConfig.annual_plans.forEach((plan: any) => {
//       defaultsA[plan.plan_name] = plan.features.map((f: any) => f.name);
//       pricesA[plan.plan_name] = plan.price + plan.features.reduce((sum: number, f: any) => sum + f.price, 0);
//       expandedA[plan.plan_name] = true;
//     });

//     setSelectedFeaturesAnnual(defaultsA);
//     setCustomPricesAnnual(pricesA);
//     setExpandedAccordionsAnnual(expandedA);

//     console.log('✅ Loaded PRICING_CONFIG:', businessConfig);
//   } catch (error) {
//     console.error('❌ Error parsing PRICING_CONFIG:', error);
//   }
// }, [siteConfig]);


  // ✅ Handle Accordion Toggle
  const handleAccordionToggle = (planTitle: string, isAnnual = false) => {
    if (isAnnual) {
      setExpandedAccordionsAnnual({
        ...expandedAccordionsAnnual,
        [planTitle]: !expandedAccordionsAnnual[planTitle],
      });
    } else {
      setExpandedAccordionsMonthly({
        ...expandedAccordionsMonthly,
        [planTitle]: !expandedAccordionsMonthly[planTitle],
      });
    }
  };

  // ✅ Toggle feature with min one feature selected rule
  const toggleFeature = (plan: string, feature: string, price: number, isAnnual = false) => {
    const planList = isAnnual ? pricingData?.annual_plans : pricingData?.monthly_plans;
    const currentSelected = isAnnual ? selectedFeaturesAnnual : selectedFeaturesMonthly;
    const currentPrices = isAnnual ? customPricesAnnual : customPricesMonthly;

    const current = currentSelected[plan] || [];
    const basePrice = planList?.find((p) => p.plan_name === plan)?.price || 0;
    const isSelected = current.includes(feature);

    let updatedFeatures: string[] = [];
    let newTotal = basePrice;

    if (isSelected) {
      // 🔒 Prevent removing the last feature
      if (current.length === 1) {
        alert('At least one feature must remain selected.');
        return;
      }
      updatedFeatures = current.filter((f) => f !== feature);
      newTotal = (currentPrices[plan] || basePrice) - price;
    } else {
      updatedFeatures = [...current, feature];
      newTotal = (currentPrices[plan] || basePrice) + price;
    }

    if (isAnnual) {
      setSelectedFeaturesAnnual({ ...currentSelected, [plan]: updatedFeatures });
      setCustomPricesAnnual({ ...currentPrices, [plan]: newTotal });
    } else {
      setSelectedFeaturesMonthly({ ...currentSelected, [plan]: updatedFeatures });
      setCustomPricesMonthly({ ...currentPrices, [plan]: newTotal });
    }
  };

  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!pricingData) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading pricing...</div>;
  }

  // ---------------- UI ----------------
  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyCardContent>
        {/* ---------- HEADER ---------- */}
        <MyBox
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            position: 'relative'
          }}
        >
          <MyBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              position: { xs: 'static', sm: 'absolute' },
              left: { sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <MyButton
              variant="outlined"
              sx={{ minWidth: '28px', height: '28px', borderRadius: '50%', fontSize: '1rem', padding: 0 }}
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-tech`)}
            >
              <ArrowBack />
            </MyButton>
            <MyTypography variant="h6" sx={{ fontSize: '1rem' }}>
              Choose the right plan for your <strong>MSME</strong>
            </MyTypography>
            <MyButton
              variant="outlined"
              sx={{ minWidth: '28px', height: '28px', borderRadius: '50%', fontSize: '1rem', padding: 0 }}
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-clg`)}
            >
              <ArrowForward />
            </MyButton>
          </MyBox>

          {/* ---------- TABS ---------- */}
          <MyBox sx={{ margin: { xs: '0', sm: '0 auto' }, display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', sm: 'auto' } }}>
            <MyTabs value={tabIndex} onChange={handleTabChange}>
              <MyTab label="Monthly Billing" />
              <MyTab label="Annual Billing" />
            </MyTabs>
          </MyBox>
        </MyBox>

        {/* ---------- MONTHLY ---------- */}
        <MyTabPanel value={tabIndex} index={0}>
          <MyGrid container spacing={2} alignItems="stretch">
            {pricingData.monthly_plans.map((plan) => {
              const finalPrice = customPricesMonthly[plan.plan_name] || plan.price;
              return (
                <MyGrid key={plan.plan_name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MyCard sx={{ borderRadius: '20px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
                    <CardHeader title={plan.plan_name} sx={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#e2e8f0' }} />
                    <MyCardContent sx={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>₹{finalPrice} / Month</div>
                      <MyButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => goToCompanyModule('MSME', plan.plan_name, 'Monthly', finalPrice)}
                      >
                        Buy Now
                      </MyButton>
                      <Accordion expanded={expandedAccordionsMonthly[plan.plan_name] || false} onChange={() => handleAccordionToggle(plan.plan_name, false)} sx={{ mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Customize Features</AccordionSummary>
                        <AccordionDetails>
                          {plan.features.map((feature) => (
                            <FormControlLabel
                              key={feature.name}
                              control={
                                <Checkbox
                                  checked={selectedFeaturesMonthly[plan.plan_name]?.includes(feature.name) || false}
                                  // onChange={() => toggleFeature(plan.plan_name, feature.name, feature.price, false)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    toggleFeature(plan.plan_name, feature.name, feature.price, false);
                                    console.log('calling handleFeatureToogle method from client ');
                                    handleFeatureToggle(feature.name, checked); // <-- 👈 this updates modifiedSiteConfig
                                  }}
                                />
                              }
                              label={`${feature.name} (+₹${feature.price})`}
                            />
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              );
            })}
          </MyGrid>
        </MyTabPanel>

        {/* ---------- ANNUAL ---------- */}
        <MyTabPanel value={tabIndex} index={1}>
          <MyGrid container spacing={2} alignItems="stretch">
            {pricingData.annual_plans.map((plan) => {
              const finalPrice = customPricesAnnual[plan.plan_name] || plan.price;
              return (
                <MyGrid key={plan.plan_name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MyCard sx={{ borderRadius: '20px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
                    <CardHeader title={plan.plan_name} sx={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#edf2f7' }} />
                    <MyCardContent sx={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>₹{finalPrice} / Year</div>
                      <MyButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => goToCompanyModule('MSME', plan.plan_name, 'Annual', finalPrice)}
                      >
                        Buy Now
                      </MyButton>

                      <Accordion expanded={expandedAccordionsAnnual[plan.plan_name] || false} onChange={() => handleAccordionToggle(plan.plan_name, true)} sx={{ mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Customize Features</AccordionSummary>
                        <AccordionDetails>
                          {plan.features.map((feature) => (
                            <FormControlLabel
                              key={feature.name}
                              control={
                                <Checkbox
                                  checked={selectedFeaturesAnnual[plan.plan_name]?.includes(feature.name) || false}
                                  onChange={() => toggleFeature(plan.plan_name, feature.name, feature.price, true)}
                                />
                              }
                              label={`${feature.name} (+₹${feature.price})`}
                            />
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              );
            })}
          </MyGrid>
        </MyTabPanel>
      </MyCardContent>
    </div>
  );
};

export default ClientPricingMsme;

