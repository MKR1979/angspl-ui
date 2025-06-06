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
import MyBadge from '../custom-components/MyBadge';
import MyNotificationsIcon from '../custom-components/MyNotificationsIcon';
import MyMoreVertIcon from '../custom-components/MyMoreVertIcon';
import MyArrowDropDownIcon from '../custom-components/MyArrowDropDownIcon';
import MyArrowRightIcon from '../custom-components/MyArrowRightIcon';
import MySimpleTreeView from '../custom-components/MySimpleTreeView';
import { useFirstRender } from '../hooks/useFirstRender';
import AuthGuard from '../auth-guard';
import { useDispatch, useSelector } from '../store';
import { setToken } from '../store/slices/globalState';
import MyIconDashboard from '../custom-components/MyIconDashboard';
import MyIconBook from '../custom-components/MyIconBook';
import MyIconActivity from '../custom-components/MyIconActivity';
import MyIconClipboardData from '../custom-components/MyIconClipboardData';
import MyHistoryEduTwoToneIcon from '../custom-components/MyHistoryEduTwoToneIcon';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}
interface StyledTreeItemProps 
  extends Omit<UseTreeItem2Parameters, 'rootRef' | 'children'>, 
  React.HTMLAttributes<HTMLLIElement> {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  children?: React.ReactNode; // Explicitly define `children` to resolve conflict
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
    router.push('/my-profile');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [router, handleMobileMenuClose]);

  const handleMenuChangePassword = useCallback(async () => {
    router.push('/change-my-password');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [router, handleMobileMenuClose]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = useCallback(async () => {
    removeCookie('adhyayan-token', { path: '/' });
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
  const { loginUser } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.globalState);
  console.log( 'show site cong\fig',siteConfig);
   // Initialize all menus as visible by default
  const menuFlags = {
    freeCourse: true,
    paidCourse: true,
    testQuizzes: true,
    videoInsights: true,
    codeInsights: true,
    notesInsights: true,
    studentInfo: true,
    // Add more keys as needed...
  };

  // Apply switch-case to disable menus when value is 'false'
  if (siteConfig) {
    switch (siteConfig.key) {
      case 'enable_free_course':
        menuFlags.freeCourse = siteConfig.value == 'true';
        break;
      case 'enable_paid_course':
        menuFlags.paidCourse = siteConfig.value == 'true';
        break;
      case 'enable_test_quizzes':
        menuFlags.testQuizzes = siteConfig.value == 'true';
        break;
      case 'enable_video_insights':
        menuFlags.videoInsights = siteConfig.value == 'true';
        break;
      case 'enable_code_insights':
        menuFlags.codeInsights = siteConfig.value == 'true';
        break;
      case 'enable_notes_insights':
        menuFlags.notesInsights = siteConfig.value == 'true';
        break;
      case 'enable_student_info':
        menuFlags.studentInfo = siteConfig.value == 'true';
        break;
      // Add remaining 13+ cases here
      default:
        break;
    }
  }
  //  
  return (
    <AuthGuard>
      <MyBox>
        <MyAppBar position="fixed" elevation={0} sx={{ backgroundColor: '#fff', color: '#000' }}>
          <MyToolbar>
            <MyBox sx={{ width: 300, display: 'flex' }}>
              <MyIconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer()}>
                <MyMenuIcon />
              </MyIconButton>
               <MyBox
                sx={{
                  textShadow: '2px 2px 5px black',
                  fontWeight: 'bold',
                  fontSize: '26px',
                  paddingTop: '5px',
                  width: '96px'
                }}
              >
                <MyLink href="/learning-dashbord">
                  <MyLogo />
                </MyLink>
              </MyBox>
              {/* </MyTypography> */}
            </MyBox>
            <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MyTextField
                id="input-search-header"
                sx={{ width: '325px' }}
                placeholder="Search"
                autoComplete="off"
                slotProps={{
                  input: {
                    startAdornment: (
                      <MyInputAdornment position="start">
                        <MyIconButton
                          aria-label="description for action"
                        >
                          <MyIconSearch
                            stroke={1.5}
                            size="16px"
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
                          />
                        </MyIconButton>
                        {/* </HeaderAvatarStyle> */}
                      </MyInputAdornment>
                    )
                  }
                }}
              />
            </MyBox>
            {/*Welcome Message */}
            {loginUser && (
                <MyTypography
                  sx={{
                    ml: 30,
                    //fontWeight: 'bold',
                    fontSize: '13px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Welcome, {loginUser}
                </MyTypography>
              )}
            <MyBox sx={{ flexGrow: 1 }} />
            <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              '& .MuiDrawer-paper': {
                mt: firstRender ? 11 : open && matchUpMd ? 11 : 0,
                zIndex: 1099,
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
                marginTop: 0
              }}
            >
              <MySimpleTreeView
                aria-label="gmail"
                defaultExpandedItems={['3']}
                defaultSelectedItems="1"
                slots={{
                  expandIcon: MyArrowRightIcon,
                  collapseIcon: MyArrowDropDownIcon,
                  endIcon: EndIcon
                }}
                sx={{ flexGrow: 1, maxWidth: 300 }}
              >
                <CustomTreeItem
                  itemId="1"
                  label="Learning Dashboard"
                  labelIcon={MyIconDashboard}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/learning-dashboard');
                  }}
                />
                {menuFlags.paidCourse && (
                <CustomTreeItem
                  itemId="2"
                  label="Paid Courses"
                  labelIcon={MyIconBook}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/paid-courses');
                  }}
                /> 
                 )}
                {menuFlags.freeCourse && (
                    <CustomTreeItem
                      itemId="3"
                      label="Free Courses"
                      labelIcon={MyIconBook}
                      onClick={() => {
                        toggleDrawer1();
                        router.push('/free-courses');
                      }}
                    />
                  )}
                  {menuFlags.testQuizzes && (
                 <CustomTreeItem
                  itemId="4"
                  label="Test & Quizzes"
                  labelIcon={MyIconActivity}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/quiz-data');
                  }}
                />  
                 )}
                 {menuFlags.videoInsights && (
                 <CustomTreeItem
                  itemId="5"
                  label="Videos Insights"
                  labelIcon={MyIconClipboardData}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/video-insights');
                  }}
                /> 
                 )}
                 {menuFlags.codeInsights && (
                <CustomTreeItem
                  itemId="6"
                  label="Code Insights"
                  labelIcon={MyIconBook}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/code-insights');
                  }}
                />
                 )}
                  {menuFlags.notesInsights && (
                  <CustomTreeItem
                  itemId="8"
                  label="Notes Insights"
                  labelIcon={MyIconBook}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/notes-insights');
                  }}
                />
                 )}
                 {menuFlags.studentInfo && (
                <CustomTreeItem
                  itemId="7"
                  label="Student Info"
                  labelIcon={MyHistoryEduTwoToneIcon}
                  onClick={() => {
                    toggleDrawer1();
                    router.push('/student-info');
                  }}
                />  
                )}
              </MySimpleTreeView>
            </MyPerfectScrollbar>
          </MyDrawer>
        </MyBox>
        <MyCard
          component="div"
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            backgroundColor: 'rgb(238, 242, 246)',
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
    </AuthGuard>
  );
}
