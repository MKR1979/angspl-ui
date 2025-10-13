'use client';
import MyBox from '../custom-components/MyBox';
import MyMenuIcon from '../custom-components/MyMenuIcon';
import { useCompanyInfo } from '../../app/common/companyInfo';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import MyLink from '../custom-components/MyLink';
import MyLogo from '../custom-components/MyLogo';
import MyButton from '../custom-components/MyButton';
import { useRouter } from 'next/navigation';
import MaintenanceBanner from '../custom-components/MaintenanceBanner';
import * as gConstants from '../constants/constants';
import * as Constants from '../(public)/constants/constants';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';
import { useSelector } from '../store';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null); // ✅ Use state for reactivity
  const { companyInfo } = useSelector((state) => state.globalState);
  // const [menuItems, setMenuItems] = useState<{ text: string; href: string }[] | null>(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Using Site Config to display menu tiems

  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const enableMaintenance = siteConfig.find((c) => c.key.toUpperCase() === 'ENABLE_MAINTENANCE')?.value?.toLowerCase() === 'true';

  const menuFlags = {
    publicHome: true,
    publicPrograms: true,
    publicAdmission: true,
    publicAboutUs: true,
    publicContactUs: true,
    publicAffiliates: true,
    publicLogin: true,
    publicSignUp: true,
    publicPricing: true,
    publicPricingSch: true,
    publicPricingClg: true,
    publicPricingTech: true,
    publicDemoSch: true,
    publicDemoClg: true,
    publicDemoTech: true,
    publicModules: true,
    publicAdmissionMng: true,
    publicStudentMng: true,
    publicFeeMng: true,
    publicAttendanceMng: true,
    publicAcademicMng: true,
    publicAffiliateMng: true,
    publicCourseMng: true,
    publicExaminationMng: true,
    publicProducts: true,
    publicServices: true,
    publicTechnology: true,
    publicDemo: true,
    demoSchool: true,
    demoCollege: true,
    demoInstitute: true,
    // Add more keys as needed...
  };

  if (Array.isArray(siteConfig)) {
    siteConfig.forEach((config) => {
      switch (config.key.toUpperCase()) {
        case 'ENABLE_HOME':
          menuFlags.publicHome = config.value === 'true';
          break;
        case 'ENABLE_PROGRAMS':
          menuFlags.publicPrograms = config.value === 'true';
          break;
        case 'ENABLE_PUB_ADMISSION':
          menuFlags.publicAdmission = config.value === 'true';
          break;
        case 'ENABLE_ABOUT_US':
          menuFlags.publicAboutUs = config.value === 'true';
          break;
        case 'ENABLE_PRODUCTS':
          menuFlags.publicProducts = config.value === 'true';
          break;
        case 'ENABLE_CONTACT_US':
          menuFlags.publicContactUs = config.value === 'true';
          break;
        case 'ENABLE_PUB_AFFILIATES':
          menuFlags.publicAffiliates = config.value === 'true';
          break;
        case 'ENABLE_LOGIN':
          menuFlags.publicLogin = config.value === 'true';
          break;
        case 'ENABLE_SIGNUP':
          menuFlags.publicSignUp = config.value === 'true';
          break;
        case 'ENABLE_PUBLIC_PRICING':
          menuFlags.publicPricing = config.value === 'true';
          break;
        case 'ENABLE_PRICING_TECH':
          menuFlags.publicPricingTech = config.value === 'true';
          break;
        case 'ENABLE_PRICING_SCH':
          menuFlags.publicPricingSch = config.value === 'true';
          break;
        case 'ENABLE_PRICING_CLG':
          menuFlags.publicPricingClg = config.value === 'true';
          break;
        case 'ENABLE_PUB_DEMO':
          menuFlags.publicDemo = config.value === 'true';
          break;
        case 'ENABLE_DEMO_CLG':
          menuFlags.publicDemoClg = config.value === 'true';
          break;
        case 'ENABLE_DEMO_SCH':
          menuFlags.publicDemoSch = config.value === 'true';
          break;
        case 'ENABLE_DEMO_TECH':
          menuFlags.publicDemoTech = config.value === 'true';
          break;
        case 'ENABLE_PUB_MODULES':
          menuFlags.publicModules = config.value === 'true';
          break;
        case 'ENABLE_ADMISSION_MNG':
          menuFlags.publicAdmissionMng = config.value === 'true';
          break;
        case 'ENABLE_STUDENT_MNG':
          menuFlags.publicStudentMng = config.value === 'true';
          break;
        case 'ENABLE_FEE_MNG':
          menuFlags.publicFeeMng = config.value === 'true';
          break;
        case 'ENABLE_ATTENDANCE_MNG':
          menuFlags.publicAttendanceMng = config.value === 'true';
          break;
        case 'ENABLE_ACADEMIC_MNG':
          menuFlags.publicAcademicMng = config.value === 'true';
          break;
        case 'ENABLE_AFFILIATE_MNG':
          menuFlags.publicAffiliateMng = config.value === 'true';
          break;
        case 'ENABLE_COURSE_MNG':
          menuFlags.publicCourseMng = config.value === 'true';
          break;
        case 'ENABLE_EXAMINATION_MNG':
          menuFlags.publicExaminationMng = config.value === 'true';
          break;
        case 'ENABLE_PUBLIC_PRODUCTS':
          menuFlags.publicProducts = config.value === 'true';
          break;
        case 'ENABLE_PUBLIC_SERVICES':
          menuFlags.publicServices = config.value === 'true';
          break;
        case 'ENABLE_PUBLIC_TECHNOLOGY':
          menuFlags.publicTechnology = config.value === 'true';
          break;
        case 'ENABLE_PUBLIC_DEMO':
          menuFlags.publicDemo = config.value === 'true';
          break;
        case 'ENABLE_DEMO_SCHOOL':
          menuFlags.demoSchool = config.value === 'true';
          break;
        case 'ENABLE_DEMO_COLLEGE':
          menuFlags.demoCollege = config.value === 'true';
          break;
        case 'ENABLE_DEMO_INSTITUTE':
          menuFlags.demoInstitute = config.value === 'true';
          break;
        default:
          break;
      }
    });
  }

  //

  const drawerWidth = 240;
  // Toggle Drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContainer(window.document.body);
    }
  }, []);

  //Block-A This would be a permanent solution later on
  const router = useRouter();
  const [currentHost, setCurrentHost] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const cleanedHost = hostname.startsWith('www.') ? hostname.replace(/^www\./, '') : hostname;
      setCurrentHost(cleanedHost);
    }
  }, []);

  const { getCompanyInfo } = useCompanyInfo(currentHost ?? '');
  useEffect(() => {
    if (!currentHost) return;
    getCompanyInfo();
    if (currentHost === gConstants.DPS_HOST_NAME) {
      router.push('/login');
      return;
    }
  }, [currentHost, router, getCompanyInfo]);
  if (currentHost === null) return null; // avoid SSR crash
  if (currentHost === gConstants.DPS_HOST_NAME) return null;
  // END BLOCK-A
  //Array

  const navItems = [
    ...(menuFlags.publicHome ? [{ text: 'Home', href: '/home' }] : []),
    ...(menuFlags.publicPricing
      ? [
        {
          text: 'Pricing',
          children: [
            ...(menuFlags.publicPricingSch ? [{ text: 'School', href: `/${Constants.MODULE_PRICING}/pricing-sch` }] : []),
            ...(menuFlags.publicPricingClg ? [{ text: 'College', href: `/${Constants.MODULE_PRICING}/pricing-clg` }] : []),
            ...(menuFlags.publicPricingTech ? [{ text: 'Institute', href: `/${Constants.MODULE_PRICING}/pricing-tech` }] : [])
          ]
        }
      ]
      : []),
    ...(menuFlags.publicModules
      ? [
        {
          text: 'Modules',
          children: [
            ...(menuFlags.publicAdmissionMng ? [{ text: 'Admission Management', href: `/${Constants.MOD_DESC}/adm-management` }] : []),
            ...(menuFlags.publicStudentMng ? [{ text: 'Student Management', href: `/${Constants.MOD_DESC}/student-management` }] : []),
            ...(menuFlags.publicFeeMng ? [{ text: 'Fees Management', href: `/${Constants.MOD_DESC}/fee-management` }] : []),
            ...(menuFlags.publicAttendanceMng ? [{ text: 'Attendance Management', href: `/${Constants.MOD_DESC}/attendance-management` }] : []),
            ...(menuFlags.publicAcademicMng ? [{ text: 'Academics Management', href: `/${Constants.MOD_DESC}/academic-management` }] : []),
            ...(menuFlags.publicAffiliateMng ? [{ text: 'Course Management', href: `/${Constants.MOD_DESC}/course-management` }] : []),
            ...(menuFlags.publicCourseMng ? [{ text: 'Examination Management', href: `/${Constants.MOD_DESC}/exam-management` }] : []),
            ...(menuFlags.publicExaminationMng ? [{ text: 'Affiliate Management', href: `/${Constants.MOD_DESC}/affiliate-management` }] : [])
          ]
        }
      ]
      : []),
    ...(menuFlags.publicProducts
      ? [
        {
          text: 'Products',
          children: [
            ...(menuFlags.publicServices ? [{ text: 'Services', href: '/our-service' }] : []),
            ...(menuFlags.publicTechnology ? [{ text: 'Technology', href: '/technology' }] : []),
          ]
        }
      ]
      : []),

    ...(menuFlags.publicDemo
      ? [
        {
          text: 'Demo',
          children: [
            ...(menuFlags.demoSchool ? [{ text: 'School', href: `/${Constants.MODULE_DEMO}/demo-sch` }] : []),
            ...(menuFlags.demoCollege ? [{ text: 'College', href: `/${Constants.MODULE_DEMO}/demo-clg` }] : []),
            ...(menuFlags.demoInstitute ? [{ text: 'Institute', href: `/${Constants.MODULE_DEMO}/demo-tech` }] : [])
          ]
        }
      ]
      : []),
    ...(menuFlags.publicContactUs ? [{ text: 'Contact Us', href: '/contact-us' }] : []),
    ...(menuFlags.publicAffiliates ? [{ text: 'Affiliate', href: '/affiliate' }] : []),
    ...(menuFlags.publicAboutUs ? [{ text: 'About Us', href: '/about-us' }] : []),
    ...(menuFlags.publicLogin ? [{ text: 'Login', href: '/login' }] : []),
    // ...(menuFlags.publicPrograms ? [{ text: 'Programs', href: '/programs' }] : []),
    // ...(menuFlags.publicAdmission ? [{ text: 'Admission', href: '/admission' }] : []),
    // ...(menuFlags.publicProducts ? [{ text: 'Products', href: '/services/SaaSProduct_adhyayan.pdf' }] : []),
    // ...(menuFlags.publicSignUp ? [{ text: 'Register', href: '/sign-up' }] : [])
  ];


 const toggleMobileSubmenu = (menuText: string) => {
    setOpenMobileSubmenus((prev) => ({
      ...prev,
      [menuText]: !prev[menuText]
    }));
  };
