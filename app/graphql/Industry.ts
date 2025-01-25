import gql from 'graphql-tag';
export const ADD_INDUSTRY = gql`
  mutation addIndustry($industry_name: String!) {
    addIndustry(addIndustryInput: { industry_name: $industry_name })
  }
`;

export const UPDATE_INDUSTRY = gql`
  mutation updateIndustry($id: Int!, $industry_name: String!) {
    updateIndustry(updateIndustryInput: { id: $id, industry_name: $industry_name })
  }
`;

export const DELETE_INDUSTRY = gql`
  mutation deleteIndustry($ids: [Int]!) {
    deleteIndustry(deleteIndustryInput: { ids: $ids })
  }
`;

export const INDUSTRY_LOOKUP = gql`
  query getIndustryLookup {
    getIndustryLookup {
      id
      text
    }
  }
`;

export const INDUSTRY_LIST = gql`
  query getIndustryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getIndustryList(
      getIndustryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      industries {
        id
        industry_name
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

export const GET_INDUSTRY = gql`
  query getIndustry($id: Int!) {
    getIndustry(getIndustryInput: { id: $id }) {
      id
      industry_name
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

export const GET_INDUSTRY_INDUSTRY_NAME_EXIST = gql`
  query getIndustryIndustryNameExist($id: Int!, $industry_name: String!) {
    getIndustryIndustryNameExist(id: $id, industry_name: $industry_name)
  }
`;
