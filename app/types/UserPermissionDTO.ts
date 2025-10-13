import BaseDTO from './BaseDTO';
//import LookupDTO from './LookupDTO';

export default interface UserPermissionDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name: string;
  module_id: number | null;
  module_name: string;
  option_id: number;
  option_name: string;
  grant: boolean;
  permission_source: string;
  //courseLookupDTO: LookupDTO | null;
}

export const USER_PERMISSION: UserPermissionDTO = {
  id: 0,
  user_id: null,
  user_name: '',
  module_id: null,
  module_name: '',
  option_id: 0,
  option_name: '',
  grant: false,
  permission_source: '',
  //courseLookupDTO: { id: 0, text: '' },
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
