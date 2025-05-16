import gql from 'graphql-tag';
export const ADD_CODE_PROJECT = gql`
  mutation addCodeProject( $course_id: Int, $title: String!, $description: String, $source_code: jsonb, $status: String) {
    addCodeProject(
      addCodeProjectInput: { course_id: $course_id, title: $title, description: $description, source_code: $source_code, status: $status }
    )
  }
`;

export const UPDATE_CODE_PROJECT = gql`
  mutation updateCodeProject($id: Int!, $course_id: Int, $title: String!, $description: String, $source_code: jsonb, $status: String) {
    updateCodeProject(
      updateCodeProjectInput: {
        id: $id
        course_id: $course_id
        title: $title
        description: $description
        source_code: $source_code
        status: $status
      }
    )
  }
`;

export const DELETE_CODE_PROJECT = gql`
  mutation deleteCodeProject($ids: [Int]!) {
    deleteCodeProject(deleteCodeProjectInput: { ids: $ids })
  }
`;
export const CODE_PROJECT_LOOKUP = gql`
  query getCodeProjectLookup {
    getCodeProjectLookup{
      id
      text
    }
  }
`;

export const MEETING_LIST_ALL = gql`
  query getMeetingListAll {
    getMeetingListAll {
      id
      title
      start
      end
    }
  }
`;
export const CODE_PROJECT_LIST_ALL = gql`
  query getCodeProjectsListAll {
    getCodeProjectListsAll {
      id
      course_id
      course_name
      title
      description
      source_code
      status
    }
  }
`;

export const CODE_PROJECT_LIST = gql`
  query getCodeProjectList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCodeProjectList(
      getCodeProjectListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      codeProjects {
        id
        course_id
        course_name
        title
        description
        source_code
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

export const CODE_PROJECT_SHORTLIST = gql`
  query getCodeProjectList( $filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCodeProjectList(
      getCodeProjectListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      codeProjects {
        id
        course_id
        course_name
        title
        description
        source_code
        status
      }
    }
  }
`;
export const GET_CODE_PROJECT = gql`
  query getCodeProject($id: Int!) {
    getCodeProject(getCodeProjectInput: { id: $id}) {
      id
      course_id
      course_name
      title
      description
      source_code
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

export const GET_CODE_PROJECT_ALL = gql`
query getCodeProjectsAll {
  getCodeProjectsAll {
    id
    course_id
    course_name
    title
    description
    source_code
    status
  }
}
`;
