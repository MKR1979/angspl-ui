import BaseDTO from './BaseDTO';

export default interface SendEmailDTO extends BaseDTO {
  email: string;
  mobile_no: string;
  user_name: string;
  confirm_password: string;
  timezone_offset: number;
  email_template_id: number;
  email_template_name: string;
  email_template_body: string;
  email_template_sub: string;
  external_emails: string;
  status: string;
  role_id: number | null;
  role_name: string;
  type_id: number | null;
  type_name: string;
}

export const  SEND_EMAILS = Object.freeze({
  id: 0,
  email: '',
  mobile_no: '',
  user_name: '',
  confirm_password: '',
  timezone_offset: 0,
  email_template_name: '',
  email_template_id:  0,
  email_template_body: '',
  email_template_sub: '',
  external_emails: '',
  status: '',
  role_id: null,
  role_name: '',
  type_id: null,
  type_name: '',
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
