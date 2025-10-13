import BaseDTO from './BaseDTO';

export default interface UserDeviceDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  name: string;
  from_date: Date;
  to_date: Date;
  device_id:string;
  device_info:string;
  status:string;
  remarks:string;
}

export const USER_DEVICE: UserDeviceDTO = {
  id: 0,
  user_id: null,
  device_id:'',
  name:'',
  from_date: new Date(),
  to_date: new Date(),
  device_info:'',
  status:'',
  remarks:'',
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
