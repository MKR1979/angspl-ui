export default interface ReceiptDTO {
  id: number;
  admission_date: string;
  course_name: string;
  first_name: string;
  last_name: string;
  price: number;
}

export const RECEIPT: ReceiptDTO = {
  id: 0,
  admission_date: '',
  course_name: '',
  first_name: '',
  last_name: '',
  price: 0
};
