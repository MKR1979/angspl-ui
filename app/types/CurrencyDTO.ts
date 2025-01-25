import BaseDTO from './BaseDTO';

export default interface CurrencyDTO extends BaseDTO {
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
}

export const CURRENCY: CurrencyDTO = Object.freeze({
  id: 0,
  currency_code: '',
  currency_name: '',
  currency_symbol: '',
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
