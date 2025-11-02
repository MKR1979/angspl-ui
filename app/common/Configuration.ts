import { GridDensity } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const currentYear = new Date().getFullYear();

export const pageSizes: number[] = [5, 10, 20, 30, 40, 50, 100];
export const defaultPageSize: number = 50;
export const density: GridDensity = 'compact';
export type SortDirectionType = 'asc' | 'desc' | null | undefined;
export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
};

export const MAX_COLUMN_WIDTH = 300;

export const regExEMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/;

export const regExUrl =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const arrUserStatus: string[] = ['', 'Registered', 'Active', 'In-active', 'Locked', 'Suspended'];
export const arrProductType: any[] = [{ text: 'Good' }, { text: 'Service' }];
export const arrFeePaymentStatus: any[] = [
  { text: 'Paying Now' },
  { text: 'Assigned' },
  { text: 'In Process' },
  { text: 'Converted' },
  { text: 'Recycled' },
  { text: 'Dead' }
];
export const arrFeePaymentFrequencyMonthly: any[] = [
  { text: 'January' },
  { text: 'February' },
  { text: 'March' },
  { text: 'April' },
  { text: 'May' },
  { text: 'June' },
  { text: 'July' },
  { text: 'August' },
  { text: 'September' },
  { text: 'October' },
  { text: 'November' },
  { text: 'December' }
];

export const arrFeePaymentFrequencyQuarterly: any[] = [
  { text: 'April - June' },
  { text: 'July - September' },
  { text: 'October - December' },
  { text: 'January - March' }
];

export const arrFeePaymentFrequencyHalfYearly: any[] = [
  { text: 'April - September' },
  { text: 'October - March' },
];

export const arrFeePaymentType: any[] = [{ text: 'Monthly' }, { text: 'Quarterly' }, { text: 'Half-Yearly' }, { text: 'Yearly' },];
export const arrFeeCollectionType: any[] = [{ text: 'Cheque' }, { text: 'Card' }, { text: 'UPI' }, { text: 'Online' }, { text: 'Cash' }];

export const arrTaskStatus: any[] = [
  { text: 'Not Started' },
  { text: 'In Progress' },
  { text: 'Completed' },
  { text: 'Pending Input' },
  { text: 'Deferred' }
];

export const arrProductInterest: any[] = [
  { text: 'School' },
  { text: 'College' },
  { text: 'University' },
  { text: 'LMS' },
  { text: 'Inventory' },
  { text: 'CRM' }
];

export const arrPaymentMode: any[] = [{ text: 'Monthly' }, { text: 'Quarterly' }, { text: 'Yearly' }];

export const arrReferralStatus: any[] = [
  { text: 'Created' },
  { text: 'Accepted' },
  { text: 'In-transit' },
  { text: 'Completed' },
  { text: 'Rejected' }
];

export const arrPresenceLookup: any[] = [
  { text: 'All', value: 'All' },
  { text: 'Present', value: 'Present' },
  { text: 'Absent', value: 'Absent' },
  { text: 'Half Day', value: 'Half Day' },
  { text: 'On Leave', value: 'On Leave' }
];

export const arrCourseStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'Coming soon' }];

export const arrDurationUnit: any[] = [{ text: 'Month' }, { text: 'Year' }];

export const arrAttendanceType: any[] = [{ text: 'IN' }, { text: 'OUT' }];

export const arrDeviceMappingType: any[] = [{ text: 'Active' }, { text: 'In-active' }];
export const arrCommonStatus: any[] = [{ text: 'Active' }, { text: 'In-active' }];

export const arrAffiliateStatus: any[] = [{ text: 'Active' }, { text: 'In-active' }];

export const arrCompanyStatus: any[] = [{ text: 'Active' }, { text: 'In-active' }, { text: 'Expired' }, { text: 'Coming soon' }];

export const arrCompanyDomainStatus: any[] = [{ text: 'Active' }, { text: 'In-active' }];

export const arrSiteConfigStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'In-active' }];

export const arrSiteConfigType: any[] = [{ text: 'boolean' }, { text: 'string' }, { text: 'number' }, { text: 'float' }, { text: 'json' }];

export const arrQuizStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'In-active' }, { text: 'Coming soon' }];
export const arrQuizType: any[] = [{ text: 'Practice Exam' }, { text: 'Graded Exam' }];

export const arrCodeProjectStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'In-active' }, { text: 'Coming soon' }];
export const arrModulesStatus: any[] = [{ text: 'Active' }, { text: 'In-active' }];
export const arrStatusLookup: any[] = [{ text: 'Active' }, { text: 'In-active' }];

