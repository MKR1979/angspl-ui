import BaseDTO from './BaseDTO';

export default interface EventDTO extends BaseDTO {
  event_name: string;
  start_date_time: Date;
  end_date_time: Date;
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
  budget: number;
  description: string;
  location_id: number;
  location_name: string;
  email_template_id: number;
  email_template_name: string;
  assigned_to: number;
  assigned_to_user_name: string;
  status: string;
}

export const EVENT: EventDTO = Object.freeze({
  id: 0,
  event_name: '',
  start_date_time: new Date(),
  end_date_time: new Date(1899, 11, 31),
  currency_id: 0,
  currency_name: '',
  currency_symbol: '',
  budget: 0,
  description: '',
  location_id: 0,
  location_name: '',
  email_template_id: 0,
  email_template_name: '',
  assigned_to: 0,
  status: 'Active',
  assigned_to_user_name: '',
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
