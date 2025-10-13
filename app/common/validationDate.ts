import dayjs from 'dayjs';
import * as gConstants from '../constants/constants';
import * as gMessageConstants from '../constants/messages-constants';
import { getLocalTime } from '@/app/common/Configuration'; // adjust path as per your project


//for Date Of Birth

export function validateDate({
    value,
    minDate = gConstants.DATE_OF_BIRTH2,
    maxYearsAgo = gConstants.DOB_YEAR_NUM,
    label = 'Date of birth',
}: {
    value: any;
    minDate?: string | Date;
    maxYearsAgo?: number;
    label?: string;
}): string | null {
    if (!value || dayjs(getLocalTime(value)).format('MM/DD/YYYY') === '12/31/1899') {
        return `${label} ${gMessageConstants.REQUIRED_FIELD}`;
    }

    const localDate = dayjs(getLocalTime(value));
    const min = dayjs(minDate);
    const max = dayjs().subtract(maxYearsAgo, 'year');

    if (localDate.isBefore(min)) return `${label} is too early`;
    if (localDate.isAfter(max)) return `${label} is too late`;

    return null;
}

//for StarteDate and EndDate 

interface ValidateDateTimeParams {
    startDate?: any;        
    endDate?: any;          
    type?: 'start' | 'end';  
    label?: string;         
    allowPast?: boolean;    
}

export function validateDateTime({
    startDate,
    endDate,
    type = 'start',
    label = 'Date/Time',
    allowPast = false,
}: ValidateDateTimeParams): string | null {
    const start = dayjs(startDate ? getLocalTime(startDate) : null);
    const end = dayjs(endDate ? getLocalTime(endDate) : null);

    //  Required check
    if (!startDate || dayjs(getLocalTime(startDate)).format('MM/DD/YYYY') === '12/31/1899') {
        return `${label} ${gMessageConstants.REQUIRED_FIELD}`;
    }

    //  Valid format check
    if (!start.isValid()) {
        return `${label} ${gMessageConstants.REQUIRED_FIELD}`;
    }

    const now = dayjs();

    //  No past dates (if not allowed)
    if (!allowPast && start.isBefore(now, 'minute')) {
        return `${label} cannot be in the past.`;
    }

    //  Start must be before End
    if (type === 'start' && end.isValid() && start.isAfter(end)) {
        return `${label} must be before End Time.`;
    }

    // End must be after Start
    if (type === 'end' && end.isValid() && start.isValid() && end.isBefore(start, 'minute')) {
        return `${label} cannot be less than Start Time.`;
    }

    return null;
}
