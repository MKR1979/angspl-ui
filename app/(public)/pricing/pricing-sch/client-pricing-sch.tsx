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
import './pricingSch.css';
import usePricingSch from './usePricingSch';
import * as Constants from '../../constants/constants';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ClientPricingSch = () => {
  const { state, goToCompanyModule, handleTabChange, toggleRowExpansion } = usePricingSch();
  const rows = [
    {
      name: 'Admin Dashboard',
      startup: '✖',
      premium: '✔',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'User Access Management',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Roles',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Users',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Role Permission',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'User Permission',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Academics',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Courses',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Online Admission',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Admission',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Enrollments',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Admission Summary',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Study Kits',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Code Projects',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Study Notes',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Upload Videos',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Online Exams',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Add Exam',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Questions',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Bulk Import',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Results',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            }
          ]
        },

        {
          name: 'Employee Services',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Employee Master',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Review Attendance',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Attendance Report',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Time Log Report',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Day Wise Attendance',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Presence Overview',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'User Devices',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Bulk Attendance',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Mark Attendance',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Lock Attendance',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            }
          ]
        },
        {
          name: 'Payment Management',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Schedule Fee',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Collect Pay',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Receipts',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Fee Head',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Communications',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Emails',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Email Templates',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notifications',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Engagements',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enquiry',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Events',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Meetings',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Geography',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Countries',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'States',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Locations',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Affiliates',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Review Affiliates',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Referrals',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        }
      ]
    },
    {
      name: 'Student Dashboard',
      startup: '✖',
      premium: '✖',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Course Contents',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enrolled Courses',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Free Courses',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Study Kits',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Code Insight',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notes Insight',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Video Insight',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Online Exams / Skill Tests',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Payments / Fees',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Student Info',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Online Homework',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        }
      ]
    },

    {
      name: 'Employee Dashboard',
      startup: '✖',
      premium: '✖',
      enterprise: '✖',
      dedicated: '✔',
      children: [
        {
          name: 'Location Based Online Attendance',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Login',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        }
      ]
    },
    {
      name: 'Affiliate Dashboard',
      startup: '✖',
      premium: '✖',
      enterprise: '✖',
      dedicated: '✔',
      children: [
        {
          name: 'Referral Trekking',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Login',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        }
      ]
    },
    {
      name: 'Location Based Attendance',
      startup: '✖',
      premium: '✖',
      enterprise: '✖',
      dedicated: '✔'
    },
    {
      name: 'Dynamic Web Application',
      startup: '✔',
      premium: '✖',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Home Page',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'About Us',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Programs Enrollment',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Services / Offerings',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Affiliate Registration',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Contact Us',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Admission Enquiry',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Registration',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Forget Password',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Social Media Links',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Image Gallery',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        }
      ]
    }
  ];

  // const formatUrl = (url: any) => (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);

  interface RowData {
    name: string;
    startup: string;
    premium: string;
    enterprise: string;
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
              pl: 3 + level * 2, // Indentation
              cursor: hasChildren ? 'pointer' : 'default',
              border: '1px solid #e0e0e0'
            }}
          >
            {hasChildren && <span style={{ marginRight: '8px' }}>{isExpanded ? '▼' : '▶'}</span>}
            {row.name}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.startup}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.premium}
          </TableCell>
          <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
            {row.enterprise}
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
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                mb: 2
              }}
            >
              <MyBox
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  position: 'absolute',
                  left: 0
                }}
              >
                <MyButton
                  variant="outlined"
                  sx={{
                    minWidth: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    fontSize: '1rem',
                    padding: 0
                  }}
                  onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-clg`)}
                >
                  <ArrowBack />
                </MyButton>
                <MyTypography variant="h6" component="h4" align="center" gutterBottom sx={{ fontSize: '1rem', mb: 0 }}>
                  Choose the Right Plan for Your School
                </MyTypography>
                <MyButton
                  variant="outlined"
                  sx={{
                    minWidth: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    fontSize: '1rem',
                    padding: 0
                  }}
                  onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-tech`)}
                >
                  <ArrowForward />
                </MyButton>
              </MyBox>
              <MyBox sx={{ margin: '0 auto', display: 'flex', alignItems: 'center' }}>
                <MyTabs value={state.tabIndex} onChange={handleTabChange} sx={{ marginBottom: 0, paddingBottom: 0 }}>
                  <MyTab label="Monthly Billing" />
                  <MyTab label="Annual Billing" />
                </MyTabs>
              </MyBox>
            </MyBox>
            <MyTabPanel value={state.tabIndex} index={0}>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={1}
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Startup</span>}
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.STARTUP_MONTHLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                        online presence. This fully managed static web application includes all essential features for sharing information
                        and managing admission enquiries.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Startup', 'Monthly', 3000)}>
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.PREMIUM_MONTHLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin
                        Dashboard for effectively managing Users, Roles, and Courses. Ideal for Schools needing advanced functionality and
                        streamlined management.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Premium', 'Monthly', 5000)}>
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Enterprise</span>}
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.ENTERPRISE_MONTHLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Monthly, Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                        managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                        course content, and fee payment.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Enterprise', 'Monthly', 9999)}>
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.DEDICATED_MONTHLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Excludes VAT/GST & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                        Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                        Admin Reporting.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Dedicated', 'Monthly', 14000)}>
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Startup</span>}
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.STARTUP_YEARLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                        online presence. This fully managed static web application includes all essential features for sharing information
                        and managing admission enquiries.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Startup', 'Yearly', 32000)}>
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.PREMIUM_YEARLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Interactive
                        Admin Dashboard for managing Users, Roles, and Courses. Ideal for Institutions needing advanced functionality and
                        seamless automation support.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Premium', 'Yearly', 59000)}>
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
                      title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>Enterprise</span>}
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.ENTERPRISE_YEARLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Billed Annually Excludes VAT / GST</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                        managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                        course content, and fee payment.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Enterprise', 'Yearly', 95000)}>
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
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>
                        ₹{Constants.DEDICATED_YEARLY} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>Excludes VAT/GST & Application Support</div>
                      <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>
                        Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                        Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                        Admin Reporting.
                      </div>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', 'Dedicated', 'Yearly', 120000)}>
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
                        {['Features', 'Startup', 'Premium', 'Enterprise', 'Dedicated'].map((text, index) => (
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
          <p>© Copyright 2025 {Constants.COMPANY}, All rights reserved.</p>
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

export default memo(ClientPricingSch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
