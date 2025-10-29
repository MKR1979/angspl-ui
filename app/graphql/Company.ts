import gql from 'graphql-tag';

export const ADD_COMPANY = gql`
  mutation addCompany(
    $company_code: String
    $company_name: String!
    $company_type: String
    $email: String
    $phone_no: String
    $address: String
    $status: String
    $undertaking: String
    $user_password: String!
  ) {
    addCompany(
      addCompanyInput: {
        company_code: $company_code
        company_name: $company_name
        company_type: $company_type
        email: $email
        phone_no: $phone_no
        address: $address
        status: $status
        undertaking: $undertaking
        user_password: $user_password
      }
    )
  }
`;

export const ADD_COMPANY_RETURN_ID = gql`
  mutation addCompanyReturnId(
    $company_code: String
    $company_name: String!
    $company_type: String
    $email: String
    $phone_no: String
    $address: String
    $logo_url: String
    $logo_height: Int
    $logo_width: Int
    $home_img: String
    $about_img: String
    $status: String
    $undertaking: String
    $user_password: String!
    $domain_name: String
    $source_flag: String
    $customer_site_config: jsonb
  ) {
    addCompanyReturnId(
      addCompanyReturnIdInput: {
        company_code: $company_code
        company_name: $company_name
        company_type: $company_type
        email: $email
        phone_no: $phone_no
        address: $address
        logo_url: $logo_url
        logo_height: $logo_height
        logo_width: $logo_width
        home_img: $home_img
        about_img: $about_img
        status: $status
        undertaking: $undertaking
        user_password: $user_password
        domain_name: $domain_name
        source_flag: $source_flag
        customer_site_config: $customer_site_config
      }
    )
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany(
    $id: Int!
    $company_code: String
    $company_name: String!
    $company_type: String
    $email: String
    $phone_no: String
    $address: String
    $status: String
     $undertaking: String
  ) {
    updateCompany(
      updateCompanyInput: {
        id: $id
        company_code: $company_code
        company_name: $company_name
        company_type: $company_type
        email: $email
        phone_no: $phone_no
        address: $address
        status: $status
        undertaking: $undertaking
      }
    )
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($ids: [Int]!) {
    deleteCompany(deleteCompanyInput: { ids: $ids })
  }
`;

export const COMPANY_LOOKUP = gql`
  query getCompanyLookup {
    getCompanyLookup {
      id
      text
    }
  }
`;

export const COMPANY_LIST = gql`
  query getCompanyList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCompanyList(
      getCompanyListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      companies {
        id
        company_code
        company_name
        company_type
        email
        phone_no
        address
        logo_url
        logo_height
        logo_width
        home_img
        about_img
        status
        undertaking
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

export const GET_COMPANY = gql`
  query getCompany($id: Int!) {
    getCompany(getCompanyInput: { id: $id }) {
      id
      company_code
      company_name
      company_type
      email
      phone_no
      address
      logo_url
      logo_height
      logo_width
      home_img
      about_img
      status
      undertaking
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

export const GET_COMPANY_ALL = gql`
  query getCompanyAll {
    getCompanyAll {
      id
      company_code
      company_name
      company_type
      email
      phone_no
      address
      logo_url
      logo_height
      logo_width
      home_img
      about_img
      status
      undertaking
    }
  }
`;

export const GET_COMPANY_INFO_BY_DOMAIN = gql`
  query getCompanyInfoByDomain($domain_name: String) {
    getCompanyInfoByDomain(domain_name: $domain_name)
    { 
    id
    company_id
    domain_name 
    company_name
    company_type
    company_email
    company_phone_no
    company_address
    logo_url
    logo_height
    logo_width
    home_img
    about_img
    status
    role_id
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

export const GET_COMPANY_NAME_EXIST = gql`
  query getCompanyNameExist($id: Int!, $company_name: String!) {
    getCompanyNameExist(id: $id, company_name: $company_name)
  }
`;

export const GET_COMPANY_CODE_EXIST = gql`
  query getCompanyCodeExist($id: Int!, $company_code: String!) {
    getCompanyCodeExist(id: $id, company_code: $company_code)
  }
`;

export const GET_COMPANY_EMAIL_EXIST = gql`
  query getCompanyEmailExist($id: Int!, $email: String!) {
    getCompanyEmailExist(id: $id, email: $email)
  }
`;

export const GET_COMPANY_PHONE_NO_EXIST = gql`
  query getCompanyPhoneNoExist($id: Int!, $phone_no: String!) {
    getCompanyPhoneNoExist(id: $id,  phone_no: $phone_no)
  }
`;
