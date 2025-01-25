import gql from 'graphql-tag';
export const ADD_DOCUMENT = gql`
  mutation addDocument(
    $document_name: String
    $revision: Int
    $document_type_id: Int
    $is_template: Boolean
    $publish_date: Date
    $expiration_date: Date
    $document_category_id: Int
    $document_subcategory_id: Int
    $description: String
    $related_document_id: Int
    $related_document_revision: Int
    $assigned_to: Int
    $file_name: String
    $status: String
  ) {
    addDocument(
      addDocumentInput: {
        document_name: $document_name
        revision: $revision
        document_type_id: $document_type_id
        is_template: $is_template
        publish_date: $publish_date
        expiration_date: $expiration_date
        document_category_id: $document_category_id
        document_subcategory_id: $document_subcategory_id
        description: $description
        related_document_id: $related_document_id
        related_document_revision: $related_document_revision
        assigned_to: $assigned_to
        file_name: $file_name
        status: $status
      }
    )
  }
`;

export const UPDATE_DOCUMENT = gql`
  mutation updateDocument(
    $id: Int!
    $document_name: String
    $revision: Int
    $document_type_id: Int
    $is_template: Boolean
    $publish_date: Date
    $expiration_date: Date
    $document_category_id: Int
    $document_subcategory_id: Int
    $description: String
    $related_document_id: Int
    $related_document_revision: Int
    $assigned_to: Int
    $file_name: String
    $status: String
  ) {
    updateDocument(
      updateDocumentInput: {
        id: $id
        document_name: $document_name
        revision: $revision
        document_type_id: $document_type_id
        is_template: $is_template
        publish_date: $publish_date
        expiration_date: $expiration_date
        document_category_id: $document_category_id
        document_subcategory_id: $document_subcategory_id
        description: $description
        related_document_id: $related_document_id
        related_document_revision: $related_document_revision
        assigned_to: $assigned_to
        file_name: $file_name
        status: $status
      }
    )
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation deleteDocument($ids: [Int]!) {
    deleteDocument(deleteDocumentInput: { ids: $ids })
  }
`;

export const DOCUMENT_LIST = gql`
  query getDocumentList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDocumentList(
      getDocumentListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      documents {
        id
        document_name
        revision
        document_type_id
        document_type_name
        is_template
        publish_date
        expiration_date
        document_category_id
        document_category_name
        document_subcategory_id
        document_subcategory_name
        description
        related_document_id
        related_document_name
        related_document_revision
        assigned_to
        assigned_to_user_name
        file_name
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

export const GET_DOCUMENT = gql`
  query getDocument($id: Int!) {
    getDocument(getDocumentInput: { id: $id }) {
      id
      document_name
      revision
      document_type_id
      document_type_name
      is_template
      publish_date
      expiration_date
      document_category_id
      document_category_name
      document_subcategory_id
      document_subcategory_name
      description
      related_document_id
      related_document_name
      related_document_revision
      assigned_to
      assigned_to_user_name
      file_name
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

export const DOCUMENT_LOOKUP = gql`
  query getDocumentLookup {
    getDocumentLookup {
      id
      text
    }
  }
`;

export const GET_DOCUMENT_DOCUMENT_NAME_EXIST = gql`
  query getDocumentDocumentNameExist($id: Int!, $document_name: String!) {
    getDocumentDocumentNameExist(id: $id, document_name: $document_name)
  }
`;

export const UPLOAD_DOCUMENT_FILE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;
