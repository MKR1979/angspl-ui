'use client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
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
import DoneIcon from '@mui/icons-material/Done';
import LockIcon from '@mui/icons-material/Lock';
import MyIconSearch from '../custom-components/MyIconSearch';
import MyIconAdjustmentsHorizontal from '../custom-components/MyIconAdjustmentsHorizontal';
// import MyPerfectScrollbar from '../custom-components/MyPerfectScrollbar ';
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
import MySupervisorAccountIcon from '../custom-components/MySupervisorAccountIcon';
import MyNotificationsIcon from '../custom-components/MyNotificationsIcon';
import MyMoreVertIcon from '../custom-components/MyMoreVertIcon';
import MyArrowDropDownIcon from '../custom-components/MyArrowDropDownIcon';
import MyArrowRightIcon from '../custom-components/MyArrowRightIcon';
import MySimpleTreeView from '../custom-components/MySimpleTreeView';
import { useFirstRender } from '../hooks/useFirstRender';
import AuthGuard from '../auth-guard';
import { useDispatch, useSelector, RootState } from '../store';
import { setToken } from '../store/slices/loginState';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MyControlCameraIcon from '../custom-components/MyControlCameraIcon';
import MyIconDashboard from '../custom-components/MyIconDashboard';
import MyFlagIcon from '../custom-components/MyFlagIcon';
import MyCorporateFareIcon from '../custom-components/MyCorporateFareIcon';
import MyIconUsers from '../custom-components/MyIconUsers';
import MyIconMailbox from '../custom-components/MyIconMailbox';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MyIconActivity from '../custom-components/MyIconActivity';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import HelpCenterTwoToneIcon from '@mui/icons-material/HelpCenterTwoTone';
// import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import SystemUpdateAltTwoToneIcon from '@mui/icons-material/SystemUpdateAltTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import MyIconNews from '../custom-components/MyIconNews';
import * as gConstants from '../constants/constants';
import * as Constants from '../(protected)/constants/constants';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { SnackbarProvider } from '../custom-components/SnackbarProvider';
import { findPermission } from '../common/utility-permission';
import MailIcon from '@mui/icons-material/Mail';
import TodayIcon from '@mui/icons-material/Today';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MapIcon from '@mui/icons-material/Map';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

