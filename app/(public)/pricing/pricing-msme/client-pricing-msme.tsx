'use client';
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  CardHeader,
  Box
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
  plan_id: number;
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

          {/*---------- TABS ---------- */}
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
                    <CardHeader
                      title={<span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1a202c' }}>{plan.plan_name}</span>}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        backgroundColor: '#e2e8f0',
                        color: '#2d3748',
                        py: 1.5,
                        fontSize: '1.1rem',
                      }}
                    />
                    <MyCardContent sx={{ textAlign: 'center' }}>
                      {plan.plan_name === 'Premium' && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            background: 'linear-gradient(90deg, #7e22ce, #ec4899)',
                            boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)',
                            color: 'white',
                            borderRadius: '8px',
                            px: 0.7,
                            py: 0.4,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                              '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                            },
                          }}
                        >
                          MOST POPULAR
                        </Box>
                      )}
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>₹{finalPrice} / Month</div>
                      <MyButton
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          fontWeight: 600,
                          letterSpacing: 0.5,
                          borderRadius: '12px',
                          background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 100%)',
                          },
                        }}
                        onClick={() => goToCompanyModule('MSME', plan.plan_name, 'Monthly', finalPrice, plan.plan_id)}
                      >
                        BUY NOW
                      </MyButton>
                      <Accordion
                        expanded={expandedAccordionsMonthly[plan.plan_name] || false}
                        onChange={() => handleAccordionToggle(plan.plan_name, false)}
                        sx={{
                          mt: 2,
                          boxShadow: 'none',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px !important',
                          '&:before': { display: 'none' },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: '#4a5568' }} />}
                          sx={{
                            fontWeight: 600,
                            color: '#2d3748',
                            backgroundColor: '#f7fafc',
                            borderBottom: '2px solid #e2e8f0',
                          }}
                        >
                          Customize Features
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 1.5 }}>
                          {plan.features.map((feature) => (
                            <FormControlLabel
                              key={feature.name}
                              control={
                                <Checkbox
                                  checked={selectedFeaturesMonthly[plan.plan_name]?.includes(feature.name) || false}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    toggleFeature(plan.plan_name, feature.name, feature.price, false);
                                    handleFeatureToggle(feature.name, checked, 'monthly'
                                    );
                                  }}
                                  sx={{ p: 0.5 }}
                                />
                              }
                              label={
                                <Box sx={{ ml: 1, fontSize: '1rem', color: '#2d3748', lineHeight: 1.4 }}>
                                  {feature.name} <strong>(+₹{feature.price})</strong>
                                </Box>
                              }
                              sx={{ alignItems: 'center', mb: 0.5 }}
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
                  <MyCard
                    sx={{
                      borderRadius: '20px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardHeader title={plan.plan_name} sx={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#edf2f7' }} />
                    <MyCardContent sx={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>₹{finalPrice} / Year</div>
                      <MyButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => goToCompanyModule('MSME', plan.plan_name, 'Annual', finalPrice, plan.plan_id)}
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
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    toggleFeature(plan.plan_name, feature.name, feature.price, false);
                                    handleFeatureToggle(feature.name, checked, 'annual'
                                    );
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
      </MyCardContent>
    </div>
  );
};

export default ClientPricingMsme;