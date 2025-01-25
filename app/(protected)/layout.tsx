'use client';
import { forwardRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2Root, TreeItem2GroupTransition } from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { useCookies } from 'react-cookie';
import MyAppBar from '../custom-components/MyAppBar';
import MyBox from '../custom-components/MyBox';
import MyToolbar from '../custom-components/MyToolbar';
import MyIconButton from '../custom-components/MyIconButton';
import MyMenuIcon from '../custom-components/MyMenuIcon';
import MyTextField from '../custom-components/MyTextField';
import MyInputAdornment from '../custom-components/MyInputAdornment';
import MyIconSearch from '../custom-components/MyIconSearch';
import MyIconAdjustmentsHorizontal from '../custom-components/MyIconAdjustmentsHorizontal';
import MyPerfectScrollbar from '../custom-components/MyPerfectScrollbar ';
import MyDrawer from '../custom-components/MyDrawer';
import MyCard from '../custom-components/MyCard';
import MyLogo from '../custom-components/MyLogo';
import MyLink from '../custom-components/MyLink';
import MyAccountCircle from '../custom-components/MyAccountCircle';
import MyMenu from '../custom-components/MyMenu';
import MyMenuItem from '../custom-components/MyMenuItem';
import MyTypography from '../custom-components/MyTypography';
import MyMailIcon from '../custom-components/MyMailIcon';
import MyHomeIcon from '../custom-components/MyHomeIcon';
import MyBadge from '../custom-components/MyBadge';
//import MyLabelIcon from '../custom-components/MyLabelIcon';
import MySupervisorAccountIcon from '../custom-components/MySupervisorAccountIcon';
//import MyInfoIcon from '../custom-components/MyInfoIcon';
//import MyForumIcon from '../custom-components/MyForumIcon';
import MyNotificationsIcon from '../custom-components/MyNotificationsIcon';
import MyMoreVertIcon from '../custom-components/MyMoreVertIcon';
//import MyLocalOfferIcon from '../custom-components/MyLocalOfferIcon';
import MyArrowDropDownIcon from '../custom-components/MyArrowDropDownIcon';
import MyArrowRightIcon from '../custom-components/MyArrowRightIcon';
import MySimpleTreeView from '../custom-components/MySimpleTreeView';
import { useFirstRender } from '../hooks/useFirstRender';
import AuthGuard from '../auth-guard';
import { useDispatch } from '../store';
import { setToken } from '../store/slices/globalState';
import MyFactoryIcon from '../custom-components/MyFactoryIcon';
import MyCurrencyExcangeIcon from '../custom-components/MyCurrencyExcangeIcon';
import MyAdsClickIcon from '../custom-components/MyAdsClickIcon';
import MySwitchAccountIcon from '../custom-components/MySwitchAccountIcon';
import MyApiIcon from '../custom-components/MyApiIcon';
import MyFormatAlignJustifyIcon from '../custom-components/MyFormatAlignJustifyIcon';
import MyControlCameraIcon from '../custom-components/MyControlCameraIcon';
import MyCategoryIcon from '../custom-components/MyCategoryIcon';
import MyFlagIcon from '../custom-components/MyFlagIcon';
import MyCorporateFareIcon from '../custom-components/MyCorporateFareIcon';
import MyInventoryIcon from '../custom-components/MyInventoryIcon';
import MyBusinessIcon from '../custom-components/MyBusinessIcon';
import MyPersonOutlineIcon from '../custom-components/MyPersonOutlineIcon';
import MyCropPortraitIcon from '../custom-components/MyCropPortraitIcon';
import MyClearHandsIcon from '../custom-components/MyClearHandsIcon';
import MyWhatsAppIcon from '../custom-components/MyWhatsAppIcon';
import { Toaster } from 'react-hot-toast';
// import MyPopper from '../custom-components/MyPopper';
// import MyClickAwayListener from '../custom-components/MyClickAwayListener';
// import MyFade from '../custom-components/MyFade';
// import MyCheckbox from '../custom-components/MyCheckbox';
// import MyList from '../custom-components/MyList';
// import MyListItem from '../custom-components/MyListItem';
// import MyListItemButton from '../custom-components/MyListItemButton ';
// import MyListItemIcon from '../custom-components/MyListItemIcon ';
// import MyListItemText from '../custom-components/MyListItemText ';
//import GlobalSearchDTO from '../types/GlobalSearchDTO';
//import MyTransitions from '../custom-components/MyTransitions';
declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

