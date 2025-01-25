import gql from 'graphql-tag';
export const ADD_CONTACT = gql`
  mutation addContact(
    $first_name: String
    $last_name: String
    $office_phone_no: String
    $mobile_no: String
    $job_title_name: String
    $department_name: String
    $account_id: Int
    $fax_no: String
    $email: String
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
    $description: String
    $assigned_to: Int
    $lead_source_id: Int
    $reports_to: Int
  ) {
    addContact(
      addContactInput: {
        first_name: $first_name
        last_name: $last_name
        office_phone_no: $office_phone_no
        mobile_no: $mobile_no
        job_title_name: $job_title_name
        department_name: $department_name
        account_id: $account_id
        fax_no: $fax_no
        email: $email
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
        description: $description
        assigned_to: $assigned_to
        lead_source_id: $lead_source_id
        reports_to: $reports_to
      }
    )
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact(
    $id: Int!
    $first_name: String
    $last_name: String
    $office_phone_no: String
    $mobile_no: String
    $job_title_name: String
    $department_name: String
    $account_id: Int
    $fax_no: String
    $email: String
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
    $description: String
    $assigned_to: Int
    $lead_source_id: Int
    $reports_to: Int
  ) {
    updateContact(
      updateContactInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        office_phone_no: $office_phone_no
        mobile_no: $mobile_no
        job_title_name: $job_title_name
        department_name: $department_name
        account_id: $account_id
        fax_no: $fax_no
        email: $email
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
        description: $description
        assigned_to: $assigned_to
        lead_source_id: $lead_source_id
        reports_to: $reports_to
      }
    )
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($ids: [Int]!) {
    deleteContact(deleteContactInput: { ids: $ids })
  }
`;

export const CONTACT_LOOKUP = gql`
  query getContactLookup($account_id: Int!) {
    getContactLookup(account_id: $account_id) {
      id
      text
    }
  }
`;

export const CONTACT_LOOKUP1 = gql`
  query getContactLookup1 {
    getContactLookup1 {
      id
      text
    }
  }
`;

export const CONTACT_LIST = gql`
  query getContactList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getContactList(
      getContactListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      contacts {
        id
        first_name
        last_name
        office_phone_no
        mobile_no
        job_title_name
        department_name
        account_id
        account_name
        fax_no
        email
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
        description
        assigned_to
        assigned_to_user_name
        lead_source_id
        lead_source_name
        reports_to
        reports_to_name
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

export const GET_CONTACT = gql`
  query getContact($id: Int!) {
    getContact(getContactInput: { id: $id }) {
      id
      first_name
      last_name
      office_phone_no
      mobile_no
      job_title_name
      department_name
      account_id
      account_name
      fax_no
      email
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
      description
      assigned_to
      assigned_to_user_name
      lead_source_id
      lead_source_name
      reports_to
      reports_to_name
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
