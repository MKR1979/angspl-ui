import BaseDTO from './BaseDTO';

export default interface InvoiceDTO extends BaseDTO {
  invoice_no: string;
  invoice_date: Date;
  customer_id: number;
  customer_name: string;
  contact_id: number;
  contact_name: string;
  due_date: Date;
  notes: string;
  customer_ref_no: string;
  incoterm_id: number;
  incoterm_description: string;
  term_id: number;
  term_description: string;
  billing_address: string;
  billing_city_name: string;
  billing_state_id: number;
  billing_state_code: string;
  billing_state_name: string;
  billing_country_id: number;
  billing_country_name: string;
  billing_zip_code: string;
  shipping_address: string;
  shipping_city_name: string;
  shipping_state_id: number;
  shipping_state_code: string;
  shipping_state_name: string;
  shipping_country_id: number;
  shipping_country_name: string;
  shipping_zip_code: string;
  status: string;
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
  shipping_charges: number;
  shipping_tax_id: number;
  shipping_tax_description: string;
  shipping_tax_amount: number;
  total_amount: number;
  discount_amount: number;
  sub_total_amount: number;
  tax_amount: number;
  grand_total_amount: number;
}

export const INVOICE: InvoiceDTO = Object.freeze({
  id: 0,
  invoice_no: '',
  invoice_date: new Date(1899, 11, 31),
  customer_id: 0,
  customer_name: '',
  contact_id: 0,
  contact_name: '',
  due_date: new Date(1899, 11, 31),
  notes: '',
  customer_ref_no: '',
  incoterm_id: 0,
  incoterm_description: '',
  term_id: 0,
  term_description: '',
  billing_address: '',
  billing_city_name: '',
  billing_state_id: 0,
  billing_state_code: '',
  billing_state_name: '',
  billing_country_id: 0,
  billing_country_name: '',
  billing_zip_code: '',
  shipping_address: '',
  shipping_city_name: '',
  shipping_state_id: 0,
  shipping_state_code: '',
  shipping_state_name: '',
  shipping_country_id: 0,
  shipping_country_name: '',
  shipping_zip_code: '',
  status: '',
  currency_id: 0,
  currency_name: '',
  currency_symbol: '',
  shipping_charges: 0,
  shipping_tax_id: 0,
  shipping_tax_description: '',
  shipping_tax_amount: 0,
  total_amount: 0,
  discount_amount: 0,
  sub_total_amount: 0,
  tax_amount: 0,
  grand_total_amount: 0,
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
