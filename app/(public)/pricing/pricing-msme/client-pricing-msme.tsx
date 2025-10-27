// 'use client';
// import React, { memo } from 'react';
// import eq from 'lodash/eq';
// import MyTypography from '@/app/custom-components/MyTypography';
// import MyGrid from '@/app/custom-components/MyGrid';
// import MyButton from '@/app/custom-components/MyButton';
// import MyBox from '@/app/custom-components/MyBox';
// import MyCard from '@/app/custom-components/MyCard';
// import MyCardContent from '@/app/custom-components/MyCardContent';
// import { CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import MyTabPanel from '@/app/custom-components/MyTabPanel';
// import MyTabs from '@/app/custom-components/MyTabs';
// import MyTab from '@/app/custom-components/MyTab';
// import './pricingMsme.css';
// import usePricingMsme from './usePricingMsme';
// import * as Constants from '../../constants/constants';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import Footer from '@/app/custom-components/my-footer/MyFooter';
// import { useRouter } from 'next/navigation';

// const ClientPricingMsme = () => {
//   const { state, handleTabChange, toggleRowExpansion, goToCompanyModule } = usePricingMsme();
//   const rows = [
//     {
//       name: 'Admin Dashboard',
//       free: '✔',
//       startup: '✖',
//       premium: '✔',
//       enterprise: '✔',
//       dedicated: '✔',
//       children: [
//         {
//           name: 'User Access Management',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Roles',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Users',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Role Permission',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'User Permission',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Academics',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Courses',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Online Admission',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔',
//               children: [
//                 {
//                   name: 'Admission',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Enrollments',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Admission Summary',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 }
//               ]
//             },
//             {
//               name: 'Study Kits',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔',
//               children: [
//                 {
//                   name: 'Code Projects',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Study Notes',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Upload Videos',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 }
//               ]
//             },
//             {
//               name: 'Online Exams',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔',
//               children: [
//                 {
//                   name: 'Add Exam',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Exam Questions',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Exam Bulk Import',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Exam Results',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 }
//               ]
//             }
//           ]
//         },

//         {
//           name: 'Employee Services',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Employee Master',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Review Attendance',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Attendance Report',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔',
//               children: [
//                 {
//                   name: 'Time Log Report',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Day Wise Attendance',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Presence Overview',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 }
//               ]
//             },
//             {
//               name: 'User Devices',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Bulk Attendance',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔',
//               children: [
//                 {
//                   name: 'Mark Attendance',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 },
//                 {
//                   name: 'Lock Attendance',
//                   free: '✔',
//                   startup: '✖',
//                   premium: '✔',
//                   enterprise: '✔',
//                   dedicated: '✔'
//                 }
//               ]
//             },
//              {
//               name: 'Student Attendance',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Payment Management',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Schedule Fee',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Collect Pay',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Receipts',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Fee Head',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Communications',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Emails',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Email Templates',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Notifications',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Engagements',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Enquiry',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Events',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Meetings',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Geography',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Countries',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'States',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Locations',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//              {
//               name: 'Districts',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Affiliates',
//           free: '✔',
//           startup: '✖',
//           premium: '✔',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Review Affiliates',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Referrals',
//               free: '✔',
//               startup: '✖',
//               premium: '✔',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       name: 'Student Dashboard',
//       free: '✔',
//       startup: '✖',
//       premium: '✖',
//       enterprise: '✔',
//       dedicated: '✔',
//       children: [
//         {
//           name: 'Course Contents',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Enrolled Courses',
//               free: '✔',
//               startup: '✖',
//               premium: '✖',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Free Courses',
//               free: '✔',
//               startup: '✖',
//               premium: '✖',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Study Kits',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔',
//           children: [
//             {
//               name: 'Code Insight',
//               free: '✔',
//               startup: '✖',
//               premium: '✖',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Notes Insight',
//               free: '✔',
//               startup: '✖',
//               premium: '✖',
//               enterprise: '✔',
//               dedicated: '✔'
//             },
//             {
//               name: 'Video Insight',
//               free: '✔',
//               startup: '✖',
//               premium: '✖',
//               enterprise: '✔',
//               dedicated: '✔'
//             }
//           ]
//         },
//         {
//           name: 'Online Exams / Skill Tests',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Payments / Fees',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Student Info',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Online Homework',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Login',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'View Profile',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Change Password',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         }
//       ]
//     },

