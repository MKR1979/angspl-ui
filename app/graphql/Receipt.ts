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
