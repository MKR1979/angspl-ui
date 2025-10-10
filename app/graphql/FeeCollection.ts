import gql from 'graphql-tag';

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

