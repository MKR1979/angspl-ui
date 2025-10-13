import { GridDensity } from '@mui/x-data-grid';
import dayjs from 'dayjs';
export const pageSizes: number[] = [5, 10, 20, 30, 40, 50, 100];
export const defaultPageSize: number = 50;
export const density: GridDensity = 'compact';
export type SortDirectionType = 'asc' | 'desc' | null | undefined;
export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
};

export const MAX_COLUMN_WIDTH = 300;

export const regExEMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const regExUrl =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const arrUserStatus: string[] = ['', 'Registered', 'Active', 'Inactive', 'Locked', 'Suspended'];
export const arrProductType: any[] = [{ text: 'Good' }, { text: 'Service' }];
export const arrLeadStatus: any[] = [
  { text: 'New' },
  { text: 'Assigned' },
  { text: 'In Process' },
  { text: 'Converted' },
  { text: 'Recycled' },
  { text: 'Dead' }
];
export const arrTaskStatus: any[] = [
  { text: 'Not Started' },
  { text: 'In Progress' },
  { text: 'Completed' },
  { text: 'Pending Input' },
  { text: 'Deferred' }
];

export const arrCourseStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'Coming soon'}
];

export const arrCompanyStatus: any[] = [
  { text: 'Active' },
  { text: 'In-active' },
  { text: 'Expired' },
  { text: 'Coming soon'}
];

export const arrSiteConfigStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'Coming soon'}
];

export const arrSiteConfigType: any[] = [
  { text: 'boolean' },
  { text: 'string' },
  { text: 'number'}
];

export const arrQuizStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'In-active' },
  { text: 'Coming soon'}
];

export const arrCodeProjectStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'In-active' },
  { text: 'Coming soon'}
];

export const arrStudyNotesStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'In-active' },
  { text: 'Coming soon'}
];

export const arrVideoUploadsStatus: any[] = [
  { text: 'Active' },
  { text: 'Expired' },
  { text: 'In-active' },
  { text: 'Coming soon'}
];

export const arrQuiz: any[] = [
  { text: 'React' },
  { text: 'Java' },
];

export const arrQuestionLookup: any[] = [
  { text: 'React' },
  { text: 'Java' },
];

export const arrAdmissionStatus: any[] = [
  { text: 'submitted' },
  { text: 'Verified' },
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
{ text: 'GraphQL'},
{ text: 'Registration'},
];

export const arrCompanyType: any[] = [
{ text: 'School' },
{ text: 'College' },
{ text: 'Universities' },
{ text: 'Institute' },
{ text: 'Coaching Centre' },
{ text: 'Liberary' },
];

export const arrGenderType: any[] = [
  { text: 'Male' },
  { text: 'Female' },
  { text: 'Other'}
];

export const arrCasePriority: any[] = [{ text: 'High' }, { text: 'Medium' }, { text: 'Low' }];
export const arrCaseStatus: any[] = [{ text: 'New' }, { text: 'Assigned' }, { text: 'Pending Input' }];
export const arrCaseState: any[] = [{ text: 'Open' }, { text: 'Closed' }];

export const arrParentType: any[] = [
  { text: 'Account' },
  { text: 'Contact' },
  { text: 'Opportunity' },
  { text: 'Bug' },
  { text: 'Case' },
  { text: 'Lead' },
  { text: 'Project' },
  { text: 'Project Task' },
  { text: 'Target' },
  { text: 'Contract' },
  { text: 'Invoice' },
  { text: 'Quote' },
  { text: 'Product' }
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

export const capitalizeWords = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const arrEnquiryCategoryType: any[] = [
  { text: 'Admission' },
  { text: 'Career Guidance' },
  { text: 'General Enquiry' },
  { text: 'Job Placement' },
  { text: 'IT Support' },
  { text: 'Sales' },
  { text: 'Internship' }
];

 export const MAIL_CONFIG = {
    smtpHost: 'smtp.gmail.com', 
    smtpPort: 465,
    smtpUser: 'adhyayan.solution@gmail.com',
    smtpPassword: 'bnfwtqfzbcdsdgbd',
    secure: true, 
    fromAddress: 'adhyayan.solution@gmail.com', 
    resendOtpTime: 2 
  };