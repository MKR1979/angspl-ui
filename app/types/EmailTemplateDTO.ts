import BaseDTO from './BaseDTO';

export default interface EmailTemplateDTO extends BaseDTO {
  id: number;
  user_id: number;
  email_template_name: string;
  email_template_body: string;
  email_template_sub: string;
  status: string;
}

export const EMAIL_TEMPLATE: EmailTemplateDTO = Object.freeze({
  id: 0,
  user_id: 0,
  email_template_name: '',
  email_template_body: '',
  email_template_sub: '',
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