// Toggle Drawer

  const drawer = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={handleCloseDrawer} // Close drawer on clicking anywhere inside
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <MyBox
          sx={{
            textShadow: '2px 2px 5px black',
            fontWeight: 'bold',
            fontSize: '26px',
            paddingTop: '5px',
            width: '96px'
          }}
        >
          <MyLink href="/">
            <MyLogo hostName={currentHost} />
          </MyLink>
        </MyBox>
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={handleCloseDrawer}>
              <MyLink href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item.text} />
              </MyLink>
            </ListItemButton>
          </ListItem>
        ))} */}
        {navItems.map((item) =>
          item.children ? (
            <Box key={item.text} sx={{ display: { sm: 'none' } }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    e.stopPropagation(); // 👈 prevent closing drawer
                    toggleMobileSubmenu(item.text);
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemText primary={item.text} />
                    {openMobileSubmenus[item.text] ? <KeyboardArrowDown fontSize="small" /> : <KeyboardArrowRight fontSize="small" />}
                  </Box>
                </ListItemButton>
              </ListItem>
              {openMobileSubmenus[item.text] &&
                item.children.map((child) => (
                  <ListItem key={child.text} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton onClick={handleCloseDrawer}>
                      <MyLink href={child.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemText primary={child.text} />
                      </MyLink>
                    </ListItemButton>
                  </ListItem>
                ))}
            </Box>
          ) : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={handleCloseDrawer}>
                <MyLink href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary={item.text} />
                </MyLink>
              </ListItemButton>
            </ListItem>
          )
        )}
        {/* {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={handleCloseDrawer}>
              {item.href ? (
                <MyLink href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary={item.text} />
                </MyLink>
              ) : (
                <ListItemText primary={item.text} />
              )}
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <MyBox sx={{ display: 'flex' }}>
        <AppBar component="nav" elevation={1} sx={{ backgroundColor: '#fff', color: '#000' }} position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MyMenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <MyBox
                sx={{
                  textShadow: '2px 2px 5px black',
                  fontWeight: 'bold',
                  fontSize: '26px',
                  paddingTop: '5px',
                  width: '96px'
                }}
              >
                <MyLink href="/">
                  {/* <MyLogo hostName={currentHost} /> */}
                  <MyLogo src={companyInfo?.logo_url} height={companyInfo?.logo_height} width={companyInfo?.logo_width} />
                </MyLink>
              </MyBox>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* {navItems.map((item) => (
                <MyButton variant="outlined" key={item.text} sx={{ backgroundColor: '#fff', border: 'none' }}>
                  <MyLink href={item.href} style={{ color: '#000' }}>
                    {item.text}
                  </MyLink>
                </MyButton>
              ))} */}
              {navItems.map((item) =>
                item.children ? (
                  <Box
                    key={item.text}
                    onMouseEnter={() => setHoveredMenu(item.text)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    sx={{ display: 'inline-block', position: 'relative' }}
                  >
                    <MyButton
                      variant="outlined"
                      sx={{
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        '&:hover': {
                          color: '#1976d2',
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      {item.text}
                    </MyButton>
                    {hoveredMenu === item.text && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          backgroundColor: '#fff',
                          boxShadow: 3,
                          borderRadius: 1,
                          zIndex: 10,
                          minWidth: '150px',
                          width: 'max-content',
                          paddingX: '5px'
                        }}
                      >
                        {item.children.map((child) => (
                          <MyLink
                            key={child.text}
                            href={child.href}
                            style={{ textDecoration: 'none' }}
                            onClick={() => setHoveredMenu(null)}
                          >
                            <Box //if not work then remove the box and only use {child.text}
                              sx={{
                                padding: '5px 1px 5px 8px',
                                color: '#000',
                                width: '100%',
                                borderBottom: '1px solid #ddd',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                  color: '#1976d2'
                                },
                                '&.active': {
                                  backgroundColor: '#ff4040',
                                  color: '#fff'
                                }
                              }}
                            >
                              {child.text}
                            </Box>
                            {/* { child.text} */}
                          </MyLink>
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <MyButton
                    key={item.text}
                    variant="outlined"
                    sx={{
                      backgroundColor: '#fff',
                      border: 'none',
                      color: '#000',
                      '&:hover': {
                        color: '#1976d2',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    <MyLink href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.text}
                    </MyLink>
                  </MyButton>
                )
              )}
              {/* {navItems.map((item) => (
                <MyButton variant="outlined" key={item.text} sx={{ backgroundColor: '#fff', border: 'none' }}>
                  {item.href ? (
                    <MyLink href={item.href} style={{ color: '#000' }}>
                      {item.text}
                    </MyLink>
                  ) : (
                    item.text
                  )}
                </MyButton>
              ))} */}
            </Box>
          </Toolbar>
        </AppBar>
        <Offset></Offset>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleCloseDrawer} // Close drawer when clicking outside
            ModalProps={{
              keepMounted: true
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </MyBox>
      {enableMaintenance && <MaintenanceBanner />}
      <MyBox sx={{ display: 'flex' }}>{children}</MyBox>
    </>
  );
}