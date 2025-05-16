import gql from 'graphql-tag';
export const ADD_STUDY_NOTES = gql`
  mutation addStudyNotes($course_id: Int, $title: String!, $description: jsonb, $status: String) {
    addStudyNotes(
      addStudyNotesInput: {course_id: $course_id, title: $title, description: $description, status: $status }
    )
  }
`;

export const UPDATE_STUDY_NOTES = gql`
  mutation updateStudyNotes($id: Int!, $course_id: Int, $title: String!, $description: jsonb, $status: String) {
    updateStudyNotes(updateStudyNotesInput: { id: $id, course_id: $course_id, title: $title, description: $description, status: $status })
  }
`;

export const DELETE_STUDY_NOTES = gql`
  mutation deleteStudyNotes($ids: [Int]!) {
    deleteStudyNotes(deleteStudyNotesInput: { ids: $ids })
  }
`;

export const STUDY_NOTES_LIST_ALL = gql`
  query getStudyNotesListAll {
    getStudyNotesListAll {
      id
      course_id
      course_name
      title
      description
      status
    }
  }
`;

export const STUDY_NOTES_LIST = gql`
  query getStudyNotesList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getStudyNotesList(
      getStudyNotesListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      studyNotes {
        id
        course_id
        course_name
        title
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

export const STUDY_NOTES_SHORTLIST = gql`
  query getStudyNotesList( $filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getStudyNotesList(
      getStudyNotesListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      studyNotes {
        id
        course_id
        course_name
        title
        description
        status
      }
    }
  }
`;
export const GET_STUDY_NOTES = gql`
  query getStudyNotes($id: Int!) {
    getStudyNotes(getStudyNotesInput: { id: $id }) {
      id
      course_id
      course_name
      title
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

export const GET_STUDY_NOTES_ALL = gql`
  query getStudyNotesAll {
    getStudyNotesAll {
      id
      course_id
      course_name
      title
      description
      status
    }
  }
`;
