'use client';
import React, { memo, useState } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import { CardHeader } from '@mui/material';
import MyTypography from '@/app/custom-components/MyTypography';
import { COMPANY } from '.././constants/constants';
import './services.css';
import { Box, Typography, IconButton } from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

const ClientOurService = () => {
  const rows = [
    {
      name: 'School Management System',
      children: [
        {
          name: 'Dynamic Web Application',
          children: [
            {
              name: '• Home Page'
            },
            {
              name: '• Online Admission',
              children: [
                {
                  name: '• Document Upload & Verification'
                },
                {
                  name: '• Online Payment Collection'
                },
                {
                  name: '• Payment Gateway'
                },
                {
                  name: '• Receipt and Acknowledgement'
                },
                {
                  name: '• Account Creation'
                },
                {
                  name: '• Login Credentials Delivery'
                }
              ]
            },
            {
              name: '• Programs Dashboard',
              children: [
                {
                  name: '• Course Catalog'
                },
                {
                  name: '• Online Enrollment'
                },
                {
                  name: '• Payment Gateway'
                },
                {
                  name: '• Receipt and Acknowledgement'
                },
                {
                  name: '• Account Creation'
                },
                {
                  name: '• Login Credentials Delivery'
                }
              ]
            },
            {
              name: '• Affiliates',
              children: [
                {
                  name: '• Affiliate Registration'
                },
                {
                  name: '• Affiliate Login Panel'
                },
                {
                  name: '• Referral Tracking'
                },
                {
                  name: '• Commission Summary'
                }
              ]
            },
            {
              name: '• About Us'
            },
            {
              name: '• Contact Us'
            },
            {
              name: '• Login'
            },
            {
              name: '• Online Registration'
            },
            {
              name: '• Forgot Password'
            }
          ]
        },
        {
          name: 'Admin Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Courses / Classes Management'
            },
            {
              name: '• Applicant Verification'
            },
            {
              name: '• Roles Management'
            },
            {
              name: '• Users Management'
            },
            {
              name: '• Online Study Kit',
              children: [
                {
                  name: '• Practice Project'
                },
                {
                  name: '• Study Notes'
                },
                {
                  name: '• Video Uploads'
                }
              ]
            },
            {
              name: '• Online Exams Management',
              children: [
                {
                  name: '• Instant Exam Builder'
                },
                {
                  name: '• Bulk Exam Uploader'
                }
              ]
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Student Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Online Exams / Skill Tests'
            },
            {
              name: '• Online Fee Payment'
            },
            {
              name: '• Online Homework'
            },
            {
              name: '• Courses Content',
              children: [
                {
                  name: '• Paid Courses / Programs'
                },
                {
                  name: '• Free Courses / Programs'
                }
              ]
            },
            {
              name: '• Study Kit',
              children: [
                {
                  name: '• Code Insights'
                },
                {
                  name: '• Notes Insights'
                },
                {
                  name: '• Online Videos'
                }
              ]
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Employee Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Location Based Online Attendance'
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Location Based Attendance'
        }
      ]
    },
    {
      name: 'College Management System',
      children: [
        {
          name: 'Dynamic Web Application',
          children: [
            {
              name: '• Home Page'
            },
            {
              name: '• Online Admission',
              children: [
                {
                  name: '• Document Upload & Verification'
                },
                {
                  name: '• Online Payment Collection'
                },
                {
                  name: '• Payment Gateway'
                },
                {
                  name: '• Receipt and Acknowledgement'
                },
                {
                  name: '• Account Creation'
                },
                {
                  name: '• Login Credentials Delivery'
                }
              ]
            },
            {
              name: '• Programs Dashboard',
              children: [
                {
                  name: '• Course Catalog'
                },
                {
                  name: '• Online Enrollment'
                },
                {
                  name: '• Payment Gateway'
                },
                {
                  name: '• Receipt and Acknowledgement'
                },
                {
                  name: '• Account Creation'
                },
                {
                  name: '• Login Credentials Delivery'
                }
              ]
            },
            {
              name: '• Affiliates',
              children: [
                {
                  name: '• Affiliate Registration'
                },
                {
                  name: '• Affiliate Login Panel'
                },
                {
                  name: '• Referral Tracking'
                },
                {
                  name: '• Commission Summary'
                }
              ]
            },
            {
              name: '• About Us'
            },
            {
              name: '• Contact Us'
            },
            {
              name: '• Login'
            },
            {
              name: '• Online Registration'
            },
            {
              name: '• Forgot Password'
            }
          ]
        },
        {
          name: 'Admin Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Courses / Classes Management'
            },
            {
              name: '• Applicant Verification'
            },
            {
              name: '• Roles Management'
            },
            {
              name: '• Users Management'
            },
            {
              name: '• Online Study Kit',
              children: [
                {
                  name: '• Practice Project'
                },
                {
                  name: '• Study Notes'
                },
                {
                  name: '• Video Uploads'
                }
              ]
            },
            {
              name: '• Online Exams Management',
              children: [
                {
                  name: '• Instant Exam Builder'
                },
                {
                  name: '• Bulk Exam Uploader'
                }
              ]
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Student Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Online Exams / Skill Tests'
            },
            {
              name: '• Online Fee Payment'
            },
            {
              name: '• Online Homework'
            },
            {
              name: '• Courses Content',
              children: [
                {
                  name: '• Paid Courses / Programs'
                },
                {
                  name: '• Free Courses / Programs'
                }
              ]
            },
            {
              name: '• Study Kit',
              children: [
                {
                  name: '• Code Insights'
                },
                {
                  name: '• Notes Insights'
                },
                {
                  name: '• Online Videos'
                }
              ]
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Employee Dashboard',
          children: [
            {
              name: '• Login'
            },
            {
              name: '• Location Based Online Attendance'
            },
            {
              name: '• View Profile'
            },
            {
              name: '• Change Password'
            }
          ]
        },
        {
          name: 'Location Based Attendance'
        }
      ]
    },
    {
      name: 'University ERP'
    },
    {
      name: 'Location Based Attendance'
    },
    {
      name: 'Public Site',
      children: [
        {
          name: '• Home Page'
        },
        {
          name: '• About Us'
        },
        {
          name: '• Services / Offerings'
        },
        {
          name: '• Contact Us'
        },
        {
          name: '• Admission Enquiry'
        },
        {
          name: '• Header & Navigation'
        },
        {
          name: '• Footer'
        },
        {
          name: '• Responsive Design'
        },
        {
          name: '• SEO Tags'
        },
        {
          name: '• Social Media Links'
        },
        {
          name: '• Image Gallery'
        }
      ]
    },
    {
      name: 'Inventory Management'
    },
    {
      name: 'CRM (Costumer Relationship Management'
    },
    {
      name: 'Online Billing Management System'
    }
  ];

  const CollapsibleItem = ({ item, level = 0, index = 1 }: any) => {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <Box sx={{ pl: level * 1, py: 1, borderBottom: '1px solid #eee' }}>
        <Box display="flex" alignItems="center">
          {hasChildren && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          )}
          {!hasChildren && <Box sx={{ width: 32 }} />} {/* spacer for alignment */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
            {level === 0 && (
              <Box component="span" sx={{ color: '#007BFF', fontWeight: 'bold', pr: 1 }}>
                {index.toString().padStart(2, '0')}.
              </Box>
            )}
            {item.name}
          </Typography>
        </Box>

        {open && item.children?.map((child: any, i: number) => <CollapsibleItem key={i} item={child} level={level + 1} index={i + 1} />)}
      </Box>
    );
  };
  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}></MyBox>
            <MyBox sx={{ marginTop: '10px', position: 'relative', zIndex: 2, width: '80%', marginLeft: '10%' }}>
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
                      title={
                        <>
                          <img
                            src="/web.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Web Development</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We craft fast, responsive, and scalable websites tailored to your business goals. Our team specializes in modern tech
                      like React, Next.js, Node.js, and more to ensure a seamless user experience and strong backend performance.
                    </div>
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
                      title={
                        <>
                          <img
                            src="/mobile2.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>Mobile App Development</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We build high-performance mobile apps for iOS and Android using cutting-edge technologies. Whether its a startup idea
                      or an enterprise solution, we deliver smooth, scalable, and user-friendly mobile experiences.
                    </div>
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
                      title={
                        <>
                          <img
                            src="/ui.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>UI/UX Design</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      We design beautiful, intuitive interfaces that enhance user engagement and drive results. Our UX process is focused on
                      understanding your users to deliver seamless digital experiences.
                    </div>
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
                      title={
                        <>
                          <img
                            src="/seo3.png" // replace with your icon path
                            alt="Mobile App"
                            style={{
                              width: '64px',
                              display: 'flex',
                              height: '64px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        </>
                      }
                    />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>SEO Optimization</span>
                    <div style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px', color: '#4a5568', marginBottom: '24px' }}>
                      Boost your website’s visibility and attract more organic traffic with our expert SEO strategies. From keyword research
                      to on-page and technical SEO, we help you rank higher and convert better.
                    </div>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyBox>
          </MyCardContent>
          <MyBox sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <MyBox sx={{ borderLeft: '4px solid #007ac1', pl: 2, mt: 1 }}>
              <MyTypography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.5, mb: 2 }}>
                Create a more adaptive organization with our expertise, ecosystem, and solutions.
              </MyTypography>
            </MyBox>
            {rows.map((row, i) => (
              <CollapsibleItem key={i} item={row} index={i + 1} />
            ))}
          </MyBox>
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
export default memo(ClientOurService, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
