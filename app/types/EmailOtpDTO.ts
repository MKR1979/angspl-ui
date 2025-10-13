import BaseDTO from './BaseDTO';

export default interface EmailOtpDTO extends BaseDTO {
  id: number;
  email_id: number;
  to_address: string;
  otp: string;
  purpose: string;
  is_verified: boolean;
  verified_at: Date | null;
  expires_at: Date;
  created_at: Date;
}

export const EMAIL_OTP: EmailOtpDTO = Object.freeze({
  id: 0,
  email_id: 0,
  to_address: '',
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
