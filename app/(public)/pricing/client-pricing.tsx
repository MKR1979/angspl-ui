'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import { CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import './pricing.css';
import { COMPANY } from '.././constants/constants';

import usePricing from './usePricing';

const ClientPricing = () => {
  const { state, handleTabChange } = usePricing();
  const rows = [
    {
      name: 'Public Site',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Admission',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Payment Collections',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Account Creation',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Login',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Role Creation',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'User Creation',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Profile Management',
      calories: '✔',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Course Creation',
      calories: '✘',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Student Dashboard',
      calories: '✘',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'SmartExam',
      calories: '✘',
      fat: '✔',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Import Quiz',
      calories: '✘',
      fat: '✘',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Study Notes',
      calories: '✘',
      fat: '✘',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Video',
      calories: '✘',
      fat: '✘',
      carbs: '✔',
      protein: '✔'
    },
    {
      name: 'Location Based Attendance',
      calories: '✘',
      fat: '✘',
      carbs: '✘',
      protein: '✔'
    },
    {
      name: 'WhatsApp integration',
      calories: '✘',
      fat: '✘',
      carbs: '✘',
      protein: '✔'
    },
    {
      name: 'Facebook integrations',
      calories: '✘',
      fat: '✘',
      carbs: '✘',
      protein: '✔'
    },
    {
      name: 'AI integration',
      calories: '✘',
      fat: '✘',
      carbs: '✘',
      protein: '✔'
    },
    {
      name: 'Student Info',
      calories: '✘',
      fat: '✘',
      carbs: '✘',
      protein: '✔'
    }
  ];
  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyTypography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
              Choose Your Plan
            </MyTypography>
            <MyBox sx={{ mb: 1, fontSize: '20px', textAlign: 'center' }}>Smart Plans for Every Need — Pick Yours Today!</MyBox>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <MyTabs value={state.tabIndex} onChange={handleTabChange}>
                <MyTab label="Monthly Billing" />
                <MyTab label="Annual Billing" />
              </MyTabs>
            </MyBox>
            <MyTabPanel value={state.tabIndex} index={0}>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Basic</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹3000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly, Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        An entry-level, fully managed hosting solution designed for schools, colleges, and universities with limited data
                        and automation needs. Ideal for up to <strong>10 users</strong>.
                      </div>
                      <MyButton
                        variant="outlined"
                        fullWidth
                        style={{
                          marginBottom: '12px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        Compare Plans&nbsp;➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth style={{ fontWeight: 'bold' }}>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Professional</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: '600', color: '#2d3748' }}>₹5000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly, Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Advanced shared hosting with improved performance, expanded storage, and business-centric features. Best suited for
                        teams of up to
                        <strong>50 users</strong>.
                      </div>
                      <MyButton
                        variant="outlined"
                        style={{ marginBottom: '12px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        Compare Plans&nbsp;➡️
                      </MyButton>
                      <MyButton variant="contained" style={{ width: '100%', fontWeight: 'bold' }}>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                {/* <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Premium</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$280.00</div>
                      <div>Per Month</div>
                      <br></br>
                      <div>Billed Monthly Excludes VAT</div>
                      <br></br>
                      <div>
                        Our highest performance shared hosting package with a large storage capacity and greater flexibility. Recommended
                        for up to 150 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Dedicated</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>from $3200</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Excludes VAT & Application Support</div>
                      <br></br>
                      <div>
                        Enterprise grade, fully managed instance with dedicated resources, scalable performance and the ultimate
                        flexability.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Contact Us</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid> */}
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Premium</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹7000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly, Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Experience elite performance and limitless flexibility with our most powerful shared hosting package — designed for
                        demanding teams of up to <strong>150 Users</strong>.
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans&nbsp;➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Dedicated</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹99000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Excludes VAT & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Enterprise-grade, fully managed hosting with dedicated resources, scalable performance, and unmatched flexibility —
                        ideal for large organizations with complex requirements.
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans&nbsp;➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Contact Us
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyTabPanel>
            <MyTabPanel value={state.tabIndex} index={1}>
              <MyGrid container spacing={2} alignItems="stretch">
                {/* <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Basic</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$130.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Entry level, fully managed and supported shared hosting for organisations with limited CRM data and automation
                        requirements. Recommended for up to 10 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton fullWidth>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Professional</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$180.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Shared hosting with enhanced performance, additional storage and business focused features. Recommended for up to 50
                        Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid> */}
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Basic</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹30000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        An entry-level, fully managed hosting solution designed for schools, colleges, and universities with limited data
                        and automation needs. Ideal for up to <strong>10 users</strong>.
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Professional</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹55000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Advanced shared hosting with improved performance, expanded storage, and business-centric features. Best suited for
                        teams of up to 50 users
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                {/* <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Premium</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$280.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Our highest performance shared hosting package with a large storage capacity and greater flexibility. Recommended
                        for up to 150 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Dedicated</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>from $3200</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Excludes VAT & Application Support</div>
                      <br></br>
                      <div>
                        Enterprise grade, fully managed instance with dedicated resources, scalable performance and the ultimate
                        flexability.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Contact Us</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid> */}
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Premium</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹80000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Experience elite performance and limitless flexibility with our most powerful shared hosting package — designed for
                        demanding teams of up to 150 users.
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Try It Free
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <CardHeader
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Dedicated</span>}
                      sx={{
                        textAlign: 'center',
                        height: '60px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <MyCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹99000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Excludes VAT & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Enterprise-grade, fully managed hosting with dedicated resources, scalable performance, and unmatched flexibility —
                        ideal for large organizations with complex requirements.
                      </div>
                      <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton>
                      <MyButton variant="contained" fullWidth>
                        Contact Us
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyTabPanel>
          </MyCardContent>
        </MyCard>
      </MyBox>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyGrid container spacing={2} alignItems="stretch">
              <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="pricing comparison table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>Features</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>
                          Basic
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>
                          Professional
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>
                          Premium
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>
                          Dedicated
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.name}</TableCell>
                          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                            {row.calories}
                          </TableCell>
                          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                            {row.fat}
                          </TableCell>
                          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                            {row.carbs}
                          </TableCell>
                          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                            {row.protein}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MyGrid>
            </MyGrid>
          </MyCardContent>
        </MyCard>
      </MyBox>
      <div className="container">
        <div className="vertical_center">
          <p>© Copyright 2025 {COMPANY}, All rights reserved.</p>
          <div className="vertical_center">
            ||
            <a href="/terms">Terms of use</a>||
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClientPricing, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
