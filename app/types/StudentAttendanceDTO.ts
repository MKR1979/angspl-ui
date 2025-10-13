import BaseDTO from './BaseDTO';

export default interface StudentAttendanceDTO extends BaseDTO {
    id: number;
    user_id: number | null;
    user_name: string;
    from_date: Date;
    to_date: Date;
    learner_id: number;
    learner_name: string;
    course_id: number | null;
    course_name: string;
    attendance_time: Date;
    presence: string;
    latitude: number;
    longitude: number;
    distance_from_office: number;
    is_on_campus: boolean;
    device_info: string;
    ip_address: string;
    remarks: string;
    is_locked: boolean;
    isSelected: boolean;
}

export const STUDENT_ATTENDANCE: StudentAttendanceDTO = {
    id: 0,
    user_id: null,
    user_name: '',
    from_date: new Date(),
    to_date: new Date(),
    learner_id: 0,
    learner_name: '',
    course_id: null,
    course_name: '',
    attendance_time: new Date(),
    presence: '',
    latitude: 0,
    longitude: 0,
    distance_from_office: 0,
    is_on_campus: false,
    device_info: '',
    ip_address: '',
    remarks: '',
    is_locked: false,
    isSelected: false,
    created_at: new Date(),
    modified_at: new Date(),
    created_by: 0,
    created_by_first_name: '',
    created_by_last_name: '',
    created_by_user_name: '',
    modified_by: 0,
    modified_by_first_name: '',
    modified_by_last_name: '',
    modified_by_user_name: ''
};
