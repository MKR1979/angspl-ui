import gql from 'graphql-tag';
export const ADD_NOTE = gql`
  mutation addNote(
    $contact_id: Int
    $parent_type: String
    $parent_type_id: Int
    $subject: String
    $note: String
    $file_name: String
    $assigned_to: Int
  ) {
    addNote(
      addNoteInput: {
        contact_id: $contact_id
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        subject: $subject
        note: $note
        file_name: $file_name
        assigned_to: $assigned_to
      }
    )
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote(
    $id: Int!
    $contact_id: Int
    $parent_type: String
    $parent_type_id: Int
    $subject: String
    $note: String
    $file_name: String
    $assigned_to: Int
  ) {
    updateNote(
      updateNoteInput: {
        id: $id
        contact_id: $contact_id
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        subject: $subject
        note: $note
        file_name: $file_name
        assigned_to: $assigned_to
      }
    )
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($ids: [Int]!) {
    deleteNote(deleteNoteInput: { ids: $ids })
  }
`;

export const NOTE_LOOKUP = gql`
  query getNoteLookup {
    getNoteLookup {
      id
      text
    }
  }
`;

export const NOTE_LIST = gql`
  query getNoteList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getNoteList(
      getNoteListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      notes {
        id
        contact_id
        contact_name
        parent_type
        parent_type_id
        parent_type_name
        subject
        note
        file_name
        assigned_to
        assigned_to_user_name
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

export const GET_NOTE = gql`
  query getNote($id: Int!) {
    getNote(getNoteInput: { id: $id }) {
      id
      contact_id
      contact_name
      parent_type
      parent_type_id
      parent_type_name
      subject
      note
      file_name
      assigned_to
      assigned_to_user_name
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

export const UPLOAD_NOTE_FILE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;
