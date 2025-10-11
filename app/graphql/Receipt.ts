import gql from 'graphql-tag';

export const GET_RECEIPT = gql`
  query getReceipt($id: Int!) {
    getReceipt(getReceiptInput: { id: $id}) {
      id
      admission_date
      course_name
      first_name
      last_name
      price      
    }
  }
`;

export const GET_PAY_RECEIPT_BY_PAYMENT_ID = gql`
  query getPayReceiptByPaymentId($payment_id: Int!) {
    getPayReceiptByPaymentId(getPayReceiptByPaymentIdInput: { payment_id: $payment_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      receipt_number
      payment_date
      payment_mode
      fee_head
      cheque_number
      fee_amount
      remarks
      status
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
      modified_by
      modified_by_first_name
      modified_by_last_name
      modified_by_user_name
      modified_at
    }
  }
`;

export const GET_COM_PAY_RECEIPT_BY_PAYMENT_ID = gql`
  query getComPayReceiptByPaymentId($payment_id: Int!) {
    getComPayReceiptByPaymentId(getPayReceiptByPaymentIdInput: { payment_id: $payment_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      receipt_number
      payment_date
      payment_mode
      fee_head
      cheque_number
      fee_amount
      remarks
      status
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
      modified_by
      modified_by_first_name
      modified_by_last_name
      modified_by_user_name
      modified_at
    }
  }
`;