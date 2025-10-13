import BaseDTO from './BaseDTO';

export default interface BulkAttendanceDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name: string;
  from_date: Date;
  to_date: Date;
  time: Date;
  time_in: Date | null;
  time_out: Date | null;
  device_id: string;
  attendance_time: Date;
  latitude: number;
  longitude: number;
  distance_from_office: number;
  is_on_campus: boolean;
  device_info: string;
  ip_address: string;
  remarks: string;
  is_locked: boolean;
  isSelected: boolean;
  source_flag: string;
}

export const BULK_ATTENDANCE: BulkAttendanceDTO = {
  id: 0,
  user_id: null,
  user_name: '',
  from_date: new Date(),
  to_date: new Date(),
  time: new Date(),
  time_in: null,
  time_out: null,
  device_id: '',
  attendance_time: new Date(),
  latitude: 0,
  longitude: 0,
  distance_from_office: 0,
  is_on_campus: false,
  device_info: '',
  ip_address: '',
  remarks: '',
  is_locked: false,
  isSelected: false,
  source_flag: '',
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
