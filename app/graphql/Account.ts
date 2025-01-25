import gql from 'graphql-tag';
export const ADD_ACCOUNT = gql`
  mutation addAccount(
    $account_name: String!
    $website: String
    $email: String
    $phone_no: String
    $fax_no: String
    $billing_address: String
    $billing_city_name: String
    $billing_state_id: Int
    $billing_country_id: Int
    $billing_zip_code: String
    $shipping_address: String
    $shipping_city_name: String
    $shipping_state_id: Int
    $shipping_country_id: Int
    $shipping_zip_code: String
    $description: String
    $assigned_to: Int
    $account_type_id: Int
    $industry_id: Int
    $annual_revenue: Float
    $head_count: Int
  ) {
    addAccount(
      addAccountInput: {
        account_name: $account_name
        website: $website
        email: $email
        phone_no: $phone_no
        fax_no: $fax_no
        billing_address: $billing_address
        billing_city_name: $billing_city_name
        billing_state_id: $billing_state_id
        billing_country_id: $billing_country_id
        billing_zip_code: $billing_zip_code
        shipping_address: $shipping_address
        shipping_city_name: $shipping_city_name
        shipping_state_id: $shipping_state_id
        shipping_country_id: $shipping_country_id
        shipping_zip_code: $shipping_zip_code
        description: $description
        assigned_to: $assigned_to
        account_type_id: $account_type_id
        industry_id: $industry_id
        annual_revenue: $annual_revenue
        head_count: $head_count
      }
    )
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $id: Int!
    $account_name: String!
    $website: String
    $email: String
    $phone_no: String
    $fax_no: String
    $billing_address: String
    $billing_city_name: String
    $billing_state_id: Int
    $billing_country_id: Int
    $billing_zip_code: String
    $shipping_address: String
    $shipping_city_name: String
    $shipping_state_id: Int
    $shipping_country_id: Int
    $shipping_zip_code: String
    $description: String
    $assigned_to: Int
    $account_type_id: Int
    $industry_id: Int
    $annual_revenue: Float
    $head_count: Int
  ) {
    updateAccount(
      updateAccountInput: {
        id: $id
        account_name: $account_name
        website: $website
        email: $email
        phone_no: $phone_no
        fax_no: $fax_no
        billing_address: $billing_address
        billing_city_name: $billing_city_name
        billing_state_id: $billing_state_id
        billing_country_id: $billing_country_id
        billing_zip_code: $billing_zip_code
        shipping_address: $shipping_address
        shipping_city_name: $shipping_city_name
        shipping_state_id: $shipping_state_id
        shipping_country_id: $shipping_country_id
        shipping_zip_code: $shipping_zip_code
        description: $description
        assigned_to: $assigned_to
        account_type_id: $account_type_id
        industry_id: $industry_id
        annual_revenue: $annual_revenue
        head_count: $head_count
      }
    )
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($ids: [Int]!) {
    deleteAccount(deleteAccountInput: { ids: $ids })
  }
`;

export const ACCOUNT_LOOKUP = gql`
  query getAccountLookup {
    getAccountLookup {
      id
      text
    }
  }
`;

export const ACCOUNT_LIST = gql`
  query getAccountList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAccountList(
      getAccountListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      accounts {
        id
        account_name
        website
        email
        phone_no
        fax_no
        billing_address
        billing_city_name
        billing_state_id
        billing_state_code
        billing_state_name
        billing_country_id
        billing_country_name
        billing_zip_code
        shipping_address
        shipping_city_name
        shipping_state_id
        shipping_state_code
        shipping_state_name
        shipping_country_id
        shipping_country_name
        shipping_zip_code
        description
        assigned_to
        assigned_to_first_name
        assigned_to_last_name
        assigned_to_user_name
        account_type_id
        account_type_name
        industry_id
        industry_name
        annual_revenue
        head_count
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

export const GET_ACCOUNT = gql`
  query getAccount($id: Int!) {
    getAccount(getAccountInput: { id: $id }) {
      id
      account_name
      website
      email
      phone_no
      fax_no
      billing_address
      billing_city_name
      billing_state_id
      billing_state_code
      billing_state_name
      billing_country_id
      billing_country_name
      billing_zip_code
      shipping_address
      shipping_city_name
      shipping_state_id
      shipping_state_code
      shipping_state_name
      shipping_country_id
      shipping_country_name
      shipping_zip_code
      description
      assigned_to
      assigned_to_first_name
      assigned_to_last_name
      assigned_to_user_name
      account_type_id
      account_type_name
      industry_id
      industry_name
      annual_revenue
      head_count
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
