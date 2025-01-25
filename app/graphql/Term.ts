import gql from 'graphql-tag';
export const ADD_TERM = gql`
  mutation addTerm($term_code: String, $term_description: String) {
    addTerm(addTermInput: { term_code: $term_code, term_description: $term_description })
  }
`;

export const UPDATE_TERM = gql`
  mutation updateTerm($id: Int!, $term_code: String, $term_description: String) {
    updateTerm(updateTermInput: { id: $id, term_code: $term_code, term_description: $term_description })
  }
`;

export const DELETE_TERM = gql`
  mutation deleteTerm($ids: [Int]!) {
    deleteTerm(deleteTermInput: { ids: $ids })
  }
`;

export const TERM_LOOKUP = gql`
  query getTermLookup {
    getTermLookup {
      id
      text
    }
  }
`;

export const TERM_LIST = gql`
  query getTermList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getTermList(
      getTermListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      terms {
        id
        term_code
        term_description
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

export const GET_TERM = gql`
  query getTerm($id: Int!) {
    getTerm(getTermInput: { id: $id }) {
      id
      term_code
      term_description
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

export const GET_TERM_TERM_CODE_EXIST = gql`
  query getTermTermCodeExist($id: Int!, $term_code: String!) {
    getTermTermCodeExist(id: $id, term_code: $term_code)
  }
`;

export const GET_TERM_TERM_DESCRIPTION_EXIST = gql`
  query getTermTermDescriptionExist($id: Int!, $term_description: String!) {
    getTermTermDescriptionExist(id: $id, term_description: $term_description)
  }
`;
