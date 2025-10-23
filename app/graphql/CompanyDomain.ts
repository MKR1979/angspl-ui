import gql from 'graphql-tag';

export const ADD_COMPANY_DOMAIN = gql`
  mutation addCompanyDomain(
    $company_id: Int!
    $domain_name: String
    $logo_url: String
    $logo_height: Int
    $logo_width: Int
    $status: String
  ) {
    addCompanyDomain(
      addCompanyDomainInput: {
        company_id: $company_id
        domain_name: $domain_name
        logo_url: $logo_url
        logo_height: $logo_height
        logo_width: $logo_width
        status: $status
      }
    )
  }
`;

export const UPDATE_COMPANY_DOMAIN = gql`
  mutation updateCompanyDomain(
    $id: Int!
    $company_id: Int!
    $domain_name: String
    $logo_url: String
    $logo_height: Int
    $logo_width: Int
    $status: String
  ) {
    updateCompanyDomain(
      updateCompanyDomainInput: {
        id: $id
        company_id: $company_id
        domain_name: $domain_name
        logo_url: $logo_url
        logo_height: $logo_height
        logo_width: $logo_width
        status: $status
      }
    )
  }
`;

export const DELETE_COMPANY_DOMAIN = gql`
  mutation deleteCompanyDomain($ids: [Int]!) {
    deleteCompanyDomain(deleteCompanyDomainInput: { ids: $ids })
  }
`;

export const COMPANY_DOMAIN_LOOKUP = gql`
  query getCompanyDomainLookup {
    getCompanyDomainLookup {
      id
      text
    }
  }
`;

export const GET_COMPANY_DOMAIN_NAME_EXIST = gql`
  query getCompanyDomainNameExist($id: Int!, $domain_name: String!) {
    getCompanyDomainNameExist(id: $id, domain_name: $domain_name)
  }
`;

export const COMPANY_DOMAIN_LIST = gql`
  query getCompanyDomainList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCompanyDomainList(
      getCompanyDomainListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      companyDomains {
        id
        company_id
        domain_name
        company_name
        logo_url
        logo_height
        logo_width
        status
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

export const GET_COMPANY_DOMAIN = gql`
  query getCompanyDomain($id: Int!) {
    getCompanyDomain(getCompanyDomainInput: { id: $id }) {
      id
      company_id
      domain_name
      company_name
      logo_url
      logo_height
      logo_width
      status
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

export const GET_COMPANY_DOMAIN_ALL = gql`
  query getCompanyDomainAll {
    getCompanyDomainAll {
      id
      company_id
      domain_name
      company_name
      logo_url
      logo_height
      logo_width
      status
    }
  }
`;
