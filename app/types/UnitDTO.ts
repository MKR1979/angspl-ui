import BaseDTO from './BaseDTO';

export default interface UnitDTO extends BaseDTO {
  unit_code: string;
  unit_name: string;
}

export const UNIT: UnitDTO = Object.freeze({
  id: 0,
  unit_code: '',
  unit_name: '',
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
