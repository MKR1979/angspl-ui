import BaseDTO from './BaseDTO';
export default interface EmailDTO extends BaseDTO {
  id: number;
  to_address: string;
  subject: string;
  body: string;
  template_name: string;
  attachment_path: string;
  status: string;
  retry_count: number;
  sent_at: Date;
  from_date: Date;
  to_date: Date;
  email_id: number;
  otp: string;
  purpose: string;
  is_verified: boolean;
  verified_at: Date | null;
  expires_at: Date;
}

export const EMAIL: EmailDTO = Object.freeze({
  id: 0,
  to_address: '',
  subject: '',
  body: '',
  template_name: '',
  attachment_path: '',
  status: '',
  retry_count: 0,
  sent_at: new Date(),
  from_date: new Date(),
  to_date: new Date(),
  email_id: 0,
  otp: '',
  purpose: '',
  is_verified: false,
  verified_at: null,
  expires_at: new Date(),
  created_at: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date()
});