interface StyledTreeItemProps extends Omit<UseTreeItem2Parameters, 'rootRef'>, React.HTMLAttributes<HTMLLIElement> {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
}

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.fontWeightRegular
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.focused, &.selected, &.selected.focused': {
    backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    color: 'var(--tree-view-color)'
  }
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(({ theme }) => ({
  marginLeft: 0,
  [`& .content`]: {
    paddingLeft: theme.spacing(2)
  }
}));

const CustomTreeItem = forwardRef(function CustomTreeItem(props: StyledTreeItemProps, ref: React.Ref<HTMLLIElement>) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const { getRootProps, getContentProps, getIconContainerProps, getLabelProps, getGroupTransitionProps, status } = useTreeItem2({
    id,
    itemId,
    children,
    label,
    disabled,
    rootRef: ref
  });

  const style = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color': theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused
            })
          })}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <MyBox
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0,
              pr: 0
            }}
          >
            <MyBox component={LabelIcon} color="inherit" sx={{ mr: 1, ml: -2 }} />
            <MyTypography
              {...getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 }
              })}
            />
            <MyTypography variant="caption" color="inherit">
              {labelInfo}
            </MyTypography>
          </MyBox>
        </CustomTreeItemContent>
        {children && <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}
// type StateType = {
//   open: boolean;
//   open1: boolean;
//   value: string;
//   groups: string[];
//   groupCounts: number[];
//   items: GlobalSearchDTO[];
//   queryItems: any[];
//   checkAll: boolean;
//   isLoading: boolean;
// };
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //const anchorRef1 = useRef<any>(null);
  // const [state, setState] = useState<StateType>({
  //   open: false,
  //   open1: false,
  //   value: '',
  //   groups: [],
  //   groupCounts: [],
  //   items: [],
  //   queryItems: [
  //     { id: 0, name: 'Order # - Orders', checked: true },
  //     { id: 1, name: 'Quote # - Quotes', checked: true },
  //     { id: 2, name: 'Quote # - Orders', checked: true },
  //     { id: 3, name: 'Job # - Jobs', checked: true },
  //     { id: 4, name: 'Job # - Heat Treat', checked: true },
  //     { id: 5, name: 'Job # - Purchase Orders', checked: true },
  //     { id: 6, name: 'Part # - Inventory (Part List)', checked: true },
  //     { id: 7, name: 'Part # - Jobs', checked: true },
  //     { id: 8, name: 'Part # - Purchase Orders', checked: true },
  //     { id: 9, name: 'Purchase Order # - Purchase Orders', checked: true },
  //     { id: 10, name: 'Purchase Order # - Orders', checked: true },
  //     { id: 11, name: 'Invoice # - Invoices', checked: true },
  //     { id: 12, name: 'Customer Company Name - Customers', checked: true },
  //     { id: 13, name: 'Customer Company Name - Orders', checked: true },
  //     { id: 14, name: 'Customer Company Name - Quotes', checked: true },
  //     { id: 15, name: 'Customer Company Name - Invoices', checked: true },
  //     { id: 16, name: 'Heat Treat # - Heat Treat', checked: true },
  //     { id: 17, name: 'Heat Treat # - Jobs', checked: true },
  //     { id: 18, name: 'Bin - Inventory', checked: true },
  //     { id: 19, name: 'Bin - Job Materials', checked: true },
  //     { id: 20, name: 'Bin - Jobs', checked: true },
  //     { id: 21, name: 'Customer Contact Name - Contacts', checked: true },
  //     { id: 22, name: 'Customer Contact Name - Orders', checked: true },
  //     { id: 23, name: 'Customer Contact Name - Quotes', checked: true },
  //     { id: 24, name: 'Vendor Name - Vendors', checked: true },
  //     { id: 25, name: 'Vendor Name - Purchase Orders', checked: true },
  //     { id: 26, name: "Hide Empty Part #'s", checked: true }
  //   ],
  //   checkAll: true,
  //   isLoading: false
  // });
  // const onQSettingsClick = useCallback(async (event: any) => {
  //   setState((prevState: StateType): StateType => {
  //     return {
  //       ...prevState,
  //       open1: !prevState.open1
  //     };
  //   });
  // }, []);

  // const handleClose1 = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
  //     if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
  //       return;
  //     }

  //     setState((prevState: StateType): StateType => {
  //       return {
  //         ...prevState,
  //         open1: false
  //       };
  //     });
  //   },
  //   [anchorRef1.current]
  // );
  // const onQueryItemClick = useCallback(async (event: any) => {
  //   setState((prevState: StateType): StateType => {
  //     return {
  //       ...prevState,
  //       checkAll: !prevState.checkAll
  //     };
  //   });
  // }, []);
  // const handleToggle = useCallback(
  //   async (id: number) => {
  //     const queryItems = [...state.queryItems];
  //     for (let i = 0; i < queryItems.length; i++) {
  //       if (queryItems[i].id == id) {
  //         queryItems[i].checked = !queryItems[i].checked;
  //         break;
  //       }
  //     }
  //     setState((prevState: StateType): StateType => {
  //       return {
  //         ...prevState,
  //         queryItems: queryItems
  //       };
  //     });
  //   },
  //   [state.queryItems]
  // );
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuProfile = useCallback(async () => {
    router.push('/profile');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [router, handleMobileMenuClose]);

  const handleMenuChangePassword = useCallback(async () => {
    router.push('/change-password');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [router, handleMobileMenuClose]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = useCallback(async () => {
    removeCookie('biz-comrade-token', { path: '/' });
    dispatch(setToken(''));
  }, [removeCookie, dispatch]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <MyMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MyMenuItem onClick={handleMenuProfile}>Profile</MyMenuItem>
      <MyMenuItem onClick={handleMenuChangePassword}>Change Password</MyMenuItem>
      <MyMenuItem onClick={handleMenuClose}>My account</MyMenuItem>
      <MyMenuItem onClick={logout}>Logout</MyMenuItem>
    </MyMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <MyMenu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MyMenuItem>
        <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MyBadge badgeContent={4} color="error">
            <MyMailIcon />
          </MyBadge>
        </MyIconButton>
        <p>Messages</p>
      </MyMenuItem>
      <MyMenuItem>
        <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <MyBadge badgeContent={17} color="error">
            <MyNotificationsIcon />
          </MyBadge>
        </MyIconButton>
        <p>Notifications</p>
      </MyMenuItem>
      <MyMenuItem onClick={handleProfileMenuOpen}>
        <MyIconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MyAccountCircle />
        </MyIconButton>
        <p>Profile</p>
      </MyMenuItem>
    </MyMenu>
  );
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const theme = useTheme();
  //const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const firstRender = useFirstRender();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };
  const toggleDrawer1 = () => {
    if (matchDownMd) {
      setOpen(false);
    }
  };

  return (
    <AuthGuard>
      <MyBox>
        <MyAppBar position="fixed" elevation={0} sx={{ backgroundColor: '#fff', color: '#000' }}>
          <MyToolbar>
            <MyBox sx={{ width: 300, display: 'flex' }}>
              <MyIconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer()}>
                <MyMenuIcon />
              </MyIconButton>
              {/* <MyTypography
              variant="h1"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            > */}
              <MyBox
                sx={{
                  textShadow: '2px 2px 5px black',
                  fontWeight: 'bold',
                  fontSize: '26px',
                  paddingTop: '5px',
                  width: '96px'
                }}
              >
                <MyLink href="/dashboard">
                  <MyLogo />
                </MyLink>
              </MyBox>
              {/* </MyTypography> */}
            </MyBox>
            <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MyTextField
                id="input-search-header"
                sx={{ width: '325px' }}
                //value={state.value}
                //onChange={onSearch}
                placeholder="Search"
                autoComplete="off"
                //ref={anchorRef}
                slotProps={{
                  input: {
                    startAdornment: (
                      <MyInputAdornment position="start">
                        <MyIconButton
                          aria-label="description for action"
                          //onClick={clickHandler}
                        >
                          <MyIconSearch
                            stroke={1.5}
                            size="16px"
                            //color={theme.palette.grey[500]}
                          />
                        </MyIconButton>
                      </MyInputAdornment>
                    ),
                    endAdornment: (
                      <MyInputAdornment position="end">
                        {/* <HeaderAvatarStyle variant="rounded"> */}
                        <MyIconButton>
                          <MyIconAdjustmentsHorizontal
                            id="qsettings"
                            stroke={1.5}
                            size="20px"
                            //ref={anchorRef1}
                            //onClick={onQSettingsClick}
                          />
                        </MyIconButton>
                        {/* </HeaderAvatarStyle> */}
                      </MyInputAdornment>
                    )
                  }
                }}

                //aria-describedby="search-helper-text"
                // inputProps={{ 'aria-label': 'weight' }}
              />
            </MyBox>
            <MyBox sx={{ flexGrow: 1 }} />
            <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
                <MyBadge badgeContent={10} color="error">
                  <MyWhatsAppIcon style={{ color: 'green' }} />
                </MyBadge>
              </MyIconButton>
              <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
                <MyBadge badgeContent={4} color="error">
                  <MyMailIcon />
                </MyBadge>
              </MyIconButton>
              <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <MyBadge badgeContent={17} color="error">
                  <MyNotificationsIcon />
                </MyBadge>
              </MyIconButton>
              <MyIconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <MyAccountCircle />
              </MyIconButton>
            </MyBox>
            <MyBox sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MyIconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MyMoreVertIcon />
              </MyIconButton>
            </MyBox>
          </MyToolbar>
        </MyAppBar>
        {renderMobileMenu}
        {renderMenu}
        <Offset></Offset>
      </MyBox>

      <MyBox sx={{ display: 'flex' }}>
        <MyBox component="nav" sx={{ width: firstRender ? 300 : open && matchUpMd ? 300 : 0 }}>
          <MyDrawer
            variant={firstRender ? 'persistent' : matchUpMd ? 'persistent' : 'temporary'}
            open={open}
            onClose={toggleDrawer()}
            sx={{
              width: 300,
              //position: 'relative', //imp
              '& .MuiDrawer-paper': {
                mt: firstRender ? 11 : open && matchUpMd ? 11 : 0,
                zIndex: 1099,
                //width: firstRender? 300: ( open && matchUpMd? 300: 0),
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRight: 'none'
              }
            }}
            ModalProps={{ keepMounted: false }}
          >
            <MyPerfectScrollbar
              component="div"
              style={{
                overflowY: 'hidden',
                width: 300,
                height: 'calc(100vh - ' + (matchUpMd ? 100 : 20) + 'px)',
                maxHeight: 'calc(100vh - ' + (matchUpMd ? 100 : 20) + 'px)',
                //position: "fixed",
                //left: 0,
                marginTop: 0
              }}
            >
              <MySimpleTreeView
                aria-label="gmail"
                defaultExpandedItems={['3']}
                defaultSelectedItems="5"
                slots={{
                  expandIcon: MyArrowRightIcon,
                  collapseIcon: MyArrowDropDownIcon,
                  endIcon: EndIcon
                }}
                sx={{ flexGrow: 1, maxWidth: 300 }}
              >
                <CustomTreeItem
                  itemId="1"
                  label="Dashboard"
                  labelIcon={MyHomeIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/dashboard');
                  }}
                />
                <CustomTreeItem
                  itemId="2"
                  label="Users"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/users/list');
                  }}
                />
                <CustomTreeItem
                  itemId="31"
                  label="Currencies"
                  labelIcon={MyCurrencyExcangeIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/currencies/list');
                  }}
                />
                <CustomTreeItem
                  itemId="32"
                  label="Lead Sources"
                  labelIcon={MyAdsClickIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/lead-sources/list');
                  }}
                />
                <CustomTreeItem
                  itemId="33"
                  label="Industries"
                  labelIcon={MyFactoryIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/industries/list');
                  }}
                />
                <CustomTreeItem
                  itemId="34"
                  label="Account Types"
                  labelIcon={MySwitchAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/account-types/list');
                  }}
                />
                <CustomTreeItem
                  itemId="35"
                  label="Opportunity Types"
                  labelIcon={MyApiIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/opportunity-types/list');
                  }}
                />
                <CustomTreeItem
                  itemId="36"
                  label="Stages"
                  labelIcon={MyFormatAlignJustifyIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/stages/list');
                  }}
                />
                <CustomTreeItem
                  itemId="37"
                  label="Roles"
                  labelIcon={MyControlCameraIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/roles/list');
                  }}
                />
                <CustomTreeItem
                  itemId="38"
                  label="Units"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/units/list');
                  }}
                />
                <CustomTreeItem
                  itemId="39"
                  label="Document Types"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/document-types/list');
                  }}
                />
                <CustomTreeItem
                  itemId="40"
                  label="Document Categories"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/document-categories/list');
                  }}
                />
                <CustomTreeItem
                  itemId="41"
                  label="Document Subcategories"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/document-subcategories/list');
                  }}
                />
                <CustomTreeItem
                  itemId="42"
                  label="Terms"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/terms/list');
                  }}
                />
                <CustomTreeItem
                  itemId="43"
                  label="Incoterms"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/incoterms/list');
                  }}
                />
                <CustomTreeItem
                  itemId="9"
                  label="Product Categories"
                  labelIcon={MyCategoryIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/product-categories/list');
                  }}
                />
                <CustomTreeItem
                  itemId="300"
                  label="Countries"
                  labelIcon={MyFlagIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/countries/list');
                  }}
                />
                <CustomTreeItem
                  itemId="301"
                  label="States"
                  labelIcon={MyCorporateFareIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/states/list');
                  }}
                />
                <CustomTreeItem
                  itemId="302"
                  label="Case Types"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/case-types/list');
                  }}
                />
                <CustomTreeItem
                  itemId="303"
                  label="Cases"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/cases/list');
                  }}
                />
                <CustomTreeItem
                  itemId="304"
                  label="Taxes"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/taxes/list');
                  }}
                />
                <CustomTreeItem
                  itemId="10"
                  label="Products"
                  labelIcon={MyInventoryIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/products/list');
                  }}
                />
                <CustomTreeItem
                  itemId="11"
                  label="Accounts"
                  labelIcon={MyBusinessIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/accounts/list');
                  }}
                />
                <CustomTreeItem
                  itemId="12"
                  label="Contacts"
                  labelIcon={MyPersonOutlineIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/contacts/list');
                  }}
                />
                <CustomTreeItem
                  itemId="13"
                  label="Opportunities"
                  labelIcon={MyCropPortraitIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/opportunities/list');
                  }}
                />
                <CustomTreeItem
                  itemId="14"
                  label="Leads"
                  labelIcon={MyClearHandsIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/leads/list');
                  }}
                />
                <CustomTreeItem
                  itemId="15"
                  label="Quotes"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/quotes/list');
                  }}
                />
                <CustomTreeItem
                  itemId="16"
                  label="Documents"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/documents/list');
                  }}
                />
                <CustomTreeItem
                  itemId="17"
                  label="E-Mails"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/emails/list');
                  }}
                />
                <CustomTreeItem
                  itemId="18"
                  label="Compaigns"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/compaigns/list');
                  }}
                />
                <CustomTreeItem
                  itemId="19"
                  label="Calls"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/calls/list');
                  }}
                />
                <CustomTreeItem
                  itemId="20"
                  label="Meetings"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/meetings/list');
                  }}
                />
                <CustomTreeItem
                  itemId="21"
                  label="Tasks"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/tasks/list');
                  }}
                />
                <CustomTreeItem
                  itemId="22"
                  label="Notes"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/notes/list');
                  }}
                />
                <CustomTreeItem
                  itemId="23"
                  label="Invoices"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/invoices/list');
                  }}
                />
                <CustomTreeItem
                  itemId="24"
                  label="Contracts"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/contracts/list');
                  }}
                />
                <CustomTreeItem
                  itemId="25"
                  label="Cases"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/cases/list');
                  }}
                />
                <CustomTreeItem
                  itemId="26"
                  label="Targets"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/targets/list');
                  }}
                />
                <CustomTreeItem
                  itemId="27"
                  label="Projects"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/projects/list');
                  }}
                />
                <CustomTreeItem
                  itemId="28"
                  label="Events"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/events/list');
                  }}
                />
                <CustomTreeItem
                  itemId="29"
                  label="Surveys"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/surveys/list');
                  }}
                />
                <CustomTreeItem
                  itemId="30"
                  label="Reports"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/reports/list');
                  }}
                />
                <CustomTreeItem
                  itemId="44"
                  label="Provisional Invoices"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/provisional-invoices/list');
                  }}
                />
                <CustomTreeItem
                  itemId="45"
                  label="Orders"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/orders/list');
                  }}
                />
                <CustomTreeItem
                  itemId="46"
                  label="Delivery Slips"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/delivery-slips/list');
                  }}
                />
                <CustomTreeItem
                  itemId="47"
                  label="Locations"
                  labelIcon={MySupervisorAccountIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/locations/list');
                  }}
                />
                {/* <CustomTreeItem itemId="3" label="Categories" labelIcon={MyLabelIcon}>
                  <CustomTreeItem
                    itemId="5"
                    label="Social"
                    labelIcon={MySupervisorAccountIcon}
                    //labelInfo="90"
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    colorForDarkMode="#B8E7FB"
                    bgColorForDarkMode={alpha('#00b4ff', 0.2)}
                  />
                  <CustomTreeItem
                    itemId="6"
                    label="Updates"
                    labelIcon={MyInfoIcon}
                    //labelInfo="2,294"
                    color="#e3742f"
                    bgColor="#fcefe3"
                    colorForDarkMode="#FFE2B7"
                    bgColorForDarkMode={alpha('#ff8f00', 0.2)}
                  />
                  <CustomTreeItem
                    itemId="7"
                    label="Forums"
                    labelIcon={MyForumIcon}
                    //labelInfo="3,566"
                    color="#a250f5"
                    bgColor="#f3e8fd"
                    colorForDarkMode="#D9B8FB"
                    bgColorForDarkMode={alpha('#9035ff', 0.15)}
                  />
                  <CustomTreeItem
                    itemId="8"
                    label="Promotions"
                    labelIcon={MyLocalOfferIcon}
                    //labelInfo="733"
                    color="#3c8039"
                    bgColor="#e6f4ea"
                    colorForDarkMode="#CCE8CD"
                    bgColorForDarkMode={alpha('#64ff6a', 0.2)}
                  />
                </CustomTreeItem>
                <CustomTreeItem itemId="4" label="History" labelIcon={MyLabelIcon} /> */}
              </MySimpleTreeView>
            </MyPerfectScrollbar>
          </MyDrawer>
        </MyBox>

        <MyCard
          component="div"
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            backgroundColor: '#fafafa',
            position: 'relative',
            left: 0,
            width: 'calc(100vw - ' + (firstRender ? 300 : matchUpMd ? 300 : 0) + 'px'
          }}
        >
          <MyBox
            sx={{
              flexGrow: 1,
              p: 1,
              m: 1.5,
              borderRadius: 2,
              backgroundColor: '#fff',
              minHeight: 'calc(100vh - 88px)'
            }}
          >
            {children}
          </MyBox>
        </MyCard>
      </MyBox>
      {/* <MyPopper
          open={state.open1}
          anchorEl={document.getElementById('qsettings')}
          transition
          placement="bottom-end"
          disablePortal
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 15]
              }
            }
          ]}
        >
          {({ TransitionProps }) => (
            <MyClickAwayListener onClickAway={handleClose1}>
              <MyTransitions in={open} {...TransitionProps}>
                <MyFade {...TransitionProps}>
                  <MyBox sx={{ border: 1, p: 0, bgcolor: 'background.paper', width: '360px', maxHeight: '460px' }}>
                    <MyTypography
                      onClick={onQueryItemClick}
                      sx={{ pl: 2, backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#36415215' }}
                    >
                      <MyTypography variant="h4">
                        <MyCheckbox edge="start" checked={state.checkAll} tabIndex={-1} disableRipple />
                        Query Items (All/ None)
                      </MyTypography>
                    </MyTypography>
                    <MyList sx={{ width: '100%', maxWidth: 360, overflow: 'auto', maxHeight: 360, bgcolor: 'background.paper', pt: 0 }}>
                      {state.queryItems.map((item, index) => {
                        const labelId = item.id;

                        return (
                          <div key={item.id}>
                            {item.name === "Hide Empty Part #'s" && <hr style={{ width: '100%', margin: '10px 0' }} />}
                            <MyListItem disablePadding>
                              <MyListItemButton role={undefined} onClick={() => handleToggle(item.id)} dense sx={{ height: '30px' }}>
                                <MyListItemIcon>
                                  <MyCheckbox
                                    edge="start"
                                    checked={item.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </MyListItemIcon>
                                <MyListItemText
                                  id={labelId}
                                  primary={item.name}
                                  sx={{ ml: 0 }}
                                  primaryTypographyProps={{
                                    style: { fontWeight: item.name === "Hide Empty Part #'s" ? 'bold' : 'normal' }
                                  }}
                                />
                              </MyListItemButton>
                            </MyListItem>
                          </div>
                        );
                      })}
                    </MyList>
                  </MyBox>
                </MyFade>
              </MyTransitions>
            </MyClickAwayListener>
          )}
        </MyPopper> */}
      <Toaster />
    </AuthGuard>
  );
}