interface StyledTreeItemProps extends Omit<UseTreeItem2Parameters, 'rootRef' | 'children'>, React.HTMLAttributes<HTMLLIElement> {
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
    removeCookie('Adhyayan-token', { path: '/' });
    dispatch(setToken(''));
  }, [removeCookie, dispatch]);

  const menuId = 'primary-search-account-menu';
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderMenu = isMounted && (
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
      {/* <MyMenuItem>
        <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MyBadge badgeContent={0} color="error">
            <MyMailIcon />
          </MyBadge>
        </MyIconButton>
        <p>Messages</p>
      </MyMenuItem> */}
      <MyMenuItem sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MyBadge badgeContent={0} color="error">
            <MyMailIcon />
          </MyBadge>
        </MyIconButton>
        <MyTypography variant="body2">Messages</MyTypography>
      </MyMenuItem>

      <MyMenuItem>
        <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <MyBadge badgeContent={0} color="error">
            <MyNotificationsIcon />
          </MyBadge>
        </MyIconButton>
        {/* <p>Notifications</p> */}
        <MyTypography variant="body2">Notifications</MyTypography>
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
        {/* <p>Profile</p> */}
        <MyTypography variant="body2">Profile</MyTypography>
      </MyMenuItem>
    </MyMenu>
  );
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const theme = useTheme();
  //const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const firstRender = useFirstRender();
  // const [open, setOpen] = useState(true);
  const isBelowMinSidebarWidth = useMediaQuery('(max-width: 900px)');
  const [open, setOpen] = useState<boolean | null>(null);
  const sidebarWidth = 'clamp(220px, 20vw, 300px)';

  useEffect(() => {
    if (open === null) {
      setOpen(!matchDownMd);
    }
  }, [matchDownMd, open]);

  useEffect(() => {
    if (isBelowMinSidebarWidth) {
      setOpen(false);
    }
  }, [isBelowMinSidebarWidth]);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };
  const toggleDrawer1 = () => {
    if (matchDownMd) {
      setOpen(false);
    }
  };
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { loginUser } = useSelector((state) => state.loginState);
  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true); // ✅ only render client-side
  }, []);
  // Initialize all menus as visible by default
  const menuFlags = {
    dashboard: true,
    courses: true,
    courseTypes: true,
    admissions: true,
    user: true,
    roles: true,
    studyKit: true,
    onlineExams: true,
    quizzes: true,
    quizQuestions: true,
    questionOptions: true,
    importQuizzes: true,
    codeProjects: true,
    videoUploads: true,
    studyNotes: true,
    interviewQuestions: true,
    siteConfigs: true,
    emails: true,
    emailTemplates: true,
    locations: true,
    compaigns: true,
    currencies: true,
    events: true,
    surveys: true,
    countries: true,
    states: true,
    districts: true,
    attendanceSummary: true,
    markAttendance: true,
    lockAttendance: true,
    studentAttendance: true,
    companies: true,
    reviewAttendance: true,
    userDevice: true,
    referrals: true,
    affiliates: true,
    students: true,
    reviewAffiliates: true,
    empPort: true,
    quizResults: true,
    trackPresence: true,
    dailyAttendance: true,
    bulkAttendance: true,
    companyDomains: true,
    attendanceReport: true,
    admissionSummary: true,
    admission: true,
    enrollment: true,
    enquiry: true,
    modules: true,
    type: true,
    options: true,
    userPermission: true,
    rolePermission: true,
    employeeMaster: true,
    admissionSch: true,
    admissionClg: true,
    userAccessManagement: true,
    meetings: true,
    groups: true,
    payments: true,
    paymentCollection: true,
    paymentReceipt: true,
    paymentManagement: true,
    onlineAdmissions: true,
    communications: true,
    engagements: true,
    geography: true,
    feeHead: true
    // Add more keys as needed...
  };

  if (Array.isArray(siteConfig)) {
    siteConfig.forEach((config) => {
      switch (config.key.toUpperCase()) {
        case 'ENABLE_DASHBOARD':
          menuFlags.dashboard = config.value === 'true';
          break;
        case 'ENABLE_COURSE':
          menuFlags.courses = config.value === 'true';
          break;
        case 'ENABLE_COURSE_TYPE':
          menuFlags.courseTypes = config.value === 'true';
          break;
        case 'ENABLE_ADMISSIONS':
          menuFlags.admissions = config.value === 'true';
          break;
        case 'ENABLE_USER':
          menuFlags.user = config.value === 'true';
          break;
        case 'ENABLE_ROLES':
          menuFlags.roles = config.value === 'true';
          break;
        case 'ENABLE_STUDY_KIT':
          menuFlags.studyKit = config.value === 'true';
          break;
        case 'ENABLE_ONLINE_EXAMS':
          menuFlags.onlineExams = config.value === 'true';
          break;
        case 'ENABLE_QUIZZES':
          menuFlags.quizzes = config.value === 'true';
          break;
        case 'ENABLE_QUIZ_QUESTIONS':
          menuFlags.quizQuestions = config.value === 'true';
          break;
        case 'ENABLE_QUESTION_OPTIONS':
          menuFlags.questionOptions = config.value === 'true';
          break;
        case 'ENABLE_IMPORT_QUIZZES':
          menuFlags.importQuizzes = config.value === 'true';
          break;
        case 'ENABLE_CODE_PROJECTS':
          menuFlags.codeProjects = config.value === 'true';
          break;
        case 'ENABLE_VIDEO_UPLOADS':
          menuFlags.videoUploads = config.value === 'true';
          break;
        case 'ENABLE_STUDY_NOTES':
          menuFlags.studyNotes = config.value === 'true';
          break;
        case 'ENABLE_INTERVIEW_QUESTIONS':
          menuFlags.interviewQuestions = config.value === 'true';
          break;
        case 'ENABLE_REFERRALS':
          menuFlags.referrals = config.value === 'true';
          break;
        case 'ENABLE_COMPANIES':
          menuFlags.companies = config.value === 'true';
          break;
        case 'ENABLE_EMAILS':
          menuFlags.emails = config.value === 'true';
          break;
        case 'ENABLE_EMAIL_TEMPLATES':
          menuFlags.emailTemplates = config.value === 'true';
          break;
        case 'ENABLE_LOCATIONS':
          menuFlags.locations = config.value === 'true';
          break;
        case 'ENABLE_EVENTS':
          menuFlags.events = config.value === 'true';
          break;
        case 'ENABLE_COMPAIGNS':
          menuFlags.compaigns = config.value === 'true';
          break;
        case 'ENABLE_EVENTS':
          menuFlags.events = config.value === 'true';
          break;
        case 'ENABLE_SURVEYS':
          menuFlags.surveys = config.value === 'true';
          break;
        case 'ENABLE_COUNTRIES':
          menuFlags.countries = config.value === 'true';
          break;
        case 'ENABLE_CURRENCIES':
          menuFlags.currencies = config.value === 'true';
          break;
        case 'ENABLE_STATES':
          menuFlags.states = config.value === 'true';
          break;
        case 'ENABLE_DISTRICTS':
          menuFlags.districts = config.value === 'true';
          break;
        case 'ENABLE_ATTENDANCE_SUMMARY':
          menuFlags.attendanceSummary = config.value === 'true';
          break;
        case 'ENABLE_MARK_ATTENDANCE':
          menuFlags.markAttendance = config.value === 'true';
          break;
        case 'ENABLE_LOCK_ATTENDANCE':
          menuFlags.lockAttendance = config.value === 'true';
          break;
        case 'ENABLE_STUDENT_ATTENDANCE':
          menuFlags.studentAttendance = config.value === 'true';
          break;
        case 'ENABLE_REVIEW_ATTENDANCE':
          menuFlags.reviewAttendance = config.value === 'true';
          break;
        case 'ENABLE_USER_DEVICE':
          menuFlags.userDevice = config.value === 'true';
          break;
        case 'ENABLE_SITE_CONFIGS':
          menuFlags.siteConfigs = config.value === 'true';
          break;
        case 'ENABLE_AFFILIATES':
          menuFlags.affiliates = config.value === 'true';
          break;
        case 'ENABLE_STUDENTS':
          menuFlags.students = config.value === 'true';
          break;
        case 'ENABLE_REVIEW_AFFILIATES':
          menuFlags.reviewAffiliates = config.value === 'true';
          break;
        case 'ENABLE_EMP_PORT':
          menuFlags.empPort = config.value === 'true';
          break;
        case 'ENABLE_QUIZ_RESULTS':
          menuFlags.quizResults = config.value === 'true';
          break;
        case 'ENABLE_TRACK_PRESENCE':
          menuFlags.trackPresence = config.value === 'true';
          break;
        case 'ENABLE_DAILY_ATTENDANCE':
          menuFlags.dailyAttendance = config.value === 'true';
          break;
        case 'ENABLE_MANUAL_ATTENDANCE':
          menuFlags.bulkAttendance = config.value === 'true';
          break;
        case 'ENABLE_COMPANY_DOMAIN':
          menuFlags.companyDomains = config.value === 'true';
          break;
        case 'ENABLE_ATTENDANCE_REPORT':
          menuFlags.attendanceReport = config.value === 'true';
          break;
        case 'ADMISSION_SUMMARY':
          menuFlags.admissionSummary = config.value === 'true';
          break;
        case 'ENABLE_MAIN_ADMISSION':
          menuFlags.admission = config.value === 'true';
          break;
        case 'ENABLE_ENROLLMENT':
          menuFlags.enrollment = config.value === 'true';
          break;
        case 'ENABLE_ENQUIRY':
          menuFlags.enquiry = config.value === 'true';
          break;
        case 'ENABLE_MODULES':
          menuFlags.modules = config.value === 'true';
          break;
        case 'ENABLE_TYPE':
          menuFlags.type = config.value === 'true';
          break;
        case 'ENABLE_OPTIONS':
          menuFlags.options = config.value === 'true';
          break;
        case 'ENABLE_USER_PERMISSION':
          menuFlags.userPermission = config.value === 'true';
          break;
        case 'ENABLE_ROLE_PERMISSION':
          menuFlags.rolePermission = config.value === 'true';
          break;
        case 'ENABLE_EMP_MASTER':
          menuFlags.employeeMaster = config.value === 'true';
          break;
        case 'ENABLE_ADMISSION_SCH':
          menuFlags.admissionSch = config.value === 'true';
          break;
        case 'ENABLE_ADMISSION_CLG':
          menuFlags.admissionClg = config.value === 'true';
          break;
        case 'ENABLE_USER_ACCESS_MANAGE':
          menuFlags.userAccessManagement = config.value === 'true';
          break;
        case 'ENABLE_MEETINGS':
          menuFlags.meetings = config.value === 'true';
          break;
        case 'ENABLE_GROUPS':
          menuFlags.groups = config.value === 'true';
          break;
        case 'ENABLE_PAYMENTS':
          menuFlags.payments = config.value === 'true';
          break;
        case 'ENABLE_PAYMENTS_COLLECTION':
          menuFlags.paymentCollection = config.value === 'true';
          break;
        case 'ENABLE_PAYMENTS_RECEIPT':
          menuFlags.paymentReceipt = config.value === 'true';
          break;
        case 'ENABLE_PAYMENTS_MANAGEMENT':
          menuFlags.paymentManagement = config.value === 'true';
          break;
        case 'ENABLE_ONLINE_ADMISSIONS':
          menuFlags.onlineAdmissions = config.value === 'true';
          break;
        case 'ENABLE_COMMUNICATIONS':
          menuFlags.communications = config.value === 'true';
          break;
        case 'ENABLE_ENGAGEMENTS':
          menuFlags.engagements = config.value === 'true';
          break;
        case 'ENABLE_GEOGRAPHY':
          menuFlags.geography = config.value === 'true';
          break;
        case 'ENABLE_FEE_HEAD':
          menuFlags.feeHead = config.value === 'true';
          break;
        default:
          break;
      }
    });
  }

  // ✅ Don't render UI until companyInfo is ready (fixes hydration mismatch)
  if (!companyInfo?.logo_url) return null;

  return (
    <SnackbarProvider>
      <AuthGuard>
        <MyBox sx={{ mb: 2.5 }}>
          {isMounted && (
            <>
              <MyAppBar position="fixed" elevation={0} sx={{ backgroundColor: '#fff', color: '#000' }}>
                <MyToolbar>
                  <MyBox sx={{ width: 300, display: 'flex' }}>
                    <MyIconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                      onClick={toggleDrawer()}
                    >
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
                      <MyLink href="/dashboard">
                        <MyLogo src={companyInfo.logo_url} height={companyInfo.logo_height} />
                      </MyLink>
                    </MyBox>
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
                              <MyIconButton aria-label="description for action">
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
                                <MyIconAdjustmentsHorizontal id="qsettings" stroke={1.5} size="20px" />
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
                        ml: 2,
                        fontSize: '13px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {/* Welcome, {loginUser} */}
                    </MyTypography>
                  )}
                  <MyBox sx={{ flexGrow: 1 }} />
                  <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <MyBadge badgeContent={0} color="error">
                        <MyMailIcon />
                      </MyBadge>
                    </MyIconButton>
                    <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
                      <MyBadge badgeContent={0} color="error">
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
            </>
          )}
        </MyBox>

        <MyBox sx={{ display: 'flex' }}>
          <MyBox
            component="nav"
            sx={{
              width: open && matchUpMd ? sidebarWidth : 0,
              minWidth: open && matchUpMd ? 220 : 0,
              transition: 'width 0.3s ease-in-out'
            }}
          >
            <MyDrawer
              variant={firstRender ? 'persistent' : matchUpMd ? 'persistent' : 'temporary'}
              // open={open}
              open={!!open}
              onClose={toggleDrawer()}
              sx={{
                width: open && matchUpMd ? sidebarWidth : 0,
                '& .MuiDrawer-paper': {
                  width: open && matchUpMd ? sidebarWidth : 0,
                  minWidth: 220,
                  transition: 'width 0.3s ease-in-out',
                  mt: firstRender ? 11 : open && matchUpMd ? 11 : 0,
                  zIndex: 1099,
                  background: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  borderRight: 'none'
                }
              }}
              ModalProps={{ keepMounted: false }}
            >
              <div
                className="sidebar-scroll"
                style={{
                  overflowY: 'auto',
                  width: sidebarWidth,
                  height: 'calc(100vh - 100px)'
                }}
              >
                {mounted && (
                  <MySimpleTreeView
                    aria-label="gmail"
                    defaultSelectedItems="1"
                    slots={{
                      expandIcon: MyArrowRightIcon,
                      collapseIcon: MyArrowDropDownIcon,
                      endIcon: EndIcon
                    }}
                    sx={{ flexGrow: 1, maxWidth: sidebarWidth }}
                  >
                    {menuFlags.dashboard && (
                      <CustomTreeItem
                        itemId="1"
                        label="Dashboard"
                        labelIcon={MyIconDashboard}
                        onClick={() => {
                          toggleDrawer1();
                          router.push('/dashboard');
                        }}
                      />
                    )}

                    {menuFlags.userAccessManagement && (
                      <CustomTreeItem itemId="2" label="User Access Management" labelIcon={MySupervisorAccountIcon}>
                        {menuFlags.roles && (
                          <CustomTreeItem
                            itemId="2-1"
                            label="Roles"
                            labelIcon={MyControlCameraIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 145)) {
                                router.push('/roles/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.user && (
                          <CustomTreeItem
                            itemId="2-2"
                            label="Users"
                            labelIcon={MyIconUsers}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 195)) {
                                router.push('/users/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.rolePermission && (
                          <CustomTreeItem
                            itemId="2-3"
                            label="Role Permission"
                            labelIcon={AdminPanelSettingsIcon}
                            onClick={() => {
                              toggleDrawer1();
                              router.push('/role-permission');
                              if (findPermission(userPermissions, 140)) {
                                router.push('/role-permission');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.userPermission && (
                          <CustomTreeItem
                            itemId="2-4"
                            label="User Permission"
                            labelIcon={LockPersonIcon}
                            onClick={() => {
                              toggleDrawer1();
                              router.push('/user-permission/list');
                              if (findPermission(userPermissions, 190)) {
                                router.push('/user-permission/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}

                    {menuFlags.students && (
                      <CustomTreeItem itemId="3" label="Academics" labelIcon={SchoolTwoToneIcon}>
                        {menuFlags.courseTypes && (
                          <CustomTreeItem
                            itemId="3-1"
                            label="Course Types"
                            labelIcon={LibraryBooksTwoToneIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 55)) {
                                router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/course-types/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.courses && (
                          <CustomTreeItem
                            itemId="3-2"
                            label="Courses"
                            labelIcon={LibraryBooksTwoToneIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 55)) {
                                router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/courses/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.onlineAdmissions && (
                          <CustomTreeItem itemId="3-3" label="Online Admission" labelIcon={GroupAddIcon}>
                            {menuFlags.admissionSch && (
                              <CustomTreeItem
                                itemId="3-3-1"
                                label="Admission"
                                labelIcon={GroupAddIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 223)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-sch/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.admissionClg && (
                              <CustomTreeItem
                                itemId="3-3-2"
                                label="Admission"
                                labelIcon={GroupAddIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 223)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-clg/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.admissions && (
                              <CustomTreeItem
                                itemId="3-3-3"
                                label="Admission"
                                labelIcon={MyIconUsers}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 5)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admissions-tech/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.enrollment && (
                              <CustomTreeItem
                                itemId="3-3-4"
                                label="Enrollments"
                                labelIcon={MyIconMailbox}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 70)) {
                                    router.push('/enrollments/list');
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.admissionSummary && (
                              <CustomTreeItem
                                itemId="3-3-5"
                                label="Admission Summary"
                                labelIcon={MyIconUsers}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 25)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-summary/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                          </CustomTreeItem>
                        )}
                        {menuFlags.studyKit && (
                          <CustomTreeItem itemId="3-5" label="Study Kits" labelIcon={AutoStoriesTwoToneIcon}>
                            {menuFlags.codeProjects && (
                              <CustomTreeItem
                                itemId="3-5-1"
                                label="Code Projects"
                                labelIcon={CodeTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 35)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/code-projects/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.studyNotes && (
                              <CustomTreeItem
                                itemId="3-5-2"
                                label="Study Notes"
                                labelIcon={StickyNote2TwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 165)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/study-notes/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.videoUploads && (
                              <CustomTreeItem
                                itemId="3-5-3"
                                label="Upload Videos"
                                labelIcon={MyIconActivity}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 180)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/video-uploads/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.interviewQuestions && (
                              <CustomTreeItem
                                itemId="3-5-4"
                                label="Interview Questions"
                                labelIcon={QuestionAnswerIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 180)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/interview-questions/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                          </CustomTreeItem>
                        )}
                        {menuFlags.onlineExams && (
                          <CustomTreeItem itemId="3-6" label="Online Exams" labelIcon={SchoolTwoToneIcon}>
                            {menuFlags.quizzes && (
                              <CustomTreeItem
                                itemId="3-6-1"
                                label="Add Exam"
                                labelIcon={FactCheckTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 120)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quizzes/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.quizQuestions && (
                              <CustomTreeItem
                                itemId="3-6-2"
                                label="Exam Questions"
                                labelIcon={HelpCenterTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 125)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/quiz-question/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.importQuizzes && (
                              <CustomTreeItem
                                itemId="3-6-3"
                                label="Import Exams"
                                labelIcon={SystemUpdateAltTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 85)) {
                                    router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/import-quizzes`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.quizResults && (
                              <CustomTreeItem
                                itemId="3-6-4"
                                label="Exam Results"
                                labelIcon={FactCheckTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 75)) {
                                    router.push('/quiz-results/list');
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                          </CustomTreeItem>
                        )}
                      </CustomTreeItem>
                    )}
                    {menuFlags.empPort && (
                      <CustomTreeItem itemId="4" label="Employee Services" labelIcon={MySupervisorAccountIcon}>
                        {menuFlags.employeeMaster && (
                          <CustomTreeItem
                            itemId="4-1"
                            label="Employee Master"
                            labelIcon={GroupAddIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 135)) {
                                router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.reviewAttendance && (
                          <CustomTreeItem
                            itemId="4-2"
                            label="Review Attendance "
                            labelIcon={HowToRegIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 135)) {
                                router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.attendanceReport && (
                          <CustomTreeItem itemId="4-3" label="Attendance Report" labelIcon={MySupervisorAccountIcon}>
                            {menuFlags.attendanceSummary && (
                              <CustomTreeItem
                                itemId="4-3-1"
                                label="Time Log Report"
                                labelIcon={FactCheckTwoToneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 170)) {
                                    router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/attendance-summary/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.dailyAttendance && (
                              <CustomTreeItem
                                itemId="4-3-2"
                                label="Day-wise Attendance"
                                labelIcon={InsertChartIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 65)) {
                                    router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/daily-attendance/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.trackPresence && (
                              <CustomTreeItem
                                itemId="4-3-3"
                                label="Presence Overview"
                                labelIcon={EditNoteIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 110)) {
                                    router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/track-presence/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                          </CustomTreeItem>
                        )}
                        {menuFlags.userDevice && (
                          <CustomTreeItem
                            itemId="4-4"
                            label="User Device"
                            labelIcon={PhoneIphoneIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 185)) {
                                router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.bulkAttendance && (
                          <CustomTreeItem itemId="4-5" label="Bulk Attendance" labelIcon={MySupervisorAccountIcon}>
                            {menuFlags.markAttendance && (
                              <CustomTreeItem
                                itemId="4-5-1"
                                label="Mark Attendance"
                                labelIcon={DoneIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 20)) {
                                    router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/bulk-attendance/mark-attendance/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                            {menuFlags.lockAttendance && (
                              <CustomTreeItem
                                itemId="4-5-2"
                                label="Lock Attendance"
                                labelIcon={LockIcon}
                                onClick={() => {
                                  toggleDrawer1();
                                  if (findPermission(userPermissions, 20)) {
                                    router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/bulk-attendance/lock-attendance/list`);
                                  } else {
                                    router.push('/access-denied');
                                  }
                                }}
                              />
                            )}
                          </CustomTreeItem>
                        )}
                        {menuFlags.studentAttendance && (
                          <CustomTreeItem
                            itemId="4-6"
                            label="Student Attendance"
                            labelIcon={HowToRegIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 20)) {
                                router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/student-attendance/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}
                    {menuFlags.paymentManagement && (
                      <CustomTreeItem itemId="5" label="Payment Management" labelIcon={AccountBalanceWalletIcon}>
                        {menuFlags.payments && (
                          <CustomTreeItem
                            itemId="5-1"
                            label="Schedule Fee"
                            labelIcon={FactCheckTwoToneIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 150)) {
                                router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.paymentCollection && (
                          <CustomTreeItem
                            itemId="5-2"
                            label="Collect Pay"
                            labelIcon={RequestQuoteIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 150)) {
                                router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.paymentReceipt && (
                          <CustomTreeItem
                            itemId="5-3"
                            label="Receipts"
                            labelIcon={ReceiptLongIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 150)) {
                                router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/payment-receipt/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.feeHead && (
                          <CustomTreeItem
                            itemId="5-4"
                            label="Fee Head"
                            labelIcon={MyIconNews}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 150)) {
                                router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}
                    {menuFlags.communications && (
                      <CustomTreeItem itemId="6" label="Communications" labelIcon={MyIconActivity}>
                        {menuFlags.emailTemplates && (
                          <CustomTreeItem
                            itemId="6-1"
                            label="Email Templates"
                            labelIcon={MailIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/email-templates/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.emailTemplates && (
                          <CustomTreeItem
                            itemId="6-2"
                            label="Notifications"
                            labelIcon={MailIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/notifications/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.emails && (
                          <CustomTreeItem
                            itemId="6-3"
                            label="Emails"
                            labelIcon={MailIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/email/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}

                    {menuFlags.engagements && (
                      <CustomTreeItem itemId="7" label="Engagements" labelIcon={MySupervisorAccountIcon}>
                        {menuFlags.enquiry && (
                          <CustomTreeItem
                            itemId="7-1"
                            label="Enquiry"
                            labelIcon={MyIconMailbox}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 70)) {
                                router.push('/enquiry/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}

                        {menuFlags.events && (
                          <CustomTreeItem
                            itemId="7-2"
                            label="Events"
                            labelIcon={TodayIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/events/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.meetings && (
                          <CustomTreeItem
                            itemId="7-3"
                            label="Meetings"
                            labelIcon={TodayIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/meetings/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}
                    {menuFlags.geography && (
                      <CustomTreeItem itemId="8" label="Geography" labelIcon={MySupervisorAccountIcon}>
                        {menuFlags.countries && (
                          <CustomTreeItem
                            itemId="8-1"
                            label="Countries"
                            labelIcon={MyFlagIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 50)) {
                                router.push('/countries/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.states && (
                          <CustomTreeItem
                            itemId="8-2"
                            label="States"
                            labelIcon={MyCorporateFareIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 160)) {
                                router.push('/states/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.districts && (
                          <CustomTreeItem
                            itemId="8-3"
                            label="Districts"
                            labelIcon={MapIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 160)) {
                                router.push('/districts/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.locations && (
                          <CustomTreeItem
                            itemId="8-4"
                            label="Locations"
                            labelIcon={LocationOnIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 226)) {
                                router.push('/locations/list');
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}

                    {menuFlags.groups && (
                      <CustomTreeItem
                        itemId="9"
                        label="Groups"
                        labelIcon={TodayIcon}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 226)) {
                            router.push('/groups/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}

                    {menuFlags.companies && (
                      <CustomTreeItem
                        itemId="10"
                        label="Company"
                        labelIcon={MyIconMailbox}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 40)) {
                            router.push('/companies/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.companyDomains && (
                      <CustomTreeItem
                        itemId="11"
                        label="Company Domains"
                        labelIcon={MyIconMailbox}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 45)) {
                            router.push('/company-domains/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.currencies && (
                      <CustomTreeItem
                        itemId="12"
                        label="Currencies"
                        labelIcon={CurrencyRupeeIcon}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 60)) {
                            router.push('/currencies/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.modules && (
                      <CustomTreeItem
                        itemId="13"
                        label="Modules"
                        labelIcon={WidgetsIcon}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 90)) {
                            router.push('/modules/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.type && (
                      <CustomTreeItem
                        itemId="14"
                        label="Types"
                        labelIcon={SupervisedUserCircleIcon}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 175)) {
                            router.push('/type/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.options && (
                      <CustomTreeItem
                        itemId="15"
                        label="Options"
                        labelIcon={SettingsApplicationsIcon}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 100)) {
                            router.push('/options/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.siteConfigs && (
                      <CustomTreeItem
                        itemId="16"
                        label="Site Configs"
                        labelIcon={MyIconNews}
                        onClick={() => {
                          toggleDrawer1();
                          if (findPermission(userPermissions, 150)) {
                            router.push('/site-config/list');
                          } else {
                            router.push('/access-denied');
                          }
                        }}
                      />
                    )}
                    {menuFlags.affiliates && (
                      <CustomTreeItem itemId="17" label="Affiliates" labelIcon={MySupervisorAccountIcon}>
                        {menuFlags.reviewAffiliates && (
                          <CustomTreeItem
                            itemId="17-1"
                            label="Review Affiliates"
                            labelIcon={MyIconUsers}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 130)) {
                                router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/review-affiliates/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                        {menuFlags.referrals && (
                          <CustomTreeItem
                            itemId="17-2"
                            label="Referrals"
                            labelIcon={GroupAddIcon}
                            onClick={() => {
                              toggleDrawer1();
                              if (findPermission(userPermissions, 209)) {
                                router.push(`/${Constants.ADMIN_AFFILIATE_DASHBOARD}/referrals/list`);
                              } else {
                                router.push('/access-denied');
                              }
                            }}
                          />
                        )}
                      </CustomTreeItem>
                    )}
                  </MySimpleTreeView>
                )}
              </div>
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
              //width: 'calc(100vw - ' + (firstRender ? 300 : matchUpMd ? 300 : 0) + 'px'
              width: `calc(100vw - ${open ? 300 : 0}px)`
            }}
          >
            <MyCard
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
            </MyCard>
          </MyCard>
        </MyBox>
      </AuthGuard>
    </SnackbarProvider>
  );
}
