import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface StateDTO extends BaseDTO {
  state_name: string;
  state_code: string;
  country_id: number;
  country_name: string;
  countryLookupDTO: LookupDTO | null;
}

export const STATE: StateDTO = {
  id: 0,
  state_name: '',
  state_code: '',
  country_id: 0,
  country_name: '',
  countryLookupDTO: { id: 0, text: '' },
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
