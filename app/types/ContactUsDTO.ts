export default interface ContactPointDTO {
  contact_name: string;
  email: string;
  phone_no: string;
  category_name: string;
  subject: string;
  message: string;
}

export const CONTACT_US: ContactPointDTO = Object.freeze({
  id: 0,
  contact_name: '',
  email: '',
  phone_no: '',
  category_name: '',
  subject: '',
  message: '',
  created_at: new Date(1899, 11, 31)
});