export const arrPayCollStatusLookup: any[] = [{ text: 'Active' }, { text: 'Partially paid' }, { text: 'Pending' }, { text: 'Paid' }, { text: 'Unpaid' }, { text: 'In-active' }];

export const arrTrackPresenceReportType: any[] = [{ text: 'All' }, { text: 'Present' }, { text: 'Absent' }, { text: 'Incomplete' }];

export const arrEnquiryCategoryType: any[] = [
  { text: 'Admission' },
  { text: 'Career Guidance' },
  { text: 'General Enquiry' },
  { text: 'Job Placement' },
  { text: 'IT Support' },
  { text: 'Sales' },
  { text: 'Internship' }
];

export const arrBulkAttendanceEntryType: any[] = [{ text: 'Check-in' }, { text: 'Check-out' }];

export const arrStudyNotesStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'In-active' }, { text: 'Coming soon' }];

export const arrVideoUploadsStatus: any[] = [{ text: 'Active' }, { text: 'Expired' }, { text: 'In-active' }, { text: 'Coming soon' }];

export const arrQuiz: any[] = [{ text: 'React' }, { text: 'Java' }];

export const arrQuestionLookup: any[] = [{ text: 'React' }, { text: 'Java' }];

export const arrAdmissionStatus: any[] = [
  { text: 'submitted' },
  { text: 'Verified' },
  { text: 'Completed' },
  { text: 'In-active' },
  { text: 'Rejected' },
  { text: 'on-hold' },
  { text: 'pending' },
  { text: 'unpaid' },
  { text: ' paid' }
];

export const arrCourseCategory: any[] = [
  { text: 'AIML' },
  { text: 'Cloud' },
  { text: 'DevOps' },
  { text: 'Infra As Code' },
  { text: 'Dockerization' },
  { text: 'Data Science' },
  { text: 'Kubernetes Orchestration' },
  { text: 'Web App Development' },
  { text: 'Mobile App Development' },
  { text: 'Backend/API Development' },
  { text: 'Database Management' },
  { text: 'GraphQL' },
  { text: 'Registration' },
  { text: 'Class' }
];

export const arrCompanyType: any[] = [
  { text: 'School' },
  { text: 'College' },
  { text: 'Universities' },
  { text: 'Institute' },
  { text: 'Coaching Centre' },
  { text: 'Library' },
  { text: 'Information Technology' },
  { text: 'Manufacturing' },
  { text: 'Pharma / Medical' }
];

export const arrGenderType: any[] = [{ text: 'Male' }, { text: 'Female' }, { text: 'Other' }];
export const arrMaritalStatusType: any[] = [{ text: 'Married' }, { text: 'Unmarried' }];
export const arrCategoryType: any[] = [{ text: 'Gen' }, { text: 'OBC' }, { text: 'SC' }, { text: 'ST' }];
export const arrReligionType: any[] = [{ text: 'Hinduism' }, { text: 'Islam' }, { text: 'Sikhism' }, { text: 'Christian' }];
export const arrBloodGrpType: any[] = [
  { text: 'A+' },
  { text: 'A-' },
  { text: 'B+' },
  { text: 'B-' },
  { text: 'AB+' },
  { text: 'AB-' },
  { text: 'O+' },
  { text: 'O-' }
];
export const arrMediumType: any[] = [{ text: 'English' }, { text: 'Hindi' }];

export const arrStuMasterType: any[] = [{ text: 'Yes' }, { text: 'No' }];
export const arrIIILanType: any[] = [{ text: 'French' }, { text: 'Sanskrit' }, { text: 'Urdu' }];
export const arrIILanType: any[] = [{ text: 'Hindi' }, { text: 'French' }, { text: 'Sanskrit' }];
export const arrStreamType: any[] = [{ text: 'PCM' }, { text: 'PCB' }, { text: 'Commerce' }, { text: 'Humanities' }];
export const arrCourseType: any[] = [{ text: 'Diploma' }, { text: 'Under Graduate (UG)' }, { text: 'Post Graduate (PG)' }, { text: `PHd's` }];
export const arrEntryType: any[] = [{ text: 'Regular' }, { text: 'Lateral' }, { text: 'Private' }];
export const arrHostelType: any[] = [{ text: 'Single occupancy' }, { text: 'Sharing (2 Person)' }, { text: 'Sharing (3 Person)' }];
export const arrTransportRoute: any[] = [{ text: 'Route 1' }, { text: 'Route 2' }, { text: 'Route 3' }, { text: 'Route 4' }];

