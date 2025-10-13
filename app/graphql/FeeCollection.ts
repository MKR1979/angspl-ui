import gql from 'graphql-tag';

export const ADD_FEE_COLLECTION = gql`
  mutation addFeeCollection(
    $course_id: Int!
    $learner_id: Int!
    $payment_date: Date
    $payment_mode: String
    $cheque_number: String
    $fee_head_id: Int
    $fee_amount: Float
    $fee_month: String
    $fee_year: Int
    $currency: String
    $transaction_id: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
    $remarks: String
    $status: String
    $breakup_id: Int
  ) {
    addFeeCollection(
      addFeeCollectionInput: {
        course_id: $course_id
        learner_id: $learner_id
        payment_date: $payment_date
        payment_mode: $payment_mode
        cheque_number: $cheque_number
        fee_head_id: $fee_head_id
        fee_amount: $fee_amount
        fee_month: $fee_month
        fee_year: $fee_year
        currency: $currency
        transaction_id: $transaction_id
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
        remarks: $remarks
        status: $status
        breakup_id: $breakup_id
      }
    )
  }
`;

export const ADD_FEE_COLLECT_COMPANY_RETURN_ID = gql`
  mutation addFeeCollectCompanyReturnId(
   $company_id: Int!
    $payment_date: Date
    $payment_mode: String
    $cheque_number: String
    $fee_head_id: Int
    $fee_amount: Float
    $fee_month: String
    $fee_year: Int
    $currency: String
    $transaction_id: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
    $remarks: String
    $status: String
    $breakup_id: Int
    $source_flag: String
  ) {
    addFeeCollectCompanyReturnId(
      addFeeCollectCompanyReturnIdInput: {
      company_id: $company_id  
        payment_date: $payment_date
        payment_mode: $payment_mode
        cheque_number: $cheque_number
        fee_head_id: $fee_head_id
        fee_amount: $fee_amount
        fee_month: $fee_month
        fee_year: $fee_year
        currency: $currency
        transaction_id: $transaction_id
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
        remarks: $remarks
        status: $status
        breakup_id: $breakup_id
        source_flag: $source_flag
      }
    )
  }
`;

export const ADD_FEE_COLLECTION_RETURN_ID = gql`
  mutation addFeeCollectionReturnId(
    $course_id: Int!
    $learner_id: Int!
    $payment_date: Date
    $payment_mode: String
    $cheque_number: String
    $fee_head_id: Int
    $fee_amount: Float
    $fee_month: String
    $fee_year: Int
    $currency: String
    $transaction_id: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
    $remarks: String
    $status: String
    $breakup_id: Int
    $source_flag: String
  ) {
    addFeeCollectionReturnId(
      addFeeCollectionInput: {
        course_id: $course_id
        learner_id: $learner_id
        payment_date: $payment_date
        payment_mode: $payment_mode
        cheque_number: $cheque_number
        fee_head_id: $fee_head_id
        fee_amount: $fee_amount
        fee_month: $fee_month
        fee_year: $fee_year
        currency: $currency
        transaction_id: $transaction_id
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
        remarks: $remarks
        status: $status
        breakup_id: $breakup_id
        source_flag: $source_flag
      }
    )
  }
`;

export const UPDATE_FEE_COLLECTION = gql`
  mutation updateFeeCollection(
    $id: Int!
    $course_id: Int!
    $learner_id: Int!
    $payment_date: Date
    $payment_mode: String
    $cheque_number: String
    $fee_head_id: Int
    $fee_amount: Float
    $fee_month: String
    $fee_year: Int
    $currency: String
    $transaction_id: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
    $remarks: String
    $status: String
  ) {
    updateFeeCollection(
      updateFeeCollectionInput: {
        id: $id
        course_id: $course_id
        learner_id: $learner_id
        payment_date: $payment_date
        payment_mode: $payment_mode
        cheque_number: $cheque_number
        fee_head_id: $fee_head_id
        fee_amount: $fee_amount
        fee_month: $fee_month
        fee_year: $fee_year
        currency: $currency
        transaction_id: $transaction_id
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
        remarks: $remarks
        status: $status
      }
    )
  }
`;

export const GET_FEE_COLLECTION_REVIEW_LIST = gql`
  query getFeeCollectionReviewList(
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
    getFeeCollectionReviewList(
      getFeeCollectionReviewListInput: {
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
      feeCollections {
        id
        course_id
        course_name
        learner_id
        student_name
        payment_date
        payment_mode
        cheque_number
        fee_head_id
        fee_head
        fee_amount
        fee_month
        fee_year
        currency
        transaction_id
        is_captured
        razorpay_order_id
        razorpay_payment_id
        razorpay_signature
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

export const GET_FEE_COLLECTION = gql`
  query getFeeCollection($id: Int!) {
    getFeeCollection(getFeeCollectionInput: { id: $id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_date
      payment_mode
      cheque_number
      fee_head_id
      fee_head
      fee_amount
      fee_month
      fee_year
      currency
      transaction_id
      is_captured
      razorpay_order_id
      razorpay_payment_id
      razorpay_signature
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

export const DELETE_FEE_COLLECTION = gql`
  mutation deleteFeeCollection($ids: [Int]!) {
    deleteFeeCollection(deleteFeeCollectionInput: { ids: $ids })
  }
`;

export const GET_COLLECTION_RECEIPT = gql`
  query getCollectionReceipt($id: Int!) {
    getCollectionReceipt(getCollectionReceiptInput: { id: $id }) {
      id
      student_name
      course_name
      payment_date
      payment_mode
      cheque_number
      fee_head_id
      fee_head
      fee_amount
      fee_month
      fee_year
      remarks
      status
    }
  }
`;
