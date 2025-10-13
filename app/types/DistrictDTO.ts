import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface DistrictDTO extends BaseDTO {
  district_name: string;
  district_code: string;
  country_id: number;
  country_name: string;
  state_id: number;
  state_name: string;
  status: string;
  countryLookupDTO: LookupDTO | null;
  stateLookupDTO: LookupDTO | null;
}

export const DISTRICT: DistrictDTO = {
  id: 0,
  district_name: '',
  district_code: '',
  country_id: 0,
  country_name: '',
  state_id: 0,
  state_name: '',
  status: '',
  countryLookupDTO: { id: 0, text: '' },
  stateLookupDTO: { id: 0, text: '' },
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
