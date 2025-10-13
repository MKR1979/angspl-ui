import BaseDTO from './BaseDTO';

export default interface MeetingDTO extends BaseDTO {
  subject: string;
  start_date_time: Date;
  end_date_time: Date;
  location_id: number;
  location_name: string;
  reminder: string;
  description: string;
  parent_type: string;
  parent_type_id: number;
  parent_type_name: string;
  assigned_to: number;
  assigned_to_user_name: string;
  status: string;
}

export const MEETING: MeetingDTO = Object.freeze({
  id: 0,
  subject: '',
  start_date_time: new Date(1899, 11, 31),
  end_date_time: new Date(1899, 11, 31),
  location_id: 0,
  location_name: '',
  reminder: '',
  description: '',
  parent_type: '',
  parent_type_id: 0,
  parent_type_name: '',
  assigned_to: 0,
  assigned_to_user_name: '',
  status: '',
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(1899, 11, 31),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(1899, 11, 31)
});
