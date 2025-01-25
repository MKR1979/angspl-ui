import BaseDTO from './BaseDTO';

export default interface TaskDTO extends BaseDTO {
  subject: string;
  status: string;
  start_date: Date;
  parent_type: string;
  parent_type_id: number;
  parent_type_name: string;
  due_date: Date;
  contact_id: number;
  contact_name: string;
  priority: string;
  description: string;
  assigned_to: number;
  assigned_to_user_name: string;
}

export const TASK: TaskDTO = Object.freeze({
  id: 0,
  subject: '',
  status: '',
  start_date: new Date(1899, 11, 31),
  parent_type: '',
  parent_type_id: 0,
  parent_type_name: '',
  due_date: new Date(1899, 11, 31),
  contact_id: 0,
  contact_name: '',
  priority: '',
  description: '',
  assigned_to: 0,
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
