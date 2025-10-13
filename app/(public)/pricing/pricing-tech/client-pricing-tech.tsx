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
import usePricingTech from './usePricingTech';
import * as Constants from '../../constants/constants';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ClientPricingTech = () => {
  const { state, handleTabChange, toggleRowExpansion, goToCompanyModule } = usePricingTech();
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
              pl: 3 + level * 2,
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
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-sch`)}
            >
              <ArrowBack />
            </MyButton>
            <MyTypography variant="h6" component="h4" align="center" gutterBottom sx={{ fontSize: '1rem', mb: 0 }}>
              Choose the right plan for your{' '}
              <strong>
                <span style={{ fontSize: '1.1rem' }}>Institute</span>
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
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-clg`)}
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
                title: 'Startup',
                price: Constants.INSTITUTE_PRICING.STARTUP_MONTHLY,
                description: `A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
                                  online presence. This fully managed static web application includes all essential features for sharing information
                                  and managing admission enquiries.`,
                extra: 'Billed Monthly, Excludes VAT / GST',
                amount: 1
              },
              {
                title: 'Premium',
                price: Constants.INSTITUTE_PRICING.PREMIUM_MONTHLY,
                description: `A dynamic web application with Online Admission, Course Enrollment, Integrated Payment Gateway, and an Admin
                                  Dashboard for efficiently managing Users, Roles, and Courses. Ideal for Institutes needing advanced functionality
                                  and centralized, streamlined management.`,
                extra: 'Billed Monthly, Excludes VAT / GST',
                amount: 5000
              },
              {
                title: 'Enterprise',
                price: Constants.INSTITUTE_PRICING.ENTERPRISE_MONTHLY,
                description: `A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
                                  managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
                                  course content, and fee payment.`,
                extra: 'Billed Monthly, Excludes VAT / GST',
                amount: 9999
              },
              {
                title: 'Dedicated',
                price: Constants.INSTITUTE_PRICING.DEDICATED_MONTHLY,
                description: `Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
                                  Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
                                  Admin Reporting.`,
                extra: 'Excludes VAT/GST & Application Support',
                amount: 14000
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
                      flexGrow: 1 // fills space to align buttons at bottom
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
                        onClick={() => goToCompanyModule('Institute', plan.title, 'Monthly', plan.amount)}
                      >
                        Subscribe Now
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
                price: Constants.INSTITUTE_PRICING.STARTUP_YEARLY,
                description: ` A perfect starting point for institutes to establish a professional online presence. This fully managed website includes all essential features to showcase institute information, highlight courses and achievements, and efficiently manage admission enquiries.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Premium',
                price: Constants.INSTITUTE_PRICING.PREMIUM_YEARLY,
                description: `A dynamic web application with Online Admission, Fee Payment Integration, and an intuitive Admin Dashboard
                     for efficiently managing Students, Trainers, Batches, and Courses. Ideal for institutes seeking advanced functionality 
                     and streamlined administration.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Enterprise',
                price: Constants.INSTITUTE_PRICING.ENTERPRISE_YEARLY,
                description: ` An advanced web application featuring Online Admission, Course Enrollment, Integrated Payments, and a
                     powerful Admin Panel for managing Students, Trainers, Roles, and Courses. Includes a dedicated Student Dashboard with
                      Online Tests, Study Materials, Assignments, Projects, and Fee Payments — perfect for institutes looking for a complete
                       digital learning and management solution.`,
                extra: 'Billed Monthly, Excludes VAT / GST'
              },
              {
                title: 'Dedicated',
                price: Constants.INSTITUTE_PRICING.DEDICATED_YEARLY,
                description: `An enterprise-grade, fully managed solution with dedicated resources, unmatched scalability, and maximum
                     flexibility. Includes all features from the Enterprise Plan, plus a Trainer Dashboard with attendance tracking, batch
                     scheduling, and centralized performance reporting — ideal for large institutes and multi-branch training organizations.`,
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
                      <MyButton
                        variant="contained"
                        fullWidth
                        onClick={() => goToCompanyModule('Institute', plan.title, 'Yearly', plan.price)}
                      >
                        Subscribe Now
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
                      {['Features', 'Startup', 'Premium', 'Enterprise', 'Dedicated'].map((text, index) => (
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

export default memo(ClientPricingTech, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