//     {
//       name: 'Employee Dashboard',
//       free: '✔',
//       startup: '✖',
//       premium: '✖',
//       enterprise: '✖',
//       dedicated: '✔',
//       children: [
//         {
//           name: 'Location Based Online Attendance',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'Login',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'View Profile',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'Change Password',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         }
//       ]
//     },
//     {
//       name: 'Affiliate Dashboard',
//       free: '✔',
//       startup: '✖',
//       premium: '✖',
//       enterprise: '✖',
//       dedicated: '✔',
//       children: [
//         {
//           name: 'Referral Trekking',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'Login',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'View Profile',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         },
//         {
//           name: 'Change Password',
//           free: '✔',
//           startup: '✖',
//           premium: '✖',
//           enterprise: '✖',
//           dedicated: '✔'
//         }
//       ]
//     },
//     {
//       name: 'Location Based Attendance',
//       free: '✔',
//       startup: '✖',
//       premium: '✖',
//       enterprise: '✖',
//       dedicated: '✔'
//     },
//     {
//       name: 'Dynamic Web Application',
//       free: '✔',
//       startup: '✔',
//       premium: '✖',
//       enterprise: '✔',
//       dedicated: '✔',
//       children: [
//         {
//           name: 'Home Page',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'About Us',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Programs Enrollment',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Services / Offerings',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Affiliate Registration',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Contact Us',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Admission Enquiry',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Login',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Registration',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Forget Password',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Social Media Links',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         },
//         {
//           name: 'Image Gallery',
//           free: '✔',
//           startup: '✔',
//           premium: '✖',
//           enterprise: '✔',
//           dedicated: '✔'
//         }
//       ]
//     }
//   ];

//   interface RowData {
//     name: string;
//     free: string;
//     startup: string;
//     premium: string;
//     enterprise: string;
//     dedicated: string;
//     children?: RowData[];
//   }

//   const router = useRouter();

//   const renderRow = (row: RowData, level: number = 0): React.ReactNode => {
//     const isExpanded = !!state.expandedRows[row.name];
//     const hasChildren = Array.isArray(row.children) && row.children.length > 0;

//     return (
//       <React.Fragment key={row.name}>
//         <TableRow>
//           <TableCell
//             onClick={() => hasChildren && toggleRowExpansion(row.name)}
//             sx={{
//               pl: 3 + level * 2,
//               cursor: hasChildren ? 'pointer' : 'default',
//               border: '1px solid #e0e0e0'
//             }}
//           >
//             {hasChildren && <span style={{ marginRight: '8px' }}>{isExpanded ? '▼' : '▶'}</span>}
//             {row.name}
//           </TableCell>
//            <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
//             {row.free}
//           </TableCell>
//           <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
//             {row.startup}
//           </TableCell>
//           <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
//             {row.premium}
//           </TableCell>
//           <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
//             {row.enterprise}
//           </TableCell>
//           <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
//             {row.dedicated}
//           </TableCell>
//         </TableRow>

