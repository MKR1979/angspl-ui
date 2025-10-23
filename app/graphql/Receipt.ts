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



export const GET_COMPANY_PAY_RECEIPT_BY_PAYMENT_ID = gql`
  query getCompanyPayReceiptByPaymentId($payment_id: Int!) {
    getCompanyPayReceiptByPaymentId(getPayReceiptByPaymentIdInput: { payment_id: $payment_id }) {
    id
    company_id
    company_name
    company_code
    company_type
    domain_name
    payment_id
    receipt_number
    fee_amount
    payment_mode
    payment_date
    generated_by
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



export const GET_PAY_RECEIPT_LIST = gql`
  query getPayReceiptList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $course_id: Int
    $learner_id: Int
  ) {
    getPayReceiptList(
      getPayReceiptListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        course_id: $course_id
        learner_id: $learner_id
      }
    ) {
      total_records
      payReceipts {
        id
        course_id
        course_name
        learner_id
        student_name
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
  }
`;

export const GET_PAY_RECEIPT = gql`
  query getPayReceipt($id: Int!) {
    getPayReceipt(getPayReceiptInput: { id: $id }) {
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