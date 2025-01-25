import gql from 'graphql-tag';
export const ADD_DOCUMENT_TYPE = gql`
  mutation addDocumentType($document_type_name: String!) {
    addDocumentType(addDocumentTypeInput: { document_type_name: $document_type_name })
  }
`;

export const UPDATE_DOCUMENT_TYPE = gql`
  mutation updateDocumentType($id: Int!, $document_type_name: String!) {
    updateDocumentType(updateDocumentTypeInput: { id: $id, document_type_name: $document_type_name })
  }
`;

export const DELETE_DOCUMENT_TYPE = gql`
  mutation deleteDocumentType($ids: [Int]!) {
    deleteDocumentType(deleteDocumentTypeInput: { ids: $ids })
  }
`;

export const DOCUMENT_TYPE_LOOKUP = gql`
  query getDocumentTypeLookup {
    getDocumentTypeLookup {
      id
      text
    }
  }
`;

export const DOCUMENT_TYPE_LIST = gql`
  query getDocumentTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDocumentTypeList(
      getDocumentTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      documentTypes {
        id
        document_type_name
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

export const GET_DOCUMENT_TYPE = gql`
  query getDocumentType($id: Int!) {
    getDocumentType(getDocumentTypeInput: { id: $id }) {
      id
      document_type_name
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

export const GET_DOCUMENT_TYPE_DOCUMENT_TYPE_NAME_EXIST = gql`
  query getDocumentTypeDocumentTypeNameExist($id: Int!, $document_type_name: String!) {
    getDocumentTypeDocumentTypeNameExist(id: $id, document_type_name: $document_type_name)
  }
`;