//         {isExpanded && hasChildren && row.children!.map((child) => renderRow(child, level + 1))}
//       </React.Fragment>
//     );
//   };
//   return (
//     <div style={{ width: '100%', paddingTop: '0px' }}>
//       <MyCardContent>
//         <MyBox
//           sx={{
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             position: 'relative',
//             mb: 2,
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: { xs: 2, sm: 0 }
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
//             <MyTypography variant="h6" component="h4" align="center" gutterBottom sx={{ fontSize: '1rem', mb: 0 }}>
//               Choose the right plan for your{' '}
//               <strong>
//                 <span style={{ fontSize: '1.1rem' }}>MSME</span>
//               </strong>
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
//               onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-sch`)}
//             >
//               <ArrowForward />
//             </MyButton>
//           </MyBox>
//           <MyBox
//             sx={{
//               margin: { xs: '0', sm: '0 auto' },
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: { xs: '100%', sm: 'auto' }
//             }}
//           >
//             <MyTabs value={state.tabIndex} onChange={handleTabChange} sx={{ marginBottom: 0, paddingBottom: 0 }}>
//               <MyTab label="Monthly Billing" />
//               <MyTab label="Annual Billing" />
//             </MyTabs>
//           </MyBox>
//         </MyBox>
//         <MyTabPanel value={state.tabIndex} index={0}>
//           <MyGrid container spacing={2} alignItems="stretch">
//             {[
//               {
//                 title: 'Free',
//                 price: 0,
//                 description: `The Free Plan lets institutes build a professional online presence free for 5 weeks. 
//               Experience a fully managed website with essential features to showcase courses, training programs, 
//               achievements, and admission details before upgrading to a paid plan.`,
//                 extra: 'Free for 5 weeks — no billing required'
//               },
//               {
//                 title: 'Startup',
//                 price: Constants.INSTITUTE_PRICING.STARTUP_MONTHLY,
//                 description: `A perfect starting point for Schools, Colleges, Universities, and Training Centers to establish a professional
//                                   online presence. This fully managed static web application includes all essential features for sharing information
//                                   and managing admission enquiries.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Premium',
//                 price: Constants.INSTITUTE_PRICING.PREMIUM_MONTHLY,
//                 description: `A dynamic web application with Online Admission, Course Enrollment, Payment Gateway, and an Admin Dashboard to manage Users,
//                  Roles, and Courses efficiently — ideal for institutes seeking advanced features and centralized management.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Enterprise',
//                 price: Constants.INSTITUTE_PRICING.ENTERPRISE_MONTHLY,
//                 description: `A dynamic web application with online admission, course enrollment, payments, and a powerful admin panel for
//                                   managing users, roles, and courses. Includes a student dashboard with online exams, notes, projects, homework,
//                                   course content, and fee payment.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Dedicated',
//                 price: Constants.INSTITUTE_PRICING.DEDICATED_MONTHLY,
//                 description: `Enterprise-grade, fully managed hosting with Dedicated Resources, Unmatched Scalability, and Maximum Flexibility.
//                                   Includes all features from Premium plans, plus an Employee Dashboard with location-based Attendance and centralized
//                                   Admin Reporting.`,
//                 extra: 'Excludes VAT/GST & Application Support'
//               }
//             ].map((plan) => (
//               <MyGrid key={plan.title} size={{ xs: 12, sm: 12, md: 2.4 }} style={{ display: 'flex' }}>
//                 <MyCard
//                   elevation={3}
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     width: '100%',
//                     borderRadius: '16px',
//                     overflow: 'hidden',
//                     transition: 'transform 0.3s ease',
//                     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 >
//                   <CardHeader
//                     title={<span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a202c' }}>{plan.title}</span>}
//                     sx={{
//                       textAlign: 'center',
//                       height: '40px',
//                       backgroundColor: '#e2e8f0',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   />
//                   <MyCardContent
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       padding: '10px',
//                       backgroundColor: '#f7fafc',
//                       border: '1px solid #e2e8f0',
//                       flexGrow: 1 // fills space to align buttons at bottom
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
//                       ₹{plan.price} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Month</span>
//                     </div>
//                     <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>{plan.extra}</div>
//                     <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>{plan.description}</div>
//                     <MyBox sx={{ mt: 'auto', width: '100%' }}>
//                       <MyButton
//                         variant="contained"
//                         fullWidth
//                         // onClick={() => goToCompanyModule('College', plan.title, 'Monthly', plan.price)}
//                         onClick={() => {
//                           const finalPrice = plan.title === 'Free' ? 5 : plan.price;
//                           goToCompanyModule('Institute', plan.title, 'Monthly', finalPrice);
//                         }}
//                       >
//                         {plan.title === 'Free' ? 'Start Free' : 'Buy Now'}
//                       </MyButton>
//                     </MyBox>
//                   </MyCardContent>
//                 </MyCard>
//               </MyGrid>
//             ))}
//           </MyGrid>
//         </MyTabPanel>
//         <MyTabPanel value={state.tabIndex} index={1}>
//           <MyGrid container spacing={2} alignItems="stretch">
//             {[
//               {
//                 title: 'Startup',
//                 price: Constants.INSTITUTE_PRICING.STARTUP_YEARLY,
//                 description: ` A perfect starting point for institutes to establish a professional online presence. This fully managed website includes all essential features to showcase institute information, highlight courses and achievements, and efficiently manage admission enquiries.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Premium',
//                 price: Constants.INSTITUTE_PRICING.PREMIUM_YEARLY,
//                 description: `A dynamic web application with Online Admission, Fee Payment Integration, and an intuitive Admin Dashboard
//                      for efficiently managing Students, Trainers, Batches, and Courses. Ideal for institutes seeking advanced functionality 
//                      and streamlined administration.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Enterprise',
//                 price: Constants.INSTITUTE_PRICING.ENTERPRISE_YEARLY,
//                 description: ` An advanced web application with Online Admission, Course Enrollment, Integrated Payments, and an Admin Panel to manage Students, Trainers, Roles, and Courses.
//                  Includes a Student Dashboard for Online Tests, Study Materials, Assignments, Projects, and Fee Payments.`,
//                 extra: 'Billed Monthly, Excludes VAT / GST'
//               },
//               {
//                 title: 'Dedicated',
//                 price: Constants.INSTITUTE_PRICING.DEDICATED_YEARLY,
//                 description: `An enterprise-grade, fully managed solution with dedicated resources, unmatched scalability, and maximum
//                      flexibility. Includes all features from the Enterprise Plan, plus a Trainer Dashboard with attendance tracking, batch
//                      scheduling, and centralized performance reporting — ideal for large institutes and multi-branch training organizations.`,
//                 extra: 'Excludes VAT/GST & Application Support'
//               }
//             ].map((plan) => (
//               <MyGrid key={plan.title} size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
//                 <MyCard
//                   elevation={3}
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     width: '100%',
//                     borderRadius: '16px',
//                     overflow: 'hidden',
//                     transition: 'transform 0.3s ease',
//                     boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 >
//                   <CardHeader
//                     title={<span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a202c' }}>{plan.title}</span>}
//                     sx={{
//                       textAlign: 'center',
//                       height: '40px',
//                       backgroundColor: '#e2e8f0',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   />
//                   <MyCardContent
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       padding: '10px',
//                       backgroundColor: '#f7fafc',
//                       border: '1px solid #e2e8f0',
//                       flexGrow: 1
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
//                       ₹{plan.price} /<span style={{ fontSize: '14px', color: '#2d3748' }}>Year</span>
//                     </div>
//                     <div style={{ fontSize: '14px', color: '#a0aec0', marginBottom: '10px' }}>{plan.extra}</div>
//                     <div style={{ fontSize: '14px', textAlign: 'center', color: '#4a5568', marginBottom: '10px' }}>{plan.description}</div>
//                     <MyBox sx={{ mt: 'auto', width: '100%' }}>
//                       <MyButton
//                         variant="contained"
//                         fullWidth
//                         onClick={() => goToCompanyModule('Institute', plan.title, 'Yearly', plan.price)}
//                       >
//                         Buy Now
//                       </MyButton>
//                     </MyBox>
//                   </MyCardContent>
//                 </MyCard>
//               </MyGrid>
//             ))}
//           </MyGrid>
//         </MyTabPanel>
//       </MyCardContent>
//       <MyBox>
//         <MyCardContent>
//           <MyGrid container spacing={2} alignItems="stretch">
//             <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
//               <TableContainer component={Paper} sx={{ mt: -2 }}>
//                 <Table sx={{ minWidth: 650 }} aria-label="pricing comparison table">
//                   <TableHead>
//                     <TableRow sx={{ backgroundColor: '#e2e8f0' }}>
//                       {['Features', 'free', 'Startup', 'Premium', 'Enterprise', 'Dedicated'].map((text, index) => (
//                         <TableCell
//                           key={text}
//                           align={index === 0 ? 'left' : 'center'}
//                           sx={{
//                             fontWeight: 'bold',
//                             fontSize: '1.1rem',
//                             border: '1px solid #e0e0e0',
//                             padding: '10px 14px',
//                             lineHeight: 1.2
//                           }}
//                         >
//                           {text}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>{rows.map((row) => renderRow(row))}</TableBody>
//                 </Table>
//               </TableContainer>
//             </MyGrid>
//           </MyGrid>
//         </MyCardContent>
//       </MyBox>
//       <Footer />
//     </div>
//   );
// };

