import gql from 'graphql-tag';
export const ADD_SITE_CONFIG = gql`
  mutation addSiteConfig(
    $key: String
    $value: String
    $type: String
    $description: String
    $status: String
    $company_id: Int
    $business_config: jsonb
  ) {
    addSiteConfig(
      addSiteConfigInput: {
        key: $key
        value: $value
        type: $type
        description: $description
        status: $status
        company_id: $company_id
        business_config: $business_config
      }
    )
  }
`;

export const UPDATE_SITE_CONFIG = gql`
  mutation updateSiteConfig(
    $id: Int!
    $key: String
    $value: String
    $type: String
    $description: String
    $status: String
    $company_id: Int
    $business_config: jsonb
  ) {
    updateSiteConfig(
      updateSiteConfigInput: {
        id: $id
        key: $key
        value: $value
        type: $type
        description: $description
        status: $status
        company_id: $company_id
        business_config: $business_config
      }
    )
  }
`;

export const DELETE_SITE_CONFIG = gql`
  mutation deleteSiteConfig($ids: [Int]!, $company_id: Int) {
    deleteSiteConfig(deleteSiteConfigInput: { ids: $ids, company_id: $company_id })
  }
`;

export const SITE_CONFIG_LOOKUP = gql`
  query getSiteConfigLookup {
    getSiteConfigLookup {
      id
      text
    }
  }
`;

export const SITE_CONFIG_LIST = gql`
  query getSiteConfigList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int, $company_id: Int) {
    getSiteConfigList(
      getSiteConfigListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        company_id: $company_id
      }
    ) {
      total_records
      siteConfigs {
        id
        key
        value
        type
        description
        status
        company_id
        company_name
        business_config
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

export const GET_SITE_CONFIG = gql`
  query getSiteConfig($id: Int!, $company_id: Int) {
    getSiteConfig(getSiteConfigInput: { id: $id, company_id: $company_id }) {
      id
      key
      value
      type
      description
      status
      company_id
      company_name
      business_config
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

export const GET_SITE_CONFIG_By_COMPANY = gql`
  query getSiteConfigByCompanyId($company_id: Int!) {
    getSiteConfigByCompanyId(company_id: $company_id) {
      id
      key
      value
      type
      description
      status
      company_id
      company_name
      business_config
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

export const GET_SITE_CONFIG_By_COMPANY_TYPE = gql`
  query getSiteConfigByCompanyType($company_type: String!) {
    getSiteConfigByCompanyType(company_type: $company_type) {
      id
      key
      value
      type
      description
      status
      company_id
      company_name
      business_config
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