export const arrSchoolBoardingType: any[] = [
  { text: 'Day Scholar' },
  { text: 'Boarder' },
  { text: 'Weekly Boarder' },
  { text: 'Day Boarder' }
];

export const arrEduBoardType: any[] = [
  { text: 'Madhya Pradesh Board of Secondary Education (MPBSE)' },
  { text: 'Central Board of Secondary Education (CBSE)' },
  { text: 'Indian Certificate of Secondary Education (ICSE)' },
  { text: 'National Institute of Open Schooling (NIOS)' },
  { text: 'International Baccalaureate (IB)' },
  { text: 'Cambridge Assessment International Education (CAIE)' }
];

export const arrEduPassingYearType = Array.from(
  { length: currentYear - 2000 + 1 },
  (_, i) => ({ text: String(currentYear - i) })
);

export const arrSessionYearType = Array.from(
  { length: (currentYear + 1) - 2000 + 1 },
  (_, i) => ({ text: String((currentYear + 1) - i) })
);

export const arrCasePriority: any[] = [{ text: 'High' }, { text: 'Medium' }, { text: 'Low' }];
export const arrCaseStatus: any[] = [{ text: 'New' }, { text: 'Assigned' }, { text: 'Pending Input' }];
export const arrCaseState: any[] = [{ text: 'Open' }, { text: 'Closed' }];

export const arrParentType: any[] = [
  { text: 'Admissions' },
  { text: 'Fee & Payments' },
  { text: 'Attendance Records' },
  { text: 'IT & Technical Support' },
  { text: 'Staff & Employee Info' },
  { text: 'School Administration' },
  { text: 'Online Exams & Tests' },
  { text: 'Report Cards & Grades' },
  { text: 'Feedback & Suggestions' },
  { text: 'School Events & Calendar' },
  { text: 'Homework & Assignments' },
  { text: 'Class Schedule' },
  { text: 'Transport & Bus Info' },
  { text: 'Parent-Teacher Meetings' },
  { text: 'General Inquiry' }
];

export const arrRelatedTo: any[] = [
  { text: 'Vision College' },
  { text: 'DPS School' },
  { text: 'IES College' },
  { text: 'IES School' },
  { text: 'Sharda Vidya Mandir' },
  { text: 'Adhyayan Technology' }
];

export const arrDocumentStatus: any[] = [
  { text: 'Active' },
  { text: 'Draft' },
  { text: 'FAQ' },
  { text: 'Expired' },
  { text: 'Under Review' },
  { text: 'Pending' }
];
export const textToHTML = (value: string | null | undefined) => {
  return value ? value.replaceAll('\n\r', '</br>').replaceAll('\n', '</br>') : '';
};
export const getLocalTime = (utcDate: Date): Date => {
  return dayjs(utcDate).add(-new Date().getTimezoneOffset(), 'm').toDate();
};
export const arrLeadTime: string[] = [
  '1 Day',
  '2 Days',
  '3 Days',
  '4 Days',
  '5 Days',
  '6 Days',
  '1 Week',
  '2 Weeks',
  '3 Weeks',
  '5 Weeks',
  '6 Weeks',
  '7 Weeks',
  '8 Weeks',
  '9 Weeks',
  '10 Weeks',
  '11 Weeks',
  '12 Weeks',
  '13 Weeks',
  '14 Weeks',
  '15 Weeks',
  '16 Weeks'
];
export const arrReminder: any[] = [
  { text: 'None' },
  { text: '15 Minutes' },
  { text: '30 Minutes' },
  { text: '45 Minutes' },
  { text: '1 Hour' },
  { text: '1.5 Hours' },
  { text: '2 Hours' },
  { text: '3 Hours' },
  { text: '6 Hours' },
  { text: '1 Day' },
  { text: '2 Days' },
  { text: '3 Days' },
  { text: '1 Week' }
];
export const arrMeetingStatus: any[] = [{ text: 'Planned' }, { text: 'Held' }, { text: 'Not Held' }];

export const numberFormat = (value: number, decimalPlaces: number) => {
  const p = value.toFixed(decimalPlaces).split('.');
  return (
    p[0].split('').reduceRight(function (acc, num, i, orig) {
      if ('-' === num && 0 === i) {
        return num + acc;
      }
      const pos = orig.length - i - 1;
      return num + (pos && !(pos % 3) ? ',' : '') + acc;
    }, '') + (p[1] ? '.' + p[1] : '')
  );
};

export const capitalizeWords = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);





