import gql from 'graphql-tag';
export const ADD_TARGET = gql`
  mutation addTarget(
    $first_name: String
    $last_name: String
    $job_title_name: String
    $department_name: String
    $account_name: String
    $office_phone_no: String
    $mobile_no: String
    $fax_no: String
    $website: String
    $email: String
    $description: String
    $assigned_to: Int
    $referred_by: String
    $primary_address: String
    $primary_city_name: String
    $primary_state_id: Int
    $primary_country_id: Int
    $primary_zip_code: String
    $other_address: String
    $other_city_name: String
    $other_state_id: Int
    $other_country_id: Int
    $other_zip_code: String
  ) {
    addTarget(
      addTargetInput: {
        first_name: $first_name
        last_name: $last_name
        job_title_name: $job_title_name
        department_name: $department_name
        account_name: $account_name
        office_phone_no: $office_phone_no
        mobile_no: $mobile_no
        fax_no: $fax_no
        website: $website
        email: $email
        description: $description
        assigned_to: $assigned_to
        referred_by: $referred_by
        primary_address: $primary_address
        primary_city_name: $primary_city_name
        primary_state_id: $primary_state_id
        primary_country_id: $primary_country_id
        primary_zip_code: $primary_zip_code
        other_address: $other_address
        other_city_name: $other_city_name
        other_state_id: $other_state_id
        other_country_id: $other_country_id
        other_zip_code: $other_zip_code
      }
    )
  }
`;

export const UPDATE_TARGET = gql`
  mutation updateTarget(
    $id: Int!
    $first_name: String
    $last_name: String
    $job_title_name: String
    $department_name: String
    $account_name: String
    $office_phone_no: String
    $mobile_no: String
    $fax_no: String
    $website: String
    $email: String
    $description: String
    $assigned_to: Int
    $referred_by: String
    $primary_address: String
    $primary_city_name: String
    $primary_state_id: Int
    $primary_country_id: Int
    $primary_zip_code: String
    $other_address: String
    $other_city_name: String
    $other_state_id: Int
    $other_country_id: Int
    $other_zip_code: String
  ) {
    updateTarget(
      updateTargetInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        job_title_name: $job_title_name
        department_name: $department_name
        account_name: $account_name
        office_phone_no: $office_phone_no
        mobile_no: $mobile_no
        fax_no: $fax_no
        website: $website
        email: $email
        description: $description
        assigned_to: $assigned_to
        referred_by: $referred_by
        primary_address: $primary_address
        primary_city_name: $primary_city_name
        primary_state_id: $primary_state_id
        primary_country_id: $primary_country_id
        primary_zip_code: $primary_zip_code
        other_address: $other_address
        other_city_name: $other_city_name
        other_state_id: $other_state_id
        other_country_id: $other_country_id
        other_zip_code: $other_zip_code
      }
    )
  }
`;

export const DELETE_TARGET = gql`
  mutation deleteTarget($ids: [Int]!) {
    deleteTarget(deleteTargetInput: { ids: $ids })
  }
`;

export const TARGET_LOOKUP = gql`
  query getTargetLookup {
    getTargetLookup {
      id
      text
    }
  }
`;

export const TARGET_LIST = gql`
  query getTargetList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getTargetList(
      getTargetListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      targets {
        id
        first_name
        last_name
        job_title_name
        department_name
        account_name
        office_phone_no
        mobile_no
        fax_no
        website
        email
        description
        assigned_to
        assigned_to_user_name
        referred_by
        primary_address
        primary_city_name
        primary_state_id
        primary_state_code
        primary_state_name
        primary_country_id
        primary_country_name
        primary_zip_code
        other_address
        other_city_name
        other_state_id
        other_state_code
        other_state_name
        other_country_id
        other_country_name
        other_zip_code
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

export const GET_TARGET = gql`
  query getTarget($id: Int!) {
    getTarget(getTargetInput: { id: $id }) {
      id
      first_name
      last_name
      job_title_name
      department_name
      account_name
      office_phone_no
      mobile_no
      fax_no
      website
      email
      description
      assigned_to
      assigned_to_user_name
      referred_by
      primary_address
      primary_city_name
      primary_state_id
      primary_state_code
      primary_state_name
      primary_country_id
      primary_country_name
      primary_zip_code
      other_address
      other_city_name
      other_state_id
      other_state_code
      other_state_name
      other_country_id
      other_country_name
      other_zip_code
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
