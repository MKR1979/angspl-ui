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
import { Menu, MenuItem } from '@mui/material';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<{ text: string; href: string }[] | null>(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const formatUrl = (url: any) => (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);

  const drawerWidth = 240;
  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'About Us', href: '/about-us' },
    // { text: 'Pricing', href: '/pricing' },
    {
      text: 'Pricing',
      children: [
        { text: 'College', href: '/pricing-clg' },
        { text: 'School', href: '/pricing-sch' },
        { text: 'Institute', href: '/pricing-tech' }
      ]
    },
    { text: 'Contact Us', href: '/contact-us' },
    { text: 'affiliate', href: '/affiliate' },
    {
      text: 'Our Services',
      children: [
        { text: 'Product/ Services', href: '/our-service' },
        { text: 'Technology', href: '/technology' }
      ]
    },
    { text: 'Demo', href: formatUrl('adhyayan.online') }
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
      setContainer(window.document.body);
    }
  }, []);

  const toggleMobileSubmenu = (menuText: string) => {
    setOpenMobileSubmenus((prev) => ({
      ...prev,
      [menuText]: !prev[menuText]
    }));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuItems(null);
  };

  const drawer = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={handleCloseDrawer}
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
                    <Typography sx={{ mr: 1 }}>{openMobileSubmenus[item.text] ? '▼' : '▶'}</Typography>
                    <ListItemText primary={item.text} />
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
      </List>
      {/* <List>
  {navItems.map((item) =>
    item.children ? (
      <Box key={item.text} sx={{ display: { sm: 'none' } }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleMobileSubmenu(item.text)}>
            <ListItemText primary={item.text} />
            <Box component="span" sx={{ ml: 1 }}>
              {openMobileSubmenus[item.text] ? '▼' : '▶'}
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
</List> */}
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
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <MyButton variant="outlined" key={item.text} sx={{ backgroundColor: '#fff', border: 'none' }}>
                  <MyLink href={item.href} style={{ color: '#000' }}>
                    {item.text}
                  </MyLink>
                </MyButton>
              ))}
            </Box> */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, position: 'relative' }}>
              {navItems.map((item) =>
                item.children ? (
                  <Box
                    key={item.text}
                    onMouseEnter={() => setHoveredMenu(item.text)}
                    onMouseLeave={() => setHoveredMenu(null)}
                    sx={{ display: 'inline-block', position: 'relative' }}
                  >
                    <MyButton variant="outlined" sx={{ backgroundColor: '#fff', border: 'none', color: '#000' }}>
                      {item.text}
                    </MyButton>

                    {hoveredMenu === item.text && (
                      <Box
                        // key={item.text}
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          backgroundColor: '#fff',
                          boxShadow: 3,
                          borderRadius: 1,
                          zIndex: 10,
                          minWidth: '180px',
                          padding: 1
                        }}
                      >
                        {item.children.map((child) => (
                          // <>
                            /* <Box
                              key={child.text}
                              sx={{
                                '&:hover a': {
                                  backgroundColor: '#f0f0f0',
                                  color: '#1976d2',
                                  borderRadius: 15,
                                  cursor: 'pointer'
                                }
                              }}
                            > */
                              <MyLink
                                key={child.text}
                                href={child.href}
                                style={{ display: 'block', padding: '8px 16px', color: '#000', textDecoration: 'none' }}
                              >
                                {child.text}
                              </MyLink>

                          /* </> */
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <MyButton key={item.text} variant="outlined" sx={{ backgroundColor: '#fff', border: 'none', color: '#000' }}>
                    <MyLink href={item.href} style={{ color: '#000' }}>
                      {item.text}
                    </MyLink>
                  </MyButton>
                )
              )}
            </Box>

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) =>
                item.children ? (
                  <MyButton
                    key={item.text}
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', border: 'none' }}
                    onClick={(e) => handleMenuOpen(e, item.children)}
                  >
                    {item.text}
                  </MyButton>
                ) : (
                  <MyButton key={item.text} variant="outlined" sx={{ backgroundColor: '#fff', border: 'none' }}>
                    <MyLink href={item.href} style={{ color: '#000' }}>
                      {item.text}
                    </MyLink>
                  </MyButton>
                )
              )}
            </Box> */}

            {/* Add this dropdown menu element right below the Box */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {menuItems?.map((child) => (
                <MenuItem key={child.text} onClick={handleMenuClose} component="a" href={child.href}>
                  {child.text}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <Offset></Offset>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleCloseDrawer}
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
