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
import './pricingTech.css';
import { COMPANY } from '../constants/constants';
import usePricingTech from './usePricingTech';
import * as Constants from '../constants/constants';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ClientPricingTech = () => {
  const { state, handleTabChange, toggleRowExpansion, goToCompanyModule } = usePricingTech();
  const rows = [
    {
      name: 'Admin Dashboard',
      basic: '✖',
      professional: '✔',
      premium: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'User Access Management',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Roles',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Users',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Role Permission',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'User Permission',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Academics',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Courses',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Online Admission',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Admission',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Enrollments',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Admission Summary',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Study Kits',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Code Projects',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Study Notes',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Upload Videos',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Online Exams',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Add Exam',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Questions',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Bulk Import',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Results',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                }
              ]
            }
          ]
        },

        {
          name: 'Employee Services',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Employee Master',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Review Attendance',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Attendance Report',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Time Log Report',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Day Wise Attendance',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Presence Overview',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'User Devices',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Bulk Attendance',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Mark Attendance',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Lock Attendance',
                  basic: '✖',
                  professional: '✔',
                  premium: '✔',
                  dedicated: '✔'
                }
              ]
            }
          ]
        },
        {
          name: 'Payment Management',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Schedule Fee',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Collect Pay',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Receipts',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Fee Head',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Communications',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Emails',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Email Templates',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notifications',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Engagements',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enquiry',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Events',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Meetings',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Geography',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Countries',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'States',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Locations',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Affiliates',
          basic: '✖',
          professional: '✔',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Review Affiliates',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Referrals',
              basic: '✖',
              professional: '✔',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        }
      ]
    },
    {
      name: 'Student Dashboard',
      basic: '✖',
      professional: '✖',
      premium: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Course Contents',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enrolled Courses',
              basic: '✖',
              professional: '✖',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Free Courses',
              basic: '✖',
              professional: '✖',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Study Kits',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Code Insight',
              basic: '✖',
              professional: '✖',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notes Insight',
              basic: '✖',
              professional: '✖',
              premium: '✔',
              dedicated: '✔'
            },
            {
              name: 'Video Insight',
              basic: '✖',
              professional: '✖',
              premium: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Online Exams / Skill Tests',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Payments / Fees',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Student Info',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Online Homework',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          basic: '✖',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        }
      ]
    },

    {
      name: 'Employee Dashboard',
      basic: '✖',
      professional: '✖',
      premium: '✖',
      dedicated: '✔',
      children: [
        {
          name: 'Location Based Online Attendance',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'Login',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        }
      ]
    },
    {
      name: 'Affiliate Dashboard',
      basic: '✖',
      professional: '✖',
      premium: '✖',
      dedicated: '✔',
      children: [
        {
          name: 'Referral Trekking',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'Login',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          basic: '✖',
          professional: '✖',
          premium: '✖',
          dedicated: '✔'
        }
      ]
    },
    {
      name: 'Location Based Attendance',
      basic: '✖',
      professional: '✖',
      premium: '✖',
      dedicated: '✔'
    },
    {
      name: 'Dynamic Web Application',
      basic: '✔',
      professional: '✖',
      premium: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Home Page',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'About Us',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Programs Enrollment',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Services / Offerings',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Affiliate Registration',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Contact Us',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Admission Enquiry',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Registration',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Forget Password',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Social Media Links',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        },
        {
          name: 'Image Gallery',
          basic: '✔',
          professional: '✖',
          premium: '✔',
          dedicated: '✔'
        }
      ]
    }
  ];

  interface RowData {
    name: string;
    basic: string;
    professional: string;
    premium: string;
    dedicated: string;
    children?: RowData[];
  }

  const router = useRouter();

  const renderRow = (row: RowData, level: number = 0): React.ReactNode => {
    const isExpanded = !!state.expandedRows[row.name];
    const hasChildren = Array.isArray(row.children) && row.children.length > 0;

    return (
      <React.Fragment key={row.name}>
        <TableRow>
          <TableCell
            onClick={() => hasChildren && toggleRowExpansion(row.name)}
            sx={{
              pl: 3 + level * 2,
              cursor: hasChildren ? 'pointer' : 'default',
              border: '1px solid #e0e0e0'
            }}
          >
            {hasChildren && <span style={{ marginRight: '8px' }}>{isExpanded ? '▼' : '▶'}</span>}
            {row.name}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.basic}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.professional}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.premium}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.dedicated}
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
            <MyBox
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 2
              }}
            >
              {/* Left Arrow Button */}
              <MyButton
                variant="outlined"
                sx={{
                  minWidth: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  padding: 0
                }}
                onClick={() => router.push('/pricing-sch')}
              >
                <ArrowBack />
              </MyButton>

              {/* Heading Text */}
              <MyTypography variant="h5" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                Choose Your Institute Plan{' '}
                <MyBox component="span" sx={{ fontSize: '1rem', fontWeight: 'normal', ml: 1 }}>
                  Flexible Pricing That Fits Your Needs
                </MyBox>
              </MyTypography>

              {/* Right Arrow Button */}
              <MyButton
                variant="outlined"
                sx={{
                  minWidth: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  padding: 0
                }}
                onClick={() => router.push('/pricing-clg')}
              >
                <ArrowForward />
              </MyButton>
            </MyBox>
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.BASIC_MONTHLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                        online presence. This fully managed static web application includes all essential features for sharing information
                        and managing admission enquiries.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Basic', 'Monthly', 1)}>
                        Subscribe Now
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.PROFESSIONAL_MONTHLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin
                        Dashboard for efficiently managing Users, Roles, and Courses. Ideal for Institutes needing advanced functionality
                        and centralized, streamlined management.
                      </div>
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => goToCompanyModule('Institute', 'Professional', 'Monthly', 5000)}
                      >
                        Subscribe Now
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Premium</span>}
                      sx={{
                        textAlign: 'center',
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.PREMIUM_MONTHLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                        managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                        course content, and fee payment.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Premium', 'Monthly', 9999)}>
                        Subscribe Now
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.DEDICATED_MONTHLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Month</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Excludes VAT/GST & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                        Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                        Admin Reporting.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Dedicated', 'Monthly', 14000)}>
                        Subscribe Now
                      </MyButton>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyTabPanel>
            <MyTabPanel value={state.tabIndex} index={1}>
              <MyGrid container spacing={2} alignItems="stretch" style={{ marginBottom: -2 }}>
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.BASIC_YEARLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                        online presence. This fully managed static web application includes all essential features for sharing information
                        and managing admission enquiries.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Basic', 'Yearly', 32000)}>
                        Subscribe Now
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.PROFESSIONAL_YEARLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Interactive
                        Admin Dashboard for managing Users, Roles, and Courses. Ideal for Institutions needing advanced functionality and
                        seamless automation support.
                      </div>
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => goToCompanyModule('Institute', 'Professional', 'Yearly', 59000)}
                      >
                        Subscribe Now
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Premium</span>}
                      sx={{
                        textAlign: 'center',
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.PREMIUM_YEARLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                        managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                        course content, and fee payment.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Premium', 'Yearly', 95000)}>
                        Subscribe Now
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
                        height: '40px',
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
                        padding: '10px',
                        backgroundColor: '#f7fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>₹{Constants.DEDICATED_YEARLY}</div>
                      <div style={{ marginBottom: '4px', color: '#718096' }}>Per Year</div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Excludes VAT/GST & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                        Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                        Admin Reporting.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('Institute', 'Dedicated', 'Yearly', 120000)}>
                        Subscribe Now
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
                <TableContainer component={Paper} sx={{ mt: -2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="pricing comparison table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        {['Features', 'Basic', 'Professional', 'Premium', 'Dedicated'].map((text, index) => (
                          <TableCell
                            key={text}
                            align={index === 0 ? 'left' : 'center'}
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              border: '1px solid #e0e0e0',
                              padding: '10px 14px',
                              lineHeight: 1.2
                            }}
                          >
                            {text}
                          </TableCell>
                        ))}
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

export default memo(ClientPricingTech, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
