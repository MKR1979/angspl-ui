import gql from 'graphql-tag';
export const ADD_PAYMENT_DETAILS = gql`
  mutation addPaymentDetails(
    $first_name: String!
    $last_name: String!
    $email: String!
    $mobile_no: String!
  ) {
    addPaymentDetails(
      addPaymentDetailsInput: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
      }
    )
  }
`;

export const UPDATE_PAYMENT_DETAILS = gql`
  mutation updatePaymentDetails(
    $id: Int!
    $first_name: String!
    $last_name: String!
    $email: String!
    $mobile_no: String!
  ) {
    updatePaymentDetails(
      updatePaymentDetailsInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
      }
    )
  }
`;


export const GET_PAYMENT_DETAILS = gql`
  query getPaymentDetails($id: Int!) {
    getPaymentDetails(getPaymentDetailsInput: { id: $id }) {
      id
      first_name
      last_name
      email
      mobile_no
      created_by
      created_by_first_name
      created_by_last_name
      created_at
      modified_by
      modified_by_first_name
      modified_by_last_name
      modified_at
    }
  }
`;

export const GET_PAYMENT_DETAILS_EMAIL_EXIST = gql`
  query getPaymentDetailsEMailExist($id: Int!, $email: String!) {
    getPaymentDetailsEMailExist(id: $id, email: $email)
  }
`;

export const GET_PAYMENT_DETAILS_MOBILE_NO_EXIST = gql`
  query getPaymentDetailsMobileNoExist($id: Int!,  $mobile_no: String!) {
    getPaymentDetailsMobileNoExist(id: $id, mobile_no: $mobile_no)
  }
`;

