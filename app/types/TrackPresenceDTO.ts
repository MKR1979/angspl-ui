import BaseDTO from './BaseDTO';

export default interface TrackPresenceDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name:string;
  from_date: Date;
  to_date: Date;
  time_in: Date;
  time_out: Date;
  device_id:string;
  name: string;
  entry_type: string;
  attendance_time: Date;
  report_type: string;
  
}

export const TRACK_PRESENCE: TrackPresenceDTO = {
  id: 0,
  user_id: null,
  user_name: '',
  from_date: new Date(),
  to_date: new Date(),
  time_in: new Date(),
  time_out: new Date(),
  device_id:'',
  name:  '',
  entry_type: '',
  attendance_time: new Date(),
  report_type: '',
  created_at: new Date(),
  modified_at: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
};