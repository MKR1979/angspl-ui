import BaseDTO from './BaseDTO';

export default interface NoteDTO extends BaseDTO {
  contact_id: number;
  contact_name: string;
  parent_type: string;
  parent_type_id: number;
  parent_type_name: string;
  subject: string;
  note: string;
  file_name: string;
  assigned_to: number;
  assigned_to_user_name: string;
}

export const NOTE: NoteDTO = Object.freeze({
  id: 0,
  contact_id: 0,
  contact_name: '',
  parent_type: '',
  parent_type_id: 0,
  parent_type_name: '',
  subject: '',
  note: '',
  file_name: '',
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
