import BaseDTO from './BaseDTO';

export default interface RoleDTO extends BaseDTO {
  role_name: string;
  type_id: number;
  type_name: string;
  status: string;
}

export const ROLE: RoleDTO = Object.freeze({
  id: 0,
  role_name: '',
  type_id: 0,
  type_name: '',
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
