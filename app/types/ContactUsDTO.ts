import BaseDTO from './BaseDTO';
export default interface ContactPointDTO extends BaseDTO {
  id: number;
  email_template_id: number;
  email_template_name: string;
  email_template_body: string;
  email_template_sub: string;
  contact_name: string;
  email: string;
  phone_no: string;
  category_name: string;
  subject: string;
  message: string;
  can_contacted:boolean;
  from_date: Date;
  to_date: Date;
}

export const CONTACT_US: ContactPointDTO = Object.freeze({
  id: 0,
  email_template_id: 0,
  email_template_name: '',
  email_template_body: '',
  email_template_sub: '',
  contact_name: '',
  email: '',
  phone_no: '',
  category_name: '',
  subject: '',
  message: '',
  can_contacted:false,
  from_date: new Date(),
  to_date: new Date(),
  created_at: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  //created_at: new Date(1899, 11, 31),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(1899, 11, 31)
});
