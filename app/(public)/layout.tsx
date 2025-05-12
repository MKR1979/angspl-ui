'use client';
import MyBox from '../custom-components/MyBox';
import MyMenuIcon from '../custom-components/MyMenuIcon';
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null); // ✅ Use state for reactivity

  const formatUrl = (url: any) =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;

  const drawerWidth = 240;
  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'About Us', href: '/about-us' },
    { text: 'Pricing', href: '/pricing' },
    // { text: 'Programs', href: '/programs' },
    // { text: 'Admission', href: '/admission' },
    { text: 'Contact Us', href: '/contact-us' },
    { text: 'affiliate', href: '/affiliate' },
    { text: 'Demo', href: formatUrl('adhyayan.online')}
    // { text: 'Login', href: '/login' },
    // { text: 'Create Account', href: '/sign-up' }
  ];

  // Toggle Drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContainer(window.document.body); // ✅ Correctly setting container inside useEffect
    }
  }, []);

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
            <MyLogo />
          </MyLink>
        </MyBox>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={handleCloseDrawer}>
              <MyLink href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item.text} />
              </MyLink>
            </ListItemButton>
          </ListItem>
        ))}
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
                  <MyLogo />
                </MyLink>
              </MyBox>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <MyButton variant="outlined" key={item.text} sx={{ backgroundColor: '#fff', border: 'none' }}>
                  <MyLink href={item.href} style={{ color: '#000' }}>
                    {item.text}
                  </MyLink>
                </MyButton>
              ))}
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
      <MyBox sx={{ display: 'flex' }}>{children}</MyBox>
    </>
  );
}

// 'use client';
// import MyBox from '../custom-components/MyBox';
// import MyMenuIcon from '../custom-components/MyMenuIcon';

// import {
//   AppBar,
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   styled,
//   Toolbar,
//   Typography
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import MyLink from '../custom-components/MyLink';
// import MyLogo from '../custom-components/MyLogo';
// import MyButton from '../custom-components/MyButton';


// export default function RootLayout({
//   children
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [container, setContainer] = useState<HTMLElement | null>(null);
 
//   const drawerWidth = 240;
//  const navItems = [
//   { text: 'Home', href: '/', flagKey: 'home' },
//   { text: 'Programs', href: '/programs', flagKey: 'programs' },
//   { text: 'Admission', href: '/admission', flagKey: 'admission' },
//   { text: 'Contact Us', href: '/contact-us', flagKey: 'contactUs' },
//   { text: 'About Us', href: '/about-us', flagKey: 'aboutUs' },
//   { text: 'affiliate', href: '/affiliate', flagKey: 'affiliate' },
//   { text: 'Login', href: '/login', flagKey: 'login' },
//   { text: 'Create Account', href: '/sign-up', flagKey: 'createAccount' }
// ];


//   // ✅ Initialize menu flags (all true by default)
//   const menuFlags = {
//     home: true,
//     programs: true,
//     admission: true,
//     contactUs: true,
//     aboutUs: true,
//     affiliate: true,
//     login: true,
//     createAccount: true
//   };

//   // ✅ Helper to parse value safely
//   function parseValue(config:any) {
//     if (config && config.type === 'boolean') {
//       return config.value === 'true';
//     }
//     return true;
//   }
//   const siteConfig = {   
//       key: 'enable_admission',
//       value: 'true',
//       type: 'boolean',
//       description: '',
//       status:''    
//   };

//   // ✅ Apply switch-case from siteConfig
//   if (siteConfig && Array.isArray(siteConfig)) {
//     siteConfig.forEach((config) => {
//       const value = parseValue(config);
//       switch (config.key) {
//         case 'enable_home':
//           menuFlags.home = value;
//           break;
//         case 'enable_programs':
//           menuFlags.programs = value;
//           break;
//         case 'enable_admission':
//           menuFlags.admission = value;
//           break;
//         case 'enable_contact_us':
//           menuFlags.contactUs = value;
//           break;
//         case 'enable_about_us':
//           menuFlags.aboutUs = value;
//           break;
//         case 'enable_affiliate':
//           menuFlags.affiliate = value;
//           break;
//         case 'enable_login':
//           menuFlags.login = value;
//           break;
//         case 'enable_create_account':
//           menuFlags.createAccount = value;
//           break;
//         default:
//           break;
//       }
//     });
//   }

//   const handleDrawerToggle = () => {
//     setMobileOpen((prev) => !prev);
//   };

//   const handleCloseDrawer = () => {
//     setMobileOpen(false);
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setContainer(window.document.body);
//     }
//   }, []);

//   const drawer = (
//     <Box sx={{ width: drawerWidth }} role="presentation" onClick={handleCloseDrawer}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         <MyBox
//           sx={{
//             textShadow: '2px 2px 5px black',
//             fontWeight: 'bold',
//             fontSize: '26px',
//             paddingTop: '5px',
//             width: '96px'
//           }}
//         >
//           <MyLink href="/">
//             <MyLogo />
//           </MyLink>
//         </MyBox>
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => {
//           //const key = item.text.toLowerCase().replace(' ', '');
//          if (menuFlags[item.flagKey]) {
//             return (
//               <ListItem key={item.text} disablePadding>
//                 <ListItemButton onClick={handleCloseDrawer}>
//                   <MyLink href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <ListItemText primary={item.text} />
//                   </MyLink>
//                 </ListItemButton>
//               </ListItem>
//             );
//           }
//           return null;
//         })}
//       </List>
//     </Box>
//   );

//   const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

//   return (
//     <>
//       <MyBox sx={{ display: 'flex' }}>
//         <AppBar component="nav" elevation={1} sx={{ backgroundColor: '#fff', color: '#000' }} position="fixed">
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: 'none' } }}
//             >
//               <MyMenuIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
//               <MyBox
//                 sx={{
//                   textShadow: '2px 2px 5px black',
//                   fontWeight: 'bold',
//                   fontSize: '26px',
//                   paddingTop: '5px',
//                   width: '96px'
//                 }}
//               >
//                 <MyLink href="/">
//                   <MyLogo />
//                 </MyLink>
//               </MyBox>
//             </Typography>
//             <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//               {navItems.map((item) => {
//                 const key = item.text.toLowerCase().replace(' ', '');
//                 if (menuFlags[key]) {
//                   return (
//                     <MyButton variant="outlined" key={item.text} sx={{ backgroundColor: '#fff', border: 'none' }}>
//                       <MyLink href={item.href} style={{ color: '#000' }}>
//                         {item.text}
//                       </MyLink>
//                     </MyButton>
//                   );
//                 }
//                 return null;
//               })}
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Offset></Offset>
//         <nav>
//           <Drawer
//             container={container}
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleCloseDrawer}
//             ModalProps={{
//               keepMounted: true
//             }}
//             sx={{
//               display: { xs: 'block', sm: 'none' },
//               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </nav>
//       </MyBox>
//       <MyBox sx={{ display: 'flex' }}>{children}</MyBox>
//     </>
//   );
// }
