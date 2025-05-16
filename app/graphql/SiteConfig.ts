import gql from 'graphql-tag';
export const ADD_SITE_CONFIG = gql`
  mutation addSiteConfig($key: String, $value: String, $type: String, $description: String, $status: String) {
    addSiteConfig(addSiteConfigInput: { key: $key, value: $value, type: $type, description: $description, status: $status })
  }
`;

export const UPDATE_SITE_CONFIG = gql`
  mutation updateSiteConfig($id: Int!, $key: String, $value: String, $type: String, $description: String, $status: String) {
    updateSiteConfig(updateSiteConfigInput: { id: $id, key: $key, value: $value, type: $type, description: $description, status: $status })
  }
`;

export const DELETE_SITE_CONFIG = gql`
  mutation deleteSiteConfig($ids: [Int]!) {
    deleteSiteConfig(deleteSiteConfigInput: { ids: $ids })
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
  query getSiteConfigList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getSiteConfigList(
      getSiteConfigListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
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
  query getSiteConfig($id: Int!) {
    getSiteConfig(getSiteConfigInput: { id: $id }) {
      id
      key
      value
      type
      description
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

export const GET_SITE_CONFIG_By_COMPANY = gql`
  query getSiteConfigByCompanyId {
    getSiteConfigByCompanyId {
      id
      key
      value
      type
      description
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
