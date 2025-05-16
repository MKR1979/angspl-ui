import BaseDTO from './BaseDTO';

export default interface ForgotPasswordDTO extends BaseDTO {
  email: string;
  user_name: string;
  password: string;
  confirm_password: string;
}

export const FORGOT_PASSWORD: ForgotPasswordDTO = Object.freeze({
  id: 0,
  email: '',
  user_name: '',
  password: '',
  confirm_password: '',
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
