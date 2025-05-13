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
    { text: 'Contact Us', href: '/contact-us' },
    { text: 'affiliate', href: '/affiliate' },
     { text: 'Our Service', href: '/our-service' },
    { text: 'Demo', href: formatUrl('adhyayan.online')}
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