// export default memo(ClientPricingMsme, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps);
// });

'use client';
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  CardHeader,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import MyTab from '@/app/custom-components/MyTab';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import { useRouter } from "next/navigation";
import usePricingMsme from './usePricingMsme';
import * as Constants from "../../constants/constants";
import './pricingMsme.css';

// ------------------ TYPES ------------------
type PlanName = "Startup" | "Premium" | "Enterprise" | "Dedicated";

interface Feature {
  name: string;
  price: number;
}

interface Plan {
  title: string;
  price: number;
}

// ------------------ FEATURE PRICING ------------------
const featurePricing: Record<PlanName, Feature[]> = {
  Startup: [
    { name: "Admin Dashboard", price: 200 },
    { name: "Student Dashboard", price: 300 },
    { name: "Dynamic Web Application", price: 400 },
  ],
  Premium: [
    { name: "Online Admission", price: 500 },
    { name: "Fee Payment Integration", price: 300 },
    { name: "Admin Dashboard", price: 400 },
  ],
  Enterprise: [
    { name: "Online Exams", price: 400 },
    { name: "Study Materials", price: 300 },
    { name: "Faculty Management", price: 600 },
  ],
  Dedicated: [
    { name: "Faculty Dashboard", price: 800 },
    { name: "Attendance Tracking", price: 400 },
    { name: "Timetable Management", price: 500 },
  ],
};

