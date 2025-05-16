import gql from 'graphql-tag';
export const ADD_CONTACT_US = gql`
  mutation addContactUs(
    $contact_name: String!
    $email: String!
    $phone_no: String!
    $category_name: String!
    $subject: String!
    $message: String
  ) {
    addContactUs(
      addContactUsInput: {
        contact_name: $contact_name
        email: $email
        phone_no: $phone_no
        category_name: $category_name
        subject: $subject
        message: $message
      }
    )
  }
`;
