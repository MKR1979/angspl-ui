import gql from 'graphql-tag';
export const ADD_COURSE_TYPE = gql`
  mutation addCourseType($course_type_name: String!, $code: String, $group_id: Int, $status: String) {
    addCourseType(addCourseTypeInput: { course_type_name: $course_type_name, code: $code,  group_id: $group_id, status: $status })
  }
`;

export const UPDATE_COURSE_TYPE = gql`
  mutation updateCourseType($id: Int!, $course_type_name: String!, $code: String, $group_id: Int,  $status: String) {
    updateCourseType(updateCourseTypeInput: { id: $id, course_type_name: $course_type_name, code: $code, group_id: $group_id, status: $status })
  }
`;

export const DELETE_COURSE_TYPE = gql`
  mutation deleteCourseType($ids: [Int]!) {
    deleteCourseType(deleteCourseTypeInput: { ids: $ids })
  }
`;

export const COURSE_TYPE_LOOKUP = gql`
  query getCourseTypeLookup($group_name: String) {
        getCourseTypeLookup(group_name: $group_name ) {
      id
      text
    }
  }
`;

export const COURSE_GROUP_LOOKUP = gql`
  query getGroupLookup {
    getGroupLookup {
      id
      text
    }
  }
`;

export const COURSE_TYPE_LIST = gql`
  query getCourseTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCourseTypeList(
      getCourseTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      course_types {
        id
        course_type_name
        code
        group_id
        group_name
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

export const GET_COURSE_TYPE= gql`
  query getCourseType($id: Int!) {
    getCourseType(getCourseTypeInput: { id: $id }) {
      id
      course_type_name
      code
      group_id
      group_name
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

export const GET_COURSE_TYPE_NAME_EXIST = gql`
  query getCourseTypeNameExist($id: Int!, $course_type_name: String!) {
    getCourseTypeNameExist(id: $id, course_type_name: $course_type_name)
  }
`;
