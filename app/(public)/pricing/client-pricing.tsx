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
  const { state, handleTabChange, toggleRowExpansion } = usePricing();
  const rows = [
    {
      name: 'Dynamic Web Application',
      calories: '✖',
      fat: '✔',
      carbs: '✔',
      protein: '✔',
      children: [
        {
          name: '• Home Page',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Admission',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Document Upload & Verification',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Online Payment Collection',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Payment Gateway',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Receipt and Acknowledgement',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Account Creation',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Login Credentials Delivery',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• Programs Dashboard',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Course Catalog',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Online Enrollment',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Payment Gateway',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Receipt and Acknowledgement',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Account Creation',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Login Credentials Delivery',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• Affiliates',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Affiliate Registration',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Affiliate Login Panel',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Referral Tracking',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Commission Summary',
              calories: '✖',
              fat: '✔',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• About Us',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Contact Us',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Login',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Registration',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Forgot Password',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        }
      ]
    },
    {
      name: 'Admin Dashboard',
      calories: '✖',
      fat: '✔',
      carbs: '✔',
      protein: '✔',
      children: [
        {
          name: '• Login',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Courses / Classes Management',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Applicant Verification',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Roles Management',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Users Management',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Study Kit',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Practice Project',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Study Notes',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Video Uploads',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• Online Exams Management',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Instant Exam Builder',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Bulk Exam Uploader',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• View Profile',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Change Password',
          calories: '✖',
          fat: '✔',
          carbs: '✔',
          protein: '✔'
        }
      ]
    },
    {
      name: 'Student Dashboard',
      calories: '✖',
      fat: '✖',
      carbs: '✔',
      protein: '✔',
      children: [
        {
          name: '• Login',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Exams / Skill Tests',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Fee Payment',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Online Homework',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Courses Content',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Paid Courses / Programs',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Free Courses / Programs',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• Study Kit',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔',
          children: [
            {
              name: '•• Code Insights',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Notes Insights',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            },
            {
              name: '•• Online Videos',
              calories: '✖',
              fat: '✖',
              carbs: '✔',
              protein: '✔'
            }
          ]
        },
        {
          name: '• View Profile',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Change Password',
          calories: '✖',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        }
      ]
    },

    {
      name: 'Employee Dashboard',
      calories: '✖',
      fat: '✖',
      carbs: '✖',
      protein: '✔',
      children: [
        {
          name: '• Login',
          calories: '✖',
          fat: '✖',
          carbs: '✖',
          protein: '✔'
        },
        {
          name: '• Location Based Online Attendance',
          calories: '✖',
          fat: '✖',
          carbs: '✖',
          protein: '✔'
        },
        {
          name: '• View Profile',
          calories: '✖',
          fat: '✖',
          carbs: '✖',
          protein: '✔'
        },
        {
          name: '• Change Password',
          calories: '✖',
          fat: '✖',
          carbs: '✖',
          protein: '✔'
        }
      ]
    },
    {
      name: 'Location Based Attendance',
      calories: '✖',
      fat: '✖',
      carbs: '✖',
      protein: '✔'
    },
     {
      name: 'Public Site',
      calories: '✔',
      fat: '✖',
      carbs: '✔',
      protein: '✔',
      children: [
        {
          name: '• Home Page',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• About Us',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Services / Offerings',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Contact Us',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Admission Enquiry',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Header & Navigation',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Footer',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Responsive Design',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• SEO Tags',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Social Media Links',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        },
        {
          name: '• Image Gallery',
          calories: '✔',
          fat: '✖',
          carbs: '✔',
          protein: '✔'
        }
      ]
    },
  ];

  const formatUrl = (url: any) => (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);

  interface RowData {
    name: string;
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    children?: RowData[];
  }

  const renderRow = (row: RowData, level: number = 0): React.ReactNode => {
    const isExpanded = !!state.expandedRows[row.name];
    const hasChildren = Array.isArray(row.children) && row.children.length > 0;

    return (
      <React.Fragment key={row.name}>
        <TableRow>
          <TableCell
            onClick={() => hasChildren && toggleRowExpansion(row.name)}
            sx={{
              pl: 3 + level * 2, // Indentation
              cursor: hasChildren ? 'pointer' : 'default',
              border: '1px solid #e0e0e0'
            }}
          >
            {hasChildren && <span style={{ marginRight: '8px' }}>{isExpanded ? '▼' : '▶'}</span>}
            {row.name}
          </TableCell>
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

        {isExpanded && hasChildren && row.children!.map((child) => renderRow(child, level + 1))}
      </React.Fragment>
    );
  };

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
                <MyGrid size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹2000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly, Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional online presence. This fully managed static web application includes all essential features for sharing information and managing admission enquiries.
                      </div>
                      {/* <MyButton
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
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
                      <div style={{ fontSize: '25px', fontWeight: '600', color: '#2d3748' }}>₹3500</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly, Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin Dashboard for managing Users, Roles, and Courses. Ideal for Institutions needing advanced functionality and support.
                      </div>
                      {/* <MyButton
                        variant="outlined"
                        style={{ marginBottom: '12px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        Compare Plans&nbsp;➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
                       A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework, course content, and fee payment.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans&nbsp;➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹10000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Excludes VAT & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility. Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized Admin Reporting.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans&nbsp;➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.location.href = 'https://www.angspl.com/contact-us';
                        }}
                      >
                        Book a Demo
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                <MyGrid size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Online Attendance</span>}
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
      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Monthly & Excludes VAT</div>
      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
        A standalone, location-based online attendance system with employee dashboard and centralized admin reporting. Ideal for institutions and organizations needing precise and flexible attendance tracking.
      </div>
      <MyButton
        variant="contained"
        fullWidth
        onClick={() => {
          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
        }}
      >
        Book a Demo
      </MyButton>
    </MyCardContent>
  </MyCard>
</MyGrid>



              </MyGrid>
            </MyTabPanel>
            <MyTabPanel value={state.tabIndex} index={1}>
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹20000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional online presence. This fully managed static web application includes all essential features for sharing information and managing admission enquiries.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹35000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin Dashboard for managing Users, Roles, and Courses. Ideal for Institutions needing advanced functionality and support.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹70000</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Billed Annually Excludes VAT</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework, course content, and fee payment.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.open(formatUrl('https://www.angspl.com/contact-us'), '_blank');
                        }}
                      >
                        Book a Demo
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
                      <div style={{ fontSize: '25px', fontWeight: 600, color: '#2d3748' }}>₹99999</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '16px' }}>Excludes VAT & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '24px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility. Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized Admin Reporting.
                      </div>
                      {/* <MyButton variant="outlined" fullWidth style={{ marginBottom: '12px' }}>
                        Compare Plans ➡️
                      </MyButton> */}
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.location.href = 'https://www.angspl.com/contact-us'; // ya koi external link bhi de sakte ho
                        }}
                      >
                        Book a Demo
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
                    <TableBody>{rows.map((row) => renderRow(row))}</TableBody>
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
