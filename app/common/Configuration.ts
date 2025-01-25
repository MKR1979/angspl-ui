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
export const arrDiscountType: any[] = [{ text: 'Fixed' }, { text: 'Percentage' }];

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
export const arrQuoteStatus: any[] = [
  { text: 'Draft' },
  { text: 'Negotiation' },
  { text: 'Delivered' },
  { text: 'On Hold' },
  { text: 'Confirmed' },
  { text: 'Closed Accepted' },
  { text: 'Closed Lost' },
  { text: 'Closed Dead' }
];
export const arrQuoteApprovalStatus: any[] = [{ text: 'Approved' }, { text: 'Not Approved' }];
export const arrOrderStatus: any[] = [{ text: 'Open' }, { text: 'Cancelled' }, { text: 'Invoiced' }, { text: 'Closed' }];
export const arrProvisionalInvoiceStatus: any[] = [{ text: 'Draft' }, { text: 'Cancelled' }, { text: 'Delivered' }];
export const arrInvoiceStatus: any[] = [{ text: 'Open' }, { text: 'Cancelled' }, { text: 'Closed' }];
export const arrDeliverySlipStatus: any[] = [{ text: 'Open' }, { text: 'Cancelled' }, { text: 'Closed' }];

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
