import gql from 'graphql-tag';
export const ADD_REFERRAL = gql`
  mutation addReferral(
    $referral_company_name: String
    $referral_date: Date
    $contact_person: String
    $mobile_no: String
    $email: String
    $address: String
    $product_interest: String
    $requirement: String
    $is_paid: Boolean
    $status: String
    $referred_by: Int
    $received_amount: Float
  ) {
    addReferral(
      addReferralInput: {
        referral_company_name: $referral_company_name
        referral_date: $referral_date
        contact_person: $contact_person
        mobile_no: $mobile_no
        email: $email
        address: $address
        product_interest: $product_interest
        requirement: $requirement
        is_paid: $is_paid
        status: $status
        referred_by: $referred_by
        received_amount: $received_amount
      }
    )
  }
`;
export const UPDATE_REFERRAL = gql`
  mutation updateReferral(
    $id: Int!
    $referral_company_name: String
    $referral_date: Date
    $contact_person: String
    $mobile_no: String
    $email: String
    $address: String
    $product_interest: String
    $requirement: String
    $is_paid: Boolean
    $status: String
    $referred_by: Int
    $received_amount: Float
  ) {
    updateReferral(
      updateReferralInput: {
        id: $id
        referral_company_name: $referral_company_name
        referral_date: $referral_date
        contact_person: $contact_person
        mobile_no: $mobile_no
        email: $email
        address: $address
        product_interest: $product_interest
        requirement: $requirement
        is_paid: $is_paid
        status: $status
        referred_by: $referred_by
        received_amount: $received_amount
      }
    )
  }
`;

export const DELETE_REFERRAL = gql`
  mutation deleteReferral($ids: [Int]!) {
    deleteReferral(deleteReferralInput: { ids: $ids })
  }
`;

export const VERIFY_REFERRAL = gql`
  mutation verifyReferral($ids: [Int]!) {
    verifyReferral(verifyReferralInput: { ids: $ids })
  }
`;

export const REFERRAL_LIST_ALL = gql`
  query getReferralListAll {
    getReferralListAll {
      id
      referral_company_name
      referral_date
      contact_person
      mobile_no
      email
      address
      product_interest
      requirement
      is_paid
      status
      referred_by
      received_amount
    }
  }
`;

export const REFERRAL_LIST = gql`
  query getReferralList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getReferralList(
      getReferralListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      referrals {
        id
        referral_company_name
        referral_date
        contact_person
        mobile_no
        email
        address
        product_interest
        requirement
        is_paid
        status
        referred_by
        received_amount
        referred_by_name
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

export const REFERRAL_REVIEW_LIST = gql`
  query getReferralReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getReferralReviewList(
      getReferralReviewListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        user_id: $user_id
      }
    ) {
      total_records
      referrals {
        id
        referral_company_name
        referral_date
        contact_person
        mobile_no
        email
        address
        product_interest
        requirement
        is_paid
        status
        referred_by
        received_amount
        referred_by_name
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

export const GET_REFERRAL = gql`
  query getReferral($id: Int!) {
    getReferral(getReferralInput: { id: $id }) {
      id
      referral_company_name
      referral_date
      contact_person
      mobile_no
      email
      address
      product_interest
      requirement
      is_paid
      status
      referred_by
      received_amount
      referred_by_name
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
      status_history {
        old_status
        new_status
        created_at
      }
    }
  }
`;

export const GET_REFERRAL_SUMMARY = gql`
  query getReferralSummary($from_date: Date, $to_date: Date, $user_id: Int) {
    getReferralSummary(getReferralSummaryInput: { from_date: $from_date, to_date: $to_date, user_id: $user_id }) {
      id
      referral_company_name
      referral_date
      contact_person
      mobile_no
      email
      address
      product_interest
      requirement
      is_paid
      status
      referred_by
      received_amount
    }
  }
`;

export const GET_REFERRAL_EXISTS = gql`
  query getReferralExist($attendance_time: Date, $entry_type: String) {
    getReferralExist(attendance_time: $attendance_time, entry_type: $entry_type)
  }
`;
