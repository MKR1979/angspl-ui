import BaseDTO from './BaseDTO';

export default interface UserDTO extends BaseDTO {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  user_name: string;
  password: string;
  confirm_password: string;
  timezone_offset: number;
  status: string;
  role_id: number;
  role_name: string;
  image_url: string;
}

export const USER: UserDTO = Object.freeze({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  mobile_no: '',
  user_name: '',
  password: '',
  confirm_password: '',
  timezone_offset: 0,
  status: ' ',
  role_id: 0,
  role_name: '',
  image_url: '',
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
