import gql from 'graphql-tag';
export const ADD_INCOTERM = gql`
  mutation addIncoterm($incoterm_code: String, $incoterm_description: String) {
    addIncoterm(addIncotermInput: { incoterm_code: $incoterm_code, incoterm_description: $incoterm_description })
  }
`;

export const UPDATE_INCOTERM = gql`
  mutation updateIncoterm($id: Int!, $incoterm_code: String, $incoterm_description: String) {
    updateIncoterm(updateIncotermInput: { id: $id, incoterm_code: $incoterm_code, incoterm_description: $incoterm_description })
  }
`;

export const DELETE_INCOTERM = gql`
  mutation deleteIncoterm($ids: [Int]!) {
    deleteIncoterm(deleteIncotermInput: { ids: $ids })
  }
`;

export const INCOTERM_LOOKUP = gql`
  query getIncotermLookup {
    getIncotermLookup {
      id
      text
    }
  }
`;

export const INCOTERM_LIST = gql`
  query getIncotermList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getIncotermList(
      getIncotermListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      incoterms {
        id
        incoterm_code
        incoterm_description
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

export const GET_INCOTERM = gql`
  query getIncoterm($id: Int!) {
    getIncoterm(getIncotermInput: { id: $id }) {
      id
      incoterm_code
      incoterm_description
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

export const GET_INCOTERM_INCOTERM_CODE_EXIST = gql`
  query getIncotermIncotermCodeExist($id: Int!, $incoterm_code: String!) {
    getIncotermIncotermCodeExist(id: $id, incoterm_code: $incoterm_code)
  }
`;

export const GET_INCOTERM_INCOTERM_DESCRIPTION_EXIST = gql`
  query getIncotermIncotermDescriptionExist($id: Int!, $incoterm_description: String!) {
    getIncotermIncotermDescriptionExist(id: $id, incoterm_description: $incoterm_description)
  }
`;