// ------------------ PLANS ------------------
const plans: Plan[] = [
  { title: "Startup", price: 0 },
  { title: "Premium", price: 0 },
  { title: "Enterprise", price: 0 },
  { title: "Dedicated", price: 0 },
];

// ------------------ MAIN COMPONENT ------------------
const ClientPricingMsme = () => {
  const router = useRouter();
  const { goToCompanyModule } = usePricingMsme();

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, string[]>>({});
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});

  // ✅ Default selection (All features selected initially)
  useEffect(() => {
    const defaults: Record<string, string[]> = {};
    const defaultPrices: Record<string, number> = {};

    plans.forEach((plan) => {
      const features = featurePricing[plan.title as PlanName] || [];
      defaults[plan.title] = features.map((f) => f.name);
      const totalPrice = plan.price + features.reduce((sum, f) => sum + f.price, 0);
      defaultPrices[plan.title] = totalPrice;
    });

    setSelectedFeatures(defaults);
    setCustomPrices(defaultPrices);
  }, []);

  const toggleFeature = (plan: string, feature: string, price: number) => {
    const current = selectedFeatures[plan] || [];
    const basePrice = plans.find((p) => p.title === plan)?.price || 0;
    const isSelected = current.includes(feature);

    let updatedFeatures: string[] = [];
    let newTotal = basePrice;

    if (isSelected) {
      updatedFeatures = current.filter((f) => f !== feature);
      newTotal = (customPrices[plan] || basePrice) - price;
    } else {
      updatedFeatures = [...current, feature];
      newTotal = (customPrices[plan] || basePrice) + price;
    }

    setSelectedFeatures({ ...selectedFeatures, [plan]: updatedFeatures });
    setCustomPrices({ ...customPrices, [plan]: newTotal });
  };

  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ width: "100%", paddingTop: "0px" }}>
      <MyCardContent>
        {/* ---------- HEADER BAR ---------- */}
        <MyBox
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            position: "relative",
          }}
        >
          <MyBox
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: { xs: "static", sm: "absolute" },
              left: { sm: 0 },
              justifyContent: { xs: "center", sm: "flex-start" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <MyButton
              variant="outlined"
              sx={{
                minWidth: "28px",
                height: "28px",
                borderRadius: "50%",
                fontSize: "1rem",
                padding: 0,
              }}
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-tech`)}
            >
              <ArrowBack />
            </MyButton>
            <MyTypography variant="h6" sx={{ fontSize: "1rem" }}>
              Choose the right plan for your <strong>MSME</strong>
            </MyTypography>
            <MyButton
              variant="outlined"
              sx={{
                minWidth: "28px",
                height: "28px",
                borderRadius: "50%",
                fontSize: "1rem",
                padding: 0,
              }}
              onClick={() => router.push(`/${Constants.MODULE_PRICING}/pricing-clg`)}
            >
              <ArrowForward />
            </MyButton>
          </MyBox>

          {/* ---------- TABS ---------- */}
          <MyBox
            sx={{
              margin: { xs: "0", sm: "0 auto" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <MyTabs value={tabIndex} onChange={handleTabChange}>
              <MyTab label="Monthly Billing" />
              <MyTab label="Annual Billing" />
            </MyTabs>
          </MyBox>
        </MyBox>

        {/* ---------- TAB 1: MONTHLY ---------- */}
        <MyTabPanel value={tabIndex} index={0}>
          <MyGrid container spacing={2} alignItems="stretch">
            {plans.map((plan) => {
              const finalPrice = customPrices[plan.title] || plan.price;
              return (
                <MyGrid key={plan.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MyCard
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      borderRadius: "20px",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <CardHeader
                      title={plan.title}
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#e2e8f0",
                      }}
                    />
                    <MyCardContent sx={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: "#2d3748",
                          marginBottom: "10px",
                        }}
                      >
                        ₹{finalPrice} / Month
                      </div>

                      <MyButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => goToCompanyModule('MSME', plan.title, 'Monthly', finalPrice)}
                      >
                        Buy Now
                      </MyButton>

                      <Accordion sx={{ mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Customize Features
                        </AccordionSummary>
                        <AccordionDetails>
                          {(featurePricing[plan.title as PlanName] || []).map((feature) => (
                            <FormControlLabel
                              key={feature.name}
                              control={
                                <Checkbox
                                  checked={
                                    selectedFeatures[plan.title]?.includes(feature.name) || false
                                  }
                                  onChange={() =>
                                    toggleFeature(plan.title, feature.name, feature.price)
                                  }
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

        {/* ---------- TAB 2: ANNUAL ---------- */}
        <MyTabPanel value={tabIndex} index={1}>
          <MyGrid container spacing={2} alignItems="stretch">
            {plans.map((plan) => {
              const finalPrice = (customPrices[plan.title] || plan.price) * 12 * 0.9; // 10% discount
              return (
                <MyGrid key={plan.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MyCard
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      borderRadius: "20px",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <CardHeader
                      title={plan.title}
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#edf2f7",
                      }}
                    />
                    <MyCardContent sx={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: "#2d3748",
                          marginBottom: "10px",
                        }}
                      >
                        ₹{finalPrice} / Year
                      </div>

                      <MyButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => goToCompanyModule('MSME', plan.title, 'Annual', finalPrice)}
                      >
                        Buy Now
                      </MyButton>
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


//  'use client';
// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Checkbox,
//   FormControlLabel,
//   Typography,
// } from "@mui/material";

// type Feature = {
//   name: string;
//   price: number;
// };

// // ✅ All plan-wise features
// const featurePricing: Record<
//   "Startup" | "Premium" | "Enterprise" | "Dedicated",
//   Feature[]
// > = {
//   Startup: [
//     { name: "Basic Support", price: 0 },
//     { name: "Email Integration", price: 200 },
//     { name: "Analytics Dashboard", price: 300 },
//   ],
//   Premium: [
//     { name: "Priority Support", price: 500 },
//     { name: "Advanced Analytics", price: 700 },
//     { name: "Custom Branding", price: 400 },
//   ],
//   Enterprise: [
//     { name: "Dedicated Account Manager", price: 1000 },
//     { name: "Custom Reports", price: 800 },
//     { name: "Role-Based Access", price: 600 },
//   ],
//   Dedicated: [
//     { name: "24/7 Support", price: 1500 },
//     { name: "On-premise Deployment", price: 2000 },
//     { name: "White Label Solution", price: 1800 },
//   ],
// };

// const PricingFeatureSelector: React.FC = () => {
//   // ✅ Default plan
//   const [selectedPlan, setSelectedPlan] =
//     useState<keyof typeof featurePricing>("Startup");

//   // ✅ Default selected features for initial plan
//   const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(
//     () =>
//       Object.fromEntries(
//         featurePricing["Startup"].map((feature) => [feature.name, true])
//       )
//   );

//   // ✅ Plan change handler
//   const handlePlanChange = (plan: keyof typeof featurePricing) => {
//     setSelectedPlan(plan);
//     // Auto-select all features for new plan
//     const defaultSelected = Object.fromEntries(
//       featurePricing[plan].map((feature) => [feature.name, true])
//     );
//     setSelectedFeatures(defaultSelected);
//   };

//   // ✅ Toggle feature selection
//   const handleFeatureToggle = (featureName: string) => {
//     setSelectedFeatures((prev) => ({
//       ...prev,
//       [featureName]: !prev[featureName],
//     }));
//   };

//   // ✅ Calculate total price
//   const totalPrice = featurePricing[selectedPlan]
//     .filter((f) => selectedFeatures[f.name])
//     .reduce((sum, f) => sum + f.price, 0);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 3,
//         maxWidth: 600,
//         margin: "auto",
//         mt: 4,
//         mb: 6,
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{ textAlign: "center", mb: 2, fontWeight: "bold", color: "#2e3a59" }}
//       >
//         Select Plan & Customize Features
//       </Typography>

//       {/* 🔹 Plan Selection */}
//       <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
//         {(Object.keys(featurePricing) as (keyof typeof featurePricing)[]).map((plan) => (
//           <Card
//             key={plan}
//             onClick={() => handlePlanChange(plan)}
//             sx={{
//               width: 130,
//               textAlign: "center",
//               cursor: "pointer",
//               border: selectedPlan === plan ? "2px solid #1976d2" : "1px solid #ccc",
//               transition: "0.3s",
//               "&:hover": { boxShadow: 3 },
//             }}
//           >
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 color={selectedPlan === plan ? "primary" : "text.primary"}
//               >
//                 {plan}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       {/* 🔹 Feature Selection */}
//       <Card sx={{ p: 2 }}>
//         <Typography
//           variant="h6"
//           sx={{ mb: 1, fontWeight: "bold", color: "#2e3a59" }}
//         >
//           {selectedPlan} Plan Features
//         </Typography>
//         {featurePricing[selectedPlan].map((feature) => (
//           <FormControlLabel
//             key={feature.name}
//             control={
//               <Checkbox
//                 checked={!!selectedFeatures[feature.name]}
//                 onChange={() => handleFeatureToggle(feature.name)}
//                 color="primary"
//               />
//             }
//             label={`${feature.name} — ₹${feature.price}`}
//           />
//         ))}
//       </Card>

//       {/* 🔹 Selected Summary */}
//       <Card sx={{ p: 2 }}>
//         <Typography
//           variant="h6"
//           sx={{ mb: 1, fontWeight: "bold", color: "#2e3a59" }}
//         >
//           Selected Features
//         </Typography>
//         {Object.entries(selectedFeatures)
//           .filter(([_, selected]) => selected)
//           .map(([name]) => (
//             <Typography key={name}>✅ {name}</Typography>
//           ))}
//         <Typography
//           sx={{
//             mt: 1,
//             fontWeight: "bold",
//             textAlign: "right",
//             color: "#1976d2",
//           }}
//         >
//           Total Price: ₹{totalPrice}
//         </Typography>
//       </Card>
//     </Box>
//   );
// };

// export default PricingFeatureSelector;
