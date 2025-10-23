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
import Footer from '@/app/custom-components/my-footer/MyFooter';

const ClientPricingSch = () => {
  const { state, goToCompanyModule, handleTabChange, toggleRowExpansion } = usePricingSch();
  const rows = [
    {
      name: 'Admin Dashboard',
      free: '✔',
      startup: '✖',
      premium: '✔',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'User Access Management',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Roles',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Users',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Role Permission',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'User Permission',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Academics',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Courses',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Online Admission',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Admission',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Enrollments',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Admission Summary',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Study Kits',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Code Projects',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Study Notes',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Upload Videos',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'Online Exams',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Add Exam',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Questions',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Bulk Import',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Exam Results',
                  free: '✔',
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
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Employee Master',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Review Attendance',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Attendance Report',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Time Log Report',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Day Wise Attendance',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Presence Overview',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
            {
              name: 'User Devices',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Bulk Attendance',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔',
              children: [
                {
                  name: 'Mark Attendance',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                },
                {
                  name: 'Lock Attendance',
                  free: '✔',
                  startup: '✖',
                  premium: '✔',
                  enterprise: '✔',
                  dedicated: '✔'
                }
              ]
            },
             {
              name: 'Student Attendance',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Payment Management',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Schedule Fee',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Collect Pay',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Receipts',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Fee Head',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Communications',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Emails',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Email Templates',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notifications',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Engagements',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enquiry',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Events',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Meetings',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Geography',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Countries',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'States',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Locations',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
             {
              name: 'Districts',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Affiliates',
          free: '✔',
          startup: '✖',
          premium: '✔',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Review Affiliates',
              free: '✔',
              startup: '✖',
              premium: '✔',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Referrals',
              free: '✔',
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
      free: '✔',
      startup: '✖',
      premium: '✖',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Course Contents',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Enrolled Courses',
              free: '✔',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Free Courses',
              free: '✔',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Study Kits',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔',
          children: [
            {
              name: 'Code Insight',
              free: '✔',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Notes Insight',
              free: '✔',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            },
            {
              name: 'Video Insight',
              free: '✔',
              startup: '✖',
              premium: '✖',
              enterprise: '✔',
              dedicated: '✔'
            }
          ]
        },
        {
          name: 'Online Exams / Skill Tests',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Payments / Fees',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Student Info',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Online Homework',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        }
      ]
    },

    {
      name: 'Employee Dashboard',
      free: '✔',
      startup: '✖',
      premium: '✖',
      enterprise: '✖',
      dedicated: '✔',
      children: [
        {
          name: 'Location Based Online Attendance',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Login',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'View Profile',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        },
        {
          name: 'Change Password',
          free: '✔',
          startup: '✖',
          premium: '✖',
          enterprise: '✖',
          dedicated: '✔'
        }
      ]
    },
    {
      name: 'Dynamic Web Application',
      free: '✔',
      startup: '✔',
      premium: '✖',
      enterprise: '✔',
      dedicated: '✔',
      children: [
        {
          name: 'Home Page',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'About Us',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Programs Enrollment',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Services / Offerings',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Affiliate Registration',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Contact Us',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Admission Enquiry',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Login',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Registration',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Forget Password',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Social Media Links',
          free: '✔',
          startup: '✔',
          premium: '✖',
          enterprise: '✔',
          dedicated: '✔'
        },
        {
          name: 'Image Gallery',
          free: '✔',
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
    free: string;
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
            {row.free}
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
      <MyCardContent>
        <MyBox
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
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
              Choose the right plan for your{' '}
              <strong>
                <span style={{ fontSize: '1.1rem' }}>School</span>
              </strong>
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
          <MyBox
            sx={{
              margin: { xs: '0', sm: '0 auto' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <MyTabs value={state.tabIndex} onChange={handleTabChange} sx={{ marginBottom: 0, paddingBottom: 0 }}>
              <MyTab label="Monthly Billing" />
              <MyTab label="Annual Billing" />
            </MyTabs>
          </MyBox>
        </MyBox>
        <MyTabPanel value={state.tabIndex} index={0}>
          <MyGrid container spacing={2} alignItems="stretch">
            {[
              {
                title: 'Free Trial',
                price: 0,
                description: `The Free Plan lets schools build a professional online presence free for 5 weeks. 
              Get a fully managed website with essential features to highlight academics, activities, and achievements 
              before moving to a paid plan for more advanced tools.`,
                extra: 'Free for 5 weeks — no billing required'
              },
              {
                title: 'Startup',
                price: Constants.SCHOOL_PRICING.STARTUP_MONTHLY,
                description: `A perfect starting point for schools to build a strong online presence. This fully managed website includes all essential features to share school information, highlight achievements, and efficiently manage admission enquiries.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Premium',
                price: Constants.SCHOOL_PRICING.PREMIUM_MONTHLY,
                description: `A dynamic web application with Online Admission, Fee Payment Integration, and an intuitive Admin Dashboard
                     for efficiently managing Students, Staff, Classes, and Courses. Ideal for schools looking for advanced functionality and
                     streamlined administration.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Enterprise',
                price: Constants.SCHOOL_PRICING.ENTERPRISE_MONTHLY,
                description: `A complete web platform for Online Admission, Course Enrollment, Integrated Payments, and an Admin Panel to manage Students, Staff, Roles, and Courses. It features
                 a Student Dashboard for Online Exams, Notes, Projects, Homework, Materials, and Fee Payments.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Dedicated',
                price: Constants.SCHOOL_PRICING.DEDICATED_MONTHLY,
                description: `An enterprise-grade, fully managed solution offering dedicated resources, scalability, and flexibility. Includes all Enterprise Plan features plus an Employee records
                and centralized reporting — ideal for large schools and education groups.`,
                extra: 'Excludes VAT/GST & Application Support'
              }
            ].map((plan) => (
              <MyGrid key={plan.title} size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
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
                    title={<span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a202c' }}>{plan.title}</span>}
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
                      border: '1px solid #e2e8f0',
                      flexGrow: 1
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
                      ₹{plan.price} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>{plan.extra}</div>
                    <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>{plan.description}</div>
                    <MyBox sx={{ mt: 'auto', width: '100%' }}>
                      <MyButton
                        variant="contained"
                        fullWidth
                        // onClick={() => goToCompanyModule('College', plan.title, 'Monthly', plan.price)}
                         onClick={() => {
                          const finalPrice = plan.title === 'Free Trial' ? 1 : plan.price;
                          goToCompanyModule('School', plan.title, 'Monthly', finalPrice);
                        }}
                      >
                        {plan.title === 'Free Trial' ? 'Start Free' : 'Buy Now'}
                      </MyButton>
                    </MyBox>
                  </MyCardContent>
                </MyCard>
              </MyGrid>
            ))}
          </MyGrid>
        </MyTabPanel>
        <MyTabPanel value={state.tabIndex} index={1}>
          <MyGrid container spacing={2} alignItems="stretch">
            {[
              {
                title: 'Startup',
                price: Constants.SCHOOL_PRICING.STARTUP_YEARLY,
                description: `A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                        online presence. This fully managed static web application includes all essential features for sharing information
                        and managing admission enquiries.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Premium',
                price: Constants.SCHOOL_PRICING.PREMIUM_YEARLY,
                description: `A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin
                        Dashboard for effectively managing Users, Roles, and Courses. Ideal for Schools needing advanced functionality and
                        streamlined management.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Enterprise',
                price: Constants.SCHOOL_PRICING.ENTERPRISE_YEARLY,
                description: `A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                        managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                        course content, and fee payment.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Dedicated',
                price: Constants.SCHOOL_PRICING.DEDICATED_YEARLY,
                description: `Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                        Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                        Admin Reporting.`,
                extra: 'Excludes VAT/GST & Application Support'
              }
            ].map((plan) => (
              <MyGrid key={plan.title} size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
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
                    title={<span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a202c' }}>{plan.title}</span>}
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
                      border: '1px solid #e2e8f0',
                      flexGrow: 1
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
                      ₹{plan.price} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>{plan.extra}</div>
                    <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>{plan.description}</div>
                    <MyBox sx={{ mt: 'auto', width: '100%' }}>
                      <MyButton variant="contained" fullWidth onClick={() => goToCompanyModule('School', plan.title, 'Yearly', plan.price)}>
                        Buy Now
                      </MyButton>
                    </MyBox>
                  </MyCardContent>
                </MyCard>
              </MyGrid>
            ))}
          </MyGrid>
        </MyTabPanel>
      </MyCardContent>

      <MyBox>
        <MyCardContent>
          <MyGrid container spacing={2} alignItems="stretch">
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <TableContainer component={Paper} sx={{ mt: -2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="pricing comparison table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e2e8f0' }}>
                      {['Features', 'free', 'Startup', 'Premium', 'Enterprise', 'Dedicated'].map((text, index) => (
                        <TableCell
                          key={text}
                          align={index === 0 ? 'left' : 'center'}
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
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
      </MyBox>
      <Footer />
    </div>
  );
};

export default memo(ClientPricingSch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
