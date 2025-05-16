
import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation createOrder($amount: Float!) {
    createOrder(createOrderInput: { amount: $amount }) {
      razorpay_order_id
      amount
      currency
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation addPayment(
    $user_id: Int
    $payee_name: String
    $amount: Float
    $currency: String
    $receipt: String
    $payment_method: String
    $transaction_id: String
    $status: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
  ) {
    addPayment(
      addPaymentInput: {
        user_id: $user_id
        payee_name: $payee_name
        amount: $amount
        currency: $currency
        receipt: $receipt
        payment_method: $payment_method
        transaction_id: $transaction_id
        status: $status
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
      }
    )
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation updatePayment(
    $id: Int!
    $user_id: Int
    $payee_name: String
    $amount: Float
    $currency: String
    $receipt: String
    $payment_method: String
    $transaction_id: String
    $is_captured: Boolean
    $status: String
    $razorpay_order_id: String
    $razorpay_payment_id: String
    $razorpay_signature: String
  ) {
    updatePayment(
      updatePaymentInput: {
        id: $id
        user_id: $user_id
        payee_name: $payee_name
        amount: $amount
        currency: $currency
        receipt: $receipt
        payment_method: $payment_method
        transaction_id: $transaction_id
        is_captured: $is_captured
        status: $status
        razorpay_order_id: $razorpay_order_id
        razorpay_payment_id: $razorpay_payment_id
        razorpay_signature: $razorpay_signature
      }
    )
  }
`;

export const DELETE_PAYMENT = gql`
  mutation deletePayment($ids: [Int]!) {
    deletePayment(deletePaymentInput: { ids: $ids})
  } 
`;

export const GET_PAYMENT = gql`
  query getPayment($id: Int!) {
    getPayment(getPaymentInput: { id: $id }) {
      id
      user_id
      payee_name
      amount
      currency
      receipt
      payment_method
      transaction_id
      is_captured
      status
      razorpay_order_id
      razorpay_payment_id
      razorpay_signature
      created_at
      modified_at
    }
  }
`;
