import gql from 'graphql-tag';
export const ADD_DOCUMENT_CATEGORY = gql`
  mutation addDocumentCategory($document_category_name: String!) {
    addDocumentCategory(addDocumentCategoryInput: { document_category_name: $document_category_name })
  }
`;

export const UPDATE_DOCUMENT_CATEGORY = gql`
  mutation updateDocumentCategory($id: Int!, $document_category_name: String!) {
    updateDocumentCategory(updateDocumentCategoryInput: { id: $id, document_category_name: $document_category_name })
  }
`;

export const DELETE_DOCUMENT_CATEGORY = gql`
  mutation deleteDocumentCategory($ids: [Int]!) {
    deleteDocumentCategory(deleteDocumentCategoryInput: { ids: $ids })
  }
`;

export const DOCUMENT_CATEGORY_LOOKUP = gql`
  query getDocumentCategoryLookup {
    getDocumentCategoryLookup {
      id
      text
    }
  }
`;

export const DOCUMENT_CATEGORY_LIST = gql`
  query getDocumentCategoryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDocumentCategoryList(
      getDocumentCategoryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      documentCategories {
        id
        document_category_name
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

export const GET_DOCUMENT_CATEGORY = gql`
  query getDocumentCategory($id: Int!) {
    getDocumentCategory(getDocumentCategoryInput: { id: $id }) {
      id
      document_category_name
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

export const GET_DOCUMENT_CATEGORY_DOCUMENT_CATEGORY_NAME_EXIST = gql`
  query getDocumentCategoryDocumentCategoryNameExist($id: Int!, $document_category_name: String!) {
    getDocumentCategoryDocumentCategoryNameExist(id: $id, document_category_name: $document_category_name)
  }
`;
