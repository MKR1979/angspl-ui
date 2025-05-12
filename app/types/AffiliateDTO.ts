export default interface AffiliateDTO {  
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  user_name: string;
  password: string;
  address: string;
  city_name: string;
  state_id: number;
  state_name: string;
  country_id:  number;
  country_name: string;
  zip_code: string;
  status: string;
  photo_id_url: string;
  created_at: Date;
}

export const AFFILIATE: AffiliateDTO = Object.freeze({
  id: 0,
  first_name:'',
  last_name: '',
  email: '',
  phone_no: '',
  user_name: '',
  password: '',
  address: '',
  city_name: '',
  state_id: 0,
  state_name:'',
  country_id:1, 
  country_name: '', 
  zip_code: '',
  status: '',
  photo_id_url: '',
  created_at: new Date(1899, 11, 31),
});
