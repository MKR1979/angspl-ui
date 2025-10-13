import BaseDTO from './BaseDTO';

export default interface LocationDTO extends BaseDTO {
  location_name: string;
  description: string;
  capacity: number;
  address: string;
  city_name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_name: string;
  zip_code: string;
  status: string;
}

export const LOCATION: LocationDTO = Object.freeze({
  id: 0,
  location_name: '',
  description: '',
  capacity: 0,
  address: '',
  city_name: '',
  state_id: 0,
  state_code: '',
  state_name: '',
  country_id: 0,
  country_name: '',
  zip_code: '',
  status:'',
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
