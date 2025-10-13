import gql from 'graphql-tag';
export const ADD_CONTACT_US = gql`
  mutation addContactUs(
    $contact_name: String!
    $email: String!
    $phone_no: String!
    $category_name: String!
    $subject: String!
    $message: String
    $can_contacted: Boolean
    
  ) {
    addContactUs(
      addContactUsInput: {
        contact_name: $contact_name
        email: $email
        phone_no: $phone_no
        category_name: $category_name
        subject: $subject
        message: $message
        can_contacted: $can_contacted
      }
    )
  }
`;

export const DELETE_ENQUIRY = gql`
  mutation deleteEnquiry($ids: [Int]!) {
    deleteEnquiry(deleteEnquiryInput: { ids: $ids })
  }
`;

export const ENQUIRY_LIST = gql`
  query getEnquiryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getEnquiryList(
      getEnquiryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      enquiries {
        id
        contact_name
        email
        phone_no
        category_name
        subject
        message
        can_contacted
        created_by
        created_by_first_name
        created_by_last_name
        created_by_user_name
        created_at
      }
    }
  }
`;

export const GET_ENQUIRY_REVIEW_LIST = gql`
  query getEnquiryReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $category_name: String
  ) {
    getEnquiryReviewList(
      getEnquiryReviewListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        category_name: $category_name
      }
    ) {
      total_records
      enquiries {
        id
        contact_name
        email
        phone_no
        category_name
        subject
        message
        can_contacted
        created_by
        created_by_first_name
        created_by_last_name
        created_by_user_name
        created_at
      }
    }
  }
`;

export const GET_ENQUIRY = gql`
  query getEnquiry($id: Int!) {
    getEnquiry(getEnquiryInput: { id: $id }) {
      id
      contact_name
      email
      phone_no
      category_name
      subject
      message
      can_contacted
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
    }
  }
`;
