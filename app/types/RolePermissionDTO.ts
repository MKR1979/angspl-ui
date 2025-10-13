import BaseDTO from './BaseDTO';

export default interface RolePermissionDTO extends BaseDTO {
  id: number;
  role_id: number;
  role_name: string;
  module_id: number | null;
  module_name: string;
  option_id: number;
  option_name: string;
  grant: boolean;
}

export const ROLE_PERMISSION: RolePermissionDTO = {
  id: 0,
  role_id: 0,
  role_name: '',
  module_id: null,
  module_name: '',
  option_id: 0,
  option_name: '',
  grant: false,
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
};
