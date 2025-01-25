import gql from 'graphql-tag';
export const ADD_DOCUMENT_SUBCATEGORY = gql`
  mutation addDocumentSubcategory($document_subcategory_name: String!, $document_category_id: Int!) {
    addDocumentSubcategory(
      addDocumentSubcategoryInput: { document_subcategory_name: $document_subcategory_name, document_category_id: $document_category_id }
    )
  }
`;

export const UPDATE_DOCUMENT_SUBCATEGORY = gql`
  mutation updateDocumentSubcategory($id: Int!, $document_subcategory_name: String!, $document_category_id: Int!) {
    updateDocumentSubcategory(
      updateDocumentSubcategoryInput: {
        id: $id
        document_subcategory_name: $document_subcategory_name
        document_category_id: $document_category_id
      }
    )
  }
`;

export const DELETE_DOCUMENT_SUBCATEGORY = gql`
  mutation deleteDocumentSubcategory($ids: [Int]!) {
    deleteDocumentSubcategory(deleteDocumentSubcategoryInput: { ids: $ids })
  }
`;

export const DOCUMENT_SUBCATEGORY_LOOKUP = gql`
  query getDocumentSubcategoryLookup($document_category_id: Int!) {
    getDocumentSubcategoryLookup(document_category_id: $document_category_id) {
      id
      text
    }
  }
`;

export const DOCUMENT_SUBCATEGORY_LIST = gql`
  query getDocumentSubcategoryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDocumentSubcategoryList(
      getDocumentSubcategoryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      documentSubcategories {
        id
        document_subcategory_name
        document_category_id
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

export const GET_DOCUMENT_SUBCATEGORY = gql`
  query getDocumentSubcategory($id: Int!) {
    getDocumentSubcategory(getDocumentSubcategoryInput: { id: $id }) {
      id
      document_subcategory_name
      document_category_id
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

export const GET_DOCUMENT_SUBCATEGORY_DOCUMENT_SUBCATEGORY_NAME_EXIST = gql`
  query getDocumentSubcategoryDocumentSubcategoryNameExist($id: Int!, $document_category_id: Int!, $document_subcategory_name: String!) {
    getDocumentSubcategoryDocumentSubcategoryNameExist(
      id: $id
      document_category_id: $document_category_id
      document_subcategory_name: $document_subcategory_name
    )
  }
`;
