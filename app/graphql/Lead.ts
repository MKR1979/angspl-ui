import gql from 'graphql-tag';
export const ADD_LEAD = gql`
  mutation addLead(
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
    $status: String
    $lead_source_id: Int
    $status_description: String
    $lead_source_description: String
    $amount: Float
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
    addLead(
      addLeadInput: {
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
        status: $status
        lead_source_id: $lead_source_id
        status_description: $status_description
        lead_source_description: $lead_source_description
        amount: $amount
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

export const UPDATE_LEAD = gql`
  mutation updateLead(
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
    $status: String
    $lead_source_id: Int
    $status_description: String
    $lead_source_description: String
    $amount: Float
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
    updateLead(
      updateLeadInput: {
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
        status: $status
        lead_source_id: $lead_source_id
        status_description: $status_description
        lead_source_description: $lead_source_description
        amount: $amount
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

export const DELETE_LEAD = gql`
  mutation deleteLead($ids: [Int]!) {
    deleteLead(deleteLeadInput: { ids: $ids })
  }
`;

export const LEAD_LOOKUP = gql`
  query getLeadLookup {
    getLeadLookup {
      id
      text
    }
  }
`;

export const LEAD_LIST = gql`
  query getLeadList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getLeadList(
      getLeadListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      leads {
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
        status
        lead_source_id
        lead_source_name
        status_description
        lead_source_description
        amount
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

export const GET_LEAD = gql`
  query getLead($id: Int!) {
    getLead(getLeadInput: { id: $id }) {
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
      status
      lead_source_id
      lead_source_name
      status_description
      lead_source_description
      amount
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
